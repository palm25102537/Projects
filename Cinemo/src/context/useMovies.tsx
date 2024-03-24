import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const MovieContext = createContext<{ movie: any } | undefined>(undefined);

const MovieContextProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const [movie, setMovie] = useState<any>(undefined);
  useEffect(() => {
    fetch("https://www.majorcineplex.com/apis/get_movie_avaiable", {
      method: "GET",
    }).then(async (res: any) => {
      const resData = await res.json();
      setMovie(resData);
    });
  }, []);

  return (
    <MovieContext.Provider value={{ movie }}>{children}</MovieContext.Provider>
  );
};

function useMovie() {
  const context = useContext(MovieContext);
  return context;
}

export { MovieContextProvider, useMovie };
