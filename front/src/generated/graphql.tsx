import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Autenticacao = {
  email: Scalars['String'];
  senha: Scalars['String'];
};

export type Categoria = {
  __typename?: 'Categoria';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  conta: Conta;
  produtos: Array<Produto>;
};

export type Conta = {
  __typename?: 'Conta';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  dono: Usuario;
  lojas: Array<Loja>;
};

export type CriacaoDeCategoria = {
  nome: Scalars['String'];
  lojaId: Scalars['String'];
};

export type EdicaoDeCategoria = {
  nome: Scalars['String'];
};

export type EdicaoDeLoja = {
  nome: Scalars['String'];
};

export type Endereco = {
  __typename?: 'Endereco';
  rua: Scalars['String'];
  numero: Scalars['Int'];
  cep: Scalars['String'];
  cidade: Scalars['String'];
  uf: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
};

export type EntradaDeConta = {
  restaurante: Scalars['String'];
  email: Scalars['String'];
  senha: Scalars['String'];
};

export type EntradaDeEndereco = {
  rua: Scalars['String'];
  numero: Scalars['Int'];
  cep: Scalars['String'];
  cidade: Scalars['String'];
  uf: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
};

export type EntradaDeLoja = {
  nome: Scalars['String'];
  contaId: Scalars['String'];
  cnpj?: Maybe<Scalars['String']>;
  endereco?: Maybe<EntradaDeEndereco>;
};

export type EntradaDeProduto = {
  contaId: Scalars['String'];
  categoriaId?: Maybe<Scalars['String']>;
  nome: Scalars['String'];
  descricao?: Maybe<Scalars['String']>;
  preco?: Maybe<Scalars['Float']>;
};

export type Loja = {
  __typename?: 'Loja';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  cnpj?: Maybe<Scalars['String']>;
  endereco?: Maybe<Endereco>;
  conta: Conta;
  banner?: Maybe<Scalars['String']>;
  logo?: Maybe<Scalars['String']>;
  categorias: Array<Categoria>;
  podeEditar: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  registrar: RegistroDeConta;
  entrar: RegistroDeConta;
  deleteConta: Scalars['Boolean'];
  criarLoja: Loja;
  editarLoja: Loja;
  deletarLoja: Scalars['Boolean'];
  alterarOrdemDaCategoria: Scalars['Boolean'];
  criarProduto: Produto;
  editarProduto: Produto;
  excluirProduto: Scalars['Boolean'];
  criarCategoria: Categoria;
  editarCategoria: Categoria;
  deletarCategoria: Scalars['Boolean'];
  moverProdutoEntreCategorias: Scalars['Boolean'];
};


export type MutationRegistrarArgs = {
  entrada: EntradaDeConta;
};


export type MutationEntrarArgs = {
  autenticacao: Autenticacao;
};


export type MutationDeleteContaArgs = {
  id: Scalars['String'];
};


export type MutationCriarLojaArgs = {
  data: EntradaDeLoja;
};


export type MutationEditarLojaArgs = {
  loja: EdicaoDeLoja;
  id: Scalars['String'];
};


export type MutationDeletarLojaArgs = {
  id: Scalars['String'];
};


export type MutationAlterarOrdemDaCategoriaArgs = {
  indice: Scalars['Int'];
  idCategoria: Scalars['String'];
  id: Scalars['String'];
};


export type MutationCriarProdutoArgs = {
  data: EntradaDeProduto;
};


export type MutationEditarProdutoArgs = {
  produto: EntradaDeProduto;
  id: Scalars['String'];
};


export type MutationExcluirProdutoArgs = {
  id: Scalars['String'];
};


export type MutationCriarCategoriaArgs = {
  categoria: CriacaoDeCategoria;
};


export type MutationEditarCategoriaArgs = {
  categoria: EdicaoDeCategoria;
  id: Scalars['String'];
};


export type MutationDeletarCategoriaArgs = {
  id: Scalars['String'];
};


export type MutationMoverProdutoEntreCategoriasArgs = {
  idCategoriaNova?: Maybe<Scalars['String']>;
  indice: Scalars['Int'];
  idProduto: Scalars['String'];
  idCategoria: Scalars['String'];
};

export type Produto = {
  __typename?: 'Produto';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  descricao?: Maybe<Scalars['String']>;
  preco?: Maybe<Scalars['Float']>;
  urlDoPrato?: Maybe<Scalars['String']>;
  conta: Conta;
};

export type Query = {
  __typename?: 'Query';
  contas: Array<Conta>;
  conta: Conta;
  lojas: Array<Loja>;
  loja: Loja;
  produtos: Array<Produto>;
  produto: Produto;
  usuarios: Array<Usuario>;
  usuario: Usuario;
};


