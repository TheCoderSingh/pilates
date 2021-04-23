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
import Constants from "expo-constants";
import Payment from "./components/Payment";
import Challenge from "./components/Challenges/Challenge";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
	// const storeLoggedIn = async () => {
	// 	try {
	// 		await AsyncStorage.setItem("@loggedin", "no");
	// 		await AsyncStorage.removeItem("@userid");
	// 		setLoggedin(false);
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	useEffect(() => {
		// storeLoggedIn();
	}, []);

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
