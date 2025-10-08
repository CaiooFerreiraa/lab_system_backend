import dataBase from '../../bd.js'

export default class DatabaseEmployee {
  async createEmployee(employeeData) {
    await this.#insertEmployee(employeeData);
    await this.#insertPhoneNumberInEmployee(employeeData);
  }
  
  async #insertEmployee(employeeData) {
    try {
      await dataBase`INSERT INTO funcionario(matricula, turno, nome, sobrenome) VALUES (
      ${employeeData.registration}, ${employeeData.shift}, ${employeeData.name}, ${employeeData.lastName})
      `;
    } catch (error) {
      throw error;
    }
  }

  async #insertPhoneNumberInEmployee({ registration, phoneNumber }) {
    try {
      await dataBase`INSERT INTO telefone(matricula, telefone) VALUES (
        ${registration}, ${phoneNumber})
      `;
    } catch (error) {
      throw error;
    }
  }

  async readEmployees() {
    try {
      return await dataBase`SELECT * FROM funcionario f JOIN telefone t ON t.matricula = f.matricula`
    } catch (error) {
      throw error;
    }
  }

  async updateEmployeeAndPhoneNumber(employeeData) {
    await this.#updateEmployeeData(employeeData);
    await this.#updatePhoneNumberEmployee(employeeData);
  }

  async #updateEmployeeData(employeeData) {
    try {
      await dataBase`
        UPDATE funcionario
        SET turno = ${employeeData.shift}, nome = ${employeeData.name}, sobrenome = ${employeeData.lastName}
        WHERE matricula = ${employeeData.registration}
      `;  
    } catch (error) {
     throw error;
    }
  }
  
  async #updatePhoneNumberEmployee({registration, phoneNumber}) {
    try {
      await dataBase`
        UPDATE telefone
        SET telefone = ${phoneNumber}
        WHERE matricula = ${registration}
      `;
    } catch (error) {
     throw error;
    }
  }

  async deleteEmployee({registration}) {
      await dataBase`
        DELETE FROM funcionario
        WHERE matricula = ${registration}
      `;  
  }
}
