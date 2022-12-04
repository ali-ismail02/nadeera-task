import { DrawerItem } from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { deleteUser } from '../../redux/slices/userSlice';
import { store } from '../../redux/store';
import styles from './styles';
import Icon from 'react-native-vector-icons/Feather';

const CustomDrawer = (props: any) => {
    const [uri, setUri] = useState('');

    const TopSection = () => {

        const user = useSelector((state: any) => state?.user);
        const image = user?.userProfile.image;

        return (
            <View style={styles.topSection}>
                <Image source={{ uri: image }} style={styles.imageProfile} />
                <View style={styles.nameContainer}>
                    <Text numberOfLines={1} style={styles.title}>{user?.userProfile.name}</Text>
                </View>
            </View>
        )
    }
    const user = useSelector((state: any) => state?.user);
    // const dispatch = useDispatch()
    return (
        <ScrollView bounces={false} style={styles.main}>
            <TopSection />
            <View style={styles.container}>
                <View>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon name="log-out" color={"#FF9E0D"} size={24} />
                        )}
                        label="Logout"
                        labelStyle={{
                            color: "#FF9E0D",
                        }}
                        onPress={() => {
                            store.dispatch(deleteUser())
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
};

export default CustomDrawer;
