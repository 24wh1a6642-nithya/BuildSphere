let sections = [
  { id: "general", title: "1. General Points", fields: ["Description"] },
  { id: "faculty_join", title: "2. Faculty Joined", fields: ["Name","Dept","Designation","Date"] },
  { id: "faculty_ach", title: "3. Faculty Achievements", fields: ["Name","Details","Date"] },
  { id: "student_ach", title: "4. Student Achievements", fields: ["Name","Roll","Achievement"] },
  { id: "dept_ach", title: "5. Department Achievements", fields: ["Details","Date"] },
  { id: "faculty_events", title: "6. Faculty Events", fields: ["Event","Coordinator","Participants","Date"] },
  { id: "student_events", title: "7. Student Events", fields: ["Event","Coordinator","Students","Date"] },
  { id: "nontech_events", title: "8. Non Technical Events", fields: ["Event","Coordinator","Students","Date"] },
  { id: "visits", title: "9. Industry Visits", fields: ["Place","Coordinator","Students","Date"] },
  { id: "hackathons", title: "10. Hackathons", fields: ["Event","Mentor","Students","Date"] },
  { id: "fdp", title: "11. Faculty FDP", fields: ["Name","Program","Organizer","Date"] },
  { id: "faculty_visits", title: "12. Faculty Visits", fields: ["Name","Place","Date"] },
  { id: "patents", title: "13. Patents", fields: ["Name","Title","Date"] },
  { id: "vedic", title: "14. VEDIC Programs", fields: ["Program","Students","Date"] },
  { id: "placements", title: "15. Placements", fields: ["Company","Students","Package"] },
  { id: "mou", title: "16. MoUs", fields: ["Organization","Date","Purpose"] },
  { id: "skill", title: "17. Skill Development", fields: ["Program","Coordinator","Students"] }
];

let data = {};

window.onload = () => {
  buildUI();
};

function buildUI() {
  let container = document.getElementById("sections");

  sections.forEach(sec => {
    data[sec.id] = [];

    let html = `<div class="card"><h3>${sec.title}</h3>`;

    sec.fields.forEach(f => {
      html += `<input placeholder="${f}" id="${sec.id}_${f}">`;
    });

    html += `<button onclick="addRow('${sec.id}')">Add</button>`;

    html += `<table id="table_${sec.id}">
      <tr><th>S.No</th>${sec.fields.map(f=>`<th>${f}</th>`).join("")}</tr>
    </table></div>`;

    container.innerHTML += html;
  });
}

function addRow(id) {
  let sec = sections.find(s => s.id === id);
  let row = {};

  sec.fields.forEach(f => {
    row[f] = document.getElementById(`${id}_${f}`).value;
  });

  data[id].push(row);
  renderTable(id);
}

function renderTable(id) {
  let table = document.getElementById("table_" + id);
  let sec = sections.find(s => s.id === id);

  table.innerHTML = `<tr><th>S.No</th>${sec.fields.map(f=>`<th>${f}</th>`).join("")}</tr>`;

  data[id].forEach((r,i) => {
    let row = `<tr><td>${i+1}</td>`;
    Object.values(r).forEach(v => row += `<td>${v}</td>`);
    row += "</tr>";
    table.innerHTML += row;
  });
}

// SAVE
async function saveAll() {
  await fetch("http://localhost:3000/save", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(data)
  });
  alert("Saved");
}

// GENERATE REPORT
async function loadReport() {
  let res = await fetch("http://localhost:3000/get");
  let d = await res.json();

  let output = `
  <div class="pdf">
    <h2>BVRIT HYDERABAD College of Engineering for Women</h2>
    <h3>Department of CSE</h3>
    <h3>Weekly Report</h3>
    <p><b>Week:</b> 23rd March – 28th March</p>
    <hr>
  `;

  sections.forEach(sec => {
    output += `<h4>${sec.title}</h4>`;
    output += `<table>
      <tr>
        <th>S.No</th>
        ${sec.fields.map(f => `<th>${f}</th>`).join("")}
      </tr>`;

    (d[sec.id] || []).forEach((r, i) => {
      output += `<tr><td>${i + 1}</td>`;
      Object.values(r).forEach(v => output += `<td>${v}</td>`);
      output += `</tr>`;
    });

    if (!d[sec.id] || d[sec.id].length === 0) {
      output += `<tr><td colspan="${sec.fields.length + 1}">No Data</td></tr>`;
    }

    output += `</table><br>`;
  });

  output += `</div>`;

  document.getElementById("report").innerHTML = output;
}

function saveWeek() {
  let week = generateWeek();

  if (week === "") return;

  localStorage.setItem("week", week);
}

function generateWeek() {
  let startInput = document.getElementById("startDate").value;

  if (!startInput) {
    alert("Please select a date");
    return "";
  }

  let start = new Date(startInput);
  let end = new Date(start);

  // 7-day range (you can change to +5 if needed)
  end.setDate(start.getDate() + 6);

  function formatDate(date) {
    let d = String(date.getDate()).padStart(2, '0');
    let m = String(date.getMonth() + 1).padStart(2, '0');
    let y = String(date.getFullYear()).slice(-2); // last 2 digits
    return `${d}.${m}.${y}`;
  }

  let startStr = formatDate(start);
  let endStr = formatDate(end);

  return `${startStr} to ${endStr}`;
}

function openReport() {
  window.open("report.html", "_blank");
}

function printReport() {
  window.print();
}