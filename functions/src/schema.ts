import { buildSchema, registerEnumType } from "type-graphql"
import { customAuthChecker } from "./infraestrutura/autenticacao"
import { AutenticacaoResolver } from "./modulos/autenticacao/AutenticacaoResolver"
import { ContaResolver } from "./modulos/conta/ContaResolver"
import { LojaResolver } from "./modulos/loja/LojaResolver"
import { ProdutoResolver } from "./modulos/produto/ProdutoResolver"
import { UsuarioResolver } from "./modulos/usuario/UsuarioResolver"
import { CategoriaResolver } from "./modulos/categoria/CategoriaResolver"
import { SolicitacaoDeGarcomResolver } from "./modulos/solicitacao-de-garcom/SolicitacaoDeGarcomResolver"
import { Ordenacao } from "./modulos/commons/Paginacao"

registerEnumType(Ordenacao, { name: 'Ordenacao' })

export default buildSchema({
    resolvers: [
        ContaResolver,
        UsuarioResolver,
        ProdutoResolver,
        AutenticacaoResolver,
        LojaResolver,
        CategoriaResolver,
        SolicitacaoDeGarcomResolver,
    ],
    authChecker: customAuthChecker,
})
