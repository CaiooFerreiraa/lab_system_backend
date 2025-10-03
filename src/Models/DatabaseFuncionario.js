import dataBase from '../../bd.js'

export default class DatabaseFuncionario {
  async createEmployee(employeeData) {
    await this.#insertEmployee(employeeData);
    await this.#insertPhoneNumberInEmployee(employeeData);
  }

  async #insertEmployee(employeeData) {
    try {
      await dataBase`insert into funcionario(matricula, turno, nome, sobrenome) values (
      ${employeeData.registration}, ${employeeData.shift}, ${employeeData.name}, ${employeeData.lastName})
      `;
    } catch (error) {
      console.log(error);
    }
  }

  async #insertPhoneNumberInEmployee({ registration, phoneNumber }) {
    try {
      await dataBase`insert into telefone(matricula, telefone) values (
        ${registration}, ${phoneNumber})
      `;
    } catch (error) {
      console.log(error);
    }
  }

  readEmployees() {

  }

  updateEmployee() {

  }

  deleteEmployee() {

  }
}
