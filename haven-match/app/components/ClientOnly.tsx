'use client';

import { Children, useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
    children
}) => {
    const [hasMounted, setHasMaunted] = useState(false);

    useEffect(() => {
        setHasMaunted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <>
        {children}
        </>
    );
};
  
export default ClientOnly;
  