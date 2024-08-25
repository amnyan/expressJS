express = require("express");

app = express();
app.use(express.json());

const users = [
    { id: 1, name: "Arman", age: 22 },
    { id: 2, name: "Narek", age: 23 },
    { id: 3, name: "Lilit", age: 24 },
    { id: 4, name: "Hasmik", age: 42 },
    { id: 5, name: "Karen", age: 21 },
]
app.get("/", (req, res) => {
    res.send("Hello world");
})

app.get("/users", (req, res) => {
    res.send(users);
})

app.post("/users", (req, res) => {
    const user = req.body;
    users.push({ id: users.length + 1, name: user.name, age: user.age });
    res.status(201).send(users);
    console.log(user);
})
app.put("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    let findIndex = users.findIndex(user => user.id === userId);

    if (findIndex === -1) {
        res.status(404).send("User not found");
    } else {
        users[findIndex] = {
            id: userId,
            ...userData
        };
        res.send(users);
    }
})
app.patch("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userData = req.body;

    let findIndex = users.findIndex(user => user.id === userId);

    if (findIndex === -1) {
        res.status(404).send("User not found");
    } else {
        users[findIndex] = {
            ...users[findIndex],
            ...userData
        };
        res.send(users);
    }
})

app.delete("/users/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    let findIndex = users.findIndex(user => user.id === userId);

    if (findIndex === -1) {
        res.sendStatus(400);
    } else {
        users.splice(findIndex, 1);
        res.sendStatus(200);
    }
})

app.get("/users/:id", (req, res) => {
    let user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.send(user);
    } else {
        res.status(404).send("User not found");
    }
})


app.listen(4000, () => {
    console.log("4000 port is running...");
});