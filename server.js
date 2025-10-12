const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB Atlas
const uri = "mongodb+srv://kuarakiva9_db_user:E59kKobXCNkgZyjr@cluster0.j9kwjg4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Esquema y modelo
const FormularioSchema = new mongoose.Schema({
  sleepHours: String,
  sleepQuality: String,
  academicAverage: String,
  bedtimeRoutine: String,
  deviceUsage: String,
  bedtime: String,
  fechaRegistro: { type: Date, default: Date.now }
});
const Formulario = mongoose.model("Formulario", FormularioSchema);

// 🟢 Rutas API
app.get("/api/test", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

app.post("/api/registrar", async (req, res) => {
  try {
    const nuevoRegistro = new Formulario(req.body);
    await nuevoRegistro.save();
    console.log("✅ Nuevo formulario guardado:", req.body);
    res.json({ mensaje: "✅ Datos guardados correctamente en MongoDB" });
  } catch (error) {
    console.error("❌ Error al guardar en MongoDB:", error);
    res.status(500).json({ error: "Error al guardar los datos" });
  }
});

// Servir frontend
app.use(express.static(path.join(__dirname, "dream-glow-form", "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dream-glow-form", "dist", "index.html"));
});

// Iniciar servidor
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
