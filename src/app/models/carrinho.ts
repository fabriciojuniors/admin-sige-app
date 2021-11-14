import { Cartao } from "./cartao";
import { Eventos } from "./eventos";
import { Usuario } from "./usuario";

export interface Carrinho {
    id: number,
    usuario : Usuario,
    itemCarrinhos: ItemCarrinho[],
    valorTotal : number,
    formaPagamento: FormaPagamento,
    cartao : Cartao,
    statusPagamento : StatusPagamento,
    statusCarrinho : StatusCarrinho
}

export enum FormaPagamento {
    PIX ="PIX",
    CARTAO = "CARTAO",
    GRATIS = "GRATIS"
}

export enum StatusPagamento {
    A = "Aprovado",
    N = "Negado",
    P = "Em processamento",
    S = "Sem dados de pagamento"
}

export enum StatusCarrinho {
    A = "Aberto",
    F = "Fechado"
}

export interface ItemCarrinho {
    id: number,
    ingresso: Ingresso
}

export interface Ingresso {
    id: number,
    evento: Eventos,
    cpf: string,
    nome: string,
    usuario: Usuario,
    statusIngresso: string
}