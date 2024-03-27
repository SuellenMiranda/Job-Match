import { NativeRouter, Route, Routes } from "react-router-native";
import Main from "../bases/main";
import Initial from "../bases/initial";
import Home from "../pages/home";
import { View } from "react-native";
import Login from "../pages/login";
import Matches from "../pages/matches";
import Chat from "../pages/chat";
import Profile from "../pages/profile";

function Router() {
    return (
        <View style={{ flex: 1 }}>
            <NativeRouter initialEntries={["/login"]}>
                <Routes>
                    <Route element={<Initial />}>
                        <Route path="login" element={<Login />} />
                    </Route>

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
