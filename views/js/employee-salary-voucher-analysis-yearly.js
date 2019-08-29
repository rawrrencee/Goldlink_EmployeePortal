$('#analyseYearOfVoucher').select2({
    placeholder: "Select a Year"
});

$(document).ready(function () {
    $("#analysis_box_yearly_GAD").hide();
    $("#analysis_box_yearly_Goldtech").hide();
    $("#analysis_box_yearly_Doro").hide();
});

$('.fetchSalaryVoucherAnalysisYearly').click(function () {
    var yearToAnalyse = parseInt($('#analyseYearOfVoucher').val());

    var getPayrollDetailsByYear = new FormData();
    getPayrollDetailsByYear.append('getPayrollDetailsByYear', yearToAnalyse);

    var payToName = "";

    var grossPay_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalGrossPay_GAD = 0.00;

    var grossPay_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalGrossPay_Doro = 0.00;

    var grossPay_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalGrossPay_Goldtech = 0.00;

    var total_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var grandTotal_GAD = 0.00;

    var total_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var grandTotal_Doro = 0.00;

    var total_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var grandTotal_Goldtech = 0.00;

    $.ajax({
        url: "ajax/employee-salary-voucher-analysis.ajax.php",
        method: "POST",
        data: getPayrollDetailsByYear,
        cache: false,
        contentType: false,
        processData: false,
        dataType: "json",
        success: function (answer) {

            var submittedPersonIds = [];
            var submittedPersonNames = [];

            var submittedPersonIds_GAD = [];
            var submittedPersonNames_GAD = [];

            var submittedPersonIds_Doro = [];
            var submittedPersonNames_Doro = [];

            var submittedPersonIds_Goldtech = [];
            var submittedPersonNames_Goldtech = [];

            $("#appendAnalysisContent_yearly_GAD").html("");
            $("#appendAnalysisContent_yearly_Goldtech").html("");
            $("#appendAnalysisContent_yearly_Doro").html("");

            $("#appendAnalysisContent_yearly_total_GAD").html("");
            $("#appendAnalysisContent_yearly_total_Goldtech").html("");
            $("#appendAnalysisContent_yearly_total_Doro").html("");

            if (answer != []) {
                $("#analysis_box_yearly_GAD").show();
                $("#analysis_box_yearly_Goldtech").show();
                $("#analysis_box_yearly_Doro").show();
            }

            for (var i = 0; i < answer.length; i++) {
                if (!submittedPersonIds.includes(answer[i]['person_id'])) {
                    submittedPersonIds.push(answer[i]['person_id']);
                    submittedPersonNames.push(answer[i]['pay_to_name']);
                }
                if (answer[i]['company_name'] == "Goldlink Asia Distribution Pte Ltd" && !submittedPersonIds_GAD.includes(answer[i]['person_id'])) {
                    submittedPersonIds_GAD.push(answer[i]['person_id']);
                    submittedPersonNames_GAD.push(answer[i]['pay_to_name']);
                } else if (answer[i]['company_name'] == "Doro International Pte Ltd" && !submittedPersonIds_Doro.includes(answer[i]['person_id'])) {
                    submittedPersonIds_Doro.push(answer[i]['person_id']);
                    submittedPersonNames_Doro.push(answer[i]['pay_to_name']);
                } else if (answer[i]['company_name'] == "Goldlink Technologies Pte Ltd" && !submittedPersonIds_Goldtech.includes(answer[i]['person_id'])) {
                    submittedPersonIds_Goldtech.push(answer[i]['person_id']);
                    submittedPersonNames_Goldtech.push(answer[i]['pay_to_name']);
                }
            }

            for (var j = 0; j < submittedPersonIds_GAD.length; j++) {

                var personId = submittedPersonIds_GAD[j];
                var payToName = submittedPersonNames_GAD[j];

                grossPay_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                totalGrossPay_GAD = 0.00;

                $.ajax({
                    url: "ajax/employee-salary-voucher-analysis.ajax.php",
                    async: false,
                    method: "POST",
                    data: { personId: personId, yearToAnalyse: yearToAnalyse },
                    dataType: "json",
                    success: function (answer) {
                        data = answer;
                    }
                })

                for (var k = 0; k < data.length; k++) {
                    if (data[k]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                        switch (data[k]['month_of_voucher']) {
                            case 1:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[0] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[0] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 2:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[1] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[1] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 3:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[2] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[2] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 4:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[3] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[3] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 5:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[4] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[4] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 6:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[5] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[5] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 7:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[6] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[6] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 8:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[7] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[7] += parseFloat(data[k]['gross_pay']);
                                }
                            case 9:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[8] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[8] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 10:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[9] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[9] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 11:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[10] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[10] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 12:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[11] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);

                                    total_GAD[11] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            default:
                                break;
                        }

                    }
                }
            
                printTable_GAD(personId, payToName, grossPay_GAD, totalGrossPay_GAD);
            }

            for (var j = 0; j < submittedPersonIds_Doro.length; j++) {

                var personId = submittedPersonIds_Doro[j];
                var payToName = submittedPersonNames_Doro[j];

                grossPay_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                totalGrossPay_Doro = 0.00;

                $.ajax({
                    url: "ajax/employee-salary-voucher-analysis.ajax.php",
                    async: false,
                    method: "POST",
                    data: { personId: personId, yearToAnalyse: yearToAnalyse },
                    dataType: "json",
                    success: function (answer) {
                        data = answer;
                    }
                })

                for (var k = 0; k < data.length; k++) {
                    if (data[k]['company_name'] == 'Doro International Pte Ltd') {
                        switch (data[k]['month_of_voucher']) {
                            case 1:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[0] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[0] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 2:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[1] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[1] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 3:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[2] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[2] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 4:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[3] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[3] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 5:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[4] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[4] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 6:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[5] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[5] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 7:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[6] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[6] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 8:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[7] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[7] += parseFloat(data[k]['gross_pay']);
                                }
                            case 9:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[8] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[8] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 10:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[9] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[9] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 11:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[10] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[10] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 12:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[11] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);

                                    total_Doro[11] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            default:
                                break;
                        }

                    }
                }

                printTable_Doro(personId, payToName, grossPay_Doro, totalGrossPay_Doro);
            }

            for (var j = 0; j < submittedPersonIds_Goldtech.length; j++) {

                var personId = submittedPersonIds_Goldtech[j];
                var payToName = submittedPersonNames_Goldtech[j];

                grossPay_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                totalGrossPay_Goldtech = 0.00;

                $.ajax({
                    url: "ajax/employee-salary-voucher-analysis.ajax.php",
                    async: false,
                    method: "POST",
                    data: { personId: personId, yearToAnalyse: yearToAnalyse },
                    dataType: "json",
                    success: function (answer) {
                        data = answer;
                    }
                })

                for (var k = 0; k < data.length; k++) {
                    if (data[k]['company_name'] == 'Goldlink Technologies Distribution Pte Ltd') {
                        switch (data[k]['month_of_voucher']) {
                            case 1:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[0] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[0] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 2:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[1] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[1] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 3:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[2] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[2] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 4:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[3] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[3] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 5:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[4] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[4] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 6:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[5] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[5] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 7:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[6] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[6] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 8:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[7] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[7] += parseFloat(data[k]['gross_pay']);
                                }
                            case 9:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[8] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[8] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 10:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[9] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[9] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 11:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[10] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[10] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            case 12:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[11] = parseFloat(data[k]['gross_pay']);
                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);

                                    total_Goldtech[11] += parseFloat(data[k]['gross_pay']);
                                }
                                break;
                            default:
                                break;
                        }

                    }
                }

                printTable_Goldtech(personId, payToName, grossPay_Goldtech, totalGrossPay_Goldtech);
            }

            for (var i = 0; i < 12; i++) {
                grandTotal_GAD += total_GAD[i];
                grandTotal_Doro += total_Doro[i];
                grandTotal_Goldtech += total_Goldtech[i];
            }


            $('#appendAnalysisContent_yearly_total_GAD').append(`
            <tr>
            <td align="right">` + Number(total_GAD[0]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[1]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[2]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[3]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[4]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[5]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[6]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[7]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[8]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[9]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[10]).toFixed(2) + `</td>
            <td align="right">` + Number(total_GAD[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotal_GAD).toFixed(2) + `</td>
            </tr>
            `);

        $('#appendAnalysisContent_yearly_total_Doro').append(`
            <tr>
            <td align="right">` + Number(total_Doro[0]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[1]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[2]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[3]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[4]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[5]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[6]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[7]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[8]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[9]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[10]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Doro[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotal_Doro).toFixed(2) + `</td>
            </tr>
            `);

        $('#appendAnalysisContent_yearly_total_Goldtech').append(`
            <tr>
            <td align="right">` + Number(total_Goldtech[0]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[1]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[2]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[3]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[4]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[5]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[6]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[7]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[8]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[9]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[10]).toFixed(2) + `</td>
            <td align="right">` + Number(total_Goldtech[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotal_Goldtech).toFixed(2) + `</td>
            </tr>
            `);

    }
    });
});

