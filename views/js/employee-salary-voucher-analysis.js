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
    var deduction_MBMF = 0.00;
    var deduction_SINDA = 0.00;
    var deduction_ECF = 0.00;

    var other_deductions = 0.00;

    var total_other_deductions_GAD = 0.00;
    var total_other_deductions_Goldtech = 0.00;
    var total_other_deductions_Doro = 0.00;

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

    var basicPaySum_GAD = 0.00;
    var attendanceSum_GAD = 0.00;
    var productivitySum_GAD = 0.00;
    var salaryOthersSum_GAD = 0.00;
    var grossPaySum_GAD = 0.00;
    var deductionOthersSum_GAD = 0.00;
    var deductionCDACSum_GAD = 0.00;
    var deductionMBMFSum_GAD = 0.00;
    var deductionSINDASum_GAD = 0.00;
    var deductionECFSum_GAD = 0.00;
    var cpfEmployeeSum_GAD = 0.00;
    var cpfEmployerSum_GAD = 0.00;
    var totalCPFSum_GAD = 0.00;
    var netPaySum_GAD = 0.00;
    var FWLSum_GAD = 0.00;
    var SDLSum_GAD = 0.00;

    var grossPaySum_GAD_PT = 0.00;
    var deductionOthersSum_GAD_PT = 0.00;
    var deductionCDACSum_GAD_PT = 0.00;
    var deductionMBMFSum_GAD_PT = 0.00;
    var deductionSINDASum_GAD_PT = 0.00;
    var deductionECFSum_GAD_PT = 0.00;
    var cpfEmployeeSum_GAD_PT = 0.00;
    var cpfEmployerSum_GAD_PT = 0.00;
    var totalCPFSum_GAD_PT = 0.00;
    var netPaySum_GAD_PT = 0.00;
    var FWLSum_GAD_PT = 0.00;
    var SDLSum_GAD_PT = 0.00;

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

    var basicPaySum_Goldtech = 0.00;
    var attendanceSum_Goldtech = 0.00;
    var productivitySum_Goldtech = 0.00;
    var salaryOthersSum_Goldtech = 0.00;
    var grossPaySum_Goldtech = 0.00;
    var deductionOthersSum_Goldtech = 0.00;
    var deductionCDACSum_Goldtech = 0.00;
    var deductionMBMFSum_Goldtech = 0.00;
    var deductionSINDASum_Goldtech = 0.00;
    var deductionECFSum_Goldtech = 0.00;
    var cpfEmployeeSum_Goldtech = 0.00;
    var cpfEmployerSum_Goldtech = 0.00;
    var totalCPFSum_Goldtech = 0.00;
    var netPaySum_Goldtech = 0.00;
    var FWLSum_Goldtech = 0.00;
    var SDLSum_Goldtech = 0.00;

    var grossPaySum_Goldtech_PT = 0.00;
    var deductionOthersSum_Goldtech_PT = 0.00;
    var deductionCDACSum_Goldtech_PT = 0.00;
    var deductionMBMFSum_Goldtech_PT = 0.00;
    var deductionSINDASum_Goldtech_PT = 0.00;
    var deductionECFSum_Goldtech_PT = 0.00;
    var cpfEmployeeSum_Goldtech_PT = 0.00;
    var cpfEmployerSum_Goldtech_PT = 0.00;
    var totalCPFSum_Goldtech_PT = 0.00;
    var netPaySum_Goldtech_PT = 0.00;
    var FWLSum_Goldtech_PT = 0.00;
    var SDLSum_Goldtech_PT = 0.00;

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

    var basicPaySum_Doro = 0.00;
    var attendanceSum_Doro = 0.00;
    var productivitySum_Doro = 0.00;
    var salaryOthersSum_Doro = 0.00;
    var grossPaySum_Doro = 0.00;
    var deductionOthersSum_Doro = 0.00;
    var deductionCDACSum_Doro = 0.00;
    var deductionMBMFSum_Doro = 0.00;
    var deductionSINDASum_Doro = 0.00;
    var deductionECFSum_Doro = 0.00;
    var cpfEmployeeSum_Doro = 0.00;
    var cpfEmployerSum_Doro = 0.00;
    var totalCPFSum_Doro = 0.00;
    var netPaySum_Doro = 0.00;
    var FWLSum_Doro = 0.00;
    var SDLSum_Doro = 0.00;

    var grossPaySum_Doro_PT = 0.00;
    var deductionOthersSum_Doro_PT = 0.00;
    var deductionCDACSum_Doro_PT = 0.00;
    var deductionMBMFSum_Doro_PT = 0.00;
    var deductionSINDASum_Doro_PT = 0.00;
    var deductionECFSum_Doro_PT = 0.00;
    var cpfEmployeeSum_Doro_PT = 0.00;
    var cpfEmployerSum_Doro_PT = 0.00;
    var totalCPFSum_Doro_PT = 0.00;
    var netPaySum_Doro_PT = 0.00;
    var FWLSum_Doro_PT = 0.00;
    var SDLSum_Doro_PT = 0.00;


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

                deduction_CDAC = 0.00;

                var getDeductionRecordsByVoucherId = new FormData();
                getDeductionRecordsByVoucherId.append('getDeductionRecordsByVoucherId', answer[i]['voucher_id']);

                $.ajax({
                    url: "ajax/payroll.ajax.php",
                    async: false,
                    method: "POST",
                    data: getDeductionRecordsByVoucherId,
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json"
                }).done(function (data) {
                    deduction_records = data;
                })

                for (var j = 0; j < deduction_records.length; j++) {
                    if (deduction_records[j]['title'] != "CPF-EE") {
                        if (deduction_records[j]['title'] == "CDAC") {

                            deduction_CDAC = parseFloat(deduction_records[j]['amount']);

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionCDACSum_GAD += deduction_CDAC;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionCDACSum_GAD_PT += deduction_CDAC;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionCDACSum_Goldtech += deduction_CDAC;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionCDACSum_Goldtech_PT += deduction_CDAC;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionCDACSum_Doro += deduction_CDAC;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionCDACSum_Doro_PT += deduction_CDAC;
                            }

                        } else if (deduction_records[j]['title'] == "MBMF") {

                            deduction_MBMF = parseFloat(deduction_records[j]['amount']);

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionMBMFSum_GAD += deduction_MBMF;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionMBMFSum_GAD_PT += deduction_MBMF;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionMBMFSum_Goldtech += deduction_MBMF;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionMBMFSum_Goldtech_PT += deduction_MBMF;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionMBMFSum_Doro += deduction_MBMF;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionMBMFSum_Doro_PT += deduction_MBMF;
                            }

                        } else if (deduction_records[j]['title'] == "SINDA") {

                            deduction_SINDA = parseFloat(deduction_records[j]['amount']);

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionSINDASum_GAD += deduction_SINDA;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionSINDASum_GAD_PT += deduction_SINDA;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionSINDASum_Goldtech += deduction_SINDA;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionSINDASum_Goldtech_PT += deduction_SINDA;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionSINDASum_Doro += deduction_SINDA;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionSINDASum_Doro_PT += deduction_SINDA;
                            }

                        } else if (deduction_records[j]['title'] == "ECF") {

                            deduction_ECF = parseFloat(deduction_records[j]['amount']);

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionECFSum_GAD += deduction_ECF;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                deductionECFSum_GAD_PT += deduction_ECF;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionECFSum_Goldtech += deduction_ECF;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                deductionECFSum_Goldtech_PT += deduction_ECF;
                            }

                            if (answer[i]['is_part_time'] == 0 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionECFSum_Doro += deduction_ECF;
                            } else if (answer[i]['is_part_time'] == 1 && answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                deductionECFSum_Doro_PT += deduction_ECF;
                            }

                        } else {
                            other_deductions = parseFloat(deduction_records[j]['amount']);
                            if (answer[i]['company_name'] == 'Goldlink Asia Distribution Pte Ltd') {
                                total_other_deductions_GAD += parseFloat(deduction_records[j]['amount']);

                                if (answer[i]['is_part_time'] == 0) {
                                    deductionOthersSum_GAD += parseFloat(deduction_records[j]['amount']);
                                } else {
                                    deductionOthersSum_GAD_PT += parseFloat(deduction_records[j]['amount']);
                                }

                            } else if (answer[i]['company_name'] == 'Goldlink Technologies Pte Ltd') {
                                total_other_deductions_Goldtech += parseFloat(deduction_records[j]['amount']);

                                if (answer[i]['is_part_time'] == 0) {
                                    deductionOthersSum_GAD += parseFloat(deduction_records[j]['amount']);
                                } else {
                                    deductionOthersSum_GAD_PT += parseFloat(deduction_records[j]['amount']);
                                }

                            } else if (answer[i]['company_name'] == 'Doro International Pte Ltd') {
                                total_other_deductions_Doro += parseFloat(deduction_records[j]['amount']);

                                if (answer[i]['is_part_time'] == 0) {
                                    deductionOthersSum_GAD += parseFloat(deduction_records[j]['amount']);
                                } else {
                                    deductionOthersSum_GAD_PT += parseFloat(deduction_records[j]['amount']);
                                }
                            }
                        }
                    }
                }

                deduction_CDAC = Number(deduction_CDAC).toFixed(2);
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

                    if (answer[i]['is_part_time'] == 0) {
                        grossPaySum_GAD += parseFloat(answer[i]['gross_pay']);
                        cpfEmployeeSum_GAD += parseFloat(answer[i]['cpf_employee']);
                        cpfEmployerSum_GAD += parseFloat(answer[i]['cpf_employer']);
                        totalCPFSum_GAD += parseFloat(answer[i]['cpf_employee']) + parseFloat(answer[i]['cpf_employer']);
                        netPaySum_GAD += parseFloat(answer[i]['final_amount']);
                        FWLSum_GAD += parseFloat(answer[i]['levy_amount']);
                        SDLSum_GAD += parseFloat(answer[i]['sdl_amount']);
                    } else if (answer[i]['is_part_time'] == 1) {
                        grossPaySum_GAD_PT += parseFloat(answer[i]['gross_pay']);
                        cpfEmployeeSum_GAD_PT += parseFloat(answer[i]['cpf_employee']);
                        cpfEmployerSum_GAD_PT += parseFloat(answer[i]['cpf_employer']);
                        totalCPFSum_GAD_PT += parseFloat(answer[i]['cpf_employee']) + parseFloat(answer[i]['cpf_employer']);
                        netPaySum_GAD_PT += parseFloat(answer[i]['final_amount']);
                        FWLSum_GAD_PT += parseFloat(answer[i]['levy_amount']);
                        SDLSum_GAD_PT += parseFloat(answer[i]['sdl_amount']);
                    }

                    table_left_GAD = grossSalary_GAD + directorRemuneration_GAD + directorCPF_GAD + erCPF_GAD + SDL_GAD;
                    table_right_GAD = cpfPayable_GAD + byCheque_GAD + salaryPayable_GAD + total_other_deductions_GAD;

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

                    if (answer[i]['is_part_time'] == 0) {
                        grossPaySum_Goldtech += parseFloat(answer[i]['gross_pay']);
                        cpfEmployeeSum_Goldtech += parseFloat(answer[i]['cpf_employee']);
                        cpfEmployerSum_Goldtech += parseFloat(answer[i]['cpf_employer']);
                        totalCPFSum_Goldtech += parseFloat(answer[i]['cpf_employee']) + parseFloat(answer[i]['cpf_employer']);
                        netPaySum_Goldtech += parseFloat(answer[i]['final_amount']);
                        FWLSum_Goldtech += parseFloat(answer[i]['levy_amount']);
                        SDLSum_Goldtech += parseFloat(answer[i]['sdl_amount']);
                    } else if (answer[i]['is_part_time'] == 1) {
                        grossPaySum_Goldtech_PT += parseFloat(answer[i]['gross_pay']);
                        cpfEmployeeSum_Goldtech_PT += parseFloat(answer[i]['cpf_employee']);
                        cpfEmployerSum_Goldtech_PT += parseFloat(answer[i]['cpf_employer']);
                        totalCPFSum_Goldtech_PT += parseFloat(answer[i]['cpf_employee']) + parseFloat(answer[i]['cpf_employer']);
                        netPaySum_Goldtech_PT += parseFloat(answer[i]['final_amount']);
                        FWLSum_Goldtech_PT += parseFloat(answer[i]['levy_amount']);
                        SDLSum_Goldtech_PT += parseFloat(answer[i]['sdl_amount']);
                    }

                    table_left_Goldtech = grossSalary_Goldtech + directorRemuneration_Goldtech + directorCPF_Goldtech + erCPF_Goldtech + SDL_Goldtech;
                    table_right_Goldtech = cpfPayable_Goldtech + byCheque_Goldtech + salaryPayable_Goldtech + total_other_deductions_Goldtech;
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

                    if (answer[i]['is_part_time'] == 0) {
                        grossPaySum_Doro += parseFloat(answer[i]['gross_pay']);
                        cpfEmployeeSum_Doro += parseFloat(answer[i]['cpf_employee']);
                        cpfEmployerSum_Doro += parseFloat(answer[i]['cpf_employer']);
                        totalCPFSum_Doro += parseFloat(answer[i]['cpf_employee']) + parseFloat(answer[i]['cpf_employer']);
                        netPaySum_Doro += parseFloat(answer[i]['final_amount']);
                        FWLSum_Doro += parseFloat(answer[i]['levy_amount']);
                        SDLSum_Doro += parseFloat(answer[i]['sdl_amount']);
                    } else if (answer[i]['is_part_time'] == 1) {
                        grossPaySum_Doro_PT += parseFloat(answer[i]['gross_pay']);
                        cpfEmployeeSum_Doro_PT += parseFloat(answer[i]['cpf_employee']);
                        cpfEmployerSum_Doro_PT += parseFloat(answer[i]['cpf_employer']);
                        totalCPFSum_Doro_PT += parseFloat(answer[i]['cpf_employee']) + parseFloat(answer[i]['cpf_employer']);
                        netPaySum_Doro_PT += parseFloat(answer[i]['final_amount']);
                        FWLSum_Doro_PT += parseFloat(answer[i]['levy_amount']);
                        SDLSum_Doro_PT += parseFloat(answer[i]['sdl_amount']);
                    }

                    table_left_Doro = grossSalary_Doro + directorRemuneration_Doro + directorCPF_Doro + erCPF_Doro + SDL_Doro;
                    table_right_Doro = cpfPayable_Doro + byCheque_Doro + salaryPayable_Doro + total_other_deductions_Doro;
                }

                var getSalaryRecordsByVoucherId = new FormData();
                getSalaryRecordsByVoucherId.append('getSalaryRecordsByVoucherId', answer[i]['voucher_id']);

                var salary_records;
                var salary_others = 0.00;

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

                    for (var k = 0; k < salary_records.length; k++) {
                        if (salary_records[k]['title'] != "Basic Pay" && salary_records[k]['title'] != "Attendance" && salary_records[k]['title'] != "Productivity") {
                            salary_others += parseFloat(salary_records[k]['amount']);
                        }
                    }

                    if (answer[i]['company_name'] == "Goldlink Asia Distribution Pte Ltd") {
                        basicPaySum_GAD += parseFloat(salary_records[0]['amount']);
                        attendanceSum_GAD += parseFloat(salary_records[1]['amount']);
                        productivitySum_GAD += parseFloat(salary_records[2]['amount']);
                    } else if (answer[i]['company_name'] == "Goldlink Technologies Pte Ltd") {
                        basicPaySum_Goldtech += parseFloat(salary_records[0]['amount']);
                        attendanceSum_Goldtech += parseFloat(salary_records[1]['amount']);
                        productivitySum_Goldtech += parseFloat(salary_records[2]['amount']);
                    } else if (answer[i]['company_name'] == "Doro International Pte Ltd") {
                        basicPaySum_Doro += parseFloat(salary_records[0]['amount']);
                        attendanceSum_Doro += parseFloat(salary_records[1]['amount']);
                        productivitySum_Doro += parseFloat(salary_records[2]['amount']);
                    }

                    $(elementName).append(`
                    <tr>
                        <td>`+ answer[i]['person_id'] + `</td>
                        <td>`+ answer[i]['pay_to_name'] + `</td>
                        <td align="right">`+ salary_records[0]['amount'] + `</td>
                        <td align="right">`+ salary_records[1]['amount'] + `</td>
                        <td align="right">`+ salary_records[2]['amount'] + `</td>
                        <td align="right">`+ Number(salary_others).toFixed(2) + `</td>
                        <td align="right">`+ answer[i]['gross_pay'] + `</td>
                        <td align="right">`+ Number(other_deductions).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_CDAC).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_MBMF).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_SINDA).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_ECF).toFixed(2) + `</td>
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
                        <td align="right">`+ Number(other_deductions).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_CDAC).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_MBMF).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_SINDA).toFixed(2) + `</td>
                        <td align="right">`+ Number(deduction_ECF).toFixed(2) + `</td>
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

            $('#appendAnalysisContent_GAD').append(`
                <tr>
                    <td colspan="2"><strong>Subtotal</strong></td>
                    <td align="right"><strong>`+ Number(basicPaySum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(attendanceSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(productivitySum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(salaryOthersSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(grossPaySum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(deductionOthersSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(deductionCDACSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(deductionMBMFSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(deductionSINDASum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(deductionECFSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(cpfEmployeeSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(cpfEmployerSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(totalCPFSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(netPaySum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(FWLSum_GAD).toFixed(2) + `</strong></td>
                    <td align="right"><strong>`+ Number(SDLSum_GAD).toFixed(2) + `</strong></td>
                </tr>
            `);

            $('#appendAnalysisContent_GAD_PT').append(`
            <tr>
                <td colspan="2"><strong>Subtotal</strong></td>
                <td align="right"><strong>`+ Number(grossPaySum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionOthersSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionCDACSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionMBMFSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionSINDASum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionECFSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployeeSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployerSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(totalCPFSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(netPaySum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(FWLSum_GAD_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(SDLSum_GAD_PT).toFixed(2) + `</strong></td>
            </tr>
            `);

            $('#appendAnalysisContent_total_GAD').append(`
            <tr>
                <td align="right">`+ Number(grossPaySum_GAD + grossPaySum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionOthersSum_GAD + deductionOthersSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionCDACSum_GAD + deductionCDACSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionMBMFSum_GAD + deductionMBMFSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionSINDASum_GAD + deductionSINDASum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionECFSum_GAD + deductionECFSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(cpfEmployeeSum_GAD + cpfEmployeeSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(cpfEmployerSum_GAD + cpfEmployerSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(totalCPFSum_GAD + totalCPFSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(netPaySum_GAD + netPaySum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(FWLSum_GAD + FWLSum_GAD_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(SDLSum_GAD + SDLSum_GAD_PT).toFixed(2) + `</td>
            </tr>
            `);

            $('#appendAnalysisContent_Goldtech').append(`
            <tr>
                <td colspan="2"><strong>Subtotal</strong></td>
                <td align="right"><strong>`+ Number(basicPaySum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(attendanceSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(productivitySum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(salaryOthersSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(grossPaySum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionOthersSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionCDACSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionMBMFSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionSINDASum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionECFSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployeeSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployerSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(totalCPFSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(netPaySum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(FWLSum_Goldtech).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(SDLSum_Goldtech).toFixed(2) + `</strong></td>
                </tr>
            `);

            $('#appendAnalysisContent_Goldtech_PT').append(`
            <tr>
                <td colspan="2"><strong>Subtotal</strong></td>
                <td align="right"><strong>`+ Number(grossPaySum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionOthersSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionCDACSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionMBMFSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionSINDASum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionECFSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployeeSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployerSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(totalCPFSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(netPaySum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(FWLSum_Goldtech_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(SDLSum_Goldtech_PT).toFixed(2) + `</strong></td>
                </tr>
            `);

            $('#appendAnalysisContent_total_Goldtech').append(`
            <tr>
                <td align="right">`+ Number(grossPaySum_Goldtech + grossPaySum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionOthersSum_Goldtech + deductionOthersSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionCDACSum_Goldtech + deductionCDACSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionMBMFSum_Goldtech + deductionMBMFSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionSINDASum_Goldtech + deductionSINDASum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionECFSum_Goldtech + deductionECFSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(cpfEmployeeSum_Goldtech + cpfEmployeeSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(cpfEmployerSum_Goldtech + cpfEmployerSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(totalCPFSum_Goldtech + totalCPFSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(netPaySum_Goldtech + netPaySum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(FWLSum_Goldtech + FWLSum_Goldtech_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(SDLSum_Goldtech + SDLSum_Goldtech_PT).toFixed(2) + `</td>
            </tr>
            `);

            $('#appendAnalysisContent_Doro').append(`
            <tr>
                <td colspan="2"><strong>Subtotal</strong></td>
                <td align="right"><strong>`+ Number(basicPaySum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(attendanceSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(productivitySum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(salaryOthersSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(grossPaySum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionOthersSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionCDACSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionMBMFSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionSINDASum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionECFSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployeeSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployerSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(totalCPFSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(netPaySum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(FWLSum_Doro).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(SDLSum_Doro).toFixed(2) + `</strong></td>
                </tr>
            `);

            $('#appendAnalysisContent_Doro_PT').append(`
            <tr>
                <td colspan="2"><strong>Subtotal</strong></td>
                <td align="right"><strong>`+ Number(grossPaySum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionOthersSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionCDACSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionMBMFSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionSINDASum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(deductionECFSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployeeSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(cpfEmployerSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(totalCPFSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(netPaySum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(FWLSum_Doro_PT).toFixed(2) + `</strong></td>
                <td align="right"><strong>`+ Number(SDLSum_Doro_PT).toFixed(2) + `</strong></td>
                </tr>
            `);

            $('#appendAnalysisContent_total_Doro').append(`
            <tr>
                <td align="right">`+ Number(grossPaySum_Doro + grossPaySum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionOthersSum_Doro + deductionOthersSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionCDACSum_Doro + deductionCDACSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionMBMFSum_Doro + deductionMBMFSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionSINDASum_Doro + deductionSINDASum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(deductionECFSum_Doro + deductionECFSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(cpfEmployeeSum_Doro + cpfEmployeeSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(cpfEmployerSum_Doro + cpfEmployerSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(totalCPFSum_Doro + totalCPFSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(netPaySum_Doro + netPaySum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(FWLSum_Doro + FWLSum_Doro_PT).toFixed(2) + `</td>
                <td align="right">`+ Number(SDLSum_Doro + SDLSum_Doro_PT).toFixed(2) + `</td>
            </tr>
            `);

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
                    <td>Deductions (Others)</td>
                    <td></td>
                    <td align="right">`+ Number(total_other_deductions_GAD).toFixed(2) + `</td>
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
                    <td align="right">`+ Number((SDL_GAD + employeeCPF_GAD + employerCPF_GAD + CDAC_GAD).toFixed(2)) + `</td>
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
                    <td>Deductions (Others)</td>
                    <td></td>
                    <td align="right">`+ Number(total_other_deductions_Goldtech).toFixed(2) + `</td>
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
                    <td>Deductions (Others)</td>
                    <td></td>
                    <td align="right">`+ Number(total_other_deductions_Doro).toFixed(2) + `</td>
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

            swal({
                type: "success",
                title: "Salary Voucher Analytics loaded succesfully.",
                showConfirmButton: true,
                confirmButtonText: "Close"
            })
        }

    });
});
