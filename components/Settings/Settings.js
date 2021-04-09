import React, { useEffect, useState } from "react";
import {
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	ActivityIndicator,
} from "react-native";
import Footer from "../Footer/Footer";
import logo from "../../assets/logo.png";
import { Link } from "react-router-native";
import axios from "axios";
import { conf } from "../../config/config";
import { ListItem, Avatar } from "react-native-elements";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const Settings = () => {
	const [user, setUser] = useState([]);
	const [useraddress, setAddress] = useState([]);
	const [loggedin, setLoggedin] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	// const [userdata, setUserData] = useState(false);
	const [time, setTime] = useState(new Date());
	const [show, setShow] = useState(false);

	const [savedTime, setSaved] = useState();

	useEffect(() => {
		let loggedInId = "";
		async function retrieveData() {
			const uid = await AsyncStorage.getItem("@userid");
			loggedInId = uid;

			if (loggedInId != "" && loggedInId != null) {
				const id =
					loggedInId != "" ? loggedInId : props.match.params.loggedin;

				setLoggedin(true);
				setIsLoading(true);
				axios({
					method: "post",
					url: conf.backendUrl + "/user",
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
						let x = getSavedTime();
						x.then((res) => {
							setSaved(res.toString().substring(3, 8));
						});
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

	const storeLoggedIn = async () => {
		try {
			await AsyncStorage.setItem("@loggedin", "no");
			await AsyncStorage.removeItem("@userid");
			setLoggedin(false);
		} catch (error) {
			console.log(error);
		}
	};

	const onChangeTime = (event, selectedTime) => {
		const currentTime = selectedTime || time;
		setShow(Platform.OS === "ios");
		setTime(currentTime);
		setSavedTime(currentTime.toString().substring(16, 21));
	};

	const setSavedTime = async (currentTime) => {
		try {
			await AsyncStorage.setItem(
				"@savedtime",
				JSON.stringify(currentTime)
			);
		} catch (error) {
			console.log(error);
		}
	};

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

	return (
		<View style={{ flex: 1 }}>
			<ScrollView
				contentContainerStyle={{ alignItems: "center", height: "100%" }}
			>
				<Image source={logo} style={styles.logo} />
				{isLoading ? (
					<View>
						<ActivityIndicator size="large" color="#EFA7A1" />
					</View>
				) : null}
				{loggedin ? (
					<>
						<View style={styles.content}>
							<View style={styles.setting}>
								<Text style={styles.settingText}>Name</Text>
								<Text>
									{user.first_name} {user.last_name}
								</Text>
							</View>
							<View style={styles.setting}>
								<Text style={styles.settingText}>Username</Text>
								<Text>{user.username}</Text>
							</View>
							<View style={styles.setting}>
								<Text style={styles.settingText}>Email</Text>
								<Text>{user.email}</Text>
							</View>
							<View style={styles.setting}>
								<Text style={styles.settingText}>
									Registered On
								</Text>
								<Text>{user.registered}</Text>
							</View>
							<View style={styles.setting}>
								<Text style={styles.settingText}>Address</Text>
								<View style={{ flexDirection: "column" }}>
									<Text>{useraddress.one}</Text>
									<Text>
										{useraddress.city}, {useraddress.state}
									</Text>
									<Text>
										{useraddress.country}, {useraddress.zip}{" "}
									</Text>
								</View>
							</View>
						</View>

						<View style={styles.content}></View>
						<View style={{ marginTop: 70 }}>
							<Text style={{ fontSize: 20 }}>
								Get reminders at:{" "}
								{savedTime ? (
									savedTime
								) : (
									<Text style={{ color: "#888" }}>
										No time selected
									</Text>
								)}
							</Text>
							<Button
								onPress={() => {
									setShow(true);
								}}
								title="Select Time"
							/>
							{show && (
								<DateTimePicker
									testID="dateTimePicker"
									value={time}
									mode="time"
									is24Hour={true}
									display="inline"
									onChange={onChangeTime}
								/>
							)}
						</View>
						<TouchableOpacity
							style={{
								backgroundColor: "#EFA7A1",
								width: deviceWidth,
								height: 50,
								alignItems: "center",
								justifyContent: "center",
								position: "absolute",
								bottom: 10,
							}}
							onPress={() => {
								try {
									storeLoggedIn();
									return true;
								} catch (error) {
									return false;
								}
							}}
						>
							<Text>Logout</Text>
						</TouchableOpacity>
					</>
				) : (
					<View style={styles.buttons}>
						<Link to="/sign-in" style={styles.button}>
							<Text style={styles.buttonText}>Sign In</Text>
						</Link>
						<Link to="/register" style={styles.button}>
							<Text style={styles.buttonText}>Register</Text>
						</Link>
					</View>
				)}
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
		// flexDirection: "row",
	},
	button: {
		marginTop: 30,
		padding: 15,
		// borderWidth: 1,
		// borderColor: "#EFA7A1",
		backgroundColor: "#EFA7A1",
		width: deviceWidth - 80,
		alignItems: "center",
		marginHorizontal: 10,
	},
	buttonText: {
		color: "#FFF",
	},
	content: {
		marginTop: 30,
		alignItems: "flex-start",
		// flexDirection: "row",
		// justifyContent: "space-between",
	},
	settingText: {
		marginVertical: 5,
		color: "#EFA7A1",
		fontSize: 16,
		marginRight: 10,
	},
	setting: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 20,
	},
});
