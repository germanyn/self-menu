import { ThemeProvider } from '@material-ui/core/styles'
import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import ApplicationApollo from './contexts/ApplicationApollo'
import { AutenticacaoProvider } from './contexts/autenticacao'
import { NotificacaoProvider } from './contexts/NotificacaoContext'
import TelaDeCardapio from './pages/cardapio/TelaDeCardapio'
import TelaDeCadastro from './pages/TelaDeCadastro'
import TelaDeLogin from './pages/TelaDeLogin'
import TelaDeRestaurantes from './pages/TelaDeRestaurantes'
import TelaDeSobre from './pages/TelaDeSobre'
import { temaDaAplicacao } from './utils/tema'

function App() {
	return (
		<ThemeProvider theme={temaDaAplicacao}>
			<AutenticacaoProvider>
				<ApplicationApollo>
					<NotificacaoProvider>
						<ConfirmProvider defaultOptions={{
							title: 'Tem certeza?',
							cancellationText: 'Não',
							confirmationText: 'Sim',
						}}>
							<BrowserRouter>
								<Switch>
									<Redirect path="/" exact to="/sobre" />
									<Route
										path="/entrar"
										exact
										component={TelaDeLogin}
									/>
									<Route
										path="/registrar"
										exact
										component={TelaDeCadastro}
									/>
									<Route
										path="/sobre"
										exact
										component={TelaDeSobre}
									/>
									<Route
										path="/restaurantes"
										exact
										component={TelaDeRestaurantes}
									/>
									<Route
										path="/:idRestaurante"
										render={({ match: { path } }) => (
											<Switch>
												<Route
													path={`${path}`}
													component={TelaDeCardapio}	
												/>
											</Switch>
										)}
									/>
								</Switch>
							</BrowserRouter>
						</ConfirmProvider>
					</NotificacaoProvider>
				</ApplicationApollo>
			</AutenticacaoProvider>
		</ThemeProvider>
	)
}

export default App
