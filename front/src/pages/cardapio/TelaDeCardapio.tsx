import {
    Backdrop,
    CircularProgress,
    Container,
    Fab,
    makeStyles,
    useTheme
} from '@material-ui/core';
import { Plus } from 'mdi-material-ui';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import { useBuscarCardapioQuery } from "../../generated/graphql";
import Principal from "../../layouts/Principal";
import Cardapio from './Cardápio';
import DialogoDeEditarCategoria from './categoria/DialogoDeEditarCategoria';
import { useCardapio, withCardapio } from './context/CardapioContext';
import DetalhesDoProduto from './produto/DetalhesDoProduto';
import ToolbarDoCardapio from "./ToolbarDoCardapio";

const useStyles = makeStyles((theme) => {
    return {
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
            zIndex: theme.zIndex.appBar + 50,
        }
    }
});

function TelaDeCardapio() {
    const theme = useTheme()
    const classes = useStyles()
    const { idRestaurante } = useParams<{ idRestaurante: string }>()
    const location = useLocation()
    const history = useHistory()
    const produtoDaQuery = new URLSearchParams(location.search).get('produto')
    const {
        mostraCriarCategoria,
        setMostraCriarCategoria,
        salvando,
    } = useCardapio()
    const produto = typeof produtoDaQuery === 'string'
        ? produtoDaQuery
        : undefined

    const buscaDeCardapio = useBuscarCardapioQuery({
        variables: { idRestaurante },
    })

    const { data } = buscaDeCardapio

    const [mostraEdicao, setMostraEdicao] = useState(false)
    const podeEditar = data
        ? data.loja.podeEditar
        : false

    useEffect(() => {
        setMostraEdicao(podeEditar)
    }, [podeEditar])

    // useEffect(() => {
    //     setCategoriaId(data?.loja.categorias[0]?._id|| null)
    // }, [data, setCategoriaId])

    return <>
        <Backdrop open={salvando}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <Principal
            toolbar={(props) =>
                <ToolbarDoCardapio
                    {...props}
                    podeEditar={podeEditar}
                    mostraEdicao={mostraEdicao}
                    setMostraEdicao={setMostraEdicao}
                    {...buscaDeCardapio}
                />
            }
            style={{ marginBottom: theme.mixins.toolbar.minHeight }}
        >
            <Container maxWidth="sm" disableGutters component="main">
                <Cardapio
                    idRestaurante={idRestaurante}
                    mostraEdicao={mostraEdicao}
                    {...buscaDeCardapio}
                />
            </Container>
        </Principal>
        {/* <BottomNavDeCategorias
            mostraEdicao={mostraEdicao}
            tabAtual={categoriaId}
            setTabAtual={(categoriaId) => {
                setCategoriaId(categoriaId)
                setScrollTo(categoriaId)
            }}
            {...buscaDeCardapio}
        /> */}
        {mostraEdicao && <Fab
            color="primary"
            aria-label="Adicionar"
            onClick={() => setMostraCriarCategoria(true)}
            className={classes.fab}
        >
            <Plus/>
        </Fab>}
        {produto && <DetalhesDoProduto
            id={produto}
            aberto={!!produto}
            onFechar={() => history.push(history.location.pathname)}
            mostraEdicao={mostraEdicao}
        />}
        <DialogoDeEditarCategoria
            aberto={mostraCriarCategoria}
            lojaId={idRestaurante}
            onFechar={() => setMostraCriarCategoria(false)}
            onFinalizar={() => setMostraCriarCategoria(false)}
        />
    </>
}

export default  withCardapio(TelaDeCardapio)