/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';
import { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';



type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      text: "",
      todos: [],
    }

    this._renderInput = this._renderInput.bind(this);
    this._saveTodo = this._saveTodo.bind(this);
    this._toggleToDo = this._toggleToDo.bind(this);
    this._deleteTodo = this._deleteTodo.bind(this);
    this._confirmDeleteTodo = this._confirmDeleteTodo.bind(this);
    this._renderToDoItem = this._renderToDoItem.bind(this);

  }

  _confirmDeleteTodo(index) {
    Alert.alert("Thông báo", "Bạn có chắc muốn xóa item này ?", [
      { text: 'Không', style: 'cancel' },
      { text: 'Có', onPress: () => this._deleteTodo(index) },
    ],
      { cancelable: false })
  }

  _deleteTodo(index) {
    let { todos } = this.state;
    if (todos[index]) {
      todos.splice(index, 1);
      this.setState({ todos });
    }
  }

  _saveTodo() {
    let { text, todos } = this.state;
    console.log('_saveTodo', text, todos);
    if (text) {
      todos.push({ text });
      this.setState({ todos, text: "" });
    }
  }

  _toggleToDo(index, todo) {
    let { todos } = this.state;
    console.log('_toggleToDo', index, todo);
    if (todos[index]) {
      todo.selected = !todo.selected;
      todos[index] = todo;
      this.setState({ todos });
    }
  }

  _renderInput() {
    return (
      <View style={styles.inputWrapper}>
        <Icon name="ios-add" size={35} />
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({ text })}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.button} onPress={this._saveTodo}>
          <Text style={styles.buttonText}>Thêm</Text>
        </TouchableOpacity>
      </View>
    )
  }

  _renderToDoItem({ item, index }) {
    var swipeoutBtns = [
      {
        text: 'Xóa',
        backgroundColor: "red",
        onPress: () => this._confirmDeleteTodo(index),
      }
    ]
    console.log('_renderToDoItem', item);
    return (<Swipeout right={swipeoutBtns} key={index} backgroundColor="#F5FCFF" buttonWidth={80} autoClose={true}>
      <View style={styles.todoItem}>
        <RadioButtonInput
          obj={item}
          index={index}
          isSelected={item.selected}
          borderWidth={1}
          onPress={() => this._toggleToDo(index, item)}
          buttonSize={12}
          buttonInnerColor={'#e91e63'}
          buttonOuterColor={item.selected ? '#e91e63' : '#dadada'}
          buttonOuterSize={20}
        />
        <View style={styles.todoTextWrapper}>
          <Text style={styles.todoText}>{item.text}</Text>
        </View>

      </View>
    </Swipeout>);
  }

  _renderItemSeparator() {
    return (<View style={styles.separator} ></View >)
  }

  render() {
    const { todos } = this.state;
    console.log('render', todos);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>TODO APP</Text>
          <Text style={styles.headerText}>{todos.length}</Text>
        </View>
        <FlatList
          data={this.state.todos}
          keyExtractor={(item, index) => index}
          extraData={this.state}
          renderItem={this._renderToDoItem}
          ListFooterComponent={this._renderInput}
          ItemSeparatorComponent={this._renderItemSeparator}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.select({
      ios: 40,
      android: 0
    }),
    backgroundColor: '#F5FCFF',
    paddingLeft: 15,
  },
  todoItem: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
  },
  todoTextWrapper: {
    marginLeft: 15,
  },
  todoText: {
    fontSize: 15,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderTopColor: '#dadada',
    borderTopWidth: 1,
    borderBottomColor: '#dadada',
    borderBottomWidth: 1,
    marginLeft: 15,
  },
  headerText: {
    fontSize: 25,
    color: '#e91e63',
    fontWeight: 'bold'
  },
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dadada',
  },
  button: {
    backgroundColor: '#e91e63',
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  buttonText: {
    fontSize: 15,
    color: '#fff'
  },
  separator: {
    height: 1,
    backgroundColor: '#dadada',
    marginLeft: 30
  }
});
