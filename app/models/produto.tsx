enum ctgr
{
    "ração",
    "brinquedo"
}

export default interface Produto
{
    nome:string,
    descricao:string,
    foto:string,
    preco:number,
    categoria:ctgr
}