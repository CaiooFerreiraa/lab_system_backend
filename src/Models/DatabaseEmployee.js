import IDatabase from '../Interfaces/IDatabase.js';

export default class DatabaseEmployee extends IDatabase {
  constructor(db) {
    super(db)
  }

  async register(employeeData) {
    await this.#insertEmployee(employeeData);
    await this.#insertPhoneNumberInEmployee(employeeData);
  }
  
  async #insertEmployee(employeeData) {
    try {
      await this.db`
        INSERT INTO lab_system.funcionario(matricula, turno, nome, sobrenome) 
        VALUES (${employeeData.registration}, ${employeeData.shift}, ${employeeData.name}, ${employeeData.lastName})
      `;
    } catch (err) {
      throw new Error("Matrícula já existente");
    }
  }

  async #insertPhoneNumberInEmployee({ registration, phoneNumber }) {
    try {
      await this.db`
        INSERT INTO lab_system.telefone(telefone, fk_funcionario_matricula) 
        VALUES (${phoneNumber}, ${registration})
      `;
    } catch (error) {
      throw error;
    }
  }

  async readAll() {
    try {
      let employeeData = await this.db`
        SELECT nome, sobrenome, matricula, turno, telefone 
        FROM lab_system.funcionario f 
        JOIN lab_system.telefone t ON t.fk_funcionario_matricula = f.matricula
      `;

      return employeeData;
    } catch (error) {
      throw error;
    }
  }

  async edit(employeeData) {
    await this.#updateEmployeeData(employeeData);
    await this.#updatePhoneNumberEmployee(employeeData);
  }

  async #updateEmployeeData(employeeData) {
    try {
      await this.db`
        UPDATE lab_system.funcionario
        SET turno = ${employeeData.shift}, nome = ${employeeData.name}, sobrenome = ${employeeData.lastName}
        WHERE matricula = ${employeeData.registration}
      `;  
    } catch (error) {
     throw new Error("Matricula não encontrada");
    }
  }
  
  async #updatePhoneNumberEmployee({registration, phoneNumber}) {
    try {
      await this.db`
        UPDATE lab_system.telefone
        SET telefone = ${phoneNumber}
        WHERE fk_funcionario_matricula = ${registration}
      `;
    } catch (error) {
     throw new Error("Matricula não encontrada");
    }
  }

  async delete(registration) {
    try {
      await this.db`
        DELETE FROM lab_system.funcionario
        WHERE matricula = ${registration}
      `;  
    } catch (error) {
      throw new Error("Funcionário não encontrado");
    }
  }

  async getEmployee(registration) {
    try {
      let employeeData = await this.db`
        SELECT nome, sobrenome, matricula, turno, telefone 
        FROM lab_system.funcionario f 
        JOIN lab_system.telefone t ON t.fk_funcionario_matricula = f.matricula
        WHERE f.matricula = ${registration}
      `;

      return employeeData[0]
    } catch (error) {
      throw new Error("Matrícula não encontrada")
    }
  }
}
