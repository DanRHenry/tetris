const gameBoard = document.getElementById("gameBoard");
const startingPosition = "grid-item-4_0";
let startingCol = +startingPosition[startingPosition.length-3]
let startingRow = +startingPosition[startingPosition.length-1]

console.log(startingCol)
console.log(startingRow)
let orientation = 90;

const blockObject = [
  // ["00", "01", "10", "11"] , //Square
  ["00", "10", "20", "30"] , // Line
  ["00", "10", "20", "22"] , // El
  ["00", "10", "20", "2-1"] , // Backwards El
  ["00", "10", "1-1", "2-1"] , // Zag
  ["00", "10", "11", "21"], // Zig
];


function getNextObject() {
  nextObject = blockObject[Math.floor(Math.random() * 6)];
  return nextObject;
}
// getNextObject()

function createGrid() {
  const grid = document.createElement("div");
  grid.style.display = "grid";
  // grid.style.gridTemplateRows = "repeat(20,1fr)";
  grid.style.gridTemplateColumns = "repeat(10,1fr)";
  grid.style.width = "27.5em";
  grid.style.gap = ".25em";
  grid.style.backgroundColor = "white";
  grid.id = "playerGrid";

  gameBoard.appendChild(grid);
}

function createSquares() {
  for (let row = 0; row < 20; row++) {
    for (let column = 0; column < 10; column++) {
      let square = document.createElement("div");
      square.style.backgroundColor = "black";
      // square.style.color = "white";
      square.style.height = "2.5em";
      square.style.width = "2.5em";
      square.id = `grid-item-${column}_${row}`;
      square.className = "gameSquare";
      document.getElementById("playerGrid").append(square);
    }
  }
}

createGrid();
createSquares();

let currentObject = blockObject[Math.floor(Math.random() * 6)];
let nextObject;
getNextObject()

// console.log(startingPosition)
// console.log(currentObject);
// console.log(nextObject)

function transformShape () {
  if (orientation === 90) {
    console.log("currentObject:",currentObject)
    let coord = [];

    let ninety = currentObject.map((index) => {
      let temp = ""
      for (let i = 0; i < index.length; i++) {
        if (index[i] == "-") {
          temp += index[i] + index [i+1]
          i += 2
        } else {
          temp += index[i]
        }
      }
      coord.push(temp)
      document.getElementById("grid-item-")
    })

    console.log("coord:",coord)
    startingCoordinates = [startingCol, startingRow]
    return ninety;
  }

  if (orientation === 180) {
    return one_eighty;
  }

  if (orientation === 270) {
    return two_seventy;
  }
  return "work on this later";
}

function placeShape () {
  // console.log(currentObject)
  // console.log(startingPosition)

  const shapeOrientation = transformShape()

  console.log(transformShape())

}

placeShape()

// function handleMouseover() {
//   let initialRow = square.id[square.id.length - 3];
//   let initialCol = square.id[square.id.length - 1];

//   // if (block?.length > 0) {
//   //   let squares = document.getElementsByClassName("gameSquare");
//   //   for (box of squares) {
//   //     if (box.style.color !== "blue") {
//   //       box.style.backgroundColor = "black";
//   //     }
//   //   }
//   //   for (let i = 0; i < block.length; i++) {
//   //     if (vertical) {
//   //       let position = `grid-item-${initialRow}_${+initialCol + i}`;

//   //       let endPosition = +initialCol + block.length;

//   //       if (endPosition <= 10) {
//   //         const location = document.getElementById(position);
//   //         if (location.style.color !== "blue") {
//   //           location.style.backgroundColor = "red";
//   //         } else if (location.style.backgroundColor === "white") {
//   //           return;
//   //         }
//   //       } else if (endPosition > 10) {
//   //         const location = document.getElementById(position);
//   //         try {
//   //           if (location.style.backgroundColor !== "white") {
//   //             location.style.backgroundColor = "gray";
//   //           }
//   //         } catch {
//   //           return;
//   //         }
//   //       }
//   //     }

//   //     if (horizontal) {
//   //       let position = `grid-item-${+initialRow + i}_${initialCol}`;

//   //       let endPosition = +initialRow + block.length;

//   //       if (endPosition <= 10) {
//   //         const location = document.getElementById(position);
//   //         if (location.style.color !== "blue") {
//   //           location.style.backgroundColor = "green";
//   //         } else if (location.style.backgroundColor === "white") {
//   //           return;
//   //         }
//   //       } else if (endPosition > 10) {
//   //         const location = document.getElementById(position);
//   //         try {
//   //           if (location.style.backgroundColor !== "white") {
//   //             location.style.backgroundColor = "gray";
//   //           }
//   //         } catch {
//   //           return;
//   //         }
//   //       }
//   //     }
//   //   }
//   // }
// }

