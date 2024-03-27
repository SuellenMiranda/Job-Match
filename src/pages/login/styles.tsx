import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: "100%",
    },
    boxGroup: {
        flexDirection: "row",
        width: "100%",
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
    },
    boxForm: {
        position: "absolute",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#fff",
        width: "80%",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        gap: 14,
        top: 0,
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
        minWidth: "50%",
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
