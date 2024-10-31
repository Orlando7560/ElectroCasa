const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "tu_usuario",
  password: "tu_contraseña",
  database: "ElectroCasa"
});

// Rutas
app.get("/productos", (req, res) => {
  db.query("SELECT * FROM Productos", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/productos/:id", (req, res) => {
  db.query("SELECT * FROM Productos WHERE Id_Producto = ?", [req.params.id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

app.post("/productos", (req, res) => {
  const { name, category, price, description } = req.body;
  db.query("INSERT INTO Productos (Nombre, Id_Categoria, Precio, Descripcion) VALUES (?, ?, ?, ?)", 
    [name, category, price, description], (err, result) => {
      if (err) throw err;
      res.send("Producto agregado.");
  });
});

app.put("/productos/:id", (req, res) => {
  const { name, category, price, description } = req.body;
  db.query("UPDATE Productos SET Nombre = ?, Id_Categoria = ?, Precio = ?, Descripcion = ? WHERE Id_Producto = ?", 
    [name, category, price, description, req.params.id], (err, result) => {
      if (err) throw err;
      res.send("Producto actualizado.");
  });
});

app.delete("/productos/:id", (req, res) => {
  db.query("DELETE FROM Productos WHERE Id_Producto = ?", [req.params.id], (err, result) => {
    if (err) throw err;
    res.send("Producto eliminado.");
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
