import { View } from "react-native";
import styles from "./styles";
import { Outlet } from "react-router-native";

function Main() {
    return (
        <View style={styles.container}>
            <Outlet />
        </View>
    );
}

export default Main;
