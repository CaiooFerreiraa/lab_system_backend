import EmployeeFacade from "../Facades/EmployeeFacade.js"

export default class EmployeeController {
  constructor(employeeRepository) {
    this.employeeRepository = employeeRepository;
  }

  async registerEmployee(req, res) {
    try {
      console.log(req.body)
      EmployeeFacade.checkData(req.body);
      await this.employeeRepository.createEmployee(req.body);
      res.sendStatus(200);
    } catch (err) {
      console.error("Erro ao criar funcionário:", err);
      res.sendStatus(400);
    }
  };

  async viewsAllEmployee(req, res) {
    try {
      const readsEmployees = await this.employeeRepository.readEmployees();
      const dataEmployees = EmployeeFacade.formatFullName(readsEmployees);
      res.json(dataEmployees);
    } catch (err) {
      console.error("Erro ao ler funcionário:", err);
      res.sendStatus(404);
    }
  };

  async viewEmployee(req, res) {
    try {
      const { registration } = req.params
      const readsEmployees = await this.employeeRepository.getEmployee(registration);
      res.json(readsEmployees);
    } catch (err) {
      console.error("Erro ao ler funcionário:", err);
      res.sendStatus(404);
    }
  };

  async updateEmployee(req, res) {
    try {
      EmployeeFacade.checkData(req.body);
      await this.employeeRepository.updateEmployeeAndPhoneNumber(req.body);
      res.sendStatus(200);
    } catch (error) {;
      console.error("Erro ao atualizar funcionário:", error);
      res.sendStatus(400);
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { registration } = req.params
      await this.employeeRepository.deleteEmployee(registration);
      res.sendStatus(200);
    } catch (error) {
      console.error("Erro ao deletar funcionário:", err);
      res.sendStatus(404);
    }
  }
}