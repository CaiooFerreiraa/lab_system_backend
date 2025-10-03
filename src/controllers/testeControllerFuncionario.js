class Funcionario {
  constructor() {
    
  }

  cadastrarTeste() {
    
  }

  editarTeste() {

  }

  deletarTeste() {

  }
}

const firstSelect = async (req, res) => {
  try {
    const testes = await sql`select status from teste`;
    res.send(testes)
  } catch (error) {
    console.error(error)
    res.sendStatus(404)
  }
}

const selectFuncionario = async (req, res) => {
  try {
    const funcionarios = await sql`select funcionario_json()`
    res.send(funcionarios[0].funcionario_json)
  } catch (error) {
    console.error(error)
    res.sendStatus(404)
  }
}

export default {
  firstSelect,
  selectFuncionario
}