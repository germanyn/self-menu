import { ListItem, ListItemIcon, makeStyles, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import clsx from 'clsx';
import { HelpCircleOutline, LoginVariant, LogoutVariant } from 'mdi-material-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAutenticacao } from '../contexts/autenticacao';
import { drawerWidth } from '../utils/constantes';
import { temaDaAplicacao } from '../utils/tema';

const useStyles = makeStyles(({ transitions }) => ({
		toolbarIcon: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			margin: '8px 8px',
			textAlign: 'center',
		},
		title: {
			flexGrow: 1,
		},
		drawerPaper: {
			position: 'relative',
			whiteSpace: 'nowrap',
			width: drawerWidth,
			transition: transitions.create('width', {
				easing: transitions.easing.sharp,
				duration: transitions.duration.enteringScreen,
			}),
		},
		drawerPaperClose: {
			overflowX: 'hidden',
			transition: transitions.create('width', {
				easing: transitions.easing.sharp,
				duration: transitions.duration.leavingScreen,
			}),
			width: 0,
		},
	}));


type PropTypes = {
	open: boolean
	setOpen: (open: boolean) => void
}

function AppDrawer({
	open,
	setOpen,
}: PropTypes) {
	const { breakpoints } = useTheme()
	const classes = useStyles();
	const éMobile = useMediaQuery(breakpoints.only('xs'))
	const { logado, deslogar } = useAutenticacao()
	const temaDark = createTheme({
		palette: {
			type: 'dark',
			primary: {
				main: temaDaAplicacao.palette.primary.main,
				contrastText: temaDaAplicacao.palette.primary.contrastText,
			},
			secondary: {
				main: temaDaAplicacao.palette.secondary.main,
				contrastText: temaDaAplicacao.palette.secondary.contrastText,
			},
		}
	})

	return (
		<ThemeProvider theme={temaDark}>
			<Drawer
				color="secondary"
				variant={éMobile ? "temporary" : "permanent"}
				classes={{
					paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
				BackdropProps={{
					onClick: () => setOpen(false),
				}}
			>
				<Link
					className={classes.toolbarIcon}
					to="/sobre"
				>
					<img
						src={`${process.env.PUBLIC_URL}/img/logo.png`}
						width="92px"
						alt="Logo do self menu"
					/>
				</Link>
				<Divider style={{ marginTop: 'auto' }} />
				<ListItem
					button
					component={Link}
					to="/sobre"
				>
					<ListItemIcon>
						<HelpCircleOutline/>
					</ListItemIcon>
					<Typography>
						Sobre
					</Typography>
				</ListItem>
				{logado
					? (
						<ListItem
							button
							onClick={deslogar}
						>
							<ListItemIcon>
								<LogoutVariant/>
							</ListItemIcon>
							<Typography>
								Sair
							</Typography>
						</ListItem>
					)
					: (
						<>
							<ListItem
								button
								component={Link}
								to="/entrar"
							>
								<ListItemIcon>
									<LoginVariant/>
								</ListItemIcon>
								<Typography>
									Entrar
								</Typography>
							</ListItem>
						</>
					)}
			</Drawer>
		</ThemeProvider>
	)
}

export default AppDrawer