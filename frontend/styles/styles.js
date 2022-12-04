import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    ImageBackground: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontSize: 45,
        color: "#222",
        paddingTop: 150,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    input: {
        width:width*0.8,
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 5,
        paddingHorizontal: 16,
        fontSize: 16,
        color: "#000",
        marginVertical: 10,
        borderColor: "#000",
        borderWidth: 1,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    registerImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: 20,
    },
    registerView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    error: {
        color: "#f00",
        fontSize: 16,
        fontWeight: "bold",
    },
    todo:{
        width:width*0.8,
        height: 200,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginVertical: 10,
    },
    todoHeader:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
    },
    todoHeaderLeft:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-start",
    },
    todoHeaderRight:{
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"flex-end",
    },
    todoTitle:{
        fontSize: 20,
        color: "#222",
        fontWeight: "bold",
        fontStyle: "italic",
    },
    todoDescription:{
        fontSize: 16,
        color: "#222",
    },
    todoDate:{
        fontSize: 16,
        color: "#555",
    },
    todoImage:{
        width: 50,
        height: 50,
        borderRadius: 50,
    },
});