import { useMediaQuery } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import BotaoDeNotificacao from '../components/BotaoDeNotificacao';
import { useAutenticacao } from '../contexts/autenticacao';
import { drawerWidth } from '../utils/constantes';
import AppDrawer from "./AppDrawer";

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
	appBarSpacer: theme.mixins.toolbar,
	content: {
		flexGrow: 1,
		height: '100vh',
		overflow: 'auto',
	},
	container: {
		paddingTop: theme.spacing(4),
		paddingBottom: theme.spacing(4),
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));

export type ToolbarParams = {
	menuAberto: boolean
	setMenuAberto: (open: boolean) => void
	id?: string
}

type Props = {
	toolbar?: (params: ToolbarParams) => ReactNode
} & React.HTMLProps<HTMLDivElement>

const Principal: React.FC<Props> = (props) => {
	const [menuAberto, setMenuAberto] = React.useState(false);
	const classes = useStyles();
	const { logado } = useAutenticacao()
	const theme = useTheme()
	const éMobile = useMediaQuery(theme.breakpoints.only('xs'))

	return (
		<div className={classes.root}>
			<CssBaseline />
			{props.toolbar
				? props.toolbar({
					menuAberto,
					setMenuAberto,
				})
				: undefined
			}
			<AppDrawer
				open={menuAberto}
				setOpen={setMenuAberto}
			/>
			<div className={clsx(
				classes.content,
				classes.contentShift
			)}>
				<div className={classes.appBarSpacer} />
				<div> {props.children} </div>
			</div>
			{logado && (
				<BotaoDeNotificacao
					style={{
						position: 'fixed',
						bottom: theme.spacing(2),
						left: theme.spacing(2) + (!éMobile && menuAberto ? drawerWidth : 0),
						zIndex: theme.zIndex.appBar + 50,
					}}
				/>
			)}
		</div>
	);
}

export default Principal
