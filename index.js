import initApp from "./src/backend/app.js";
import { loadMovie, loadMovies } from "./src/backend/moviesLoad.js";

const api = {
  loadMovie: loadMovie,
  loadMovies: loadMovies
};

const PORT = process.env.PORT || 5080;
const app = initApp(api);

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});