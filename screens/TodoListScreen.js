import { Text, View, StyleSheet, Pressable, Alert } from "react-native";
import React, {useContext} from "react";
import TodosContext from "../components/TodosProvider"
import { ListItem, Icon, Button } from "@rneui/themed";

const TodoListScreen = ({ route }) => {
  const { todos, removeTodo } = useContext(TodosContext);

  const handleRemoveTodo = (id, reset) => {
    Alert.alert(
      "삭제 확인",
      "정말 삭제하시겠습니까?",
      [
        {
          text: "삭제",
          onPress: () => {
            removeTodo(id);
            reset();
          },
          style: "destructive",
        },
        { text: "취소", onPress: () => reset(), style: "cancel" },
      ],
      { 
        cancelable: true, // 경고창 상자 밖 클릭 시 닫아짐
        onDismiss: () => reset(), // 경고창 상자 밖을 클릭 시 콜백 함수
      }
    );
  };

  return (
    <View style={styles.todoListContainer}>
      {todos.length > 0 ? (
        todos.map((todo) => (
        <View key={todo.id} style={{marginTop: 5}}>
          <ListItem.Swipeable
             style={styles.listBox}
            bottomDivider
            leftContent={(reset) => (
              <Pressable style={{...styles.pressableBtn, backgroundColor: "blue"}}
                title="수정"
                onPress={() => reset()}
              >
                <Icon name="update" color="white"/>
                <Text style={styles.btnText}>수정</Text>
              </Pressable>
            )}
            rightContent={(reset) => (
              <Pressable style={{...styles.pressableBtn, backgroundColor: "red"}}
                title="삭제"
                onPress={() => handleRemoveTodo(todo.id, reset)}
              >
                <Icon name="delete" color="white"/>
                <Text style={styles.btnText}>삭제</Text>
              </Pressable>
            )}
          >
            <ListItem.Content> 
              <ListItem.Title>번호 : {todo.id}</ListItem.Title>
              <ListItem.Subtitle>{todo.regDate}</ListItem.Subtitle>
              <ListItem.Subtitle>{todo.content}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem.Swipeable>
        </View>
      ))
      ) : (
        <View style ={{ flex:1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>할 일이 없습니다.</Text>
        </View>
      )} 
    </View>
  );
}; 

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 10,
  },
  listBox: {
    borderWidth: 2,
  },
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  }
})

export default TodoListScreen;