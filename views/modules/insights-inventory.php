<div class="content-wrapper">
    <section class="content-header">
        <h1>
            Insights
            <small>Inventory</small>
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

        <!-- BAR CHART -->
        <div class="box box-success">
            <div class="box-header with-border">
                <h3 class="box-title">Stock Count by Product Category</h3>

                <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
                    </button>
                    <button type="button" class="btn btn-box-tool" data-widget="remove"><i
                            class="fa fa-times"></i></button>
                </div>
            </div>
            <div class="box-body">
                <!-- Date -->
                <div class="form-group">
                    <label>Date:</label>

                    <div class="input-group date">
                        <div class="input-group-addon">
                            <i class="fa fa-calendar"></i>
                        </div>
                        <input type="text" class="form-control pull-right" id="inventoryInsightsDatePicker">
                    </div>
                    <!-- /.input group -->
                </div>
                <!-- /.form group -->
                <div class="chart">
                    <canvas id="inventoryBarChart" style="height:500px"></canvas>
                </div>
            </div>
            <!-- /.box-body -->
        </div>
    </section>
</div>
<script src="views/js/insights-inventory.js"></script>