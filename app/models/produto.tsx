enum ctgr
{
    "ração",
    "brinquedo"
}

export default interface Produto
{
    id:number,
    nome:string,
    descricao:string,
    foto:string,
    preco:number,
    categoria:ctgr
}