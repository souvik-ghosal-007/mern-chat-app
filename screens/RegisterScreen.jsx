import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleRegister = () => {
    Keyboard.dismiss();

    const user = {
      name,
      email,
      password,
      image,
    };

    axios
      .post("https://chat-app-backend-of1h.onrender.com/register", user)
      .then(() => {
        ToastAndroid.show("Registration Successfull !", ToastAndroid.SHORT);
        setName("");
        setEmail("");
        setImage("");
        setPassword("");

        navigation.navigate("Login");
      })
      .catch((err) => {
        ToastAndroid.show(
          "Some Error Occurred! Try Again,",
          ToastAndroid.SHORT
        );
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
            Register
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
              marginTop: 15,
            }}
          >
            Register your new Account
          </Text>
        </View>
        <View style={{ marginTop: 50, alignItems: "center" }}>
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Name
            </Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={{
                fontSize: 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter Your Name"
              placeholderTextColor="lightgray"
            />
          </View>

          <View style={{ marginTop: 10 }}>
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
              keyboardType="email-address"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "600", color: "gray" }}>
              Image
            </Text>
            <TextInput
              value={image}
              onChangeText={(img) => setImage(img)}
              style={{
                fontSize: 18,
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                marginVertical: 10,
                width: 300,
              }}
              placeholder="Enter Your Image"
              placeholderTextColor="lightgray"
            />
          </View>

          <Pressable
            onPress={handleRegister}
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
              Register
            </Text>
          </Pressable>

          <View style={{ flexDirection: "row", gap: 6, marginTop: 40 }}>
            <View>
              <Text style={{ color: "grey", fontSize: 17 }}>
                Already have an account?
              </Text>
            </View>
            <Pressable onPress={() => navigation.navigate("Login")}>
              <Text
                style={{ color: "#4A55A2", fontSize: 17, fontWeight: "bold" }}
              >
                Login
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
