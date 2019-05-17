console.log('JS');

let employees = [
    // {
    //     firstName: 'Jen',
    //     lastName: 'Barber',
    //     employeeId: '4521',
    //     title: 'Team Lead',
    //     annualSalary: 80000
    // }
];

$(document).ready(domReady);

function domReady() {
    console.log('JQ');
    updateEmployeeTable();
    $('#addEmployee').on('click', addEmployee);
} // end of domReady


function addEmployee() {
    let firstName = $('#firstName').val()
    let lastName = $('#lastName').val()
    let employeeId = $('#employeeId').val()
    let title = $('#title').val()
    let annualSalary = Number($('#annualSalary').val())

    let newEmployee = {
        firstName: firstName,
        lastName: lastName,
        employeeId: employeeId,
        title: title,
        annualSalary: annualSalary
    }

    employees.push(newEmployee);
    $('input').val('')
    updateEmployeeTable();

} // end of addEmployee

function updateEmployeeTable() {
    $('#employeeTableBody').empty();
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
    updateTotalMonthly();
}

function updateTotalMonthly() {
    let totalSalary = 0;
    for ( let employee of employees ) {
        totalSalary += employee.annualSalary;
        console.log(totalSalary);
    }
    totalMonthly = totalSalary/12; // format for $ later
    $('#totalMonthly').html(totalMonthly);

}