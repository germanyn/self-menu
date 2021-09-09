import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    FormControlLabel,
    FormGroup,
    TextField,
} from "@material-ui/core";
import QRCodeStyling, {
    Options
} from 'qr-code-styling';
import { useEffect, useState } from "react";

const URL_LOGO_DEFAULT = `${process.env.PUBLIC_URL}/img/bell-icon.png`

export type DialogoDeQrCodeProps = {
    aberto: boolean
    onFechar?: () => void
    data: string
    img?: string
}

const DialogoDeQrCode: React.FC<DialogoDeQrCodeProps> = ({
    aberto,
    onFechar,
    data: url,
    img = URL_LOGO_DEFAULT,
}) => {
    const [comImagem, setComImagem] = useState(true)
    const [mesa, setMesa] = useState('')
    const [options, setOptions] = useState<Options>({
        width: 280,
        height: 280,
        data: `${url}${mesa ? `?m=${mesa}` : ''}`,
        image: comImagem ? img : undefined,
        imageOptions: {
            crossOrigin: 'anonymous',
            margin: 2,
        },
    })
    const [qrCode] = useState<QRCodeStyling>(new QRCodeStyling(options));

    const handleClose = () => {
        onFechar && onFechar();
    }

    useEffect(() => {
        setOptions(options => ({
            ...options,
            data: `${url}${mesa ? `?m=${mesa}` : ''}`,
            image: comImagem
                ? img
                : undefined,
        }))
    }, [img, url, mesa, comImagem])

    useEffect(() => {
        qrCode.update(options)
    }, [qrCode, options])

    const onRefChange = (node: HTMLDivElement) => {
        qrCode.append(node)
    }

    return (
        <Dialog
            onClose={handleClose}
            open={aberto || false}
        >
            <div ref={onRefChange} style={{ lineHeight: 0 }} />
            <FormGroup
                style={{ marginLeft: '10px', marginRight: '10px' }}
            >
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={comImagem}
                            onChange={evento => setComImagem(evento.target.checked)}
                            name="com-imagem"
                            color="primary"
                        />
                    }
                    label="Com imagem"
                />
                <TextField
                    label="Mesa"
                    onChange={evento => setMesa(evento.target.value)}
                    value={mesa}
                />
            </FormGroup>
            <DialogActions>
                <Button
                    color="primary"
                    onClick={onFechar}
                >
                    Voltar
                </Button>
                <Button
                    color="primary"
                    onClick={() => qrCode.download({
                        name: 'qr-code',
                        extension: 'png',
                    })}
                >
                    Baixar
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogoDeQrCode