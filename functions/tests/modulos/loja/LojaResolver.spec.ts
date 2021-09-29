import 'jasmine';
import 'reflect-metadata';
import { SuperTest, Test } from 'supertest';
import { CriarLojaMutationVariables } from '../../graphql/generated';
import { hooksDeDatabase } from '../../helpers/hooksDeDatabase';
import { restartServer } from '../../helpers/setupTest';
import { testarRespostaBemSucedida, testarRespostaComErroNaoAutenticado } from '../../helpers/testesDeRequest';
import { AsyncReturnType } from '../../helpers/typescriptHelpers';
import { criarNovaConta } from '../autenticacao/autenticacaoHelpers';
import { gerarVariaveisDeCriacaoDeLoja, requisitarNovaLoja, requisitarUmaLoja } from './lojaHelpers';

describe('Loja', () => {
    let request: SuperTest<Test>
	let registroDeConta: AsyncReturnType<typeof criarNovaConta>
	let idRestaurante: string
    let idDaConta: string

	hooksDeDatabase()

	beforeAll(async () => {
		request = await restartServer()
	})

	beforeEach(async () => {
		registroDeConta = await criarNovaConta(request)
		idRestaurante = registroDeConta.usuario.contas[0].lojas[0]._id
		idDaConta = registroDeConta.usuario.contas[0]._id
    })

    it('Buscar com sucesso', async () => {
        const lojaRequest = await requisitarUmaLoja(request, { idRestaurante })
        testarRespostaBemSucedida(lojaRequest)

        const { data } = lojaRequest.body
        expect(data!.loja._id).toBe(idRestaurante)
        expect(data!.loja.conta._id).toBe(registroDeConta.usuario.contas[0]._id)
    })

	it('Não criar sem estar autenticado', async () => {
		const lojaACriar = gerarVariaveisDeCriacaoDeLoja(idDaConta)
		await requisitarNovaLoja(request, lojaACriar)
            .then(testarRespostaComErroNaoAutenticado)
	})

    it('Criar com campos mínimos', async () => {
        const lojaACriar = gerarVariaveisDeCriacaoDeLoja(idDaConta)
        const response = await requisitarNovaLoja(request, lojaACriar, registroDeConta.token)
        testarRespostaBemSucedida(response)
		const { data } = response.body
		expect(typeof data!.criarLoja._id).toBe('string')
		expect(data!.criarLoja.nome).toBe(lojaACriar.entrada.nome)
		expect(data!.criarLoja.conta._id).toBe(registroDeConta.usuario.contas[0]._id)
    })

    it('Criar com todos os campos', async () => {
        const lojaACriar: CriarLojaMutationVariables = {
            entrada: {
                ...gerarVariaveisDeCriacaoDeLoja(idDaConta).entrada,
                cnpj: '49721218000124',
                endereco: {
                    cep: '12239090',
                    rua: 'Rua Maria de Lourdes Damasceno Peres',
                    numero: 566,
                    cidade: 'São José dos Campos',
                    uf: 'SP',
                    complemento: 'Sala 205',
                    bairro: 'Campo dos Alemães',
                },
            },
        }
        const response = await requisitarNovaLoja(request, lojaACriar, registroDeConta.token)
        testarRespostaBemSucedida(response)
		const { data } = response.body
		expect(typeof data!.criarLoja._id).toBe('string')
		expect(data!.criarLoja.nome).toBe(lojaACriar.entrada.nome)
		expect(data!.criarLoja.conta._id).toBe(registroDeConta.usuario.contas[0]._id)
		expect(data!.criarLoja.cnpj).toBe(lojaACriar.entrada.cnpj)
		expect(data!.criarLoja.endereco).toEqual(lojaACriar.entrada.endereco)
    })
})