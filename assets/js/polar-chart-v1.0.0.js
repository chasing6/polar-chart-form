var chart;
var chartID = 'myChart';
var initialDraw = true;

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
  tooltips: {
    enabled: false
  },
  hover: {
    // /animationDuration: 0,
  },
  animation: {
    animateRotate: false,
    onProgress: function() {
      drawLabels();
    },
    onComplete: function () {
      if ( initialDraw ){
        drawLabels();
      }
      initialDraw = false;
    },
  },
  segmentStrokeColor: "rgba(255,255,255,0)",
  segmentStrokeWidth: 1,
  legend: false,
  // /events: [],
};

function drawLabels(){
  var chartInstance = chart.chart,
      ctx = chartInstance.ctx;

  var body = jQuery('body');
  ctx.font = body.css('font-size') + " " + body.css('font-family');
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = body.css('color');

  // move registration to center of canvas
  var canvasWidth = jQuery('#myChart').attr('width');
  var canvasHeight = jQuery('#myChart').attr('height');

  var initTransX = canvasWidth/2;
  var initTransY = canvasHeight/2;
  var defaultPos = 50;

  var labels = chart.data.labels;

  // arc radians of a single segment
  var segment = (2*Math.PI)/ labels.length;


  labels.forEach( function(label, i){

    var rotate = -Math.PI/2 + segment/2 + segment*(i);

    var position = defaultPos;

    // check the rotation angle to see if we need to flip text
    if ( rotate > Math.PI/2 ) {
      ctx.textAlign= 'right';
      position = - position
      // change the roation to the other way
      rotate = - Math.PI + rotate;
    }

    // move the origin to the center of the graph
    ctx.translate( initTransX, initTransY);
    // rotate to origin, half of the segment (to center), and a number of segments (to fill correct)
    ctx.rotate( rotate );
    // add the text
    ctx.fillText(label , position,0);
    // rotate back
    ctx.rotate( -rotate );
    // translate back
    ctx.translate( -initTransX, -initTransY);
  });

}

// do the initial draw
drawChart();

/*
 * Draws the chart
 */
function drawChart(){

  if (chart){
    chart.destroy();
  }
  Chart.defaults.global.elements.arc.borderColor = 'rgba(255,255,255,0)';

  chart = new Chart(jQuery('#myChart'), {
    type: 'polarArea',
    options: options,
    data: buildChartData(),
  });
}

/*
 * Updates the chart from form data
 */
function updateChart( update = 'data' ){
  data = getFormData();


  switch( update ) {
    case 'data':
      //chart.data.datasets.forEach( (dataset) => dataset.data = data.data );
      break;
    case 'labels':
    //  chart.data.labels = data.labels;
      break;
  }
  chart.data.datasets.forEach( (dataset) => dataset.data = data.data );
  chart.data.datasets.forEach( (dataset) => dataset.backgroundColor = data.backgroundColor );
  chart.data.labels = data.labels;
  chart.update();
}
/*
 * Gets the data from the form
 */
function getFormData(){

  var data = {
    ids: [],
    data: [],
    labels: [],
    backgroundColor: [],
  };

  jQuery('.form-selector .data-field').each(function (index, value){
    var name = jQuery(this).attr('id');
    var id = '#' + name;
    //var dataId = jQuery(this).find('.data-value').attr('id');
    var label = jQuery(id + ' .data-label').val();

    // add the info if there is a label
    if ( label ){
      data.ids.push(name); //the id field to look for
      data.data.push( maxVal( jQuery(id + ' .data-value').val(), id ) );
      data.labels.push( label ); // the content of the label

      // color info
      data.backgroundColor.push( jQuery(id + ' .data-legend').css('background-color') );
    }

  });

  //console.log (data);
  return data;
}

function buildChartData(){
  form = getFormData();
  data = {
    labels: form.labels,
    datasets: [{
      data: form.data,
      backgroundColor: form.backgroundColor,
    }],
  }
  return data
}

/*
 * Makes sure the values aren't too high to go over the chart's max
 */
function maxVal(value, row){


  var max = options.scale.ticks.max;
  if ( value > max ){
    value = max;
    jQuery(row).find('.data-value').val(value);
  }
  return value;
}

function addRow(form = '#myChart'){
  console.log('added');
}

// update the chart when you leave a value field
jQuery('.data-value').on('input', function(){
  updateChart();
});
// update the chart when you leave a value field
jQuery('.data-label').on('input', function(){
  //updateChart('labels');
  updateChart();
  //chart.update();
});
// change the height of some elements
var height = jQuery('.data-value').css('height');
jQuery('.data-legend').css('height', height).css('width', height);
