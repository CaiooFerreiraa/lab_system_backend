export default class EmployeeFacade {
  static checkData(employeeData) {
    try {
      this.#isValidRegistration(employeeData)
      this.#isValidFullName(employeeData);
      this.#isValidShift(employeeData);
      this.#isValidPhoneNumber(employeeData);
    } catch (error) {
      throw error;
    }
  }

  static #isValidRegistration({registration}) {    
    if (registration == null) throw new TypeError("A matrícula está nula");
    if (typeof(registration) != "string") throw new TypeError("Matricula não é uma string");
  }

  static #isValidFullName({name, lastName}) {
    this.#validName(name);
    this.#validLastName(lastName);
  }

  static #validName(name) {
    if (name == null) throw new TypeError("O nome está nulo");
    if (typeof(name) != 'string') throw new TypeError("O nome não é uma string");
  }

  static #validLastName(lastName) {
    if (lastName == null) throw new TypeError("O sobrenome está nulo");
    if (typeof(lastName) != 'string') throw new TypeError("O sobrenome não é uma string");
  }

  static #isValidShift({shift}) {
    if (shift == null) throw new TypeError("O valor do turno é nulo");
    if (typeof(shift) != 'string') throw new TypeError("O turno não é uma string");
    if (!this.#checkRangeShift(shift)) throw new RangeError("O valor do turno é inválido");
  }

  static #checkRangeShift(shift) {
    const shifts = ["Turno A", "Turno B", "Turno C"];
    return shifts.find(element => shift == element);
  }

  static #isValidPhoneNumber({phoneNumber}) {
    if (phoneNumber == null) throw new TypeError("O telefone está nulo");
    if (typeof(phoneNumber) != 'string') throw new TypeError("O número de telefone não é uma string");
  }
}
