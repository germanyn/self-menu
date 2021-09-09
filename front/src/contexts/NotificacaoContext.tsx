import { useApolloClient } from "@apollo/client";
import firebase from 'firebase/app';
import cloneDeep from 'lodash.clonedeep';
import { createContext, useContext, useEffect, useState } from "react";
import { messaging, onMessageListener } from "../configs/firebase";
import * as serviceWorkerRegistration from '../configs/serviceWorkerRegistration';
import {
	BuscarSolicitacoesDeGarcomDocument,
	BuscarSolicitacoesDeGarcomQuery,
	SolicitacaoDeGarcom,
	useBuscarSolicitacoesDeGarcomLazyQuery,
	useExcluirSolicitacaoMutation,
	useLerSolicitacoesMutation,
	useNotificarPedidosMutation,
} from '../generated/graphql';
import { useAutenticacao } from './autenticacao';

const AUDIO_URL = '/sounds/mixkit-small-door-bell-589.wav'

interface NotificacaoContextData {
	pedirPermissao: () => void
	temToken: boolean
	setTemToken: (temToken: boolean) => void
	subscreverPedidos: () => void
	pedindoPermissao: boolean
	solicitacoes: BuscarSolicitacoesDeGarcomQuery['solicitacoes']
	buscandoSolicitacoes: boolean
	excluirSolicitacao: (id: string) => Promise<void>
	lerSolicitacoes: () => Promise<void>
	somHabilitado: boolean,
	setSomHabilitado: (habilitado: boolean) => void
}

const NotificacaoContext = createContext<NotificacaoContextData>({
	pedirPermissao: () => { throw new Error('Não está em algum contexto') },
	temToken: false,
	setTemToken: () => { throw new Error('Não está em algum contexto') },
	subscreverPedidos: () => { throw new Error('Não está em algum contexto') },
	pedindoPermissao: false,
	solicitacoes: [],
	buscandoSolicitacoes: false,
	excluirSolicitacao: () => { throw new Error('Não está em algum contexto') },
	lerSolicitacoes: () => { throw new Error('Não está em algum contexto') },
	somHabilitado: false,
	setSomHabilitado: () => { throw new Error('Não está em algum contexto') },
});

export type Notificacao = {
	titulo: string
	corpo?: string
}

