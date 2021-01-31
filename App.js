import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

import Slider from "@react-native-community/slider";

export default function App() {
  const [sound, setSound] = useState();
  const [current, setcurrent] = useState();
  const [getmax, setmax] = useState();
  const [getButton, setButton] = useState("play");

  async function playSound() {
    console.log("Loading Sound");
    //setSound(Audio.Sound())
    const { sound } = await Audio.Sound.createAsync(
      require("./assets/file_example_MP3_700KB.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    // await sound.playAsync();
    var pos = await sound.getStatusAsync();
    console.log(pos);
    while (pos.positionMillis < pos.playableDurationMillis) {
      //  console.log(pos.positionMillis);
      setcurrent(pos.positionMillis);
      setmax(pos.playableDurationMillis);
      pos = await sound.getStatusAsync();
    }
  }
  function msToHMS(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = parseInt((duration / 1000) % 60),
      minutes = parseInt((duration / (1000 * 60)) % 60),
      hours = parseInt((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }

  useEffect(() => {
    playSound();
  }, []);
  const handlechange = (val) => {};
  {
    /**
        onSlidingComplete={(val) => {
          console.log(val);
          sound.setPositionAsync(val);
          setcurrent(current);
        }}
         */
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/playerTopLeft.png")}
        style={{
          left: 0,
          top: 0,
          position: "absolute",
        }}
      />
      <View
        style={{
          marginTop: 5,
          backgroundColor: "#FFFFFF",
          width: 55,
          height: 55,
          borderRadius: 50,
          justifyContent: "center",
          top: 50,
          left: 40,
          position: "absolute",
        }}
      >
        <Text
          style={{
            alignSelf: "center",
            fontSize: 20,
            fontWeight: "bold",
            textAlign: "center",
            color: "#3F414E",
          }}
        >
          X
        </Text>
      </View>
      <Image
        source={require("./assets/playerRightTop.png")}
        style={{
          right: 0,
          top: 0,
          position: "absolute",
        }}
      />
      <Image
        source={require("./assets/playerBottomLeft.png")}
        style={{
          left: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
      <Image
        source={require("./assets/playerBottomRight.png")}
        style={{
          right: 0,
          bottom: 0,
          position: "absolute",
        }}
      />
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          width: "80%",
          textAlign: "center",
          color: "#3F414E",
        }}
      >
        Book Name Aye Ga
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: "#A0A3B1",
          width: "80%",
          textAlign: "center",
          margin: 5,
        }}
      >
        Part Number Aye Ga
      </Text>
      <View
        style={{
          flexDirection: "row",
          width: "70%",
          justifyContent: "space-between",
          margin: 10,
          padding: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log("here");
            let val = current - 5000;
            console.log("current is before ", current);
            setcurrent(val);
            console.log("current is after ", current);
            //console.log(current);
            sound.setPositionAsync(val);
          }}
          style={{
            backgroundColor: "#EBEAEC",
            borderRadius: 50,
            alignSelf: "center",
          }}
        >
          <Image
            source={require("./assets/skipback5.png")}
            style={
              {
                //width: 50
              }
            }
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: 80,
            height: 80,
            backgroundColor: "#3F414E",
            borderRadius: 50,
            alignSelf: "center",
            justifyContent: "center",
            borderWidth: 6,
            borderColor: "#BABCC6",
          }}
          onPress={() => {
            if (getButton == "play") {
              sound.playAsync();
              setButton("resume");
            } else {
              setButton("play");
              sound.stopAsync();
            }
          }}
        >
          {/**
          <Entypo name="controller-play" size={24} color="black" />
           */}
          {getButton == "play" ? (
            <Image
              source={require("./assets/play.png")}
              style={{ alignSelf: "center" }}
            />
          ) : (
            <Image
              source={require("./assets/pause.png")}
              style={{ alignSelf: "center" }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#EBEAEC",
            borderRadius: 50,
            alignSelf: "center",
          }}
          onPress={() => {
            console.log("current is before ", current);
            let val = current + 5000;
            setcurrent(val);
            console.log("current is after ", current);
            sound.setPositionAsync(val);
            console.log(current);
          }}
        >
          <Image
            source={require("./assets/forward5.png")}
            style={
              {
                //width: 50
              }
            }
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: "90%" }}>
        <Slider
          minimumValue={0}
          maximumValue={getmax}
          value={current}
          disabled={sound == null ? true : false}
          minimumTrackTintColor="#3F414E"
          maximumTrackTintColor="#000000"
          thumbTintColor="#3F414E"
          onSlidingComplete={(val) => {
            //console.log(val, "val is");

            setcurrent(val);
            sound.setPositionAsync(val);
            //console.log(current, " current ");
          }}
        />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              color: "#3F414E",
              fontSize: 16,
            }}
          >
            {msToHMS(current)}
          </Text>

          <Text
            style={{
              color: "#3F414E",
              fontSize: 16,
            }}
          >
            {msToHMS(getmax)}
          </Text>
        </View>
      </View>
      {/**
      <View
        style={{
          flexDirection: "row",
          width: "80%",
          justifyContent: "space-between",
        }}
      >

        <Button
          title="skip"
          onPress={() => {
            console.log("current is before ", current);
            let val = current + 5000;
            setcurrent(val);
            console.log("current is after ", current);
            sound.setPositionAsync(val);
            console.log(current);
          }}
        />

        <Button
          title="stop"
          onPress={() => {
            sound.pauseAsync();
          }}
        />
        <Button
          title="play"
          onPress={() => {
            sound.playAsync();
          }}
        />

        <Button
          title="back"
          onPress={() => {
            console.log("here");
            let val = current - 5000;
            console.log("current is before ", current);
            setcurrent(val);
            console.log("current is after ", current);
            //console.log(current);
            sound.setPositionAsync(val);
          }}
        />
                 
      </View>
      */}
      <View style={{ position: "absolute", bottom: 10 }}>
        <Button title="Play Sound" onPress={playSound} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#ecf0f1",
    // padding: 10,
  },
});
