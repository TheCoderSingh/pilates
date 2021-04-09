import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from "react-native";
import Footer from "./Footer/Footer";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { Link } from "react-router-native";
import { conf } from "../config/config";
import Back from "./Back/Back";

const deviceWidth = Dimensions.get("window").width;

const CategoryResult = (props) => {
	const [videos, setVideos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		axios
			.get(conf.apiUrl + "/search-videos/" + props.match.params.cat)
			.then((response) => {
				setVideos(response.data);
			})
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	}, []);

	return (
		<View style={{ flex: 1 }}>
			{/* <View style={styles.backArea}>
				<Link to="/">
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<Icon
							name="chevron-back-outline"
							size={30}
							style={{ color: "#EFA7A1" }}
						/>
						<Text style={styles.backTxt}>Home</Text>
					</View>
				</Link>
			</View> */}
			<Back text="Home" code="" />
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				<Text style={styles.categoryName}>
					{props.match.params.cat}
				</Text>
				<View style={styles.videos}>
					{isLoading ? (
						<View>
							<ActivityIndicator size="large" color="#EFA7A1" />
							<Text style={{ marginTop: 20 }}>
								Loading Videos...
							</Text>
						</View>
					) : (
						videos.map((video) => {
							// return (
							// 	<Link
							// 		to={"video/" + video.uri.substring(8)}
							// 		key={video.uri.substring(8)}
							// 	>
							// 		<View
							// 			key={video.uri.substring(8)}
							// 			style={styles.video}
							// 		>
							// 			<Image
							// 				source={{
							// 					uri: video.pictures.sizes[4].link.slice(
							// 						0,
							// 						-6
							// 					),
							// 				}}
							// 				style={styles.thumbnail}
							// 			/>
							// 			<Text>{video.name}</Text>
							// 		</View>
							// 	</Link>
							// );
							return (
								<Link
									to={"/video/" + video.uri.substring(8)}
									key={video.uri.substring(8)}
									underlayColor="none"
								>
									<View
										key={video.uri.substring(8)}
										style={styles.video}
									>
										<Image
											source={{
												uri: video.pictures.sizes[4].link.slice(
													0,
													-6
												),
											}}
											style={styles.thumbnail}
										/>

										<Text
											style={{
												fontSize: 18,
											}}
										>
											{video.name}
										</Text>
										<Text
											style={{
												marginTop: 10,
											}}
										>
											{video.description}
										</Text>
									</View>
								</Link>
							);
						})
					)}
				</View>
			</ScrollView>
			<Footer />
		</View>
	);
};

export default CategoryResult;

const styles = StyleSheet.create({
	backArea: {
		backgroundColor: "#EEE",
		paddingTop: 50,
		justifyContent: "center",
		paddingBottom: 5,
	},
	backTxt: {
		fontSize: 18,
		color: "#EFA7A1",
	},
	categoryName: {
		fontSize: 24,
		textTransform: "capitalize",
		marginTop: 10,
		color: "#EFA7A1",
	},
	videos: {
		marginTop: 30,
		width: deviceWidth - 50,
	},
	video: {
		// maxHeight: 300,
		// width: deviceWidth - 100,
		// alignItems: "center",
		// justifyContent: "center",
		// borderRadius: 6,
		marginBottom: 30,
		borderWidth: 2,
		borderColor: "#EFA7A1",
		padding: 5,
	},
	videoText: {
		color: "#fff",
	},
	thumbnail: {
		height: 150,
		width: "100%",
		marginBottom: 10,
	},
});