export type QueryContaArgs = {
  id: Scalars['String'];
};


export type QueryLojasArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type QueryLojaArgs = {
  id: Scalars['String'];
};


export type QueryProdutoArgs = {
  id: Scalars['String'];
};


export type QueryUsuarioArgs = {
  id: Scalars['String'];
};

export type RegistroDeConta = {
  __typename?: 'RegistroDeConta';
  token: Scalars['String'];
  usuario: Usuario;
};

export type Usuario = {
  __typename?: 'Usuario';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  login?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  contas: Array<Conta>;
};

export type RegistrarMutationVariables = Exact<{
  entrada: EntradaDeConta;
}>;


export type RegistrarMutation = (
  { __typename?: 'Mutation' }
  & { registrar: (
    { __typename?: 'RegistroDeConta' }
    & LoginFragment
  ) }
);

export type LogarMutationVariables = Exact<{
  autenticacao: Autenticacao;
}>;


export type LogarMutation = (
  { __typename?: 'Mutation' }
  & { entrar: (
    { __typename?: 'RegistroDeConta' }
    & LoginFragment
  ) }
);

export type LoginFragment = (
  { __typename?: 'RegistroDeConta' }
  & Pick<RegistroDeConta, 'token'>
  & { usuario: (
    { __typename?: 'Usuario' }
    & Pick<Usuario, '_id' | 'nome'>
    & { contas: Array<(
      { __typename?: 'Conta' }
      & Pick<Conta, '_id' | 'nome'>
      & { lojas: Array<(
        { __typename?: 'Loja' }
        & Pick<Loja, '_id'>
      )> }
    )> }
  ) }
);

export type BuscarCardapioQueryVariables = Exact<{
  idRestaurante: Scalars['String'];
}>;


export type BuscarCardapioQuery = (
  { __typename?: 'Query' }
  & { loja: (
    { __typename?: 'Loja' }
    & Pick<Loja, 'podeEditar' | 'banner' | 'logo'>
    & { categorias: Array<(
      { __typename?: 'Categoria' }
      & CategoriaDoCardapioFragment
    )> }
    & LojaDoCardapioFragment
  ) }
);

export type CategoriaDoCardapioFragment = (
  { __typename?: 'Categoria' }
  & Pick<Categoria, '_id' | 'nome'>
  & { produtos: Array<(
    { __typename?: 'Produto' }
    & ProdutoDoCardapioFragment
  )> }
);

export type CriarCategoriaMutationVariables = Exact<{
  categoria: CriacaoDeCategoria;
}>;


export type CriarCategoriaMutation = (
  { __typename?: 'Mutation' }
  & { criarCategoria: (
    { __typename?: 'Categoria' }
    & CategoriaDoCardapioFragment
  ) }
);

export type EditarCategoriaMutationVariables = Exact<{
  id: Scalars['String'];
  categoria: EdicaoDeCategoria;
}>;


export type EditarCategoriaMutation = (
  { __typename?: 'Mutation' }
  & { editarCategoria: (
    { __typename?: 'Categoria' }
    & CategoriaDoCardapioFragment
  ) }
);

export type MoverProdutoEntreCategoriasMutationVariables = Exact<{
  idCategoria: Scalars['String'];
  idProduto: Scalars['String'];
  indice: Scalars['Int'];
  idCategoriaNova?: Maybe<Scalars['String']>;
}>;


export type MoverProdutoEntreCategoriasMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'moverProdutoEntreCategorias'>
);

export type RemoverCategoriaMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoverCategoriaMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletarCategoria'>
);

export type EditarLojaMutationVariables = Exact<{
  id: Scalars['String'];
  loja: EdicaoDeLoja;
}>;


export type EditarLojaMutation = (
  { __typename?: 'Mutation' }
  & { editarLoja: (
    { __typename?: 'Loja' }
    & LojaDoCardapioFragment
  ) }
);

export type LojaDoCardapioFragment = (
  { __typename?: 'Loja' }
  & Pick<Loja, '_id' | 'nome'>
);

export type MoverCategoriaDaLojaMutationVariables = Exact<{
  id: Scalars['String'];
  idCategoria: Scalars['String'];
  indice: Scalars['Int'];
}>;


export type MoverCategoriaDaLojaMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'alterarOrdemDaCategoria'>
);

export type CriarProdutoMutationVariables = Exact<{
  produto: EntradaDeProduto;
}>;


export type CriarProdutoMutation = (
  { __typename?: 'Mutation' }
  & { criarProduto: (
    { __typename?: 'Produto' }
    & ProdutoDoCardapioFragment
  ) }
);

