import 'jasmine';
import 'reflect-metadata';
import { SuperTest, Test } from 'supertest';
import { hooksDeDatabase } from '../../helpers/hooksDeDatabase';
import { restartServer } from '../../helpers/setupTest';
import { testaRespostaComErro, testarRespostaBemSucedida } from '../../helpers/testesDeRequest';
import { gerarVariaveisDeRegistro, requisitarNovaConta } from './autenticacaoHelpers';

describe('Autenticacao', () => {
    let request: SuperTest<Test>

	hooksDeDatabase()

	beforeAll(async () => {
		request = await restartServer()
	})

    it('Criar nova conta de restaurante', async () => {
        const variaveisDeRegistro = gerarVariaveisDeRegistro()
        const response = await requisitarNovaConta(request, variaveisDeRegistro)
        testarRespostaBemSucedida(response)

        const data = response.body.data
        
        expect(data).toBeDefined()
        expect(data?.registrar.usuario.nome).toBe(variaveisDeRegistro.entrada.restaurante)
        expect(data?.registrar.usuario.contas.length).toBe(1)
        expect(data?.registrar.usuario.contas[0].nome).toBe(variaveisDeRegistro.entrada.restaurante)
        expect(data?.registrar.usuario.contas[0].lojas.length).toBe(1)
        expect(data?.registrar.usuario.contas[0].lojas[0].nome).toBe(variaveisDeRegistro.entrada.restaurante)
        expect(data?.registrar.usuario.contas[0].lojas[0].conta).toBeDefined()
        expect(data?.registrar.usuario.contas[0].lojas[0].conta).not.toBeNull()
    })

    it('Não criar conta já existente', async () => {
        const variaveisDeRegistro = gerarVariaveisDeRegistro()
        const response1 = await requisitarNovaConta(request, variaveisDeRegistro)
        testarRespostaBemSucedida(response1)

        const response2 = await requisitarNovaConta(request, variaveisDeRegistro)
        testaRespostaComErro(response2)
        expect(response2.body.errors![0].message).toBe('Já existe conta com esse e-mail')
    })
})