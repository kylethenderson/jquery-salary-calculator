console.log('JS');

let employees = [];

$(document).ready(domReady);

function domReady() {
    console.log('JQ');
    $('#addEmployee').on('click', addEmployee);
} // end of domReady


function addEmployee() {
    let firstName = $('#firstName').val()
    let lastName = $('#lastName').val()
    let employeeId = $('#employeeId').val()
    let title = $('#title').val()
    let annualSalary = $('#annualSalary').val()

    let newEmployee = {
        firstName: firstName,
        lastName: lastName,
        employeeId: employeeId,
        title: title,
        annualSalary: annualSalary
    }

    employees.push(newEmployee);

    updateEmployeeTable();

} // end of addEmployee

function updateEmployeeTable() {
    for (let employee of employees) {
        $('#employeeTableBody').append(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.employeeId}</td>
                <td>${employee.title}</td>
                <td>$ ${employee.annualSalary}</td>
                <td><button class="deleteEmployee">Delete</button></td>
            </tr>
        `)
    }
}