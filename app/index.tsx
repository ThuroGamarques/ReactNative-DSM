import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { CadastroProduto } from "@/app/componentes/adaptadores/cadastro-produto";
import axios from "axios";

export default function Index() {
  const [contador, setContador] = useState(0);
  const [produtos, setProdutos] = useState([]); // Inicializando como array vazio

  // Carregar produtos quando o componente for montado
  useEffect(() => {
    carregarProdutos();
  }, []);

  // Função para carregar os produtos da API
  function carregarProdutos() {
    axios
      .get("https://app-api-tapwm.onrender.com/api/produtos")
      .then((resp) => {
        // Atualiza o estado com os dados recebidos da API
        setProdutos(resp.data); // Assumindo que resp.data seja um array de produtos
      })
      .catch((error) => {
        console.error("Erro ao carregar produtos:", error);
      });
  }

  // Função para incrementar o contador
  function clicarBotao() {
    setContador(contador + 1);
  }

  return (
    <View style={main.view}>
      {/* Renderiza a lista de produtos, se houver */}
      {produtos.length > 0 ? (
        produtos.map((p) => (
          <View key={p.id} style={main.card}>
            <Text style={main.titulo}>{p.nome}</Text>
            <Text>{p.preco}</Text>
          </View>
        ))
      ) : (
        <Text style={main.text}>Carregando produtos...</Text>
      )}

      {/* Botão para incrementar o contador */}
      <Button title={`Contador: ${contador}`} onPress={clicarBotao} />

      {/* Componente CadastroProduto */}
      <CadastroProduto />
    </View>
  );
}

const main = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#482973",
    padding: 20, // Adicionado padding para melhorar a interface
  },
  text: {
    color: "#eb34d8",
    fontSize: 18,
    fontWeight: "bold",
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "left",
    fontWeight: "bold",
  },
  card: {
    width: 250,
    height: 120,
    backgroundColor: "#AAA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10,
    padding: 10,
  },
});