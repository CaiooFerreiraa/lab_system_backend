export default class SectorController {
  constructor(sectorRepository) {
    this.sectorRepository = sectorRepository;
  }

  async register(req, res) {
    try {
      await this.sectorRepository.register(req.body)
      res.json({ok: 200, msg: "Setor registrado com sucesso!"})
    } catch (error) {
      res.json({ok: 400, msg: error.message})
    }
  }

  async search(req, res) {
    try {
      const setor = await this.sectorRepository.search(req.query.nome)
      res.json({ok: 200, setor});
    } catch (error) {
      res.json({ok: 404});
    }
  }

  async edit(req, res) {
    try {
      const oldName = req.query.oldName;
      const newName = req.query.newName;
      await this.sectorRepository.edit(oldName, newName);

      res.json({ok: 200, msg: "Cadastrado com sucesso"});
    } catch (error) {
      res.json({ok: 400, msg: error.message})
    }
  }

  async delete(req, res) {
    try {
      const { nome } = req.query;
      await this.sectorRepository.delete(nome);
      res.json({ok: 200, msg: "Setor deletado com sucesso!"})
    } catch (error) {
      res.json({ok: 400, msg: error.message})
    }
  }

  async readAll(req, res) {
    try {
      const setores = await this.sectorRepository.readAll()
      res.json({ok: 200, setores})
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async list(req, res) {
    try {
      const setor = await this.sectorRepository.searchMateriaisInSetor(req.query.uuid)
      res.json({ok: 200, setor});
    } catch (error) {
      res.json({ok: 404});
    }
  }
}