// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const waterCount = document.getElementById("waterCount");
const zeroCount = document.getElementById("zeroCount");
const powerCount = document.getElementById("powerCount");
const attendeeList = document.getElementById("attendeeList");

// Track attendance
let count = 0;
const maxCount = 50;
let attendees = [];

// Add one attendee to the visible list
function addAttendeeToList(name, teamName) {
  const listItem = document.createElement("li");
  const attendeeName = document.createElement("span");
  const attendeeTeam = document.createElement("span");

  attendeeName.className = "attendee-name";
  attendeeName.textContent = name;
  attendeeTeam.className = "attendee-team";
  attendeeTeam.textContent = teamName;

  listItem.appendChild(attendeeName);
  listItem.appendChild(attendeeTeam);
  attendeeList.appendChild(listItem);
}

// Restore saved attendance totals when the page loads
const savedCount = localStorage.getItem("attendanceCount");
if (savedCount !== null) {
  count = parseInt(savedCount, 10);
}

attendeeCount.textContent = count;
progressBar.style.width = Math.round((count / maxCount) * 100) + "%";

const savedWaterCount = localStorage.getItem("waterCount");
if (savedWaterCount !== null) {
  waterCount.textContent = savedWaterCount;
}

const savedZeroCount = localStorage.getItem("zeroCount");
if (savedZeroCount !== null) {
  zeroCount.textContent = savedZeroCount;
}

const savedPowerCount = localStorage.getItem("powerCount");
if (savedPowerCount !== null) {
  powerCount.textContent = savedPowerCount;
}

const savedAttendees = localStorage.getItem("attendees");
if (savedAttendees !== null) {
  attendees = JSON.parse(savedAttendees);

  for (let index = 0; index < attendees.length; index++) {
    addAttendeeToList(attendees[index].name, attendees[index].teamName);
  }
}

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, team, teamName);

  // Increment count
  count++;
  attendeeCount.textContent = count;
  console.log("Total check-ins:", count);

  // Update progress bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  progressBar.style.width = percentage;
  console.log(`Progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  teamCounter.textContent = parseInt(teamCounter.textContent, 10) + 1;

  // Save the total and each team count in the browser
  localStorage.setItem("attendanceCount", count);
  localStorage.setItem("waterCount", waterCount.textContent);
  localStorage.setItem("zeroCount", zeroCount.textContent);
  localStorage.setItem("powerCount", powerCount.textContent);

  // Add and save this attendee so the list remains after a refresh
  attendees.push({ name: name, teamName: teamName });
  localStorage.setItem("attendees", JSON.stringify(attendees));
  addAttendeeToList(name, teamName);

  // Show welcome message
  const message = `Welcome, ${name} from ${teamName}!`;
  if (count === maxCount) {
    greeting.textContent = "YAY ";

    const winningTeam = document.createElement("strong");
    winningTeam.textContent = `${teamName}!`;
    greeting.appendChild(winningTeam);
  } else {
    greeting.textContent = message;
  }

  greeting.classList.add("success-message");
  greeting.style.display = "block";
  console.log(message);

  form.reset();
});
