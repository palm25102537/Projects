import { useNavigate, useParams } from "react-router-dom";
import { useMovie } from "../context/useMovies";
import { useCallback, useMemo } from "react";
import { Button, CircularProgress, IconButton } from "@mui/material";
import { AppLayout } from "../components/layouts/AppLayout";
import { useMyFavoriteMovie } from "../context/useMyFavoriteMovie";
import { HeartIcon } from "../components/AppSVGIcons";

const MovieDetail = () => {
  const params = useParams();

  const navigate = useNavigate();

  const { movie } = useMovie();

  const { state, dispatch } = useMyFavoriteMovie();

  const movieId = useMemo(() => {
    return params.id ? +params.id : 0;
  }, []);

  const movieDetail = useMemo(() => {
    return movie?.movies?.reduce((acc: any, item: any) => {
      if (item.id === movieId) {
        acc = item;
      }
      return acc;
    }, {});
  }, [movie, movieId]);

  const onMarkAsFavorite = useCallback(
    (id: number) => {
      if (state.favorite.includes(id)) {
        dispatch({ type: "remove", payload: { id: movieId } });
        return;
      }
      dispatch({ type: "add", payload: { id: movieId } });
      return;
    },
    [dispatch, state, movieId]
  );
  return (
    <AppLayout>
      <div className="container mt-[56px] text-[#f5f5f1] mx-auto">
        <div className="fixed flex gap-2 mt-[10px] right-[20px]">
          <IconButton onClick={() => onMarkAsFavorite(movieId)}>
            <HeartIcon
              style={{
                color: state.favorite.includes(movieId) ? "red" : "white",
              }}
            />
          </IconButton>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate(-1)}
          >
            <span className="font-bold text-[#f5f5f1]">Back</span>
          </Button>
        </div>

        {movieDetail ? (
          <div className="px-3 pt-3 pb-8">
            <h2 className="text-[28px] leading-[140%] font-bold text-center">
              {movieDetail["title_en"]}
            </h2>
            <img
              className="max-w-[300px] max-h-[500px] min-w-[200px] w-full h-full min-h-[400px] mx-auto my-8"
              width="auto"
              height="auto"
              src={movieDetail["poster_url"]}
              alt={movieDetail["title_en"]}
            />

            <section
              id="about-movie"
              className="mx-auto w-full max-w-[700px] min-w-[300px] break border border-[#e50914] p-4"
            >
              <ul className="custom-ul">
                <li>
                  <span>ชื่อไทย :</span> <span>{movieDetail["title_th"]}</span>
                </li>
                <li>
                  <span>ชื่ออังกฤษ :</span>{" "}
                  <span>{movieDetail["title_en"]}</span>
                </li>
                <li>
                  <span>ประเภท :</span> <span>{movieDetail["genre"]}</span>
                </li>
                <li>
                  <span>เรทติ้ง :</span> <span>{movieDetail["rating"]}</span>
                </li>
                <li>
                  <span>วันที่ฉาย :</span>{" "}
                  <span>{movieDetail["release_date"]}</span>
                </li>
                <li>
                  <span>ผู้กำกับ :</span> <span>{movieDetail["director"]}</span>
                </li>
                <li>
                  <span>นักแสดง :</span>{" "}
                  <span>{movieDetail["actor"].replaceAll("/", " ")} </span>
                </li>
                <li>
                  <span>ระยะเวลา :</span>{" "}
                  <span>{movieDetail["duration"]} นาที</span>
                </li>
                <li>
                  <span>เรื่องย่อภาษาไทย :</span>{" "}
                  <span>{movieDetail["synopsis_th"]}</span>
                </li>
                <li>
                  <span>เรื่องย่อภาษาอังกฤษ :</span>{" "}
                  <span>{movieDetail["synopsis_en"]}</span>
                </li>
              </ul>
            </section>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default MovieDetail;