// function checkPositionsValidity(initialRow, initialCol) {
//   let mayPlace = "";
//   if (block) {
//     for (let i = 0; i < block.length; i++) {
//       if (vertical) {
//         let position = `grid-item-${initialRow}_${+initialCol + i}`;
//         if (
//           document.getElementById(position)?.style.backgroundColor !==
//           "white"
//         ) {
//           mayPlace += "x";
//           if (mayPlace.length === block.length) {
//             return true;
//           }
//         }
//       }
//       if (horizontal) {
//         let position = `grid-item-${+initialRow + i}_${initialCol}`;
//         if (
//           document.getElementById(position)?.style.backgroundColor !==
//           "white"
//         ) {
//           mayPlace += "x";
//           if (mayPlace.length === block.length) {
//             return true;
//           }
//         }
//       }
//     }
//   } else if (mayPlace.length !== block.length) {
//     return false;
//   } else {
//     return;
//   }
// }

// function handleRightClickedSquare(e) {
//   e.preventDefault();
//   if (removeGameSquareFunctionality === true) {
//     for (square of document.getElementsByClassName("gameSquare")) {
//       square.removeEventListener(
//         "contextmenu",
//         handleRightClickedSquare,
//         false
//       );
//       return;
//     }
//   }

//   let initialRow = square.id[square.id.length - 3];
//   let initialCol = square.id[square.id.length - 1];

//   if (block?.length > 0) {
//     for (pos of Object.keys(blockObject)) {
//       if (block === blockObject[pos]) {
//         blockPositions[pos] = [];
//         // console.log(block)

//         if (vertical) {
//           if (checkPositionsValidity(initialRow, initialCol) === true) {
//             for (let i = 0; i < block.length; i++) {
//               let position = `grid-item-${initialRow}_${+initialCol + i}`;

//               try {
//                 blockPositions[pos].push(+initialRow);
//                 blockPositions[pos].push(+initialCol + i);

//                 document.getElementById(position).style
//                   .backgroundColor === "white";
//                 let endPosition = +initialCol + block.length;
//                 if (endPosition <= 10) {
//                   document.getElementById(
//                     position
//                   ).style.backgroundColor = "white";
//                   document.getElementById(position).style.color = "blue";
//                 }
//               } catch {
//                 return;
//               }
//             }
//             for (item of blocks) {
//               if (item.className.split([" "])[1] === block) {
//                 item.style.color = "brown";
//               }
//             }
//           }
//         }

//         if (horizontal) {
//           if (checkPositionsValidity(initialRow, initialCol) === true) {
//             for (let i = 0; i < block.length; i++) {
//               let position = `grid-item-${+initialRow + i}_${initialCol}`;
//               try {
//                 blockPositions[pos].push(+initialRow + i);
//                 blockPositions[pos].push(+initialCol);

//                 document.getElementById(position).style
//                   .backgroundColor === "white";
//                 let endPosition = +initialRow + block.length;
//                 if (endPosition <= 10) {
//                   document.getElementById(
//                     position
//                   ).style.backgroundColor = "white";
//                   document.getElementById(position).style.color = "blue";
//                   // sendShipData(position);
//                 }
//               } catch {
//                 return;
//               }
//             }
//             for (item of blocks) {
//               if (item.className.split([" "])[1] === block) {
//                 item.style.color = "brown";
//               }
//             }
//             block = "";
//           }
//         }
//       }
//     }
//     // console.log("blockpositions:",blockPositions)
//   }

//   let counter = 0;
//   for (item of blocks) {
//     try {
//       if (item.style.color === "brown") {
//         counter++;
//       }
//     } catch {
//       return;
//     }
//   }

//   if (counter === 1) {
//     removeGameSquareFunctionality = true;
//     const blockData = { blockPositions: blockPositions, id: id };
//     const ws = new WebSocket("ws://127.0.0.1:3400");
//     ws.addEventListener("open", () => {
//       ws.send(JSON.stringify(blockData));
//       ws.send(JSON.stringify({ playStatus: true, id: id }));
//     });
//     readyToPlay = true;
//     console.log("enemyPlayStatus:", enemyPlayStatus);
//     console.log("readyToPlay:", readyToPlay);
//     if (enemyPlayStatus === false) {
//       determinePlayerOrder();
//     }
//   }
//   block = "";
// }

// square.addEventListener("mouseover", handleMouseover);

// square.addEventListener("click", () => {
//   vertical = !vertical;
//   horizontal = !horizontal;
//   handleMouseover();
// });

// square.addEventListener("contextmenu", handleRightClickedSquare, false);
