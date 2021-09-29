import 'jasmine';
import 'reflect-metadata';
import { SuperTest, Test } from 'supertest';
import { hooksDeDatabase } from '../../helpers/hooksDeDatabase';
import { restartServer } from '../../helpers/setupTest';
import { testaRespostaComErro, testarRespostaBemSucedida, testarRespostaComErroNaoAutenticado } from '../../helpers/testesDeRequest';
import { AsyncReturnType } from '../../helpers/typescriptHelpers';
import { criarNovaConta, gerarVariaveisDeRegistro } from '../autenticacao/autenticacaoHelpers';
import { gerarVariaveisDeCriacaoDeCategoria, requisitarNovaCategoria } from './categoriaHelpers';

describe('Categoria', () => {
	let request: SuperTest<Test>
	let registroDeConta: AsyncReturnType<typeof criarNovaConta>
	let idDoRestaurante: string

	hooksDeDatabase()

	beforeAll(async () => {
		request = await restartServer()
	})

	beforeEach(async () => {
		registroDeConta = await criarNovaConta(request)
		idDoRestaurante = registroDeConta.usuario.contas[0].lojas[0]._id
	})

	it('Criar com sucesso', async () => {
		const categoriaACriar = gerarVariaveisDeCriacaoDeCategoria(idDoRestaurante)
		const response = await requisitarNovaCategoria(request, categoriaACriar, registroDeConta.token)
		testarRespostaBemSucedida(response)
		const { data } = response.body
		expect(typeof data!.criarCategoria._id).toBe('string')
		expect(data!.criarCategoria.nome).toBe(categoriaACriar.categoria.nome)
		expect(data!.criarCategoria.conta._id).toBe(registroDeConta.usuario.contas[0]._id)
		expect(Array.isArray(data!.criarCategoria.produtos)).toBe(true)
		expect(data!.criarCategoria.produtos.length).toBe(0)
	})

	it('Proibir criar categoria sem estar autenticado', async () => {
		const categoriaACriar = gerarVariaveisDeCriacaoDeCategoria(idDoRestaurante)
		await requisitarNovaCategoria(request, categoriaACriar)
            .then(testarRespostaComErroNaoAutenticado)
	})

	it('Proibir criar categoria sem permissão de loja', async () => {
		const categoriaACriar = gerarVariaveisDeCriacaoDeCategoria(idDoRestaurante)
		const registroDeConta2 = await criarNovaConta(request, {
			entrada: {
				...gerarVariaveisDeRegistro().entrada,
				email: 'emailalternativo@email.com',
			}
		})

		const response = await requisitarNovaCategoria(request, categoriaACriar, registroDeConta2.token)
		testaRespostaComErro(response)
		expect(response.body.errors![0].message).toBe('Usuário não tem acesso a loja')
		expect(response.body.errors![0].extensions!.code).toBe('FORBIDDEN')
	})
})