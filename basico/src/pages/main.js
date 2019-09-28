import React, {Component} from 'react';
import { View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';

import api from '../services/api';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Shilton',
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1,
    },
  };

  state = {
    infoProdutos: {},
    docs: [],
    pagina: 1,
  };

  componentDidMount() {
    this.loadProdutos();
  }

  loadProdutos = async (pagina = 1) => {
    const response = await api.get(`/products?page=${pagina}`);
    const {docs, ...infoProdutos} = response.data;

    this.setState({
      docs: [...this.state.docs, ...docs],
      infoProdutos,
      pagina,
    });
  };

  carregaMais = () => {
    const {pagina, infoProdutos} = this.state;
    if (pagina === infoProdutos.pages) return;

    const numPagina = pagina + 1;
    this.loadProdutos(numPagina);
  };

  renderItem = ({item}) => (
    <View style={styles.containerProdutos}>
      <Text style={styles.titulo_item}>{item.title}</Text>
      <Text style={styles.desc_item}>{item.description}</Text>
      <TouchableOpacity
        onPress={() => Linking.openURL(item.url)}
        style={styles.btn_lista}>
        <Text style={styles.txtbtn}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listagem}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
          onEndReached={this.carregaMais} //aciona ao chegar no final da lista
          onEndReachedThreshold={0.1} //percentual do fim pra carregar os proximos itens
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //ocupar tela toda
    backgroundColor: '#fafafa',
  },
  listagem: {
    padding: 20,
  },
  containerProdutos: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 20,
    marginBottom: 20,
  },
  titulo_item: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  desc_item: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
    lineHeight: 24,
  },
  btn_lista: {
    height: 42,
    borderRadius: 5,
    borderWidth: 20,
    borderColor: '#7159c1',
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  txtbtn: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});
