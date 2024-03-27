import styles from "./styles";
import Animated, {
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    Easing,
} from "react-native-reanimated";
import { Dimensions, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useState } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;

function Login() {
    const [login, setLogin] = useState("");
    const [pass, setPass] = useState("");
    const [email, setEmail] = useState("");

    const boxPosition1 = useSharedValue(0);
    const boxPosition2 = useSharedValue(SCREEN_WIDTH);

    const boxAnimated1 = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(boxPosition1.value) }],
    }));
    const boxAnimated2 = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(boxPosition2.value) }],
    }));

    const slideForm = (index: number) => {
        boxPosition1.value = index === 0 ? 0 : -SCREEN_WIDTH;
        boxPosition2.value = index === 1 ? 0 : SCREEN_WIDTH;
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxGroup}>
                <Animated.View style={[styles.boxForm, boxAnimated1]}>
                    <Text style={styles.boxTitle}>Entrar</Text>

                    <TextInput
                        style={styles.inputForm}
                        value={login}
                        onChangeText={setLogin}
                        placeholder="Username / Email"
                    />

                    <TextInput
                        style={styles.inputForm}
                        value={pass}
                        onChangeText={setPass}
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.submitBtn} onPress={() => slideForm(0)}>
                        <Text style={styles.submitBtnText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navigateBtn} onPress={() => slideForm(1)}>
                        <Text style={styles.navigateBtnText}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.boxForm, boxAnimated2]}>
                    <Text style={styles.boxTitle}>Redefinição de Senha</Text>

                    <TextInput
                        style={styles.inputForm}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email"
                    />

                    <TouchableOpacity style={styles.submitBtn} onPress={() => slideForm(0)}>
                        <Text style={styles.submitBtnText}>Gerar nova senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navigateBtn} onPress={() => slideForm(0)}>
                        <Text style={styles.navigateBtnText}>
                            Já posssui conta? Faça seu login!
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}

export default Login;
