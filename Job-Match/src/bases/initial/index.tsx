import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { useNavigate } from "react-router-native";
import Logo from "../../../assets/imgs/icon.png";
import Image1 from "../../../assets/imgs/Group 81.png";
import Image2 from "../../../assets/imgs/image 93.png";
import Image3 from "../../../assets/imgs/image 94.png";
import { useEffect, useState } from "react";
import Constants from "../../utils/constants";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "../../components";

function TermosDeUso({ onpress }: { onpress(): void }) {
    return (
        <View style={[styles.container, { backgroundColor: "#EFE9DC", paddingTop: "16%" }]}>
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

function Tutorial({ onpress }: { onpress(): void }) {
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

function Login({ onLogin, clickCadastro }: { onLogin(): void; clickCadastro(tipo: string): void }) {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [keepLogin, setKeepLogin] = useState<boolean>(false);

    useEffect(() => {
        Promise.all([
            AsyncStorage.getItem("keepLoginStorage"),
            AsyncStorage.getItem("userStorage"),
        ]).then((data) => {
            if (data[0] !== "true" || !data[1]) return;
            Alert.alert("Login automático", "Logado com a conta salva no dispositivo.");
            onLogin();
        });
    }, []);

    const onSubmit = async () => {
        const userLogged = await axios
            .post("/user/login", {
                email: email,
                senha: senha,
            })
            .then((res) => res.data)
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert("Falha no login", mensagem || "Erro inesperado.");
            });

        if (!userLogged) return;

        await AsyncStorage.setItem("keepLoginStorage", JSON.stringify(keepLogin));
        await AsyncStorage.setItem("userStorage", JSON.stringify(userLogged));

        onLogin();
    };

    const onClickCadastro = async () => {
        const tipo: string | null = await new Promise((res) =>
            Alert.alert("Tipo de usuário", "Selecione a opção de cadastro desejada!", [
                { text: "Cancelar", onPress: () => res(null), style: "cancel" },
                { text: "Candidato", onPress: () => res("candidato") },
                { text: "Empresa", onPress: () => res("empresa") },
            ])
        );

        if (!tipo) return;

        clickCadastro(tipo);
    };

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
                    value={email}
                    onChangeText={setEmail}
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
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={setSenha}
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
                    onPress={() => setKeepLogin((k) => !k)}
                >
                    <Icon
                        name={keepLogin ? "checkbox-outline" : "square-outline"}
                        color={"#000"}
                        size={22}
                    />
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
                    onPress={() => {}}
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
                    onPress={onClickCadastro}
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
                    onPress={onSubmit}
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
        </View>
    );
}

function CadastroCandidato({ onBack }: { onBack(): void }) {
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [nascimento, setNascimento] = useState("");
    const [cpf, setCpf] = useState("");
    const [genero, setGenero] = useState("");
    const [endereco, setEndereco] = useState("");
    const [email, setEmail] = useState("");
    const [celular, setCelular] = useState("");
    const [formacao, setFormacao] = useState("");
    const [experiencia, setExperiencia] = useState("");
    const [habilidades, setHabilidades] = useState("");
    const [areaInteresse, setAreaInteresse] = useState("");
    const [foto, setFoto] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const onSubmit = async () => {
        if (senha !== confirmarSenha) {
            Alert.alert("Campos inválidos", "Os campos de senha não estão iguais!");
            return;
        }

        const resultCreate = await axios
            .post("/user", {
                nomeCompleto,
                nascimento,
                cpf,
                genero,
                endereco,
                email,
                celular,
                formacao,
                experiencia,
                habilidades,
                areaInteresse,
                senha,
            })
            .then(() => true)
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert("Falha na criação do candidato", mensagem || "Erro inesperado.");
            });

        if (!resultCreate) return;

        if (foto) {
            const formdata = new FormData();
            formdata.append("foto", foto);

            await axios
                .post("/fotoPerfil", formdata, {
                    headers: { "Content-Type": "multipart/form-data" },
                })
                .then(() => true)
                .catch((err) => {
                    console.error(err?.response?.data || err);

                    const mensagem = err?.response?.data?.message;
                    Alert.alert(
                        "Falha no upload da foto do perfil",
                        mensagem || "Erro inesperado."
                    );
                });
        }

        onBack();
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: "#efe9dc",
                    paddingHorizontal: "5%",
                    alignItems: "stretch",
                    paddingVertical: "5%",
                },
            ]}
        >
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                }}
            >
                Cadastro candidato
            </Text>

            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.scrollviewContainer}
            >
                <View style={{ marginTop: 20, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Nome Completo</Text>
                    <TextInput
                        placeholder="Nome Completo"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={nomeCompleto}
                        onChangeText={setNomeCompleto}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Data de nascimento</Text>
                    <TextInput
                        placeholder="Data de nascimento"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={nascimento}
                        onChangeText={setNascimento}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>CPF da Empresa</Text>
                    <TextInput
                        placeholder="Insira o CPF"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={cpf}
                        onChangeText={setCpf}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Gênero</Text>
                    <TextInput
                        placeholder="Gênero"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={genero}
                        onChangeText={setGenero}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Seu endereço</Text>
                    <TextInput
                        placeholder="Seu endereço"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={endereco}
                        onChangeText={setEndereco}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Seu melhor e-mail</Text>
                    <TextInput
                        placeholder="Seu melhor e-mail"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Celular</Text>
                    <TextInput
                        placeholder="Celular"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={celular}
                        onChangeText={setCelular}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Formação Acadêmica</Text>
                    <TextInput
                        placeholder="Formação Acadêmica"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={formacao}
                        onChangeText={setFormacao}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>
                        Experiência Profissional
                    </Text>
                    <TextInput
                        placeholder="Experiência Profissional"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={experiencia}
                        onChangeText={setExperiencia}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>
                        Habilidades e Competências
                    </Text>
                    <TextInput
                        placeholder="Habilidades e Competências"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={habilidades}
                        onChangeText={setHabilidades}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Área de Interesse</Text>
                    <TextInput
                        placeholder="Área de Interesse"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={areaInteresse}
                        onChangeText={setAreaInteresse}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Digite sua senha</Text>
                    <TextInput
                        placeholder="Digite sua senha"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Confirme sua Senha</Text>
                    <TextInput
                        placeholder="Digite novamente a senha"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        secureTextEntry={true}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                </View>

                <View
                    style={{ flexDirection: "row", gap: 20, alignItems: "center", marginTop: 20 }}
                >
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
                        onPress={onBack}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                color: Constants.PRIMARY_COLOR3,
                                fontWeight: "bold",
                            }}
                        >
                            Cancelar
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
                        onPress={onSubmit}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

