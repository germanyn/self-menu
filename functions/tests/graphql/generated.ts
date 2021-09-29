import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  conta: Conta;
  contas: Array<Conta>;
  loja: Loja;
  lojas: Array<Loja>;
  produto: Produto;
  produtos: Array<Produto>;
  solicitacoes: Array<SolicitacaoDeGarcom>;
  usuario: Usuario;
  usuarios: Array<Usuario>;
};


export type QueryContaArgs = {
  id: Scalars['String'];
};


export type QueryLojaArgs = {
  id: Scalars['String'];
};


export type QueryLojasArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryProdutoArgs = {
  id: Scalars['String'];
};


export type QuerySolicitacoesArgs = {
  idRestaurante: Scalars['String'];
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  ordenarPor?: Maybe<OrdenacaoDaSolicitacao>;
};


export type QueryUsuarioArgs = {
  id: Scalars['String'];
};

export type Conta = {
  __typename?: 'Conta';
  _id: Scalars['ID'];
  dono: Usuario;
  lojas: Array<Loja>;
  nome: Scalars['String'];
};

export type Usuario = {
  __typename?: 'Usuario';
  _id: Scalars['ID'];
  contas: Array<Conta>;
  email?: Maybe<Scalars['String']>;
  login?: Maybe<Scalars['String']>;
  nome: Scalars['String'];
};

export type Loja = {
  __typename?: 'Loja';
  _id: Scalars['ID'];
  banner?: Maybe<Scalars['String']>;
  categorias: Array<Categoria>;
  cnpj?: Maybe<Scalars['String']>;
  conta: Conta;
  coresJson?: Maybe<Scalars['String']>;
  endereco?: Maybe<Endereco>;
  logo?: Maybe<Scalars['String']>;
  nome: Scalars['String'];
  podeEditar: Scalars['Boolean'];
};

export type Categoria = {
  __typename?: 'Categoria';
  _id: Scalars['ID'];
  conta: Conta;
  nome: Scalars['String'];
  produtos: Array<Produto>;
};

export type Produto = {
  __typename?: 'Produto';
  _id: Scalars['ID'];
  categoria?: Maybe<Categoria>;
  conta: Conta;
  descricao?: Maybe<Scalars['String']>;
  nome: Scalars['String'];
  preco?: Maybe<Scalars['Float']>;
  urlDoPrato?: Maybe<Scalars['String']>;
};

export type Endereco = {
  __typename?: 'Endereco';
  bairro: Scalars['String'];
  cep: Scalars['String'];
  cidade: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
  numero: Scalars['Int'];
  rua: Scalars['String'];
  uf: Scalars['String'];
};

export type OrdenacaoDaSolicitacao = {
  criadoEm?: Maybe<Ordenacao>;
};

export enum Ordenacao {
  Asc = 'asc',
  Desc = 'desc'
}

export type SolicitacaoDeGarcom = {
  __typename?: 'SolicitacaoDeGarcom';
  _id: Scalars['ID'];
  atualizadoEm: Scalars['DateTime'];
  criadoEm: Scalars['DateTime'];
  lido?: Maybe<Scalars['Boolean']>;
  loja: Loja;
  mesa?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  alterarOrdemDaCategoria: Scalars['Boolean'];
  criarCategoria: Categoria;
  criarLoja: Loja;
  criarProduto: Produto;
  deletarCategoria: Scalars['Boolean'];
  deletarLoja: Scalars['Boolean'];
  deleteConta: Scalars['Boolean'];
  editarCategoria: Categoria;
  editarLoja: Loja;
  editarProduto: Produto;
  entrar: RegistroDeConta;
  excluirProduto: Scalars['Boolean'];
  excluirSolicitacao: Scalars['Boolean'];
  lerSolicitacoes: Scalars['Boolean'];
  moverProdutoEntreCategorias: Scalars['Boolean'];
  registrar: RegistroDeConta;
  solicitarGarcom: SolicitacaoDeGarcom;
  subscreverNotificacaoDePedidos: Scalars['Boolean'];
};


export type MutationAlterarOrdemDaCategoriaArgs = {
  id: Scalars['String'];
  idCategoria: Scalars['String'];
  indice: Scalars['Int'];
};


export type MutationCriarCategoriaArgs = {
  categoria: CriacaoDeCategoria;
};


export type MutationCriarLojaArgs = {
  entrada: EntradaDeLoja;
};


export type MutationCriarProdutoArgs = {
  data: EntradaDeProduto;
};


export type MutationDeletarCategoriaArgs = {
  id: Scalars['String'];
};


export type MutationDeletarLojaArgs = {
  id: Scalars['String'];
};


export type MutationDeleteContaArgs = {
  id: Scalars['String'];
};


