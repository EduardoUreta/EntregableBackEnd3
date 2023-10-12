import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://eduardoureta:caca1234@probandomongoatlas.wfz8p7i.mongodb.net/2doEntregable?retryWrites=true&w=majority");
        console.log("Base de Datos Conectada");
    } catch (error) {
        console.log(`Error al conectar la base de datos: ${error.message}`);
    }
}