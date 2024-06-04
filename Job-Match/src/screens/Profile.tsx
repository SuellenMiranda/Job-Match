import React, { useEffect, useState } from "react";
import { ScrollView, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { Icon, ProfileItem } from "../components";
import styles, { WHITE } from "../../assets/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getRandomImage from "../utils/getRandomImage";

const Profile = () => {
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
                    <View style={styles.top}>
                        <TouchableOpacity
                            style={{
                                backgroundColor: "#fffa",
                                borderWidth: 1,
                                borderColor: "#000",
                                aspectRatio: 1,
                                borderRadius: 1000,
                                alignItems: "center",
                                justifyContent: "center",
                                marginLeft: 20,
                                padding: 6,
                            }}
                        >
                            <Icon name="chevron-back" size={24} color={"#000"} />
                        </TouchableOpacity>

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
                        >
                            <Icon name="ellipsis-vertical" size={24} color={"#000"} />
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
                    <TouchableOpacity style={styles.circledButton}>
                        <Icon name="ellipsis-horizontal" size={20} color={WHITE} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.roundedButton}>
                        <Icon name="chatbubble" size={20} color={WHITE} />
                        <Text style={styles.textButton}>Start chatting</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default Profile;
