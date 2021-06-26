import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const ToolbarPortal: PropsWithChildren<any> = (props: any) => {
    const el = useRef(document.createElement('div'));
    useEffect(() => {
        const portal = document.getElementById('portal');
        if (!portal) return
        portal.appendChild(el.current);

        return () => {
            portal.removeChild(el.current);
        };

    }, [props.children]);

    return createPortal(props.children, el.current);
}

export default ToolbarPortal