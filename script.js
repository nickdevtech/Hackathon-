let startTime,
  endTime,
  pauseTime,
  timerInterval,
  elapsedPaused = 0;
const logs = [];

// Show tracking controls
document.getElementById("startSession").addEventListener("click", () => {
  document.getElementById("trackingControls").style.display = "block";
  document.getElementById("startSession").style.display = "none";
});

// Start tracking
document.getElementById("startTracking").addEventListener("click", () => {
  const taskName = document.getElementById("taskName").value;
  if (!taskName) {
    alert("Please enter task details.");
    return;
  }

  startTime = new Date();
  document.getElementById("startTracking").style.display = "none";
  document.getElementById("pauseTracking").style.display = "block";
  document.getElementById("stopTracking").style.display = "block";
  document.getElementById("timerDisplay").style.display = "block";

  // Start the timer
  timerInterval = setInterval(updateTimer, 1000);
});

// Pause tracking
document.getElementById("pauseTracking").addEventListener("click", () => {
  clearInterval(timerInterval);
  pauseTime = new Date();
  document.getElementById("pauseTracking").style.display = "none";
  document.getElementById("resumeTracking").style.display = "block";
});

// Resume tracking
document.getElementById("resumeTracking").addEventListener("click", () => {
  elapsedPaused += (new Date() - pauseTime) / 1000;
  timerInterval = setInterval(updateTimer, 1000);



  document.getElementById("resumeTracking").style.display = "none";
  document.getElementById("pauseTracking").style.display = "block";
});

// Stop tracking
document.getElementById("stopTracking").addEventListener("click", () => {
  clearInterval(timerInterval);
  endTime = new Date();
  const totalElapsedTime = (endTime - startTime - elapsedPaused) / 1000 / 60;
  const duration = totalElapsedTime.toFixed(2);
  const formattedStartTime = startTime.toLocaleString();
  const formattedEndTime = endTime.toLocaleString();

  logs.push({
    start: formattedStartTime,
    end: formattedEndTime,
    duration: `${duration} mins`,
  });
  renderLogs();

  document.getElementById("stopTracking").style.display = "none";
  document.getElementById("pauseTracking").style.display = "none";
  document.getElementById("resumeTracking").style.display = "none";
  document.getElementById("startTracking").style.display = "block";
  document.getElementById("timerDisplay").style.display = "none";
  document.getElementById("taskName").value = "";
  elapsedPaused = 0;
});

// Update timer display
function updateTimer() {
  const elapsed = new Date() - startTime - elapsedPaused;
  const hours = Math.floor(elapsed / (1000 * 60 * 60));
  const minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((elapsed % (1000 * 60)) / 1000);
  document.getElementById("timerDisplay").textContent = `Timer: ${String(
    hours
  ).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;
}

// Render logs
function renderLogs() {
  const logTableBody = document.getElementById("logTableBody");
  logTableBody.innerHTML = "";

  logs.forEach((log, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${log.start}</td>
                    <td>${log.end}</td>
                    <td>${log.duration}</td>
                    <td><button class="delete-btn" onclick="deleteLog(${index})">Delete</button></td>
                `;
    logTableBody.appendChild(row);
  });

  document.getElementById("logSection").style.display = "block";
}

// Delete log
function deleteLog(index) {
  logs.splice(index, 1);
  renderLogs();
}
