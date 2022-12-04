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

LogBox.ignoreAllLogs(true)

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "1135604177323958";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = React.useState(null);
    // Request
    const [request, response, promptAsync] = Facebook.useAuthRequest({
        clientId: FB_APP_ID,
        responseType: ResponseType.Token,
    });

    React.useEffect(() => {
        if (response && response.type === "success" && response.authentication) {
            (async () => {
                const userInfoResponse = await fetch(
                    `https://graph.facebook.com/me?access_token=${response.authentication.accessToken}&fields=id,name,picture.type(large),birthday,email`
                );
                const userInfo = await userInfoResponse.json();
                setUser(userInfo);
                const isUser = await Post("auth/check-email", {email: userInfo.email});
                console.log(isUser.data);
                if (isUser.data.status === "error") {
                    const res = await Post("users/login", {email: userInfo.email});
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

// function Profile({ user }) {
//     return (
//         <View style={styles.profile}>
//             <Image source={{ uri: user.picture.data.url }} style={styles.image} />
//             <Text style={styles.name}>{user.name}</Text>
//             <Text>ID: {user.id}</Text>
//             <Text>Birthday: {user.birthday}</Text>
//         </View>
//     );
// }
export default LoginScreen;