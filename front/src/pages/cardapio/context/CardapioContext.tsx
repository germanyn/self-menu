import { createContext, useContext, useState } from "react"

export type CardapioContextData = {
    mostraCriarCategoria: boolean
    setMostraCriarCategoria: (mostra: boolean) => void
    categoriaId: string | null
    setCategoriaId: (categoriaId: string | null) => void
    scrollTo: string | null
    setScrollTo: (categoriaId: string | null) => void
}

const CardapioContext = createContext<CardapioContextData>({
    mostraCriarCategoria: false,
    setMostraCriarCategoria: () => undefined,
    categoriaId: null,
    setCategoriaId: () => undefined,
    scrollTo: null,
    setScrollTo: () => undefined,
})

export const CardapioProvider: React.FC = ({ children }) => {
    const [mostraCriarCategoria, setMostraCriarCategoria] = useState<boolean>(false);
    const [categoriaId, setCategoriaId] = useState<string | null>(null);
    const [scrollTo, setScrollTo] = useState<string | null>(null);
    return (
        <CardapioContext.Provider
            value={{
                mostraCriarCategoria,
                setMostraCriarCategoria,
                categoriaId,
                setCategoriaId,
                scrollTo,
                setScrollTo,
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