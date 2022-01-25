console.log('main js');


var chartColors = ['#5f86b7', '#9ecbf4', '#074d65', '#efbba2', '#6f1f17', '#fd8992', '#b70d61', '#1eafae'];

var chart = c3.generate({
    bindto: '#line-chart-example',
    data: {
      x: 'x',
      columns: [
        ['x', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        ['Forecast', 50, 80, 60, 120, 160, 100, 140, 120, 200, 120, 80, 80],
        ['Actual', 30, 60, 40, 90, 120, 80, 100, 140, 180, 100, 60, 120],
      ],
      type: 'line',
    },
    color: {
      pattern: chartColors
    },
    axis: {
      y: {
        padding: {bottom: 10},
        tick: {
          outer: false,
        },
        min: 0
      },
      x: {
        type: 'category',
        tick: {
          outer: false
        }
      }
    },
    grid: {
      y: {
        show: true
      }
    },
    point: {
      r: 3
    },
    padding: {
      bottom: 20,
    },
    size: {
        height: 240
    }
  });
  
        


        
var chart = c3.generate({
    // Build in this container
    bindto: '#bar-chart-example',
    // Data
    data: {
      x: 'x',
      columns: [
        ['x', 'Logged', 'Approved'],
        ['Est. Cost', 100, 20],
        ['Est. Value', 50, 50],
        ['App Cost', 50, 75],
        ['App Value', 75, 35]
      ],
      // Chart type
      type: 'bar',
    },
    // Customization
    // Set colors
    color: {
      pattern: chartColors,
    },
    bar: {
      width: {
        ratio: 0.5
      },
      space: 0.1
    },
    axis: {
      y: {
        padding: {bottom: 10},
        tick: {
          outer: false,
        },
        min: 0
      },
      x: {
        type: 'category',
        tick: {
          outer: false
        }
      }
    },
    padding: {
        bottom: 20
    },
    // Show horizontal lines
    grid: {
      y: {
        show: true
      }
    },
    size: {
        height: 240
    }
  });



        
var chart = c3.generate({
  bindto: '#spline-chart-example',
  data: {
    x: 'x',
    columns: [
      ['x', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      ['Forecast', 50, 80, 60, 120, 160, 100, 140, 120, 200, 120, 80, 80],
      ['Actual', 30, 60, 40, 90, 120, 80, 100, 140, 180, 100, 60, 120],
    ],
    type: 'spline',
  },
  color: {
    pattern: chartColors
  },
  axis: {
    y: {
      padding: {bottom: 10},
      tick: {
        outer: false,
      },
      min: 0
    },
    x: {
      type: 'category',
      tick: {
        outer: false
      }
    }
  },
  grid: {
    y: {
      show: true
    }
  },
  point: {
    r: 3
  },
  padding: {
    bottom: 20
  },
  size: {
    height: 240
  }
});

      
    



// ACCORDION
var acc = document.getElementsByClassName("cds-accordion__head");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("is-active");
    var panel = this.nextElementSibling;
    panel.classList.toggle("is-active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

var openAccordion = document.querySelectorAll(".defaultOpenAccordion"); 

for (i = 0; i < openAccordion.length; ++i) {
  openAccordion[i].click();
};
// END ACCORDION


// TABS
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("cds-tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("cds-tabs__btn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" is-active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " is-active";
}

document.getElementById("defaultTab").click();
// END TABS