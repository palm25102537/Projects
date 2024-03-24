import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

interface MyFavMov {
  favorite: number[];
}

interface Action {
  type: "set" | "add" | "remove";
  payload: {
    id: number;
  };
}

const INITIAL_STATE: MyFavMov = {
  favorite: [2235],
};

function handleMyFavoriteMovie(state: MyFavMov, action: Action) {
  if (action.type === "set") {
    return {
      favorite: [action.payload.id] ?? [],
    };
  }

  if (action.type === "add") {
    return {
      favorite: [...state.favorite, action.payload.id],
    };
  }

  if (action.type === "remove") {
    const idx = state.favorite.findIndex((item) => item === action.payload.id);
    const dummy = JSON.parse(JSON.stringify(state.favorite));
    dummy.splice(idx, 1);

    return {
      favorite: dummy,
    };
  }

  return state;
}

const MyFavoriteMovieContext = createContext<
  | {
      state: MyFavMov;
      dispatch: React.Dispatch<Action>;
    }
  | undefined
>(undefined);

const MyFavoriteMovieContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(handleMyFavoriteMovie, INITIAL_STATE);
  const provide = { state, dispatch };
  return (
    <MyFavoriteMovieContext.Provider value={provide}>
      {children}
    </MyFavoriteMovieContext.Provider>
  );
};

function useMyFavoriteMovie() {
  const context = useContext(MyFavoriteMovieContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export { useMyFavoriteMovie, MyFavoriteMovieContextProvider };
