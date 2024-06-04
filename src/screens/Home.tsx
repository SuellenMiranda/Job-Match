import React, { useEffect, useState } from "react";
import { View, ImageBackground, Alert } from "react-native";
import CardStack, { Card } from "@starodubenko/react-native-card-stack-swiper";
import { City, Filters, CardItem } from "../components";
import styles from "../../assets/styles";
import DEMO from "../../assets/data/demo";
import axios from "axios";
import { Text } from "react-native";

type ExploreData = {
    id: number;
    name: string;
    description: string;
    picture?: string;
};

const Home = () => {
    const [exploreData, setExploreData] = useState<ExploreData[]>();

    useEffect(() => {
        axios
            .get("/company/explore")
            .then((res) => setExploreData(res.data))
            .catch((err) => {
                console.error(err?.response?.data || err);

                const mensagem = err?.response?.data?.message;
                Alert.alert(
                    "Erro ao buscar as empresas disponíveis",
                    mensagem || "Erro inesperado"
                );
            });
    }, []);

    return (
        <ImageBackground source={require("../../assets/images/bg.png")} style={styles.bg}>
            <View style={styles.containerHome}>
                <View style={styles.top}>
                    <City />
                    <Filters />
                </View>

                {exploreData ? (
                    exploreData.length ? (
                        <CardStack loop verticalSwipe={false} renderNoMoreCards={() => null}>
                            {exploreData.map((item) => (
                                <Card key={item.id}>
                                    <CardItem
                                        hasActions
                                        image={item.picture}
                                        name={item.name}
                                        description={item.description}
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