export type EditarProdutoMutationVariables = Exact<{
  id: Scalars['String'];
  produto: EntradaDeProduto;
}>;


export type EditarProdutoMutation = (
  { __typename?: 'Mutation' }
  & { editarProduto: (
    { __typename?: 'Produto' }
    & ProdutoDoCardapioFragment
  ) }
);

export type ExcluirProdutoMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type ExcluirProdutoMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'excluirProduto'>
);

export type ObterProdutoDoCardapioQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type ObterProdutoDoCardapioQuery = (
  { __typename?: 'Query' }
  & { produto: (
    { __typename?: 'Produto' }
    & ProdutoDoCardapioFragment
  ) }
);

export type ProdutoDoCardapioFragment = (
  { __typename?: 'Produto' }
  & Pick<Produto, '_id' | 'nome' | 'preco' | 'urlDoPrato' | 'descricao'>
);

export type BuscarRestaurantesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type BuscarRestaurantesQuery = (
  { __typename?: 'Query' }
  & { lojas: Array<(
    { __typename?: 'Loja' }
    & Pick<Loja, '_id' | 'nome' | 'banner'>
  )> }
);

export const LoginFragmentDoc = gql`
    fragment Login on RegistroDeConta {
  token
  usuario {
    _id
    nome
    contas {
      _id
      nome
      lojas {
        _id
      }
    }
  }
}
    `;
export const ProdutoDoCardapioFragmentDoc = gql`
    fragment ProdutoDoCardapio on Produto {
  _id
  nome
  preco
  urlDoPrato
  descricao
}
    `;
export const CategoriaDoCardapioFragmentDoc = gql`
    fragment CategoriaDoCardapio on Categoria {
  _id
  nome
  produtos {
    ...ProdutoDoCardapio
  }
}
    ${ProdutoDoCardapioFragmentDoc}`;
export const LojaDoCardapioFragmentDoc = gql`
    fragment LojaDoCardapio on Loja {
  _id
  nome
}
    `;
export const RegistrarDocument = gql`
    mutation Registrar($entrada: EntradaDeConta!) {
  registrar(entrada: $entrada) {
    ...Login
  }
}
    ${LoginFragmentDoc}`;
export type RegistrarMutationFn = Apollo.MutationFunction<RegistrarMutation, RegistrarMutationVariables>;

/**
 * __useRegistrarMutation__
 *
 * To run a mutation, you first call `useRegistrarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegistrarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registrarMutation, { data, loading, error }] = useRegistrarMutation({
 *   variables: {
 *      entrada: // value for 'entrada'
 *   },
 * });
 */
export function useRegistrarMutation(baseOptions?: Apollo.MutationHookOptions<RegistrarMutation, RegistrarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegistrarMutation, RegistrarMutationVariables>(RegistrarDocument, options);
      }
export type RegistrarMutationHookResult = ReturnType<typeof useRegistrarMutation>;
export type RegistrarMutationResult = Apollo.MutationResult<RegistrarMutation>;
export type RegistrarMutationOptions = Apollo.BaseMutationOptions<RegistrarMutation, RegistrarMutationVariables>;
export const LogarDocument = gql`
    mutation Logar($autenticacao: Autenticacao!) {
  entrar(autenticacao: $autenticacao) {
    ...Login
  }
}
    ${LoginFragmentDoc}`;
export type LogarMutationFn = Apollo.MutationFunction<LogarMutation, LogarMutationVariables>;

/**
 * __useLogarMutation__
 *
 * To run a mutation, you first call `useLogarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logarMutation, { data, loading, error }] = useLogarMutation({
 *   variables: {
 *      autenticacao: // value for 'autenticacao'
 *   },
 * });
 */
export function useLogarMutation(baseOptions?: Apollo.MutationHookOptions<LogarMutation, LogarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogarMutation, LogarMutationVariables>(LogarDocument, options);
      }
export type LogarMutationHookResult = ReturnType<typeof useLogarMutation>;
export type LogarMutationResult = Apollo.MutationResult<LogarMutation>;
export type LogarMutationOptions = Apollo.BaseMutationOptions<LogarMutation, LogarMutationVariables>;
export const BuscarCardapioDocument = gql`
    query BuscarCardapio($idRestaurante: String!) {
  loja(id: $idRestaurante) {
    ...LojaDoCardapio
    podeEditar
    banner
    logo
    categorias {
      ...CategoriaDoCardapio
    }
  }
}
    ${LojaDoCardapioFragmentDoc}
${CategoriaDoCardapioFragmentDoc}`;

