module.exports = app =>{
    app.use('/api/estadisticas', require('../routes/estadisticas.routes'));
}