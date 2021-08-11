import { Arg, Args, Authorized, FieldResolver, Mutation, Query, Resolver, ResolverInterface, Root } from 'type-graphql'
import { CriacaoDeSolicitacaoDeGarcom } from './CriacaoDeSolicitacaoDeGarcom'
import admin from 'firebase-admin'
import { SolicitacaoDeGarcom } from './SolicitacaoDeGarcom'
import { PaginacaoArgs } from '../commons/Paginacao'
import { SolicitacaoDeGarcomModel } from '../models'
import { OrdenacaoDaSolicitacao } from './OrdenacaoDaSolicitacao'
import { converterOrdenacaoParaMongoose } from '../../utils/graphqlUtils'

@Resolver(() => SolicitacaoDeGarcom)
export class SolicitacaoDeGarcomResolver implements ResolverInterface<SolicitacaoDeGarcom> {
	@Mutation(() => SolicitacaoDeGarcom)
	async solicitarGarcom(
		@Arg('solicitacao') solicitacao: CriacaoDeSolicitacaoDeGarcom
	) {
		const solicitacaoCriada = await SolicitacaoDeGarcomModel.create({
			loja: solicitacao.idRestaurante,
			mesa: solicitacao.mesa,
		})
		const messageData: admin.messaging.MessagingPayload['data'] = {
			body: JSON.stringify(solicitacaoCriada.toObject()),
		}
		const message: admin.messaging.MessagingPayload = {
			notification: {
				title: 'Solicitação de garçom',
				body: solicitacaoCriada.mesa
					? `Atenda a mesa ${solicitacaoCriada.mesa}`
					: 'Mesa não informada',
			},
			data: messageData,
		}
		try {
			const response = await admin.messaging().sendToTopic(solicitacao.idRestaurante, message)
			console.log('Successfully sent message:', response)
		} catch (error) {
			console.log('Error sending message:', error)
		}
		return solicitacaoCriada.toObject()
	}

	@Query(() => [SolicitacaoDeGarcom])
	async solicitacoes(
		@Args() paginacao: PaginacaoArgs,
		@Arg('idRestaurante', { nullable: false }) idRestaurante: string,
		@Arg('ordenarPor', () => OrdenacaoDaSolicitacao, { nullable: true }) ordenarPor?: OrdenacaoDaSolicitacao
	) {
		return SolicitacaoDeGarcomModel
			.find({ loja: idRestaurante })
			.sort(converterOrdenacaoParaMongoose({...ordenarPor}))
			.limit(paginacao.limit || 10)
			.skip(paginacao.offset || 0)
			.lean();
	}

	@Authorized()
	@Mutation(() => Boolean)
	async lerSolicitacoes(
		@Arg("idRestaurante", { nullable: false }) idRestaurante: string,
	) {
		await SolicitacaoDeGarcomModel.updateMany({
			loja: idRestaurante,
		}, {
			lido: true,
		})
		return true
	}

	@Authorized()
	@Mutation(() => Boolean)
	async excluirSolicitacao(@Arg("id") id: string) {
	  await SolicitacaoDeGarcomModel.deleteById(id)
	  return true
	}

	@FieldResolver()
	async loja(@Root() solicitacao: SolicitacaoDeGarcom) {
	  const resultado = await SolicitacaoDeGarcomModel.populate(solicitacao, {
		path: 'loja',
		options: { lean: true },
	  })
	  return resultado.loja
	}
}