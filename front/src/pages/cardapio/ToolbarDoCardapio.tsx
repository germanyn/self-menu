import { AppBar, Box, IconButton, makeStyles, Menu, MenuItem, Toolbar } from '@material-ui/core';
import React from 'react';
import BotaoDeVoltar from '../../components/BotaoDeVoltar';
import { BuscarCardapioQuery, BuscarCardapioQueryHookResult } from '../../generated/graphql';
import { useToolbarStyles } from '../../layouts/AppToolbar';
import DotsVertical from 'mdi-material-ui/DotsVertical'

const useStyles = makeStyles((theme) => ({
    banner: {
        // display: "flex",
        // flexDirection: "row",
        // height: "118px",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        // justifyContent: "center"
    },
}))

const ToolbarDoCardapio: React.FC<PropTypes> = ({
    data,
    podeEditar,
    mostraEdicao,
    setMostraEdicao,
}) => {
    const classes = useStyles()
    const toolbarClasses = useToolbarStyles()

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const abrirMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const fecharMenu = () => {
        setAnchorEl(null);
    };

    const trocarModoEdicao = () => {
        setMostraEdicao && setMostraEdicao(!mostraEdicao)
    }

    const banner = data
        ? data.loja.banner
        : null
    return (
        <AppBar
            position="absolute"
            style={banner
                ? { backgroundImage: `url("${banner}")` }
                : {}
            }
            className={classes.banner}
        >
            <Toolbar className={toolbarClasses.toolbar}>
                <BotaoDeVoltar
                    style={{
                        background: 'rgba(0, 0, 0, 0.1)'
                    }}
                />
                <Box flexGrow={1} />
                {podeEditar && <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="Abrir opções"
                    onClick={abrirMenu}
                    aria-controls="customized-menu"
                    aria-haspopup="true"
                >
                    <DotsVertical/>
                </IconButton>}
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={fecharMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                >
                    <MenuItem
                        onClick={trocarModoEdicao}
                        color="primary"
                    >
                        Modo {mostraEdicao ? 'Preview' : 'Edição'}
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    )
}

type PropTypes = {
    data?: BuscarCardapioQuery
    mostraEdicao?: boolean
    setMostraEdicao?: (mostra: boolean) => void
    podeEditar: boolean
} & BuscarCardapioQueryHookResult

export default ToolbarDoCardapio
