import {
    Fab,
    makeStyles,
    useTheme
} from '@material-ui/core';
import { Plus } from 'mdi-material-ui';
import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useBuscarCardapioQuery } from "../../generated/graphql";
import Principal from "../../layouts/Principal";
import BottomNavDeCategorias from './BottomNavDeCategorias';
import Cardapio from './Cardápio';
import ToolbarDoCardapio from "./ToolbarDoCardapio";

const useStyles = makeStyles((theme) => {
    console.log(theme)
    return {
        fab: {
            position: 'fixed',
            bottom: `calc(${theme.spacing(2)}px)`,
            right: theme.spacing(2),
            zIndex: theme.zIndex.appBar + 50,
        }
    }
});

function TelaDeCardapio() {
    const theme = useTheme()
    const classes = useStyles()
    const { idRestaurante } = useParams<{ idRestaurante: string }>()

    const buscaDeCardapio = useBuscarCardapioQuery({
        variables: { idRestaurante },
    })

    const { data } = buscaDeCardapio

    const [mostraEdicao, setMostraEdicao] = useState(false)
    const [tabAtual, setTabAtual] = React.useState<string | null>(null);
    const podeEditar = data
        ? data.loja.podeEditar
        : false

    const trocarModoEdicao = () => {
        setMostraEdicao && setMostraEdicao(!mostraEdicao)
    }

    return <React.Fragment>

        <Principal
            toolbar={() =>
                <ToolbarDoCardapio
                    podeEditar={podeEditar}
                    mostraEdicao={mostraEdicao}
                    setMostraEdicao={setMostraEdicao}
                    {...buscaDeCardapio}
                />
            }
            style={{ marginBottom: theme.mixins.toolbar.minHeight }}
        >
            <Cardapio
                idRestaurante={idRestaurante}
                mostraEdicao={mostraEdicao}
                {...buscaDeCardapio}
            />
        </Principal>
        <BottomNavDeCategorias
            mostraEdicao={mostraEdicao}
            tabAtual={tabAtual}
            setTabAtual={setTabAtual}
            {...buscaDeCardapio}
        />
        {mostraEdicao && <Fab
            color="primary"
            aria-label="Habilitar edição"
            // onClick={trocarModoEdicao}
            className={classes.fab}
        >
            <Plus/>
        </Fab>}
    </React.Fragment>
}

export default TelaDeCardapio