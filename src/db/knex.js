// const { NODE_ENV } = require('../config');
// const environment = NODE_ENV || 'development';

// const config = require('../../knexfile');
// module.exports = require('knex')(config);

import config from '../../knexfile';
import knex from 'knex';

export default knex(config);