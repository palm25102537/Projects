import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { AuthContextProvider } from "./context/useAuth";
import HomePage from "./pages/homePage";
import PrivateRoute from "./route/private";
import Favorite from "./pages/favourite";
import MovieDetail from "./pages/movieDetail";
import { MyFavoriteMovieContextProvider } from "./context/useMyFavoriteMovie";
import { MovieContextProvider } from "./context/useMovies";

function App() {
  return (
    <AuthContextProvider>
      <MyFavoriteMovieContextProvider>
        <MovieContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />

              <Route path="/" element={<PrivateRoute />}>
                <Route path="" element={<HomePage />}></Route>
                <Route path="/:id" element={<MovieDetail />}></Route>
                <Route path="/my-favorite-movie" element={<Favorite />}></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </MovieContextProvider>
      </MyFavoriteMovieContextProvider>
    </AuthContextProvider>
  );
}

export default App;
