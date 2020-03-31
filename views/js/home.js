$(document).ready(function () {
    loadSalesTarget();
});

function loadSalesTarget() {

    if (typeof currentPersonId === 'undefined') {
        return;
    }

    $.ajax({
        url: "ajax/stores.ajax.php",
        method: "POST",
        data: {
            get_all_stores: 0
        },
        dataType: "json",
        success: function (answer) {
            let selectedEmployeeIdArray = [];
            let selectedMonthArray = [];
            let selectedYearArray = [];
            let selectedStoreArray = [];

            let currentDate = new Date();

            for (let i = 0; i < answer.length; i++) {
                selectedStoreArray.push(answer[i]['store_id']);
            }

            selectedEmployeeIdArray.push(currentPersonId.toString());

            selectedMonthArray.push((currentDate.getMonth() + 1).toString());

            selectedYearArray.push(currentDate.getFullYear().toString());

            getIndividualEmployeeSalesTarget(selectedEmployeeIdArray, selectedStoreArray, selectedMonthArray, selectedYearArray);

        }
    });


}

function getIndividualEmployeeSalesTarget(selectedEmployeeIdArray, selectedStoreArray, selectedMonthArray, selectedYearArray) {
    $.ajax({
        url: "ajax/employees.ajax.php",
        method: "POST",
        data: {
            get_all_employee_store_targets: selectedEmployeeIdArray,
            get_selected_stores: selectedStoreArray,
            get_selected_months: selectedMonthArray,
            get_selected_years: selectedYearArray
        },
        dataType: "json",
        success: function (answer) {

            if (answer.length == 0) {
                $("#homePageMySalesTargets").append(
                    `
                    <h4 class="text-info text-center">You have no sales target for this month.</h4>
                    `
                );
            }

            for (let i = 0; i < answer.length; i++) {

                let storeId = answer[i][0].store_id;
                let storeIdElement = "employeeSalesTargetList_" + storeId;

                salesTargetData = answer[i][0];
                salesTargetData['current_sales_amount'] = parseFloat(answer[i].current_sales_amount);

                let containerName = "#" + storeIdElement + "_container" + i;

                $("#homePageMySalesTargets").append(
                    `
                        <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12">
                            <div class="box box-widget widget-user-2" style="box-shadow: 1px 1px 4px 0px #dfdfdf; margin-top: 10px;"> 
                                <div class="widget-user-header">
                                    <h4 class="">` + salesTargetData['store_name'] + `</h4>
                                    
                                    <div class="pull-right">
                                        <h5 style="color: #999;">Target: $` + salesTargetData['sales_target'] + `</h5>
                                    </div>
                                    <div id="` + storeIdElement + `_container` + i + `" class="">
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                );

                initSalesTargetBarForEmployee(salesTargetData, containerName);


            }
        }
    });
}

function initSalesTargetBarForEmployee(salesTargetData, containerName) {

    let percentageCompletion = salesTargetData['current_sales_amount'] / salesTargetData['sales_target'];
    let textAlign = "left";
    let color = "#f0ad4e";
    let percentageCompletionStr = "";
    if (percentageCompletion >= 1) {
        percentageCompletion = 1;
        textAlign = "right";
        color = "#5cb85c";
        percentageCompletionStr = "0%";
    } else if (percentageCompletion === 0) {
        textAlign = "left";
        percentageCompletionStr = "0%";
    } else {
        if (percentageCompletion > 0.7) {
            textAlign = "right";
            percentageCompletionStr = "0%";
        } else {
            percentageCompletionStr = percentageCompletion * 100 - 5 + "%";
        }
    }
    if (percentageCompletion < 0.5) {
        color = "#d9534f";
    }

    var bar = new ProgressBar.Line(containerName, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: color,
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: {
            width: '100%',
            height: '100%',
            padding: '10px'
        },
        text: {
            style: {
                // Text color.
                // Default: same as stroke color (options.color)
                textAlign: textAlign,
                color: '#999',
                width: '100%',
                right: '0',
                top: '30px',
                padding: 0,
                marginLeft: percentageCompletionStr,
                transform: null
            },
            autoStyleContainer: false
        },
        step: (state, bar) => {
            bar.setText("$" + salesTargetData['current_sales_amount']);
        }
    });

    bar.animate(percentageCompletion);
}