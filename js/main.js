function registerStudent() {
  const name = document.getElementById("studentName").value.trim();
  const language = document.getElementById("language").value;

  if (!name || language === "Select Language") {
    alert("Please fill out both fields.");
    return;
  }

  const students = JSON.parse(localStorage.getItem("students") || "[]");
  students.push({ name, language });
  localStorage.setItem("students", JSON.stringify(students));
  updateStudentList();

  document.getElementById("studentName").value = "";
  document.getElementById("language").selectedIndex = 0;
}

function updateStudentList() {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const list = document.getElementById("studentList");
  if (!list) return;

  list.innerHTML = "";
  students.forEach((student, index) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center">
        ${student.name} - ${student.language}
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button>
      </li>`;
  });
}

function deleteStudent(index) {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  updateStudentList();
}

function getEnrollmentStats() {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const counts = {};
  for (const s of students) {
    counts[s.language] = (counts[s.language] || 0) + 1;
  }
  return counts;
}

function loadChartData() {
  const stats = getEnrollmentStats();
  const labels = Object.keys(stats);
  const values = Object.values(stats);

  const canvas = document.getElementById("myChart");
  if (!canvas || labels.length === 0) return;

  const ctx = canvas.getContext("2d");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Students per Language",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

window.onload = function () {
  if (document.getElementById("studentList")) updateStudentList();
  if (document.getElementById("myChart")) loadChartData();
};
