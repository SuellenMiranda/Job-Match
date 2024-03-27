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
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");

    const boxPosition0 = useSharedValue(-SCREEN_WIDTH);
    const boxPosition1 = useSharedValue(0);
    const boxPosition2 = useSharedValue(SCREEN_WIDTH);

    const boxAnimated0 = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(boxPosition0.value) }],
    }));
    const boxAnimated1 = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(boxPosition1.value) }],
    }));
    const boxAnimated2 = useAnimatedStyle(() => ({
        transform: [{ translateX: withTiming(boxPosition2.value) }],
    }));

    const slideForm = (index: number) => {
        boxPosition0.value = index === 0 ? 0 : -SCREEN_WIDTH;
        boxPosition1.value = index === 0 ? SCREEN_WIDTH : index === 2 ? -SCREEN_WIDTH : 0;
        boxPosition2.value = index === 2 ? 0 : SCREEN_WIDTH;
    };

    return (
        <View style={styles.container}>
            <View style={styles.boxGroup}>
                <Animated.View style={[styles.boxForm, boxAnimated0]}>
                    <Text style={styles.boxTitle}>Cadastro</Text>

                    <TextInput
                        style={styles.inputForm}
                        value={newUser}
                        onChangeText={setNewUser}
                        placeholder="Username"
                    />

                    <TextInput
                        style={styles.inputForm}
                        value={newEmail}
                        onChangeText={setNewEmail}
                        placeholder="Email"
                    />

                    <TextInput
                        style={styles.inputForm}
                        value={newPass}
                        onChangeText={setNewPass}
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.submitBtn} onPress={() => slideForm(0)}>
                        <Text style={styles.submitBtnText}>Cadastrar-se</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navigateBtn} onPress={() => slideForm(1)}>
                        <Text style={styles.navigateBtnText}>Voltar para o Login!</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.boxForm, boxAnimated1]}>
                    <Text style={styles.boxTitle}>Entrar</Text>

                    <TextInput
                        style={styles.inputForm}
                        value={loginUser}
                        onChangeText={setLoginUser}
                        placeholder="Username / Email"
                    />

                    <TextInput
                        style={styles.inputForm}
                        value={loginPass}
                        onChangeText={setLoginPass}
                        placeholder="Senha"
                        secureTextEntry
                    />

                    <TouchableOpacity style={styles.submitBtn} onPress={() => slideForm(1)}>
                        <Text style={styles.submitBtnText}>Entrar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navigateBtn} onPress={() => slideForm(2)}>
                        <Text style={styles.navigateBtnText}>Esqueci minha senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navigateBtn} onPress={() => slideForm(0)}>
                        <Text style={styles.navigateBtnText}>Não tem conta? Cadastre-se!</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View style={[styles.boxForm, boxAnimated2]}>
                    <Text style={styles.boxTitle}>Redefinição de Senha</Text>

                    <TextInput
                        style={styles.inputForm}
                        value={resetEmail}
                        onChangeText={setResetEmail}
                        placeholder="Email"
                    />

                    <TouchableOpacity style={styles.submitBtn} onPress={() => slideForm(2)}>
                        <Text style={styles.submitBtnText}>Gerar nova senha</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.navigateBtn} onPress={() => slideForm(1)}>
                        <Text style={styles.navigateBtnText}>Voltar para o login!</Text>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </View>
    );
}

export default Login;
