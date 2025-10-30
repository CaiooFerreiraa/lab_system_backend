export default class EmployeeFacade {
  static formatFullName(employeeData) {
    return employeeData.map(element => ({
        nome: `${element.nome} ${element.sobrenome}`,
        matricula: element.matricula,
        turno: element.turno,
        telefone: element.telefone
      }
    ));
  }

  static checkData(employeeData) {
    try {
      this.#isValidRegistration(employeeData);
      this.#isValidFullName(employeeData);
      this.#isValidShift(employeeData);
      this.#isValidPhoneNumber(employeeData);
    } catch (error) {
      throw error;
    }
  }

  static #isValidRegistration({registration}) {
    if (registration == null) throw new Error("A matrícula está nula");
    if (typeof registration != "string") throw new Error("Matricula não é uma string");
  }

  static #isValidFullName({name, lastName}) {
    this.#validName(name);
    this.#validLastName(lastName);
  }

  static #validName(name) {
    if (name == null) throw new Error("O nome está nulo");
    if (typeof name != 'string') throw new Error("O nome não é uma string");
  }

  static #validLastName(lastName) {
    if (lastName == null) throw new Error("O sobrenome está nulo");
    if (typeof lastName != 'string') throw new Error("O sobrenome não é uma string");
  }

  static #isValidShift({shift}) {
    const shifts = ["Turno A", "Turno B", "Turno C"];
    if (shift == null) throw new Error("O valor do turno é nulo");
    if (typeof shift != 'string') throw new Error("O turno não é uma string");
    if (!shifts.includes(shift)) throw new Error("O valor do turno é inválido");
  }

  static #isValidPhoneNumber({phoneNumber}) {
    if (phoneNumber == null) throw new Error("O telefone está nulo");
    if (typeof phoneNumber != 'string') throw new Error("O número de telefone não é uma string");
  }
}
