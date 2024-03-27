import { Image, View } from "react-native";
import styles from "./styles";
import { Outlet } from "react-router-native";
import Logo from "../../../assets/icon.png";
import { LinearGradient } from "expo-linear-gradient";

function Initial() {
    return (
        <View style={styles.container}>
            <LinearGradient
                colors={["#ffffff", "#f2685d", "#ef4074", "#ee3b76"]}
                locations={[0.2, 0.6, 0.9, 1]}
                style={styles.gradientBackground}
            />

            <View style={styles.upper}>
                <Image source={Logo} style={styles.logo} />
            </View>

            <View style={styles.bottom}>
                <Outlet />
            </View>
        </View>
    );
}

export default Initial;
