import { Container, Grid, Typography } from "@material-ui/core";
import AppToolbar from "../layouts/AppToolbar";
import Principal from "../layouts/Principal";
import ToolbarDoCardapio from "./cardapio/ToolbarDoCardapio";

export default function TelaDeSobre() {
    return (
        <Principal
            toolbar={(props) =>
                <AppToolbar
                    {...props}
                    titulo="Sobre"
                />
            }
        >
            <Container component="main">
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h5"
                            color="inherit"
                        >
                            Self Menu
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Principal>
    )
}