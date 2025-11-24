
      let board;
      let currentPlayer;
      const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      function startGame() {
        board = Array.from(Array(9).keys());
        currentPlayer = "Player 1";
        const cells = document.querySelectorAll(".column-tic");
        cells.forEach((cell) => {
          cell.querySelector(".cercle").style.display = "none";
          cell.querySelector(".tick").style.display = "none";
          cell.style.pointerEvents = "auto";
        });

        var audio = document.getElementById("background-audio");
        var playPromise = audio.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.log("Autoplay failed: ", error);
            document.body.addEventListener(
              "click",
              () => {
                audio.play();
              },
              { once: true }
            );
          });
        }
      }

      function makeMove(cell, index) {
        if (typeof board[index] === "number") {
          board[index] = currentPlayer;
          if (currentPlayer === "Player 1") {
            cell.querySelector(".tick").style.display = "block";
          } else {
            cell.querySelector(".cercle").style.display = "block";
          }
          if (checkWin(board, currentPlayer)) {
            gameOver(currentPlayer + " Wins!");
          } else if (checkTie()) {
            gameOver("Tie");
          } else {
            currentPlayer =
              currentPlayer === "Player 1" ? "Player 2" : "Player 1";
          }
        }
      }

      function checkWin(board, player) {
        return winPatterns.some((pattern) => {
          return pattern.every((index) => board[index] === player);
        });
      }

      function gameOver(message) {
        const cells = document.querySelectorAll(".column-tic");
        cells.forEach((cell) => (cell.style.pointerEvents = "none"));
        setTimeout(() => alert(message), 100);
        setTimeout(() => startGame(), 2000);
      }

      function checkTie() {
        return board.every((cell) => typeof cell !== "number");
      }

      window.onload = startGame;