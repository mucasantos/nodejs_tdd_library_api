const typeorm = require('typeorm');
const LivroEntityTypeorm = require('./entities/Livro.entity-typeorm');
const EmprestimoEntityTypeorm = require('./entities/Emprestimo.entity-typeorm');

const typeormServer = new typeorm.DataSource({
  type: 'sqlite',
  database: 'db.sqlite',
  synchronize: true,
  dropSchema: true,
  entities: [
    require('./entities/Usuario.entity-typeorm'),
    LivroEntityTypeorm,
    EmprestimoEntityTypeorm
  ]
});

module.exports = { typeormServer };
