import MarkFacade from "../Facades/MarkFacade.js"

export default class MarkController {
  constructor(markRepository) {
    this.markRepository = markRepository;
  }

  async insertMark(req, res) {
    try {
      MarkFacade.checkData(req.body);
      await this.markRepository.createMark(req.body);
      res.sendStatus(200);
    } catch (error) {
      console.error(error)
      res.sendStatus(400);
    }
  }

  async viewMarks(req, res) {
    try {
      const marks = await this.markRepository.readMark();
      const formatedMarks = MarkFacade.formatedMark(marks)
      res.send(formatedMarks);
    } catch (error) {
      res.sendStatus(404);
    }
  }

  async updateMark(req, res) {
    try {
      MarkFacade.checkData(req.body);
      const mark = MarkFacade.filterMethods(req.body);
      await this.markRepository.updateMark(mark);
      res.sendStatus(200);
    } catch (error) {
      console.error(error)
      res.sendStatus(400);
    } 
  }

  async getMark(req, res) {
    try {
      const { name } = req.params
      const mark = await this.markRepository.viewMarkForName(name);
      const formatedMark = MarkFacade.formatedMark(mark)
      res.send(formatedMark);
    } catch (error) {
      res.sendStatus(404)
    }
  }

  async deleteMark(req, res) {
    try {
      const { name: marca } = req.params
      await this.markRepository.deleteMark(marca);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  }

  async deleteMethod(req, res) {
    try {
      const { id } = req.params
      await this.markRepository.deleteMethod(id);
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(404);
    }
  }
}
