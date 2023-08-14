import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { UserType } from "../UserContext";
import UserChat from "../components/UserChat";

const ChatsScreen = () => {
  const { userId, setUserId } = useContext(UserType);
  const [acceptedFriends, setAcceptedFriends] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    acceptedFriendsList();
  }, []);

  const acceptedFriendsList = async () => {
    const res = await axios(
      `https://chat-app-backend-of1h.onrender.com/friends/${userId}`
    )
      .then((res) => setAcceptedFriends(res.data))
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Pressable>
        {acceptedFriends.map((item, index) => (
          <UserChat key={index} item={item} />
        ))}
      </Pressable>
    </ScrollView>
  );
};

export default ChatsScreen;
