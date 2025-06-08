let editingIndex = -1;

function registerStudent() {
  const name = document.getElementById("studentName").value.trim();
  const email = document.getElementById("studentEmail").value.trim();
  const mobile = document.getElementById("studentMobile").value.trim();
  const gender = document.getElementById("studentGender").value;
  const dob = document.getElementById("studentDOB").value;
  const language = document.getElementById("language").value;

  if (!name || !email || !mobile || gender === "Select Gender" || !dob || language === "Select Language") {
    alert("Please fill out all fields.");
    return;
  }

  const students = JSON.parse(localStorage.getItem("students") || "[]");

  const studentData = { name, email, mobile, gender, dob, language };

  if (editingIndex >= 0) {
    students[editingIndex] = studentData;
    editingIndex = -1;
    document.getElementById("submitBtn").textContent = "Register";
  } else {
    students.push(studentData);
  }

  localStorage.setItem("students", JSON.stringify(students));
  updateStudentList();

  document.getElementById("studentName").value = "";
  document.getElementById("studentEmail").value = "";
  document.getElementById("studentMobile").value = "";
  document.getElementById("studentGender").selectedIndex = 0;
  document.getElementById("studentDOB").value = "";
  document.getElementById("language").selectedIndex = 0;
}

function updateStudentList() {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const list = document.getElementById("studentList");
  if (!list) return;

  list.innerHTML = "";
  students.forEach((student, index) => {
    list.innerHTML += `
      <li class="list-group-item">
        <strong>${student.name}</strong> - ${student.language}<br>
        &#128231; ${student.email} | &#128241; ${student.mobile} | &#129489; ${student.gender} | &#127874; ${student.dob}
        <button class="btn btn-sm btn-warning me-2" onclick="editStudent(${index})">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button>
      </li>`;
  });
}

function editStudent(index) {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const student = students[index];

  document.getElementById("studentName").value = student.name;
  document.getElementById("studentEmail").value = student.email;
  document.getElementById("studentMobile").value = student.mobile;
  document.getElementById("studentGender").value = student.gender;
  document.getElementById("studentDOB").value = student.dob;
  document.getElementById("language").value = student.language;

  editingIndex = index;
  document.getElementById("submitBtn").textContent = "Update";
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
  const cardCourses = document.getElementById("cardCourses");
  const cardMaterials = document.getElementById("cardMaterials");
  const cardMentoring = document.getElementById("cardMentoring");
  const results = document.getElementById("cardResults");

  if (document.getElementById("studentList")) updateStudentList();
  if (document.getElementById("myChart")) loadChartData();

  if (cardCourses && results) {
    cardCourses.addEventListener("click", () => {
      results.innerHTML = `
        <h4 class="mb-3">Available Languages</h4>
        <ul>
          <li>English</li>
          <li>Spanish</li>
          <li>French</li>
          <li>German</li>
          <li>Japanese</li>
          <li>Hindi</li>
        </ul>
      `;
    });
  }

  if (cardMaterials) {
    cardMaterials.addEventListener("click", () => {
      alert("Please register for a language to view study materials.");
    });
  }

  if (cardMentoring && results) {
    cardMentoring.addEventListener("click", () => {
      results.innerHTML = `
        <h4 class="mb-3">Available Mentors</h4>
        <ul>
          <li>Rajesh Kumar - French Expert</li>
          <li>Elena Rodriguez - Spanish Coach</li>
          <li>Yuki Tanaka - Japanese Mentor</li>
          <li>Sarah Johnson - English Specialist</li>
          <li>Kapil - Hindi Expert</li>
          <li>Dong Lee - Chinese Coach</li>
        </ul>
      `;
    });
  }
};
