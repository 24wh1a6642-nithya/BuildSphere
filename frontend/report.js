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

async function loadReport() {
  let res = await fetch("http://localhost:3000/get");
  let d = await res.json();

  let output = "";

  sections.forEach(sec => {
    output += `<h4>${sec.title}</h4>`;
    output += `<table>
      <tr>
        <th>S.No</th>
        ${sec.fields.map(f => `<th>${f}</th>`).join("")}
      </tr>`;

    (d[sec.id] || []).forEach((r, i) => {
      output += `<tr><td>${i+1}</td>`;
      Object.values(r).forEach(v => output += `<td>${v}</td>`);
      output += `</tr>`;
    });

    output += `</table><br>`;
  });

  document.getElementById("report").innerHTML = output;
}

loadReport();

function downloadPDF() {
  window.print();
}

function downloadDOC() {
  let content = document.getElementById("reportContent").innerHTML;

  let blob = new Blob([content], { type: "application/msword" });

  let link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "WeeklyReport.doc";
  link.click();
}

document.getElementById("weekDisplay").innerText =
  localStorage.getItem("week") || "Not Selected";

function downloadPDF() {
  window.print();
}