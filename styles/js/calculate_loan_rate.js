
/**
 * Calculate the monthly payment for a loan.
 *
 * @param {number} borrowedCapital - The principal or capital borrowed.
 * @param {number} proportionalRate - The annual interest rate as a percentage.
 * @param {number} monthlyPaymentsNumber - The number of monthly payments.
 * @returns {number} The monthly payment amount.
 */

function calculateLoanRate(borrowedCapital, proportionalRate, monthlyPaymentsNumber) {

    if (isNaN(borrowedCapital) || isNaN(proportionalRate) || isNaN(monthlyPaymentsNumber)) {
        return 0;
    }

    let monthlyRate = (proportionalRate / 100) / 12;
    return (borrowedCapital * monthlyRate) / (1 - Math.pow((1 + monthlyRate), -monthlyPaymentsNumber));
}