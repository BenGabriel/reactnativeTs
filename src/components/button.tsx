import React, { FC } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";

const { height, width } = Dimensions.get("screen");

interface Props {
  title: string;
  onPress: () => void;
}

const App: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    paddingHorizontal: 20
  },
  text: {
      color:'white'
  }
});
