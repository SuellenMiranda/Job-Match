import { TouchableOpacity, View, Text } from "react-native";
import styles from "./styles";
import { Outlet, useNavigate } from "react-router-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "../../utils/constants";
import { useState } from "react";

const navBtns = [
    { label: "Explorar", icon: "compass", link: "/home" },
    { label: "Matches", icon: "heart", link: "/matches" },
    { label: "Chat", icon: "chatbox", link: "/chat" },
    { label: "Perfil", icon: "person-circle", link: "/profile" },
];

function Main() {
    const navigate = useNavigate();

    const [index, setIndex] = useState(0);

    return (
        <View style={styles.container}>
            <Outlet />

            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 4,
                    padding: 12,
                    backgroundColor: "#fff",
                }}
            >
                {navBtns.map(({ icon, label, link }, i) => (
                    <TouchableOpacity
                        key={link}
                        onPress={() => {
                            setIndex(i);
                            navigate(link);
                        }}
                        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
                    >
                        <Ionicons
                            name={icon as any}
                            style={{
                                fontSize: 22,
                                color: index === i ? Constants.PRIMARY_COLOR1 : "#000",
                            }}
                        />
                        <Text style={{ fontSize: 16 }}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default Main;
