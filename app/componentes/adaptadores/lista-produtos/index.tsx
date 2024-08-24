import {ScrollView, View} from "react-native";
import ItemProduto from "../item-produto"
import style from "@/app/style/default"

function ListaProdutos({produtos}:
    {produtos: [id:number, nome:string, preco:number]})
{
    return (
    <ScrollView>
    <View>
        {produtos.map((p) => 
        <ItemProduto produto={p} key={p.id}>

        </ItemProduto>)}
    </View>
    </ScrollView>
    )
}