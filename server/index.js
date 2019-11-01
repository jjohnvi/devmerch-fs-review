require("dotenv").config();
const express = require("express");
const massive = require("massive");
const session = require("express-session");

const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

//Controllers
const AC = require("./controllers/auth_controller");
const PC = require("./controllers/product_controller");
const CC = require("./controllers/cart_controller/cart_controller");

//Middlewares
const AM = require("./middlewares/auth_middleware");
const CM = require("./middlewares/cart_middleware");

const app = express();

massive(CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    console.log("DB Connected");
  })
  .catch(err => console.log(err));

app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(express.json());

app.get("/api/products", PC.getAllProducts);

//Auth Endpoints
app.use(AM.checkForUser);
app.post("/auth/register", AC.register);
app.post("/auth/login", AC.login);
app.get("/auth/logout", AC.logout);

//Cart Endpoints
app.use(CM.checkForCart);
app.post("/api/cart", CC.addToCart);

app.listen(SERVER_PORT, () => console.log(`yo we in port ${SERVER_PORT}`));
