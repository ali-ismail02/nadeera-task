
import React, { useEffect, useState } from "react";
import { Text, View, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import Todo from '../components/Todo';
import Get from '../hooks/Get';
import styles from "../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Todos = () => {
    const [todos, setTodos] = useState([]);
    const user = useSelector((state) => state?.user);

    useEffect(() => {
        const getTodos = async () => {
            const res = await Get("user/todos", user.userProfile.token);
            setTodos(res.data.data);
            console.log(await AsyncStorage.getItem("userProfile"));
        }
        getTodos();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.todos}>
                {todos.map((todo) => (
                    <Todo todo={todo} key={todo.id} />
                ))}
            </View>
        </ScrollView>
    );

}

export default Todos;