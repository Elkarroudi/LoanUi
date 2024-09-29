
/**
 * Calculate the monthly payment for a loan.
 *
 * @param {number} borrowedCapital - The principal or capital borrowed.
 * @param {number} proportionalRate - The annual interest rate as a percentage.
 * @param {number} monthlyPaymentsNumber - The number of monthly payments.
 * @returns {number} The monthly payment amount.
 */

let proportionalRate = 12;
function isValidNumber(value) { return !isNaN(value) && value > 0; }
function calculateLoanRate(borrowedCapital, proportionalRate, monthlyPaymentsNumber) {

    if (![borrowedCapital, proportionalRate, monthlyPaymentsNumber].every(isValidNumber)) {
        return 0;
    }

    let monthlyRate = (proportionalRate / 100) / 12;
    return (borrowedCapital * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -monthlyPaymentsNumber));
}



// Loan Amount Input and Show Box
let amount = document.querySelector("input[name='amount']");
let amount_box = document.getElementById("amount_box");

// Loan Duration Input and Show Box
let duration = document.querySelector("input[name='duration']");
let duration_box = document.getElementById("duration_box");

// LOan Rate Input
let loan_rate = document.querySelector("input[name='loan_rate']");

amount.oninput = function () {
    amount_box.innerText = amount.value + " DH";
    calculateLoanRateInAction();
}

duration.oninput = function () {
    duration_box.innerText = duration.value + " Month";
    calculateLoanRateInAction();
}

function calculateLoanRateInAction() {
    let rate = calculateLoanRate(amount.value, proportionalRate, duration.value);
    loan_rate.value = rate.toFixed(2) + " DH";
}

function initialiseLoanRate() {
    amount_box.innerText = amount.value + " DH";
    duration_box.innerText = duration.value + " Month";
    calculateLoanRateInAction();
}
initialiseLoanRate();