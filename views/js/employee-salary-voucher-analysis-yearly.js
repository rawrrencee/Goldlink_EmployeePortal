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
    var deduction_SHG = 0.00;

    var grossPay_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalGrossPay_GAD = 0.00;
    var cpfEmployee_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalCPFEmployee_GAD = 0.00;
    var selfHelpGroups_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalSelfHelpGroups_GAD = 0.00;

    var total_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalCPFEE_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalSHG_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

    var grandTotal_GAD = 0.00;
    var grandTotalCPFEmployee_GAD = 0.00;
    var grandTotalSHG_GAD = 0.00;

    var grossPay_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalGrossPay_Doro = 0.00;
    var cpfEmployee_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalCPFEmployee_Doro = 0.00;
    var selfHelpGroups_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalSelfHelpGroups_Doro = 0.00;

    var total_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalCPFEE_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalSHG_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

    var grandTotal_Doro = 0.00;
    var grandTotalCPFEmployee_Doro = 0.00;
    var grandTotalSHG_Doro = 0.00;

    var grossPay_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalGrossPay_Goldtech = 0.00;
    var cpfEmployee_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalCPFEmployee_Goldtech = 0.00;
    var selfHelpGroups_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalSelfHelpGroups_Goldtech = 0.00;

    var total_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalCPFEE_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
    var totalSHG_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

    var grandTotal_Goldtech = 0.00;
    var grandTotalCPFEmployee_Goldtech = 0.00;
    var grandTotalSHG_Goldtech = 0.00;

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
            $("#appendCPFEmployeeContent_yearly_GAD").html("");
            $("#appendDeductionsSHGContent_yearly_GAD").html("");

            $("#appendAnalysisContent_yearly_Doro").html("");
            $("#appendCPFEmployeeContent_yearly_Doro").html("");
            $("#appendDeductionsSHGContent_yearly_Doro").html("");

            $("#appendAnalysisContent_yearly_Goldtech").html("");
            $("#appendCPFEmployeeContent_yearly_Goldtech").html("");
            $("#appendDeductionsSHGContent_yearly_Goldtech").html("");

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

                deduction_SHG = 0.00;

                grossPay_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                cpfEmployee_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                selfHelpGroups_GAD = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

                totalGrossPay_GAD = 0.00;
                totalCPFEmployee_GAD = 0.00;
                totalSelfHelpGroups_GAD = 0.00;

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

                    deduction_SHG = 0.00;
        
                    var getDeductionRecordsByVoucherId = new FormData();
                    getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', data[k]['voucher_id']);

                    $.ajax({
                        url: "ajax/payroll.ajax.php",
                        async: false,
                        method: "POST",
                        data: getDeductionRecordsByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json"
                    }).done(function (results) {
                        deduction_records = results;
                    })

                    for (var m = 0; m < deduction_records.length; m++) {
                        if (deduction_records[m]['title'] != "CPF-EE") {
                            if (deduction_records[m]['title'] == "CDAC" || deduction_records[m]['title'] == "MBMF" || deduction_records[m]['title'] == "SINDA" || deduction_records[m]['title'] == "ECF") {

                                deduction_SHG = parseFloat(deduction_records[m]['amount']);
                            }
                        }
                    }

                    if (data[k]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                        switch (data[k]['month_of_voucher']) {
                            case 1:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[0] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[0] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[0] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[0] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[0] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[0] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 2:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[1] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[1] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[1] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[1] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[1] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[1] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 3:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[2] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[2] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[2] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[2] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[2] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[2] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 4:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[3] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[3] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[3] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[3] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[3] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[3] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 5:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[4] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[4] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[4] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[4] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[4] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[4] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 6:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[5] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[5] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[5] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[5] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[5] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[5] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 7:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[6] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[6] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[6] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[6] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[6] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[6] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 8:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[7] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[7] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[7] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[7] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[7] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[7] += parseFloat(deduction_SHG);
                                }
                            case 9:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[8] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[8] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[8] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[8] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[8] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[8] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 10:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[9] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[9] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[9] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[9] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[9] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[9] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 11:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[10] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[10] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[10] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[10] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[10] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[10] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 12:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_GAD[11] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_GAD[11] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_GAD[11] += parseFloat(deduction_SHG);

                                    totalGrossPay_GAD += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_GAD += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_GAD += parseFloat(deduction_SHG);

                                    total_GAD[11] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_GAD[11] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_GAD[11] += parseFloat(deduction_SHG);
                                }
                                break;
                            default:
                                break;
                        }

                    }
                }

                printTable_GAD(personId, payToName, grossPay_GAD, totalGrossPay_GAD, cpfEmployee_GAD, totalCPFEmployee_GAD, selfHelpGroups_GAD, totalSelfHelpGroups_GAD);
            }

            for (var j = 0; j < submittedPersonIds_Doro.length; j++) {

                var personId = submittedPersonIds_Doro[j];
                var payToName = submittedPersonNames_Doro[j];

                deduction_SHG = 0.00;

                grossPay_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                cpfEmployee_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                selfHelpGroups_Doro = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

                totalGrossPay_Doro = 0.00;
                totalCPFEmployee_Doro = 0.00;
                totalSelfHelpGroups_Doro = 0.00;

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

                    deduction_SHG = 0.00;
        
                    var getDeductionRecordsByVoucherId = new FormData();
                    getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', data[k]['voucher_id']);

                    $.ajax({
                        url: "ajax/payroll.ajax.php",
                        async: false,
                        method: "POST",
                        data: getDeductionRecordsByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json"
                    }).done(function (results) {
                        deduction_records = results;
                    })

                    for (var m = 0; m < deduction_records.length; m++) {
                        if (deduction_records[m]['title'] != "CPF-EE") {
                            if (deduction_records[m]['title'] == "CDAC" || deduction_records[m]['title'] == "MBMF" || deduction_records[m]['title'] == "SINDA" || deduction_records[m]['title'] == "ECF") {

                                deduction_SHG = parseFloat(deduction_records[m]['amount']);
                            }
                        }
                    }

                    if (data[k]['company_name'] == 'Doro International Pte Ltd') {
                        switch (data[k]['month_of_voucher']) {
                            case 1:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[0] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[0] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[0] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[0] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[0] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[0] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 2:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[1] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[1] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[1] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[1] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[1] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[1] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 3:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[2] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[2] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[2] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[2] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[2] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[2] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 4:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[3] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[3] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[3] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[3] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[3] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[3] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 5:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[4] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[4] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[4] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[4] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[4] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[4] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 6:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[5] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[5] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[5] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[5] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[5] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[5] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 7:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[6] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[6] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[6] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[6] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[6] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[6] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 8:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[7] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[7] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[7] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[7] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[7] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[7] += parseFloat(deduction_SHG);
                                }
                            case 9:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[8] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[8] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[8] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[8] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[8] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[8] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 10:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[9] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[9] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[9] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[9] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[9] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[9] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 11:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[10] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[10] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[10] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[10] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[10] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[10] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 12:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Doro[11] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Doro[11] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Doro[11] += parseFloat(deduction_SHG);

                                    totalGrossPay_Doro += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Doro += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Doro += parseFloat(deduction_SHG);

                                    total_Doro[11] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Doro[11] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Doro[11] += parseFloat(deduction_SHG);
                                }
                                break;
                            default:
                                break;
                        }

                    }
                }

                printTable_Doro(personId, payToName, grossPay_Doro, totalGrossPay_Doro, cpfEmployee_Doro, totalCPFEmployee_Doro, selfHelpGroups_Doro, totalSelfHelpGroups_Doro);
            }

            for (var j = 0; j < submittedPersonIds_Goldtech.length; j++) {

                var personId = submittedPersonIds_Goldtech[j];
                var payToName = submittedPersonNames_Goldtech[j];

                deduction_SHG = 0.00;

                grossPay_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                cpfEmployee_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];
                selfHelpGroups_Goldtech = [0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00];

                totalGrossPay_Goldtech = 0.00;
                totalCPFEmployee_Goldtech = 0.00;
                totalSelfHelpGroups_Goldtech = 0.00;

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

                    deduction_SHG = 0.00;
        
                    var getDeductionRecordsByVoucherId = new FormData();
                    getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', data[k]['voucher_id']);

                    $.ajax({
                        url: "ajax/payroll.ajax.php",
                        async: false,
                        method: "POST",
                        data: getDeductionRecordsByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json"
                    }).done(function (results) {
                        deduction_records = results;
                    })

                    for (var m = 0; m < deduction_records.length; m++) {
                        if (deduction_records[m]['title'] != "CPF-EE") {
                            if (deduction_records[m]['title'] == "CDAC" || deduction_records[m]['title'] == "MBMF" || deduction_records[m]['title'] == "SINDA" || deduction_records[m]['title'] == "ECF") {

                                deduction_SHG = parseFloat(deduction_records[m]['amount']);
                            }
                        }
                    }
                    
                    if (data[k]['company_name'] == 'Goldlink Technologies Distribution Pte Ltd') {
                        switch (data[k]['month_of_voucher']) {
                            case 1:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[0] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[0] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[0] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[0] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[0] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[0] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 2:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[1] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[1] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[1] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[1] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[1] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[1] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 3:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[2] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[2] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[2] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[2] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[2] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[2] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 4:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[3] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[3] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[3] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[3] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[3] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[3] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 5:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[4] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[4] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[4] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[4] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[4] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[4] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 6:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[5] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[5] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[5] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[5] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[5] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[5] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 7:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[6] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[6] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[6] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[6] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[6] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[6] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 8:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[7] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[7] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[7] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[7] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[7] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[7] += parseFloat(deduction_SHG);
                                }
                            case 9:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[8] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[8] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[8] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[8] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[8] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[8] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 10:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[9] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[9] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[9] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[9] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[9] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[9] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 11:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[10] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[10] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[10] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[10] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[10] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[10] += parseFloat(deduction_SHG);
                                }
                                break;
                            case 12:
                                if (!isNaN(data[k]['gross_pay'])) {
                                    grossPay_Goldtech[11] += parseFloat(data[k]['gross_pay']);
                                    cpfEmployee_Goldtech[11] += parseFloat(data[k]['cpf_employee']);
                                    selfHelpGroups_Goldtech[11] += parseFloat(deduction_SHG);

                                    totalGrossPay_Goldtech += parseFloat(data[k]['gross_pay']);
                                    totalCPFEmployee_Goldtech += parseFloat(data[k]['cpf_employee']);
                                    totalSelfHelpGroups_Goldtech += parseFloat(deduction_SHG);

                                    total_Goldtech[11] += parseFloat(data[k]['gross_pay']);
                                    totalCPFEE_Goldtech[11] += parseFloat(data[k]['cpf_employee']);
                                    totalSHG_Goldtech[11] += parseFloat(deduction_SHG);
                                }
                                break;
                            default:
                                break;
                        }

                    }
                }

                printTable_Goldtech(personId, payToName, grossPay_Goldtech, totalGrossPay_Goldtech, cpfEmployee_Goldtech, totalCPFEmployee_Goldtech, selfHelpGroups_Goldtech, totalSelfHelpGroups_Goldtech);
            }

            for (var i = 0; i < 12; i++) {
                grandTotal_GAD += total_GAD[i];
                grandTotalCPFEmployee_GAD += totalCPFEE_GAD[i];
                grandTotalSHG_GAD += totalSHG_GAD[i];

                grandTotal_Doro += total_Doro[i];
                grandTotalCPFEmployee_Doro += totalCPFEE_Doro[i];
                grandTotalSHG_Doro += totalSHG_Doro[i];

                grandTotal_Goldtech += total_Goldtech[i];
                grandTotalCPFEmployee_Goldtech += totalCPFEE_Goldtech[i];
                grandTotalSHG_Goldtech += totalSHG_Goldtech[i];
            }


            $('#appendAnalysisContent_yearly_GAD').append(`
            <tr>
            <td colspan="2"><strong>Subtotal</strong></td>
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

            $('#appendCPFEmployeeContent_yearly_GAD').append(`
            <tr>
            <td colspan="2"><strong>Subtotal</strong></td>
            <td align="right">` + Number(totalCPFEE_GAD[0]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[1]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[2]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[3]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[4]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[5]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[6]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[7]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[8]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[9]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[10]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_GAD[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotalCPFEmployee_GAD).toFixed(2) + `</td>
            </tr>
            `);

            $('#appendDeductionsSHGContent_yearly_GAD').append(`
            <tr>            
            <td colspan="2"><strong>Subtotal</strong></td>
            <td align="right">` + Number(totalSHG_GAD[0]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[1]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[2]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[3]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[4]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[5]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[6]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[7]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[8]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[9]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[10]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_GAD[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotalSHG_GAD).toFixed(2) + `</td>
            </tr>
            `);

            $('#appendAnalysisContent_yearly_Doro').append(`
            <tr>
            <td colspan="2"><strong>Subtotal</strong></td>
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

            $('#appendCPFEmployeeContent_yearly_Doro').append(`
            <tr>
            <td colspan="2"><strong>Subtotal</strong></td>
            <td align="right">` + Number(totalCPFEE_Doro[0]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[1]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[2]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[3]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[4]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[5]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[6]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[7]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[8]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[9]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[10]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Doro[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotalCPFEmployee_Doro).toFixed(2) + `</td>
            </tr>
            `);

            $('#appendDeductionsSHGContent_yearly_Doro').append(`
            <tr>            
            <td colspan="2"><strong>Subtotal</strong></td>
            <td align="right">` + Number(totalSHG_Doro[0]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[1]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[2]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[3]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[4]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[5]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[6]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[7]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[8]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[9]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[10]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Doro[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotalSHG_Doro).toFixed(2) + `</td>
            </tr>
            `);

            $('#appendAnalysisContent_yearly_Goldtech').append(`
            <tr>
            <td colspan="2"><strong>Subtotal</strong></td>
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
            $('#appendCPFEmployeeContent_yearly_Goldtech').append(`
            <tr>
            <td colspan="2"><strong>Subtotal</strong></td>
            <td align="right">` + Number(totalCPFEE_Goldtech[0]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[1]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[2]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[3]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[4]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[5]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[6]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[7]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[8]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[9]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[10]).toFixed(2) + `</td>
            <td align="right">` + Number(totalCPFEE_Goldtech[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotalCPFEmployee_Goldtech).toFixed(2) + `</td>
            </tr>
            `);

            $('#appendDeductionsSHGContent_yearly_Goldtech').append(`
            <tr>            
            <td colspan="2"><strong>Subtotal</strong></td>
            <td align="right">` + Number(totalSHG_Goldtech[0]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[1]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[2]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[3]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[4]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[5]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[6]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[7]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[8]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[9]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[10]).toFixed(2) + `</td>
            <td align="right">` + Number(totalSHG_Goldtech[11]).toFixed(2) + `</td>
            <td align="right">` + Number(grandTotalSHG_Goldtech).toFixed(2) + `</td>
            </tr>
            `);

        }
    });
});

function printTable_GAD(personId, payToName, grossPay, totalGrossPay, cpfEmployee_GAD, totalCPFEmployee_GAD, selfHelpGroups_GAD, totalSelfHelpGroups_GAD) {
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

    $('#appendCPFEmployeeContent_yearly_GAD').append(`
        <tr>
        <td>` + personId + `</td>
        <td>` + payToName + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[0]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[1]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[2]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[3]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[4]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[5]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[6]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[7]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[8]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[9]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[10]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_GAD[11]).toFixed(2) + `</td>
        <td align="right">` + Number(totalCPFEmployee_GAD).toFixed(2) + `</td>
        </tr>
    `);

    $('#appendDeductionsSHGContent_yearly_GAD').append(`
        <tr>
        <td>` + personId + `</td>
        <td>` + payToName + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[0]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[1]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[2]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[3]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[4]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[5]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[6]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[7]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[8]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[9]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[10]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_GAD[11]).toFixed(2) + `</td>
        <td align="right">` + Number(totalSelfHelpGroups_GAD).toFixed(2) + `</td>
        </tr>
    `);
}

function printTable_Doro(personId, payToName, grossPay, totalGrossPay, cpfEmployee_Doro, totalCPFEmployee_Doro, selfHelpGroups_Doro, totalSelfHelpGroups_Doro) {
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

    $('#appendCPFEmployeeContent_yearly_Doro').append(`
        <tr>
        <td>` + personId + `</td>
        <td>` + payToName + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[0]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[1]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[2]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[3]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[4]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[5]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[6]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[7]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[8]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[9]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[10]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Doro[11]).toFixed(2) + `</td>
        <td align="right">` + Number(totalCPFEmployee_Doro).toFixed(2) + `</td>
        </tr>
    `);

    $('#appendDeductionsSHGContent_yearly_Doro').append(`
        <tr>
        <td>` + personId + `</td>
        <td>` + payToName + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[0]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[1]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[2]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[3]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[4]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[5]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[6]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[7]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[8]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[9]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[10]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Doro[11]).toFixed(2) + `</td>
        <td align="right">` + Number(totalSelfHelpGroups_Doro).toFixed(2) + `</td>
        </tr>
    `);
}

function printTable_Goldtech(personId, payToName, grossPay, totalGrossPay, cpfEmployee_Goldtech, totalCPFEmployee_Goldtech, selfHelpGroups_Goldtech, totalSelfHelpGroups_Goldtech) {
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

    $('#appendCPFEmployeeContent_yearly_Goldtech').append(`
        <tr>
        <td>` + personId + `</td>
        <td>` + payToName + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[0]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[1]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[2]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[3]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[4]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[5]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[6]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[7]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[8]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[9]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[10]).toFixed(2) + `</td>
        <td align="right">` + Number(cpfEmployee_Goldtech[11]).toFixed(2) + `</td>
        <td align="right">` + Number(totalCPFEmployee_Goldtech).toFixed(2) + `</td>
        </tr>
    `);

    $('#appendDeductionsSHGContent_yearly_Goldtech').append(`
        <tr>
        <td>` + personId + `</td>
        <td>` + payToName + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[0]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[1]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[2]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[3]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[4]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[5]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[6]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[7]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[8]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[9]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[10]).toFixed(2) + `</td>
        <td align="right">` + Number(selfHelpGroups_Goldtech[11]).toFixed(2) + `</td>
        <td align="right">` + Number(totalSelfHelpGroups_Goldtech).toFixed(2) + `</td>
        </tr>
    `);
}

