import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { WebView } from "react-native-webview";
import Footer from "../components/Footer/Footer";
import {conf} from "../config/config";

const deviceWidth = Dimensions.get("window").width;

const Video = (props) => {
	const [video, setVideo] = useState();

	useEffect(() => {
		let videoid = props.match.params.id;
		console.log(videoid);
		axios
			.get(conf.apiUrl+'/video/'+videoid)
			.then((response) => {
				console.log(response);
				setVideo(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const formatTime = (time) => {
		var hrs = ~~(time / 3600);
		var mins = ~~((time % 3600) / 60);
		var secs = ~~time % 60;

		var ret = "";
		if (hrs > 0) {
			ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
		}
		ret += "" + mins + ":" + (secs < 10 ? "0" : "");
		ret += "" + secs;
		return ret;
	};

	return (
		<View style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ alignItems: "center" }}>
				{video ? (
					<View style={styles.video}>
						<WebView
							source={{
								html: video.embed.html
									.replace("1920", "1024")
									.replace("1080", "786"),
							}}
							scrollEnabled={false}
							style={{ marginTop: 20, width: 320, height: 230 }}
						/>
						<Text style={styles.name}>{video.name}</Text>
						<Text style={styles.desc}>{video.description}</Text>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								marginTop: 10,
								width: "100%",
							}}
						>
							<Text>Duration: {formatTime(video.duration)}</Text>
							<Text>
								Date: {video.created_time.substring(0, 10)}
							</Text>
						</View>
					</View>
				) : null}
			</ScrollView>
			<Footer />
		</View>
	);
};

export default Video;

const styles = StyleSheet.create({
	video: {
		marginTop: 60,
		width: deviceWidth,
		alignItems: "center",
	},
	videoRes: {
		width: deviceWidth,
	},
	name: {
		fontSize: 24,
		color: "#EFA7A1",
	},
	desc: {
		marginTop: 10,
		width: deviceWidth - 30,
	},
});
