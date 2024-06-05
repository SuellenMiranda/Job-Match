import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ImageBackground, TouchableOpacity, Alert } from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../../assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRandomImage from "../utils/getRandomImage";
import { useNavigate } from "react-router-native";

const Profile = () => {
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

    if (!user) return <></>;

    const info1 = [user.genero, user.nascimento].join(", ");

    return (
        <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bg}>
            <ScrollView style={styles.containerProfile}>
                <ImageBackground source={user.foto} style={styles.photo}>
                    <View style={[styles.top, { justifyContent: "flex-end" }]}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#fffa",
                                borderWidth: 1,
                                borderColor: "#000",
                                aspectRatio: 1,
                                borderRadius: 1000,
                                alignItems: "center",
                                justifyContent: "center",
                                marginRight: 20,
                                padding: 6,
                            }}
                            onPress={async () => {
                                const confirmation = await new Promise((res) => {
                                    Alert.alert("Confirmação", "Deseja sair da sua conta?", [
                                        { text: "Não", onPress: () => res(false) },
                                        { text: "Sim", onPress: () => res(true) },
                                    ]);
                                });

                                if (!confirmation) return;

                                await AsyncStorage.removeItem("userStorage");
                                navegar("/");
                            }}
                        >
                            <Icon name="exit" size={24} color={"#000"} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <ProfileItem
                    name={user.nomeCompleto}
                    age={user.nascimento}
                    location={user.endereco}
                    info1={info1}
                    info2={user.habilidades}
                    info3={user.experiencia}
                />

                <View style={styles.actionsProfile}>
                    <TouchableOpacity
                        style={styles.roundedButton}
                        onPress={() => navegar("/profile/edit")}
                    >
                        <Icon name="settings" size={20} color={WHITE} />
                        <Text style={styles.textButton}>Editar perfil</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Profile;
