// @ts-check
const { LojaModel, UsuarioModel } = require("../modulos/models");
const { criarConexaoComBanco } = require('../database')

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  await criarConexaoComBanco()
  await LojaModel
    .find()
    .cursor()
    .eachAsync(async loja => {
      const editores = await UsuarioModel
        .find({ contas: { $in: [loja.conta] }  })
        .select('_id')
      console.log(editores)
      if (!editores.length)
        throw new Error('Erro ao encontrar editores')
      if (!loja.editores || !loja.editores.length)
        loja.editores = editores.map(({ _id }) => _id)
      await loja.save()
    })
}

async function down() {
  await criarConexaoComBanco()
  await LojaModel
    .find()
    .cursor()
    .eachAsync(async loja => {
      loja.editores = []
      await loja.save()
    })

}

module.exports = { up, down };
