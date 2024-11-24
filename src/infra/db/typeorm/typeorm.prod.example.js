const { resolve } = require('path');

module.exports = {
  type: '',
  host: '',
  database: '',
  synchronize: false,
  port: 5433,
  username: '',
  password: '',
  entities: [resolve(__dirname, 'entities/*.entity-typeorm.js')]
};
