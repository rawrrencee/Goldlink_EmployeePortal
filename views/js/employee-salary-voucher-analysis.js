$('#analyseMonthOfVoucher').select2({
    placeholder: "Select a Month"
});

$('#analyseYearOfVoucher').select2({
    placeholder: "Select a Year"
});

$(document).ready(function () {
    $("#analysis_box_GAD").hide();
    $("#analysis_box_Goldtech").hide();
    $("#analysis_box_Doro").hide();
});

$('.fetchSalaryVoucherAnalysis').click(function () {
    var monthToAnalyse = parseInt($('#analyseMonthOfVoucher').val());
    var yearToAnalyse = parseInt($('#analyseYearOfVoucher').val());

    var elementName = "";
    var deduction_CDAC = 0.00;
    var total_CPF = 0.00;

    //JOURNAL
    var grossSalary_GAD = 0.00;
    var directorRemuneration_GAD = 0.00;
    var directorCPF_GAD = 0.00;
    var employeeCPF_GAD = 0.00;
    var employerCPF_GAD = 0.00;
    var erCPF_GAD = 0.00;
    var CDAC_GAD = 0.00;
    var SDL_GAD = 0.00;
    var cpfPayable_GAD = 0.00;
    var byCheque_GAD = 0.00;
    var salaryPayable_GAD = 0.00;
    var table_left_GAD = 0.00;
    var table_right_GAD = 0.00;

    var grossSalary_Goldtech = 0.00;
    var directorRemuneration_Goldtech = 0.00;
    var directorCPF_Goldtech = 0.00;
    var employeeCPF_Goldtech = 0.00;
    var employerCPF_Goldtech = 0.00;
    var erCPF_Goldtech = 0.00;
    var CDAC_Goldtech = 0.00;
    var SDL_Goldtech = 0.00;
    var cpfPayable_Goldtech = 0.00;
    var byCheque_Goldtech = 0.00;
    var salaryPayable_Goldtech = 0.00;
    var table_left_Goldtech = 0.00;
    var table_right_Goldtech = 0.00;

    var grossSalary_Doro = 0.00;
    var directorRemuneration_Doro = 0.00;
    var directorCPF_Doro = 0.00;
    var employeeCPF_Doro = 0.00;
    var employerCPF_Doro = 0.00;
    var erCPF_Doro = 0.00;
    var CDAC_Doro = 0.00;
    var SDL_Doro = 0.00;
    var cpfPayable_Doro = 0.00;
    var byCheque_Doro = 0.00;
    var salaryPayable_Doro = 0.00;
    var table_left_Doro = 0.00;
    var table_right_Doro = 0.00;


    $.ajax({
        url: "ajax/employee-salary-voucher-analysis.ajax.php",
        method: "POST",
        data: { monthToAnalyse: monthToAnalyse, yearToAnalyse: yearToAnalyse },
        cache: false,
        dataType: "json",
        success: function (answer) {

            $("#appendAnalysisContent_GAD").html("");
            $("#appendAnalysisContent_Goldtech").html("");
            $("#appendAnalysisContent_Doro").html("");

            $("#appendAnalysisContent_GAD_PT").html("");
            $("#appendAnalysisContent_Goldtech_PT").html("");
            $("#appendAnalysisContent_Doro_PT").html("");

            $("#appendJournalContent_GAD").html("");
            $("#appendJournalContent_Goldtech").html("");
            $("#appendJournalContent_Doro").html("");

            $("#appendJournalContent_CPF_GAD").html("");
            $("#appendJournalContent_CPF_Goldtech").html("");
            $("#appendJournalContent_CPF_Doro").html("");

            if (answer != []) {
                $("#analysis_box_GAD").show();
                $("#analysis_box_Goldtech").show();
                $("#analysis_box_Doro").show();
            }

            for (var i = 0; i < answer.length; i++) {

                deduction_CDAC = Number(answer[i]['total_deductions'] - answer[i]['cpf_employee']).toFixed(2);
                total_CPF = Number(parseFloat(answer[i]['cpf_employee']) + parseFloat(answer[i]['cpf_employer'])).toFixed(2);

                if (answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                    if (answer[i]['is_part_time'] == 0) {
                        elementName = '#appendAnalysisContent_GAD';
                    } else {
                        elementName = '#appendAnalysisContent_GAD_PT';
                    }
                    journalName = '#appendJournalContent_GAD';
                    journalCPFName = '#appendJournalContent_CPF_GAD';

                    if (answer[i]['person_id'] != 20677) {
                        if (answer[i]['method_of_payment'] != 'Cheque') {
                            grossSalary_GAD += parseFloat(answer[i]['gross_pay']);
                            erCPF_GAD += parseFloat(answer[i]['cpf_employer']);
                            SDL_GAD += parseFloat(answer[i]['sdl_amount']);
                            cpfPayable_GAD += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            salaryPayable_GAD += parseFloat(answer[i]['final_amount']);

                            employeeCPF_GAD += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_GAD += parseFloat(answer[i]['cpf_employer']);
                            CDAC_GAD += parseFloat(deduction_CDAC);
                        } else {
                            grossSalary_GAD += parseFloat(answer[i]['gross_pay']);
                            erCPF_GAD += parseFloat(answer[i]['cpf_employer']);
                            SDL_GAD += parseFloat(answer[i]['sdl_amount']);
                            cpfPayable_GAD += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            byCheque_GAD += parseFloat(answer[i]['final_amount']);

                            employeeCPF_GAD += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_GAD += parseFloat(answer[i]['cpf_employer']);
                            CDAC_GAD += parseFloat(deduction_CDAC);
                        }
                    } else {
                        if (answer[i]['method_of_payment'] != 'Cheque') {
                            directorRemuneration_GAD = parseFloat(answer[i]['gross_pay']);
                            directorCPF_GAD = parseFloat(answer[i]['cpf_employer']);
                            cpfPayable_GAD += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            SDL_GAD += parseFloat(answer[i]['sdl_amount']);
                            salaryPayable_GAD += parseFloat(answer[i]['final_amount']);

                            employeeCPF_GAD += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_GAD += parseFloat(answer[i]['cpf_employer']);
                            CDAC_GAD += parseFloat(deduction_CDAC);
                        } else {
                            directorRemuneration_GAD = parseFloat(answer[i]['gross_pay']);
                            directorCPF_GAD = parseFloat(answer[i]['cpf_employer']);
                            cpfPayable_GAD += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            SDL_GAD += parseFloat(answer[i]['sdl_amount']);
                            byCheque_GAD += parseFloat(answer[i]['final_amount']);

                            employeeCPF_GAD += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_GAD += parseFloat(answer[i]['cpf_employer']);
                            CDAC_GAD += parseFloat(deduction_CDAC);
                        }
                    }

                    table_left_GAD = grossSalary_GAD + directorRemuneration_GAD + directorCPF_GAD + erCPF_GAD + SDL_GAD;
                    table_right_GAD = cpfPayable_GAD + byCheque_GAD + salaryPayable_GAD;

                } else if (answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                    if (answer[i]['is_part_time'] == 0) {
                        elementName = '#appendAnalysisContent_Goldtech';
                    } else {
                        elementName = '#appendAnalysisContent_Goldtech_PT';
                    }
                    journalName = '#appendJournalContent_Goldtech';
                    journalCPFName = '#appendJournalContent_CPF_Goldtech';

                    if (answer[i]['person_id'] != 20677) {
                        if (answer[i]['method_of_payment'] != 'Cheque') {
                            grossSalary_Goldtech += parseFloat(answer[i]['gross_pay']);
                            erCPF_Goldtech += parseFloat(answer[i]['cpf_employer']);
                            SDL_Goldtech += parseFloat(answer[i]['sdl_amount']);
                            cpfPayable_Goldtech += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            salaryPayable_Goldtech += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Goldtech += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Goldtech += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Goldtech += parseFloat(deduction_CDAC);
                        } else {
                            grossSalary_Goldtech += parseFloat(answer[i]['gross_pay']);
                            erCPF_Goldtech += parseFloat(answer[i]['cpf_employer']);
                            SDL_Goldtech += parseFloat(answer[i]['sdl_amount']);
                            cpfPayable_Goldtech += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            byCheque_Goldtech += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Goldtech += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Goldtech += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Goldtech += parseFloat(deduction_CDAC);
                        }
                    } else {
                        if (answer[i]['method_of_payment'] != 'Cheque') {
                            directorRemuneration_Goldtech = parseFloat(answer[i]['gross_pay']);
                            directorCPF_Goldtech = parseFloat(answer[i]['cpf_employer']);
                            cpfPayable_Goldtech += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            SDL_Goldtech += parseFloat(answer[i]['sdl_amount']);
                            salaryPayable_Goldtech += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Goldtech += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Goldtech += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Goldtech += parseFloat(deduction_CDAC);
                        } else {
                            directorRemuneration_Goldtech = parseFloat(answer[i]['gross_pay']);
                            directorCPF_Goldtech = parseFloat(answer[i]['cpf_employer']);
                            cpfPayable_Goldtech += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            SDL_Goldtech += parseFloat(answer[i]['sdl_amount']);
                            byCheque_Goldtech += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Goldtech += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Goldtech += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Goldtech += parseFloat(deduction_CDAC);
                        }
                    }

                    table_left_Goldtech = grossSalary_Goldtech + directorRemuneration_Goldtech + directorCPF_Goldtech + erCPF_Goldtech + SDL_Goldtech;
                    table_right_Goldtech = cpfPayable_Goldtech + byCheque_Goldtech + salaryPayable_Goldtech;
                } else {
                    if (answer[i]['is_part_time'] == 0) {
                        elementName = '#appendAnalysisContent_Doro';
                    } else {
                        elementName = '#appendAnalysisContent_Doro_PT';
                    }
                    journalName = '#appendJournalContent_Doro';
                    journalCPFName = '#appendJournalContent_CPF_Doro';

                    if (answer[i]['person_id'] != 20677) {
                        if (answer[i]['method_of_payment'] != 'Cheque') {
                            grossSalary_Doro += parseFloat(answer[i]['gross_pay']);
                            erCPF_Doro += parseFloat(answer[i]['cpf_employer']);
                            SDL_Doro += parseFloat(answer[i]['sdl_amount']);
                            cpfPayable_Doro += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            salaryPayable_Doro += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Doro += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Doro += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Doro += parseFloat(deduction_CDAC);
                        } else {
                            grossSalary_Doro += parseFloat(answer[i]['gross_pay']);
                            erCPF_Doro += parseFloat(answer[i]['cpf_employer']);
                            SDL_Doro += parseFloat(answer[i]['sdl_amount']);
                            cpfPayable_Doro += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            byCheque_Doro += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Doro += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Doro += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Doro += parseFloat(deduction_CDAC);
                        }
                    } else {
                        if (answer[i]['method_of_payment'] != 'Cheque') {
                            directorRemuneration_Doro = parseFloat(answer[i]['gross_pay']);
                            directorCPF_Doro = parseFloat(answer[i]['cpf_employer']);
                            cpfPayable_Doro += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            SDL_Doro += parseFloat(answer[i]['sdl_amount']);
                            salaryPayable_Doro += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Doro += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Doro += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Doro += parseFloat(deduction_CDAC);
                        } else {
                            directorRemuneration_Doro = parseFloat(answer[i]['gross_pay']);
                            directorCPF_Doro = parseFloat(answer[i]['cpf_employer']);
                            cpfPayable_Doro += (parseFloat(total_CPF) + parseFloat(answer[i]['sdl_amount']) + parseFloat(deduction_CDAC));
                            SDL_Doro += parseFloat(answer[i]['sdl_amount']);
                            byCheque_Doro += parseFloat(answer[i]['final_amount']);

                            employeeCPF_Doro += parseFloat(answer[i]['cpf_employee']);
                            employerCPF_Doro += parseFloat(answer[i]['cpf_employer']);
                            CDAC_Doro += parseFloat(deduction_CDAC);
                        }
                    }

                    table_left_Doro = grossSalary_Doro + directorRemuneration_Doro + directorCPF_Doro + erCPF_Doro + SDL_Doro;
                    table_right_Doro = cpfPayable_Doro + byCheque_Doro + salaryPayable_Doro;
                }

                var getSalaryRecordsByVoucherId = new FormData();
                getSalaryRecordsByVoucherId.append('getSalaryRecordsByVoucherId', answer[i]['voucher_id']);

                var salary_records;
                var temp_commission_amount = 0.00;

                if (answer[i]['is_part_time'] == 0) {
                    $.ajax({
                        url: "ajax/payroll.ajax.php",
                        async: false,
                        method: "POST",
                        data: getSalaryRecordsByVoucherId,
                        cache: false,
                        contentType: false,
                        processData: false,
                        dataType: "json"
                    }).done(function (data) {
                        salary_records = data;
                    })

                    for (var j = 0; j < salary_records.length; j++) {
                        if (salary_records[j]['title'].toLowerCase().includes("commission")) {
                            temp_commission_amount += parseFloat(salary_records[j]['amount']);
                        }
                    }

                    $(elementName).append(`
                    <tr>
                        <td>`+ answer[i]['person_id'] + `</td>
                        <td>`+ answer[i]['pay_to_name'] + `</td>
                        <td align="right">`+ salary_records[0]['amount'] + `</td>
                        <td align="right">`+ salary_records[1]['amount'] + `</td>
                        <td align="right">`+ salary_records[2]['amount'] + `</td>
                        <td align="right">`+ Number(temp_commission_amount).toFixed(2) + `</td>
                        <td align="right">`+ answer[i]['gross_pay'] + `</td>
                        <td align="right">`+ deduction_CDAC + `</td>
                        <td align="right">`+ answer[i]['cpf_employee'] + `</td>
                        <td align="right">`+ answer[i]['cpf_employer'] + `</td>
                        <td align="right">`+ total_CPF + `</td>
                        <td align="right">`+ answer[i]['final_amount'] + `</td>
                        <td align="right">`+ answer[i]['levy_amount'] + `</td>
                        <td align="right">`+ answer[i]['sdl_amount'] + `</td>
                    </tr>
                    `);

                } else {
                    $(elementName).append(`
                    <tr>
                        <td>`+ answer[i]['person_id'] + `</td>
                        <td>`+ answer[i]['pay_to_name'] + `</td>
                        <td align="right">`+ answer[i]['gross_pay'] + `</td>
                        <td align="right">`+ deduction_CDAC + `</td>
                        <td align="right">`+ answer[i]['cpf_employee'] + `</td>
                        <td align="right">`+ answer[i]['cpf_employer'] + `</td>
                        <td align="right">`+ total_CPF + `</td>
                        <td align="right">`+ answer[i]['final_amount'] + `</td>
                        <td align="right">`+ answer[i]['levy_amount'] + `</td>
                        <td align="right">`+ answer[i]['sdl_amount'] + `</td>
                    </tr>
                    `);
                }             

            }

            //Left and right lower tables - SET if (true) so that I can fold the code
            if (true) {
                $("#appendJournalContent_GAD").append(`
                <tr>
                    <td>Gross Salary</td>
                    <td align="right">`+ Number(grossSalary_GAD).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Director Remuneration</td>
                    <td align="right">`+ Number(directorRemuneration_GAD).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Director CPF</td>
                    <td align="right">`+ Number(directorCPF_GAD).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Employer CPF</td>
                    <td align="right">`+ Number(erCPF_GAD).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>SDL</td>
                    <td align="right">`+ Number(SDL_GAD).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>CPF Payable</td>
                    <td></td>
                    <td align="right">`+ Number(cpfPayable_GAD).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>By Cheque</td>
                    <td></td>
                    <td align="right">`+ Number(byCheque_GAD).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Salary Payable</td>
                    <td></td>
                    <td align="right">`+ Number(salaryPayable_GAD).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td></td>
                    <td align="right">`+ Number(table_left_GAD).toFixed(2) + `</td>
                    <td align="right">`+ Number(table_right_GAD).toFixed(2) + `</td>
                </tr>
                `);

                $("#appendJournalContent_CPF_GAD").append(`
                <tr>
                    <td>SDL</td>
                    <td align="right">`+ Number(SDL_GAD).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Employee CPF</td>
                    <td align="right">`+ Number(employeeCPF_GAD).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Employer CPF</td>
                    <td align="right">`+ Number(employerCPF_GAD).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>CDAC</td>
                    <td align="right">`+ Number(CDAC_GAD).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td></td>
                    <td align="right">`+ Number((SDL_GAD + employeeCPF_GAD + employerCPF_GAD + CDAC_GAD)).toFixed(2) + `</td>
                </tr>
                `);
            }

            if (true) {
                $("#appendJournalContent_Goldtech").append(`
                <tr>
                    <td>Gross Salary</td>
                    <td align="right">`+ Number(grossSalary_Goldtech).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Director Remuneration</td>
                    <td align="right">`+ Number(directorRemuneration_Goldtech).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Director CPF</td>
                    <td align="right">`+ Number(directorCPF_Goldtech).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Employer CPF</td>
                    <td align="right">`+ Number(erCPF_Goldtech).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>SDL</td>
                    <td align="right">`+ Number(SDL_Goldtech).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>CPF Payable</td>
                    <td></td>
                    <td align="right">`+ Number(cpfPayable_Goldtech).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>By Cheque</td>
                    <td></td>
                    <td align="right">`+ Number(byCheque_Goldtech).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Salary Payable</td>
                    <td></td>
                    <td align="right">`+ Number(salaryPayable_Goldtech).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td></td>
                    <td align="right">`+ Number(table_left_Goldtech).toFixed(2) + `</td>
                    <td align="right">`+ Number(table_right_Goldtech).toFixed(2) + `</td>
                </tr>
                `);

                $("#appendJournalContent_CPF_Goldtech").append(`
                <tr>
                    <td>SDL</td>
                    <td align="right">`+ Number(SDL_Goldtech).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Employee CPF</td>
                    <td align="right">`+ Number(employeeCPF_Goldtech).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Employer CPF</td>
                    <td align="right">`+ Number(employerCPF_Goldtech).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>CDAC</td>
                    <td align="right">`+ Number(CDAC_Goldtech).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td></td>
                    <td align="right">`+ Number((SDL_Goldtech + employeeCPF_Goldtech + employerCPF_Goldtech + CDAC_Goldtech)).toFixed(2) + `</td>
                </tr>
                `);
            }

            if (true) {
                $("#appendJournalContent_Doro").append(`
                <tr>
                    <td>Gross Salary</td>
                    <td align="right">`+ Number(grossSalary_Doro).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Director Remuneration</td>
                    <td align="right">`+ Number(directorRemuneration_Doro).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Director CPF</td>
                    <td align="right">`+ Number(directorCPF_Doro).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>Employer CPF</td>
                    <td align="right">`+ Number(erCPF_Doro).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>SDL</td>
                    <td align="right">`+ Number(SDL_Doro).toFixed(2) + `</td>
                    <td></td>
                </tr>
    
                <tr>
                    <td>CPF Payable</td>
                    <td></td>
                    <td align="right">`+ Number(cpfPayable_Doro).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>By Cheque</td>
                    <td></td>
                    <td align="right">`+ Number(byCheque_Doro).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Salary Payable</td>
                    <td></td>
                    <td align="right">`+ Number(salaryPayable_Doro).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td></td>
                    <td align="right">`+ Number(table_left_Doro).toFixed(2) + `</td>
                    <td align="right">`+ Number(table_right_Doro).toFixed(2) + `</td>
                </tr>
                `);

                $("#appendJournalContent_CPF_Doro").append(`
                <tr>
                    <td>SDL</td>
                    <td align="right">`+ Number(SDL_Doro).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Employee CPF</td>
                    <td align="right">`+ Number(employeeCPF_Doro).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>Employer CPF</td>
                    <td align="right">`+ Number(employerCPF_Doro).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td>CDAC</td>
                    <td align="right">`+ Number(CDAC_Doro).toFixed(2) + `</td>
                </tr>
    
                <tr>
                    <td></td>
                    <td align="right">`+ Number((SDL_Doro + employeeCPF_Doro + employerCPF_Doro + CDAC_Doro)).toFixed(2) + `</td>
                </tr>
                `);
            }

        }
    });
});
