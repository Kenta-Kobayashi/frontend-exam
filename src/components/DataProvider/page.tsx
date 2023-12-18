import {
    Dispatch,
    JSXElementConstructor,
    PromiseLikeOfReactNode,
    ReactElement,
    ReactNode,
    ReactPortal,
    SetStateAction,
    createContext,
    useState,
} from "react";
import { Prefecture } from "../Button/page"

export const dataContext = createContext<
  [Prefecture[], Dispatch<SetStateAction<Prefecture[]>>]
>([[], () => {}]);

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

const [contextState, setContextState] = useState<Prefecture[]>([]);

  return (
    <dataContext.Provider value={[contextState, setContextState]}>
      {props.children}
    </dataContext.Provider>
  );
};

export default DataProvider;
