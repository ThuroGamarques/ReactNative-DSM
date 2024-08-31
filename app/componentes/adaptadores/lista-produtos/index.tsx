import { ScrollView, View } from "react-native";
import ItemProduto from "../item-produto";
import style from "@/app/style/default";
import Produto from "@/app/models/produto";
import React from "react";

interface PropList
{
    produtos: Produto[];
}

type produto = {
    id: number;
    nome: string;
    preco: number;
};

const ListaProdutos:React.FC<PropList> = ({produtos}) =>
{
    return (
        <ScrollView>
            <View style={style.container}>
                {produtos.map((p) => (
                    <ItemProduto produto={p} key={p.id} />
                ))}
            </View>
        </ScrollView>
    );
}

export default ListaProdutos;