export type MutationEditarCategoriaArgs = {
  categoria: EdicaoDeCategoria;
  id: Scalars['String'];
};


export type MutationEditarLojaArgs = {
  id: Scalars['String'];
  loja: EdicaoDeLoja;
};


export type MutationEditarProdutoArgs = {
  id: Scalars['String'];
  produto: EntradaDeProduto;
};


export type MutationEntrarArgs = {
  autenticacao: Autenticacao;
};


export type MutationExcluirProdutoArgs = {
  id: Scalars['String'];
};


export type MutationExcluirSolicitacaoArgs = {
  id: Scalars['String'];
};


export type MutationLerSolicitacoesArgs = {
  idRestaurante: Scalars['String'];
};


export type MutationMoverProdutoEntreCategoriasArgs = {
  idCategoria: Scalars['String'];
  idCategoriaNova?: Maybe<Scalars['String']>;
  idProduto: Scalars['String'];
  indice: Scalars['Int'];
};


export type MutationRegistrarArgs = {
  entrada: EntradaDeConta;
};


export type MutationSolicitarGarcomArgs = {
  solicitacao: CriacaoDeSolicitacaoDeGarcom;
};


export type MutationSubscreverNotificacaoDePedidosArgs = {
  idRestaurante: Scalars['String'];
  token: Scalars['String'];
};

export type CriacaoDeCategoria = {
  lojaId: Scalars['String'];
  nome: Scalars['String'];
};

export type EntradaDeLoja = {
  cnpj?: Maybe<Scalars['String']>;
  contaId: Scalars['String'];
  endereco?: Maybe<EntradaDeEndereco>;
  nome: Scalars['String'];
};

export type EntradaDeEndereco = {
  bairro: Scalars['String'];
  cep: Scalars['String'];
  cidade: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
  numero: Scalars['Int'];
  rua: Scalars['String'];
  uf: Scalars['String'];
};

export type EntradaDeProduto = {
  categoriaId?: Maybe<Scalars['String']>;
  contaId: Scalars['String'];
  descricao?: Maybe<Scalars['String']>;
  nome: Scalars['String'];
  preco?: Maybe<Scalars['Float']>;
};

export type EdicaoDeCategoria = {
  nome: Scalars['String'];
};

export type EdicaoDeLoja = {
  nome: Scalars['String'];
};

export type Autenticacao = {
  email: Scalars['String'];
  senha: Scalars['String'];
};

export type RegistroDeConta = {
  __typename?: 'RegistroDeConta';
  token: Scalars['String'];
  usuario: Usuario;
};

export type EntradaDeConta = {
  email: Scalars['String'];
  restaurante: Scalars['String'];
  senha: Scalars['String'];
};

export type CriacaoDeSolicitacaoDeGarcom = {
  idRestaurante: Scalars['String'];
  mesa?: Maybe<Scalars['String']>;
};

export const LoginDetalhado = gql`
    fragment LoginDetalhado on RegistroDeConta {
  token
  usuario {
    _id
    nome
    login
    email
    contas {
      _id
      nome
      lojas {
        _id
        nome
        conta {
          _id
        }
      }
    }
  }
}
    `;
export const CategoriaDetalhada = gql`
    fragment CategoriaDetalhada on Categoria {
  _id
  nome
  conta {
    _id
  }
  produtos {
    _id
  }
}
    `;
export const LojaDetalhada = gql`
    fragment LojaDetalhada on Loja {
  _id
  nome
  podeEditar
  banner
  logo
  cnpj
  categorias {
    _id
  }
  coresJson
  conta {
    _id
  }
  endereco {
    rua
    numero
    cep
    cidade
    bairro
    uf
    complemento
  }
}
    `;
export const ProdutoDetalhado = gql`
    fragment ProdutoDetalhado on Produto {
  _id
  nome
  preco
  urlDoPrato
  descricao
  conta {
    _id
  }
  categoria {
    _id
  }
}
    `;
export const Registrar = gql`
    mutation Registrar($entrada: EntradaDeConta!) {
  registrar(entrada: $entrada) {
    ...LoginDetalhado
  }
}
    ${LoginDetalhado}`;
export const CriarCategoria = gql`
    mutation CriarCategoria($categoria: CriacaoDeCategoria!) {
  criarCategoria(categoria: $categoria) {
    ...CategoriaDetalhada
  }
}
    ${CategoriaDetalhada}`;
export const BuscarLoja = gql`
    query BuscarLoja($idRestaurante: String!) {
  loja(id: $idRestaurante) {
    ...LojaDetalhada
  }
}
    ${LojaDetalhada}`;
