import MarkFacade from "../Facades/MarkFacade.js"

export default class MarkController {
  constructor(markRepository) {
    this.markRepository = markRepository;
  }

  async insertMark(req, res) {
    try {
      MarkFacade.checkData(req.body);
      await this.markRepository.createMark(req.body);
      res.json({ok: 200, msg: "Marca cadastrada com sucesso"});
    } catch (error) {
      res.json({ok: 400, msg: error.message});
    }
  }

  async viewMarks(req, res) {
    try {
      const marks = await this.markRepository.readMark();
      const formatedMarks = MarkFacade.formatedMark(marks)
      res.send(formatedMarks);
    } catch (err) {
      res.json({ok: 404, msg: err.message});
    }
  }

  async updateMark(req, res) {
    try {
      MarkFacade.checkData(req.body);
      const mark = MarkFacade.filterMethods(req.body);
      await this.markRepository.updateMark(mark);
      res.json({ok: 200, msg: "Marca atualizada com sucesso"});
    } catch (err) {
      res.json({ok: 400, msg: err.message});
    } 
  }

  async getMark(req, res) {
    try {
      const { name } = req.params
      const mark = await this.markRepository.viewMarkForName(name);
      const formatedMark = MarkFacade.formatedMark(mark)
      res.send(formatedMark);
    } catch (err) {
      res.json({ok: 404, msg: err.message});
    }
  }

  async deleteMark(req, res) {
    try {
      const { name: marca } = req.params
      await this.markRepository.deleteMark(marca);
      res.json({ok: 200, msg: "Marca deletada com sucesso"});
    } catch (err) {
      res.json({ok: 404, msg: err.message});
    }
  }

  async deleteMethod(req, res) {
    try {
      const { id } = req.params
      await this.markRepository.deleteMethod(id);
      res.json({ok: 200, msg: "Metodo deletado com sucesso"});
    } catch (err) {
      res.json({ok: 404, msg: err.message});
    }
  }
}