function CadastroEmpresa({ onBack }: { onBack(): void }) {
    const [razaoSocial, setRazaoSocial] = useState("");
    const [nomeFantasia, setNomeFantasia] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [email, setEmail] = useState("");
    const [setor, setSetor] = useState("");
    const [localizacao, setLocalizacao] = useState("");
    const [descricao, setDescricao] = useState("");
    const [porte, setPorte] = useState("");
    const [foto, setFoto] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const onSubmit = async () => {
        if (senha !== confirmarSenha) {
            Alert.alert("Campos inválidos", "Os campos de senha não estão iguais!");
            return;
        }

        await axios
            .post("/company", {
                razaoSocial,
                nomeFantasia,
                cnpj,
                email,
                setor,
                localizacao,
                descricao,
                porte,
                senha,
            })
            .then(() => onBack())
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert("Falha no login", mensagem || "Erro inesperado.");
            });
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: "#efe9dc",
                    paddingHorizontal: "5%",
                    alignItems: "stretch",
                    paddingVertical: "5%",
                },
            ]}
        >
            <Text
                style={{
                    fontSize: 32,
                    fontWeight: "bold",
                }}
            >
                Cadastro empresa
            </Text>

            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.scrollviewContainer}
            >
                <View style={{ marginTop: 20, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Razão Social</Text>
                    <TextInput
                        placeholder="Razão Social"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={razaoSocial}
                        onChangeText={setRazaoSocial}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Nome Fantasia</Text>
                    <TextInput
                        placeholder="Nome Fantasia"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={nomeFantasia}
                        onChangeText={setNomeFantasia}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>CNPJ da Empresa</Text>
                    <TextInput
                        placeholder="Insira o CNPJ"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={cnpj}
                        onChangeText={setCnpj}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>
                        Digite o e-mail empresarial
                    </Text>
                    <TextInput
                        placeholder="Digite seu e-mail empresarial"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Setor de Atuação</Text>
                    <TextInput
                        placeholder="Setor de Atuação"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={setor}
                        onChangeText={setSetor}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Localização</Text>
                    <TextInput
                        placeholder="Localização"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={localizacao}
                        onChangeText={setLocalizacao}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Descrição da Empresa</Text>
                    <TextInput
                        placeholder="Descrição da Empresa"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={descricao}
                        onChangeText={setDescricao}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Porte da Empresa</Text>
                    <TextInput
                        placeholder="Insira o Porte da Empresa"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        value={porte}
                        onChangeText={setPorte}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Digite sua senha</Text>
                    <TextInput
                        placeholder="Digite sua senha"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        secureTextEntry={true}
                        value={senha}
                        onChangeText={setSenha}
                    />
                </View>

                <View style={{ marginTop: 10, gap: 4 }}>
                    <Text style={{ fontSize: 18, paddingHorizontal: 6 }}>Confirme sua Senha</Text>
                    <TextInput
                        placeholder="Digite novamente a senha"
                        style={{
                            backgroundColor: "#d9d9d9",
                            paddingHorizontal: 8,
                            paddingVertical: 14,
                            fontSize: 18,
                            borderRadius: 10,
                        }}
                        secureTextEntry={true}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                </View>

                <View
                    style={{ flexDirection: "row", gap: 20, alignItems: "center", marginTop: 20 }}
                >
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
                        onPress={onBack}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                color: Constants.PRIMARY_COLOR3,
                                fontWeight: "bold",
                            }}
                        >
                            Cancelar
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
                        onPress={onSubmit}
                    >
                        <Text
                            style={{
                                fontSize: 22,
                                color: "#fff",
                                fontWeight: "bold",
                            }}
                        >
                            Continuar
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

function Initial() {
    const navigate = useNavigate();

    const [index, setIndex] = useState(1);

    return index === 1 ? (
        <TermosDeUso onpress={() => setIndex(2)} />
    ) : index === 2 ? (
        <Tutorial onpress={() => setIndex(3)} />
    ) : index === 3 ? (
        <Login
            onLogin={() => navigate("/home")}
            clickCadastro={(tipo) => {
                switch (tipo) {
                    case "candidato":
                        setIndex(4);
                        break;
                    case "empresa":
                        setIndex(5);
                        break;
                    default:
                        return;
                }
            }}
        />
    ) : index === 4 ? (
        <CadastroCandidato onBack={() => setIndex(3)} />
    ) : index === 5 ? (
        <CadastroEmpresa onBack={() => setIndex(3)} />
    ) : (
        <></>
    );
}

export default Initial;
