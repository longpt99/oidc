const express = require('express');
const { Provider } = require('oidc-provider');
const path = require('path');
const { TestAdapter, Account } = require('./apdater');
const { MongoDbAdapter } = require('./db/mongodb');
const connectDb = require('./db/mongodb/connection');
const app = express();

connectDb();
//Middlewares
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const configuration = {
  adapter: MongoDbAdapter,
  clients: [
    {
      client_id: 'oidcCLIENT',
      client_secret: 'Some_super_secret',
      grant_types: ['authorization_code'],
      redirect_uris: [
        'http://localhost:8080/login/callback',
        'https://oidcdebugger.com/debug',
      ],
      response_types: ['code'],

      //other configurations if needed
    },
  ],
  pkce: {
    required: () => false,
  },
  features: {
    registration: {
      enabled: true,
      // initialAccessToken: true
    },
    registrationManagement: {
      enabled: true,
      // rotateRegistrationAccessToken: true,
    },
    // jwtResponseModes: { enabled: true },
  },
};

const oidc = new Provider('http://localhost:3000', configuration);

// Features initialAccessToken: true
// new oidc.InitialAccessToken().save().then(console.log);

// new oidc.RegistrationAccessToken().save().then(console.log);

// app.get('/oidc/client/:id', (req, res) => {
//   const adapter = TestAdapter.for('Client');
//   console.log(adapter);
//   adapter.store.set('Client:foobar', {
//     client_id: 'foobar',
//     client_secret: 'foobarbaz',
//     redirect_uris: ['https://client.example.com/cb'],
//   });
//   const client = new oidc.Client.find(req.params.id);
//   console.log(client);
// });

app.use('/oidc', oidc.callback());
// app.post('/oidc/reg');
// app.put('/oidc/reg/:clientId');

app.listen(3000, function () {
  console.log('OIDC is listening on port 3000!');
});
