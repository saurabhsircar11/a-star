import { useEffect, useState, useCallback } from "react";
import "../App.css";
import aStar from "../utils/aStar";
import cellGenerator from "../utils/cellGenerator";

export default function AstarDemo() {
  const [cells, setCell] = useState(cellGenerator(5, 5));
  const [path, setPath] = useState([]);

  const serachPath = useCallback(() => {
    const pathDef = aStar(cells, [0, 4], [4, 0]);
    console.log("saurabh", pathDef);
    setPath(pathDef);
  }, []);

  useEffect(() => {
    const cellsClone = Array.from(cells);
    for (let i = 0; i < path.length; i++) {
      cellsClone[path[i][0]][path[i][1]] = 1;
    }
    setCell(cellsClone);
  }, [path]);
  return (
    <>
      <button onClick={serachPath}>Search path</button>
      {cells.map((item, index) => {
        return (
          <div key={`row-${index}`} className="astar-row">
            {item.map((child, index2) => {
              let backgroundColor = "red";
              if (child === 0) {
                backgroundColor = "red";
              } else if (child === 2) {
                backgroundColor = "brown";
              } else {
                backgroundColor = "green";
              }

              return (
                <div
                  key={`cell-${index2}`}
                  style={{
                    backgroundColor,
                    height: "100%",
                    width: "100%",
                    margin: "5px",
                  }}
                >
                  {child}
                </div>
              );
            })}
          </div>
        );
      })}
    </>
  );
}
