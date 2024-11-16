const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Usuario',
  tableName: 'usuarios',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true
    },
    nome_completo: {
      type: 'varchar'
    },
    CPF: {
      type: 'varchar',
      unique: true
    },
    endereceo: {
      type: 'varchar'
    },
    telefone: {
      type: 'varchar'
    },
    email: {
      type: 'varchar',
      unique: true
    }
  }
});
