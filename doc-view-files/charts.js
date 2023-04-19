/*-
     Program: charts.js
 Description: Charts
-*/

/* Modify c3.js to allow onload function:

        function initWithUrl(args) {
            var type = args.mimeType ? args.mimeType : 'csv';
            d3.xhr(args.url, function (error, data) {
                var d;
                if (type === 'json') {
                    d = convertJsonToData(JSON.parse(data.response), args.keys);
                } else {
                    d = convertCsvToData(data.response);
                }
                init(d);
                if(typeof args.onload=='function')args.onload(); !!!!!!!
            });
        }
*/

Coins.charts=new Array();
Coins.tables=new Array();

function getHHMM(hDate) {
  lcMins=hDate.getMinutes() + '';
  lcHours=hDate.getHours() + '';
  if(lcMins.length==1) lcMins = '0' + lcMins;
  if(lcHours.length==1) lcHours = '0' + lcHours;
  return lcHours + ':' + lcMins;
}
function getHHMMSS(hDate) {
  lcMins=hDate.getMinutes() + '';
  lcHours=hDate.getHours() + '';
  lcSecs=hDate.getSeconds() + '';
  if(lcMins.length==1) lcMins = '0' + lcMins;
  if(lcHours.length==1) lcHours = '0' + lcHours;
  if(lcSecs.length==1) lcSecs = '0' + lcSecs;
  return lcHours + ':' + lcMins + ':' + lcSecs;
}

var hClickChartX;
clickChartX = function(data,xFn) {
  if(hClickChartX) clearTimeout(hClickChartX);
  hClickChartX=setTimeout(function() {xFn(data)},10);
}

