import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";
import auth from "../shared/utils/auth";

interface Authen {
  authen: string;
}

interface Action {
  type: "set" | "clear";
  payload: Authen;
}

const { getToken, setToken, clearToken } = auth;

const INITIAL_STATE: Authen = {
  authen: getToken() ?? "",
};

function handleAuthen(state: Authen, action: Action) {
  switch (action.type) {
    case "set":
      setToken(action.payload.authen);
      return {
        authen: action.payload.authen,
      };
    case "clear":
      clearToken();
      return JSON.parse(JSON.stringify(INITIAL_STATE));
    default:
      return state;
  }
}

const AuthContext = createContext<
  { state: Authen; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

const AuthContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(handleAuthen, INITIAL_STATE);
  const provide = {
    state,
    dispatch,
  };
  return (
    <AuthContext.Provider value={provide}>{children}</AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { AuthContextProvider, useAuth };
