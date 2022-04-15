const mongoose = require('mongoose');

const BaseModelSchema = new mongoose.Schema({
  client_id: { type: String },
  payload: { type: Object },
});

// BaseModelSchema.index(
//   { key: 1, 'payload.kind': 1 },
//   {
//     unique: true,
//   }
// );

// BaseModelSchema.index(
//   { 'payload.uid': 1 },
//   {
//     unique: true,
//     partialFilterExpression: { 'payload.kind': 'Session' },
//   }
// );

// BaseModelSchema.index(
//   { 'payload.grantId': 1 },
//   {
//     unique: true,
//     partialFilterExpression: {
//       'payload.kind': {
//         $in: [
//           'AccessToken',
//           'AuthorizationCode',
//           'RefreshToken',
//           'DeviceCode',
//           'BackchannelAuthenticationRequest',
//         ],
//       },
//     },
//   }
// );

// BaseModelSchema.index(
//   { 'payload.userCode': 1 },
//   {
//     unique: true,
//     partialFilterExpression: { 'payload.kind': 'DeviceCode' },
//   }
// );

// BaseModelSchema.index(
//   { expiresAt: 1 },
//   {
//     expireAfterSeconds: 0,
//   }
// );

const BaseModel = mongoose.model('BaseModel', BaseModelSchema);
module.exports = { BaseModel };
