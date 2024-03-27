import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View } from "react-native";
import Router from "./src/router/router";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <Router />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
});
