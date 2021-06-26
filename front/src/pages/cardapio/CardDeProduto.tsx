import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography
} from "@material-ui/core";
import { useState } from "react";
import { useAutenticacao } from "../../contexts/autenticacao";
import { ProdutoDoCardapioFragment } from "../../generated/graphql";
import DialogoDeEditarProduto from "./DialogoDeEditarProduto";

type Props = {
  produto: ProdutoDoCardapioFragment
  mostraEdicao?: boolean
}

const CardDeProduto: React.FC<Props> = ({
  produto,
  mostraEdicao,
}) => {
  const { usuario } = useAutenticacao() 
  const [mostraEdicaoDeProduto, setMostraEdicaoDeProduto] = useState(false)
  return <>
    <Card
      elevation={0}
      component="li"
      style={{
        backgroundColor: 'transparent',
      }}
    >
      <CardActionArea
        onClick={mostraEdicao ? () => setMostraEdicaoDeProduto(true) : undefined}
        style={{
          display: 'flex',
          minHeight: '147px',
          alignItems: 'initial',
        }}
      >
        <CardContent style={{
          flex: 1,
          display: 'flex',
        }}>
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
                { produto.nome }
              </h3>
              {produto.descricao && <Typography
                variant="h3"
                color="textSecondary"
                style={{
                  fontSize: '0.75rem',
                  lineHeight: '1rem',
                  fontWeight: 'lighter',
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
              R$ { produto.preco.toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }) }
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
    </Card>
    {usuario && <DialogoDeEditarProduto
      idConta={usuario.conta}
      aberto={mostraEdicaoDeProduto}
      produtoInicial={{
        id: produto._id,
        nome: produto.nome,
        descricao: produto.descricao || '',
        preco: produto.preco || null
      }}
      onFechar={() => setMostraEdicaoDeProduto(false)}
      onFinalizar={() => setMostraEdicaoDeProduto(false)}
    />}
  </>
}

export default CardDeProduto