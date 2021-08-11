import { AppBar, IconButton, makeStyles, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';
import React from 'react';
import { drawerWidth } from '../utils/constantes';

export const useToolbarStyles = makeStyles((theme) => ({
    toolbar: {
      paddingRight: 12, // keep right padding when drawer closed
    },
    leftButton: {
      marginRight: 36,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
      },
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
  })
);

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
}));

function AppToolbar({
    setMenuAberto,
    menuAberto,
    titulo,
}: React.PropsWithChildren<AppToolbarProps>) {
    const classes = useStyles();
    const toolbarClasses = useToolbarStyles();
    const toggleDrawer = () => {
      setMenuAberto(!menuAberto);
    };
    return (
        <AppBar
          position="absolute"
          className={clsx(toolbarClasses.appBar, menuAberto && toolbarClasses.appBarShift)}
        >
          <Toolbar className={toolbarClasses.toolbar}>
              <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  onClick={toggleDrawer}
                  className={clsx(toolbarClasses.leftButton)}
              >
                  <MenuIcon />
              </IconButton>
              {titulo && <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  { titulo }
              </Typography>}
          </Toolbar>
      </AppBar>
    )
}

export type ToolbarPropTypes = {
    menuAberto: boolean
    setMenuAberto: (aberto: boolean) => void
}

export type AppToolbarProps = ToolbarPropTypes & {
  titulo?: string
}

export default AppToolbar

