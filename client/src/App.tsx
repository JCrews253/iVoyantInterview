import { useEffect, useState } from "react";
import { parseString } from "xml2js";

interface api2Data {
  persons: {
    person: person[];
  };
}
interface api1Data {
  person: person[];
}

interface person {
  id: string;
  firstName: string;
  lastName: string;
}

const fetchApi1 = (): Promise<person[]> => {
  return fetch("/api1")
    .then((res) => res.json())
    .then((data: api1Data) => data.person);
};

const fetchApi2 = async (): Promise<person[]> => {
  const api2Text = await fetch("/api2").then((res) => res.text());
  let api2Data: api2Data = { persons: { person: [] } };
  parseString(api2Text, { explicitArray: false }, (err, result) => {
    let text = JSON.stringify(result, null, 0);
    api2Data = JSON.parse(text);
  });
  return api2Data.persons.person;
};

function App() {
  const [people, setPeople] = useState<person[]>([]);
  useEffect(() => {
    (async () => {
      const [api1Data, api2Data] = await Promise.all([
        fetchApi1(),
        fetchApi2(),
      ]);
      const apiData = api1Data
        .concat(api2Data)
        .sort((a, b) => (parseInt(a.id) > parseInt(b.id) ? 1 : -1));
      setPeople(apiData);
    })();
  }, []);

  return (
    <div className="App">
      {people.length <= 0
        ? "Loading..."
        : people.map((person) => {
            return (
              <p
                key={person.id}
              >{`Name: ${person.firstName} ${person.lastName} [${person.id}]`}</p>
            );
          })}
    </div>
  );
}

export default App;
