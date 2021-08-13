import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, TextField, Theme } from '@material-ui/core';
import { Formik, FormikProps, Form } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import {
    EdicaoDeLoja,
    LojaDoCardapioFragment,
    LojaDoCardapioFragmentDoc,
    useEditarLojaMutation,
} from '../../../generated/graphql';
import { usePrevious } from "../../../utils/reactUtils";

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

const DialogoDeEditarLoja: React.FC<EditarProps> = ({
    id,
    aberto,
    onFechar,
    lojaInicial,
    onFinalizar,
}) => {
    const classes = useStyles()
    const formRef = useRef<FormikProps<FormularioDeLoja>>(null);
    const abertoAnterior = usePrevious(aberto);

    const [loja, setLoja] = useState(gerarFormularioDeLoja())
    const [editarLoja] = useEditarLojaMutation({
        update(cache, { data }) {
            const loja = data?.editarLoja
            if (!loja) return

            cache.writeFragment<LojaDoCardapioFragment>({
                id: `Loja:${id}`,
                fragment: LojaDoCardapioFragmentDoc,
                fragmentName: 'LojaDoCardapio',
                data: { ...loja },
            })
        }
    })

    const handleClose = () => {
        onFechar && onFechar();
    };

    useEffect(() => {
        if (!aberto || aberto === abertoAnterior) return

        setLoja(lojaInicial
            ? { ...lojaInicial }
            : gerarFormularioDeLoja()
        )
        formRef.current?.resetForm()
    }, [aberto, abertoAnterior, lojaInicial]);

    return (
        <Dialog
            onClose={handleClose}
            aria-labelledby={id}
            open={aberto || false}
        >
            <Formik
                initialValues={loja}
                validateOnBlur={false}
                validate={values => {
                    const errors: {
                        nome?: string
                        preco?: string
                    } = {};
                    if (!values.nome) errors.nome = 'Obrigatório'
                    return errors;
                }}
                onSubmit={async (valores, { setSubmitting }) => {
                    try {
                        setSubmitting(true)
                        const loja: EdicaoDeLoja = {
                            nome: valores.nome,
                        }
                        const { data } = await editarLoja({
                            variables: {
                                id,
                                loja,
                            },
                        })
                        if (!data) return
                        onFinalizar && onFinalizar(data.editarLoja)
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
                    <DialogTitle id={id}> {`Editar ${lojaInicial?.nome}`}</DialogTitle>
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
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancelar
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
    id: string
    aberto?: boolean
    lojaInicial?: FormularioDeLoja
    onFechar?: () => void
    onFinalizar?: (loja: LojaDoCardapioFragment) => void
}

function gerarFormularioDeLoja(): FormularioDeLoja {
    return {
        nome: '',
    }
}

type FormularioDeLoja = {
    nome: string
}

export default DialogoDeEditarLoja
