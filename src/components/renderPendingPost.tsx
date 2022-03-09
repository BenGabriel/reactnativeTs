import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Button } from ".";

interface Props {
  msg: string;
  approved: string;
  timeStamp: number;
  onApprove: () => void;
  onReject: () => void;
}

const formatTime = (timestamp: number): any => {
  const calculatedTime = Date.now() - timestamp;
  if (calculatedTime > 1000) return `${calculatedTime / 1000} s`;
  if (calculatedTime / 1000 > 60) return `${calculatedTime / 1000 / 60} min`;
  if (calculatedTime / 1000 / 60 > 60)
    return `${calculatedTime / 1000 / 60 / 60} hr`;
  else `${calculatedTime / 1000 / 60 / 60 / 24} d`;
};

const { height, width } = Dimensions.get("screen");
const App: FC<Props> = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ width: "60%" }}>{props.msg}</Text>
        <Text>{formatTime(props.timeStamp)}</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginVertical: 10
        }}
      >
        <Button title="approve" onPress={props.onApprove} />
        <Button title="reject" onPress={props.onReject} />
      </View>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    width: width / 1.1,
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 1,
    padding: 20
  }
});
