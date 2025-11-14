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

  search(req, res) {

  }

  edit(req, res) {

  }

  delete(req, res) {

  }
}
