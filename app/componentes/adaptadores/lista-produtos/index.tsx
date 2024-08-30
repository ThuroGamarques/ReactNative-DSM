import { ScrollView, View } from "react-native";
import ItemProduto from "../item-produto";
import style from "@/app/style/default";

// Define o tipo para o produto
type Produto = {
  id: number;
  nome: string;
  preco: number;
};

// Corrige o tipo de produtos para ser um array de objetos Produto
function ListaProdutos({ produtos }: { produtos: Produto[] }) {
  return (
    <ScrollView>
      <View>
        {produtos.map((p) => (
          <ItemProduto produto={p} key={p.id} />
        ))}
      </View>
    </ScrollView>
  );
}

export default ListaProdutos;