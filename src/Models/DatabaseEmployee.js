import dataBase from '../../bd.js'
import salveInCache from '../Utilities/cache.js';

export default class DatabaseEmployee {
  constructor() {
    this.employeeDataTest;
  }


  async createEmployee(employeeData) {
    await this.#insertEmployee(employeeData);
    await this.#insertPhoneNumberInEmployee(employeeData);
  }
  
  async #insertEmployee(employeeData) {
    try {

      await dataBase`
        INSERT INTO lab_system.funcionario(matricula, turno, nome, sobrenome) 
        VALUES (${employeeData.registration}, ${employeeData.shift}, ${employeeData.name}, ${employeeData.lastName})
      `;
    } catch (error) {
      throw error;
    }
  }

  async #insertPhoneNumberInEmployee({ registration, phoneNumber }) {
    try {
      await dataBase`
        INSERT INTO lab_system.telefone(telefone, fk_funcionario_matricula) 
        VALUES (${phoneNumber}, ${registration})
      `;
    } catch (error) {
      throw error;
    }
  }

  async readEmployees() {
    try {
      if (typeof(this.employeeDataTest) == 'undefined') {
        this.employeeDataTest = await dataBase`
          SELECT nome, sobrenome, matricula, turno, telefone 
          FROM lab_system.funcionario f 
          JOIN lab_system.telefone t ON t.fk_funcionario_matricula = f.matricula
        `;
        salveInCache(this.employeeDataTest);
      } else {
        this.employeeDataTest = salveInCache();
      }

      return this.employeeDataTest;
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
        UPDATE lab_system.funcionario
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
        UPDATE lab_system.telefone
        SET telefone = ${phoneNumber}
        WHERE fk_funcionario_matricula = ${registration}
      `;
    } catch (error) {
     throw error;
    }
  }

  async deleteEmployee({registration}) {
      await dataBase`
        DELETE FROM lab_system.funcionario
        WHERE matricula = ${registration}
      `;  
  }
}
