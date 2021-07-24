import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Zoom
} from "@material-ui/core";
import update from 'immutability-helper';
import { useConfirm } from "material-ui-confirm";
import { Delete, DragHorizontalVariant, Pencil } from "mdi-material-ui";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAutenticacao } from "../../../contexts/autenticacao";
import { CategoriaDoCardapioFragment, CategoriaDoCardapioFragmentDoc, ProdutoDoCardapioFragment, useExcluirProdutoMutation } from "../../../generated/graphql";
import { useProdutoArrastavel } from "../arrastaveis/useProdutoArrastavel";
import DialogoDeEditarProduto from "./DialogoDeEditarProduto";

type Props = {
  produto: ProdutoDoCardapioFragment
  mostraEdicao?: boolean
  idCategoria: string
  indice: number
  indiceCategoria: number
}

const CardDeProduto: React.FC<Props> = ({
  produto,
  mostraEdicao,
  idCategoria,
  indice,
  indiceCategoria,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const { usuario } = useAutenticacao()
  const [mostraEdicaoDeProduto, setMostraEdicaoDeProduto] = useState(false)
  const history = useHistory()
  const theme = useTheme()
  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  }

  const {
    dropHooks,
    dragHooks,
  } = useProdutoArrastavel({
    id: produto._id,
    indice,
    indiceCategoria,
    idCategoria,
    ref,
  })

  const [{ isDragging }, drag, dragArea] = dragHooks
  const [, drop] = dropHooks

  const opacity = isDragging ? 0.6 : 1.0
  dragArea(drop(ref))

  const confirm = useConfirm();
  const [excluirProduto] = useExcluirProdutoMutation()

  const handleExclusao = async (produto: ProdutoDoCardapioFragment) => {
    try {
      await confirm({
        description: `Deseja mesmo excluir ${produto.nome}?`,
        cancellationButtonProps: {
          color: 'primary',
        },
        confirmationButtonProps: {
          color: 'default',
        },
      })
    } catch {
      console.info('Ação cancelada pelo usuário')
      return
    }

    await excluirProduto({
      variables: { id: produto._id },
      update(cache) {
        const categoria = cache.readFragment<CategoriaDoCardapioFragment>({
          id: `Categoria:${idCategoria}`,
          fragment: CategoriaDoCardapioFragmentDoc,
          fragmentName: 'CategoriaDoCardapio',
        })
        if (!categoria) return

        const indice = categoria.produtos.findIndex(({ _id }) => _id === produto._id)
        if (indice === -1) return

        cache.writeFragment<CategoriaDoCardapioFragment>({
          id: `Categoria:${idCategoria}`,
          fragment: CategoriaDoCardapioFragmentDoc,
          fragmentName: 'CategoriaDoCardapio',
          data: {
            ...categoria,
            produtos: update(categoria.produtos, {
              $splice: [[indice, 1]]
            }),
          }
        })
      },
      optimisticResponse: {
        excluirProduto: true,
      },
    })
  }

  return <div ref={ref}>
    <Card
      elevation={0}
      component="li"
      style={{
        backgroundColor: 'transparent',
        opacity,
        display: 'flex',
        position: 'relative',
      }}
    >
      <Zoom
        in={mostraEdicao}
        timeout={transitionDuration}
        style={{ transitionDelay: `${transitionDuration.exit}ms` }}
        unmountOnExit
      >
        <div>
          <IconButton
            edge="end"
            ref={drag}
            style={{
              cursor: 'move',
            }}
          >
            <DragHorizontalVariant />
          </IconButton>
        </div>
      </Zoom>
      <CardActionArea
        onClick={() => history.push(`${history.location.pathname}?produto=${produto._id}`)}
        style={{
          display: 'flex',
          minHeight: '147px',
          alignItems: 'initial',
        }}
      >
        <CardContent
          style={{
            flex: 1,
            display: 'flex',
          }}
        >
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box style={{ flex: 1, marginBottom: '23px', alignSelf: 'stretch' }}>
              <h3
                style={{
                  marginTop: 0,
                  fontSize: '1rem',
                  fontWeight: 400,
                  color: '#3e3e3e',
                }}
              >
                {produto.nome}
              </h3>
              {produto.descricao && <Typography
                variant="h3"
                color="textSecondary"
                style={{
                  fontSize: '0.75rem',
                  lineHeight: '1rem',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  marginBottom: '10px',
                }}
              >
                {produto.descricao}
              </Typography>}
            </Box>
            {typeof produto.preco === 'number' && <Typography
              variant="h6"
              style={{
                fontSize: '1rem',
                justifySelf: 'end',
              }}
            >
              R$ {produto.preco.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </Typography>}
          </div>
          {produto.urlDoPrato && <div style={{ marginLeft: '15px' }}>
            <CardMedia
              style={{ width: '120px', height: '90px' }}
              image={produto.urlDoPrato}
              title={produto.nome}
            />
          </div>}
        </CardContent>
      </CardActionArea>
      {mostraEdicao && (
        <div
          style={{
            position: 'absolute',
            [produto.urlDoPrato ? 'bottom' : 'top']:  0,
            right: theme.spacing(2),
          }}
        >
          <Zoom
            in={mostraEdicao}
            timeout={transitionDuration}
            style={{ transitionDelay: `${transitionDuration.exit}ms` }}
            unmountOnExit
          >
            <IconButton
              onClick={(event) => {
                event.stopPropagation()
                setMostraEdicaoDeProduto(true)
              }}
            >
              <Pencil />
            </IconButton>
          </Zoom>
          <Zoom
            in={mostraEdicao}
            timeout={transitionDuration}
            style={{ transitionDelay: `${transitionDuration.exit}ms` }}
            unmountOnExit
          >
            <IconButton
              aria-label="remover"
              onClick={(event) => {
                event.stopPropagation()
                handleExclusao(produto)
              }}
            >
              <Delete />
            </IconButton>
          </Zoom>
        </div>
      )}
    </Card>
    <Divider variant="middle" />
    {usuario && <DialogoDeEditarProduto
      idConta={usuario.conta}
      aberto={mostraEdicaoDeProduto}
      produtoInicial={{
        id: produto._id,
        nome: produto.nome,
        descricao: produto.descricao || '',
        preco: produto.preco ?? '',
      }}
      onFechar={() => setMostraEdicaoDeProduto(false)}
      onFinalizar={() => setMostraEdicaoDeProduto(false)}
    />}
  </div>
}

export default CardDeProduto