import { getModelForClass } from "@typegoose/typegoose";
import { Document, SchemaTimestampsConfig } from "mongoose";
import type { SoftDeleteModel } from 'mongoose-delete';
import { Categoria } from "./categoria/Categoria";
import { Conta } from "./conta/Conta";
import { Loja } from "./loja/Loja";
import { Produto } from "./produto/Produto";
import { SolicitacaoDeGarcom } from "./solicitacao-de-garcom/SolicitacaoDeGarcom";
import { Usuario } from "./usuario/Usuario";

const defaultTimestamps: SchemaTimestampsConfig = {
    createdAt: 'criadoEm',
    updatedAt: 'atualizadoEm',
}

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
export const SolicitacaoDeGarcomModel = (getModelForClass(SolicitacaoDeGarcom, {
    schemaOptions: {
        timestamps: defaultTimestamps,
        collection: 'solicitacao',
    },
}) as unknown) as SoftDeleteModel<SolicitacaoDeGarcom & Document>;
