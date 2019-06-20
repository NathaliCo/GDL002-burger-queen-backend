exports.port = process.argv[2] || process.env.PORT || 8080;
exports.mongoUrl = process.env.MONGO_URL || 'mongodb+srv://bq:burgerqueen@burgerqueen-keqsp.mongodb.net/test?retryWrites=true&w=majority';

exports.secret = process.env.JWT_SECRET || 'xxxxxxxx'; // JWT secret
exports.adminEmail = process.env.ADMIN_EMAIL || 'admin@localhost';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';
//exports.environment = process.env.NODE_ENV || 'dev';

// let urlDB;
// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/default';
// } else {
//     urlDB = 'mongodb+srv://bq:burgerqueen@burgerqueen-keqsp.mongodb.net/test'
// }