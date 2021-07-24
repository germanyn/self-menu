import { InputAdornment, IconButton } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Form, Formik } from 'formik';
import { Eye, EyeOff } from 'mdi-material-ui';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAutenticacao } from '../contexts/autenticacao';
import { useLogarMutation } from '../generated/graphql';
import { Link } from 'react-router-dom'

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

export default function TelaDeLogin() {
    const classes = useStyles();

    const [ logar ] = useLogarMutation()
    const { setRegistro } = useAutenticacao()
    const history = useHistory()
    const [mostraSenha, setMostraSenha] = useState(false)

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
                        senha: ''
                    }}
                    validate={values => {
                        const errors: {
                            email?: string
                        } = {};
                        if (!values.email) {
                            errors.email = 'Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        return errors;
                    }}
                    onSubmit={async (valores, { setSubmitting }) => {
                        try {
                            setSubmitting(true)
                            const { data, errors } = await logar({
                                variables: {
                                    autenticacao: {
                                        email: valores.email,
                                        senha: valores.senha,
                                    },
                                },
                            })
                            if (!data || errors) {
                                throw errors
                            }
                            setRegistro(data.entrar)
                            const conta = data.entrar.usuario.contas[0]
                            history.push(`/${conta.lojas[0]._id}`)
                        } catch (error) {
                            alert(error)
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
                        /* and other goodies */
                    }) => (
                        <Form
                            className={classes.form}
                            noValidate
                            onSubmit={handleSubmit}
                        >
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        error={touched.email && Boolean(errors.email)}
                                        helperText={touched.email && errors.email}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="senha"
                                        label="Senha"
                                        type={mostraSenha ? "text" : "password"}
                                        id="senha"
                                        autoComplete="current-password"
                                        disabled={isSubmitting}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.senha}
                                        error={touched.senha && Boolean(errors.senha)}
                                        helperText={touched.senha && errors.senha}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={() => setMostraSenha(!mostraSenha)}
                                                        onMouseDown={(event: React.MouseEvent<HTMLButtonElement>) => {
                                                            event.preventDefault();
                                                        }}
                                                        edge="end"
                                                    >
                                                        {mostraSenha ? <Eye /> : <EyeOff />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
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
                                Entrar
                            </Button>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link to="/registrar">
                                        Não possui uma conta? Cadastre aqui
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
