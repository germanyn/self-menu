import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Zoom, IconButton, useTheme } from "@material-ui/core";
import { Store, Pencil } from "mdi-material-ui";
import DialogoDeEditarLoja from "./DialogoDeEditarLoja";
import { BuscarCardapioQuery } from "../../../generated/graphql"
import { useState } from "react";

type LojaNoCardapioProps = {
    mostraEdicao?: boolean
    loja: BuscarCardapioQuery['loja']
}

export function LojaNoCardapio({
    loja,
    mostraEdicao,
}: LojaNoCardapioProps) {
    const { transitions } = useTheme()
    const transitionDuration = {
        enter: transitions.duration.enteringScreen,
        exit: transitions.duration.leavingScreen,
    };
    const [mostraEdicaoDeLoja, setMostraEdicaoDeLoja] = useState(false)
    return (
        <ListItem>
            <ListItemAvatar>
                {loja.logo
                    ? <Avatar alt="Logo do restaurante" src={loja.logo} />
                    : <Store />
                }
            </ListItemAvatar>
            <ListItemText
                primary={loja.nome}
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
    )
}