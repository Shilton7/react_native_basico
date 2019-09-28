import React, {Component} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
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
    <View>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <TouchableOpacity onPress={() => {}}>
        <Text>Acessar</Text>
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
      <View>
        <FlatList
          data={this.state.docs}
          keyExtractor={item => item._id}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}