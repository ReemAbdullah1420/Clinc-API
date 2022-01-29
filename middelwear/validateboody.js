const validatebody = elementJoi => {
  return async (req, res, next) => {
    try{
    const result = elementJoi.validate(req.body)
    if (result.error) return res.status(400).send(result.error.details[0].message)
    next()}catch (error) {
      return res.status(500).send(error.message)
    }
  }
}
module.exports = validatebody
