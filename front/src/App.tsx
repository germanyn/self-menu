import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import ApplicationApollo from './contexts/ApplicationApollo'
import { AutenticacaoProvider } from './contexts/autenticacao'
import TelaDeCardapio from './pages/cardapio/TelaDeCardapio'
import TelaDeCadastro from './pages/TelaDeCadastro'
import TelaDeLogin from './pages/TelaDeLogin'
import { ConfirmProvider } from 'material-ui-confirm'

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
							<Route path="/entrar" exact>
								<TelaDeLogin/>
							</Route>
							<Route path="/registrar" exact>
								<TelaDeCadastro/>
							</Route>
							<Route path="/">
								<Switch>
									<Route path="/:idRestaurante">
										<TelaDeCardapio/>
									</Route>
									<Route exact>Home</Route>
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
