import React, { useState } from "react";

const toonList = [
  {
    id: 1,
    name: "Los caballeros del zodiaco",
    views: 100000,
    publishedDate: new Date(2018, 10, 2)
  },
  {
    id: 2,
    name: "Candy Candy",
    views: 150000,
    publishedDate: new Date(2017, 11, 29)
  },
  {
    id: 3,
    name: "Super campeones",
    views: "145000",
    publishedDate: new Date(2019, 1, 1)
  },
  {
    id: 4,
    name: "Ranma 1/2",
    views: 200000,
    publishedDate: new Date(2015, 3, 1)
  }
];

function ToonApp() {
  const [toons, setToons] = useState(toonList);
  const [value, setValue] = useState("more popular");

  function changeHandler(value) {
    setValue(value);

    const clonedToones = [...toons];

    if (value.includes("popular")) {
      clonedToones.sort((a, b) => a.views - b.views);
    }

    setToons(clonedToones);
  }

  return (
    <div>
      <h2>My toon list</h2>
      <select
        value={value}
        onChange={event => changeHandler(event.target.value)}
      >
        <option value="more popular">More popular</option>
        <option value="less popular">Less popular</option>
        <option value="more recent">More recent</option>
        <option value="less recent">Less recent</option>
      </select>
      <ul>
        {toons.map(toon => (
          <Toon key={toon.id} name={toon.name} />
        ))}
      </ul>
    </div>
  );
}

function Toon({ name }) {
  return <li>{name}</li>;
}

export default ToonApp;
