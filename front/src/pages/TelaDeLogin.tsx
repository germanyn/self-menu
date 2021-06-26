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
import { Formik } from 'formik';
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

export default function TelaDeLogin() {
    const classes = useStyles();

    const [ registrarConta ] = useCriarContaMutation()
    const { setRegistro } = useAutenticacao()

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
                            const { data, errors } = await registrarConta({
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
                            setRegistro({
                                token: data.criarConta.token,
                                usuario: {
                                    conta: data.criarConta.conta._id,
                                    id: data.criarConta.conta.dono._id,
                                    nome: data.criarConta.conta.dono.nome,
                                },
                            })
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
                        /* and other goodies */
                    }) => (
                        <form
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
                                        id="nome"
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
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
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
                                        type="senha"
                                        id="senha"
                                        autoComplete="current-password"
                                        disabled={isSubmitting}
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
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Já tem uma conta? Entre aqui
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    );
}
