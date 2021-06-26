import React, { useState, MutableRefObject, forwardRef, createContext, RefObject, PropsWithChildren } from "react"

export const useToolbarRef = () => {
    const [ toolbar, setToolbar ] = useState<React.RefObject<HTMLDivElement> | null>(null)
    return [ toolbar, setToolbar ]
}

const ToolbarContext = createContext<{
    ref: RefObject<HTMLDivElement> | null
}>({ ref: null });

const ToolbarProvider = ToolbarContext.Provider
// const ToolbarConsumer = ToolbarContext.Consumer

export {
    ToolbarProvider,
    // ToolbarConsumer,
}

// export const ToolbarConsumer

// const withToolbar = (Component: any) => (props: any) => (
//     <ToolbarContext.Consumer>
//       {(props: PropsWithChildren<any>) => props.childrens}
//     </ToolbarContext.Consumer>
// );