import { TextInput } from "react-native-gesture-handler"
import { Text, View } from "react-native-reanimated/lib/typescript/Animated"
import { useState } from "react";

export const CadastroProduto = () =>
{
    let [nome, setNome] = useState('');
    let [descricao, setDescricao] = useState('');
    
    return(
        <View>
            <Text>Nome:</Text>
            <TextInput onChangeText={setNome} value={nome}></TextInput>

            <Text>Descrição:</Text>
            <TextInput onChangeText={setDescricao} value={descricao}></TextInput>
        </View>
    )
}