import { Container } from "@material-ui/core";
import ToolbarDoCardapio from "../pages/cardapio/ToolbarDoCardapio";
import Principal from "./Principal";

export function AreaDeClienteEditavel() {
    <Principal
        // toolbar={(props) =>
        //     <ToolbarDoCardapio
        //         {...props}
        //         podeEditar={podeEditar}
        //         mostraEdicao={mostraEdicao}
        //         setMostraEdicao={setMostraEdicao}
        //         {...buscaDeCardapio}
        //     />
        // }
        // style={{ marginBottom: theme.mixins.toolbar.minHeight }}
    >
        {/* <Container maxWidth="sm" disableGutters component="main">
            {props.children({
                idRestaurante={idRestaurante}
                mostraEdicao={mostraEdicao}
                {...buscaDeCardapio}
            })}
        </Container> */}
    </Principal>
}