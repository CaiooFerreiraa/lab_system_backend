import dataBase from '../../bd.js'

class DataBase {
  async registrarFuncionario(matricula, nome, sobrenome, turno, telefone) {
    try {
      await dataBase`insert into funcionario (matricula, nome, sobrenome, turno, fk_telefone_telefone_PK) values(
        ${matricula}, ${nome}, ${sobrenome}, ${turno}, ${telefone}
      )`;
      console.log(200);
    } catch (error) {
      console.log(404);
      console.error(error);
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