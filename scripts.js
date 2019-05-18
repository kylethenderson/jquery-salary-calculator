console.log('JS');

let employees = [
    {
        firstName: 'Steve',
        lastName: 'Rodgers',
        employeeId: '1',
        title: 'Captain America',
        annualSalary: 50000
    },
    {
        firstName: 'Tony',
        lastName: 'Stark',
        employeeId: '3',
        title: 'Iron Man',
        annualSalary: 75000
    },
    {
        firstName: 'Carol',
        lastName: 'Danvers',
        employeeId: '2',
        title: 'Captain Marvel',
        annualSalary: 50000
    }
];

$(document).ready(domReady);

function domReady() {
    console.log('JQ');
    updateEmployeeTable();
    $('#addEmployee').on('click', addEmployee);
    $('input').on('keypress', checkForEnter);
    $('#employeeTableBody').on('click', '.deleteEmployee button', deleteEmployee);
} // end of domReady

function addEmployee() {
    let requiredInputs = $('.required'); // get all required inputs
    $('#errorMsg').html(''); // remove error msg
    $(requiredInputs).removeClass('error-border'); // remove all error borders
    let availableId = true;

    // get the data from the inputs
    let first = $('#firstName').val();
    let last = $('#lastName').val();
    let id = $('#employeeId').val();
    let title = $('#title').val();
    let salary = $('#annualSalary').val();

    for (let employee of employees) {
        if (employee.employeeId === id) {
            availableId = false;
        }
    }// end loop to make sure employee id is available.

    if (first.length && last.length && id.length && title.length && salary.length && availableId) {
        // if all have values, create a new object with the data
        let newEmployee = createEmployee(first, last, id, title, Number(salary));
        employees.push(newEmployee);
        $('input').val('') // clear the inputs
        updateEmployeeTable(); // update the table
        $('#firstName').focus(); // move cursor back to first input
    } // end if all inputs have values
    else {
        // if there's a missing input
        for (input of requiredInputs) {
            // add error border for each missing input
            if (input.value.length === 0) {
                $('#' + input.id).addClass('error-border');
            } // end if to check each input for data
        } // end for to check each input for !empty
        $('#errorMsg').html("*Please fill out required fields and ensure ID already isn't in use."); // add error message if an input is missing
    }

} // end of addEmployee

function checkForEnter() {
    if (event.which === 13) {
        addEmployee();
    } // end call addEmployee if keypress is 'enter'
} // end checkForEnter

function updateEmployeeTable() {
    $('#employeeTableBody').empty();
    $('#employeeTableBody').append(`
        <tr>
            <td colspan="6" id="emptyRow">&nbsp</td><!-- Empty row -->
        </tr>
    `)
    // loop through array and append new table row with data for each employee
    for (let employee of employees) {
        $('#employeeTableBody').prepend(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.employeeId}</td>
                <td>${employee.title}</td>
                <td>${convertToCurrency.format(employee.annualSalary)}</td>
                <td class="deleteEmployee"><button id="${employee.employeeId}">Delete</button></td>
            </tr>
        `)
    }// end append row/data to table
    updateTotalMonthly();
} // end updateEmployeeTable

function updateTotalMonthly() {
    let totalSalary = 0;
    for (let employee of employees) {
        totalSalary += employee.annualSalary;
    }
    totalMonthly = totalSalary / 12;
    if (totalMonthly > 20000) {
        $('.totalDisplayWrapper h2').addClass('over-budget');
    } else {
        $('.totalDisplayWrapper h2').removeClass('over-budget');
    }
    // format totalMonthly to currency. 
    $('#totalMonthly').html(convertToCurrency.format(totalMonthly));

}// end updateTotalMonthly

function deleteEmployee() {
    for (let i = 0; i < employees.length; i++) {
        if (employees[i].employeeId === this.id) {
            employees.splice(i, 1);
        }
    }
    // employees = employees.filter( employee => employee.employeeId != this.id );
    updateEmployeeTable();
}// end deleteEmployee

function createEmployee(first, last, id, title, salary) {
    let newEmployee = {
        firstName: first,
        lastName: last,
        employeeId: id,
        title: title,
        annualSalary: salary
    }
    return newEmployee;
}//createEmployee

// format numbers to currency
const convertToCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})