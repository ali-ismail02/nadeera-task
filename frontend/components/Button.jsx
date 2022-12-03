import React from 'react';
import { Text, TouchableOpacity } from 'react-native';


const Button = ({ onPress }) => {

    const style = {
        // facebook button style
        backgroundColor: '#3b5998',
        borderRadius: 5,
        padding: 10,
        margin: 10,
        width: 200,
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',

    };

    return (
        <TouchableOpacity style={style} onPress={onPress} >
            <Text style={textStyle}>LOGIN WITH FACEBOOK</Text>
        </TouchableOpacity>
    );
};

export default Button;