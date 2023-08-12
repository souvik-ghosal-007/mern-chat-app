import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { UserType } from "../UserContext";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();

  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <Text style={{ fontSize: 20, fontWeight: "900" }}>Swift Chat</Text>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Ionicons name="chatbox-ellipses-outline" size={28} color="black" />
          <MaterialIcons name="people-outline" size={28} color="black" />
        </View>
      ),
    });
  }, []);

  useEffect(async () => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`https://chat-app-backend-of1h.onrender.com/users/${userId}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
