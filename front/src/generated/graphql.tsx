import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  login: Scalars['String'];
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

export type Endereco = {
  __typename?: 'Endereco';
  rua: Scalars['String'];
  numero: Scalars['Int'];
  cep: Scalars['String'];
  cidade: Scalars['String'];
  uf: Scalars['String'];
  complemento?: Maybe<Scalars['String']>;
};

export type EntradaDeCategoria = {
  nome: Scalars['String'];
  lojaId?: Maybe<Scalars['String']>;
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
  entrar: Scalars['String'];
  criarConta: RegistroDeConta;
  deleteConta: Scalars['Boolean'];
  criarLoja: Loja;
  deletarLoja: Scalars['Boolean'];
  criarProduto: Produto;
  editarProduto: Produto;
  criarCategoria: Categoria;
  deletarCategoria: Scalars['Boolean'];
};


export type MutationEntrarArgs = {
  autenticacao: Autenticacao;
};


export type MutationCriarContaArgs = {
  entrada: EntradaDeConta;
};


export type MutationDeleteContaArgs = {
  id: Scalars['String'];
};


export type MutationCriarLojaArgs = {
  data: EntradaDeLoja;
};


export type MutationDeletarLojaArgs = {
  id: Scalars['String'];
};


export type MutationCriarProdutoArgs = {
  data: EntradaDeProduto;
};


export type MutationEditarProdutoArgs = {
  produto: EntradaDeProduto;
  id: Scalars['String'];
};


export type MutationCriarCategoriaArgs = {
  data: EntradaDeCategoria;
};


export type MutationDeletarCategoriaArgs = {
  id: Scalars['String'];
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
  conta: Conta;
};

export type Usuario = {
  __typename?: 'Usuario';
  _id: Scalars['ID'];
  nome: Scalars['String'];
  login: Scalars['String'];
  email: Scalars['String'];
  contas: Array<Conta>;
};

export type CriarContaMutationVariables = Exact<{
  entrada: EntradaDeConta;
}>;


export type CriarContaMutation = (
  { __typename?: 'Mutation' }
  & { criarConta: (
    { __typename?: 'RegistroDeConta' }
    & Pick<RegistroDeConta, 'token'>
    & { conta: (
      { __typename?: 'Conta' }
      & Pick<Conta, '_id'>
      & { dono: (
        { __typename?: 'Usuario' }
        & Pick<Usuario, '_id' | 'nome'>
      ), lojas: Array<(
        { __typename?: 'Loja' }
        & Pick<Loja, '_id'>
      )> }
    ) }
  ) }
);

export type LogarMutationVariables = Exact<{
  autenticacao: Autenticacao;
}>;


export type LogarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'entrar'>
);

export type BuscarCardapioQueryVariables = Exact<{
  idRestaurante: Scalars['String'];
}>;


export type BuscarCardapioQuery = (
  { __typename?: 'Query' }
  & { loja: (
    { __typename?: 'Loja' }
    & Pick<Loja, 'nome' | 'podeEditar' | 'banner' | 'logo'>
    & { categorias: Array<(
      { __typename?: 'Categoria' }
      & CategoriaDoCardapioFragment
    )> }
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
  entrada: EntradaDeCategoria;
}>;


export type CriarCategoriaMutation = (
  { __typename?: 'Mutation' }
  & { criarCategoria: (
    { __typename?: 'Categoria' }
    & CategoriaDoCardapioFragment
  ) }
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

export type ProdutoDoCardapioFragment = (
  { __typename?: 'Produto' }
  & Pick<Produto, '_id' | 'nome' | 'preco' | 'urlDoPrato' | 'descricao'>
);

export type RemoverCategoriaMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type RemoverCategoriaMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletarCategoria'>
);

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
export const CriarContaDocument = gql`
    mutation CriarConta($entrada: EntradaDeConta!) {
  criarConta(entrada: $entrada) {
    token
    conta {
      _id
      dono {
        _id
        nome
      }
      lojas {
        _id
      }
    }
  }
}
    `;
export type CriarContaMutationFn = Apollo.MutationFunction<CriarContaMutation, CriarContaMutationVariables>;

/**
 * __useCriarContaMutation__
 *
 * To run a mutation, you first call `useCriarContaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCriarContaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [criarContaMutation, { data, loading, error }] = useCriarContaMutation({
 *   variables: {
 *      entrada: // value for 'entrada'
 *   },
 * });
 */
export function useCriarContaMutation(baseOptions?: Apollo.MutationHookOptions<CriarContaMutation, CriarContaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CriarContaMutation, CriarContaMutationVariables>(CriarContaDocument, options);
      }
export type CriarContaMutationHookResult = ReturnType<typeof useCriarContaMutation>;
export type CriarContaMutationResult = Apollo.MutationResult<CriarContaMutation>;
export type CriarContaMutationOptions = Apollo.BaseMutationOptions<CriarContaMutation, CriarContaMutationVariables>;
export const LogarDocument = gql`
    mutation Logar($autenticacao: Autenticacao!) {
  entrar(autenticacao: $autenticacao)
}
    `;
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
    nome
    podeEditar
    banner
    logo
    categorias {
      ...CategoriaDoCardapio
    }
  }
}
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
    mutation CriarCategoria($entrada: EntradaDeCategoria!) {
  criarCategoria(data: $entrada) {
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
 *      entrada: // value for 'entrada'
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