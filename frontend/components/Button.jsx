import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = ({ onPress, text = "LOGIN WITH FACEBOOK" }) => {

    const style = {
        // facebook button style
        backgroundColor: '#3b5998',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 300,
        alignItems: 'center',
        marginBottom: 150,
    };

    const textStyle = {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    };

    return (
        <TouchableOpacity style={style} onPress={onPress} >
            <Text style={textStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

export default Button;