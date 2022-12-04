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
});