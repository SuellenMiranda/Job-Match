import { NativeRouter, Route, Routes, useLocation, useNavigate } from "react-router-native";
import Main from "../bases/main";
import Initial from "../bases/initial";
import Home from "../screens/Home";
import { Alert, BackHandler, View } from "react-native";
import Matches from "../screens/Matches";
import Messages from "../screens/Messages";
import Profile from "../screens/Profile";
import Chat from "../screens/Chat";
import EditProfile from "../screens/EditProfile";
import { useEffect } from "react";

function RouterManager() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const backAction = () => {
            if (location.pathname === "/home") {
                Alert.alert("Sair do App?", "", [
                    { text: "Cancelar" },
                    { text: "Sim", onPress: BackHandler.exitApp },
                ]);
            } else {
                navigate(-1);
            }

            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();
    }, [location?.state?.from]);

    return (
        <Routes>
            <Route index element={<Initial />} />

            <Route element={<Main />}>
                <Route path="home" element={<Home />} />
                <Route path="matches" element={<Matches />} />
                <Route path="chat" element={<Messages />} />
                <Route path="chat/:id" element={<Chat />} />
                <Route path="profile" element={<Profile />} />
                <Route path="profile/edit" element={<EditProfile />} />
            </Route>
        </Routes>
    );
}

function Router() {
    return (
        <View style={{ flex: 1 }}>
            <NativeRouter>
                <RouterManager />
            </NativeRouter>
        </View>
    );
}

export default Router;
