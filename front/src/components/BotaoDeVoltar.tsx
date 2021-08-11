import { IconButton } from '@material-ui/core'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
    menuButton: {
      marginRight: 36,
    },
}))

const BotaoDeVoltar: typeof IconButton = (props: any) => {
    const classes = useStyles();
    const history = useHistory()
    return (
        <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => history.goBack()}
            className={clsx(classes.menuButton)}
            size="small"
            {...props}
        >
            <ChevronLeft
                fontSize="large"
            />
        </IconButton>
    )
}

export default BotaoDeVoltar
