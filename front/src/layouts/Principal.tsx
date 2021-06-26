import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
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
}));

type ToolbarParams = {
  open: boolean
  setOpen: (open: boolean) => void
  id?: string
}

type Props = {
  toolbar?: (params: ToolbarParams) => ReactNode
} & React.HTMLProps<HTMLDivElement>

const Principal: React.FC<Props> = (props) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  return (
    <div
      className={classes.root}
      {...props}
    >
      <CssBaseline />
        { props.toolbar
          ? props.toolbar({
            open,
            setOpen,
          })
          : undefined
        }
      <div id="app-toolbar"/>
      <AppDrawer
        open={open}
        setOpen={setOpen}
      />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        { props.children }
      </main>
    </div>
  );
}

export default Principal


  