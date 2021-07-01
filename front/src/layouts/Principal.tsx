import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
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

  return (
    <div
      className={classes.root}
    >
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
      <main className={clsx(
        classes.content,
        classes.contentShift
      )}>
        <div className={classes.appBarSpacer} />
        {props.children}
      </main>
    </div>
  );
}

export default Principal


