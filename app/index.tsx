import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Dimensions } from "react-native";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Index() {
  const [contador, setContador] = useState(0);
  const [produtos, setProdutos] = useState([]);

  const windowWidth = Dimensions.get('window').width;

  const numColumns = windowWidth > 600 ? 3 : 2;

  useEffect(() => {
    loadprod();
  }, []);

  function loadprod() {
    axios
      .get("https://app-api-tapwm.onrender.com/api/produtos")
      .then((resp) => {
        setProdutos(resp.data);
      })
      .catch((error) => {
        console.error("Erro ao Carregar Produtos: ", error);
      });
  }

  function addToCart() {
    setContador(contador + 1);
  }

  return (
    <View style={mainStyle.view}>
      <TouchableOpacity style={mainStyle.butn} onPress={() => {}}>
        <Icon name="shopping-cart" size={30} color="white" />
        <Text style={mainStyle.butnText}>{contador}</Text>
      </TouchableOpacity>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={mainStyle.card}>
            <Text style={mainStyle.titl}>{item.nome}</Text>
            <Text>R$ {item.preco}</Text>
            <TouchableOpacity style={mainStyle.addButton} onPress={addToCart}>
              <Text style={mainStyle.addButtonText}>Adicionar ao Carrinho</Text>
            </TouchableOpacity>
          </View>
        )}
        numColumns={numColumns}
        columnWrapperStyle={mainStyle.cardRow}
        contentContainerStyle={mainStyle.cardContainer}
      />
    </View>
  );
}

const mainStyle = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#e9e6ed",
    paddingTop: 20,
  },
  butn: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 7,
    backgroundColor: "#644ba3",
    borderRadius: 10,
  },
  butnText: {
    color: "white",
    fontSize: 18,
    marginLeft: 10,
  },
  cardContainer: {
    justifyContent: 'flex-start',
    paddingBottom: 20,
    paddingHorizontal: 10,
  },
  cardRow: {
    justifyContent: 'space-between',
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
    elevation: 1,
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
    paddingVertical: 10,
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
});
