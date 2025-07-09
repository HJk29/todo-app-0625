import { View, Text, TextInput, Pressable, StyleSheet, Alert, Dimensions } from 'react-native';
import React, { useContext, useState } from 'react';
import TodosContext from "../components/TodosProvider";
import AppLoadingContext from "../components/AppLoadingProvider";

const { width, height } = Dimensions.get("window");


const TodoWriteScreen = ({ navigation }) => {
    const [todo, setTodo] = useState("");
    const { addTodo } = useContext(TodosContext);
    const { fontsLoaded } = useContext(AppLoadingContext);

    if (!fontsLoaded) {
        return null; // 또는 <ActivityIndicator />로 대체 가능
    }


    const handleAddTodo = () => {
        if (!todo.trim()) {
            Alert.alert("할 일을 입력해주세요.");
            return;
        }

        addTodo(todo);
        setTodo(""); // 입력값 비우기
        navigation.navigate("TodoList");
        // addTodo(todo);
        // setTimeout(() => {
        // navigation.navigate("TodoList");
        // }, 10);  // 10~50ms 정도만 딜레이 줘도 충분
        // setTodo("");
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
                placeholder="할 일을 작성해주세요."
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
        minHeight: height * 0.25,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        borderWidth: 2,
        marginBottom: 20,
        fontSize: 20,
        fontWeight: "bold",
        fontFamily: "CookieRun-Bold",

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
