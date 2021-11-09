import knex from 'knex';

import { join } from 'path';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfig = require(join(__dirname, '..', 'knexfile.js'));

export default knex(dbConfig[process.env.NODE_ENV || 'development']);