/**
 * __useBuscarCardapioQuery__
 *
 * To run a query within a React component, call `useBuscarCardapioQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuscarCardapioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuscarCardapioQuery({
 *   variables: {
 *      idRestaurante: // value for 'idRestaurante'
 *   },
 * });
 */
export function useBuscarCardapioQuery(baseOptions: Apollo.QueryHookOptions<BuscarCardapioQuery, BuscarCardapioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuscarCardapioQuery, BuscarCardapioQueryVariables>(BuscarCardapioDocument, options);
      }
export function useBuscarCardapioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuscarCardapioQuery, BuscarCardapioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuscarCardapioQuery, BuscarCardapioQueryVariables>(BuscarCardapioDocument, options);
        }
export type BuscarCardapioQueryHookResult = ReturnType<typeof useBuscarCardapioQuery>;
export type BuscarCardapioLazyQueryHookResult = ReturnType<typeof useBuscarCardapioLazyQuery>;
export type BuscarCardapioQueryResult = Apollo.QueryResult<BuscarCardapioQuery, BuscarCardapioQueryVariables>;
export const CriarCategoriaDocument = gql`
    mutation CriarCategoria($categoria: CriacaoDeCategoria!) {
  criarCategoria(categoria: $categoria) {
    ...CategoriaDoCardapio
  }
}
    ${CategoriaDoCardapioFragmentDoc}`;
export type CriarCategoriaMutationFn = Apollo.MutationFunction<CriarCategoriaMutation, CriarCategoriaMutationVariables>;

/**
 * __useCriarCategoriaMutation__
 *
 * To run a mutation, you first call `useCriarCategoriaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCriarCategoriaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [criarCategoriaMutation, { data, loading, error }] = useCriarCategoriaMutation({
 *   variables: {
 *      categoria: // value for 'categoria'
 *   },
 * });
 */
export function useCriarCategoriaMutation(baseOptions?: Apollo.MutationHookOptions<CriarCategoriaMutation, CriarCategoriaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CriarCategoriaMutation, CriarCategoriaMutationVariables>(CriarCategoriaDocument, options);
      }
export type CriarCategoriaMutationHookResult = ReturnType<typeof useCriarCategoriaMutation>;
export type CriarCategoriaMutationResult = Apollo.MutationResult<CriarCategoriaMutation>;
export type CriarCategoriaMutationOptions = Apollo.BaseMutationOptions<CriarCategoriaMutation, CriarCategoriaMutationVariables>;
export const EditarCategoriaDocument = gql`
    mutation EditarCategoria($id: String!, $categoria: EdicaoDeCategoria!) {
  editarCategoria(id: $id, categoria: $categoria) {
    ...CategoriaDoCardapio
  }
}
    ${CategoriaDoCardapioFragmentDoc}`;
export type EditarCategoriaMutationFn = Apollo.MutationFunction<EditarCategoriaMutation, EditarCategoriaMutationVariables>;

/**
 * __useEditarCategoriaMutation__
 *
 * To run a mutation, you first call `useEditarCategoriaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditarCategoriaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editarCategoriaMutation, { data, loading, error }] = useEditarCategoriaMutation({
 *   variables: {
 *      id: // value for 'id'
 *      categoria: // value for 'categoria'
 *   },
 * });
 */
export function useEditarCategoriaMutation(baseOptions?: Apollo.MutationHookOptions<EditarCategoriaMutation, EditarCategoriaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditarCategoriaMutation, EditarCategoriaMutationVariables>(EditarCategoriaDocument, options);
      }
export type EditarCategoriaMutationHookResult = ReturnType<typeof useEditarCategoriaMutation>;
export type EditarCategoriaMutationResult = Apollo.MutationResult<EditarCategoriaMutation>;
export type EditarCategoriaMutationOptions = Apollo.BaseMutationOptions<EditarCategoriaMutation, EditarCategoriaMutationVariables>;
export const MoverProdutoEntreCategoriasDocument = gql`
    mutation MoverProdutoEntreCategorias($idCategoria: String!, $idProduto: String!, $indice: Int!, $idCategoriaNova: String) {
  moverProdutoEntreCategorias(
    idCategoria: $idCategoria
    idProduto: $idProduto
    indice: $indice
    idCategoriaNova: $idCategoriaNova
  )
}
    `;
export type MoverProdutoEntreCategoriasMutationFn = Apollo.MutationFunction<MoverProdutoEntreCategoriasMutation, MoverProdutoEntreCategoriasMutationVariables>;

