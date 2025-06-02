import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/result", async (req, res) => {
    try {
        const response = await axios.get(`https://data.police.uk/api/crimes-at-location?date=${req.query.year}-${req.query.month}&lat=${req.query.latitude}&lng=${req.query.longitude}`);
        res.render("result.ejs", { data: response.data });
    } catch(error) {
        console.log(`Error message: ${error}`);
        res.sendStatus(404);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}.`);
});