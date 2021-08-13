import {
    ListItem,
    Typography,
    useTheme,
} from "@material-ui/core"
import { AddCircleOutlined } from "@material-ui/icons"
import { Fragment } from "react"
import { useDrop } from 'react-dnd'
import { BuscarCardapioQuery } from "../../generated/graphql"
import { ArrastaveisEnum } from "./arrastaveis/tipos"
import CategoriaDoCardapio from "./categoria/CategoriaDoCardapio"

type CardapioProps = {
    mostraEdicao?: boolean
    idRestaurante: string
    loja: BuscarCardapioQuery['loja']
}

export const Cardapio: React.FC<CardapioProps> = ({
    loja,
    mostraEdicao,
    idRestaurante,
}) => {
    const theme = useTheme()
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
    const [, drop] = useDrop(() => ({
        accept: [
            ArrastaveisEnum.CATEGORIA,
            ArrastaveisEnum.PRODUTO,
        ],
    }))

    return (
        <Fragment>
            {mostraEdicao && !loja.categorias.length && (
                <ListItem
                    style={{
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        style={{ display: 'flex', color: 'grey' }}
                    > Clique em&nbsp;<AddCircleOutlined style={{ color: theme.palette.primary.main }} />&nbsp;para criar uma categoria </Typography>
                </ListItem>
            )}
            <div ref={drop}>
                {loja.categorias.map((categoria, indice) => <CategoriaDoCardapio
                    mostraEdicao={mostraEdicao}
                    categoria={categoria}
                    key={categoria._id}
                    idRestaurante={idRestaurante}
                    indice={indice}
                />)}
            </div>
        </Fragment>
    )
}
export default Cardapio