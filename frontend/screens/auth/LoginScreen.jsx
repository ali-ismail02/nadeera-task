import { useNavigation } from '@react-navigation/core';
import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { ImageBackground, LogBox, Text } from "react-native";
import Button from "../../components/Button";
import Post from "../../hooks/Post";
import { updateUserProfile } from "../../redux/slices/userSlice";
import { store } from '../../redux/store';
import styles from "../../styles/styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debug } from 'react-native-reanimated';

LogBox.ignoreAllLogs(true)

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "1135604177323958";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: FB_APP_ID,
        responseType: ResponseType.Token,
    });
    const login = async (userInfo) => {
        const res = await Post("auth/login", { email: userInfo.email });
        const response = res.data;
        store.dispatch(updateUserProfile({
            userProfile: {
                token: "Bearer " + response.token,
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                image: response.user.image,
                dob: response.user.date_of_birth,
            }
        }));
    }

    React.useEffect(() => {
        const checkIfLogged = async () => {
            const user = await AsyncStorage.getItem("userProfile");
            if (user) {
                await login(JSON.parse(user));
            }
        }
        checkIfLogged();
        if (response && response.type === "success" && response.authentication) {
            (async () => {
                const userInfoResponse = await fetch(
                    `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large),birthday,email`
                );
                const userInfo = await userInfoResponse.json();
                const isUser = await Post("auth/check-email", { email: userInfo.email });
                if (isUser.data.status === "error") {
                    await login(userInfo);
                }
                await AsyncStorage.setItem("tempPorfile", JSON.stringify(userInfo));
                navigation.navigate("RegisterScreen");
            })();
        }
    }, [response]);

    const handlePressAsync = async () => {
        const result = await promptAsync();
        if (result.type !== "success") {
            alert("Uh oh, something went wrong");
            return;
        }
    };

    return (
        <ImageBackground style={styles.ImageBackground} source={require('../../assets/background.jpg')}>
            <Text style={styles.title}>Nadeera Notes</Text>
            <Button onPress={handlePressAsync} />
        </ImageBackground>
    );
}

export default LoginScreen;