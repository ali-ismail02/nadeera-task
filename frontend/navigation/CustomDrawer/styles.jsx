import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const colors = {
  light: {
    color: "black",
    backgroundColor: "white",
    borderColor: "#888",
    shadowColor: "#777",
  }
}

export default StyleSheet.create({
    main: {
      height: Dimensions.get("window").height - 300,
      backgroundColor: colors.light.backgroundColor,
    },
    container: {
      backgroundColor: colors.light.backgroundColor,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      paddingLeft: 5,
      height: Dimensions.get("window").height - 300,
    },
    switchContainer: {
      paddingLeft: 18,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    switchText: {
      fontSize: 14,
    },
    topSection: {
      backgroundColor: colors.light.backgroundColor,
      padding: 10,
      paddingTop: Dimensions.get("window").height * 0.08,
      flexDirection: 'row'
    },
    divider: {
      height: 30
    },
    nameContainer: {
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      marginLeft: 15
    },
    imageProfile: {
      borderRadius: 50,
      width: 50,
      height: 50,
      aspectRatio: 1,
      borderColor: colors.light.borderColor,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.light.color,
    },
    caption: {
      marginTop: 5,
      fontSize: 14,
      color: colors.light.color,
    }

});
