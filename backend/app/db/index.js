// import package mongoose
const mongoose = require('mongoose');

// import konfigurasi mongodb dari app/config/index.js
const { urlDb } = require('../config');

// connect ke mongodb
mongoose.connect(urlDb);

// simpan koneksi ke constant db
const db = mongoose.connection;

// export db
module.exports = db;