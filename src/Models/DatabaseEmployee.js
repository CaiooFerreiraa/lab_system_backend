import dataBase from '../../bd.js'

export default class DatabaseEmployee {
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
      throw new Error(error);
    }
  }

  async #insertPhoneNumberInEmployee({ registration, phoneNumber }) {
    try {
      await dataBase`insert into telefone(matricula, telefone) values (
        ${registration}, ${phoneNumber})
      `;
    } catch (error) {
      throw new Error(error);
    }
  }

  async readEmployees() {
    try {
      return await dataBase`select * from funcionario`
    } catch (error) {
      throw new Error(error);
    }
  }

  updateEmployee() {

  }

  deleteEmployee() {
    
  }
}
