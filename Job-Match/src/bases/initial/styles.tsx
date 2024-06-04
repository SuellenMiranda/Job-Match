import { StyleSheet } from "react-native";
import Constants from "../../utils/constants";

export default StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Constants.PRIMARY_COLOR2,
        position: "relative",
    },
    scrollview: {
        flex: 1,
        width: "100%",
    },
    scrollviewContainer: {},
    logo: {
        height: undefined,
        width: "70%",
        aspectRatio: 1,
    },
    welcome: {
        gap: 4,
        alignItems: "center",
        justifyContent: "center",
    },
    welcomeText1: {
        color: Constants.WHITE_COLOR,
        fontSize: 56,
    },
    welcomeText2: {
        color: Constants.WHITE_COLOR,
        fontSize: 22,
    },
    navigation: {
        marginTop: "30%",
        gap: 16,
        minWidth: "60%",
        alignItems: "stretch",
        justifyContent: "center",
    },
    navigationBtn: {
        backgroundColor: Constants.PRIMARY_COLOR1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    navigationBtnText: {
        textAlign: "center",
        color: Constants.WHITE_COLOR,
        fontSize: 20,
    },
});
