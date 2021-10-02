const app = require("./app");

const HOST = process.env.SERVER_HOST || "localhost";
const PORT = process.env.SERVER_PORT || 3333;

app.listen(PORT, (err) =>
  err
    ? console.log(err)
    : console.log(`Backend is running in: http://${HOST}:${PORT}`)
);
