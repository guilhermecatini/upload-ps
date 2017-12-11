const mongoose = require('mongoose')
const Schema = mongoose.Schema

const _schema = {
  url: String,
  fileKey: String,
  extension: String
}

const AgendaAcessoSchema = new Schema(_schema, { versionKey: false })
const AgendaAcessoModel = mongoose.model('arquivo', AgendaAcessoSchema)

module.exports = AgendaAcessoModel