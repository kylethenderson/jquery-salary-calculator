// console.log('JS');

let avengers = [
    {
        firstName: 'Steve',
        lastName: 'Rodgers',
        avengerId: '1',
        title: 'Captain America',
        annualSalary: 25000
    },
    {
        firstName: 'Carol',
        lastName: 'Danvers',
        avengerId: '2',
        title: 'Captain Marvel',
        annualSalary: 25000
    },
    {
        firstName: 'Tony',
        lastName: 'Stark',
        avengerId: '3',
        title: 'Iron Man',
        annualSalary: 30000
    },
    {
        firstName: 'Thor',
        lastName: 'Odinson',
        avengerId: '4',
        title: 'God of Thunder',
        annualSalary: 30000
    }
];

$(document).ready(domReady);

function domReady() {
    // console.log('JQ');
    updateAvengerTable(); // fill table with data on load
    $('#firstName').focus(); // move cursor and focus to first input
    $('#addAvenger').on('click', addAvenger); // bind click event to addAvenger
    $('input').on('keypress', checkForEnter); // bind keypress event to inputs
    $('#avengerTableBody').on('click', '.delete-avenger button', deleteAvenger); // bind click event to delete-avenger button
} // end of domReady

// refactor this function to split into multiple functions and simplify each
function addAvenger() {
    const requiredInputs = $('.required'); // get all required input elements
    $('#errorMsg').html(''); // remove error msg
    $(requiredInputs).removeClass('error-border'); // remove all error borders

    // get the data from the inputs
    const first = $('#firstName').val();
    const last = $('#lastName').val();
    const id = $('#avengerId').val();
    const title = $('#title').val();
    const salary = $('#annualSalary').val();

    if (first.length && last.length && id.length && title.length && salary.length) {
        // if all have values, make sure id is available
        const availableId = avengers.filter(x => x.avengerId === id);
        if (!availableId.length) {
            let newAvenger = createAvenger(first, last, id, title, Number(salary)); // create newAvenger object
            avengers.push(newAvenger); // add newAvenger to the array of avengers
            $('input').val('') // clear the inputs
            updateAvengerTable(); // refresh the table once an avenger is added to the array
            $('#firstName').focus(); // move cursor back to first input
        }
        else {
            $('#errorMsg').html('*ID is already in use, please use another.'); // update error message
            $('#avengerId').addClass('error-border'); // add error border to the ID field
            $('#avengerId').focus(); // move cursor to the ID field
        }
    } // end if all inputs have values
    else {
        // if there's a missing input
        for (input of requiredInputs) {
            // add error border for each missing input
            if (input.value.length === 0) {
                $('#' + input.id).addClass('error-border');
            } // end if to check each input for data
        } // end for to check each input for !empty
        $('#errorMsg').html("*Please fill out required fields."); // add error message if an input is missing
    }

} // end of addAvenger

function createAvenger(first, last, id, title, salary) {
    let newAvenger = {
        firstName: first,
        lastName: last,
        avengerId: id,
        title: title,
        annualSalary: salary
    }
    return newAvenger;
}//createAvenger

function checkForEnter() {
    if (event.which === 13) {
        addAvenger();
    } // end call addAvenger if keypress is 'enter'
} // end checkForEnter

function updateAvengerTable() {
    $('#avengerTableBody').empty();
    for (let avenger of avengers) {
        $('#avengerTableBody').append(`
            <tr>
                <td>${avenger.firstName}</td>
                <td>${avenger.lastName}</td>
                <td>${avenger.avengerId}</td>
                <td>${avenger.title}</td>
                <td>${convertToCurrency.format(avenger.annualSalary)}</td>
                <td class="delete-avenger"><button id="${avenger.avengerId}">Fire ${avenger.firstName}</button></td>
            </tr>
        `)
    }// end append row/data to table
    updateTotalMonthly(); // refresh monthly total after appending newAvenger
} // end updateAvengerTable

function updateTotalMonthly() {
    let totalSalary = 0;
    for (let avenger of avengers) {
        totalSalary += avenger.annualSalary;
    }
    const totalMonthly = totalSalary / 12;
    if (totalMonthly > 20000) {
        $('.totalDisplayWrapper h2').addClass('over-budget'); // create red background for monthly salaries
        $('input, #addAvenger').attr({ disabled: true }).addClass('disabled'); //disable inputs and add disable class
        $('#errorMsg').html('*Monthly salary expense is too high. Remove an Avenger from the team.'); // add over budget error message
    } else {
        $('.totalDisplayWrapper h2').removeClass('over-budget'); // remove red background for monthly salaries
        $('input, #addAvenger').attr({ disabled: false }).removeClass('disabled'); //enable inputs and remove disabled class
        $('#errorMsg').html(''); //remove over budget error message
    }
    // format totalMonthly to currency. 
    $('#totalMonthly').html(convertToCurrency.format(totalMonthly));

}// end updateTotalMonthly

function deleteAvenger() {
    for (let i = 0; i < avengers.length; i++) {
        if (avengers[i].avengerId === this.id) {
            // confirm user wants to remove avenger from the array
            let confirmation = confirm(`Are you sure you want to fire ${avengers[i].title} from the Avengers?`);
            if (confirmation) {
                avengers.splice(i, 1);
            }
        }
    }
    updateAvengerTable(); // refresh table after avenger is removed
}// end deleteAvenger

// format numbers to currency
const convertToCurrency = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
})