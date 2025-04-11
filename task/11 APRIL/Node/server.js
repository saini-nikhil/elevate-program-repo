const express = require('express');
const app = express();

const loggingMiddleware = (req, res, next) => {
    if (process.env.NODE_ENV !== 'production') {
        const start = Date.now();
        res.on('finish', () => {
            const responseTime = Date.now() - start;
            console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${responseTime}ms`);
        });
    }
    next();
};

app.use(loggingMiddleware);

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/about', (req, res) => {
    res.send('About Us');
});

app.get('/error', (req, res) => {
    throw new Error("Something went wrong!");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send("Something went wrong!");
});

process.env.NODE_ENV = 'development';

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
