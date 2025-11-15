import ProductFacade from "../Facades/ProductFacade.js"
import fakeProduct from "../Models/fakeProduct.js"

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
      const uuid  = req.params.uuid;
      const material = await this.productReporitory.search(uuid);
      res.json({status: 200, material});
    } catch (error) {
      res.json({status: 400, msg: error.message});
    }
  }

  edit(req, res) {

  }

  delete(req, res) {

  }
}
