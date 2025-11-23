import EmployeeFacade from "../Facades/EmployeeFacade.js"

export default class EmployeeController {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async registerEmployee(req, res) {
    try {
      EmployeeFacade.checkData(req.body);
      await this.employeeRepository.register(req.body);
      res.json({ok: 200, msg: "Funcionário cadastrado com sucesso"});
    } catch (err) {
      res.json({ok: 400, msg: err.message});
    }
  };

  async viewsAllEmployee(req, res) {
    try {
      const readsEmployees = await this.employeeRepository.readAll();
      const dataEmployees = EmployeeFacade.formatFullName(readsEmployees);
      res.json(dataEmployees);
    } catch (err) {
      res.json({ok: 404, msg: err.message});
    }
  };

  async viewEmployee(req, res) {
    try {
      const { registration } = req.params
      const readsEmployees = await this.employeeRepository.getEmployee(registration);
      res.json(readsEmployees);
    } catch (err) {
      res.json({ok: 404, msg: err.message});
    }
  };

  async updateEmployee(req, res) {
    try {
      EmployeeFacade.checkData(req.body);
      await this.employeeRepository.edit(req.body);
      res.json({ok: 200, msg: "Funcionário atualizado com sucesso"});
    } catch (error) {;
      res.json({ok: 400, msg: err.message});
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { registration } = req.params
      await this.employeeRepository.delete(registration);
      res.json({ok: 200, msg: "Funcionário deletado com sucesso"});
    } catch (error) {
      res.json({ok: 404, msg: err.message});
    }
  }
}