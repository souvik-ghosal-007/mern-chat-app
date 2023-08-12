import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Home");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    Keyboard.dismiss();

    const user = {
      email,
      password,
    };

    axios
      .post("https://chat-app-backend-of1h.onrender.com/login", user)
      .then((res) => {
        const token = res.data.token;
        AsyncStorage.setItem("authToken", token);

        ToastAndroid.show("Login Successfull !", ToastAndroid.SHORT);
        setEmail("");
        setPassword("");

        navigation.replace("Home");
      })
      .catch((err) => {
        Alert.alert("Login Error", "Invalid email or password");
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        padding: 10,
        alignItems: "center",
      }}
    >
      <KeyboardAvoidingView>
        <View
          style={{
            marginTop: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#4A55A2",
              fontSize: 25,
              fontWeight: "600",
            }}
          >
            Sign In
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              marginTop: 15,
            }}
          >
            Sign In to your Account
          </Text>
        </View>
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Email
            </Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={{
                fontSize: 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter Your Email"
              placeholderTextColor="lightgray"
              KeyboardType="email-address"
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Password
            </Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={{
                fontSize: 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter Your Password"
              placeholderTextColor="lightgray"
            />
          </View>

          <Pressable
            onPress={handleLogin}
            style={{
              width: 200,
              backgroundColor: "#4A55A2",
              padding: 15,
              marginTop: 50,
              marginLeft: "auto",
              marginRight: "auto",
              borderRadius: 6,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 17,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Login
            </Text>
          </Pressable>

          <View style={{ flexDirection: "row", gap: 6, marginTop: 40 }}>
            <View>
              <Text style={{ color: "grey", fontSize: 17 }}>
                Don't have an account?
              </Text>
            </View>
            <Pressable onPress={() => navigation.navigate("Register")}>
              <Text
                style={{ color: "#4A55A2", fontSize: 17, fontWeight: "bold" }}
              >
                Sign Up
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
