import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@material-ui/core';
import { Form, Formik, FormikProps } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { BuscarCardapioDocument, BuscarCardapioQuery, useCriarCategoriaMutation } from '../../../generated/graphql';
import { usePrevious } from '../../../utils';
import { ArrayElement } from '../../../utils/types';

const DialogoDeEditarCategoria: React.FC<EditarProps> = ({
    id,
    aberto,
    onFechar,
    categoriaInicial,
    onFinalizar,
    lojaId,
}) => {
    const formRef = useRef<FormikProps<FormularioDeCategoria>>(null);
    const abertoAnterior = usePrevious(aberto);

    const [categoria, setCategoria] = useState(gerarFormularioDeCategoria())
    const [criarCategoria] = useCriarCategoriaMutation({
        update(cache, { data }) {
            if (!data) return

            const buscaDeCardapio = cache.readQuery<BuscarCardapioQuery>({
                query: BuscarCardapioDocument,
                variables: {
                    idRestaurante: lojaId,
                },
            })
            if (!buscaDeCardapio) return
            cache.writeQuery<BuscarCardapioQuery>({
                query: BuscarCardapioDocument,
                variables: {
                    idRestaurante: lojaId,
                },
                data: {
                    ...buscaDeCardapio,
                    loja: {
                        ...buscaDeCardapio.loja,
                        categorias: [
                            ...buscaDeCardapio.loja.categorias,
                            data.criarCategoria,
                        ]
                    }
                }
            })        
        }
    })

    const handleClose: React.MouseEventHandler<HTMLButtonElement> = (evento) => {
        evento.stopPropagation()
        onFechar && onFechar()
    };

    useEffect(() => {
        if (aberto === abertoAnterior) return

        setCategoria(categoriaInicial
            ? { ...categoriaInicial }
            : gerarFormularioDeCategoria()
        )
        formRef.current?.resetForm()
    }, [aberto, abertoAnterior, categoriaInicial]);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby={id}
            open={aberto || false}
        >
            <Formik
                initialValues={categoria}
                validateOnBlur={false}
                validate={(values) => {
                    const errors: {
                        nome?: string
                    } = {};
                    if (!values.nome) {
                        errors.nome = 'Obrigatório';
                    }
                    return errors;
                }}
                onSubmit={async (valores, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        const { data } = await criarCategoria({
                            variables: {
                                entrada: {
                                    lojaId,
                                    nome: valores.nome,
                                },
                            },
                        })
                        if (!data) return
                        onFinalizar && onFinalizar(data.criarCategoria)
                        onFechar && onFechar()
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
                    errors,
                    touched,
                }) => <Form>
                    <DialogTitle id={id}>{categoria.id ? `Editar ${categoriaInicial?.nome}` : 'Nova Categoria'}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoComplete="off"
                            name="nome"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            autoFocus
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.nome}
                            disabled={isSubmitting}
                            error={touched.nome && Boolean(errors.nome)}
                            helperText={(touched.nome && errors.nome) || undefined}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            disabled={isSubmitting}
                            type="button"
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
    lojaId: string
    id?: string
    aberto?: boolean
    categoriaInicial?: FormularioDeCategoria
    onFechar?: () => void
    onFinalizar?: (categoria: ArrayElement<BuscarCardapioQuery['loja']['categorias']>) => void
}

function gerarFormularioDeCategoria(): FormularioDeCategoria {
    return {
        nome: '',
    }
}

type FormularioDeCategoria = {
    id?: string
    nome: string
}

export default DialogoDeEditarCategoria
