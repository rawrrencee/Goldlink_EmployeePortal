<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Insights
            <small>Sales</small>
        </h1>
        <ol class="breadcrumb">
            <li><a href="home"><i class="fa fa-dashboard"></i> Home</a></li>
            <li class="active">Insights</li>
        </ol>
    </section>

    <div id="loading">
        <img id="loading-image" src="views/img/template/loading.gif" alt="Loading..." />
    </div>

    <section class="content">

        <div class="box box-success">
            <div class="box-header with-border">
                <h3 class="box-title">Product Sales</h3>
                <button id="refreshSalesCharts" type="button" class="btn btn-sm btn-info"
                    style="margin-top: 5px; margin-btm: 5px;">Refresh</button>
                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i
                            class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body">
                <div class="chart">
                    <canvas id="salesBarChart" style="height:230px"></canvas>
                </div>
            </div>
        </div>

    </section>
</div>

<script src="views/js/insights-sales.js"></script>