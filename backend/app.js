require('dotenv').config();
const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const airoutes = require('./routes/ai-routes');
// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())
// Default route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.use('/ai',airoutes);
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
