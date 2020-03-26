//FUNCTIONS
function calculateSubtotalPT() {
  $("#salaryVoucherForm").find('input.ratePT').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var rate = 0.00;
      $(element).val(0.00);
      var subTotal = 0.00;
      $("#salaryVoucherForm").find('input.subTotalPT').eq(index).val(Number(subTotal).toFixed(2));
    } else {
      var rate = parseFloat($(element).val());
      var unit = parseFloat($('input.unitPT').eq(index).val());
      var subTotal = rate * unit;
      $("#salaryVoucherForm").find('input.subTotalPT').eq(index).val(Number(subTotal).toFixed(2));
    }
  })
  recalculateGrossPay();
  calculateFinalAmount();
}

function recalculateGrossPay() {
  var currentGrossPay = 0;

  $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var amount = 0.00;
      $(element).val(0.00);
    } else {
      var amount = parseFloat($(element).val());
    }
    currentGrossPay = currentGrossPay + amount;
  })

  calculateSDL(currentGrossPay);

  $("#newGrossPay").val(Number(currentGrossPay).toFixed(2));
  calculateFinalAmount();
}

//CDAC, SINDA, MBMF, ECF
function calculateCSM() {
  var currentGrossPay = parseFloat(document.getElementById("newGrossPay").value);
  var race = document.getElementById('newRaceValue').value;
  if (race == "Chinese") {
    calculateCDACCSM(currentGrossPay);
    $('#newCSMTitle').val("CDAC");
  } else if (race == "Malay") {
    $('#newCSMTitle').val("MBMF");
    calculateMBMFCSM(currentGrossPay);
  } else if (race == "Indian") {
    $('#newCSMTitle').val("SINDA");
    calculateSindaCSM(currentGrossPay);
  } else if (race == "Eurasian") {
    $('#newCSMTitle').val("ECF");
    calculateECFCSM(currentGrossPay);
  }
}

function calculateCDACCSM(currentGrossPay) {
  if (currentGrossPay <= 2000) {
    $("#newCSMAmount").val(Number(0.50).toFixed(2));
  } else if (currentGrossPay > 2000 && currentGrossPay <= 3500) {
    $("#newCSMAmount").val(Number(1.00).toFixed(2));
  } else if (currentGrossPay > 3500 && currentGrossPay <= 5000) {
    $("#newCSMAmount").val(Number(1.50).toFixed(2));
  } else if (currentGrossPay > 5000 && currentGrossPay <= 7500) {
    $("#newCSMAmount").val(Number(2.00).toFixed(2));
  } else if (currentGrossPay > 7500) {
    $("#newCSMAmount").val(Number(3.00).toFixed(2));
  }
}

function calculateMBMFCSM(currentGrossPay) {
  if (currentGrossPay <= 1000) {
    $("#newCSMAmount").val(Number(3.00).toFixed(2));
  } else if (currentGrossPay > 1000 && currentGrossPay <= 2000) {
    $("#newCSMAmount").val(Number(4.50).toFixed(2));
  } else if (currentGrossPay > 2000 && currentGrossPay <= 3000) {
    $("#newCSMAmount").val(Number(6.50).toFixed(2));
  } else if (currentGrossPay > 3000 && currentGrossPay <= 4000) {
    $("#newCSMAmount").val(Number(15.00).toFixed(2));
  } else if (currentGrossPay > 4000 && currentGrossPay <= 6000) {
    $("#newCSMAmount").val(Number(19.50).toFixed(2));
  } else if (currentGrossPay > 6000 && currentGrossPay <= 8000) {
    $("#newCSMAmount").val(Number(22.00).toFixed(2));
  } else if (currentGrossPay > 8000 && currentGrossPay <= 10000) {
    $("#newCSMAmount").val(Number(24.00).toFixed(2));
  } else if (currentGrossPay > 10000) {
    $("#newCSMAmount").val(Number(26.00).toFixed(2));
  }
}

function calculateSindaCSM(currentGrossPay) {
  if (currentGrossPay <= 1000) {
    $("#newCSMAmount").val(Number(1.00).toFixed(2));
  } else if (currentGrossPay > 1000 && currentGrossPay <= 1500) {
    $("#newCSMAmount").val(Number(3.00).toFixed(2));
  } else if (currentGrossPay > 1500 && currentGrossPay <= 2500) {
    $("#newCSMAmount").val(Number(5.00).toFixed(2));
  } else if (currentGrossPay > 2500 && currentGrossPay <= 4500) {
    $("#newCSMAmount").val(Number(7.00).toFixed(2));
  } else if (currentGrossPay > 4500 && currentGrossPay <= 7500) {
    $("#newCSMAmount").val(Number(9.00).toFixed(2));
  } else if (currentGrossPay > 7500 && currentGrossPay <= 10000) {
    $("#newCSMAmount").val(Number(12.00).toFixed(2));
  } else if (currentGrossPay > 10000 && currentGrossPay <= 15000) {
    $("#newCSMAmount").val(Number(18.00).toFixed(2));
  } else if (currentGrossPay > 15000) {
    $("#newCSMAmount").val(Number(30.00).toFixed(2));
  }
}

