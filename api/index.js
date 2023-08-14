const bodyParser = require("body-parser");
const express = require("express");
const { default: mongoose } = require("mongoose");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Message = require("./models/Message");

const app = express();
const PORT = 8000;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

mongoose
  .connect(
    "mongodb+srv://root:i5xrtnnO33ntT7KX@cluster0.dbvyvzw.mongodb.net/",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB Connection Established");
  })
  .catch((err) => {
    console.log(`There was an error in d Database connection: ${err.message}`);
  });

app.get("/", (req, res) => {
  res.status(200).json("Hello, Its Deployed");
});

app.get("/login", (req, res) => {
  res.status(200).json("Hello, Its Logged In");
});

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

// Register New User
app.post("/register", (req, res) => {
  const { name, email, password, image } = req.body;

  const newUser = new User({
    name,
    email,
    password,
    image,
  });
  newUser
    .save()
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "User Registered Successfully",
      });
    })
    .catch((err) =>
      res.status(500).json({
        status: "failed",
        message: err,
      })
    );
});

const createToken = (userId) => {
  const payload = {
    userId,
  };

  const token = jwt.sign(payload, "ivbhwiciwecwuicwihcwe", { expiresIn: "1h" });

  return token;
};

// Login User
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({
      status: "failed",
      message: "Email and Password is required.",
    });
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          status: "failed",
          message: "User not found.",
        });
      }

      if (user.password !== password) {
        return res.status(404).json({
          status: "failed",
          message: "Password is invalid.",
        });
      }

      const token = createToken(user._id);
      res.status(200).json({
        status: "success",
        token,
      });
    })
    .catch((err) => {
      return res.status(404).json({
        status: "failed",
        message: `There was an error: ${err.message}`,
      });
    });
});

app.get("/users/:userId", (req, res) => {
  const loggedInUserId = req.params.userId;

  User.find({ _id: { $ne: loggedInUserId } })
    .then((users) => {
      res.status(200).json({
        status: "success",
        users,
      });
    })
    .catch((err) => {
      res.status(400).json({
        status: "failed",
        message: `Failed to get users: ${err.message}`,
      });
    });
});

// Send request to a user
app.post("/friend-request", async (req, res) => {
  const { currentUserId, selectedUserId } = req.body;

  try {
    //update the recipient's friend requests array
    await User.findByIdAndUpdate(selectedUserId, {
      $push: { friendRequests: currentUserId },
    });

    //update the sender's sent friend requests array
    await User.findByIdAndUpdate(currentUserId, {
      $push: { sentfriendRequests: selectedUserId },
    });

    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

//show all the friend requests of a user
app.get("/friend-request/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId)
      .populate("friendRequests", "name email image")
      .lean();

    const friendRequests = user.friendRequests;

    res.json(friendRequests);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Accept friend Request
app.post("/friend-request/accept", async (req, res) => {
  try {
    const { senderId, recipientId } = req.body;

    // retrieve the docs of sender and recipient
    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    sender.friends.push(recipientId);
    recipient.friends.push(senderId);

    recipient.friendRequests = recipient.friendRequests.filter(
      (request) => request.toString() !== senderId.toString()
    );

    sender.sentfriendRequests = sender.sentfriendRequests.filter(
      (request) => request.toString() !== recipientId.toString()
    );

    await sender.save();
    await recipient.save();

    res.status(200).json({ message: "Friend Request Accepted..." });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/friends/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findById(userId).populate(
      "friends",
      "name email image"
    );

    const acceptedFriends = user.friends;

    res.status(200).json(acceptedFriends);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Post messages
const upload = multer({ storage: storage });
app.post("/messages", upload.single("imageFile"), async (req, res) => {
  try {
    const { senderId, recipientId, messageType, messageText } = req.body;

    const newMessage = new Message({
      senderId,
      recipientId,
      messageType,
      messageText,
      timeStamp: new Date(),
      imageUrl: messageType === "image",
    });

    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//get the user details to design the chat room header
app.get("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const recipientId = await User.findById(userId);

    res.status(200).json(recipientId);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// fetch all messages between 2 users
app.get("/messages/:senderId/:recipientId", async (req, res) => {
  try {
    const { senderId, recipientId } = req.params;

    const messages = await Message.findOne({
      $or: [
        { senderId: senderId, recipientId: recipientId },
        { senderId: recipientId, recipientId: senderId },
      ],
    }).populate("senderId", "_id name");

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
