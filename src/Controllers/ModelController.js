export default class ModelController {
  constructor(modelRepository) {
    this.modelRepository = modelRepository;
  }

  register(req, res) {
    try {
      res.send("Ola, teste modelo funcionando")
    } catch (error) {
      res.send(error.message)
    }
  }

}