function calculateECFCSM(currentGrossPay) {
  if (currentGrossPay <= 1000) {
    $("#newCSMAmount").val(Number(2.00).toFixed(2));
  } else if (currentGrossPay > 1000 && currentGrossPay <= 1500) {
    $("#newCSMAmount").val(Number(4.00).toFixed(2));
  } else if (currentGrossPay > 1500 && currentGrossPay <= 2500) {
    $("#newCSMAmount").val(Number(6.00).toFixed(2));
  } else if (currentGrossPay > 2500 && currentGrossPay <= 4000) {
    $("#newCSMAmount").val(Number(9.00).toFixed(2));
  } else if (currentGrossPay > 4500 && currentGrossPay <= 7000) {
    $("#newCSMAmount").val(Number(12.00).toFixed(2));
  } else if (currentGrossPay > 7000 && currentGrossPay <= 10000) {
    $("#newCSMAmount").val(Number(16.00).toFixed(2));
  } else if (currentGrossPay > 10000) {
    $("#newCSMAmount").val(Number(20.00).toFixed(2));
  }
}

function calculateSDL(currentGrossPay) {
  var SDLamount = 0.00;
  if (currentGrossPay <= 800) {
    SDLamount = 2.00;
    $("#newSDLAmount").val(Number(SDLamount).toFixed(2));
  } else if (currentGrossPay > 800 && currentGrossPay < 4500) {
    SDLamount = currentGrossPay * (0.25 / 100);
    $("#newSDLAmount").val(Number(SDLamount).toFixed(2));
  } else {
    SDLamount = 11.25;
    $("#newSDLAmount").val(Number(SDLamount).toFixed(2));
  }
}

function recalculateTotalDeductions() {
  var currentTotalDeductions = 0;

  $("#salaryVoucherForm").find('input.totalDeductions').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var amount = 0.00;
      $(element).val(0.00);
    } else {
      var amount = parseFloat($(element).val());
    }
    currentTotalDeductions = currentTotalDeductions + amount;
  })

  $("#newTotalDeductions").val(Number(currentTotalDeductions).toFixed(2));
  calculateFinalAmount();
}

function recalculateTotalOthers() {
  var currentTotalOthers = 0;

  $("#salaryVoucherForm").find('input.totalOthers').each(function (index, element) {
    if ($(element).val() == 0.00) {
      var amount = 0.00;
      $(element).val(0.00);
    } else {
      var amount = parseFloat($(element).val());
    }
    currentTotalOthers = currentTotalOthers + amount;
  })

  $("#newTotalOthers").val(Number(currentTotalOthers).toFixed(2));
  calculateFinalAmount();
}

function recalculatePersonalSales() {
  var currentPersonalSales = 0;

  $("#salaryVoucherForm").find('.newSalesInformation').each(function (index, element) {

    if (isNaN(parseFloat($(element).val()))) {
      var amount = 0.00;
    } else {
      var amount = parseFloat($(element).val());
    }
    currentPersonalSales = currentPersonalSales + amount;
  })

  $("#newPersonalSales").val(Number(currentPersonalSales).toFixed(2));
}

