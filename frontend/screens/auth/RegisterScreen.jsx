import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View } from "react-native";
import Button from "../../components/Button";
import Post from "../../hooks/Post";
import { updateUserProfile } from "../../redux/slices/userSlice";
import { store } from '../../redux/store';
import styles from "../../styles/styles";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [dob, setDob] = useState(new Date());
    const [dateString, setDateString] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const getUser = async () => {
            // get the user saved in login screen
            const user = await AsyncStorage.getItem("tempPorfile");
            const userInfo = JSON.parse(user);
            setName(userInfo.name);
            if (userInfo.birthday) {
                const dob = new Date(userInfo.birthday);
                setDob(dob);
            }
            setImage(userInfo.picture.data.url);
            setEmail(userInfo.email);
        }
        getUser();
    }, []);

    // formatting date on update
    useEffect(() => {
        const date = dob.getDate();
        const month = dob.getMonth() + 1;
        const year = dob.getFullYear();
        setDateString(`${date}/${month}/${year}`);
    }, [dob]);

    const register = async () => {
        // check if the user has entered all the details
        if(name === "" || dateString === "" || email === "" || image === "") {
            setError("Please fill all fields");
            return;
        }
        // register user in backend
        const res = await Post("user/signup", {name, date_of_birth: `${dob.getFullYear()}-${dob.getMonth()+1}-${dob.getDate()}`, image, email});
        const response = res.data;
        store.dispatch(updateUserProfile({
            userProfile: {
                token: "Bearer " + response.token,
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
                image: response.data.image,
                dob: response.data.date_of_birth,
            }
        }));
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDob(currentDate);
    };

    // open date picker
    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: dob,
            onChange,
            mode: currentMode,
            is24Hour: true,
            minimumDate: new Date(1900, 0, 1),
            maximumDate: new Date(),
        });
    };

    const showDatepicker = () => {
        showMode('date');
    };

    // open image picker
    const handleImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            base64: true,
        }).then((result) => {
            if (!result.cancelled) {
                setLicense("data:image/jpeg;base64," + result.base64);
                setImage({ uri: result.uri });
            }
        });
    }

    return (
        <ImageBackground source={require('../../assets/background.jpg')} style={styles.ImageBackground}>
            <Text style={styles.title}>Register</Text>
            <View style={styles.registerView}>
                <TouchableOpacity onPress={handleImage}>
                    <Image source={{ uri: image }} style={styles.registerImage} />
                </TouchableOpacity>
                <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
                <TouchableOpacity onPress={showDatepicker}>
                    <TextInput style={styles.input} placeholder="Date of Birth" value={dateString} editable={false}/>
                </TouchableOpacity>
                <Text style={styles.error}>{error}</Text>
            </View>
            <Button text="REGISTER" onPress={register} />
        </ImageBackground>
    )

};

export default RegisterScreen;