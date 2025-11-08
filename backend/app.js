const express = require("express");
const app = express();
const cors = require("cors");
const user = require("./routes/user");
const book = require("./routes/book");
const cart = require("./routes/cart");
const fav = require("./routes/favourite");
const order = require("./routes/order");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 1000;
app.use(cors());
app.use(express.json());

//Connection
require("./conn/conn");

const _dirname = path.resolve();

//Calling Routes
app.use("/api/v1", user);
app.use("/api/v1", book);
app.use("/api/v1", cart);
app.use("/api/v1", fav);
app.use("/api/v1", order);

// ✅ ✅ Correct static build path (IMPORTANT)
app.use(express.static(path.join(_dirname, "frontend", "dist")));

// ✅ ✅ Catch-all route for React Router (IMPORTANT)
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
});

//SERVER
app.listen(PORT, () => {
  console.log(`Server Started at PORT : ${PORT}`);
});