Coins.chart = function(pcID,pcURL,phData,phConfig,phOverride,phOptions) {

  if(phOverride==undefined) phOverride={};

  lhObject = jQuery('#' + pcID);
  if(lhObject.length==0) return;

  if(lhObject.width()!=0) {
    lhObject.css('width',lhObject.width() + 'px')
  }

  h=Coins.charts[Coins.charts.length]={};
  h.cID=pcID;
  h.URL=pcURL;
  h.hObject = lhObject;
  h.data = phData;
  h.config = phConfig;
  
  lbRefresh=true;
  if(phOptions && phOptions.refresh != undefined)
    lbRefresh=phOptions.refresh;

  if(phOverride.config)
    jQuery.extend(true,h.config,phOverride.config);

  names = {};
  axes = {};
  types = {};
  color = {pattern:['#5f86b7', '#9ecbf4', '#074d65', '#efbba2', '#6f1f17', '#fd8992', '#b70d61', '#1eafae']};
  colors = {};
  
  /* put in to names */
  for (i=0;i<h.data.y.length;i++) {
    eval('names.' + h.data.yid[i] + '="' + h.data.y[i] + '"');
    if(h.data.yconfig[i].type)
      eval('types.' + h.data.yid[i] + '="' + h.data.yconfig[i].type + '"');
    if(h.data.yconfig[i].color)
      eval('colors.' + h.data.yid[i] + '="' + h.data.yconfig[i].color + '"');
  }
  /* put y2_n on to y2 axes */
  for (i=0;i<h.data.y2.length;i++) {
    eval('names.' + h.data.y2id[i] + '="' + h.data.y2[i] + '"');
    eval('axes.' + h.data.y2id[i] + '="y2"');
    if(h.data.y2config[i].type)
      eval('types.' + h.data.y2id[i] + '="' + h.data.y2config[i].type + '"');
    if(h.data.y2config[i].color)
      eval('colors.' + h.data.y2id[i] + '="' + h.data.y2config[i].color + '"');
  }

  axis = {
       x: {
         label: {
           text: h.data.x,
           position: "outer-center"
         },
         type: "timeseries",
         tick: {
           format: "%d/%m/%y %H:%M"
         }
       },
       y: {
         label: {
           text: h.data.yaxis,
           position: "outer-middle"
         }
       },
       y2: {
         show: (h.data.y2.length>0),
         label: {
           text: h.data.y2axis,
           position: 'outer-middle'
         }
       }
     };

  jQuery.extend(true,axis,h.config.axis);
  if(phOverride.data)
    jQuery.extend(true,h.data,phOverride.data);

  groups=h.data.groups;

  legend={};
  jQuery.extend(true,legend,h.config.legend);

  padding={};
  jQuery.extend(true,padding,h.config.padding);

  grid={y:{show:true}};
  jQuery.extend(true,grid,h.config.grid);

  tooltip={};
  jQuery.extend(true,tooltip,h.config.tooltip);

  liHeight=parseInt(lhObject.get()[0].style.height);
  liWidth=parseInt(lhObject.get()[0].style.width);

  if (liHeight==0 || isNaN(liHeight)) {
    liHeight = lhObject.parent().parent().height();
    lhObject.parent().children().first().find('*').each(function() {
      liHeight = liHeight - $(this).height();
    });
  }
  if(liWidth==0 || isNaN(liWidth)) {
    liWidth = lhObject.parent().parent().width();
  }
  h.width=liWidth;
  h.height=liHeight;

  jQuery.extend(true,color,h.color,phOverride.color);

  if(phOverride.colors)
    jQuery.extend(true,colors,phOverride.colors);

  /* if only one series and color set to colour */
  /* always use colour palette 
   * if(h.data.y.length + h.data.y2.length==1)
   * color.pattern=[h.config.color]; */

  if(h.config.onclick) {
    var fnOnClick=h.config.onclick;
  }
  else {
    if (h.config.type=='pie')
    var fnOnClick=function(d,i) {
          if(d.id!=undefined) {
            console.log(d.id,' ',d.name,' ',d.ratio,' ',d.value)
          }
        }
    else
    var fnOnClick=function(d,i) {
           if(d.id!=undefined) {
             console.log(d.id, d.x, d.name, d.value,
                         d3.time.format("%Y-%m-%dT%H:%M:%S%Z")(d.x));
           }
         }
  }
  
  var style = '';
  style += '<style class=" " type="text/css">';
  if(h.config.color) {
    style += 'DIV#' + pcID + '.c3 path,'
    style += 'DIV#' + pcID + '.c3 line {stroke: ' + h.config.color + ';}';
    style += 'DIV#' + pcID + ' g.tick text {'
           + 'stroke: ' + h.config.color + ';}';
  }
  if(h.config.ticks==false)
    style += 'DIV#' + pcID + ' g.tick line {opacity:0;}';

  style += 'DIV#' + pcID + ' table.c3-tooltip td {color: #888;}';
  style += '</style>';
  $(style).appendTo("body");

  var data = {x: "x",
       xFormat:"%Y-%m-%dT%H:%M:%S%Z",
       xurl: h.URL,
       type: ((h.config.type)?h.config.type:"line"),
       types: types,
       groups: groups,
       axes: axes,
       names: names,
       colors: colors,
       onclick: fnOnClick
     };
  if(phConfig.data){
    jQuery.extend(true,data,phConfig.data);
  }

  var pie = {
    onclick: fnOnClick
  };
  if(phConfig.pie){
    jQuery.extend(true,pie,phConfig.pie);
  }
  
  var gauge = {};
  if(phConfig.gauge){
    jQuery.extend(true,gauge,phConfig.gauge);
  }
  if(phConfig.gaugecolor){
    jQuery.extend(true,color,phConfig.gaugecolor);
  } 
    
  var lcC3={
       onrendered: bind(h,function() {
         var lhChart=d3.select('#' + this.cID + ' svg');
         var lcTextAnchor,liX;
         if(this.data.titlePosition=="left") {
           lcTextAnchor='left';
           liX=0;
         } else {
           lcTextAnchor='middle';
           liX=this.hObject.width() / 2;
         }
         var lcColor=this.config.color;
         var lhTitle = lhChart.select('.title.text');
         if (lhTitle.size() == 0)
           lhTitle = lhChart
             .append('text')
             .attr('x', liX)
             .attr('y', 16)
             .attr('text-anchor', lcTextAnchor)
             .attr('class','title text' + (this.config.link?' anchor':''))
             .text(this.data.title);

         if(lbRefresh) {
           lhRefresh = lhChart.select('.title.refresh_button');
           if (lhRefresh.size() == 0)
             lhRefresh=lhChart
               .append('text')
               .attr('x', this.width - 16)
               .attr('y', 16)
               .attr('text-anchor', 'left')
               .attr('class','title fonticon refresh_button')
               .text(')') /* refresh symbol */
               .on('click',bind(this,function(d) {
                 Coins.chartload(this);
               }));
         }

         if(lcColor){
           lhTitle.style('stroke',lcColor);
           if(lbRefresh)
           lhRefresh.style('stroke',lcColor);
         }
         if(this.config.rect && this.config.rect.css){
           $('DIV#' + this.cID + ' rect.c3-zoom-rect')
             .css(this.config.rect.css);
         }

       }),
     size: {
       height: liHeight,
       width: liWidth
     },
     bindto: '#' + h.cID,
     padding: padding,
     color:color,
     data: data,
     zoom: phConfig.zoom,
     subchart: phConfig.subchart,
     pie: pie,
     gauge: gauge,
     legend: legend,
     axis: axis,
     grid: grid,
     tooltip: tooltip
  }
  
  $.ajax({
            type:"get",
            url:h.URL,
            error: function(pcText) {
              console.log('AJAX Failure',pcText);
            },
            success: bind(h,function(pcText) {
             if(pcText.rows) {
               lcC3.data.rows=pcText.rows;
               this.meta=pcText.meta;
             }
             else {
               lcC3.data.rows=[];
             }
             this.chart = c3.generate(lcC3);
            })
          });

}

