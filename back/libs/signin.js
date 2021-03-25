module.exports = app => {
    app.use('/api/signin', require('../routes/signin.routes'));
}