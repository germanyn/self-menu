import { CardActionArea, Card, CardContent, CircularProgress, Grid, Typography, useTheme, Container } from "@material-ui/core"
import { StoreRemove } from "mdi-material-ui"
import { useHistory } from "react-router-dom"
import { useBuscarRestaurantesQuery } from "../generated/graphql"
import AppToolbar from "../layouts/AppToolbar"
import Principal from "../layouts/Principal"

export default function TelaDeRestaurantes() {
    const { data, loading, error } = useBuscarRestaurantesQuery()
    const lojas = data?.lojas
    const { spacing } = useTheme()
    const history = useHistory()
    const Conteudo = () => {
        if (loading) {
            return <>
                <Grid
                    item
                    style={{
                        margin: spacing(2),
                        textAlign: 'center',
                    }}
                    xs={12}
                >
                    <CircularProgress size={64} style={{ color: 'grey' }} color="inherit" />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography component="h3" variant="h6" style={{ color: 'grey' }}>
                        Procurando restaurante...
                    </Typography>
                </Grid>
            </>
        }
        if (error || !lojas) {
            return <>
                <Grid
                    item
                    style={{
                        margin: spacing(2),
                        textAlign: 'center',
                    }}
                    xs={12}
                >
                    <StoreRemove style={{ fontSize: '64px', color: 'grey' }} />
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                    <Typography component="h3" variant="h6">
                        {error ? error.message : 'Erro ao buscar os restaurantes'}
                    </Typography>
                </Grid>
            </>
        }
        return lojas.map(loja => (
                <Grid xs={6} key={loja._id} item>
                    <Card>
                        <CardActionArea onClick={() => history.push(`/${loja._id}`)}>
                            <CardContent>
                                <Typography component="h2" variant="h6">
                                    {loja.nome}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))
        
    }

    const conteudo = Conteudo()

    return (
        <Principal toolbar={AppToolbar}>
            <Container maxWidth="sm" component="main">
                <Grid
                    container
                    spacing={2}
                    style={{
                        paddingTop: spacing(2),
                        paddingBottom: spacing(2),
                    }}
                >
                    {conteudo}
                </Grid>
            </Container>
        </Principal>
    )
}