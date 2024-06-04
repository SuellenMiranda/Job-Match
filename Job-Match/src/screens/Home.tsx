import React, { useEffect, useState } from "react";
import { View, ImageBackground, Alert } from "react-native";
import CardStack, { Card } from "@starodubenko/react-native-card-stack-swiper";
import { City, Filters, CardItem } from "../components";
import styles from "../../assets/styles";
import axios from "axios";
import { Text } from "react-native";
import getRandomImage from "../utils/getRandomImage";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ExploreData = {
    id: number;
    nomeFantasia: string;
    descricao: string;
    foto?: string;
};

const Home = () => {
    const [exploreData, setExploreData] = useState<ExploreData[]>();
    const [user, setUser] = useState<any>();

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
            .get(`/company/explore/${user.id}`)
            .then((res) =>
                setExploreData(res.data.map((d: any) => ({ ...d, foto: getRandomImage() })))
            )
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert(
                    "Erro ao buscar as empresas disponíveis",
                    mensagem || "Erro inesperado"
                );
            });
    }, [user]);

    const onLeft = (id: number) => {
        const empresa = exploreData![id];

        axios.post("/match", { empresaId: empresa.id, userId: user.id });
    };

    return (
        <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bg}>
            <View style={styles.containerHome}>
                <View style={styles.top}>
                    <City localizacao={user?.endereco} />
                    <Filters />
                </View>

                {exploreData ? (
                    exploreData.length ? (
                        <CardStack
                            loop
                            verticalSwipe={false}
                            renderNoMoreCards={() => null}
                            onSwipedLeft={onLeft}
                        >
                            {exploreData.map((item) => (
                                <Card key={item.id}>
                                    <CardItem
                                        hasActions
                                        image={item.foto}
                                        name={item.nomeFantasia}
                                        description={item.descricao}
                                        matches={Math.floor(Math.random() * 100).toFixed(0)}
                                    />
                                </Card>
                            ))}
                        </CardStack>
                    ) : (
                        <Text style={{ alignSelf: "center", marginTop: 50, fontSize: 16 }}>
                            Nenhuma empresa disponível!
                        </Text>
                    )
                ) : (
                    <Text style={{ alignSelf: "center", marginTop: 50, fontSize: 16 }}>
                        Carregando seus dados...
                    </Text>
                )}
            </View>
        </ImageBackground>
    );
};

export default Home;
