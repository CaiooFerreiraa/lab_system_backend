export default class ProductFacade {
  static checkData(data) {
    this.#codeIsValid(data);
    this.#typeIsValid(data);  
  }

  static #codeIsValid({code}) {
    if (code === null) throw new Error("O código está nulo");
    if (typeof code !== 'string') throw new Error("O codigo não é uma string"); 
  }

  static #typeIsValid({type}) {
    const arrayOfType = ["BN", 'DN', 'Base']

    if (type === null) throw new Error("O tipo está nulo");
    if (!arrayOfType.includes(type)) throw new Error("O tipo é inválido");
  }
}