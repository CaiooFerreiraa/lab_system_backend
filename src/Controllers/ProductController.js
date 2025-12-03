import ProductFacade from "../Facades/ProductFacade.js"

export default class ProductController {
  constructor(productReporitory) {
    this.productReporitory = productReporitory
  }

  async register(req, res) {
    try {
      ProductFacade.checkData(req.body);
      await this.productReporitory.register(req.body)
      res.json({status: 200, msg: "Material foi registrado com sucesso!"})
    } catch (error) {
      res.json({status: 400, msg: error.message})
    }
  }

  async search(req, res) {
    try {
      const { uuid }  = req.query;
      const material = await this.productReporitory.search(uuid);
      res.json({status: 200, material});
    } catch (error) {
      res.json({status: 400, msg: error.message});
    }
  }

  async edit(req, res) {
    try {
      const queryParams = req.query;
      await this.productReporitory.edit(queryParams);
      res.json({status: 200, msg: "Produto atualizado com sucesso"});
    } catch (error) {
      res.json({status: 400, msg: error.message});
    }
  }

  async delete(req, res) {
    try {
      const queryParams = req.query;
      await this.productReporitory.delete(queryParams);
      res.json({status: 200, msg: "Produto deletado com sucesso"});
    } catch (error) {
      res.json({status: 400, msg: error.message});  
    }
  }

  async readAll(req, res) {
    try {
      const materiais = await this.productReporitory.readAll();
      res.json(materiais);
    } catch (error) {
      res.json({status: 400, msg: error.message});
    }
  }

  async readProducts(req, res) {
    try {
      const {setor} = req.queryParams
      const materiais = await this.productReporitory.list();
      res.json(materiais)
    } catch (error) {
      res.json({status: 400, msg: error.message});
    }
  }
}
