import 'jasmine';
import 'reflect-metadata';
import { SuperTest, Test } from 'supertest';
import { CriarProdutoMutationVariables } from '../../graphql/generated';
import { hooksDeDatabase } from '../../helpers/hooksDeDatabase';
import { restartServer } from '../../helpers/setupTest';
import { testarRespostaBemSucedida, testarRespostaComErroNaoAutenticado } from '../../helpers/testesDeRequest';
import { AsyncReturnType } from '../../helpers/typescriptHelpers';
import { criarNovaConta } from '../autenticacao/autenticacaoHelpers';
import { criarNovaCategoria, gerarVariaveisDeCriacaoDeCategoria } from '../categoria/categoriaHelpers';
import { gerarVariaveisDeCriacaoDeProduto, requisitarNovoProduto } from './produtoHelpers';

describe('Produto', () => {
	let request: SuperTest<Test>
	let registroDeConta: AsyncReturnType<typeof criarNovaConta>
	let idDaConta: string

	hooksDeDatabase()
	beforeAll(async () => {
		request = await restartServer()
	})

    beforeEach(async () => {
		registroDeConta = await criarNovaConta(request)
		idDaConta = registroDeConta.usuario.contas[0]._id
	})

	it('Criar com campos mínimos', async () => {
		const produtoACriar = gerarVariaveisDeCriacaoDeProduto(idDaConta)
		const response = await requisitarNovoProduto(request, produtoACriar, registroDeConta.token)
		testarRespostaBemSucedida(response)
		const { data } = response.body
		expect(typeof data!.criarProduto._id).toBe('string')
		expect(data!.criarProduto.nome).toBe(produtoACriar.produto.nome)
		expect(data!.criarProduto.conta._id).toBe(registroDeConta.usuario.contas[0]._id)
	})

	it('Criar com todos os campos', async () => {
		const idDoRestaurante = registroDeConta.usuario.contas[0].lojas[0]._id
		const categoriaACriar = gerarVariaveisDeCriacaoDeCategoria(idDoRestaurante)
		const categoria = await criarNovaCategoria(request, categoriaACriar, registroDeConta.token)
		const produtoACriar: CriarProdutoMutationVariables = {
			produto: {
				...gerarVariaveisDeCriacaoDeProduto(idDaConta).produto,
				categoriaId: categoria._id,
				descricao: 'Uma descrição bem completa do produto',
				preco: 145.66,
			},
		}
		const response = await requisitarNovoProduto(request, produtoACriar, registroDeConta.token)
		testarRespostaBemSucedida(response)
		const { data } = response.body
		expect(typeof data!.criarProduto._id).toBe('string')
		expect(data!.criarProduto.nome).toBe(produtoACriar.produto.nome)
		expect(data!.criarProduto.descricao).toBe(produtoACriar.produto.descricao)
		expect(data!.criarProduto.preco).toBe(produtoACriar.produto.preco)
		expect(data!.criarProduto.conta._id).toBe(registroDeConta.usuario.contas[0]._id)
		expect(data!.criarProduto.categoria!._id).toBe(produtoACriar.produto.categoriaId as string)
	})


	it('Não criar sem estar autenticado', async () => {
		const produtoACriar = gerarVariaveisDeCriacaoDeProduto(idDaConta)
		await requisitarNovoProduto(request, produtoACriar)
            .then(testarRespostaComErroNaoAutenticado)
	})
})