/**
 * __useMoverProdutoEntreCategoriasMutation__
 *
 * To run a mutation, you first call `useMoverProdutoEntreCategoriasMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoverProdutoEntreCategoriasMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moverProdutoEntreCategoriasMutation, { data, loading, error }] = useMoverProdutoEntreCategoriasMutation({
 *   variables: {
 *      idCategoria: // value for 'idCategoria'
 *      idProduto: // value for 'idProduto'
 *      indice: // value for 'indice'
 *      idCategoriaNova: // value for 'idCategoriaNova'
 *   },
 * });
 */
export function useMoverProdutoEntreCategoriasMutation(baseOptions?: Apollo.MutationHookOptions<MoverProdutoEntreCategoriasMutation, MoverProdutoEntreCategoriasMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoverProdutoEntreCategoriasMutation, MoverProdutoEntreCategoriasMutationVariables>(MoverProdutoEntreCategoriasDocument, options);
      }
export type MoverProdutoEntreCategoriasMutationHookResult = ReturnType<typeof useMoverProdutoEntreCategoriasMutation>;
export type MoverProdutoEntreCategoriasMutationResult = Apollo.MutationResult<MoverProdutoEntreCategoriasMutation>;
export type MoverProdutoEntreCategoriasMutationOptions = Apollo.BaseMutationOptions<MoverProdutoEntreCategoriasMutation, MoverProdutoEntreCategoriasMutationVariables>;
export const RemoverCategoriaDocument = gql`
    mutation RemoverCategoria($id: String!) {
  deletarCategoria(id: $id)
}
    `;
export type RemoverCategoriaMutationFn = Apollo.MutationFunction<RemoverCategoriaMutation, RemoverCategoriaMutationVariables>;

/**
 * __useRemoverCategoriaMutation__
 *
 * To run a mutation, you first call `useRemoverCategoriaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoverCategoriaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removerCategoriaMutation, { data, loading, error }] = useRemoverCategoriaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoverCategoriaMutation(baseOptions?: Apollo.MutationHookOptions<RemoverCategoriaMutation, RemoverCategoriaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoverCategoriaMutation, RemoverCategoriaMutationVariables>(RemoverCategoriaDocument, options);
      }
export type RemoverCategoriaMutationHookResult = ReturnType<typeof useRemoverCategoriaMutation>;
export type RemoverCategoriaMutationResult = Apollo.MutationResult<RemoverCategoriaMutation>;
export type RemoverCategoriaMutationOptions = Apollo.BaseMutationOptions<RemoverCategoriaMutation, RemoverCategoriaMutationVariables>;
export const EditarLojaDocument = gql`
    mutation EditarLoja($id: String!, $loja: EdicaoDeLoja!) {
  editarLoja(id: $id, loja: $loja) {
    ...LojaDoCardapio
  }
}
    ${LojaDoCardapioFragmentDoc}`;
export type EditarLojaMutationFn = Apollo.MutationFunction<EditarLojaMutation, EditarLojaMutationVariables>;

/**
 * __useEditarLojaMutation__
 *
 * To run a mutation, you first call `useEditarLojaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditarLojaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editarLojaMutation, { data, loading, error }] = useEditarLojaMutation({
 *   variables: {
 *      id: // value for 'id'
 *      loja: // value for 'loja'
 *   },
 * });
 */
export function useEditarLojaMutation(baseOptions?: Apollo.MutationHookOptions<EditarLojaMutation, EditarLojaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditarLojaMutation, EditarLojaMutationVariables>(EditarLojaDocument, options);
      }
export type EditarLojaMutationHookResult = ReturnType<typeof useEditarLojaMutation>;
export type EditarLojaMutationResult = Apollo.MutationResult<EditarLojaMutation>;
export type EditarLojaMutationOptions = Apollo.BaseMutationOptions<EditarLojaMutation, EditarLojaMutationVariables>;
export const MoverCategoriaDaLojaDocument = gql`
    mutation MoverCategoriaDaLoja($id: String!, $idCategoria: String!, $indice: Int!) {
  alterarOrdemDaCategoria(id: $id, idCategoria: $idCategoria, indice: $indice)
}
    `;
export type MoverCategoriaDaLojaMutationFn = Apollo.MutationFunction<MoverCategoriaDaLojaMutation, MoverCategoriaDaLojaMutationVariables>;

/**
 * __useMoverCategoriaDaLojaMutation__
 *
 * To run a mutation, you first call `useMoverCategoriaDaLojaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoverCategoriaDaLojaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moverCategoriaDaLojaMutation, { data, loading, error }] = useMoverCategoriaDaLojaMutation({
 *   variables: {
 *      id: // value for 'id'
 *      idCategoria: // value for 'idCategoria'
 *      indice: // value for 'indice'
 *   },
 * });
 */
