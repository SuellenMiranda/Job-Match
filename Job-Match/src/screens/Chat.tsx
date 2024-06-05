import { useEffect, useState } from "react";
import { useLocation } from "react-router-native";
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    View,
    FlatList,
    Alert,
    TextInput,
} from "react-native";
import { Icon } from "../components";
import styles, { DARK_GRAY } from "../../assets/styles";
import axios from "axios";
import Constants from "../utils/constants";

function Chat() {
    const match = useLocation().state;

    const [messages, setMessages] = useState<any[]>();
    const [novaMensagem, setNovaMensagem] = useState("");

    const submitMensagem = () => {
        const mensagem = novaMensagem.trim();

        if (!mensagem) return;

        axios
            .post(`/message/matchMessages/${match.id}`, {
                message: mensagem,
                remetente: "candidato",
                matchId: match.id,
            })
            .then((res) => {
                const postedMessage = res.data;
                const newMessages = JSON.parse(JSON.stringify(messages));
                newMessages?.push(postedMessage);
                setMessages(newMessages);
                setNovaMensagem("");
            })
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert("Erro ao enviar mensagem!", mensagem || "Erro inesperado");
            });
    };

    useEffect(() => {
        axios
            .get(`/message/matchMessages/${match.id}`)
            .then((res) => setMessages(res.data))
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert("Erro ao buscar as mensagens do chat!", mensagem || "Erro inesperado");
            });
    }, []);

    return (
        <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bg}>
            <View style={styles.containerMessages}>
                <View style={styles.top}>
                    <Text style={styles.title}>{match.company.nomeFantasia}</Text>
                    <TouchableOpacity>
                        <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
                    </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    {messages ? (
                        <FlatList
                            data={messages}
                            contentContainerStyle={{ gap: 6, paddingHorizontal: 10 }}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        maxWidth: "80%",
                                        minWidth: "40%",
                                        backgroundColor: "#7b508f",
                                        alignSelf:
                                            item.remetente === "candidato"
                                                ? "flex-end"
                                                : "flex-start",
                                        paddingVertical: 8,
                                        paddingHorizontal: 12,
                                        borderRadius: 20,
                                        borderTopRightRadius: 0,
                                    }}
                                >
                                    <Text style={{ color: "#fff", fontSize: 18 }}>
                                        {item.message}
                                    </Text>
                                    <Text
                                        style={{
                                            color: "#ddd",
                                            fontSize: 12,
                                            alignSelf: "flex-end",
                                            marginTop: -13,
                                        }}
                                    >
                                        {new Date(item.horario).toLocaleTimeString().slice(0, 5)}
                                    </Text>
                                </View>
                            )}
                        />
                    ) : (
                        <Text>Carregando suas mensagens...</Text>
                    )}
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        gap: 8,
                        // backgroundColor: "#ddd",
                        padding: 8,
                        alignItems: "center",
                        maxHeight: "20%",
                    }}
                >
                    <TextInput
                        placeholder="Digite sua mensagem..."
                        value={novaMensagem}
                        onChangeText={setNovaMensagem}
                        style={{
                            borderRadius: 6,
                            backgroundColor: "#fff",
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            flex: 1,
                            fontSize: 18,
                        }}
                        multiline={true}
                    />
                    <TouchableOpacity
                        onPress={submitMensagem}
                        style={{
                            backgroundColor: "#eee",
                            borderRadius: 1000,
                            aspectRatio: 1,
                            padding: 8,
                            alignItems: "center",
                            justifyContent: "center",
                            elevation: 5,
                        }}
                    >
                        <Icon name={"paper-plane"} color="#222" size={24} />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

export default Chat;
