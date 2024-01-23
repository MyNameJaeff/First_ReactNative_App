import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from 'react-native';

const CurrentDate = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(new Date());
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    const [date, setDate] = useState(new Date());
    const [startDate, setStartDate] = useState(new Date(date.getFullYear(), 0, 1));

    let days = Math.floor((date.getTime() - startDate.getTime()) /
        (24 * 60 * 60 * 1000));

    let weekNumber = Math.ceil((days + 1) / 7);
    let minutes = "";
    if (date.getMinutes() < 10) {
        minutes = "0" + date.getMinutes();
    } else {
        minutes = (date.getMinutes()).toString();
    }
    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{"WEEK NR." + weekNumber}</Text>
            <Text style={styles.dateText}>{date.toDateString()}</Text>
            <Text style={styles.dateText}>{date.getHours() + ":" + minutes}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 150,
        backgroundColor: 'lightblue',
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    dateText: {
        color: "purple",
        fontSize: 25,
        fontWeight: "bold",
    }
});

export default CurrentDate;