export default class ProductFacade {
  static checkData(data) {
    this.#codeIsValid(data);
    this.#typeIsValid(data);  
  }

  static #codeIsValid({referencia}) {
    if (referencia === null) throw new Error("O código está nulo");
    if (typeof referencia !== 'string') throw new Error("O codigo não é uma string"); 
  }

  static #typeIsValid({tipo}) {
    const arrayOfType = ["BN", 'DN', 'Base']

    if (tipo === null) throw new Error("O tipo está nulo");
    if (!arrayOfType.includes(tipo)) throw new Error("O tipo é inválido");
  }
}