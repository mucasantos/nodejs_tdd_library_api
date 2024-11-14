/**
 * @description: Atenção! Esta classe nao deve ser instanciada diretamente! user um dos métodos Left ou Right
 */

module.exports = class Either {
  constructor(left, right) {
    this.right = right;
    this.left = left;
  }

  static Left(left) {
    return new Either(left, null);
  }

  static Right(right) {
    return new Either(null, right);
  }

  static valueAlreadyRegister(value) {
    return { message: `${value} já cadastrado` };
  }
};
