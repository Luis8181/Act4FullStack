const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Verifica si el correo ya está registrado
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Correo ya registrado" });
        }

        //Hashea la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(password, 10);

        //Crea nuevo usuario
        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({ message: "Usuario creado con éxito" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};


// Función para iniciar sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el correo existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        // Verificar la contraseña
        console.log("Contraseña ingresada: ", password);
        console.log("Contraseña almacenada: ", user.password);
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("¿Coincide la contraseña? ", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Correo o contraseña incorrectos" });
        }

        // Crear un token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Enviar la respuesta con el token
        res.status(200).json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error en el servidor" });
    }
};