import { ListItem, ListItemIcon, makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import { HelpCircleOutline, LoginVariant, LogoutVariant } from 'mdi-material-ui';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAutenticacao } from '../contexts/autenticacao';
import { drawerWidth } from './constantes';

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      // ...theme.mixins.toolbar,
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: 0,
    },
    // paper: {
    //   padding: theme.spacing(2),
    //   display: 'flex',
    //   overflow: 'auto',
    //   flexDirection: 'column',
    // },
  }));


export default function AppDrawer({
  open,
  setOpen,
}: PropTypes) {
  const classes = useStyles();
  const { breakpoints } = useTheme()
  const éMobile = useMediaQuery(breakpoints.only('xs'))
  const { logado, deslogar } = useAutenticacao()

  return (
    <Drawer
      variant={éMobile ? "temporary" : "permanent"}
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      BackdropProps={{
        onClick: () => setOpen(false),
      }}
    >
      <div className={classes.toolbarIcon}>
        <img
          src={`${process.env.PUBLIC_URL}/img/logo2.jpeg`}
          width="100%"
          alt="Logo do aplicativo"
        />
      </div>
      <Divider/>
      <Divider style={{ marginTop: 'auto' }} />
      <ListItem
        button
      >
        <ListItemIcon>
          <HelpCircleOutline/>
        </ListItemIcon>
        Sobre
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
            Sair
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
              Entrar
            </ListItem>
          </>
        )}
    </Drawer>
  )
}

type PropTypes = {
  open: boolean
  setOpen: (open: boolean) => void
}
