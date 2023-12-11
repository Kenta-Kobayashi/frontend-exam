import {JSXElementConstructor, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal, createContext, useState, } from "react";

export const dataContext = createContext();

const DataProvider = (props: {
    children:
        | string
        | number
        | boolean
        | ReactElement<any, string | JSXElementConstructor<any>>
        | Iterable<ReactNode>
        | ReactPortal
        | PromiseLikeOfReactNode
        | null
        | undefined;
    }) => {

    return (
        <dataContext.Provider value={100}>{props.children}</dataContext.Provider>
    );
};

export default DataProvider;
