<div id="pcf-main" class="">
  <div id="form" class="">
    <form class="form-selector" action="/" data-hoverAlpha="1">
      <div class="data-field" id="acct">
        <div class="data-legend"></div>
        <input type="text" class="data-label" value="Accounting & Finance" disabled>
        <input type="number" id="acct-field" class="data-value" max="10" min="1" value="5">
      </div>
      <div class="data-field" id="mkt">
        <div class="data-legend"></div>
        <input type="text" class="data-label" value="Marketing" disabled>
        <input type="number" id="mkt-field" class="data-value" max="10" min="1" value="5">
      </div>
      <div class="data-field" id="hr">
        <div class="data-legend"></div>
        <input type="text" class="data-label" value="Human Resources" disabled>
        <input type="number" id="hr-field" class="data-value" max="10" min="1" value="5">
      </div>
      <div class="data-field" id="sales">
        <div class="data-legend"></div>
        <input type="text" class="data-label" value="Sales" disabled>
        <input type="number" id="sales-field" class="data-value" max="10" min="1" value="5">
      </div>
      <div class="data-field" id="opr">
        <div class="data-legend"></div>
        <input type="text" class="data-label" value="Operations" disabled>
        <input type="number" id="opr-field" class="data-value" max="10" min="1" value="5">
      </div>
      <!--
      <input type="submit" value="Test Data" class="test-data" > -->
    </form>
    <div class="data-out"></div>
  </div>
  <div id="chart" class="">
    <canvas width="400" height="400" id="myChart"></canvas>
  </div>
</div>
