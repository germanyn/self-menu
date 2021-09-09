import {
    Backdrop,
    CircularProgress,
    Container,
    createTheme,
    Fab, Grid, List, makeStyles, ThemeProvider, Typography, useTheme
} from '@material-ui/core';
import { Plus, StoreRemove } from 'mdi-material-ui';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from "react-router-dom";
import Campainha from '../../components/Campainha';
import DialogoDeSolicitacao, { DialogoDeSolicitacaoProps } from '../../components/DialogoDeSolicitacao';
import { useBuscarCardapioQuery, useSolicitarGarcomMutation } from "../../generated/graphql";
import Principal from "../../layouts/Principal";
import { useLocalStorage } from "../../utils/reactUtils";
import Cardapio from './Cardápio';
import DialogoDeEditarCategoria from './categoria/DialogoDeEditarCategoria';
import { useCardapio, withCardapio } from './context/CardapioContext';
import { LojaNoCardapio } from './loja/LojaNoCardapio';
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
    const temaDefault = useTheme()
    const classes = useStyles()
    const { idRestaurante } = useParams<{ idRestaurante: string }>()
    const location = useLocation()
    const history = useHistory()
    const produtoDaQueryString = new URLSearchParams(location.search).get('produto')
    const mesaDaQueryString = new URLSearchParams(location.search).get('m')
    const {
        mostraCriarCategoria,
        setMostraCriarCategoria,
        salvando,
    } = useCardapio()
    const [solicitarGarcom] = useSolicitarGarcomMutation()
    const produto = typeof produtoDaQueryString === 'string'
        ? produtoDaQueryString
        : undefined

    const { data, loading, error } = useBuscarCardapioQuery({
        variables: { idRestaurante },
    })

    const [ultimaMesaPedida, setUltimaMesaPedida] = useLocalStorage<string>(`UltMesa:${idRestaurante}`, '')

    useEffect(() => {
        if (!mesaDaQueryString) return
        setUltimaMesaPedida(mesaDaQueryString)
    }, [mesaDaQueryString, setUltimaMesaPedida])

    const [mostraEdicao, setMostraEdicao] = useState(false)
    const [mostraDialogoDeSolicitacao, setMostraDialogoDeSolicitacao] = useState(false)
    const [enviando, setEnviando] = useState(false)
    const podeEditar = data
        ? data.loja.podeEditar
        : false

    useEffect(() => {
        setMostraEdicao(podeEditar)
    }, [podeEditar, setMostraEdicao])

    const fazerUmaSolicitacao = () => {
        setMostraDialogoDeSolicitacao(true)
    }

    const confirmarSolicitacao: DialogoDeSolicitacaoProps['onConfirmar'] = async (solicitacao) => {
        try {
            setUltimaMesaPedida(solicitacao.mesa || '')
            setEnviando(true)
            await solicitarGarcom({
                variables: {
                    solicitacao: {
                        idRestaurante,
                        mesa: solicitacao.mesa,
                    }
                }
            })
            setMostraDialogoDeSolicitacao(false)
        } catch(error) {
            console.error(error)
        } finally {
            setEnviando(false)
        }
    }

    // useEffect(() => {
    //     setCategoriaId(data?.loja.categorias[0]?._id|| null)
    // }, [data, setCategoriaId])

    const tema = data?.loja.coresJson
        ? createTheme({
            palette: {
                ...JSON.parse(data.loja.coresJson),
            },
        })
        : temaDefault

    let Conteudo: JSX.Element
    if (loading) {
        Conteudo = <Grid container>
            <Grid
                item
                style={{
                    margin: tema.spacing(2),
                    textAlign: 'center',
                }}
                xs={12}
            >
                <CircularProgress size={64} style={{ color: 'grey' }} color="inherit"/>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography component="h3" variant="h6" style={{ color: 'grey' }}>
                    Procurando restaurante...
                    {error && JSON.stringify(error)}
                </Typography>
            </Grid>
        </Grid>
    } else if (data) {
        Conteudo = <List>
            <LojaNoCardapio
                mostraEdicao={mostraEdicao}
                loja={data.loja}
            />
            <Campainha
                style={{
                    marginTop: tema.spacing(2),
                    marginBottom: tema.spacing(2),
                }}
                onClick={() => fazerUmaSolicitacao()}
            />
            <Cardapio
                idRestaurante={idRestaurante}
                mostraEdicao={mostraEdicao}
                loja={data.loja}
            />
        </List>
    } else {
        Conteudo = <Grid container>
            <Grid
                item
                style={{
                    margin: tema.spacing(2),
                    textAlign: 'center',
                }}
                xs={12}
            >
                <StoreRemove style={{ fontSize: '64px', color: 'grey' }}/>
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center' }}>
                <Typography component="h3" variant="h6">
                    {error ? error.message : 'Erro ao buscar o restaurante'}
                </Typography>
            </Grid>
        </Grid>
    }

    return <>
        <Backdrop open={salvando || enviando}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <ThemeProvider theme={tema}>
            <Principal
                toolbar={(props) =>
                    <ToolbarDoCardapio
                        {...props}
                        podeEditar={podeEditar}
                        mostraEdicao={mostraEdicao}
                        setMostraEdicao={setMostraEdicao}
                        loja={data?.loja || undefined}
                        loading={loading}
                    />
                }
                style={{ marginBottom: tema.mixins.toolbar.minHeight }}
            >
                <Container
                    maxWidth="sm"
                    component="main"
                    disableGutters
                    style={{
                        padding: tema.spacing(2),
                        marginBottom: podeEditar ? '88px' : undefined,
                    }}
                >
                    {Conteudo}
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
            {mostraEdicao && (
                <Fab
                    color="primary"
                    aria-label="Adicionar"
                    onClick={() => setMostraCriarCategoria(true)}
                    className={classes.fab}
                >
                    <Plus/>
                </Fab>
            )}
            <DialogoDeSolicitacao
                aberto={mostraDialogoDeSolicitacao}
                onCancelar={() => setMostraDialogoDeSolicitacao(false)}
                onConfirmar={confirmarSolicitacao}
                solicitacaoInicial={{
                    mesa: ultimaMesaPedida,
                }}
            />
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
        </ThemeProvider>
    </>
}

export default  withCardapio(TelaDeCardapio)