function printTable_GAD(personId, payToName, grossPay, totalGrossPay) {
    $('#appendAnalysisContent_yearly_GAD').append(`
                <tr>
                <td>` + personId + `</td>
                <td>` + payToName + `</td>
                <td align="right">` + Number(grossPay[0]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[1]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[2]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[3]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[4]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[5]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[6]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[7]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[8]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[9]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[10]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[11]).toFixed(2) + `</td>
                <td align="right">` + Number(totalGrossPay).toFixed(2) + `</td>
                </tr>
                `);
}

function printTable_Doro(personId, payToName, grossPay, totalGrossPay) {
    $('#appendAnalysisContent_yearly_Doro').append(`
                <tr>
                <td>` + personId + `</td>
                <td>` + payToName + `</td>
                <td align="right">` + Number(grossPay[0]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[1]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[2]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[3]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[4]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[5]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[6]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[7]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[8]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[9]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[10]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[11]).toFixed(2) + `</td>
                <td align="right">` + Number(totalGrossPay).toFixed(2) + `</td>
                </tr>
                `);
}

function printTable_Goldtech(personId, payToName, grossPay, totalGrossPay) {
    $('#appendAnalysisContent_yearly_Goldtech').append(`
                <tr>
                <td>` + personId + `</td>
                <td>` + payToName + `</td>
                <td align="right">` + Number(grossPay[0]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[1]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[2]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[3]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[4]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[5]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[6]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[7]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[8]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[9]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[10]).toFixed(2) + `</td>
                <td align="right">` + Number(grossPay[11]).toFixed(2) + `</td>
                <td align="right">` + Number(totalGrossPay).toFixed(2) + `</td>
                </tr>
                `);
}