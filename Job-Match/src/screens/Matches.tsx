import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ImageBackground, FlatList, Alert } from "react-native";
import { CardItem, Icon } from "../components";
import styles, { DARK_GRAY } from "../../assets/styles";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRandomImage from "../utils/getRandomImage";
import { Image } from "react-native";
import { useNavigate } from "react-router-native";

function Matches() {
    const navegar = useNavigate();

    const [user, setUser] = useState<any>();
    const [matches, setMatches] = useState<any>();
    const [selected, setSelected] = useState<(typeof matches)[number]>();

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
            <View style={styles.containerMatches}>
                <View style={styles.top}>
                    <Text style={styles.title}>Matches</Text>
                    <TouchableOpacity>
                        <Icon name="ellipsis-vertical" color={DARK_GRAY} size={20} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    numColumns={2}
                    data={matches}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity>
                            <CardItem
                                image={item.company.foto}
                                name={item.company.nomeFantasia}
                                onPress={() => setSelected(matches[index])}
                                isOnline={item.isOnline}
                                hasVariant
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>

            {selected && (
                <View
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "#0008",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                    }}
                >
                    <View
                        style={{
                            backgroundColor: "#fff",
                            padding: 20,
                            width: "80%",
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: "#000",
                            alignItems: "center",
                            gap: 20,
                        }}
                    >
                        <Image
                            source={selected.company.foto}
                            style={{
                                width: "90%",
                                aspectRatio: 1,
                                height: undefined,
                                resizeMode: "cover",
                                borderRadius: 16,
                            }}
                        />

                        <TouchableOpacity
                            style={{
                                gap: 8,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#8d42ee",
                                borderRadius: 20,
                                paddingHorizontal: 20,
                                paddingVertical: 12,
                                marginTop: -40,
                            }}
                        >
                            <Icon name={"star"} color="#f89" size={24} />
                            <Text style={{ fontSize: 24, color: "#fff" }}>Favoritar</Text>
                        </TouchableOpacity>

                        <View style={{ gap: 6 }}>
                            <Text style={{ textAlign: "center" }}>
                                {selected.company.nomeFantasia}
                            </Text>
                            <Text style={{ textAlign: "center" }}>
                                Descrição: {selected.company.descricao}
                            </Text>
                        </View>

                        <View style={{ gap: 6 }}>
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 6,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <Icon name={"location"} color="#f89" size={24} />
                                <Text>Localização: {selected.company.localizacao}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 6,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <Icon name={"bar-chart"} color="#f89" size={24} />
                                <Text>Porte: {selected.company.porte}</Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    gap: 6,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    alignSelf: "flex-start",
                                }}
                            >
                                <Icon name={"briefcase"} color="#f89" size={24} />
                                <Text>Setor: {selected.company.setor}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: "row", gap: 12 }}>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 6,
                                backgroundColor: "#9e1dda",
                                borderRadius: 1000,
                                borderWidth: 1,
                                borderColor: "#000",
                            }}
                            onPress={() => setSelected(undefined)}
                        >
                            <Icon name={"close"} color="#000" size={32} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems: "center",
                                justifyContent: "center",
                                padding: 6,
                                paddingHorizontal: 16,
                                backgroundColor: "#8026f7",
                                borderRadius: 1000,
                                borderWidth: 1,
                                borderColor: "#000",
                                flexDirection: "row",
                                gap: 10,
                            }}
                            onPress={() => navegar("/chat")}
                        >
                            <Icon name={"chatbox-ellipses"} color="#000" size={32} />
                            <Text style={{ fontSize: 24, color: "#fff" }}>Chat</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </ImageBackground>
    );
}

export default Matches;