export function useMoverCategoriaDaLojaMutation(baseOptions?: Apollo.MutationHookOptions<MoverCategoriaDaLojaMutation, MoverCategoriaDaLojaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoverCategoriaDaLojaMutation, MoverCategoriaDaLojaMutationVariables>(MoverCategoriaDaLojaDocument, options);
      }
export type MoverCategoriaDaLojaMutationHookResult = ReturnType<typeof useMoverCategoriaDaLojaMutation>;
export type MoverCategoriaDaLojaMutationResult = Apollo.MutationResult<MoverCategoriaDaLojaMutation>;
export type MoverCategoriaDaLojaMutationOptions = Apollo.BaseMutationOptions<MoverCategoriaDaLojaMutation, MoverCategoriaDaLojaMutationVariables>;
export const CriarProdutoDocument = gql`
    mutation CriarProduto($produto: EntradaDeProduto!) {
  criarProduto(data: $produto) {
    ...ProdutoDoCardapio
  }
}
    ${ProdutoDoCardapioFragmentDoc}`;
export type CriarProdutoMutationFn = Apollo.MutationFunction<CriarProdutoMutation, CriarProdutoMutationVariables>;

/**
 * __useCriarProdutoMutation__
 *
 * To run a mutation, you first call `useCriarProdutoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCriarProdutoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [criarProdutoMutation, { data, loading, error }] = useCriarProdutoMutation({
 *   variables: {
 *      produto: // value for 'produto'
 *   },
 * });
 */
export function useCriarProdutoMutation(baseOptions?: Apollo.MutationHookOptions<CriarProdutoMutation, CriarProdutoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CriarProdutoMutation, CriarProdutoMutationVariables>(CriarProdutoDocument, options);
      }
export type CriarProdutoMutationHookResult = ReturnType<typeof useCriarProdutoMutation>;
export type CriarProdutoMutationResult = Apollo.MutationResult<CriarProdutoMutation>;
export type CriarProdutoMutationOptions = Apollo.BaseMutationOptions<CriarProdutoMutation, CriarProdutoMutationVariables>;
export const EditarProdutoDocument = gql`
    mutation EditarProduto($id: String!, $produto: EntradaDeProduto!) {
  editarProduto(id: $id, produto: $produto) {
    ...ProdutoDoCardapio
  }
}
    ${ProdutoDoCardapioFragmentDoc}`;
export type EditarProdutoMutationFn = Apollo.MutationFunction<EditarProdutoMutation, EditarProdutoMutationVariables>;

/**
 * __useEditarProdutoMutation__
 *
 * To run a mutation, you first call `useEditarProdutoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditarProdutoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editarProdutoMutation, { data, loading, error }] = useEditarProdutoMutation({
 *   variables: {
 *      id: // value for 'id'
 *      produto: // value for 'produto'
 *   },
 * });
 */
export function useEditarProdutoMutation(baseOptions?: Apollo.MutationHookOptions<EditarProdutoMutation, EditarProdutoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditarProdutoMutation, EditarProdutoMutationVariables>(EditarProdutoDocument, options);
      }
export type EditarProdutoMutationHookResult = ReturnType<typeof useEditarProdutoMutation>;
export type EditarProdutoMutationResult = Apollo.MutationResult<EditarProdutoMutation>;
export type EditarProdutoMutationOptions = Apollo.BaseMutationOptions<EditarProdutoMutation, EditarProdutoMutationVariables>;
export const ExcluirProdutoDocument = gql`
    mutation ExcluirProduto($id: String!) {
  excluirProduto(id: $id)
}
    `;
export type ExcluirProdutoMutationFn = Apollo.MutationFunction<ExcluirProdutoMutation, ExcluirProdutoMutationVariables>;

