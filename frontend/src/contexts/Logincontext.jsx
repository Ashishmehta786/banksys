import React, { createContext, useState } from "react";

export const Logincontext = createContext();
export const Loginprovider = (props) => {
    const [login, setlogin] = useState(false);
    return (<Logincontext.Provider value={{ login, setlogin }}>
        {props.children}
    </Logincontext.Provider>)
}