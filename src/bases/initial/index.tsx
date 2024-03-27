import { Image, View } from "react-native";
import styles from "./styles";
import { Outlet } from "react-router-native";
import SplashScreen from "../../../assets/splash_gradient.png";
import Logo from "../../../assets/icon.png";
import { LinearGradient } from "expo-linear-gradient";

function Initial() {
    return (
        <View style={styles.container}>
            {/* <Image source={SplashScreen} style={styles.imageBackground} /> */}

            <LinearGradient
                colors={["#ffffff", "#f2685d", "#ef4074", "#ee3b76"]}
                locations={[0.1, 0.7, 0.9, 1]}
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
