import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Theme } from '@material-ui/core';
import { Formik, FormikProps, Form } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useAutenticacao } from '../../contexts/autenticacao';
import { CategoriaDoCardapioFragment, CategoriaDoCardapioFragmentDoc, EntradaDeProduto, ProdutoDoCardapioFragment, ProdutoDoCardapioFragmentDoc, useCriarProdutoMutation, useEditarProdutoMutation } from '../../generated/graphql';
import { usePrevious } from '../../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      '& .MuiTextField-root': {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
      },
    },
  }),
);

const DialogoDeEditarProduto: React.FC<EditarProps> = ({
    id,
    aberto,
    idCategoria,
    onFechar,
    produtoInicial,
    onFinalizar,
}) => {
    const classes = useStyles()
    const { usuario } = useAutenticacao()
    const contaId = usuario?.conta
    const formRef = useRef<FormikProps<FormularioDeProduto>>(null);
    const abertoAnterior = usePrevious(aberto);

    const [produto, setProduto] = useState(gerarFormularioDeProduto())
    const [criarProduto] = useCriarProdutoMutation({
        update(cache, { data }) {
            if (!data) return

            const categoria = cache.readFragment<CategoriaDoCardapioFragment>({
                id: `Categoria:${idCategoria}`,
                fragment: CategoriaDoCardapioFragmentDoc,
                fragmentName: 'CategoriaDoCardapio',
            })
            if (!categoria) return
            cache.writeFragment<CategoriaDoCardapioFragment>({
                id: `Categoria:${idCategoria}`,
                fragment: CategoriaDoCardapioFragmentDoc,
                fragmentName: 'CategoriaDoCardapio',
                data: {
                    ...categoria,
                    produtos: [
                        ...categoria.produtos,
                        data.criarProduto,
                    ]
                },
            })
        }
    })
    const [editarProduto] = useEditarProdutoMutation({
        update(cache, { data }) {
            if (!data) return
            const produto = data.editarProduto

            const produtoDoCache = cache.readFragment<ProdutoDoCardapioFragment>({
                id: `Produto:${produtoInicial!.id}`,
                fragment: ProdutoDoCardapioFragmentDoc,
                fragmentName: 'ProdutoDoCardapio',
            })
            if (!produtoDoCache) return
            cache.writeFragment<ProdutoDoCardapioFragment>({
                id: `Produto:${produtoInicial!.id}`,
                fragment: ProdutoDoCardapioFragmentDoc,
                fragmentName: 'ProdutoDoCardapio',
                data: { ...produto },
            })
        }
    })

    const handleClose = () => {
        onFechar && onFechar();
    };

    useEffect(() => {
        if (!aberto || aberto === abertoAnterior) return

        setProduto(produtoInicial
            ? { ...produtoInicial }
            : gerarFormularioDeProduto()
        )
        formRef.current?.resetForm()
    }, [aberto, abertoAnterior, produtoInicial]);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby={id}
            open={aberto || false}
        >
            <Formik
                initialValues={produto}
                validateOnBlur={false}
                validate={values => {
                    const errors: {
                        nome?: string
                        preco?: string
                    } = {};
                    if (!values.nome) errors.nome = 'Obrigatório'
                    if (!values.preco) errors.preco = 'Obrigatório'
                    return errors;
                }}
                onSubmit={async (valores, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        if (!contaId) throw new Error('Nenhuma conta para usuário')
                        const produto: EntradaDeProduto = {
                            nome: valores.nome,
                            descricao: valores.descricao || undefined,
                            preco: valores.preco !== null
                                ? Number(valores.preco || 0)
                                : undefined,
                            contaId: contaId,
                            categoriaId: idCategoria || undefined,
                        }
                        const { data } = produtoInicial?.id
                            ? await editarProduto({
                                variables: {
                                    id: produtoInicial.id,
                                    produto,
                                },
                            })
                            : await criarProduto({
                                variables: { produto },
                            })
                        if (!data) return
                        onFinalizar && onFinalizar('criarProduto' in data
                            ? data.criarProduto
                            : data.editarProduto
                        )
                    } catch (error) {
                        alert(error)
                    } finally {
                        setSubmitting(false)
                    }
                }}
                innerRef={formRef}
            >
                {({
                    handleChange,
                    values,
                    isSubmitting,
                    handleBlur,
                    touched,
                    errors,
                }) => <Form className={classes.form}>
                    <DialogTitle id={id}>{produto.id ? `Editar ${produtoInicial?.nome}` : 'Novo Produto'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoComplete="off"
                            name="nome"
                            required
                            fullWidth
                            label="Nome"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nome}
                            disabled={isSubmitting}
                            error={touched.nome && Boolean(errors.nome)}
                            helperText={touched.nome && errors.nome}
                        />
                        <TextField
                            autoComplete="off"
                            name="preco"
                            required
                            fullWidth
                            label="Preço"
                            type="number"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.preco}
                            disabled={isSubmitting}
                            inputProps={{
                                step: 0.01
                            }}
                            error={touched.preco && Boolean(errors.preco)}
                            helperText={touched.preco && errors.preco}
                        />
                        <TextField
                            autoComplete="off"
                            name="descricao"
                            required
                            fullWidth
                            label="Descrição"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.descricao}
                            disabled={isSubmitting}
                            multiline
                            rows={4}
                            error={touched.descricao && Boolean(errors.descricao)}
                            helperText={touched.descricao && errors.descricao}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Salvar
                        </Button>
                    </DialogActions>
                </Form>}
            </Formik>
        </Dialog>
    );

}

export type EditarProps = {
    id?: string
    idConta: string
    idCategoria?: string
    aberto?: boolean
    produtoInicial?: FormularioDeProduto
    onFechar?: () => void
    onFinalizar?: (produto: ProdutoDoCardapioFragment) => void
}

function gerarFormularioDeProduto(): FormularioDeProduto {
    return {
        nome: '',
        descricao: '',
        preco: null,
    }
}

type FormularioDeProduto = {
    id?: string
    nome: string
    descricao: string
    preco: number | null
}

export default DialogoDeEditarProduto
