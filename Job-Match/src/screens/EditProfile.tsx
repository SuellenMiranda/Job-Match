import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Image } from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../../assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRandomImage from "../utils/getRandomImage";
import { useNavigate } from "react-router-native";
import Constants from "../utils/constants";
import axios from "axios";

const EditProfile = () => {
    const navegar = useNavigate();

    const [user, setUser] = useState<any>();

    useEffect(() => {
        AsyncStorage.getItem("userStorage").then((d) => {
            if (!d) throw new Error("User storage não foi encontrado");
            const user = JSON.parse(d);
            user.foto = getRandomImage();
            setUser(user);
        });
    }, []);

    const submitEdit = () => {
        axios;
    };

    if (!user) return <></>;

    return (
        <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bg}>
            <ScrollView
                contentContainerStyle={{
                    alignItems: "center",
                    gap: 16,
                    paddingHorizontal: 10,
                    paddingVertical: "10%",
                }}
            >
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    Editar Perfil
                </Text>

                <View
                    style={{
                        width: "40%",
                        alignSelf: "center",
                        padding: 4,
                        borderRadius: 1000,
                        backgroundColor: "#fff",
                        elevation: 4,
                        position: "relative",
                    }}
                >
                    <Image
                        source={user.foto}
                        style={{
                            width: "100%",
                            aspectRatio: 1,
                            height: undefined,
                            borderRadius: 1000,
                        }}
                    />

                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            bottom: "6%",
                            right: "6%",
                            backgroundColor: "#fff",
                            borderRadius: 1000,
                            padding: 6,
                            elevation: 3,
                        }}
                    >
                        <Icon name={"camera"} size={24} color="#222" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        width: "80%",
                        elevation: 3,
                        gap: 8,
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ textAlign: "center" }}>{user.nomeCompleto}</Text>
                    <Text style={{ textAlign: "center" }}>{user.nascimento}</Text>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: -16,
                            backgroundColor: "#fafafa",
                            elevation: 3,
                            borderRadius: 1000,
                            padding: 6,
                        }}
                    >
                        <Icon name={"pencil"} size={24} color={"#5636B8"} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        width: "80%",
                        elevation: 3,
                        gap: 8,
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ textAlign: "center" }}>{user.celular}</Text>
                    <Text style={{ textAlign: "center" }}>{user.email}</Text>
                    <Text style={{ textAlign: "center" }}>{user.endereco}</Text>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: -16,
                            backgroundColor: "#fafafa",
                            elevation: 3,
                            borderRadius: 1000,
                            padding: 6,
                        }}
                    >
                        <Icon name={"pencil"} size={24} color={"#5636B8"} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        width: "80%",
                        elevation: 3,
                        gap: 8,
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ textAlign: "center" }}>{user.habilidades}</Text>
                    <Text style={{ textAlign: "center" }}>{user.experiencia}</Text>
                    <Text style={{ textAlign: "center" }}>{user.formacao}</Text>
                    <Text style={{ textAlign: "center" }}>{user.areaInteresse}</Text>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: -16,
                            backgroundColor: "#fafafa",
                            elevation: 3,
                            borderRadius: 1000,
                            padding: 6,
                        }}
                    >
                        <Icon name={"pencil"} size={24} color={"#5636B8"} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        backgroundColor: "#fff",
                        borderRadius: 24,
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        width: "80%",
                        elevation: 3,
                        gap: 8,
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Text style={{ textAlign: "center" }}>Senha</Text>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: -16,
                            backgroundColor: "#fafafa",
                            elevation: 3,
                            borderRadius: 1000,
                            padding: 6,
                        }}
                    >
                        <Icon name={"pencil"} size={24} color={"#5636B8"} />
                    </TouchableOpacity>
                </TouchableOpacity>

                <View style={styles.actionsProfile}>
                    <TouchableOpacity style={styles.roundedButton} onPress={() => navegar("/profile")}>
                        <Icon name="save" size={20} color={WHITE} />
                        <Text style={styles.textButton}>Salvar Alterações</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default EditProfile;
