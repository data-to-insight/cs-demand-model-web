const express = require('express');

module.exports = function(app) {
    if (process.env.PYTHON_DIST) {
        console.log("Configuring /bin to point at", process.env.PYTHON_DIST);
        app.use('/bin', express.static(process.env.PYTHON_DIST));
    }
};