import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();
console.log(process.env.OPENAI_API_KEY);
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// openai.api_key = process.env.OPENAI_API_KEY;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    message: "Hello from CodeX!",
  });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "davinci:ft-personal-2023-09-24-06-41-10",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
      stop: [".\n", "?\n"],
    });

    // const response = openai.Completion.create(
    //   model="text-davinci-003",
    //   prompt="",
    //   temperature=1,
    //   max_tokens=256,
    //   top_p=1,
    //   frequency_penalty=0,
    //   presence_penalty=0
    // )

    res.status(200).send({
      bot: response.data.choices[0].text,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send(error || "Something went wrong");
  }
});

app.listen(5000, () =>
  console.log("AI server started on http://localhost:5000")
);
