



let isPaused = false;
let intervalId = null;
const togglePauseResume = () => {
    isPaused = !isPaused;
  };
 
document.getElementById('pause-resume').addEventListener('click', togglePauseResume);
document.getElementById('reset').addEventListener('click',()=>{
    clearInterval(intervalId);
    document.getElementById('time').innerHTML = '00 : 00 : 00'
})
 
const showMessage = (message, type) => {
    let messageContainer = document.getElementById("errormessage");
    messageContainer.innerHTML = message;
 
    messageContainer.classList.remove("error-color", "success-color");
    messageContainer.classList.add(type === "error" ? "error-color" : "success-color");
 
    hideErrorMessage(messageContainer);
};
 
const hideErrorMessage = (element) => {
    setTimeout(() => {
        element.innerHTML = "";
        element.classList.remove("error-color", "success-color");
    }, 3000);
};
 
 
const btbClickHandler = (event) => {
    const hoursTxt = document.getElementById("id_hours");
    const minsTxt = document.getElementById("id_minutes");
    const secsTxt = document.getElementById("id_seconds");
    isPaused = false
    intervalId = null;
    const hours = parseInt(hoursTxt.value, 10);
    const mins = parseInt(minsTxt.value, 10);
    const secs = parseInt(secsTxt.value, 10);
    console.log(hours + ' ' + mins +" "+secs)
    if (validate(hours, mins, secs)) {
        hoursTxt.value = "00";
      minsTxt.value = "00";
      secsTxt.value = "00";
      return;
    }
   
 
    hoursTxt.value = "00";
    minsTxt.value = "00";
    secsTxt.value = "00";
 
    const totalTimeInSeconds = hours * 3600 + mins * 60 + secs;
    timerImplementation(totalTimeInSeconds);
};
 
document.getElementById("btn").addEventListener("click", btbClickHandler);
 
const validate = (...timeUnits) => {
    for (let time of timeUnits) {
      if (isNaN(time) || time < 0) {
        showMessage("Please enter a valid time. Time should be a non-negative number.", "error");
        return true;
      }
      if (isNaN(time) || time > 60) {
        showMessage("Please enter a valid time. Invalid Time.", "error");
        return true;
      }
    }
 
    return false;
};
 
 
 
const timerImplementation = (timeInSeconds) => {
    let hours = Math.floor(timeInSeconds / 3600);
    let mins = Math.floor((timeInSeconds % 3600) / 60);
    let secs = timeInSeconds % 60;
   
    let timeContainer = document.getElementById("time");
   
    intervalId = setInterval(() => {
        if (!isPaused) { // Run the timer only when it's not paused
          // Your previous code
          if (secs === 0) {
            if (mins === 0) {
              if (hours === 0) {
                clearInterval(intervalId);
                showMessage("Timer done", "success");
                timerSound.play();
                setTimeout(() => {
                  timerSound.pause();
                  timerSound.currentTime = 0;
                }, 5000)
               
                return;
              }
 
              --hours;
              mins = 59;
            } else {
              --mins;
            }
 
            secs = 60;
          }
       
          --secs;
          timeContainer.innerHTML = `${String(hours).padStart(2, '0')} : ${String(mins).padStart(2, '0')} : ${String(secs).padStart(2, '0')}`;
        }
      }, 1000);
 
       
};
 
let timerSound = new Audio("mixkit-ice-hockey-sports-buzzer-941.wav");