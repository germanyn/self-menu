import { getModelForClass } from "@typegoose/typegoose";
import { Categoria } from "./categoria/Categoria";
import { Conta } from "./conta/Conta";
import { Loja } from "./loja/Loja";
import { Produto } from "./produto/Produto";
import { Usuario } from "./usuario/Usuario";

export const ProdutoModel = getModelForClass(Produto);
export const LojaModel = getModelForClass(Loja);
export const ContaModel = getModelForClass(Conta, {
    schemaOptions: {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        }
    }
});
export const UsuarioModel = getModelForClass(Usuario);
export const CategoriaModel = getModelForClass(Categoria);
