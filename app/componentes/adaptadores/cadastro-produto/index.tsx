import { TextInput, Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';

export const CadastroProduto = () => {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNome}
        value={nome}
        placeholder="Digite o nome do produto"
      />

      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescricao}
        value={descricao}
        placeholder="Digite a descrição do produto"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 15,
  },
});
