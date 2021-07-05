
import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend'

export const withDragAndDrop = (Component: React.ComponentType) => {
    return (props: any) => (
        <DndProvider
            backend={TouchBackend}
            options={{ enableMouseEvents: true }}
        >
            <Component {...props} />
        </DndProvider>
    )
}

export const AplicationDragAndDrop: React.FC = (props) =>
    <DndProvider
        backend={TouchBackend}
        options={{ enableMouseEvents: true }}
    >
        { props.children }
    </DndProvider>
