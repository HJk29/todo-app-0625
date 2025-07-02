import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';


const TodoWriteScreen = ({ navigation }) => {
    const [todo, setTodos] = useState('');

    const onPressFunction = () => {
        alert("작성한 내용: " + todo);
        // navigation.navigate("Details", { todoText: todos });

    };

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
            <TextInput
                multiline
                onChangeText={setTodos}
                value={todo}
                placeholder="할 일을 작성해주세요"
                style={{
                    flex: 0.2,
                    padding: 10,
                    backgroundColor: "#fff",
                    borderRadius: 10,
                    borderWidth: 2,
                    marginBottom: 20,
                }}
            />
            <Pressable
                onPress={onPressFunction}
                style={{
                    padding: 15,
                    backgroundColor: "#2196F3",
                    borderRadius: 10,
                    alignItems: "center"
                }}
            >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>작성 완료</Text>
            </Pressable>
        </View>
    );
};
export default TodoWriteScreen;