export const CriarLoja = gql`
    mutation CriarLoja($entrada: EntradaDeLoja!) {
  criarLoja(entrada: $entrada) {
    ...LojaDetalhada
  }
}
    ${LojaDetalhada}`;
export const CriarProduto = gql`
    mutation CriarProduto($produto: EntradaDeProduto!) {
  criarProduto(data: $produto) {
    ...ProdutoDetalhado
  }
}
    ${ProdutoDetalhado}`;
export type RegistrarMutationVariables = Exact<{
  entrada: EntradaDeConta;
}>;


export type RegistrarMutation = { __typename?: 'Mutation', registrar: { __typename?: 'RegistroDeConta', token: string, usuario: { __typename?: 'Usuario', _id: string, nome: string, login?: Maybe<string>, email?: Maybe<string>, contas: Array<{ __typename?: 'Conta', _id: string, nome: string, lojas: Array<{ __typename?: 'Loja', _id: string, nome: string, conta: { __typename?: 'Conta', _id: string } }> }> } } };

export type LoginDetalhadoFragment = { __typename?: 'RegistroDeConta', token: string, usuario: { __typename?: 'Usuario', _id: string, nome: string, login?: Maybe<string>, email?: Maybe<string>, contas: Array<{ __typename?: 'Conta', _id: string, nome: string, lojas: Array<{ __typename?: 'Loja', _id: string, nome: string, conta: { __typename?: 'Conta', _id: string } }> }> } };

export type CategoriaDetalhadaFragment = { __typename?: 'Categoria', _id: string, nome: string, conta: { __typename?: 'Conta', _id: string }, produtos: Array<{ __typename?: 'Produto', _id: string }> };

export type CriarCategoriaMutationVariables = Exact<{
  categoria: CriacaoDeCategoria;
}>;


export type CriarCategoriaMutation = { __typename?: 'Mutation', criarCategoria: { __typename?: 'Categoria', _id: string, nome: string, conta: { __typename?: 'Conta', _id: string }, produtos: Array<{ __typename?: 'Produto', _id: string }> } };

export type BuscarLojaQueryVariables = Exact<{
  idRestaurante: Scalars['String'];
}>;


export type BuscarLojaQuery = { __typename?: 'Query', loja: { __typename?: 'Loja', _id: string, nome: string, podeEditar: boolean, banner?: Maybe<string>, logo?: Maybe<string>, cnpj?: Maybe<string>, coresJson?: Maybe<string>, categorias: Array<{ __typename?: 'Categoria', _id: string }>, conta: { __typename?: 'Conta', _id: string }, endereco?: Maybe<{ __typename?: 'Endereco', rua: string, numero: number, cep: string, cidade: string, bairro: string, uf: string, complemento?: Maybe<string> }> } };

export type CriarLojaMutationVariables = Exact<{
  entrada: EntradaDeLoja;
}>;


export type CriarLojaMutation = { __typename?: 'Mutation', criarLoja: { __typename?: 'Loja', _id: string, nome: string, podeEditar: boolean, banner?: Maybe<string>, logo?: Maybe<string>, cnpj?: Maybe<string>, coresJson?: Maybe<string>, categorias: Array<{ __typename?: 'Categoria', _id: string }>, conta: { __typename?: 'Conta', _id: string }, endereco?: Maybe<{ __typename?: 'Endereco', rua: string, numero: number, cep: string, cidade: string, bairro: string, uf: string, complemento?: Maybe<string> }> } };

export type LojaDetalhadaFragment = { __typename?: 'Loja', _id: string, nome: string, podeEditar: boolean, banner?: Maybe<string>, logo?: Maybe<string>, cnpj?: Maybe<string>, coresJson?: Maybe<string>, categorias: Array<{ __typename?: 'Categoria', _id: string }>, conta: { __typename?: 'Conta', _id: string }, endereco?: Maybe<{ __typename?: 'Endereco', rua: string, numero: number, cep: string, cidade: string, bairro: string, uf: string, complemento?: Maybe<string> }> };

export type CriarProdutoMutationVariables = Exact<{
  produto: EntradaDeProduto;
}>;


export type CriarProdutoMutation = { __typename?: 'Mutation', criarProduto: { __typename?: 'Produto', _id: string, nome: string, preco?: Maybe<number>, urlDoPrato?: Maybe<string>, descricao?: Maybe<string>, conta: { __typename?: 'Conta', _id: string }, categoria?: Maybe<{ __typename?: 'Categoria', _id: string }> } };

export type ProdutoDetalhadoFragment = { __typename?: 'Produto', _id: string, nome: string, preco?: Maybe<number>, urlDoPrato?: Maybe<string>, descricao?: Maybe<string>, conta: { __typename?: 'Conta', _id: string }, categoria?: Maybe<{ __typename?: 'Categoria', _id: string }> };
