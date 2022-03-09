import {
  getDocs,
  query,
  where,
  collection,
  getFirestore,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot
} from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { ApprovalRender, Button } from "../components";

const db = getFirestore();

const App: FC = (props) => {
  const [post, setPosts] = useState<any>(null);
  const fetchPendingPosts = async () => {
    // const q = query(collection(db, "posts"), where("approved", "==", false));
    // const posts = await getDocs(q);

    // setPosts([...posts.docs]);
    const q = query(collection(db, "posts"), where("approved", "==", false));
    return onSnapshot(q, (doc) => {
      const docs = doc.docs;
      setPosts(docs);
    });
  };

  const onApprove = async (id: string) => {
    const posts = await doc(db, "posts", id);
    updateDoc(posts, { approved: true });
  };

  const onReject = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
    // alert(`Item of ID ${id} will be rejected`);
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Button title="back" onPress={() => props.navigation.goBack()} />
      <Text>Dashboard Screen</Text>
      <View style={{ height: "50%" }}>
        <FlatList
          data={post}
          renderItem={({ item }) => (
            <ApprovalRender
              msg={item.data().msg}
              timeStamp={item.data().timeStamp}
              approved={item.data().approved}
              onApprove={() => onApprove(item.id)}
              onReject={() => onReject(item.id)}
            />
          )}
        />
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
  }
});