Coins.chartload=function(phChart) {
  $.ajax({
            type:"get",
            url:phChart.URL,
            error: function(pcText) {
              console.log('AJAX Failure',pcText);
            },
            success: bind(phChart,function(pcText) {
             this.meta=pcText.meta;
             this.chart.load(pcText);
            })
          });
}

Coins.chartrefresh = function(pcID) {
  if(!hMessageWindow.dhtmlx.message.pull["loginExpired"]) {
  for (i=0;i<Coins.charts.length;i++) {
    lhChart=Coins.charts[i];
    if(pcID==null || lhChart.cID==pcID) {
      Coins.chartload(lhChart);
    }
  }
  }
}

Coins.chartseturl = function(pcID,pcSet) {
  if(!hMessageWindow.dhtmlx.message.pull["loginExpired"]) {
  for (i=0;i<Coins.charts.length;i++) {
    lhChart=Coins.charts[i];
    if(lhChart.cID==pcID) {
      lhChart.URL=setParam(lhChart.URL,pcSet);
      return lhChart;
    }
  }
  }
}
Coins.getchart = function(pcID) {
  for (i=0;i<Coins.charts.length;i++) {
    lhChart=Coins.charts[i];
    if(lhChart.cID==pcID) {
      return lhChart;
    }
  }
}

Coins.table = function(pcID,pcURL,phData,phConfig) {
  var i=0;

  lhObject = jQuery('#' + pcID);
  if(lhObject.length==0) return;

  if(lhObject.width()!=0) {
    lhObject.css('width',lhObject.width() + 'px')
  }

  h=Coins.tables[Coins.tables.length]={};
  h.cID=pcID;
  h.URL=pcURL;
  h.hObject = lhObject;
  h.data = phData;
  h.config = phConfig;

  lColumns = new Array;

  for (i=0;i<h.data.labels.length;i++) {
    lColumns[i] = {};
    lColumns[i].title = h.data.labels[i];
    lColumns[i].class = 'dt-body-' + h.data.aligns[i];
  }

  liHeight=parseInt(lhObject.get()[0].style.height);
  liWidth=parseInt(lhObject.get()[0].style.width);

  if (liHeight==0 || isNaN(liHeight)) {
    liHeight = lhObject.parent().parent().height();
    lhObject.parent().children().first().find('*').each(function() {
      liHeight = liHeight - $(this).height();
    });
  }
  if(liWidth==0 || isNaN(liWidth)) {
    liWidth = lhObject.parent().parent().width();
  }
  h.width=liWidth;
  h.height=liHeight;
  
  h.table = $('#' + pcID)
     .on('preXhr.dt', function ( e, settings, data ) {
       /* fixes IE header height issue */
       $('table.dataTable').css('height','15px');
     } )
     .DataTable( {
     "ajax": ((h.config.initData==false)?'':h.URL),
     "scrollY": (liHeight - 60) + 'px',
     "paging": false,
     "columns":lColumns
  });

  if(bNewDesktop) {
    var liScrollHeight=liHeight - 20
    - $('#' + pcID + '_wrapper div.dataTables_scrollHead').height()
    - $('#' + pcID + '_wrapper div.dataTables_info').height();

    $('#' + pcID + '_wrapper div.dataTables_scrollBody')
    .css('max-height',liScrollHeight)
    .css('min-height',liScrollHeight);
  }

}

Coins.tablerefresh = function(pcID) {
  if(!hMessageWindow.dhtmlx.message.pull["loginExpired"]) {
  for (i=0;i<Coins.tables.length;i++) {
    lhTable=Coins.tables[i];
    if(pcID==null || lhTable.cID==pcID) {
      lhTable.table.ajax.url(lhTable.URL).load();
    }
  }
  }
}

Coins.tableadjust = function(pcID) {
  for (i=0;i<Coins.tables.length;i++) {
    lhTable=Coins.tables[i];
    if(pcID==null || lhTable.cID==pcID) {
      lhTable.table.columns.adjust();
    }
  }
}

Coins.tableseturl = function(pcID,pcSet) {
  if(!hMessageWindow.dhtmlx.message.pull["loginExpired"]) {
  for (i=0;i<Coins.tables.length;i++) {
    lhTable=Coins.tables[i];
    if(lhTable.cID==pcID) {
      lhTable.URL=setParam(lhTable.URL,pcSet);
      return lhTable;
    }
  }
  }
}
