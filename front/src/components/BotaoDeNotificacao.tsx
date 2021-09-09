import {
	Avatar,
	Badge,
	CircularProgress,
	Drawer,
	Fab,
	IconButton,
	List,
	ListItem,
	ListItemAvatar,
	ListItemSecondaryAction,
	ListItemText,
	Theme
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/styles';
import dayjs from 'dayjs';
import { Bell, BellOff, Delete, Hand, Sleep } from 'mdi-material-ui';
import { useState } from 'react';
import { useNotificacao } from '../contexts/NotificacaoContext';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: 'relative',
    },
    fabProgress: {
      position: 'absolute',
      top: -6,
      left: -6,
      zIndex: 1,
    },
  }),
)

type BotaoDeNotificacaoProps = {
	style?: React.CSSProperties
}

const BotaoDeNotificacao: typeof IconButton = (props: BotaoDeNotificacaoProps) => {
	const {
		temToken,
		pedirPermissao,
		pedindoPermissao,
		solicitacoes,
		excluirSolicitacao,
		lerSolicitacoes,
	} = useNotificacao()
	const [mostraPedidos, setMostraPedidos] = useState(false)
	const [excluindos, setExcluindos] = useState<string[]>([])
	const classes = useStyles()
	const notificacoesNaoLidas = solicitacoes
		.filter(({ lido }) => !lido)

	const aoExcluirSolicitacao = async (id: string) => {
		if (excluindos.includes(id)) return
		setExcluindos([
			...excluindos,
			id,
		])
		try {
			await excluirSolicitacao(id)
		} catch(error) {
			console.log('erro ao excluir solicitação ', error)
		} finally {
			setExcluindos(excluindos.filter(outroId => outroId !== id))
		}
	}

	const abrirNotificacoes = async () => {
		lerSolicitacoes()
		setMostraPedidos(true)
	}

	return (
		<div style={props.style}>
			<Badge badgeContent={notificacoesNaoLidas.length} color="error">
				<Fab
					color="primary"
					aria-label="Ativar notificação"
					onClick={() => temToken
						? abrirNotificacoes()
						: pedirPermissao()
					}
					disabled={pedindoPermissao}
				>
					{temToken ? <Bell /> : <BellOff />}
				</Fab>
			</Badge>
			{pedindoPermissao && <CircularProgress
				size={68}
				className={classes.fabProgress}
			/>}
			<Drawer
				anchor={'bottom'}
				open={mostraPedidos}
				onClose={() => setMostraPedidos(false)}
			>
				<List>
					{!solicitacoes.length && <ListItem>
						<ListItemAvatar>
							<Avatar>
								<Sleep color="primary" />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							color="primary"
							primary="Nenhuma solicitação pendente..."
						/>
					</ListItem>}
					{solicitacoes.map(solicitacao => (
						<ListItem key={solicitacao._id}>
							<ListItemAvatar>
								<Avatar>
									<Hand color="primary" />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								color="primary"
								primary={solicitacao.mesa || 'Mesa não especificada'}
								secondary={dayjs(solicitacao.criadoEm).fromNow()}
							/>
							<ListItemSecondaryAction>
								<div className={classes.wrapper}>
									<IconButton
										edge="end"
										aria-label="delete"
										onClick={() => aoExcluirSolicitacao(solicitacao._id)}
										disabled={excluindos.includes(solicitacao._id)}
									>
										{excluindos.includes(solicitacao._id)
											? <CircularProgress size={32}/>
											: <Delete />}
									</IconButton>
								</div>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Drawer>
		</div>
	)
}

export default BotaoDeNotificacao
