import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';


const TodoWriteScreen = ({ navigation, route }) => {
  const [todo, setTodo] = useState("");

  const {addTodo} = route.params.todosState;

  const handleAddTodo = () => {
    if(!todo.trim()) {
        Alert.alert("할 일을 입력해주세요.");
        return;
    }
    alert("작성한 내용: " + todo);
    addTodo(todo);
    navigation.navigate("TodoList");
    setTodo("");
  };

  const onCancel = () => {
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <TextInput
        multiline
        onChangeText={setTodo}
        value={todo}
        placeholder="할 일을 작성해주세요"
        style={styles.textInput}
      />
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleAddTodo} style={styles.button}>
          <Text style={styles.buttonText}>작성 완료</Text>
        </Pressable>
        <Pressable onPress={onCancel} style={styles.button}>
          <Text style={styles.buttonText}>작성 취소</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  textInput: {
    minHeight: 200,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
  },
  button: {
    padding: 15,
    width: "50%",
    backgroundColor: "#2196F3",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default TodoWriteScreen;
