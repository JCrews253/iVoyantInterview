import express from "express";

const app = express();

const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

app.get("/api1", async (req, res) => {
  await sleep(5000);
  res.json({
    person: [
      {
        id: 10,
        firstName: "John",
        lastName: "Doe",
      },
      {
        id: 5,
        firstName: "Jack",
        lastName: "Doe",
      },
      {
        id: 7,
        firstName: "James",
        lastName: "Doe",
      },
    ],
  });
});

app.get("/api2", async (req, res) => {
  await sleep(10000);
  res.set("Content-Type", "text/xml");
  res.send(
    `<persons>
        <person>
          <id>3</id>
          <firstName>Jen</firstName>
          <lastName>Doe</lastName>
        </person>
        <person>
          <id>6</id>
          <firstName>Stephanie</firstName>
          <lastName>Joe</lastName>
        </person>
        <person>
          <id>1</id>
          <firstName>Victoria</firstName>
          <lastName>Doe</lastName>
        </person>
      </persons>`
  );
});

app.listen(3001, () => {
  console.log("Server is running at port 3001");
});
