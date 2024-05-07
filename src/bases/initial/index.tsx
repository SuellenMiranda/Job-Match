import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useNavigate } from "react-router-native";
import Logo from "../../../assets/imgs/icon.png";
import Image1 from "../../../assets/imgs/Group 81.png";
import Image2 from "../../../assets/imgs/image 93.png";
import Image3 from "../../../assets/imgs/image 94.png";
import Image4 from "../../../assets/imgs/Group 90.png";
import { useEffect, useState } from "react";
import Constants from "../../utils/constants";

function Tela1() {
    return (
        <View style={styles.container}>
            <Image source={Logo} style={styles.logo} />
        </View>
    );
}

function Tela2({ onpress }: { onpress(): void }) {
    return (
        <View style={[styles.container, { backgroundColor: "#386dbda6", paddingTop: "16%" }]}>
            <View style={{ flexDirection: "row", gap: 8 }}>
                <Text style={{ fontSize: 32 }}>Bem-vindo ao</Text>
                <Text style={{ fontSize: 32, color: Constants.PRIMARY_COLOR1, fontWeight: "bold" }}>
                    Job Match
                </Text>
            </View>

            <Image source={Logo} style={[styles.logo, { width: "40%" }]} />

            <Text style={{ fontSize: 26, textAlign: "center", width: "80%" }}>
                Encontre as melhores vagas com o Job Match!
            </Text>

            <View
                style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: "10%" }}
            >
                <View
                    style={{
                        borderRadius: 20,
                        backgroundColor: "#000",
                        elevation: 3,
                        gap: 2,
                        overflow: "hidden",
                    }}
                >
                    <Text
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            textAlign: "center",
                            backgroundColor: "#fff",
                            padding: 12,
                            fontSize: 18,
                        }}
                    >
                        Ao tocares em “Concordar e continuar”, concordas com os nossos Termos de
                        Serviço e declaras que leste a nossa Política de Privacidade para saberes
                        como recolhemos, usamos e partilhamos os teus dados.
                    </Text>
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#fff",
                            padding: 12,
                        }}
                        onPress={onpress}
                    >
                        <Text style={{ textAlign: "center", fontSize: 22 }}>
                            Concordar e continuar
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

function Tela3({ onpress }: { onpress(): void }) {
    return (
        <View style={[styles.container, { backgroundColor: "#efe9dc" }]}>
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 50,
                    alignSelf: "flex-start",
                    paddingHorizontal: "5%",
                }}
            >
                Deslizar para
            </Text>
            <Text
                style={{
                    fontWeight: "bold",
                    fontSize: 50,
                    alignSelf: "flex-start",
                    paddingHorizontal: "5%",
                }}
            >
                os lados
            </Text>
            <Text
                style={{
                    fontSize: 24,
                    alignSelf: "flex-start",
                    paddingHorizontal: "5%",
                    marginBottom: 20,
                }}
            >
                Assim consegue curtir, descurtir e favoritar
            </Text>

            <Image
                source={Image1}
                style={{
                    width: "50%",
                    height: undefined,
                    resizeMode: "contain",
                    aspectRatio: 888 / 1800,
                }}
            />

            <View
                style={{
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                    marginTop: "-10%",
                    gap: 8,
                }}
            >
                <Image source={Image3} style={{ aspectRatio: 1, width: "25%" }} />
                <Image source={Image2} style={{ aspectRatio: 1, width: "25%" }} />
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: "#1c0b2b",
                    padding: 10,
                    width: "90%",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 12,
                    marginTop: 40,
                }}
                onPress={onpress}
            >
                <Text style={{ fontSize: 24, color: "#fff" }}>Continuar</Text>
            </TouchableOpacity>
        </View>
    );
}

function Tela4({ onpress }: { onpress(): void }) {
    return (
        <View
            style={[
                styles.container,
                { backgroundColor: "#efe9dc", paddingHorizontal: "5%", alignItems: "stretch" },
            ]}
        >
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                }}
            >
                Acesse
            </Text>
            <Text style={{ fontSize: 22 }}>com e-mail e senha para entrar</Text>

            <View
                style={{
                    marginTop: 20,
                    gap: 4,
                }}
            >
                <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>E-mail</Text>
                <TextInput
                    placeholder="Digite seu e-mail"
                    style={{
                        backgroundColor: "#d9d9d9",
                        paddingHorizontal: 8,
                        paddingVertical: 14,
                        fontSize: 18,
                        borderRadius: 10,
                    }}
                />
            </View>

            <View
                style={{
                    marginTop: 10,
                    gap: 4,
                }}
            >
                <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Senha</Text>
                <TextInput
                    placeholder="Digite sua senha"
                    style={{
                        backgroundColor: "#d9d9d9",
                        paddingHorizontal: 8,
                        paddingVertical: 14,
                        fontSize: 18,
                        borderRadius: 10,
                    }}
                />
            </View>

            <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        flex: 1,
                    }}
                >
                    <View style={{ borderWidth: 1, width: 14, aspectRatio: 1, borderRadius: 2 }} />
                    <Text style={{ fontSize: 14 }}>Lembrar Senha</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 4,
                        flex: 1,
                    }}
                >
                    <Text style={{ fontSize: 14 }}>Esqueci minha senha</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", gap: 20, alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#fff",
                        borderWidth: 3,
                        borderColor: Constants.PRIMARY_COLOR3,
                        borderRadius: 20,
                        paddingVertical: 12,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            color: Constants.PRIMARY_COLOR3,
                            fontWeight: "bold",
                        }}
                    >
                        Cadastrar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: Constants.PRIMARY_COLOR2,
                        borderWidth: 3,
                        borderColor: Constants.PRIMARY_COLOR3,
                        borderRadius: 20,
                        paddingVertical: 12,
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onPress={onpress}
                >
                    <Text
                        style={{
                            fontSize: 22,
                            color: "#fff",
                            fontWeight: "bold",
                        }}
                    >
                        Acesse
                    </Text>
                </TouchableOpacity>
            </View>

            <View
                style={{
                    marginTop: 20,
                    alignItems: "center",
                    gap: 8,
                    flexDirection: "row",
                    marginBottom: 20,
                }}
            >
                <View style={{ borderBottomWidth: 1, flex: 1 }} />
                <Text style={{ fontSize: 18, fontWeight: "300" }}>Ou acesse com</Text>
                <View style={{ borderBottomWidth: 1, flex: 1 }} />
            </View>

            <Image source={Image4} />
        </View>
    );
}

function Initial() {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setIndex(1);
        }, 2000);
    }, []);

    return index === 0 ? (
        <Tela1 />
    ) : index === 1 ? (
        <Tela2 onpress={() => setIndex(2)} />
    ) : index === 2 ? (
        <Tela3 onpress={() => setIndex(3)} />
    ) : (
        <Tela4 onpress={() => navigate("/home")} />
    );
}

export default Initial;
