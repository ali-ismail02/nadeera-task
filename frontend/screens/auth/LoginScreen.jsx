import { ResponseType } from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";

WebBrowser.maybeCompleteAuthSession();

const FB_APP_ID = "1135604177323958";

const LoginScreen = () => {
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
                console.log(userInfo);
            })();
        }
    }, [response]);

    if (request) {
        console.log(
            "You need to add this url to your authorized redirect urls on your Facebook app: " +
            request.redirectUri
        );
    }


    const handlePressAsync = async () => {
        const result = await promptAsync();
        if (result.type !== "success") {
            alert("Uh oh, something went wrong");
            return;
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <Profile user={user} />
            ) : (
                <Button
                    disabled={!request}
                    title="Open FB Auth"
                    onPress={handlePressAsync}
                />
            )}
        </View>
    );
}

function Profile({ user }) {
    return (
        <View style={styles.profile}>
            <Image source={{ uri: user.picture.data.url }} style={styles.image} />
            <Text style={styles.name}>{user.name}</Text>
            <Text>ID: {user.id}</Text>
            <Text>Birthday: {user.birthday}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    profile: {
        alignItems: "center",
    },
    name: {
        fontSize: 20,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default LoginScreen;