function autofillAttendance() {
  var offDays = "";
  var PHRODays = "";
  var numPHRODays = 0;
  var numOffDays = 0;
  var leaveMCDays = "";
  var sickLeaveDays = "";
  var numSickLeaveDays = 0;
  var annualLeaveDays = "";
  var numAnnualLeaveDays = 0;
  var unpaidLeaveDays = "";
  var numUnpaidLeaveDays = 0;
  var numWorkingDays = 0;

  var total = $("#salaryVoucherForm").find('.newSalesInformation').length;

  $("#salaryVoucherForm").find('.newSalesInformation').each(function (index, element) {

    if (isNaN(parseFloat($(element).val()))) {

      if ($(element).val() == "Sick Leave") {
        if (numSickLeaveDays == 0) {
          sickLeaveDays = "Sick Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          sickLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numSickLeaveDays++;
      } else if ($(element).val() == "Annual Leave") {
        if (numAnnualLeaveDays == 0) {
          annualLeaveDays = "Annual Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          annualLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numAnnualLeaveDays++;
      } else if ($(element).val() == "Unpaid Leave") {
        if (numUnpaidLeaveDays == 0) {
          unpaidLeaveDays = "Unpaid Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          unpaidLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numUnpaidLeaveDays++;
      } else if ($(element).val() == "OFF") {
        if (numOffDays == 0) {
          offDays = "Off Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          offDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numOffDays++;
      } else if ($(element).val() == "PH/RO") {
        if (numPHRODays == 0) {
          PHRODays = "PH/RO Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          PHRODays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numPHRODays++;
      }

      //LAST ONE
      if (index === total - 1) {
        sickLeaveDays = sickLeaveDays.substr(0, sickLeaveDays.length - 2);
        if (sickLeaveDays != "") {
          sickLeaveDays += " (" + numSickLeaveDays + " DAYS)";
        } else {
          sickLeaveDays = "Sick Leave: (0 DAYS)"
        }
        annualLeaveDays = annualLeaveDays.substr(0, annualLeaveDays.length - 2);
        if (annualLeaveDays != "") {
          annualLeaveDays += " (" + numAnnualLeaveDays + " DAYS)";
        } else {
          annualLeaveDays = "Annual Leave: (0 DAYS)"
        }
        unpaidLeaveDays = unpaidLeaveDays.substr(0, unpaidLeaveDays.length - 2);
        if (unpaidLeaveDays != "") {
          unpaidLeaveDays += " (" + numUnpaidLeaveDays + " DAYS)";
        } else {
          unpaidLeaveDays = "Unpaid Leave: (0 DAYS)"
        }
        offDays = offDays.substr(0, offDays.length - 2);
        if (offDays != "") {
          offDays += " (" + numOffDays + " DAYS)";
        } else {
          offDays = "Off Days: (0 DAYS)"
        }
        PHRODays = PHRODays.substr(0, PHRODays.length - 2);
        if (PHRODays != "") {
          PHRODays += " (" + numPHRODays + " DAYS)";
        } else {
          PHRODays = "PH/RO Days: (0 DAYS)"
        }

        $("#newLeaveMCDays").val(sickLeaveDays + "\n" + annualLeaveDays + "\n" + unpaidLeaveDays);
        $("#newOffDays").val(offDays + "\n" + PHRODays);

        return;
      }
    } else {
      if ($(element).val() == "Sick Leave") {
        if (numSickLeaveDays == 0) {
          sickLeaveDays = "Sick Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          sickLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numSickLeaveDays++;
      } else if ($(element).val() == "Annual Leave") {
        if (numAnnualLeaveDays == 0) {
          annualLeaveDays = "Annual Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          annualLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numAnnualLeaveDays++;
      } else if ($(element).val() == "Unpaid Leave") {
        if (numUnpaidLeaveDays == 0) {
          unpaidLeaveDays = "Unpaid Leave: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          unpaidLeaveDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numUnpaidLeaveDays++;
      } else if ($(element).val() == "OFF") {
        if (numOffDays == 0) {
          offDays = "Off Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          offDays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numOffDays++;
      } else if ($(element).val() == "PH/RO") {
        if (numPHRODays == 0) {
          PHRODays = "PH/RO Days: " + (index + 1) + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        } else {
          PHRODays += index + 1 + "/" + $("#newMonthOfVoucher").val() + "/" + $("#newYearOfVoucher").val() + ", ";
        }
        numPHRODays++;
      }

      //LAST ONE
      if (index === total - 1) {
        sickLeaveDays = sickLeaveDays.substr(0, sickLeaveDays.length - 2);
        if (sickLeaveDays != "") {
          sickLeaveDays += " (" + numSickLeaveDays + " DAYS)";
        } else {
          sickLeaveDays = "Sick Leave: (0 DAYS)"
        }
        annualLeaveDays = annualLeaveDays.substr(0, annualLeaveDays.length - 2);
        if (annualLeaveDays != "") {
          annualLeaveDays += " (" + numAnnualLeaveDays + " DAYS)";
        } else {
          annualLeaveDays = "Annual Leave: (0 DAYS)"
        }
        unpaidLeaveDays = unpaidLeaveDays.substr(0, unpaidLeaveDays.length - 2);
        if (unpaidLeaveDays != "") {
          unpaidLeaveDays += " (" + numUnpaidLeaveDays + " DAYS)";
        } else {
          unpaidLeaveDays = "Unpaid Leave: (0 DAYS)"
        }
        offDays = offDays.substr(0, offDays.length - 2);
        if (offDays != "") {
          offDays += " (" + numOffDays + " DAYS)";
        } else {
          offDays = "Off Days: (0 DAYS)"
        }
        PHRODays = PHRODays.substr(0, PHRODays.length - 2);
        if (PHRODays != "") {
          PHRODays += " (" + numPHRODays + " DAYS)";
        } else {
          PHRODays = "PH/RO Days: (0 DAYS)"
        }

        $("#newLeaveMCDays").val(sickLeaveDays + "\n" + annualLeaveDays + "\n" + unpaidLeaveDays);
        $("#newOffDays").val(offDays + "\n" + PHRODays);
      }
      numWorkingDays++;
      $("#newTotalWorkingDays").val(numWorkingDays);
    }
  })
}

function recalculateDailyHoursWorked() {
  var currentDailyHoursWorked = 0;

  $("#salaryVoucherForm").find('.newDailyHoursWorked').each(function (index, element) {

    if (isNaN(parseFloat($(element).val()))) {
      var amount = 0.00;
    } else {
      var amount = parseFloat($(element).val());
    }
    currentDailyHoursWorked = currentDailyHoursWorked + amount;
  })

  $("#newTotalHoursWorked").val(Number(currentDailyHoursWorked).toFixed(2));
}

function calculateFinalAmount() {
  currentFinalAmount = 0;

  currentGrossPay = parseFloat($("#newGrossPay").val());
  currentTotalDeductions = parseFloat($("#newTotalDeductions").val());
  currentTotalOthers = parseFloat($("#newTotalOthers").val());

  currentFinalAmount = currentGrossPay - currentTotalDeductions + currentTotalOthers;
  $("#newFinalAmount").val(Number(currentFinalAmount).toFixed(2));
}

function setCPF() {
  
  var monthOfVoucher = parseFloat(document.getElementById("newMonthOfVoucher").value);
  var yearOfVoucher = parseFloat(document.getElementById("newYearOfVoucher").value);

  //Voucher CPF is calculated based on the 1st of the month/year of the voucher
  var dateOfVoucher = new Date(yearOfVoucher, monthOfVoucher - 1, 1);

  var currentGrossPay = parseFloat(document.getElementById("newGrossPay").value);
  var currentAge = calculate_age(dateOfVoucher, Date.parse(document.getElementById("currentPersonDOB").value));

  var CPF_employee = 0.00;
  var CPF_employer = 0.00;
  var amount = 0.00;
  var totalPercentage = 0;


  if (currentAge < 55) {
    employerPercentage = 0.17;
    employeePercentage = 0.20;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 1200.00;
            CPF_employer = 2220.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.6 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.6 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }

  } else if (currentAge >= 55 && currentAge < 60) {
    employerPercentage = 0.13;
    employeePercentage = 0.13;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 780.00;
            CPF_employer = 1560.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.39 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.39 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }

  } else if (currentAge >= 60 && currentAge < 65) {
    employerPercentage = 0.09;
    employeePercentage = 0.075;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 450.00;
            CPF_employer = 990.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.225 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.225 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }

  } else if (currentAge >= 65) {
    employerPercentage = 0.075;
    employeePercentage = 0.05;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 780.00;
            CPF_employer = 1560.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.15 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.15 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }
  } else {
    employerPercentage = 0.17;
    employeePercentage = 0.20;

    if (currentGrossPay >= 750) {
      $("#salaryVoucherForm").find('input.grossPay').each(function (index, element) {
        if (index == 0) {
          if ($(element).val() >= 6000) {
            CPF_employee = 1200.00;
            CPF_employer = 2220.00;
          } else {
            CPF_employee = parseFloat($(element).val()) * employeePercentage;
            CPF_employer = parseFloat($(element).val()) * (employeePercentage + employerPercentage);
          }
        } else {
          amount = amount + parseFloat($(element).val());
        }
      })
      CPF_employee = Math.floor(CPF_employee + amount * employeePercentage);
      CPF_employer = Math.round(CPF_employer + amount * (employeePercentage + employerPercentage)) - CPF_employee;
    } else if (currentGrossPay > 500 && currentGrossPay < 750) {
      CPF_employee = Math.floor(0.6 * (currentGrossPay - 500.00));
      CPF_employer = Math.round(employerPercentage * currentGrossPay + 0.6 * (currentGrossPay - 500.00)) - CPF_employee;
    } else if (currentGrossPay > 50 && currentGrossPay <= 500) {
      CPF_employee = 0.00;
      CPF_employer = Math.round(employerPercentage * currentGrossPay);
    } else if (currentGrossPay <= 50) {
      CPF_employee = 0.00;
      CPF_employer = 0.00;
    }
  }

  $("#newCPFEmployee").val(Number(CPF_employee).toFixed(2));
  $("#newCPFEmployer").val(Number(CPF_employer).toFixed(2));
}

function calculate_age(dateOfVoucher, dob) {
  var diff_ms = dateOfVoucher - dob;
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getFullYear() - 1970);
}