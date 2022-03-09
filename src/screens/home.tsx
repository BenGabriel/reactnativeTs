import { getAuth, signOut } from "firebase/auth";
import React, { FC, useEffect, useState } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Button, Input, PostRender } from "../components";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  doc,
  query,
  getDocs,
  where,
  onSnapshot
} from "firebase/firestore";

const db = getFirestore();
const auth = getAuth();

const App: FC = (props) => {
  const [msg, setMsg] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any>(null);

  const fetchPendingPosts = async () => {
    // const q = query(collection(db, "posts"), where("approved", "==", true));
    // const posts = await getDocs(q);

    // setPosts([...posts.docs]);
    const q = query(collection(db, "posts"), where("approved", "==", true));
    onSnapshot(q, (doc) => {
      const docs = doc.docs;
      setPosts(docs);
    });
  };

  const signOutApp = () => {
    signOut(auth);
  };

  const fetchCurrentUser = async () => {
    const authUser = auth.currentUser.uid;
    const user = await getDoc(doc(db, "users", authUser));
    setUser({
      id: user.id,
      ...user.data()
    });
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchPendingPosts();
  }, []);

  const post = async () => {
    const db = getFirestore();
    if (msg) {
      const data = {
        msg,
        timeStamp: Date.now(),
        approved: false
      };

      try {
        await addDoc(collection(db, "posts"), data);
      } catch (error) {
        console.log(error);
      }
    } else {
      Alert.alert("Missing Fields");
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 0.5 }}>
        {posts !== null ? (
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <PostRender
                msg={item.data().msg}
                timeStamp={item.data().timeStamp}
                approved={item.data().approved}
              />
            )}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Nothing to display</Text>
          </View>
        )}
      </View>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={signOutApp} />
      <View>
        <Input
          placeholder="Write Something"
          onChangeText={(text) => setMsg(text)}
        />
        <Button title="Post" onPress={post} />
      </View>
      {user ? (
        user.isAdmin ? (
          <View>
            <Button
              title="Dashboard"
              onPress={() => props.navigation.navigate("dashboard")}
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
