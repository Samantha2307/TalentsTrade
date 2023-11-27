const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
const { clearScreenDown } = require("readline");
const { ObjectId } = require('mongodb');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Conectar a la base de datos MongoDB
mongoose.connect("mongodb+srv://samanthadm:samanthadm@talentstrade.wciw8an.mongodb.net/talents_trate", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", (error) => {
  console.error("Error de conexión a la base de datos:", error);
});

db.once("open", () => {
  console.log("Conexión exitosa a la base de datos");
});

mongoose.connection.on("connected", () => {
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error(err);
      return;
    }
    collections.forEach((collection) => {
      console.log("Colección existente:", collection.name);
    });
  });
});

const userSchema = new mongoose.Schema({
  email: String,
  ubicacion:String,
});

const Usuario = mongoose.model("Usuario", userSchema, "users");

// Definir el modelo para habilidades
const HabilidadSchema = new mongoose.Schema({
  nombre: String,
});

const Habilidad = mongoose.model("Habilidad", HabilidadSchema, "habilidades");

// Definir el modelo para intereses
const InteresSchema = new mongoose.Schema({
  nombre: String,
});

const Interes = mongoose.model("Interes", InteresSchema, "intereses");

// Definir el modelo para habilidades de usuario
const UsuarioHabilidadSchema = new mongoose.Schema({
  usuarioEmail: String,
  habilidadId: mongoose.Schema.Types.ObjectId,
});

const UsuarioHabilidad = mongoose.model("UsuarioHabilidad", UsuarioHabilidadSchema, "habilidad_usuario");

// Definir el modelo para intereses de usuario
const UsuarioInteresSchema = new mongoose.Schema({
  usuarioEmail: String,
  interesId: mongoose.Schema.Types.ObjectId,
});

const UsuarioInteres = mongoose.model("UsuarioInteres", UsuarioInteresSchema, "interes_usuario");

const mensajeSchema = new mongoose.Schema({
  emisor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  receptor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  contenido: String,
  fecha: { type: Date, default: Date.now },
});

const Mensaje = mongoose.model('Mensaje', mensajeSchema);

