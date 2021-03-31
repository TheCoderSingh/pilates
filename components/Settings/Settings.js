import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	AsyncStorage,
	ActivityIndicator
} from "react-native";
import Footer from "../Footer/Footer";
import logo from "../../assets/logo.png";
import { Link } from "react-router-native";
import axios from "axios";
import { conf } from "../../config/config";
import { ListItem, Avatar } from 'react-native-elements'

const deviceWidth = Dimensions.get("window").width;

const Settings = () => {
	const [user, setUser] = useState([]);
	const [useraddress, setAddress] = useState([]);
	const [loggedin, setLoggedin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [userdata, setUserData] = useState(false);

	useEffect(() => {
		let loggedInId="";
		async function retrieveData() {
			const uid = await AsyncStorage.getItem("@userid");
			loggedInId=uid;
			console.log("ud",uid)
			console.log("log id",loggedInId);
			if (loggedInId!="" && loggedInId!=null) {
				const id=loggedInId!=""?loggedInId:props.match.params.loggedin;
				console.log("login in",id);
				setLoggedin(true);
				setIsLoading(true);
				axios({
					method: "post",
					url: conf.backendUrl+"/user",
					headers: {
						"Content-Type": "application/json",
						Authorization:
							"8P~8HtbJ[azS5tUQc.j@^)c|f>]XzUf6=3?JYYq!5`)Hc33_",
					},
					data: {
						user_id: id,
					},
				})
					.then((response) => {
						// console.log(response.data)
						setUser(response.data);
						setAddress(response.data.address);
						setIsLoading(false);
					})
					.then(() => {
						setLoggedin(true);
					})
					.catch((error) => {
						console.log(error);
					});
			}
		}
		retrieveData();
	}, []);

	const getLoggedIn = async () => {
		try {
			const loggedin = await AsyncStorage.getItem("@loggedin");
			if (loggedin === "yes") return true;
			else return false;
		} catch (error) {
			console.log(error);
			return false;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<Image source={logo} style={styles.logo} />
				<View
					style={{
						height: 120,
						width: 120,
						backgroundColor: "#EFA7A1",
						borderRadius: 100,
					}}
				></View>
				{isLoading ? (
					<View>
						<ActivityIndicator size="large" color="#EFA7A1" />
						</View>
					) : ( null)}
				{loggedin ? (
					<>
					<View style={styles.content}>
					<View style={styles.setting}>
						<Text style={styles.settingText}>
							Name
						</Text>
						<Text >{user.first_name} {user.last_name}</Text>
					</View>
					<View style={styles.settingRes}>
						<Text style={styles.settingText}>Username</Text>
						<Text>{user.username}</Text>
					</View>
				</View>	
				<View style={styles.content}>
					<View style={styles.setting}>
						<Text style={styles.settingText}>
							Email
						</Text>
						<Text >{user.email}</Text>
					</View>
					<View style={styles.settingRes}>
						<Text style={styles.settingText}>Registered On</Text>
						<Text>{user.registered}</Text>
					</View>
				</View>
				<View style={styles.content}>
					<View style={styles.setting}>
						<Text style={styles.settingText}>
							Address
						</Text>
						<Text >{useraddress.one} {useraddress.city}, {useraddress.state}</Text>
						<Text >{useraddress.country}, {useraddress.zip} </Text>
					</View>
				</View>
				</>

				): (
					<View style={styles.buttons}>
						<Link to="/sign-in" style={styles.button}>
							<Text style={styles.buttonText}>Sign In</Text>
						</Link>
						<Link to="/register" style={styles.button}>
							<Text style={styles.buttonText}>Register</Text>
						</Link>
					</View>
				) }
				{/* <View style={styles.content}>
					<View style={styles.setting}>
						<Text style={styles.settingText}>
							Membership Status
						</Text>
						<Text style={styles.settingText}>Notifications</Text>
					</View>

					<View style={styles.settingRes}>
						<Text style={styles.settingText}>Not a Member Yet</Text>
						<Text style={styles.settingText}>Active</Text>
					</View>
				</View> */}
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Settings;

const styles = StyleSheet.create({
	logo: {
		marginTop: 50,
		width: deviceWidth - 100,
		resizeMode: "contain",
	},
	buttons: {
		flexDirection: "row",
	},
	button: {
		marginTop: 30,
		padding: 15,
		borderWidth: 1,
		borderColor: "#EFA7A1",
		width: 120,
		alignItems: "center",
		marginHorizontal: 10,
	},
	buttonText: {
		color: "#EFA7A1",
	},
	content: {
		marginTop: 30,
		width: deviceWidth - 100,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	settingText: {
		marginVertical: 5,
		color: "#EFA7A1",
		fontSize: 16,
	},
});
