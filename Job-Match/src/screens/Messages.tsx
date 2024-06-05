import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, ImageBackground, View, FlatList, Alert } from "react-native";
import { Icon, Message } from "../components";
import DEMO from "../../assets/data/demo";
import styles, { DARK_GRAY } from "../../assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import getRandomImage from "../utils/getRandomImage";
import { useNavigate } from "react-router-native";

function Messages() {
    const navegar = useNavigate();

    const [user, setUser] = useState<any>();
    const [matches, setMatches] = useState<any>();

    useEffect(() => {
        AsyncStorage.getItem("userStorage").then((d) => {
            if (!d) throw new Error("User storage não foi encontrado");
            const user = JSON.parse(d);
            setUser(user);
        });
    }, []);

    useEffect(() => {
        if (!user) return;

        axios
            .get(`/match/fromUser/${user.id}`)
            .then((res) =>
                setMatches(
                    res.data.map((d: any) => {
                        d.company.foto = getRandomImage();
                        return d;
                    })
                )
            )
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert("Erro ao buscar os seus matches!", mensagem || "Erro inesperado");
            });
    }, [user]);

    return (
        <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bg}>
            <View style={styles.containerMessages}>
                <View style={styles.top}>
                    <Text style={styles.title}>Mensagens</Text>
                    <TouchableOpacity>
                        <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
                    </TouchableOpacity>
                </View>

                {matches ? (
                    matches.length ? (
                        <FlatList
                            data={matches}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => navegar(`/chat/${item.id}`, { state: item })}
                                >
                                    <Message
                                        image={item.company.foto}
                                        name={item.company.nomeFantasia}
                                        lastMessage={
                                            item.message ||
                                            "Você ainda não tem mensagens com este match!"
                                        }
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    ) : (
                        <Text>Você não tem nenhum match para enviar mensagem!</Text>
                    )
                ) : (
                    <Text>Carregando suas mensagens...</Text>
                )}
            </View>
        </ImageBackground>
    );
}

export default Messages;
