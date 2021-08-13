import {
    Box,
    Card,
    Divider,
    IconButton,
    ListItem,
    ListItemText,
    makeStyles,
    Typography,
    useTheme,
    Zoom
} from "@material-ui/core"
import { useConfirm } from "material-ui-confirm"
import { Delete, DragHorizontalVariant, Pencil } from "mdi-material-ui"
import Plus from "mdi-material-ui/Plus"
import { useRef, useState } from "react"
import { useAutenticacao } from "../../../contexts/autenticacao"
import { BuscarCardapioDocument, BuscarCardapioQuery, CategoriaDoCardapioFragment, useRemoverCategoriaMutation } from "../../../generated/graphql"
import { ArrayElement } from "../../../utils/types"
import { useCategoriaArrastavel } from "../arrastaveis/useCategoriaArrastavel"
import { useCardapio } from "../context/CardapioContext"
import CardDeProduto from "../produto/CardDeProduto"
import DialogoDeEditarProduto from '../produto/DialogoDeEditarProduto'
import DialogoDeEditarCategoria from "./DialogoDeEditarCategoria"

const useStyles = makeStyles((theme) => ({
    categoria: { height: '100px', paddingTop: '32px', paddingBottom: '20px' }
}))

type CardapioProps = {
    categoria: ArrayElement<BuscarCardapioQuery['loja']['categorias']>
    mostraEdicao?: boolean
    idRestaurante: string
    indice: number
}

export const Cardapio: React.FC<CardapioProps> = ({
    indice,
    categoria,
    mostraEdicao,
    idRestaurante,
}) => {
    const ref = useRef<any>(null)
    const classes = useStyles()
    const { usuario } = useAutenticacao()
    const [mostraEdicaoDeCategoria, setMostraEdicaoDeCategoria] = useState(false)
    const { estaArrastandoCategoria } = useCardapio()
    const [mostraCriacaoDeProduto, setMostraCriacaoDeProduto] = useState(false)
    const [recolhido, setRecolhido] = useState(false)
    const theme = useTheme()
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    }

    const confirm = useConfirm();
    const [removerCategoria] = useRemoverCategoriaMutation()

    // useEffect(() => {
    //     if (scrollTo !== categoria._id) return
    //     categoriaRef.current && categoriaRef.current.scrollIntoView(true)
    //     console.log(scrollTo)
    //     return function cleanup() {
    //         setScrollTo(null)
    //     }
    // }, [scrollTo, categoria._id, setScrollTo])

    const handleExclusaoDeCategoria = async (categoria: CategoriaDoCardapioFragment) => {
        try {
            await confirm({
                description: `Deseja mesmo excluir ${categoria.nome}?`,
                cancellationButtonProps: {
                    color: 'primary',
                },
                confirmationButtonProps: {
                    color: 'default',
                },
            })
        } catch {
            console.info('Ação cancelada pelo usuário')
            return
        }

        await removerCategoria({
            variables: { id: categoria._id },
            update(cache) {
                const buscaDeCardapio = cache.readQuery<BuscarCardapioQuery>({
                    query: BuscarCardapioDocument,
                    variables: { idRestaurante },
                });
                if (!buscaDeCardapio) return
                const categorias = buscaDeCardapio.loja.categorias
                    .filter(({ _id }) => _id !== categoria._id)
                cache.writeQuery<BuscarCardapioQuery>({
                    query: BuscarCardapioDocument,
                    variables: { idRestaurante },
                    data: {
                        ...buscaDeCardapio,
                        loja: {
                            ...buscaDeCardapio.loja,
                            categorias,
                        },
                    },
                });
            },
            optimisticResponse: {
                deletarCategoria: true,
            },
        })
    };

    const {
        dragHooks,
        dropHooks,
    } = useCategoriaArrastavel({
        idRestaurante,
        id: categoria._id,
        indice,
    })

    const [{ isDragging }, drag, dragArea] = dragHooks
    const [, drop] = dropHooks

    dragArea(drop(ref))

    return (
        <div
            ref={ref}
            style={{ opacity: isDragging ? 0.6 : 1.0 }}
        >
            <ListItem
                className={classes.categoria}
                id={`categoria-${categoria._id}`}
            >
                <Zoom
                    in={mostraEdicao}
                    timeout={transitionDuration}
                    style={{ transitionDelay: `${transitionDuration.exit}ms` }}
                    unmountOnExit
                >
                    <IconButton
                        edge="start"
                        ref={drag}
                        style={{ cursor: 'move' }}
                    >
                        <DragHorizontalVariant />
                    </IconButton>
                </Zoom>
                <ListItemText onClick={() => setRecolhido(!recolhido)}>
                    <Typography
                        variant="h6"
                        noWrap
                        style={{ fontSize: '1.125rem' }}
                    >
                        {categoria.nome}
                    </Typography>
                </ListItemText>
                <Zoom
                    in={mostraEdicao}
                    timeout={transitionDuration}
                    style={{ transitionDelay: `${transitionDuration.exit}ms` }}
                    unmountOnExit
                >
                    <IconButton onClick={() => setMostraCriacaoDeProduto(true)}>
                        <Plus />
                    </IconButton>
                </Zoom>
                <Zoom
                    in={mostraEdicao}
                    timeout={transitionDuration}
                    style={{ transitionDelay: `${transitionDuration.exit}ms` }}
                    unmountOnExit
                >
                    <IconButton
                        onClick={(event) => {
                            event.stopPropagation()
                            setMostraEdicaoDeCategoria(true)
                        }}
                    >
                        <Pencil />
                    </IconButton>
                </Zoom>
                <Zoom
                    in={mostraEdicao}
                    timeout={transitionDuration}
                    style={{ transitionDelay: `${transitionDuration.exit}ms` }}
                    unmountOnExit
                >
                    <IconButton
                        aria-label="remover"
                        onClick={() => handleExclusaoDeCategoria(categoria)}
                    >
                        <Delete />
                    </IconButton>
                </Zoom>
            </ListItem>
            <Divider variant="middle" />
            {(!mostraEdicao || (!recolhido && !estaArrastandoCategoria)) && <>
                {!categoria.produtos.length && (
                    <Card
                        style={{
                            minHeight: '147px',
                            textAlign: 'center',
                            background: 'transparent',
                        }}
                        elevation={0}
                    >
                        <Box fontStyle="italic">
                            Categoria Vazia...
                        </Box>
                    </Card>
                )}
                {categoria.produtos.map((produto, indiceProduto) =>
                    <CardDeProduto
                        produto={produto}
                        key={`produto-${produto._id}`}
                        mostraEdicao={mostraEdicao}
                        indice={indiceProduto}
                        indiceCategoria={indice}
                        idCategoria={categoria._id}
                    />
                )}
                {usuario && <DialogoDeEditarProduto
                    idCategoria={categoria._id}
                    aberto={mostraCriacaoDeProduto}
                    idConta={usuario.conta}
                    onFechar={() => setMostraCriacaoDeProduto(false)}
                    onFinalizar={() => setMostraCriacaoDeProduto(false)}
                />}
            </>}
            {usuario && <DialogoDeEditarCategoria
                lojaId={idRestaurante}
                aberto={mostraEdicaoDeCategoria}
                categoriaInicial={{
                    id: categoria._id,
                    nome: categoria.nome,
                }}
                onFechar={() => setMostraEdicaoDeCategoria(false)}
                onFinalizar={() => setMostraEdicaoDeCategoria(false)}
            />}
        </div>
    )
}
export default Cardapio