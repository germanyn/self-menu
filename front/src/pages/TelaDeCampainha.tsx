import { Card, Container, Grid } from "@material-ui/core";
import AppToolbar from "../layouts/AppToolbar";
import Principal from "../layouts/Principal";

export default function TelaDeCampainha() {
    return (
        <Principal toolbar={AppToolbar}>
            <Container maxWidth="sm" component="main">
                <Card>
                    teste
                </Card>
            </Container>
        </Principal>
    )
}