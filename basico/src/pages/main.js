import React, {Component} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import api from '../services/api';

export default class Main extends Component {
  static navigationOptions = {
    title: 'Shilton',
  };

  state = {
    docs: [],
  };

  componentDidMount() {
    this.loadLotes();
  }

  renderItem = ({item}) => (
    <View style={styles.containerProdutos}>
      <Text style={styles.titulo_item}>{item.title}</Text>
      <Text style={styles.desc_item}>{item.description}</Text>
      <TouchableOpacity style={styles.btn_lista} onPress={() => Linking.openURL(item.url)}>
        <Text style={styles.txtbtn}>Acessar</Text>
      </TouchableOpacity>
    </View>
  )

  loadLotes = async () => {
    const response = await api.get("products");
    const {docs} = response.data;
    console.log(docs);

    this.setState({docs});
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          contentContainerStyle={styles.listagem}
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, //ocupar tela toda
    backgroundColor: "#fafafa"
  },
  listagem: {
    padding: 20
  },
  containerProdutos: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    padding: 20,
    marginBottom: 20
  },
  titulo_item: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333"
  },
  desc_item: {
    fontSize: 14,
    color: "#999",
    marginTop: 5,
    lineHeight: 24
  },
  btn_lista: {
    height: 42,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#7159c1",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10

  },
  txtbtn: {
    fontSize: 16,
    color: "#7159c1",
    fontWeight: "bold"
  }
});