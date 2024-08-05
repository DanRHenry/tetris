const gameBoard = document.getElementById("gameBoard")

function createGrid() {
    const grid = document.createElement("div");
  
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(10,1fr)";
    grid.style.gridTemplateRows = "repeat(10,1fr)";
    grid.style.width = "32.5vw";
    // grid.style.gap = ".25vw";
    grid.id = "playerGrid";
  
    gameBoard.appendChild(grid);
  
    for (let row = 0; row < 10; row++) {
      for (let column = 0; column < 10; column++) {
        let square = document.createElement("div");
        square.style.backgroundColor = "black";
        square.style.color = "white";
        square.style.height = "3vw";
        square.style.width = "3vw";
        const identifier = `grid-item-${column}_${row}`;
        square.id = identifier;
        square.className = "gameSquare";
  
        function handleMouseover() {
          let initialRow = square.id[square.id.length - 3];
          let initialCol = square.id[square.id.length - 1];
  
          if (boat?.length > 0) {
            let squares = document.getElementsByClassName("gameSquare");
            for (box of squares) {
              if (box.style.color !== "blue") {
                box.style.backgroundColor = "black";
              }
            }
            for (let i = 0; i < boat.length; i++) {
              if (vertical) {
                let position = `grid-item-${initialRow}_${+initialCol + i}`;
  
                let endPosition = +initialCol + boat.length;
  
                if (endPosition <= 10) {
                  const location = document.getElementById(position);
                  if (location.style.color !== "blue") {
                    location.style.backgroundColor = "red";
                  } else if (location.style.backgroundColor === "white") {
                    return;
                  }
                } else if (endPosition > 10) {
                  const location = document.getElementById(position);
                  try {
                    if (location.style.backgroundColor !== "white") {
                      location.style.backgroundColor = "gray";
                    }
                  } catch {
                    return;
                  }
                }
              }
  
              if (horizontal) {
                let position = `grid-item-${+initialRow + i}_${initialCol}`;
  
                let endPosition = +initialRow + boat.length;
  
                if (endPosition <= 10) {
                  const location = document.getElementById(position);
                  if (location.style.color !== "blue") {
                    location.style.backgroundColor = "green";
                  } else if (location.style.backgroundColor === "white") {
                    return;
                  }
                } else if (endPosition > 10) {
                  const location = document.getElementById(position);
                  try {
                    if (location.style.backgroundColor !== "white") {
                      location.style.backgroundColor = "gray";
                    }
                  } catch {
                    return;
                  }
                }
              }
            }
          }
        }
  
        function checkPositionsValidity(initialRow, initialCol) {
          let mayPlace = "";
          if (boat) {
            for (let i = 0; i < boat.length; i++) {
              if (vertical) {
                let position = `grid-item-${initialRow}_${+initialCol + i}`;
                if (
                  document.getElementById(position)?.style.backgroundColor !==
                  "white"
                ) {
                  mayPlace += "x";
                  if (mayPlace.length === boat.length) {
                    return true;
                  }
                }
              }
              if (horizontal) {
                let position = `grid-item-${+initialRow + i}_${initialCol}`;
                if (
                  document.getElementById(position)?.style.backgroundColor !==
                  "white"
                ) {
                  mayPlace += "x";
                  if (mayPlace.length === boat.length) {
                    return true;
                  }
                }
              }
            }
          } else if (mayPlace.length !== boat.length) {
            return false;
          } else {
            return;
          }
        }
  
        function handleRightClickedSquare(e) {
          e.preventDefault();
          if (removeGameSquareFunctionality === true) {
            for (square of document.getElementsByClassName("gameSquare")) {
              square.removeEventListener(
                "contextmenu",
                handleRightClickedSquare,
                false
              );
              return;
            }
          }
  
          let initialRow = square.id[square.id.length - 3];
          let initialCol = square.id[square.id.length - 1];
  
          if (boat?.length > 0) {
            for (pos of Object.keys(boatObject)) {
              if (boat === boatObject[pos]) {
                boatPositions[pos] = [];
                // console.log(boat)
  
                if (vertical) {
                  if (checkPositionsValidity(initialRow, initialCol) === true) {
                    for (let i = 0; i < boat.length; i++) {
                      let position = `grid-item-${initialRow}_${+initialCol + i}`;
  
                      try {
                        boatPositions[pos].push(+initialRow);
                        boatPositions[pos].push(+initialCol + i);
  
                        document.getElementById(position).style
                          .backgroundColor === "white";
                        let endPosition = +initialCol + boat.length;
                        if (endPosition <= 10) {
                          document.getElementById(
                            position
                          ).style.backgroundColor = "white";
                          document.getElementById(position).style.color = "blue";
                        }
                      } catch {
                        return;
                      }
                    }
                    for (item of boats) {
                      if (item.className.split([" "])[1] === boat) {
                        item.style.color = "brown";
                      }
                    }
                  }
                }
  
                if (horizontal) {
                  if (checkPositionsValidity(initialRow, initialCol) === true) {
                    for (let i = 0; i < boat.length; i++) {
                      let position = `grid-item-${+initialRow + i}_${initialCol}`;
                      try {
                        boatPositions[pos].push(+initialRow + i);
                        boatPositions[pos].push(+initialCol);
  
                        document.getElementById(position).style
                          .backgroundColor === "white";
                        let endPosition = +initialRow + boat.length;
                        if (endPosition <= 10) {
                          document.getElementById(
                            position
                          ).style.backgroundColor = "white";
                          document.getElementById(position).style.color = "blue";
                          // sendShipData(position);
                        }
                      } catch {
                        return;
                      }
                    }
                    for (item of boats) {
                      if (item.className.split([" "])[1] === boat) {
                        item.style.color = "brown";
                      }
                    }
                    boat = "";
                  }
                }
              }
            }
            // console.log("boatpositions:",boatPositions)
          }
  
          let counter = 0;
          for (item of boats) {
            try {
              if (item.style.color === "brown") {
                counter++;
              }
            } catch {
              return;
            }
          }
  
          if (counter === 1) {
            removeGameSquareFunctionality = true;
            const boatData = { boatPositions: boatPositions, id: id };
            const ws = new WebSocket("ws://127.0.0.1:3400");
            ws.addEventListener("open", () => {
              ws.send(JSON.stringify(boatData));
              ws.send(JSON.stringify({ playStatus: true, id: id }));
            });
            readyToPlay = true;
            console.log("enemyPlayStatus:", enemyPlayStatus);
            console.log("readyToPlay:", readyToPlay);
            if (enemyPlayStatus === false) {
              determinePlayerOrder();
            }
          }
          boat = "";
        }
  
        square.addEventListener("mouseover", handleMouseover);
  
        square.addEventListener("click", () => {
          vertical = !vertical;
          horizontal = !horizontal;
          handleMouseover();
        });
  
        square.addEventListener("contextmenu", handleRightClickedSquare, false);
  
        grid.append(square);
      }
    }
  }
  
  createGrid();
  