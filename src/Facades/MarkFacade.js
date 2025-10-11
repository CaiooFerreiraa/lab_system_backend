export default class MarkFacade {
  static checkData(markData) {
    try {
      this.#isValidNameMark(markData);
    } catch (error) {
      throw error;
    }
  }

  static #isValidNameMark({name}) {
    if (name == null) throw new TypeError("O nome da marca está nulo");
    if (typeof(name) != 'string') throw new TypeError("O nome da marca não é uma string");
  }
}