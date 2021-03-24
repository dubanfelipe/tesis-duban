module.exports = app => {
    app.use('/api/email', require('../routes/email.routes'));
}