import express from "express";
import db from "./db/index.js";
import { User } from "./db/entities/User.js";
var app = express();

const PORT = 5000;

app.use(express.json());

app.post("/register", async (req, res) => {
  try {
    const name = req.body.username;
    const password = req.body.password;
    if (!name || !password) {
      console.log("need both");
      res.send("You need a valid username and password to create an account");
    }
    const user = new User();
    user.userName = name;
    user.password = password;
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    console.log(err);
    res.send("failed to create a new user");
  }
});

/*
router.post('/', async(req: Task.Request, res: Task.Response) => {
  const newTask = new Todo();
  newTask.title = req.body.title;
  newTask.description = req.body.description;
  newTask.user = req.body.userId;
  const tags = await Tag.find({
    where : {
      id: In(req.body.tags)
    }
  }) ;
  newTask.tags = tags ;

  newTask.save().then((response:any) => {

    res.status(201).send('Task Created with ID:' + response.id);
  }).catch((error:any) => {
    console.error(error);
    res.status(500).send('Something went wrong');
  });
});


try {
    const user = new User();
    const profile = new Profile();
    user.userName = req.body.userName;
    // await profile.save();
    user.profile = profile;
    // await user.save();
    db.dataSource
      .transaction(async (transactionManager) => {
        await transactionManager.save(user);
        await transactionManager.save(profile);
      })
      .then(() => {
        // res.send()
        res.send("User created and Profile created");
      })
      .catch((e) => {
        res.status(500).send(`Something went wrong ${e}`);
      });
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong with creating a new user");
  }
*/

app.get("/", (req, res) => {
  res.send("Server UP!");
});

app.use((req, res) => {
  res.status(404).send("You requested something I don't have :(");
});

app.listen(PORT, () => {
  console.log(`App is running and Listening on port ${PORT}`);
  db.initialize();
});
