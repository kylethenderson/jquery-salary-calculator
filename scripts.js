console.log('JS');

let employees = [
    {
        firstName: 'Jen',
        lastName: 'Barber',
        employeeId: '4521',
        title: 'Team Lead',
        annualSalary: 80000
    },
    {
        firstName: 'Maurice',
        lastName: 'Moss',
        employeeId: '8724',
        title: 'Support Team',
        annualSalary: 58000
    },
    {
        firstName: 'Roy',
        lastName: 'Smith',
        employeeId: '9623',
        title: 'Quality Assurance',
        annualSalary: 48000
    }
];

$(document).ready(domReady);

function domReady() {
    console.log('JQ');
    updateEmployeeTable();
    $('#addEmployee').on('click', addEmployee);
    $('#employeeTableBody').on('click', '.deleteEmployee button', deleteEmployee);
} // end of domReady


function addEmployee() {
    let requiredInputs = $('.required');
    $(requiredInputs).removeClass('error-border');
    
    let first = $('#firstName').val();
    let last = $('#lastName').val();
    let id = $('#employeeId').val();
    let title = $('#title').val();
    let salary = $('#annualSalary').val();

    if ( first.length && last.length && id.length && title.length && salary.length ) {
        let newEmployee = new Employee(first, last, id, title, salary);
        employees.push(newEmployee);
        console.log(newEmployee);
        $('input').val('')
        updateEmployeeTable();
    } // if all inputs have values
    else {
        for ( input of requiredInputs ) {
          // add error border if input is empty
          if ( input.value.length === 0 ) {
            $('#'+input.id).addClass('error-border');
          } // end if to check each input for data
        } // end for to check each input for !empty
        $('#errorMsg').html("Please fill out required fields."); // add error message if an input is missing
      }

} // end of addEmployee

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
                <td>$ ${employee.annualSalary}</td>
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
        console.log(totalSalary);
    }
    totalMonthly = totalSalary/12;
    console.log(totalMonthly);
    console.log(typeof totalMonthly);
    if ( totalMonthly > 20000 ) {
        $('.totalDisplayWrapper h2').css('background-color', '#b10021');
        $('.totalDisplayWrapper h2').css('color', '#ffffff');
    } else {
        $('.totalDisplayWrapper h2').css('background-color', '#ffffff');
        $('.totalDisplayWrapper h2').css('color', '#000000');
    }
    // format totalMonthly to currency. 
    $('#totalMonthly').html(totalMonthly);

}

function deleteEmployee() {
    employees = employees.filter( employee => employee.employeeId != this.id );
    updateEmployeeTable();
}

class Employee {
    constructor ( first, last, id, title, salary) {
        this.firstName = first;
        this.lastName = last;
        this.employeeId = id;
        this.title = title;
        this.annualSalary = Number(salary);
    }
}