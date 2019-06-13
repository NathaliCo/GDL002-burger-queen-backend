exports.port = process.argv[2] || process.env.PORT || 8080;
exports.mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/default';
exports.secret = process.env.JWT_SECRET || '123456'; // JWT secret
exports.adminEmail = process.env.ADMIN_EMAIL || 'nathaliecortz@hotmail.com';
exports.adminPassword = process.env.ADMIN_PASSWORD || 'changeme';