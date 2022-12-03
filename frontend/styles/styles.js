import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export default StyleSheet.create({
    ImageBackground: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});