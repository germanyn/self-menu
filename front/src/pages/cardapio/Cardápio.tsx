import {
    Avatar,
    Button,
    Grid,
    Grow,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    useTheme,
    Zoom
} from "@material-ui/core"
import {
    Pencil,
    Plus,
    Store
} from 'mdi-material-ui'
import { useState } from "react"
import {
    BuscarCardapioQueryHookResult
} from "../../generated/graphql"
import CategoriaDoCardapio from "./categoria/CategoriaDoCardapio"
import { useCardapio } from "./context/CardapioContext"
import DialogoDeEditarLoja from "./loja/DialogoDeEditarLoja"

type CardapioProps = {
    mostraEdicao?: boolean
    idRestaurante: string
} & BuscarCardapioQueryHookResult

export const Cardapio: React.FC<CardapioProps> = ({
    loading,
    error,
    data,
    mostraEdicao,
    idRestaurante,
}) => {
    const theme = useTheme()
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };
    const [mostraEdicaoDeLoja, setMostraEdicaoDeLoja] = useState(false)
    const loja = data?.loja
    const { setMostraCriarCategoria } = useCardapio()
    // const arrLength = loja?.categorias.length
    // const [elRefs, setElRefs] = useState<InViewHookResponse[]>([]);
    // const { setCategoriaId } = useCardapio()
    // const [categoriasVisiveis, setCategoriasVisiveis] = useState<boolean[]>([])

    // useEffect(() => {
    //     setElRefs(elRefs => (
    //         Array(arrLength).fill(null).map((_, i) => elRefs[i] || createRef)
    //     ));
    // }, [arrLength]);

    // useEffect(() => {
    //     elRefs.forEach(ref => {
    //         const observer = new IntersectionObserver(
    //             ([entry]) => setIntersecting(entry.isIntersecting)
    //         )
    //     })
    // }, [elRefs]);

    // useEffect(() => {
    //     if (!loja) return
    //     const indice = categoriasVisiveis.findIndex(visivel => visivel)
    //     if (indice === -1) return
    //     setCategoriaId(loja.categorias[indice]._id)
    // }, [categoriasVisiveis])

    if (loading) {
        return <div>carregando...</div>
    }
    if (error || !loja) {
        return <div>{error ? error.message : 'Erro ao buscar o restaurante'}</div>
    }
    return (
        <Grid container>
            <Grid item xs={12} >
                <List style={{
                    position: 'relative',
                    overflow: 'auto',
                }}>
                    <ListItem>
                        <ListItemAvatar>
                            {loja.logo
                                ? <Avatar alt="Logo do restaurante" src={loja.logo} />
                                : <Store />
                            }
                        </ListItemAvatar>
                        <ListItemText
                            primary={loja.nome}
                            // secondary="&nbsp;"
                            // secondary="Mais detalhes"
                        />
                        <ListItemSecondaryAction>
                            <Zoom
                                in={mostraEdicao}
                                timeout={transitionDuration}
                                style={{ transitionDelay: `${transitionDuration.exit}ms` }}
                                unmountOnExit
                            >
                                <IconButton
                                    aria-label="add"
                                    edge="end"
                                    onClick={() => setMostraEdicaoDeLoja(true)}
                                >
                                    <Pencil />
                                </IconButton>
                            </Zoom>
                            <DialogoDeEditarLoja
                                id={loja._id}
                                aberto={mostraEdicaoDeLoja}
                                lojaInicial={{ nome: loja.nome }}
                                onFinalizar={() => setMostraEdicaoDeLoja(false)}
                                onFechar={() => setMostraEdicaoDeLoja(false)}
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                    {loja.categorias.map(categoria => <CategoriaDoCardapio
                        mostraEdicao={mostraEdicao}
                        categoria={categoria}
                        key={categoria._id}
                        idRestaurante={idRestaurante}
                    // ref={}
                    />)}
                    <Grow in={mostraEdicao}>
                        <ListItem style={{ paddingTop: '24px' }}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                startIcon={<Plus />}
                                onClick={() => setMostraCriarCategoria(true)}
                                style={{ flexGrow: 1 }}
                            >
                                Nova Categoria
                            </Button>
                        </ListItem>
                    </Grow>
                </List>
            </Grid>
        </Grid>
    )
}
export default Cardapio