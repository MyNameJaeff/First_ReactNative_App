import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image, Pressable } from 'react-native';
import axios, * as others from "axios";

function WeatherDisplay({ weatherObject, cityName }: { weatherObject: any, cityName: string }) {
    if (weatherObject === null) {
        return <Text>Weather is null</Text>;
    } else {
        const weatherList = weatherObject.list;
        const currentWeather = weatherList.pop();

        return (
            <View style={styles.weatherContainer}>
                <View style={styles.weatherheader}>
                    <View>
                        <Text style={styles.cityName}>{cityName}</Text>
                        <Text style={styles.textDivs}>{currentWeather.weather[0].description}</Text>
                    </View>
                    <Image style={{ width: 100, height: 100 }}
                        source={{ uri: 'https://openweathermap.org/img/w/' + currentWeather.weather[0].icon + '.png' }}
                        resizeMode={'cover'} />
                </View>
                <View style={styles.weatherBody}>
                    <View>
                        <Text style={styles.bigTemp}>{currentWeather.main.temp + "°C"}</Text>
                    </View>
                    <View>
                        <Text style={styles.detailHeader}>Details</Text>
                        <Text style={styles.textDivs}>{"Feels like: " + currentWeather.main.feels_like + "°C"}</Text>
                        <Text style={styles.textDivs}>{"Wind speed: " + currentWeather.wind.speed + "m/s"}</Text>
                        <Text style={styles.textDivs}>{"Humidity: " + currentWeather.main.humidity + "%"}</Text>
                        <Text style={styles.textDivs}>{"Pressure: " + currentWeather.main.pressure + "hPa"}</Text>
                    </View>
                </View>
                <View style={styles.weatherFooter}>
                    <Image style={{ width: 100, height: 40 }}
                        source={{ uri: 'https://home.openweathermap.org/assets/logo_white-12c4f864cc825cfead13b43f6fdae14172bb7848529cb9f48374b9ebb0e9f061.png' }}
                        resizeMode={'cover'} />
                    <Text style={styles.textDivs}>{currentWeather.dt_txt}</Text>
                </View>
            </View>
        );
    }
}

const WeatherScreen = ({ navigation, route }: { navigation: any, route: any }) => {
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setErrorFlag] = useState(false);

    let cityName = "Stockholm";

    useEffect(() => {
        const abortController = new AbortController();
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=7285fa6b5bfe84a02e4ebf60e8efb9ce&units=metric`

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await axios(url, {
                    signal: abortController.signal
                });
                if (result.status === 200) {
                    setIsLoading(false);
                    setWeather(result.data);
                    return;
                } else {
                    throw new Error("Could not fetch data");
                }
            }
            catch (error) {
                if (abortController.signal.aborted) {
                    console.log("Data fetching cancelled");
                } else {
                    setErrorFlag(true);
                    setIsLoading(false);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {!isLoading && !hasError && <WeatherDisplay weatherObject={weather} cityName={cityName}></WeatherDisplay>}
            <Pressable onPress={() => navigation.goBack()} style={styles.homeBtn} >
                <Text style={styles.btnText}>Home</Text>
            </Pressable>
        </View>);
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#b53e3e',
        flex: 1,
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
    },
    weatherContainer: {
        backgroundColor: '#f5c259',
        alignSelf: "stretch",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
    },
    homeBtn: {
        backgroundColor: "lightgrey",
        width: 150,
        height: 100,
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
    },
    btnText: {
        fontSize: 25,
        fontWeight: "bold",
    },
    weatherheader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "stretch",
    },
    weatherBody: {
        padding: 10,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "stretch",
    },
    weatherFooter: {
        padding: 10,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        alignSelf: "stretch",
    },
    bigTemp: {
        color: "black",
        fontSize: 45,
        fontWeight: "bold",
    },
    cityName: {
        color: "black",
        fontSize: 25,
        fontWeight: "bold",
    },
    detailHeader: {
        color: "black",
        borderBottomWidth: 1,
        borderBottomColor: "turquoise",
    },
    textDivs: {
        color: "black",
    }
});

export default WeatherScreen;