import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Grid,
	makeStyles,
	TextField,
	createStyles,
	CircularProgress,
	Icon,
} from '@material-ui/core'
import { Form, Formik, FormikProps } from 'formik';
import { MapMarkerRadiusOutline } from 'mdi-material-ui'
import { useRef } from 'react';

const useStyles = makeStyles((theme) =>
  createStyles({
	form: {
	  '& .MuiTextField-root': {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	  },
	},
  }),
);

export type FormularioDeSolicitacao = {
	mesa: string,
}

export interface DialogoDeSolicitacaoProps {
	aberto: boolean
	onCancelar: () => void
	onConfirmar: (solicitacao: FormularioDeSolicitacao) => void
	solicitacaoInicial?: FormularioDeSolicitacao
}

const DialogoDeSolicitacao = ({
	aberto,
	onCancelar,
	onConfirmar,
	solicitacaoInicial,
}: DialogoDeSolicitacaoProps) => {
	const classes = useStyles()
	const formRef = useRef<FormikProps<FormularioDeSolicitacao>>(null);

	return (
		<Dialog
			open={aberto}
			onClose={onCancelar}
		>
			<Formik
				initialValues={solicitacaoInicial
					? { mesa: solicitacaoInicial.mesa || '' }
					: { mesa: '' }
				}
				validateOnBlur={false}
				onSubmit={(valores) => {
					onConfirmar && onConfirmar({
						...valores,
						mesa: valores.mesa || '',
					})
				}}
				innerRef={formRef}
			>
				{({
					handleChange,
					values,
					isSubmitting,
					handleBlur,
				}) => <Form className={classes.form}>
					<DialogTitle id="form-dialog-title">
						Chamar Garçom
					</DialogTitle>
					<DialogContent>
						<Grid container spacing={1} alignItems="center">
							<Grid item>
								<MapMarkerRadiusOutline />
							</Grid>
							<Grid item>
								<TextField
									autoFocus
									margin="dense"
									id="minha-localizacao"
									label="Minha localização"
									helperText="Mesa 3, Balcão..."
									fullWidth
									name="mesa"
									value={values.mesa}
									onChange={handleChange}
									onBlur={handleBlur}
									disabled={isSubmitting}
									autoComplete="off"
								/>
							</Grid>
						</Grid>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={onCancelar}
                            disabled={isSubmitting}
						>
							Cancelar
						</Button>
						<Button
                            type="submit"
                            color="primary"
                            disabled={isSubmitting}
							startIcon={isSubmitting ? <CircularProgress size={20}/> : <Icon fontSize={'small'}/> }
						>
							Confirma
						</Button>
					</DialogActions>
				</Form>}
			</Formik>
		</Dialog>
	)
}

export default DialogoDeSolicitacao
