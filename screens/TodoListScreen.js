import { Text, View, StyleSheet, Pressable, Alert, Modal, TextInput, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import TodosContext from "../components/TodosProvider"
import { ListItem, Icon, Button } from "@rneui/themed";


const TodoListScreen = ({ route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { todos, removeTodo, modifyTodo } = useContext(TodosContext);
  const [selectedTodoId, setSelectedTodoId] = useState(null);
  const [modifiedContent, setModifiedContent] = useState("");

  const openModifyModal = (todo, reset) => {
    setSelectedTodoId(todo.id);
    setModifiedContent(todo.content);
    reset();
    setModalVisible(true);
  };

  const handleModifyTodo = () => {
    if (selectedTodoId !== null) {
      modifyTodo(selectedTodoId, modifiedContent);
    }

    setSelectedTodoId(null);
    setModalVisible(false);
  };

  const closeModal = () => {
    setModifiedContent(modifiedContent);
    setModalVisible(false);
  };

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
          <View
            key={todo.id}
            style={{
              marginVertical: 5, // margin Y축
              marginHorizontal: 10, // margin X축
              borderWidth: 2,
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <ListItem.Swipeable
              bottomDivider
              style={styles.listBox}
              leftContent={(reset) => (
                <Pressable style={{ ...styles.pressableBtn, backgroundColor: "blue" }}
                  onPress={() => openModifyModal(todo, reset)}
                >
                  <Icon name="update" color="white" />
                  <Text style={styles.btnText}>수정</Text>
                </Pressable>
              )}
              rightContent={(reset) => (
                <Pressable style={{ ...styles.pressableBtn, backgroundColor: "red" }}
                  title="삭제"
                  onPress={() => handleRemoveTodo(todo.id, reset)}
                >
                  <Icon name="delete" color="white" />
                  <Text style={styles.btnText}>삭제</Text>
                </Pressable>
              )}
            >
              <ListItem.Content>
                <ListItem.Title>번호 : {todo.id}</ListItem.Title>
                <ListItem.Subtitle>
                  작성 날짜 : {todo.regDate}
                </ListItem.Subtitle>
                <ListItem.Subtitle>할 일: {todo.content}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          </View>
        ))
      ) : (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>할 일이 없습니다.</Text>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <Pressable onPress={closeModal} style={styles.modalContainer}>
          <Pressable style={styles.modalBox}>
            <View style={styles.modalInner}>
              <View style={{ flexGrow: 1 }}>
                <TextInput
                  multiline
                  style={styles.modifyInput}
                  placeholder="수정할 일을 입력해주세요."
                  value={modifiedContent}
                  onChangeText={setModifiedContent}
                />
              </View>
              <View style={styles.modalBtnBox}>
                <TouchableOpacity onPress={handleModifyTodo}>
                  <Text style={styles.modalBtnText}>수정</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal}>
                  <Text style={styles.modalBtnText}>취소</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  todoListContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listBox: {},
  pressableBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    width: "80%",
    minHeight: 250,
    borderWidth: 3,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  modalInner: {
    flex: 1,
  },
  modifyInput: {
    padding: 10,
    fontSize: 20,
  },
  modalBtnBox: {
    height: 60,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
    paddingRight: 20,
  },
  modalBtnText: {
    fontSize: 18,
    fontWeight: "bold",
  },
})

export default TodoListScreen;