const reservaSchema = new mongoose.Schema({
  fecha: { type: Date, required: true },
  nombreReserva: { type: String, required: true },
  telefonoContacto: { type: String, required: true },
  servicioInteres: { type: String, required: true },
  servicioOfrecido: { type: String, required: true },
  notas: { type: String },
  tipo: { type: String, enum: ['Presencial', 'Virtual'], required: true },
  estado: { type: String},
  usuarioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  usuarioReservaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

app.post("/api/save-data",  async (req, res) => {
  // Obtener datos del cuerpo de la solicitud
  const { intereses, habilidades, usuario, ubicacion } = req.body;
  
  try {
    // Guardar habilidades seleccionadas en la base de datos
    await UsuarioHabilidad.deleteMany({  usuarioEmail: usuario }); // Eliminar habilidades antiguas
    await UsuarioHabilidad.create(habilidades.map((habilidad) => ({ usuarioEmail: usuario, habilidadId: habilidad._id })));

    // Guardar intereses seleccionados en la base de datos
    await UsuarioInteres.deleteMany({ usuarioEmail: usuario }); // Eliminar intereses antiguos
    await UsuarioInteres.create(intereses.map((interes) => ({ usuarioEmail: usuario, interesId: interes._id })));

    await Usuario.findOneAndUpdate(
      { email: usuario },
      { ubicacion: ubicacion },
      { new: true, upsert: true }
    );

    // Enviar una respuesta al cliente
    res.json({
      message: "Datos guardados exitosamente",
    });
  } catch (error) {
    console.error("Error al guardar datos:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

app.post('/api/reservas/crear', async (req, res) => {

  console.log('Solicitud POST recibida en /api/reservas/crear', req.body);
  try {
    const {
      fecha,
      nombreReserva,
      telefonoContacto,
      servicioInteres,
      servicioOfrecido,
      notas,
      tipo,
      estado,
      usuarioId,
      usuarioReservaId,
    } = req.body;

    const nuevaReserva = new Reserva({
      fecha,
      nombreReserva,
      telefonoContacto,
      servicioInteres,
      servicioOfrecido,
      notas,
      tipo,
      estado,
      usuarioId,
      usuarioReservaId,
    });

    await nuevaReserva.save();

    res.status(201).json({ mensaje: 'Reserva creada exitosamente' });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.get("/api/habilidades-usuario", async (req, res) => {
  try {
    const usuarioId = req.query.usuario; // Cambiado de req.body.usuario a req.query.usuario
    const habilidadesUsuario = await UsuarioHabilidad.find({ usuarioEmail:usuarioId }).populate("habilidadId", "nombre");
    res.json(habilidadesUsuario.map((uh) => uh.habilidadId));
  } catch (error) {
    console.error("Error al obtener habilidades del usuario:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});
  

// Rutas para obtener habilidades
app.get("/api/habilidades", async (req, res) => {
  try {
    const habilidades = await Habilidad.find();
    res.json(habilidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener habilidades" });
  }
});

app.get("/api/habilidades/:habilidadId", async (req, res) => {
  try {
    const { habilidadId } = req.params;

    // Verifica si interesId es un ObjectId válido antes de hacer la consulta
    if (!mongoose.isValidObjectId(habilidadId)) {
      return res.status(400).json({ error: "ID de habilidad inválido" });
    }

    const habilidad = await Habilidad.findById(habilidadId);

    if (!habilidad) {
      return res.status(404).json({ error: "Habilidad no encontrado" });
    }

    res.json(habilidad);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el habilidad" });
  }
});
// Rutas para obtener intereses
app.get("/api/intereses", async (req, res) => {
  try {
    const intereses = await Interes.find();
    res.json(intereses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener intereses" });
  }
});

app.get("/api/intereses/:interesId", async (req, res) => {
  try {
    const { interesId } = req.params;

    // Verifica si interesId es un ObjectId válido antes de hacer la consulta
    if (!mongoose.isValidObjectId(interesId)) {
      return res.status(400).json({ error: "ID de interés inválido" });
    }

    const interes = await Interes.findById(interesId);

    if (!interes) {
      return res.status(404).json({ error: "Interés no encontrado" });
    }

    res.json(interes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el interés" });
  }
});


app.get("/api/intereses-usuario", async (req, res) => {
  try {
    const usuarioId = req.query.usuario;
    const interesesUsuario = await UsuarioInteres.find({ usuarioEmail:usuarioId }).populate("interesId", "nombre");
    res.json(interesesUsuario.map((ui) => ui.interesId));
  } catch (error) {
    console.error("Error al obtener intereses del usuario:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

app.get("/api/usuarios", async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.get("/api/reservas", async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
});

app.get("/api/ubicacion-usuario", async (req, res) => {
  try {
    const usuarioId = req.query.usuario; // ID del usuario autenticado
    const ubicacionUsuario = await Usuario.find({ email:usuarioId }).populate("email", "ubicacion");
    res.json(ubicacionUsuario.map((ui) => ui.ubicacion));
  } catch (error) {
    console.error("Error al obtener intereses del usuario:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

app.get("/api/usuarios/:id", async (req, res) => {
  try {
    const usuarioId = req.params.id;
    const usuario = await Usuario.findById(usuarioId);
    
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const detallesUsuario = {
      id: usuario._id,
      email: usuario.email,
    };

    res.json(detallesUsuario);
  } catch (error) {
    console.error("Error al obtener detalles del usuario:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});

app.get("/api/usuariosBymail/:email", async (req, res) => {
  try {
    const usuarioEmail = req.params.email;
    const usuario = await Usuario.findOne({email:usuarioEmail});
    
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    const detallesUsuario = {
      id: usuario._id,
      email: usuario.email,
    };

    res.json(detallesUsuario);
  } catch (error) {
    console.error("Error al obtener detalles del usuario:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
});


app.get('/api/mensajes/:usuarioId1/:usuarioId2', async (req, res) => {
  try {
    const { usuarioId1, usuarioId2 } = req.params;
    const mensajes = await Mensaje.find({
      $or: [
        { emisor: usuarioId1, receptor: usuarioId2 },
        { emisor: usuarioId2, receptor: usuarioId1 },
      ],
    })
    .populate('emisor', 'email') // Ajusta según los campos que quieras mostrar del usuario
    .sort({ fecha: 1 });
    res.json(mensajes);
  } catch (error) {
    console.log('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.post('/api/mensajes', async (req, res) => {
  try {
    const { emisor, receptor, contenido } = req.body;
    // Obtener los IDs de los usuarios a partir de sus correos electrónicos
    const emisorUsuario = await Usuario.findOne({ email: emisor.email });
    const receptorUsuario = await Usuario.findOne({ email: receptor.email });
    

    if (!emisorUsuario || !receptorUsuario) {
      res.status(400).json({ error: 'Uno o ambos usuarios no existen' });
      return;
    }

    // Crear el nuevo mensaje con los IDs de los usuarios
    const nuevoMensaje = new Mensaje({
      emisor: emisorUsuario._id,
      receptor: receptorUsuario._id,
      contenido,
    });

    await nuevoMensaje.save();

    res.json(nuevoMensaje);
  } catch (error) {
    console.log('Error al enviar mensaje:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

