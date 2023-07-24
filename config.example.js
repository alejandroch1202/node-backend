module.exports = {
    api: {
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET || "YOUR_SECRET",
    }
};
