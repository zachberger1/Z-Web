
    //////////////////////////////////////////////////////////////////////////dfd


    let stopwatchInterval;
    let stopwatchSeconds = 0;

    function updateClocks() {
      // Get current time in different time zones
      const israelTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Jerusalem" });
      const newYorkTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
      const losAngelesTime = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

      // Update clock elements
      document.getElementById("israelClock").querySelector("p").innerText = israelTime;
      document.getElementById("newYorkClock").querySelector("p").innerText = newYorkTime;
      document.getElementById("losAngelesClock").querySelector("p").innerText = losAngelesTime;
    }

    function updateStopwatchDisplay() {
      const hours = Math.floor(stopwatchSeconds / 3600);
      const minutes = Math.floor((stopwatchSeconds % 3600) / 60);
      const seconds = stopwatchSeconds % 60;
      const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
      document.getElementById("stopwatch-display").innerText = formattedTime;
    }

    function startStopwatch() {
      stopwatchInterval = setInterval(function () {
        stopwatchSeconds++;
        updateStopwatchDisplay();
      }, 1000);
    }

    function stopStopwatch() {
      clearInterval(stopwatchInterval);
    }

    function resetStopwatch() {
      stopwatchSeconds = 0;
      updateStopwatchDisplay();
      clearInterval(stopwatchInterval);
    }

    // Update clocks every second
    setInterval(updateClocks, 1000);

    // Initial update
    updateClocks();