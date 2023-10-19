import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import { __dirname } from "./utils.js"
import path from "path";

import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { connectDB } from "./config/dbConnection.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";

const port = 8080;
const app = express();

// MiddleWre
app.use(express.static(path.join(__dirname,"/public")));
    // Para JSON
app.use(express.json());
    // Para Forms
app.use(express.urlencoded({extended:true}));
    // Bootstrap
app.use(express.static('node_modules/bootstrap/dist'));
app.use('/css', express.static('node_modules/bootstrap/dist/css'));
app.use('/js', express.static('node_modules/bootstrap/dist/js'));
    // Uso de Cookies
app.use(cookieParser("claveSecreta"));

const httpServer = app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});

// Servidor de WebSocket
const io = new Server(httpServer);

// Conexión a la DB
connectDB();

// Configuración de HandleBars
app.engine('.hbs', engine({
        extname: '.hbs',
        // Para que HandleBars tome información del 3eros
        runtimeOptions: {
            allowProtoMethodsByDefault: true,
            allowProtoPropertiesByDefault: true
        }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

//configuración de session
app.use(session({
    store: MongoStore.create({
        ttl:3000,
        mongoUrl:"mongodb+srv://eduardoureta:caca1234@probandomongoatlas.wfz8p7i.mongodb.net/mongoStore?retryWrites=true&w=majority"
    }),
    secret:"secretSession",
    resave:true,
    saveUninitialized:true
}));

// Rutas
app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);

