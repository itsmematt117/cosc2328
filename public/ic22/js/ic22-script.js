// IC22 – COSC 2328 – Professor McCurry
// Implemented by: Matthew Davis

/*
1) db.all() would show the user every entry vs db.get() would return a specific one
2) This leaves the sql injection vulnerability in the code and is exploitable. If someone did this code 
the 1 would satisfy the original query, and the table would also be dropped.
3)  It handles it by using the '...' notation, which allows further parameters to be passed in.
 
*/


async function loadStudents() {
    const response = await fetch('/ic22/students');
    const students = await response.json();

    const list = document.getElementById('student-list');
    list.innerHTML = '';

    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
        list.appendChild(li);
    });

}

document.getElementById('lookup-btn').addEventListener('click', async () => {
    const id = document.getElementById('student-id').value;
    const result = document.getElementById('student-result');

    const response = await fetch(`/ic22/students/${id}`);
    const student = await response.json();

    if (student.message) {
        result.textContent = student.message;
    } else {
        result.textContent = `${student.first_name} ${student.last_name} - ${student.classification}, ${student.major}`;
    }
});

loadStudents();
