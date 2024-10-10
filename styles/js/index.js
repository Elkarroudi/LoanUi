
let proportionalRate = 12;
let form = document.querySelector('form');

let client_project = document.querySelector("select[name='project']");
let client_profession = document.querySelector("select[name='profession']");
let loan_amount = document.querySelector("input[name='amount']");
let loan_duration = document.querySelector("input[name='duration']");
let loan_monthly_rate = document.querySelector("input[name='loan_rate']");
let email = document.querySelector("input[name='email']");
let phone = document.querySelector("input[name='phone']");
let first_name = document.querySelector("input[name='first_name']");
let last_name = document.querySelector("input[name='last_name']");
let cnie = document.querySelector("input[name='cnie']");
let birth_date = document.querySelector("input[name='birth_date']");
let hiring_date = document.querySelector("input[name='hiring_date']");
let monthly_revenue = document.querySelector("input[name='monthly_revenue']");
let outstanding_credits = document.querySelector("input[name=outstanding_credits]");
let general_conditions = document.querySelector("input[name=general_conditions]");

let step = document.querySelectorAll(".step");
let no_data = document.getElementById("no_data");
let summary = document.querySelector(".summary .contents");
let loan_information = document.getElementById("loan_information");
let contact_information = document.getElementById("contact_information");
let personal_information = document.getElementById("personal_information");
let amount_section = document.getElementById("amount_box");
let duration_section = document.getElementById("duration_box");
let review_section = document.getElementById("review_box");


function check_for_old_loan_request() {

    let loan = get_loan_request_object();
    if(loan == null) { return; }

    remove_no_data_container_from_summary();
    add_loan_project_to_summary(loan)
    add_loan_information_to_summary(loan, 500);

    if (loan.currentStep === 1) { go_to_next_step(loan_information, contact_information, step[0], step[1]); }
    else {
        go_to_next_step(loan_information, personal_information, step[0], step[2]);
        add_contact_information_to_summary(loan);
    }

}
check_for_old_loan_request();


function is_valid_number(value) { return !isNaN(value) && value > 0; }
function calculate_loan_rate(borrowedCapital, proportionalRate, monthlyPaymentsNumber) {
    if (![borrowedCapital, proportionalRate, monthlyPaymentsNumber].every(is_valid_number)) { return 0; }
    let monthlyRate = (proportionalRate / 100) / 12;
    return (borrowedCapital * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -monthlyPaymentsNumber));
}

loan_amount.oninput = function () {
    amount_section.innerText = loan_amount.value + " DH";
    calculateLoanRateInAction();
}

loan_duration.oninput = function () {
    duration_section.innerText = loan_duration.value + " Month";
    calculateLoanRateInAction();
}

function calculateLoanRateInAction() {
    let rate = calculate_loan_rate(loan_amount.value, proportionalRate, loan_duration.value);
    loan_monthly_rate.value = rate.toFixed(2) + " DH";
}

function initialiseLoanRate() {
    amount_section.innerText = loan_amount.value + " DH";
    duration_section.innerText = loan_duration.value + " Month";
    calculateLoanRateInAction();
}
initialiseLoanRate();


function collect_loan_information(event) {

    event.preventDefault();

    let loan = {
        currentStep: 1,
        project: client_project.value,
        loanAmount: loan_amount.value,
        loanDuration: loan_duration.value,
        loanMonthlyRate: loan_monthly_rate.value,
        profession: client_profession.value,
    }
    localStorage.setItem("loan", JSON.stringify(loan));
    go_to_next_step(loan_information, contact_information, step[0], step[1]);
    remove_no_data_container_from_summary();
    add_loan_project_to_summary(loan)
    add_loan_information_to_summary(loan, 500);

}

function collect_contact_information(event) {

    event.preventDefault();
    let loan = get_loan_request_object();
    loan.currentStep = 2;
    loan.contactInfromation = {
        email: email.value,
        phone: phone.value
    }

    localStorage.setItem("loan", JSON.stringify(loan));
    go_to_next_step(contact_information, personal_information, step[1], step[2]);
    add_contact_information_to_summary(loan);

}

function collect_personal_information(event) {

    event.preventDefault();
    let loan = get_loan_request_object();
    loan.personalInformation = {
        firstName: first_name.value,
        lastName: last_name.value,
        cnie: cnie.value,
        birthDate : birth_date.value,
        hiringDate: hiring_date.value,
        monthlyRevenue: monthly_revenue.value,
        outstandingCredits: outstanding_credits.value,
    }
    localStorage.setItem("loan", JSON.stringify(loan));
    alert("loan request finished !");
}


function go_to_next_step(currentSection, nextSection, currentStep, nextStep) {

    // Hide The Current Section And Show The Next One
    currentSection.classList.add("hidden");
    nextSection.classList.remove("hidden");

    // Hide The Active Step And Show The Next One
    currentStep.classList.remove("active");
    nextStep.classList.add("active");
}

function remove_no_data_container_from_summary() {
    no_data.style.display = "none";
}

function add_loan_project_to_summary(loanRequest) {
    let projectSection = document.createElement('div');
    projectSection.classList.add('information_section');
    projectSection.innerHTML = `
        <h3> Project :</h3>
        <p>${loanRequest.project}</p>
    `;
    summary.appendChild(projectSection);
}

function add_loan_information_to_summary(loanRequest, applicationFee) {
    let informationSection = document.createElement('div');
    informationSection.classList.add('information_section');
    informationSection.innerHTML = `
        <h3>Credit Details :</h3>
        <div><p class="title">Amount :</p>  <p>${loanRequest.loanAmount} DH</p></div>
        <div><p class="title">Duration :</p> <p>${loanRequest.loanDuration} Months</p></div>
        <div><p class="title">Monthly Payment :</p> <p>${loanRequest.loanMonthlyRate}</p></div>
        <div><p class="title">Application Fees :</p> <p>${applicationFee} DH</p></div>
    `;
    summary.appendChild(informationSection);
}

function add_contact_information_to_summary(loanRequest) {
    let contactSection = document.createElement('div');
    contactSection.classList.add('information_section');
    contactSection.innerHTML = `
        <h3>Contact Details :</h3>
        <div><p class="title" >Email :</p> <p>${loanRequest.contactInfromation.email}</p></div>
        <div><p class="title" >Phone :</p> <p>${loanRequest.contactInfromation.phone}</p></div>
    `;
    summary.appendChild(contactSection);
}

function get_loan_request_object() {
    return JSON.parse(localStorage.getItem("loan"));
}

function clear_loan_request_object() {
    localStorage.removeItem("loan");
    location.reload();
}