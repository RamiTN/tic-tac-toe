
      function showDifficulty() {
        var difficultyElement = document.querySelector(".difficulty");
        difficultyElement.style.display = "inline-block";
      }
      function NotYet() {
        window.alert(
          "The game is under constraction! Thank you for visiting us return later"
        );
      }
      function cancel() {
        var difficultyElement = document.querySelector(".difficulty");
        difficultyElement.style.display = "none";
      }
      function playsoundeffect() {
        var soundeffect = document.getElementById("audio");
        var starttime = 4.13;
        audio.currentTime = starttime;
        soundeffect.play();
      }
      window.onload = function () {
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
      };

