import {
    Box,
    Divider,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Typography,
    useTheme,
    Zoom
} from "@material-ui/core"
import { useConfirm } from "material-ui-confirm"
import { Delete } from "mdi-material-ui"
import Plus from "mdi-material-ui/Plus"
import { useEffect, useRef, useState } from "react"
import { useAutenticacao } from "../../../contexts/autenticacao"
import { BuscarCardapioDocument, BuscarCardapioQuery, CategoriaDoCardapioFragment, useRemoverCategoriaMutation } from "../../../generated/graphql"
import { ArrayElement } from "../../../utils/types"
import CardDeProduto from "../produto/CardDeProduto"
import { useCardapio } from "../context/CardapioContext"
import DialogoDeEditarProduto from '../produto/DialogoDeEditarProduto'

const useStyles = makeStyles((theme) => ({
    categoria: { height: '100px', paddingTop: '32px', paddingBottom: '20px'  }
}))

type CardapioProps = {
    categoria: ArrayElement<BuscarCardapioQuery['loja']['categorias']>
    mostraEdicao?: boolean
    idRestaurante: string
}

export const Cardapio: React.FC<CardapioProps> = ({
    categoria,
    mostraEdicao,
    idRestaurante,
}) => {
    const classes = useStyles()
    const { usuario } = useAutenticacao()
    const { scrollTo, setScrollTo } = useCardapio()
    const [mostraCriacaoDeProduto, setMostraCriacaoDeProduto] = useState(false)
    const theme = useTheme()
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const categoriaRef = useRef<HTMLElement>(null);

    const confirm = useConfirm();
    const [removerCategoria] = useRemoverCategoriaMutation()

    useEffect(() => {
        if (scrollTo !== categoria._id) return
        categoriaRef.current && categoriaRef.current.scrollIntoView(true)
        console.log(scrollTo)
        return function cleanup() {
            setScrollTo(null)
        }
    }, [scrollTo, categoria._id, setScrollTo])

    const handleExclusaoDeCategoria = (categoria: CategoriaDoCardapioFragment) => {
        confirm({
            description: `Deseja mesmo excluir a categoria ${categoria.nome}?`,
            cancellationButtonProps: {
                color: 'primary',
            },
            confirmationButtonProps: {
                color: 'default',
            },
        })
            .then(async () => {
                await removerCategoria({
                    variables: { id: categoria._id},
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
                })
            })
            .catch(() => { /* ... */ });
    };

    return (
        <>
                <ListItem
                    className={classes.categoria}
                    ref={categoriaRef as any}
                    id={`categoria-${categoria._id}`}
                >
                    <ListItemText>
                        <Typography
                            variant="h6"
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
                        <IconButton
                            aria-label="add"
                            edge="end"
                            onClick={() => handleExclusaoDeCategoria(categoria)}
                        >
                            <Delete />
                        </IconButton>
                    </Zoom>
                    <Zoom
                        in={mostraEdicao}
                        timeout={transitionDuration}
                        style={{ transitionDelay: `${transitionDuration.exit}ms` }}
                        unmountOnExit
                    >
                        <ListItemIcon>
                            <IconButton
                                color="secondary"
                                onClick={() => setMostraCriacaoDeProduto(true)}
                            >
                                <Plus />
                            </IconButton>
                        </ListItemIcon>
                    </Zoom>
                </ListItem>
            <Divider variant="middle"/>
            {!categoria.produtos.length
                ? <>
                    <ListItem>
                        <Box fontStyle="italic">
                            Categoria Vazia...
                        </Box>
                    </ListItem>
                </>
                : categoria.produtos.map(produto => 
                    <CardDeProduto
                        produto={produto}
                        key={`produto-${produto._id}`}
                        mostraEdicao={mostraEdicao}
                    />
                )
            }
            {usuario && <DialogoDeEditarProduto
                idCategoria={categoria._id}
                aberto={mostraCriacaoDeProduto}
                idConta={usuario.conta}
                onFechar={() => setMostraCriacaoDeProduto(false)}
                onFinalizar={() => setMostraCriacaoDeProduto(false)}
            />}
        </>
    )
}
export default Cardapio