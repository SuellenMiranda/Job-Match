import { NativeRouter, Route, Routes } from "react-router-native";
import Main from "../bases/main";
import Initial from "../bases/initial";
import Home from "../screens/Home";
import { View } from "react-native";
import Matches from "../screens/Matches";
import Chat from "../screens/Messages";
import Profile from "../screens/Profile";

function Router() {
    return (
        <View style={{ flex: 1 }}>
            <NativeRouter>
                <Routes>
                    <Route index element={<Initial />} />

                    <Route element={<Main />}>
                        <Route path="home" element={<Home />} />
                        <Route path="matches" element={<Matches />} />
                        <Route path="chat" element={<Chat />} />
                        <Route path="profile" element={<Profile />} />
                    </Route>
                </Routes>
            </NativeRouter>
        </View>
    );
}

export default Router;
