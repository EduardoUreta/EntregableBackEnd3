import express from "express";
import { __dirname } from "./utils.js"
import path from "path";

import { Server } from "socket.io";
import { engine } from "express-handlebars";
import { connectDB } from "./config/dbConnection.js";

import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { viewsRouter } from "./routes/views.routes.js";

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

const httpServer = app.listen(port, () => {
    console.log(`Servidor ejecutandose en el puerto ${port}`);
});

// Servidor de WebSocket
const io = new Server(httpServer);

// Conexión a la DB
connectDB();

// Configuración de HandleBars
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Rutas
app.use(viewsRouter);
app.use("/api/products",productsRouter);
app.use("/api/carts", cartsRouter);

// Socket Server
io.on("connection", async(socket) => {
    console.log("Cliente Conectado");
    
});