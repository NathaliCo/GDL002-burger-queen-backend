const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');

//Import secrets from config 
const { port, mongoUrl, secret } = config;
const app = express();

// Conectar aplicación a MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true });

app.set('config', config);
app.set('pkg', pkg);


app.use(express.json());
app.use(authMiddleware(secret));


// Registrar rutas
routes(app, (err) => {
    if (err) {
        throw err;
    }

    // Registro de "middleware" que maneja posibles errores
    app.use(errorHandler);

    app.listen(port, () => console.log(`App listening on port ${port}`));
});

//new code

app.use(require('./routes/Products'));
app.use(require('./routes/Orders'));