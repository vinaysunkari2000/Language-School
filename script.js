function getStoredStudents() {
  return JSON.parse(localStorage.getItem("students") || "[]");
}

function saveStudents(students) {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStudent() {
  const name = document.getElementById("studentName").value.trim();
  const language = document.getElementById("language").value;

  if (!name || language === "Select Language") {
    alert("Please fill out both fields.");
    return;
  }

  const students = getStoredStudents();
  students.push({ name, language });
  saveStudents(students);
  updateStudentList();

  document.getElementById("studentName").value = "";
  document.getElementById("language").selectedIndex = 0;
}

function updateStudentList() {
  const students = getStoredStudents();
  const list = document.getElementById("studentList");
  if (!list) return;

  list.innerHTML = "";
  students.forEach((student, index) => {
    list.innerHTML += `
      <li class="list-group-item d-flex justify-content-between">
        ${student.name} - ${student.language}
        <button class="btn btn-sm btn-danger" onclick="deleteStudent(${index})">Delete</button>
      </li>`;
  });
}

function deleteStudent(index) {
  const students = getStoredStudents();
  students.splice(index, 1);
  saveStudents(students);
  updateStudentList();
}

// ✅ GLOBAL FUNCTION for analytics chart
function getEnrollmentStats() {
  const students = getStoredStudents();
  const counts = {};
  for (const s of students) {
    counts[s.language] = (counts[s.language] || 0) + 1;
  }
  return counts;
}

window.onload = function () {
  updateStudentList();
};
