import { FormControlLabel, Switch } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Formik } from 'formik';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useAutenticacao } from '../contexts/autenticacao';
import { useCriarContaMutation } from '../generated/graphql';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function TelaDeRegistrar() {
    const classes = useStyles();

    const [criarConta] = useCriarContaMutation()
    const { setRegistro } = useAutenticacao()
    const history = useHistory();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Meu Restaurante
                </Typography>

                <Formik
                    initialValues={{
                        restaurante: '',
                        email: '',
                        senha: '',
                        comDemonstracao: true,
                    }}
                    validate={values => {
                        const errors: {
                            email?: string
                        } = {};
                        if (!values.email) {
                            errors.email = 'Obrigatório';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'E-mail inválido';
                        }
                        return errors;
                    }}
                    onSubmit={async (valores, { setSubmitting }) => {
                        try {
                            setSubmitting(true)
                            const { data, errors } = await criarConta({
                                variables: {
                                    entrada: {
                                        email: valores.email,
                                        restaurante: valores.restaurante,
                                        senha: valores.senha,
                                    },
                                },
                            })
                            if (!data || errors) {
                                throw errors
                            }
                            const contaCriada = data.criarConta.conta
                            setRegistro({
                                token: data.criarConta.token,
                                usuario: {
                                    conta: contaCriada._id,
                                    id: contaCriada.dono._id,
                                    nome: contaCriada.dono.nome,
                                },
                            })
                            history.push(`/${contaCriada.lojas[0]._id}`)
                        } catch (error) {
                            alert(error)
                        } finally {
                            setSubmitting(false)
                        }
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <Form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="restaurante"
                                        name="restaurante"
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="Restaurante"
                                        autoFocus
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.restaurante}
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        label="E-mail"
                                        name="email"
                                        autoComplete="email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="senha"
                                        label="Senha"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.senha}
                                        disabled={isSubmitting}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                name="comDemonstracao"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                checked={values.comDemonstracao}
                                                disabled={isSubmitting}
                                            />}
                                        label="Com dados de demonstração"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isSubmitting}
                            >
                                Registrar
                            </Button>
                            {JSON.stringify(errors)}
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Já tem uma conta? Entre aqui
                                    </Link>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}
