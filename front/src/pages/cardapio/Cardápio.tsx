import {
    Avatar,
    Button,
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
    Plus
} from 'mdi-material-ui'
import { useState } from "react"
import {
    BuscarCardapioQueryHookResult
} from "../../generated/graphql"
import CategoriaDoCardapio from "./CategoriaDoCardapio"
import DialogoDeEditarCategoria from "./DialogoDeEditarCategoria"

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
    const [mostraCriacaoDeCategoria, setMostraCriacaoDeCategoria] = useState(false)

    if (loading) {
        return <div>carregando...</div>
    }
    if (error || !data) {
        return <div>{error ? error.message : 'Erro ao buscar o restaurante'}</div>
    }
    const loja = data.loja
    return <List style={{
        position: 'relative',
        overflow: 'auto',
    }}>
        <ListItem>
            <ListItemAvatar>
                {loja.logo ? <Avatar alt="Logo do restaurante" src={loja.logo} /> : <div />}
            </ListItemAvatar>
            <ListItemText
                primary={loja.nome}
                secondary="Mais detalhes"
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
                        onClick={() => setMostraCriacaoDeCategoria(true)}
                    >
                        <Pencil />
                    </IconButton>
                </Zoom>
            </ListItemSecondaryAction>
        </ListItem>
        {data.loja.categorias.map(categoria => <CategoriaDoCardapio
            mostraEdicao={mostraEdicao}
            categoria={categoria}
            key={categoria._id}
            idRestaurante={idRestaurante}
        />)}
        <Grow in={mostraEdicao}>
            <ListItem>
                <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<Plus />}
                    onClick={() => setMostraCriacaoDeCategoria(true)}
                    style={{ flexGrow: 1 }}
                >
                    Nova Categoria
                </Button>
            </ListItem>
        </Grow>
        <DialogoDeEditarCategoria
            aberto={mostraCriacaoDeCategoria}
            lojaId={idRestaurante}
            onFechar={() => setMostraCriacaoDeCategoria(false)}
            onFinalizar={() => setMostraCriacaoDeCategoria(false)}
        />
    </List>
}
export default Cardapio