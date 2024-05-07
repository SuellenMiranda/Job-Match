import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import Router from "./src/router/router";
import Constants from "./src/utils/constants";
import { StatusBar } from "expo-status-bar";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={Constants.PRIMARY_COLOR1} style="light" />

            <Router />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
});
