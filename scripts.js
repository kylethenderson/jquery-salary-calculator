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
    $('input').removeClass('error-border');
    
    let firstName = $('#firstName').val()
    let lastName = $('#lastName').val()
    let employeeId = $('#employeeId').val()
    let title = $('#title').val()
    let annualSalary = Number($('#annualSalary').val())

    if ( firstName.length && lastName.length && employeeId.length && title.length && annualSalary.length ) {
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
    } // if all inputs have values
    else {
        let inputs = $('input');
        for ( input of inputs ) {
            console.log(input);
        }
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