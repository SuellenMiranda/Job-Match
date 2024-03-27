import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    imageBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    gradientBackground: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 0,
    },
    upper: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    bottom: {
        flex: 2,
        width: "100%",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    logo: {
        height: 100,
        width: 100,
    },
});
