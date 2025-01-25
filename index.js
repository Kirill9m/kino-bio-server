import initApp from "./src/backend/app.js";

const PORT = process.env.PORT || 5080;
const app = initApp();

app.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});