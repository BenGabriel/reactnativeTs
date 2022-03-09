import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { FC, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Input } from "../components";

const App: FC = (props) => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const login = async () => {
    const auth = getAuth();

    if (email && password) {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Missing Credentials");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login Up Screen</Text>
      <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <Input
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={login} />
      <View style={styles.loginText}>
        <Text style={{ marginHorizontal: 5 }}>Already Have an Account</Text>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          onPress={() => props.navigation.navigate("signup")}
        >
          <Text style={{ color: "rgba(81, 135, 200, 1)" }}>Sign Up Here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loginText: {
    flexDirection: "row",
    marginVertical: 20
  }
});
