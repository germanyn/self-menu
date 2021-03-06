import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginFragment } from '../generated/graphql';

export type Registro = {
    usuario: UsuarioLogado
    token: string
}

export type UsuarioLogado = {
    id: string
    nome: string
    conta: string
    restaurante: string
}

interface AutenticacaoContextData {
    logado: boolean;
    usuario: UsuarioLogado | null
    setUsuario: (usuario: UsuarioLogado | null) => void
    token: string | null
    setToken: (token: string | null) => void
    setRegistro: (registro: LoginFragment) => void
    deslogar: () => void
}

const AutenticacaoContext = createContext<AutenticacaoContextData>({} as AutenticacaoContextData);

const APP_USER = '@App:user'
const APP_TOKEN = '@App:token'

export const AutenticacaoProvider: React.FC = ({ children }) => {
    const [ usuario, setUsuario ] = useState<UsuarioLogado | null>(null);
    const [ token, setToken ] = useState<string | null>(null);
    const logado = !!token
    const setRegistro = (registro: LoginFragment) => {
        const usuarioLogado: UsuarioLogado = {
            conta: registro.usuario.contas[0]._id,
            id: registro.usuario._id,
            nome: registro.usuario.nome,
            restaurante: registro.usuario.contas[0].lojas[0]._id,
        }
        localStorage.setItem(APP_USER, JSON.stringify(usuarioLogado));
        localStorage.setItem(APP_TOKEN, registro.token);
        setUsuario(usuarioLogado)
        setToken(registro.token)
    }
    const deslogar = () => {
        localStorage.removeItem(APP_USER)
        localStorage.removeItem(APP_TOKEN)
        setUsuario(null)
        setToken(null)
    }

    useEffect(() => {
        const storagedUser = localStorage.getItem(APP_USER);
        const storagedToken = localStorage.getItem(APP_TOKEN);

        setUsuario(storagedUser && JSON.parse(storagedUser));
        setToken(storagedToken)
    }, []);

    return (
        <AutenticacaoContext.Provider
            value={{
                logado,
                usuario,
                token,
                setRegistro,
                setToken,
                setUsuario,
                deslogar,
            }}
        >
            {children}
        </AutenticacaoContext.Provider>
    );
};

export const useAutenticacao = () => {
    return useContext(AutenticacaoContext)
}

export default AutenticacaoContext;