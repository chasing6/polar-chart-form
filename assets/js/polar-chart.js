var chart;

// options for the chart
var options = {
  scale: {
    ticks: {
      beginAtZero: true,
      min: 0,
      max:10,
      stepSize: 2
    },
  },
  layout: {
    padding: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    },
  },
  animation: {
    animateRotate: true,
  },
  segmentStrokeColor: "rgba(255,255,255,0)",
  segmentStrokeWidth: 0,
  legend: false
};

drawChart();
/*
 * Draws the chart
 */
function drawChart(){
  // hide the lines

  if (chart){
    chart.destroy();
  }
  Chart.defaults.global.elements.arc.borderColor = 'rgba(255,255,255,0)';

  chart = new Chart(jQuery('#myChart'), {
    type: 'polarArea',
    options: options,
    data: chartData(),
  });
  //console.log(chart);
}
/*
 * Gets the data for the chart
 */
function chartData(){
  var fields = getFields();
  var data = {
    labels: fields.labels,
    datasets: [{
      data: fields.data,
      backgroundColor: fields.backgroundColor,
      //borderColor: fields.borderColor,
      //hoverBackgroundColor: fields.hoverBackgroundColor,
      //hoverBorderColor: fields.hoverBorderColor,
    }],
  };
  //console.log(fields);
  return data;
}
/*
 * gets all the fields from the form,
 * including information
 */
function getFields(){

  var fields = {
    ids: [],
    data: [],
    dataIds: [],
    labels: [],
    backgroundColor: [],
    borderColor: [],
    hoverBackgroundColor: [],
    hoverBorderColor: [],
  };

  jQuery('.form-selector .data-field').each(function (index, value){
    var name = jQuery(this).attr('id');
    var id = '#' + name;
    var dataId = jQuery(this).find('.data-value').attr('id');

    fields.ids.push(name); //the id field to look for
    fields.dataIds.push( dataId );
    fields.data.push(maxVal(jQuery(id + ' .data-value').val()) );
    fields.labels.push( jQuery(id + ' .data-label').val() ); // the content of the label

    // color info
    var bgColor = jQuery(id + ' .data-legend').css('background-color');
    fields.backgroundColor.push( bgColor );
    fields.hoverBorderColor.push( bgColor );

  });
  updateFieldValues(fields);
  return fields;
}
function addAlpha( rgb, alpha ){
  var parts;
  var rgba;
  // is it rgba?
  if ( rgb.startsWith('rgb(') ){
    parts = rgb.replace( 'rgb(', '').replace(')', '').split(', ');
  } else if ( rgb.startsWith('rgba(') ){
    parts = rgb.replace( 'rgba(', '').replace(')', '').split(', ');
    var old = parts.pop();
  } else {
    // default to return the same
    // will convert to rgb later
    return rgb;
  }
  parts.push(alpha);
  parts = parts.join()
  rgba = 'rgba(' + parts + ')';
  return rgba;
}

function randomizeDataset(fields){
  var len = fields.ids.length;
  var set = [];

  // create random set of length len
  while( set.length < len ){
    set.push (randomVal());
  }
  fields.data = set;
  //console.log(fields);
  return fields;
}
function updateFieldValues(fields){
  fields.dataIds.forEach( (v,k) => jQuery('#' + v).val(fields.data[k]));
  //fields.labelIds.forEach( (v,k) => jQuery('#' + v).val(fields.labels[k]));
}

function updateFormFields( fields ){
  fields.dataIds.forEach( (v,k) => jQuery('#' + v).val(fields.data[k]));
  fields.ids.forEach( (v,k) => jQuery('#' + id + ' .data-label').val(fields.labels[k]))
}
function updateChartData(data){
  chart.data.datasets.forEach( (dataset) => dataset.data = data );
  chart.update();
}

function randomVal(){
  var max = chart.options.scale.ticks.max;
  var min = chart.options.scale.ticks.min + 1;
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
/*
 * Makes sure the values aren't too high to go over the chart's max
 */
function maxVal(value, field){
  //console.log( options.scale.ticks.max );

  var max = options.scale.ticks.max;
  if ( value > max ){
    value = max;
    jQuery(field).val( max ); // rewrite to max
  }
  return value;
}

// Add some test functionality
jQuery('.test-data').on('click', function(e) {
  e.preventDefault();
  var fields = randomizeDataset( getFields() );
  //updateChartData( fields.data );
  updateChart(fields, true);

});

function updateChart( fields = false, form = false){
  if (fields == false){
    fields = getFields();
  }
  updateChartData(fields.data)
  if ( form ){
    //updateFieldValues(fields);
    updateFormFields(fields);
    //console.log(fields);
  }

  chart.update();
}

// update the chart when you leave a value field
jQuery('.data-value').on('input', function(){
  updateChartData(getFields().data)
});

//jQuery(window).resize(updateChart());

var height = jQuery('.data-value').css('height');
jQuery('.data-legend').css('height', height).css('width', height);
