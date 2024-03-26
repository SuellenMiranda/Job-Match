import { View } from "react-native";
import styles from "./styles";
import { Outlet } from "react-router-native";

function Initial() {
    return (
        <View style={styles.container}>
            <Outlet />
        </View>
    );
}

export default Initial;
