// import ModelFacade from "../Facades/ModelFacade.js" 
// (descomente quando você criar sua facade)

export default class ModelController {
  constructor(modelRepository) {
    this.modelRepository = modelRepository;
  }

  async register(req, res) {
    try {
      // ModelFacade.checkData(req.body); // se você tiver uma facade
      await this.modelRepository.register(req.body);
      res.json({ status: 200, msg: "Modelo foi registrado com sucesso!" });
    } catch (error) {
      res.json({ status: 400, msg: error.message });
    }
  }

  async search(req, res) {
    try {
      const id = req.params.id;
      const modelo = await this.modelRepository.search(id);
      res.json({ status: 200, modelo });
    } catch (error) {
      res.json({ status: 400, msg: error.message });
    }
  }

  async edit(req, res) {
    try {
      const queryParams = req.query;
      await this.modelRepository.edit(queryParams);
      res.json({ status: 200, msg: "Modelo atualizado com sucesso!" });
    } catch (error) {
      res.json({ status: 400, msg: error.message });
    }
  }

  async delete(req, res) {
    try {
      const queryParams = req.query;
      await this.modelRepository.delete(queryParams);
      res.json({ status: 200, msg: "Modelo deletado com sucesso!" });
    } catch (error) {
      res.json({ status: 400, msg: error.message });
    }
  }

  async readAll(req, res) {
    try {
      const modelos = await this.modelRepository.readAll();
      res.json(modelos);
    } catch (error) {
      res.json({ status: 400, msg: error.message });
    }
  }
}
