import { createContext, useContext, useState } from "react"

export type CardapioContextData = {
    mostraCriarCategoria: boolean
    setMostraCriarCategoria: (mostra: boolean) => void
    estaArrastandoCategoria: boolean
    setEstaArrastandoCategoria: (arrastando: boolean) => void
    salvando: boolean
    setSalvando: (arrastando: boolean) => void
}

const CardapioContext = createContext<CardapioContextData>({
    mostraCriarCategoria: false,
    setMostraCriarCategoria: () => undefined,
    estaArrastandoCategoria: false,
    setEstaArrastandoCategoria: () => undefined,
    salvando: false,
    setSalvando: () => undefined,
})

export const CardapioProvider: React.FC = ({ children }) => {
    const [mostraCriarCategoria, setMostraCriarCategoria] = useState<boolean>(false);
    const [estaArrastandoCategoria, setEstaArrastandoCategoria] = useState<boolean>(false);
    const [salvando, setSalvando] = useState<boolean>(false);
    return (
        <CardapioContext.Provider
            value={{
                mostraCriarCategoria,
                setMostraCriarCategoria,
                estaArrastandoCategoria,
                setEstaArrastandoCategoria,
                salvando,
                setSalvando
            }}
        >
            {children}
        </CardapioContext.Provider>
    )
}

export const useCardapio = () => {
    return useContext(CardapioContext)
}

export const withCardapio = (Component: React.ComponentType) => {
    return (props: any) => (
        <CardapioProvider>
            <Component {...props} />
        </CardapioProvider>
    )
}