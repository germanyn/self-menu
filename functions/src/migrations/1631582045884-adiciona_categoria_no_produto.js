// @ts-check
const { CategoriaModel, ProdutoModel } = require("../modulos/models");
const { criarConexaoComBanco } = require('../infraestrutura/database')

/**
 * Make any changes you need to make to the database here
 */
async function up () {
  await criarConexaoComBanco()
  await CategoriaModel
    .find()
    .cursor()
    .eachAsync(async categoria => {
      const produtos = await ProdutoModel.updateMany({
        _id: {
          $in: categoria.produtos,
        },
      }, {
        categoria: categoria._id,
      })
      console.log('')
    })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
async function down () {
  // Write migration here
}

module.exports = { up, down };
