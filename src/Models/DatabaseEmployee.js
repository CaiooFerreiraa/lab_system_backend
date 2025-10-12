import dataBase from '../../bd.js'

const identifierDatabase = 'lab_system.'

export default class DatabaseEmployee {
  async createEmployee(employeeData) {
    await this.#insertEmployee(employeeData);
    await this.#insertPhoneNumberInEmployee(employeeData);
  }
  
  async #insertEmployee(employeeData) {
    try {
      await dataBase`INSERT INTO ${identifierDatabase}funcionario(matricula, turno, nome, sobrenome) VALUES (
      ${employeeData.registration}, ${employeeData.shift}, ${employeeData.name}, ${employeeData.lastName})
      `;
    } catch (error) {
      throw error;
    }
  }

  async #insertPhoneNumberInEmployee({ registration, phoneNumber }) {
    try {
      await dataBase`INSERT INTO ${identifierDatabase}telefone(telefone, fk_funcionario_matricula) VALUES (
        ${phoneNumber}, ${registration})
      `;
    } catch (error) {
      throw error;
    }
  }

  async readEmployees() {
    try {
      return await dataBase`SELECT * FROM ${identifierDatabase}funcionario f JOIN ${identifierDatabase}telefone t ON t.fk_funcionario_matricula = f.matricula`
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
        UPDATE ${identifierDatabase}funcionario
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
        UPDATE ${identifierDatabase}telefone
        SET telefone = ${phoneNumber}
        WHERE fk_funcionario_matricula = ${registration}
      `;
    } catch (error) {
     throw error;
    }
  }

  async deleteEmployee({registration}) {
      await dataBase`
        DELETE FROM ${identifierDatabase}funcionario
        WHERE matricula = ${registration}
      `;  
  }
}
