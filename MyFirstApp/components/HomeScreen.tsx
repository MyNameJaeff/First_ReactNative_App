import React from "react";
import { View, StyleSheet } from 'react-native';

import NavButton from './NavButton';
import CurrentDate from './CurrentDate';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View style={styles.container}>
            <CurrentDate></CurrentDate>
            <NavButton route={"Weather"} navigation={navigation}></NavButton>
            <NavButton route={"News"} navigation={navigation}></NavButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1,
        backgroundColor: '#fff',
    }
});

export default HomeScreen;