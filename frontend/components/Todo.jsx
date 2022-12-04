import { Image, Text, View } from "react-native";

const Todo = ({ todo }) => {
    const date = new Date(todo.created_at);
    return (
        <View style={styles.todo}>
            <View style={styles.todoHeader}>
                <View style={styles.todoHeaderLeft}>
                    <Text style={styles.todoTitle}>{todo.name}</Text>
                    <Text style={styles.todoDate}>{date}</Text>
                </View>
                <View style={styles.todoHeaderRight}>
                    <Image style={styles.todoImage} source={{ uri: todo.image }} />
                </View>
            </View>
            <Text style={styles.todoDescription}>{todo.description}</Text>
        </View>
    );
}

export default Todo;