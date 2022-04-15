const mongoose = require('mongoose');

module.exports = async () => {
  const URI = 'mongodb://127.0.0.1:27017/oidc' ?? '';
  try {
    return mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('Connected to MongoDB');
      }
    );
  } catch (error) {
    console.error(error);
  }
};
