import { useCallback, useMemo, useState } from "react";
import { useMovie } from "../context/useMovies";
import { AppMovieCard } from "../components/AppMoiveCard";
import Divider from "@mui/material/Divider";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { HeartIcon } from "../components/AppSVGIcons";
import { useMyFavoriteMovie } from "../context/useMyFavoriteMovie";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "../components/layouts/AppLayout";

const HomePage = () => {
  const navigate = useNavigate();
  const { movie } = useMovie();
  const { state, dispatch } = useMyFavoriteMovie();
  const [search, setSearch] = useState();
  const movies = useMemo(() => {
    if (!movie) {
      return [];
    }

    if (search) {
      return movie.movies.filter((item: any) => {
        const title = item["title_en"].toLowerCase();
        return title.includes(search);
      });
    }

    return movie.movies;
  }, [movie, search]);

  const onSearch = useCallback((e: any) => {
    const { value } = e.target;
    setSearch(() => value.toLowerCase());
  }, []);

  const onMarkAsFavorite = useCallback(
    (id: number) => {
      if (state.favorite.includes(id)) {
        dispatch({ type: "remove", payload: { id } });
        return;
      }
      dispatch({ type: "add", payload: { id } });
      return;
    },
    [dispatch, state]
  );

  const navigateToDetail = (id: number) => {
    navigate("/" + id.toString());
  };
  return (
    <AppLayout showSideBar>
      <div className="container mx-auto">
        <div className="flex items-center flex-wrap gap-2 justify-between mb-8">
          <h2 className="text-[28px] leading-[140%] font-bold">All Movies</h2>
          <TextField
            color="primary"
            variant="standard"
            error
            label="Search"
            onChange={onSearch}
            sx={{
              color: "white",
              ".MuiInput-input": {
                color: "red",
              },
            }}
          />
        </div>
        <div className="flex flex-wrap gap-5 items-center">
          {movies.map((item: any) => {
            return (
              <AppMovieCard cardClass="relative" key={item.id}>
                <div className="absolute z-p left-[3%] translate-x-[-3%]">
                  <IconButton onClick={() => onMarkAsFavorite(item.id)}>
                    <HeartIcon
                      style={{
                        color: state.favorite.includes(item.id)
                          ? "red"
                          : "white",
                      }}
                    />
                  </IconButton>
                </div>
                <img
                  className="h-[280px] w-full rounded-t-2xl"
                  src={item["poster_url"]}
                  alt={item["title_en"]}
                  width={200}
                  height={200}
                  onClick={() => navigateToDetail(item.id)}
                />
                <div
                  className="bg-[#b81d24] rounded-b-2xl px-2 py-3"
                  onClick={() => navigateToDetail(item.id)}
                >
                  <Tooltip title={item.title_en}>
                    <div className="text-center text-ellipsis">
                      {item.title_en}
                    </div>
                  </Tooltip>

                  <Divider
                    sx={{
                      borderColor: "#221f1f",
                      borderWidth: "1px",
                      margin: "16px 0 16px 0",
                    }}
                  />
                  <Tooltip title={item.genre.replaceAll("/", ", ")}>
                    <div className="text-center text-ellipsis">
                      {item.genre.replaceAll("/", ", ")}
                    </div>
                  </Tooltip>
                </div>
              </AppMovieCard>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default HomePage;
