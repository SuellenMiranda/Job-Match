import { NativeRouter, Route, Router, Routes } from "react-router-native";
import Main from "../bases/main";
import Initial from "../bases/initial";
import Home from "../pages/home";

function router() {
    return (
        <NativeRouter>
            <Routes location={"login"}>
                <Route element={<Initial />}>
                    <Route path="login" element={<Home />} />
                    <Route path="resetPassword" element={<Home />} />
                </Route>

                <Route element={<Main />}>
                    <Route path="home" element={<Home />} />
                    <Route path="matches" element={<Home />} />
                    <Route path="chat" element={<Home />} />
                    <Route path="profile" element={<Home />} />
                </Route>
            </Routes>
        </NativeRouter>
    );
}

export default router;
