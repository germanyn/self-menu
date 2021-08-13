import { AppBar, Box, IconButton, makeStyles, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import clsx from 'clsx';
import DotsVertical from 'mdi-material-ui/DotsVertical';
import IconeDeMenu from 'mdi-material-ui/Menu';
import React from 'react';
import { BuscarCardapioQuery } from '../../generated/graphql';
import { useToolbarStyles } from '../../layouts/AppToolbar';
import { ToolbarParams } from '../../layouts/Principal';

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

type PropTypes = ToolbarParams & {
    loja?: BuscarCardapioQuery['loja']
    loading: boolean
    mostraEdicao?: boolean
    setMostraEdicao?: (mostra: boolean) => void
    podeEditar: boolean
}

const ToolbarDoCardapio: React.FC<PropTypes> = ({
    loja,
    podeEditar,
    mostraEdicao,
    setMostraEdicao,
    menuAberto,
    setMenuAberto,
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

    const banner = loja
        ? loja.banner
        : null

    return (
        <AppBar
            position="absolute"
            style={banner
                ? { backgroundImage: `url("${banner}")` }
                : {}
            }
            className={clsx(
                toolbarClasses.appBar,
                menuAberto && toolbarClasses.appBarShift,
                classes.banner
            )}
        >
            <Toolbar className={toolbarClasses.toolbar}>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => setMenuAberto && setMenuAberto(!menuAberto)}
                    style={banner ? { background: 'rgba(0, 0, 0, 0.1)' } : undefined}
                >
                    <IconeDeMenu />
                </IconButton>
                {!banner && loja && (
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        style={{ paddingLeft: '12px' }}
                    >
                        {loja.nome}
                    </Typography>
                )}
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

export default ToolbarDoCardapio
