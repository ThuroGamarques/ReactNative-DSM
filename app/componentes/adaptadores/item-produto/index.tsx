import style from "@/app/style/default";
import { Text, View } from "react-native";

function ItemProduto({produto}: {produto:{nome:string, preco:number} } )
{
    return (
        <View style={style.card}> 
            <Text style={style.text}>{produto.nome}</Text>
            <Text style={style.text}>{produto.preco}</Text>
        </View>
    )

}

export default ItemProduto;