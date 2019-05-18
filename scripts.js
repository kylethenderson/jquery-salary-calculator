console.log('JS');

let employees = [];

$(document).ready(domReady);

function domReady() {
    console.log('JQ');
    updateEmployeeTable();
    $('#addEmployee').on('click', addEmployee);
    $('input').on('keypress', checkForEnter);
    $('#employeeTableBody').on('click', '.deleteEmployee button', deleteEmployee);
} // end of domReady

function addEmployee() {
    let requiredInputs = $('.required');
    $(requiredInputs).removeClass('error-border');
    
    // get the data from tne inputs
    let first = $('#firstName').val();
    let last = $('#lastName').val();
    let id = $('#employeeId').val();
    let title = $('#title').val();
    let salary = $('#annualSalary').val();

    if ( first.length && last.length && id.length && title.length && salary.length ) {
        // if there are values, create a new object with the data
        let newEmployee = createEmployee(first, last, id, title, Number(salary));
        employees.push(newEmployee);
        $('input').val('') // clear the inputs
        updateEmployeeTable(); // update the table
        $('#firstName').focus();
    } // end if all inputs have values
    else {
        // if there's a missing input
        for ( input of requiredInputs ) {
          // add error border for each missing input
          if ( input.value.length === 0 ) {
            $('#'+input.id).addClass('error-border');
          } // end if to check each input for data
        } // end for to check each input for !empty
        $('#errorMsg').html("Please fill out required fields."); // add error message if an input is missing
      }

} // end of addEmployee

function checkForEnter() {
    if ( event.which === 13 ) {
        addEmployee();
    }
}

function updateEmployeeTable() {
    $('#employeeTableBody').empty();
    $('#employeeTableBody').append(`
        <tr>
            <td colspan="6" id="emptyRow">&nbsp</td><!-- Empty row -->
        </tr>
    `)
    for (let employee of employees) {
        $('#employeeTableBody').prepend(`
            <tr>
                <td>${employee.firstName}</td>
                <td>${employee.lastName}</td>
                <td>${employee.employeeId}</td>
                <td>${employee.title}</td>
                <td>`+ convertToCurrency.format(employee.annualSalary) +`</td>
                <td class="deleteEmployee"><button id="${employee.employeeId}">Delete</button></td>
            </tr>
        `)
    }
    updateTotalMonthly();
}

function updateTotalMonthly() { 
    let totalSalary = 0;
    for ( let employee of employees ) {
        totalSalary += employee.annualSalary;
    }
    totalMonthly = totalSalary/12;
    if ( totalMonthly > 20000 ) {
        $('.totalDisplayWrapper h2').addClass('over-budget');
    } else {
        $('.totalDisplayWrapper h2').removeClass('over-budget');
    }
    // format totalMonthly to currency. 
    $('#totalMonthly').html( convertToCurrency.format(totalMonthly));

}

function deleteEmployee() {
    for ( let i = 0; i<employees.length; i++ ) {
        if ( employees[i].employeeId === this.id ) {
            employees.splice(i, 1);
        }
    }
    // employees = employees.filter( employee => employee.employeeId != this.id );
    updateEmployeeTable();
}

function createEmployee( first, last, id, title, salary) {
    let newEmployee = {
        firstName: first,
        lastName: last,
        employeeId: id,
        title: title,
        annualSalary: salary
    }
    return newEmployee;
}

// format numbers to currency
const convertToCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  })