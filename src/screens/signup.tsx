import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import React, { FC, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Button, Input } from "../components";

const App: FC = (props) => {
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const signUp = async () => {
    const auth = getAuth();
    const db = getFirestore();
    if (name && email && password) {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        if (user) {
          //   Alert.alert(JSON.stringify(user));
          await setDoc(doc(db, "users", user.uid), { name, email, password });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Error", "Missing Fields");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Sign Up Screen</Text>
      <Input placeholder="Name" onChangeText={(text) => setName(text)} />
      <Input placeholder="Email" onChangeText={(text) => setEmail(text)} />
      <Input
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={signUp} />
      <View style={styles.loginText}>
        <Text style={{ marginHorizontal: 5 }}>Already Have an Account</Text>
        <TouchableOpacity
          style={{ marginHorizontal: 5 }}
          onPress={() => props.navigation.navigate("login")}
        >
          <Text style={{ color: "rgba(81, 135, 200, 1)" }}>Login Here</Text>
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
