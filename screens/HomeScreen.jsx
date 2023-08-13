import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import jwtDecode from "jwt-decode";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { UserType } from "../UserContext";
import User from "../components/User";

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

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`https://chat-app-backend-of1h.onrender.com/users/${userId}`)
        .then((res) => {
          console.log(res.data.users);
          setUsers(res.data.users);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    fetchUsers();
  }, []);

  return (
    <View>
      <View style={{padding:10}}>
        {users.map((item, index) => (
          <User key={index} item={item}/>
        ))}
      </View>
    </View>
  );
};

export default HomeScreen;
