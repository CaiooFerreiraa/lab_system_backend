// import ModelFacade from "../Facades/ModelFacade.js" 
// (descomente quando você criar sua facade)

export default class ModelController {
  constructor(modelRepository) {
    this.modelRepository = modelRepository;
  }

  async register(req, res) {
    try {
      const { nome, tipo, marca, especificacoes } = req.body;

      if (!Array.isArray(especificacoes) || especificacoes.length === 0)
        throw new Error("É necessário enviar pelo menos uma especificação");

      await this.modelRepository.register({ nome, tipo, marca, especificacoes });

      res.json({ ok: 200, msg: "Modelo registrado com sucesso!" });
    } catch (error) {
      res.json({ ok: 400, msg: error.message });
    }
  }

  async search(req, res) {
    try {
      const id = req.params.uuid;
      const modelo = await this.modelRepository.search(id);
      res.json({ ok: 200, modelo });
    } catch (error) {
      res.json({ ok: 400, msg: error.message });
    }
  }

  async edit(req, res) {
    try {
      const id = req.params.id;
      const data = req.body;

      await this.modelRepository.edit({ id, ...data });

      res.json({ ok: 200, msg: "Modelo atualizado com sucesso!" });

    } catch (error) {
      res.json({ ok: 400, msg: error.message });
    }
  }

  async delete(req, res) {
    try {
      const queryParams = req.query;
      await this.modelRepository.delete(queryParams);
      res.json({ ok: 200, msg: "Modelo deletado com sucesso!" });
    } catch (error) {
      res.json({ ok: 400, msg: error.message });
    }
  }

  async readAll(req, res) {
    try {
      const modelos = await this.modelRepository.readAll();
      res.json({ok: 200, modelos});
    } catch (error) {
      res.json({ ok: 400, msg: error.message });
    }
  }
}
