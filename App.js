import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import { NativeRouter, Route } from "react-router-native";
import Challenges from "./components/Challenges/Challenges";
import Classes from "./components/Classes/Classes";
import Home from "./components/Home/Home";
import Search from "./components/Search/Search";
import Settings from "./components/Settings/Settings";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
import Video from "./Video/Video";
import CategoryResult from "./components/CategoryResult";
import Class from "./components/Classes/Class";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import Payment from "./components/Payment";
import Challenge from "./components/Challenges/Challenge";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import Payment from "./components/Payment";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false,
	}),
});

export default function App() {
	const [expoPushToken, setExpoPushToken] = useState("");
	const [notification, setNotification] = useState(false);
	const [notificationSent, setNotifationSent] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();

	// const storeLoggedIn = async () => {
	// 	try {
	// 		await AsyncStorage.setItem("@loggedin", "no");
	// 		await AsyncStorage.removeItem("@userid");
	// 		setLoggedin(false);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	let time;

	useEffect(() => {
		// storeLoggedIn();

		registerForPushNotificationsAsync().then((token) =>
			setExpoPushToken(token)
		);

		notificationListener.current = Notifications.addNotificationReceivedListener(
			(notification) => {
				setNotification(notification);
			}
		);

		responseListener.current = Notifications.addNotificationResponseReceivedListener(
			(response) => {
				console.log(response);
			}
		);

		let x = getSavedTime();

		x.then((res) => {
			time = res.toString().substring(3, 8);
		});

		let myInterval = setInterval(() => {
			let y = new Date().toTimeString().substring(0, 5);
			if (
				time === new Date().toTimeString().substring(0, 5) &&
				!notificationSent
			) {
				sendPushNotification(expoPushToken);
				setNotifationSent(true);
				clearInterval(myInterval);
			}

			if (y === "12:00") {
				setNotifationSent(false);
			}
		}, 1000);

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(
				responseListener.current
			);
		};
	}, []);

	const getSavedTime = async () => {
		try {
			let sTime = await AsyncStorage.getItem("@savedtime");
			sTime = JSON.stringify(sTime);
			console.log(sTime);

			return sTime;
		} catch (error) {
			console.log(error);
		}
	};

	async function sendPushNotification(expoPushToken) {
		const message = {
			to: expoPushToken,
			sound: "default",
			title: "Pilates on Demand",
			body: "This is a push notification",
			data: { someData: "goes here" },
		};

		await fetch("https://exp.host/--/api/v2/push/send", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Accept-encoding": "gzip, deflate",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(message),
		});
	}

	async function registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
			const {
				status: existingStatus,
			} = await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const {
					status,
				} = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}
			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
		} else {
			alert("Must use physical device for Push Notifications");
		}

		if (Platform.OS === "android") {
			Notifications.setNotificationChannelAsync("default", {
				name: "default",
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [0, 250, 250, 250],
				lightColor: "#FF231F7C",
			});
		}

		return token;
	}

	return (
		<NativeRouter>
			<View style={{ flex: 1 }}>
				{/* <Route exact path="/" component={Payment} /> */}
				<Route exact path="/" component={SignIn} />
				<Route exact path="/h/:ps" component={Home} />
				<Route exact path="/pay/:id" component={Payment} />
				{/* <Route exact path="/" component={Payment} /> */}
				<Route path="/home/:loggedin/:id" component={Home} />
				<Route path="/classes" component={Classes} />
				<Route path="/search" component={Search} />
				<Route path="/video/:id" component={Video} />
				<Route path="/challenges" component={Challenges} />
				<Route path="/settings" component={Settings} />
				<Route path="/sign-in" component={SignIn} />
				<Route path="/register" component={Register} />
				<Route path="/category/:cat" component={CategoryResult} />
				<Route path="/class/:id" component={Class} />
				<Route path="/challenge/:id" component={Challenge} />
			</View>
		</NativeRouter>
	);
}
