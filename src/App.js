import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text, Button, Icon, Title } from 'native-base';

export default class App extends Component {
  state = {
    data: [],
    page: 0,
    loading: false,
  };

  componentWillMount() {
    this.fetchData();
  };

  fetchData = async () => {
    this.setState({
      loading: true,
    });
    const response = await fetch(
      `https://randomuser.me/api?results=15&seed=APP&page=${this.state.page}`
    );
    const json = await response.json();
    this.setState(state => ({
      data: [...state.data, ...json.results],
      loading: false,
    }));
  };

  handleListEnd = () => {
    this.setState(state => ({
      page: state.page + 1
    }), () => this.fetchData());
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <FlatList
              data={this.state.data}
              keyExtractor={(x, i) => i}
              onEndReached={this.handleListEnd}
              onEndReachedThreshold={0}
              ListFooterComponent={ 
                this.state.loading 
                ? null
                : <ActivityIndicator style={{padding: 10}} animating size='large'/>
              }
              renderItem={({item}) => 
                <ListItem avatar>
                  <Left>
                    <Thumbnail source={{ uri: item.picture.thumbnail }} />
                  </Left>
                  <Body>
                    <Text>{item.name.first} {item.name.last}</Text>
                    <Text note>Doing what you like will always keep you happy . .</Text>
                  </Body>
                  <Right>
                    <Text note>3:43 pm</Text>
                  </Right>
                </ListItem>
              }
            />
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    /*flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',*/
  },
});
