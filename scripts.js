console.log('JS');

let employees = [];

$(document).ready(domReady);

function domReady() {
    console.log('JQ');
    $('#addEmployee').on('click', addEmployee);
}


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
    console.log(newEmployee);
    
}