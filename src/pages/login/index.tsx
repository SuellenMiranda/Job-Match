import styles from "./styles";
import { Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useEffect, useRef, useState } from "react";

const SCREEN_WIDTH = Dimensions.get("window").width;

function FormCadastro({ scrollToIndex }: { scrollToIndex: (n: number) => void }) {
    const [newEmail, setNewEmail] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newPass, setNewPass] = useState("");

    return (
        <View style={[styles.boxForm]}>
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

            <TouchableOpacity style={styles.submitBtn} onPress={() => {}}>
                <Text style={styles.submitBtnText}>Cadastrar-se</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigateBtn} onPress={() => scrollToIndex(1)}>
                <Text style={styles.navigateBtnText}>Voltar para o Login!</Text>
            </TouchableOpacity>
        </View>
    );
}

function FormLogin({ scrollToIndex }: { scrollToIndex: (n: number) => void }) {
    const [loginUser, setLoginUser] = useState("");
    const [loginPass, setLoginPass] = useState("");

    return (
        <View style={[styles.boxForm]}>
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

            <TouchableOpacity style={styles.submitBtn} onPress={() => {}}>
                <Text style={styles.submitBtnText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigateBtn} onPress={() => scrollToIndex(2)}>
                <Text style={styles.navigateBtnText}>Esqueci minha senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigateBtn} onPress={() => scrollToIndex(0)}>
                <Text style={styles.navigateBtnText}>Não tem conta? Cadastre-se!</Text>
            </TouchableOpacity>
        </View>
    );
}

function FormReset({ scrollToIndex }: { scrollToIndex: (n: number) => void }) {
    const [resetEmail, setResetEmail] = useState("");

    return (
        <View style={[styles.boxForm]}>
            <Text style={styles.boxTitle}>Redefinição de Senha</Text>

            <TextInput
                style={styles.inputForm}
                value={resetEmail}
                onChangeText={setResetEmail}
                placeholder="Email"
            />

            <TouchableOpacity style={styles.submitBtn} onPress={() => {}}>
                <Text style={styles.submitBtnText}>Gerar nova senha</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.navigateBtn} onPress={() => scrollToIndex(1)}>
                <Text style={styles.navigateBtnText}>Voltar para o login!</Text>
            </TouchableOpacity>
        </View>
    );
}

function Login() {
    const flatlistRef = useRef<FlatList>(null);

    const scrollToIndex = (index: number) => {
        flatlistRef.current?.scrollToIndex({
            index: index,
            animated: true,
        });
    };

    const forms = [
        <FormCadastro scrollToIndex={scrollToIndex} />,
        <FormLogin scrollToIndex={scrollToIndex} />,
        <FormReset scrollToIndex={scrollToIndex} />,
    ];

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatlistRef}
                data={forms}
                renderItem={({ item }) => item}
                horizontal
                style={styles.flatlist}
                contentContainerStyle={styles.containerFlatlist}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                initialNumToRender={3}
                getItemLayout={(_, i) => ({
                    length: SCREEN_WIDTH,
                    offset: SCREEN_WIDTH * i,
                    index: i,
                })}
                initialScrollIndex={1}
                onScrollToIndexFailed={(err) => {
                    console.error(err);
                }}
            />
        </View>
    );
}

export default Login;
