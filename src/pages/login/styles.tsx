import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default StyleSheet.create({
    container: {
        width: "100%",
    },
    flatlist: {
        width: "100%",
    },
    containerFlatlist: {
        width: "300%",
        alignItems: "stretch",
        justifyContent: "space-around",
    },
    boxForm: {
        elevation: 5,
        shadowColor: "#000000",
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        borderRadius: 10,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        gap: 14,
        width: SCREEN_WIDTH * 0.8,
        margin: 20,
    },
    boxTitle: {
        fontWeight: "bold",
        fontSize: 30,
        color: "#f0506b",
        textAlign: "center",
    },
    inputForm: {
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 6,
        width: "100%",
        backgroundColor: "#f0f0f0",
        fontSize: 16,
    },
    submitBtn: {
        backgroundColor: "#f0506b",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 4,
        // minWidth: "50%",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    submitBtnText: {
        fontSize: 16,
        color: "#ffffff",
        fontWeight: "bold",
        textAlign: "center",
    },
    navigateBtn: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderBottomWidth: 2,
        borderBottomColor: "#f0506b",
        borderRadius: 4,
    },
    navigateBtnText: {
        color: "#000",
    },
});
