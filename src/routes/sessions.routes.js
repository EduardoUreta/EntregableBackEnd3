import { Router } from "express";
import { usersModel } from "../mongo/models/users.models.js";

export const sessionsRouter = Router();

sessionsRouter.post("/signup", async(req, res) => {
    try {
        const signupForm = req.body;
        const result = await usersModel.create(signupForm);
        // Cambiar role de usuario Coder
        if (result.email === "adminCoder@coder.com" && result.password === "adminCod3r123") {
            const userChangeRole = await usersModel.findOneAndUpdate({email: "adminCoder@coder.com"}, {role:"admin"}, {new: true});
            console.log(userChangeRole);
          }
        res.render("loginView", {message: "usuario Registrado Correctamente"})
    } catch (error) {
        res.render("signupView",{error: "No se pudo registrar el usuario"});
    }
});

sessionsRouter.post("/login", async (req, res) => {
    try {
        const loginForm = req.body;
        const user = await usersModel.findOne({ email: loginForm.email });

        if (!user) {
            return res.render("loginView", { error: "El Usuario no existe" });
        }

        if (user.password !== loginForm.password) {
            return res.render("loginView", { error: "Credenciales Inválidas" });
        }

        req.session.email = user.email;
        const message = `Bienvenido ${req.session.email}`;
        res.redirect(`/?message=${encodeURIComponent(message)}`);
    } catch (error) {
        console.error(error.message);   
        res.render("loginView", { error: "No se pudo Iniciar Sesión" });
    }
});


sessionsRouter.get("/logout", async(req,res)=>{
    try {
        req.session.destroy(err=>{
            if(err) return res.render("profileView",{error:"No se pudo cerrar la sesion"});
            res.redirect("/login");
        })
    } catch (error) {
        res.render("signupView",{error:"No se pudo registrar el usuario"});
    }
});