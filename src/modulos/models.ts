import { getModelForClass } from "@typegoose/typegoose";
import { Conta } from "./conta/Conta";
import { Loja } from "./loja/Loja";
import { Produto } from "./produto/Produto";
import { Usuario } from "./usuario/Usuario";

export const ProdutoModel = getModelForClass(Produto);
export const LojaModel = getModelForClass(Loja);
export const ContaModel = getModelForClass(Conta);
export const UsuarioModel = getModelForClass(Usuario);