/**
 * __useExcluirProdutoMutation__
 *
 * To run a mutation, you first call `useExcluirProdutoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExcluirProdutoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [excluirProdutoMutation, { data, loading, error }] = useExcluirProdutoMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useExcluirProdutoMutation(baseOptions?: Apollo.MutationHookOptions<ExcluirProdutoMutation, ExcluirProdutoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExcluirProdutoMutation, ExcluirProdutoMutationVariables>(ExcluirProdutoDocument, options);
      }
export type ExcluirProdutoMutationHookResult = ReturnType<typeof useExcluirProdutoMutation>;
export type ExcluirProdutoMutationResult = Apollo.MutationResult<ExcluirProdutoMutation>;
export type ExcluirProdutoMutationOptions = Apollo.BaseMutationOptions<ExcluirProdutoMutation, ExcluirProdutoMutationVariables>;
export const ObterProdutoDoCardapioDocument = gql`
    query ObterProdutoDoCardapio($id: String!) {
  produto(id: $id) {
    ...ProdutoDoCardapio
  }
}
    ${ProdutoDoCardapioFragmentDoc}`;

/**
 * __useObterProdutoDoCardapioQuery__
 *
 * To run a query within a React component, call `useObterProdutoDoCardapioQuery` and pass it any options that fit your needs.
 * When your component renders, `useObterProdutoDoCardapioQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useObterProdutoDoCardapioQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useObterProdutoDoCardapioQuery(baseOptions: Apollo.QueryHookOptions<ObterProdutoDoCardapioQuery, ObterProdutoDoCardapioQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ObterProdutoDoCardapioQuery, ObterProdutoDoCardapioQueryVariables>(ObterProdutoDoCardapioDocument, options);
      }
export function useObterProdutoDoCardapioLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ObterProdutoDoCardapioQuery, ObterProdutoDoCardapioQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ObterProdutoDoCardapioQuery, ObterProdutoDoCardapioQueryVariables>(ObterProdutoDoCardapioDocument, options);
        }
export type ObterProdutoDoCardapioQueryHookResult = ReturnType<typeof useObterProdutoDoCardapioQuery>;
export type ObterProdutoDoCardapioLazyQueryHookResult = ReturnType<typeof useObterProdutoDoCardapioLazyQuery>;
export type ObterProdutoDoCardapioQueryResult = Apollo.QueryResult<ObterProdutoDoCardapioQuery, ObterProdutoDoCardapioQueryVariables>;
export const BuscarRestaurantesDocument = gql`
    query BuscarRestaurantes($limit: Int, $offset: Int) {
  lojas(limit: $limit, offset: $offset) {
    _id
    nome
    banner
  }
}
    `;

/**
 * __useBuscarRestaurantesQuery__
 *
 * To run a query within a React component, call `useBuscarRestaurantesQuery` and pass it any options that fit your needs.
 * When your component renders, `useBuscarRestaurantesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBuscarRestaurantesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useBuscarRestaurantesQuery(baseOptions?: Apollo.QueryHookOptions<BuscarRestaurantesQuery, BuscarRestaurantesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BuscarRestaurantesQuery, BuscarRestaurantesQueryVariables>(BuscarRestaurantesDocument, options);
      }
export function useBuscarRestaurantesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BuscarRestaurantesQuery, BuscarRestaurantesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BuscarRestaurantesQuery, BuscarRestaurantesQueryVariables>(BuscarRestaurantesDocument, options);
        }
export type BuscarRestaurantesQueryHookResult = ReturnType<typeof useBuscarRestaurantesQuery>;
export type BuscarRestaurantesLazyQueryHookResult = ReturnType<typeof useBuscarRestaurantesLazyQuery>;
export type BuscarRestaurantesQueryResult = Apollo.QueryResult<BuscarRestaurantesQuery, BuscarRestaurantesQueryVariables>;
export type CategoriaKeySpecifier = ('_id' | 'nome' | 'conta' | 'produtos' | CategoriaKeySpecifier)[];
export type CategoriaFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	nome?: FieldPolicy<any> | FieldReadFunction<any>,
	conta?: FieldPolicy<any> | FieldReadFunction<any>,
	produtos?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ContaKeySpecifier = ('_id' | 'nome' | 'dono' | 'lojas' | ContaKeySpecifier)[];
export type ContaFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	nome?: FieldPolicy<any> | FieldReadFunction<any>,
	dono?: FieldPolicy<any> | FieldReadFunction<any>,
	lojas?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnderecoKeySpecifier = ('rua' | 'numero' | 'cep' | 'cidade' | 'uf' | 'complemento' | EnderecoKeySpecifier)[];
export type EnderecoFieldPolicy = {
	rua?: FieldPolicy<any> | FieldReadFunction<any>,
	numero?: FieldPolicy<any> | FieldReadFunction<any>,
	cep?: FieldPolicy<any> | FieldReadFunction<any>,
	cidade?: FieldPolicy<any> | FieldReadFunction<any>,
	uf?: FieldPolicy<any> | FieldReadFunction<any>,
	complemento?: FieldPolicy<any> | FieldReadFunction<any>
};
export type LojaKeySpecifier = ('_id' | 'nome' | 'cnpj' | 'endereco' | 'conta' | 'banner' | 'logo' | 'categorias' | 'podeEditar' | LojaKeySpecifier)[];
export type LojaFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	nome?: FieldPolicy<any> | FieldReadFunction<any>,
	cnpj?: FieldPolicy<any> | FieldReadFunction<any>,
	endereco?: FieldPolicy<any> | FieldReadFunction<any>,
	conta?: FieldPolicy<any> | FieldReadFunction<any>,
	banner?: FieldPolicy<any> | FieldReadFunction<any>,
	logo?: FieldPolicy<any> | FieldReadFunction<any>,
	categorias?: FieldPolicy<any> | FieldReadFunction<any>,
	podeEditar?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('registrar' | 'entrar' | 'deleteConta' | 'criarLoja' | 'editarLoja' | 'deletarLoja' | 'alterarOrdemDaCategoria' | 'criarProduto' | 'editarProduto' | 'excluirProduto' | 'criarCategoria' | 'editarCategoria' | 'deletarCategoria' | 'moverProdutoEntreCategorias' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	registrar?: FieldPolicy<any> | FieldReadFunction<any>,
	entrar?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteConta?: FieldPolicy<any> | FieldReadFunction<any>,
	criarLoja?: FieldPolicy<any> | FieldReadFunction<any>,
	editarLoja?: FieldPolicy<any> | FieldReadFunction<any>,
	deletarLoja?: FieldPolicy<any> | FieldReadFunction<any>,
	alterarOrdemDaCategoria?: FieldPolicy<any> | FieldReadFunction<any>,
	criarProduto?: FieldPolicy<any> | FieldReadFunction<any>,
	editarProduto?: FieldPolicy<any> | FieldReadFunction<any>,
	excluirProduto?: FieldPolicy<any> | FieldReadFunction<any>,
	criarCategoria?: FieldPolicy<any> | FieldReadFunction<any>,
	editarCategoria?: FieldPolicy<any> | FieldReadFunction<any>,
	deletarCategoria?: FieldPolicy<any> | FieldReadFunction<any>,
	moverProdutoEntreCategorias?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProdutoKeySpecifier = ('_id' | 'nome' | 'descricao' | 'preco' | 'urlDoPrato' | 'conta' | ProdutoKeySpecifier)[];
export type ProdutoFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	nome?: FieldPolicy<any> | FieldReadFunction<any>,
	descricao?: FieldPolicy<any> | FieldReadFunction<any>,
	preco?: FieldPolicy<any> | FieldReadFunction<any>,
	urlDoPrato?: FieldPolicy<any> | FieldReadFunction<any>,
	conta?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('contas' | 'conta' | 'lojas' | 'loja' | 'produtos' | 'produto' | 'usuarios' | 'usuario' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	contas?: FieldPolicy<any> | FieldReadFunction<any>,
	conta?: FieldPolicy<any> | FieldReadFunction<any>,
	lojas?: FieldPolicy<any> | FieldReadFunction<any>,
	loja?: FieldPolicy<any> | FieldReadFunction<any>,
	produtos?: FieldPolicy<any> | FieldReadFunction<any>,
	produto?: FieldPolicy<any> | FieldReadFunction<any>,
	usuarios?: FieldPolicy<any> | FieldReadFunction<any>,
	usuario?: FieldPolicy<any> | FieldReadFunction<any>
};
export type RegistroDeContaKeySpecifier = ('token' | 'usuario' | RegistroDeContaKeySpecifier)[];
export type RegistroDeContaFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	usuario?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UsuarioKeySpecifier = ('_id' | 'nome' | 'login' | 'email' | 'contas' | UsuarioKeySpecifier)[];
export type UsuarioFieldPolicy = {
	_id?: FieldPolicy<any> | FieldReadFunction<any>,
	nome?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	contas?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Categoria?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CategoriaKeySpecifier | (() => undefined | CategoriaKeySpecifier),
		fields?: CategoriaFieldPolicy,
	},
	Conta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ContaKeySpecifier | (() => undefined | ContaKeySpecifier),
		fields?: ContaFieldPolicy,
	},
	Endereco?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnderecoKeySpecifier | (() => undefined | EnderecoKeySpecifier),
		fields?: EnderecoFieldPolicy,
	},
	Loja?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | LojaKeySpecifier | (() => undefined | LojaKeySpecifier),
		fields?: LojaFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Produto?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProdutoKeySpecifier | (() => undefined | ProdutoKeySpecifier),
		fields?: ProdutoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	RegistroDeConta?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | RegistroDeContaKeySpecifier | (() => undefined | RegistroDeContaKeySpecifier),
		fields?: RegistroDeContaFieldPolicy,
	},
	Usuario?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UsuarioKeySpecifier | (() => undefined | UsuarioKeySpecifier),
		fields?: UsuarioFieldPolicy,
	}
};