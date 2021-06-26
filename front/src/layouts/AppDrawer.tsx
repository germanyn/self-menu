import React from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import clsx from 'clsx';
import { drawerWidth } from './constantes';
import { mainListItems } from './listItems';

const useStyles = makeStyles((theme) => ({
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
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
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));


export default function AppDrawer({
  open,
  setOpen,
}: PropTypes) {
  const classes = useStyles();
  const { breakpoints } = useTheme()
  const éMobile = useMediaQuery(breakpoints.only('xs'))

  return (
    <Drawer
      variant={éMobile ? "temporary" : "permanent"}
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
      anchor={"left"}
      {...{
        onBackdropClick: () => setOpen(false)
      }}
    >
      <div className={classes.toolbarIcon}>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          className={classes.title}
          align="center"
        >
          Gardápio
        </Typography>
      </div>
      <Divider />
      <List>{mainListItems}</List>
    </Drawer>
  )
}

type PropTypes = {
  open: boolean
  setOpen: (open: boolean) => void
}
