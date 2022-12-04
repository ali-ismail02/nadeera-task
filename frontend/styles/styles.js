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
});