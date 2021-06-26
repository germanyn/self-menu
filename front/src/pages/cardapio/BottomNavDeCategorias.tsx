import { AppBar, ButtonBase, Tab, Tabs } from '@material-ui/core';
import {
    ChevronLeft,
    ChevronRight,
} from 'mdi-material-ui';
import React, { forwardRef } from 'react';
import { BuscarCardapioQueryHookResult } from '../../generated/graphql'

type Props = {
    tabAtual?: string | null
    setTabAtual?: (tab: string | null) => void
    mostraEdicao: boolean
} & BuscarCardapioQueryHookResult

const MyTabScrollButton = forwardRef((props, ref) => {
    const { direction, ...other } = props as any;
  
    return (
        <ButtonBase
            component="div"
            ref={ref}
            style={{
                width: '48px',
                // display: direction === "left" ? 'hidden' : undefined,
                opacity: other.disabled ? 0 : 1,
            }}
            {...other}
        >
            {direction === "left"
                ? <ChevronLeft fontSize="small" />
                : <ChevronRight fontSize="small" />
            }
        </ButtonBase>
    );
  });

const BottomNavDeCategorias: React.FC<Props> = ({
    tabAtual,
    setTabAtual,
    data,
    loading,
    mostraEdicao,
}) => {
    if (loading || !data) return <div style={{display: 'none'}}/>
    return (
        <AppBar
            position="fixed"
            color="default"
            style={{
                top: 'auto',
                bottom: 0,
            }}
        >
            <Tabs
                value={tabAtual || data.loja.categorias[0]._id}
                onChange={(event, newValue) => {
                    setTabAtual && setTabAtual(newValue);
                }}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="on"
                ScrollButtonComponent={MyTabScrollButton}
                style={{
                    marginRight: mostraEdicao ? '88px' : undefined,
                }}
            >
                {data.loja.categorias.map(categoria => 
                    <Tab
                        label={categoria.nome}
                        value={categoria._id}
                        key={categoria._id}
                    />
                )}
            </Tabs>
        </AppBar>
    )
}

export default BottomNavDeCategorias
