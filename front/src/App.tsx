import { ConfirmProvider } from 'material-ui-confirm'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import './App.css'
import ApplicationApollo from './contexts/ApplicationApollo'
import { AutenticacaoProvider } from './contexts/autenticacao'
import TelaDeCardapio from './pages/cardapio/TelaDeCardapio'
import TelaDeCadastro from './pages/TelaDeCadastro'
import TelaDeLogin from './pages/TelaDeLogin'
import TelaDeRestaurantes from './pages/TelaDeRestaurantes'
import TelaDeSobre from './pages/TelaDeSobre'

function App() {
	return (
		<AutenticacaoProvider>
			<ApplicationApollo>
				<ConfirmProvider defaultOptions={{
					title: 'Tem certeza?',
					cancellationText: 'Não',
					confirmationText: 'Sim',
				}}>
					<BrowserRouter>
						<Switch>
							<Redirect path="/" exact to="/entrar" />
							<Route path="/entrar" exact>
								<TelaDeLogin/>
							</Route>
							<Route path="/registrar" exact>
								<TelaDeCadastro/>
							</Route>
							<Route path="/">
								<Switch>
									<Route path="/sobre">
										<TelaDeSobre/>
									</Route>
									<Route path="/restaurantes">
										<TelaDeRestaurantes/>
									</Route>
									<Route path="/:idRestaurante">
										<TelaDeCardapio/>
									</Route>
								</Switch>
							</Route>
						</Switch>
					</BrowserRouter>
				</ConfirmProvider>
			</ApplicationApollo>
		</AutenticacaoProvider>
	)
}

export default App
