import { ScrollView, View } from "react-native";
import ItemProduto from "../item-produto";
import style from "@/app/style/default";
import Produto from "@/app/models/produto"; // Certificando-se que Produto está sendo importado corretamente
import React from "react";

interface PropList {
  produtos: Produto[]; // Usando a interface Produto diretamente
}

const ListaProdutos: React.FC<PropList> = ({ produtos }) => {
  return (
    <ScrollView contentContainerStyle={style.container}> 
      {/* contentContainerStyle permite ajustar o layout dentro do ScrollView */}
      {produtos.map((produto) => (
        <ItemProduto produto={produto} key={produto.id} />
      ))}
    </ScrollView>
  );
}

export default ListaProdutos;