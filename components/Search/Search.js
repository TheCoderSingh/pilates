import React, { useState } from "react";
import {
	ActivityIndicator,
	Dimensions,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
import Icon from "react-native-vector-icons/FontAwesome5";
import Footer from "../Footer/Footer";
import SectionHead from "../SectionHead";
import { Link } from "react-router-native";
import MIcon from "react-native-vector-icons/MaterialIcons";
import { conf } from "../../config/config";
import Back from "../Back/Back";
import { TouchableOpacity } from "react-native";

const deviceWidth = Dimensions.get("window").width;

const Search = () => {
	const [searchQuery, setSearchQuery] = useState();
	const [videos, setVideos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [clicked, setClicked] = useState(false);

	let fetchVideos = () => {
		setClicked(true);

		axios
			.get(conf.apiUrl + "/search-videos/" + searchQuery)
			.then((response) => {
				setVideos(response.data);
			})
			.then(() => {
				setIsLoading(false);
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<View style={{ flex: 1 }}>
			{clicked === true ? (
				<TouchableOpacity
					onPress={() => {
						setVideos([]);
						setClicked(false);
					}}
				>
					<Back text="Search" code="search" code2="yes" />
				</TouchableOpacity>
			) : null}
			<ScrollView
				contentContainerStyle={{ alignItems: "center" }}
				style={styles.container}
			>
				<View style={styles.header}>
					<Text style={styles.headerText}>Search</Text>
					<View style={styles.textInput}>
						<TextInput
							style={styles.headerInput}
							placeholder="Search Videos"
							onChangeText={(query) => setSearchQuery(query)}
							onSubmitEditing={fetchVideos}
						/>
						<Icon
							name="search"
							style={styles.arrowIcon}
							size={15}
						/>
					</View>
				</View>
				<View style={styles.results}>
					{/* <SectionHead text="Search Results" /> */}
					<View style={styles.videos}>
						<ScrollView>
							{videos.length === 0 && clicked ? (
								<View>
									<MIcon
										name="error"
										style={{
											fontSize: 120,
											color: "#EFA7A1",
											textAlign: "center",
											marginTop: "50%",
										}}
									/>
									<Text
										style={{
											fontSize: 24,
											marginTop: 15,
											textAlign: "center",
										}}
									>
										No videos found
									</Text>
								</View>
							) : null}
							{isLoading && clicked ? (
								<View>
									<ActivityIndicator
										size="large"
										color="#EFA7A1"
									/>
									<Text
										style={{
											marginTop: 20,
											alignSelf: "center",
										}}
									>
										Searching...
									</Text>
								</View>
							) : (
								videos.map((video) => {
									if (video.privacy.view !== "nobody")
										return (
											<Link
												to={
													"video/" +
													video.uri.substring(8)
												}
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
													<Text>
														Duration:{" "}
														{video.duration} sec
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
						</ScrollView>
					</View>
				</View>
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Search;

const styles = StyleSheet.create({
	header: {
		marginTop: 50,
		marginBottom: 15,
	},
	headerText: {
		fontSize: 24,
		color: "#EFA7A1",
		textAlign: "center",
		marginBottom: 20,
	},
	headerInput: {
		borderRadius: 50,
		borderWidth: 1,
		width: deviceWidth - 60,
		height: 35,
		paddingLeft: 20,
		fontSize: 18,
		color: "#EFA7A1",
	},
	textInput: {
		position: "relative",
	},
	arrowIcon: {
		position: "absolute",
		right: 12,
		top: 8,
		color: "#EFA7A1",
	},
	results: {
		alignItems: "center",
	},
	resultsText: {
		fontSize: 24,
		marginBottom: 15,
		marginTop: 20,
	},
	videos: {
		marginTop: 30,
		width: deviceWidth - 50,
	},
	video: {
		marginBottom: 30,
		// borderWidth: 2,
		// borderColor: "#EFA7A1",
		padding: 5,
		height: 250,
		overflow: "hidden",
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
