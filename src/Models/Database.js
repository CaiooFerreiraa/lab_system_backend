import dataBase from '../../bd.js'

class DataBase {
  async registrarFuncionario(dataFuncionario) {
    await this.insertFuncionario(dataFuncionario);
    await this.insertTelefone(dataFuncionario);
  }

  async insertFuncionario(dataFuncionario) {
    try {
      await dataBase`insert into funcionario(matricula, turno, nome, sobrenome) values (
      ${dataFuncionario.matricula}, ${dataFuncionario.turno}, ${dataFuncionario.nome}, ${dataFuncionario.sobrenome})
      `;
    } catch (error) {
      console.log(error);
    }
  }

  async insertTelefone({ matricula, telefone }) {
    try {
      await dataBase`insert into telefone(matricula, telefone) values (
        ${matricula}, ${telefone})
      `;
    } catch (error) {
      console.log(error);
    }
  }

  editarFuncionario() {

  }

  deletarFuncionario() {

  }

  registarMarca() {

  }

  editarMarca() {

  }

  deletarMarca() {

  }
}

export default DataBase;