import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions, ScrollView } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Index() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  const windowWidth = Dimensions.get('window').width;
  const numColumns = windowWidth > 600 ? 3 : 2;

  useEffect(() => {
    loadprod();
  }, []);

  function loadprod() {
    axios
      .get("https://mkplace-api-react.onrender.com/produtos") // Alterar para o endpoint correto
      .then((resp) => {
        setProdutos(resp.data);
      })
      .catch((error) => {
        console.error("Erro ao Carregar Produtos: ", error);
      });
  }

  function addToCart(item) {
    axios
      .post("https://mkplace-api-react.onrender.com/carrinho", {
        produto_id: item.id,
        cliente_id: 1,  // Alterar para o id do cliente atual
        quantidade: 1,
      })
      .then((resp) => {
        setCarrinho((prevCarrinho) => {
          const updatedCarrinho = [...prevCarrinho];
          const index = updatedCarrinho.findIndex((produto) => produto.id === item.id);

          if (index >= 0) {
            updatedCarrinho[index].quantidade += 1;
          } else {
            updatedCarrinho.push({ ...item, quantidade: 1 });
          }
          
          return updatedCarrinho;
        });
      })
      .catch((error) => {
        console.error("Erro ao adicionar ao carrinho: ", error);
      });
  }

  const getCarrinhoDetails = () => {
    const totalQuantity = carrinho.reduce((total, item) => total + item.quantidade, 0);
    const totalPrice = carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
    
    return { totalQuantity, totalPrice };
  };

  const formatPrice = (price) => {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <View style={mainStyle.view}>
      <TouchableOpacity style={mainStyle.butn} onPress={() => {}}>
        <Icon name="shopping-cart" size={30} color="white" />
        <Text style={mainStyle.butnText}>{getCarrinhoDetails().totalQuantity}</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={mainStyle.card}>
            <Text style={mainStyle.titl}>{item.nome}</Text>
            <Text>{formatPrice(item.preco)}</Text>
            <TouchableOpacity style={mainStyle.addButton} onPress={() => addToCart(item)}>
              <Text style={mainStyle.addButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={numColumns}
        columnWrapperStyle={mainStyle.cardRow}
        contentContainerStyle={mainStyle.cardContainer}
      />

      <View style={mainStyle.sidebar}>
        <ScrollView>
          <Text style={mainStyle.sidebarTitle}>
            <Icon name="shopping-cart" size={20} color="#644ba3" /> Carrinho
          </Text>
          {carrinho.length > 0 ? (
            carrinho.map((item, index) => (
              <View key={index} style={mainStyle.cartItem}>
                <Text style={mainStyle.cartItemName}>{item.nome}</Text>
                <Text>Quantidade: {item.quantidade}</Text>
                <Text>{formatPrice(item.preco)}</Text>
              </View>
            ))
          ) : (
            <Text style={mainStyle.emptyCart}>Carrinho vazio</Text>
          )}

          <View style={mainStyle.cartSummary}>
            <Text>Total de Itens: {getCarrinhoDetails().totalQuantity}</Text>
            <Text>Total: {formatPrice(getCarrinhoDetails().totalPrice)}</Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const mainStyle = StyleSheet.create({
  // Container principal
  view: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 20,
  },
  
  // Botão de Carrinho no topo
  butn: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#644ba3",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  butnText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },

  // Estilos para o FlatList (produtos)
  cardContainer: {
    justifyContent: "flex-start",
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  cardRow: {
    justifyContent: "space-between",
    marginBottom: 15,
  },
  card: {
    flex: 1,
    marginHorizontal: 5,
    height: 250,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  titl: {
    color: "#644ba3",
    height: 50,
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  addButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "#644ba3",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },

  // Sidebar (Carrinho)
  sidebar: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 250,
    backgroundColor: "#fff",
    height: "100%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: -4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#644ba3",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  cartItem: {
    marginBottom: 15,
  },
  cartItemName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyCart: {
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
    marginTop: 30,
  },

  // Resumo do Carrinho
  cartSummary: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  cartSummaryText: {
    fontSize: 16,
    marginBottom: 10,
  },

  // Cartão de Produto (Para mobile)
  cardContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

