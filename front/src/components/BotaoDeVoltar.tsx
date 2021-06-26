import { IconButton, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { useHistory } from 'react-router-dom'
import ChevronLeft from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
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
            {...props}
            size="small"
        >
            <ChevronLeft
                fontSize="large"
            />
        </IconButton>
    )
}

export default BotaoDeVoltar