export const NotificacaoProvider: React.FC = ({ children }) => {
	const [temToken, setTemToken] = useState(false);
	const [registration, setRegistration] = useState<ServiceWorkerRegistration | undefined>();
	const { usuario } = useAutenticacao()
	const [notificarPedidos, { loading: pedindoPermissao }] = useNotificarPedidosMutation()
	const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
	const [buscarSolicitacoes, {
		data: buscaDeSolicitacoes,
		loading: buscandoSolicitacoes,
	}] = useBuscarSolicitacoesDeGarcomLazyQuery({
		pollInterval: 1000 * 60 * 5, // 5 minutos
		onCompleted(data) {
			if (audio && data && data.solicitacoes.some(({ lido }) => !lido)) audio.play()
		}
	})
	const { cache } = useApolloClient()
	const [excluirSolicitacaoMutation] = useExcluirSolicitacaoMutation()
	const [somHabilitado, setSomHabilitado] = useState(false)

	const temAudioHabilitado = async () => {
		try {
			const audio = new Audio(AUDIO_URL)
			await audio.play()
			audio.pause()
			return true
		} catch (error) {
			return false
		}
	}

	useEffect(() => {
		temAudioHabilitado().then(tem => {
			if (!tem) return
			setAudio(new Audio(AUDIO_URL))
		})
	}, [])
	
	const [lerSolicitacoesMutation] = useLerSolicitacoesMutation()

	const lerSolicitacoes = async () => {
		if (!usuario) return
		lerSolicitacoesMutation({
			variables: { idRestaurante: usuario.restaurante },
			update(cache) {
				const solicitacoesAlteradas = cloneDeep(solicitacoes)
					.map(solicitacao => ({ ...solicitacao, lido: true }))
				cache.writeQuery<BuscarSolicitacoesDeGarcomQuery>({
					query: BuscarSolicitacoesDeGarcomDocument,
					variables: { idRestaurante: usuario.restaurante },
					data: { solicitacoes: solicitacoesAlteradas }
				})
			},
			optimisticResponse: () => ({
				lerSolicitacoes: true,
			}),
		})
	}

	const subscreverPedidos = async () => {
		if (!registration) return
		if (!usuario) return
		const tokenAtual = await messaging?.getToken({
			vapidKey: 'BNy7ltec8hGiMzlfhNHkHtswnZIL5Gdtlq6gyA1y58n5zSIFo6d0eFv3mViB57g5X2LihdluxwUDUx_p-rR1Bx0',
			serviceWorkerRegistration: registration,
		})
		if (tokenAtual) {
			await notificarPedidos({
				variables: {
					idRestaurante: usuario.restaurante,
					token: tokenAtual,
				}
			}).catch(error => {
				console.log('não foi possível subscrever usuário', error)
			})
			buscarSolicitacoes({
				variables: { idRestaurante: usuario.restaurante },
			})
			setTemToken(true)
		} else {
			console.log('No registration token available. Request permission to generate one.');
			setTemToken(false);
		}
		return tokenAtual
	}

	const pedirPermissao = async () => {
		try {
			await subscreverPedidos()
		} catch {
			console.log('No registration token available. Request permission to generate one.');
		}
	}

	onMessageListener().then((mensagem: firebase.messaging.MessagePayload & {
		data: SolicitacaoDeGarcom
	}) => {
		const { notification, data } = mensagem
		if (!notification) {
			console.warn('Push não é de notificação')
			return
		}
		const solicitacao = JSON.parse(data.body)
		if (!usuario) throw new Error('Usuário não logado')
		cache.writeQuery<BuscarSolicitacoesDeGarcomQuery>({
			query: BuscarSolicitacoesDeGarcomDocument,
			variables: { idRestaurante: usuario.restaurante },
			data: {
				solicitacoes: [
					...(buscaDeSolicitacoes?.solicitacoes || []),
					{
						_id: solicitacao._id,
						criadoEm: solicitacao.criadoEm,
						lido: solicitacao.lido,
						mesa: solicitacao.mesa
					},
				]
			}
		})
		if (audio) audio.play()
	})

	useEffect(() => {
		if (!registration) return
		let serviceWorker;
		if (registration.installing) {
			serviceWorker = registration.installing;
			// console.log('Service worker installing');
		} else if (registration.waiting) {
			serviceWorker = registration.waiting;
			// console.log('Service worker installed & waiting');
		} else if (registration.active) {
			serviceWorker = registration.active;
			// console.log('Service worker active');
		}

		if (!serviceWorker) return
		console.log("sw current state", serviceWorker.state);
		if (serviceWorker.state === "activated") {
			//If push subscription wasnt done yet have to do here
			console.log("sw already activated - Do watever needed here");
			if (window.Notification.permission !== 'granted') return
			subscreverPedidos();
		}
		serviceWorker.addEventListener('statechange', (e: any) => {
			// use pushManger for subscribing here.
			console.log("Just now activated. now we can subscribe for push notification")
			if (window.Notification.permission !== 'granted') return
			subscreverPedidos();
		});
		// eslint-disable-next-line
	}, [registration])

	const excluirSolicitacao = async (id: string) => {
		if (!usuario) throw new Error('Usuário não logado')
		await excluirSolicitacaoMutation({
			variables: { id },
			update(cache) {
				const buscaDeSolicitacoes = cache.readQuery<BuscarSolicitacoesDeGarcomQuery>({
					query: BuscarSolicitacoesDeGarcomDocument,
					variables: { idRestaurante: usuario.restaurante },
				});
				if (!buscaDeSolicitacoes) return
				const solicitacoes = buscaDeSolicitacoes.solicitacoes
					.filter(({ _id }) => id !== _id)
				cache.writeQuery<BuscarSolicitacoesDeGarcomQuery>({
					query: BuscarSolicitacoesDeGarcomDocument,
					variables: { idRestaurante: usuario.restaurante },
					data: { solicitacoes },
				});
			}
		})
	}

	useEffect(() => {
		if (registration) return
		serviceWorkerRegistration.register()
			.then(registration => {
				setRegistration(registration)
			})
	}, [registration])

	const solicitacoes: BuscarSolicitacoesDeGarcomQuery['solicitacoes'] = buscaDeSolicitacoes
		? buscaDeSolicitacoes.solicitacoes
		: []

	return (
		<NotificacaoContext.Provider
			value={{
				pedirPermissao,
				temToken,
				setTemToken,
				subscreverPedidos,
				pedindoPermissao,
				solicitacoes,
				buscandoSolicitacoes,
				excluirSolicitacao,
				lerSolicitacoes,
				somHabilitado,
				setSomHabilitado,
			}}
		>
			{children}
		</NotificacaoContext.Provider>
	);
}

export const useNotificacao = () => {
	return useContext(NotificacaoContext)
}