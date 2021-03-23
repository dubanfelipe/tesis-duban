module.exports = app => {
    app.use('/api/autenticarusuarios', require('../routes/autenticarusuarios.routes'));
}