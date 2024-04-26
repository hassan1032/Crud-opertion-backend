

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://khanhassan1032:tSSnKGAgwtV5vdWa@cluster0.n8i7gys.mongodb.net/bookManegement', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

app.get('/check-connection', (req, res) => {
  const connected = mongoose.connection.readyState === 1;
  const message = connected ? 'MongoDB is connected' : 'MongoDB is not connected';
  res.send(message);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
