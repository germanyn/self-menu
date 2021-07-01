import {
    Card,
    CardContent,
    CardHeader,
    createStyles,
    Dialog,
    Fab,
    makeStyles,
    Slide,
    Theme,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions/transition";
import { Loading, Pencil } from "mdi-material-ui";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import BotaoDeVoltar from "../../../components/BotaoDeVoltar";
import { useAutenticacao } from "../../../contexts/autenticacao";
import { useObterProdutoDoCardapioQuery } from "../../../generated/graphql";
import DialogoDeEditarProduto from "./DialogoDeEditarProduto";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        botaoDeVoltar: {
            position: 'absolute',
            top: theme.spacing(1),
            left: theme.spacing(1),
            backgroundColor: 'rgba(255, 255, 255, 0.2)'
        },
        fab: {
            position: 'fixed',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const DetalhesDoProduto: React.FC<Props> = ({
    id,
    aberto,
    onFechar,
    mostraEdicao,
}) => {
    const { usuario } = useAutenticacao()
    const classes = useStyles()
    const history = useHistory()
    const { data, loading, error } = useObterProdutoDoCardapioQuery({
        fetchPolicy: 'cache-first',
        variables: { id },
    })
    const produto = data?.produto
    const [mostraCriacaoDeProduto, setMostraCriacaoDeProduto] = useState(false)
    const theme = useTheme()
    const éMobile = useMediaQuery(theme.breakpoints.down('sm'));

    let conteudoDoCard: JSX.Element
    if (loading) {
        conteudoDoCard = (
            <div style={{
                marginTop: '40px',
                width: '100%',
                textAlign: 'center',
            }}>
                <Loading />
            </div>
        )
    } else if (error || !produto) {
        conteudoDoCard = (
            <CardHeader
                style={{ marginTop: '40px' }}
                title={"Não foi possível obter o produto"}
                subtitle={error ? error.toString() : undefined}
            />
        )
    } else {
        conteudoDoCard = (
            <Card style={{ minHeight: éMobile ? '100vh' : undefined }}>
                <div style={{ minHeight: '40px', textAlign: 'center' }}>
                    {produto.urlDoPrato && (
                        <img
                            src={produto.urlDoPrato}
                            alt={produto.nome}
                            style={{
                                maxHeight: '40vh',
                                maxWidth: '100%',
                                padding: '8px',
                            }}
                        />
                    )}
                </div>
                <CardHeader title={produto.nome} />
                <CardContent style={{ paddingBottom: 0 }}>
                    {produto.descricao && (
                        <Typography
                            variant="body2"
                            style={{
                                fontSize: '0.875rem',
                            }}
                        >
                            {produto.descricao}
                        </Typography>
                    )}
                </CardContent>
                <CardContent>
                </CardContent>
                {typeof produto.preco === 'number' && <Typography
                    variant="h6"
                    style={{
                        fontSize: '0.875rem',
                        justifySelf: 'end',
                        marginTop: '12px',
                        marginBottom: '12px',
                        paddingRight: '16px',
                        paddingLeft: '16px',
                    }}
                >
                    R$ {produto.preco.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </Typography>}
            </Card>
        )
    }

    return (
        <Dialog
            fullScreen={éMobile}
            open={aberto}
            onClose={() => onFechar && onFechar()}
            TransitionComponent={Transition}
        >
            {éMobile && <BotaoDeVoltar
                className={classes.botaoDeVoltar}
                onClick={() => history.push(history.location.pathname)}
            />}
            {conteudoDoCard}
            {mostraEdicao && <Fab
                color="primary"
                aria-label="Editar produto"
                // onClick={trocarModoEdicao}
                className={classes.fab}
            >
                <Pencil />
            </Fab>}
            {usuario && <DialogoDeEditarProduto
                aberto={mostraCriacaoDeProduto}
                idConta={usuario.conta}
                onFechar={() => setMostraCriacaoDeProduto(false)}
                onFinalizar={() => setMostraCriacaoDeProduto(false)}
            />}
        </Dialog>
    );

}

export type Props = {
    id: string
    aberto: boolean
    mostraEdicao: boolean
    onFechar?: () => void
}

export default DetalhesDoProduto
