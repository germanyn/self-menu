import { buildSchema } from "type-graphql"
import { customAuthChecker } from "./infraestrutura/autenticacao"
import { AutenticacaoResolver } from "./modulos/autenticacao/AutenticacaoResolver"
import { ContaResolver } from "./modulos/conta/ContaResolver"
import { LojaResolver } from "./modulos/loja/LojaResolver"
import { ProdutoResolver } from "./modulos/produto/ProdutoResolver"
import { UsuarioResolver } from "./modulos/usuario/UsuarioResolver"
import { CategoriaResolver } from "./modulos/categoria/CategoriaResolver"

export default buildSchema({
    resolvers: [
        ContaResolver,
        UsuarioResolver,
        ProdutoResolver,
        AutenticacaoResolver,
        LojaResolver,
        CategoriaResolver,
    ],
    authChecker: customAuthChecker,
})
