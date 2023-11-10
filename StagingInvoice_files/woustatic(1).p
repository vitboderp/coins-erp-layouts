/* wocoins.css */

/* THEME=#4a4a4a */

body{
    font-family: 'Lato', Helvetica, Arial, sans-serif;
}
div.desktopheader {
    width: 99.9%;
    height: auto;
    background-color: #FFF;
    padding: 0px;
}

div.headerinner {
    width: 100%;
    height: auto;
    background-color: #FFF;
}

div.logo{
    padding: 4px 0px 0px 0px;
    float: left;
}

div.logo a{
        color: transparent;
}

div.logo img{
/* Desktop logo  wasn't sizing correctly in IE */
        height: 53px;
}

div.headerright {
    float: right;
    margin-top: 3px;
}

div.headerleft {
    padding-left: 0.9em;
    float: left;
}

div.desktopheader div.tab a{
    font-size: 1.5em;
        font-weight: 300;
}

div.desktopheader div.tab.on a{
        font-weight: 600;
}

div.navmenu ul.isuserrole li{
/* Move the tabs up a bit if there's a Desktop Selector above them */
        margin-top: -10px;
}

div.navmenu ul li.on a, .navmenu ul li:hover a {
font-weight: bold;
    border-bottom-color: #F47320;
    -webkit-transition: border-color .1s;
    -moz-transition: border-color .1s;
    -o-transition: border-color .1s;
    -ms-transition: border-color .1s;
    transition: border-color .1s;
}

div.navmenu ul li a {
    display: block;
    font-size: 1.0em;
    height: 40px;
    text-decoration: none;
    color: #333;
    text-transform: none;
    font-weight: 300;
    xborder-bottom: 3px solid #CCC;    
    -webkit-transition: border-color .4s;
    -moz-transition: border-color .4s;
    -o-transition: border-color .4s;
    -ms-transition: border-color .4s;
    transition: border-color .4s;
}
*/

div#statusLine{
    overflow: auto;
    height: 27px;
}

/*
body.medium div.navmenu ul li a, body.small div.navmenu ul li a {
    font-size: 14px;
    padding: 0 10px;
}
*/

/* user banner size from coins.css
div.accountimage {
    width: 53px;
    height: 53px;
    margin: 4px 0px 0 0;
    float: right;
    border-radius: 30px;
    background-size: cover;
    margin-right: 3em;
}

p.companyname {
    font-family: 'Lato';
    font-size: 1.4em;
    font-weight: 300;
    margin: 21px 20px 10px 0px;
}

p.accountname {
    font-size: 2em;
    color: #333;
    font-weight: 300;
    float: right;
    margin: 19px 20px 16px 0px;
}

p.accountname a {
    color: #333;
    text-decoration: none;
}

body.medium p.accountname, body.small p.accountname {
    font-size: 19px;
}
*/
/* end copied-to-coins.css*/

div.desktop {
    min-width: 540px;
    background-color: #F4F4F4;
    background-size: cover;
    padding: 25px;
}

div.sitemiddleinner {
    display: none
}
div.sitemiddleinner.open {
    display: inline
}

div#searchHeader {
  display:inline;
}

div#searchHeader table{
        padding: 1em;
        padding-bottom: 0em;
}

input.search#globalSearch {
    border-radius: 3px;
    border: solid 1px #BBBBBB;
    font-family: 'Lato', Arial, sans-serif;
    font-weight: 500;
    font-size: 1em;
    outline: 0;
    display: table-cell;
    padding: 0px 0.5em;
    width:100%;
}

div#searchType {
    border-radius: 3px;
    border: solid 1px #BBBBBB;
    min-height: 23px;
    display: table-cell;
    padding: 0.5em;
    float:right;
}

div#searchSort {
    background-image: url(/coins/devstage/20231027115302/skin/v1105/images/select-arrow.png);
    background-position: 95px;
    background-repeat: no-repeat;
}

div#searchType button, div#searchSort button{
    border: none;
}

select#searchType, select#searchSort {
    font-family: 'Lato';
    font-size: 1em;
    font-weight: 400;
    border: solid #BBBBBB 1px;
    height: 37px;
}

select#searchSort {
    border-radius: 3px;
    background-color: transparent;
    -webkit-appearance: none;
    -moz-appearance: none;
    padding-left: 10px;
    width: 110px;
}

select#searchSort:focus {
    background-color: transparent;        
    background-image: none;
}

select#searchType::-ms-expand, select#searchSort::-ms-expand{
    background-color: transparent;
    display: none;
/* To hide the box round the selector arrow in IE. */
}

a.ui-multiselect-all, a.ui-multiselect-none {
  font-weight: normal;
}

ul.ui-multiselect-checkboxes li {
  margin-bottom: 0px;
}

ul.ui-multiselect-checkboxes li label.ui-state-hover{
  background: #DADADA;
}

.ui-multiselect-menu {
  z-index: 200;
}

.ui-multiselect-menu li label{
        border-radius: 0px;
}

ul.ui-multiselect-checkboxes li label.ui-state-hover{
        background-color: #EEEEEE;
        border-color: #EEEEEE;
}

.ui-multiselect.ui-state-default:hover {
    background-color: white;
}

div#searchDialog{
        padding: 0px;
}

div#searchResults {
  display:flex;
  margin-top: 1em;
  margin-bottom: 1em;

/* Firefox v3.6+ */
/*background-image:-moz-linear-gradient(rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 99%); */
/* safari v4.0+ and by Chrome v3.0+ */
/* background-image:-webkit-gradient(linear,color-stop(0, rgba(0,0,0,0.06)),color-stop(0.99, rgba(0,0,0,0)));
/* Chrome v10.0+ and by safari nightly build*/
/* background-image:-webkit-linear-gradient(rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 99%);
/* Opera v11.10+ */
/*background-image:-o-linear-gradient(rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 99%);
/* IE v10+ */
/*background-image:-ms-linear-gradient(rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 99%);
background-image:linear-gradient(rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 99%);
-ms-filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#f000000,endColorstr=#0000000)";
filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#f000000,endColorstr=#0000000);
*/
/* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#000000+0,000000+19,000000+100&0.06+0,0.06+19,0+100 */
background: -moz-linear-gradient(top,  rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 10%, rgba(0,0,0,0) 100%); /* FF3.6-15 */
background: -webkit-linear-gradient(top,  rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 10%,rgba(0,0,0,0) 100%); /* Chrome10-25,Safari5.1-6 */
background: linear-gradient(to bottom,  rgba(0,0,0,0.06) 0%,rgba(0,0,0,0) 10%,rgba(0,0,0,0) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */

}

div#searchList {
  width:60%;
  height:480px;
  overflow:auto;
}


div#searchType button,
/*div#searchType table,*/
.resultrow table,
div#searchDetail table,
table#globalsearchlist,
div.ui-widget-content .ui-multiselect-checkboxes li,
div.ui-widget-content .ui-multiselect-checkboxes .ui-state-hover,
a.ui-multiselect-all span, a.ui-multiselect-none span{
        font-family: 'Lato', Arial, sans-serif;
        font-weight: 400;
        font-size: 1em;
}


div#searchDetail {
  width:40%;
  height:480px;
  z-index:1;
  overflow:auto;
}

div#searchDetail div.formcontainer,
div#searchDetail td.formblock{
        background-color: transparent;
}

div#searchDetail td.formbg{
    border: none;
}

div#searchDetail td.formbg tr#bodyHead th{
    background-color: #4a4a4a;
    background-image: none;
    color: #ffffff;
    border-color: #4a4a4a;
    padding: 0.5em;
}

div#searchDetail td.formbg td{
    padding: 0.5em;
}

tr.resultrow a:hover{
/* Results link in search box had an orange underline in IE! */
        color: #333333;
}


table#globalsearchlist {
  width:100%;
  border:0px;
}
tr.highlight {
  background: #F3F3F3;
    background-color: #EEEEEE;
}

tr.resultrow {
  height:32px;
}
tr.resultrow td.resulticon {
  width:24px;
}
tr.resultrow td.resulticon img{
        width: 24px;
        height: 24px;
}

div.headerright input.search {
    border-radius: 1.5em;
    border: solid 1px #BBBBBB;
    font-family: 'Lato';
    font-weight: 300;
    font-size: 1.1em;
    margin: 1.1em 1em 0.9em 0em;
    outline: 0;
    padding: 0.5em;
    padding-left: 0.8em;
    padding-top: 0.6em;
    width: 200px;
}

div.headerright input.search.open{
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    border-color: #819FD3;
    border-bottom-color: white;
}

div.headerright div#companyCombo {
    border-radius: 1.5em;
    border: solid 1px #BBBBBB;
    height: 1.7em;
    margin: 1.2em 2.0em 0.9em 0em;
    padding: 0.4em;
    width: 200px;
}

div.headerright select#companySelector {
    font-family: 'Lato-Selector';
    font-size: 1.1em;
    font-weight: 300;
    border: none;
    width: 185px;
}

div.headerright select#companySelector::-ms-expand{
    border: none;
    background-color: transparent;
/* To hide the box round the selector arrow in IE. */
}

div.taskbarheader:hover {
    background-color: #E2E2E2;
    -webkit-transition: background-color .1s;
    -moz-transition: background-color .1s;
    -o-transition: background-color .1s;
    -ms-transition: background-color .1s;
    transition: background-color .1s;
}

div.taskbarheader {
    width: 100%;
    background-color: #FFF;
    height: 45px;    
    cursor: pointer;
    border-bottom: 1px solid #E1E1E1;
    -webkit-border-top-left-radius: 7px;
    -webkit-border-top-right-radius: 7px;
    -moz-border-radius-topleft: 7px;
    -moz-border-radius-topright: 7px;
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
    -webkit-transition: background-color .4s;
    -moz-transition: background-color .4s;
    -o-transition: background-color .4s;
    -ms-transition: background-color .4s;
    transition: background-color .4s;
}

div.taskbarheader h2 {
    font-size: 1.7em;
    color: #333;
    text-transform: none;
    font-weight: 300;    
    line-height: 45px;
}

div.taskbarbtn {
    width: 35px;
    height: 35px;
    background-position: center 3px;
    background-repeat: no-repeat;
    float: left;
    background-image: url(/coins/devstage/20231027115302/skin/v1105/images/menu_closed.svg);
}

div.taskbar.open div.taskbarbtn {
    background-image: url(/coins/devstage/20231027115302/skin/v1105/images/menu_open.svg);
}

div.taskbarinner {
    padding: 28px;
    background-color: rgba(256,256,256, 1);
    overflow: auto;
}

div.taskbarinner.transparent{
    background-color: rgba(256,256,256,0.8);
}

div.taskbar {
  overflow:hidden;
}
div.taskbar div.taskbarinnerwrapper {
}
div.taskbar.open div.taskbarinnerwrapper {
    display: inline;
}

div.box {
    background-color: #FFF;
    border-radius: 7px;
    -moz-border-radius: 7px;
    -webkit-border-radius: 7px;
    border: 1px solid transparent;
    float: left;
    height: 200px;
    margin: 5px;
    padding: 15px;
    position: relative;
    width: 200px;
}

div.box a {
    text-decoration: none;
}

div.box div.boxinner {
    width: 100%;
    height: 200px;
    display: table;
    background-size: 25%;
    background-position:    bottom right;
    background-repeat: no-repeat;
}

div.box div.boxinner a.refresh {
  color: #000;
  position: absolute;
  top: 10px;
  right: 10px;
}

div.box div.boxinner iframe {
  height: 156px;
  border:0px;
}
div.box.small div.boxinner iframe {
  height: 60px;
}
div.box.tall div.boxinner iframe,
div.box.big div.boxinner iframe{
  height: 400px;
}

div.box.info {
  overflow:auto;
}

div.box div.boxheader {
  display: table-row;
  height: 0px;
}
div.box div.boxchart {
  display: table-row;
  height:100%;
}

div.box div.boxinner p {
    color: #000;
    font-size: 18px;
    font-weight: 400;
    line-height: 120%;
}

/* dimmed axis values */
div.box svg g.tick text {
    opacity:0.7; font-size:10px; font-weight:300;
}

div.box div.boxinner p.name {
/* Function name */
    font-weight: 400;
}

div.box div.boxinner p.type {
/* Module */
    font-weight: 300;
}

/* fix para height for charts */
div.box.fixed div.boxinner p.name {
  height:24px;
  overflow: hidden;
  white-space: nowrap;
  width: 100%; 
}
div.box.fixed div.boxinner p.type {
  height:24px;
}

div.box div.boxinner p.value {
/* Variable content */
    font-size: 14px;
    font-weight: 300;
    text-align: center;
    padding: 20px 0px;
}

p.value span.value.single{
    font-weight: bold;
    font-size: 2em;
}

p.value span.label.single{
    font-size: 1em;
    border-top:3px solid transparent;
    position:relative;
    top:5px;
}

div.box div.boxinner p.value big{
    font-weight: 400;
}

div.box.small div.boxinner p {
    font-size: 1.2em;
}

div.box.small div.boxinner p.type{
    font-size: 1.3em;
}

div.box.small div.boxinner p.value{
    margin-top: 6px;
}
div.box.small {
    width: 93px;
    height: 93px;
    padding: 8px;
}
div.box.small div.boxinner {
    height: 93px;
}
div.box.tall div.boxinner,
div.box.big div.boxinner {
    height: 444px;
}

div.box.small p.value span.value.single{
        font-weight: normal;
        font-size: 1.5em;
}

div.box.wide {
    width: 442px;
    height: 200px;
}

div.box.tall {
  width: 200px;
  height: 442px;
}
div.box.big {
  width: 442px;
  height: 442px;
}
div.box.full {
  width: 97%;
  height: auto;
}
div.box.half {
  width: 46%;
  height: auto;
}

div.box.wide table, div.box.wide p,
div.box.wide table.dataTable thead th, div.box.wide table.dataTable tfoot
{
    font-family: 'Lato';
    font-weight: 400;
}

div.icon-image, div.icon-font{
    height: 80px;
    width: 90px;
    position: absolute;
    top: 135px;
    left: 125px;
    text-align: center;
        opacity: 0.7;
}
div.icon-image img{
    border: transparent;
}

div.small div.icon-image, div.small div.icon-font{
    height: 25px;
    width: 25px;
    top: 75px;
    left: 75px;
}

div.wide div.icon-image, div.wide div.icon-font{
    left: 367px;
}

div.big div.icon-image, div.big div.icon-font{
        left:367px;
        top: 377px;
}

div.tall div.icon-image, div.tall div.icon-font{
        top: 377px;
}

div.icon-image img{
    height: 72px;
    width: 72px;
    margin-left: 8px;
}
div.icon-font{
    font-size: 72px;
    color: black;
}

div.small div.icon-image img{
    height: 24px;
    width: 24px;
}
div.box.small div.boxinner p.value{
    padding: 0px;
    text-align: left;
}

div.box.small div.boxinner span.value{
    background-color: transparent;
    padding: 3px 2px 1px 2px;
    border: solid 1px transparent;
    border-radius: 5px;
}

div.box.small div.boxinner span.value:hover{
    background-color: rgba(255,255,255,0.3);
    border-color: rgba(255,255,255,0.3);
    font-weight: 500;
}


/* Trying to get Search box to overlay search results */
div#popupList{
        z-index: 9999;
        opacity: .99;
}
div.headerright input.search{
        z-index: 400;
}

/* Screens in frames */
body.desktopframe div.ui-layout-pane{
        border: none;
}

/* div.ui-layout-resizer-west-open{
    background-image: 
     url(wousvg.p?style=v1105&icon=slider_top$.svg&colour=%234a4a4a);
        background-repeat: no-repeat;
        background-position: top left;
        background-size: 5px 42px;
} */

body.documentation div.ui-layout-resizer-west-open{
        background-image: none;
}

/*div.ui-layout-resizer-west-open{
    opacity: 1;
    -webkit-box-shadow: -17px 21px 25px 0px rgba(0,0,0,0.25); 
    -moz-box-shadow: -17px 21px 25px 0px rgba(0,0,0,0.25); 
    box-shadow: -17px 21px 25px 0px rgba(0,0,0,0.25);
}
/* original
div.ui-layout-resizer-west-open{
        opacity: 1;
        -webkit-box-shadow: -20px 10px 26px 0px rgba(100,100,100,0.5); 
        -moz-box-shadow: -20px 10px 26px 0px rgba(100,100,100,0.5); 
        box-shadow: -20px 10px 26px 0px rgba(100,100,100,0.5);
}
*/

div.ui-layout-resizer-west-sliding{
    opacity: 1;
    -webkit-box-shadow: 7px 21px 25px 0px rgba(0,0,0,0.25); 
    -moz-box-shadow: 7px 21px 25px 0px rgba(0,0,0,0.25); 
    box-shadow: 7px 21px 25px 0px rgba(0,0,0,0.25);
}
/* Chris's example: 7px 21px 110px 0px */

/* original 
div.ui-layout-resizer-west-sliding{
        opacity: 1;
        -webkit-box-shadow: 20px 10px 26px 0px rgba(100,100,100,0.5); 
        -moz-box-shadow: 20px 10px 26px 0px rgba(100,100,100,0.5); 
        box-shadow: 20px 10px 26px 0px rgba(100,100,100,0.5);
}
*/

/* new desktop */
section.desktop.ui-layout-pane {
  border: none;
  padding: 0px;
}


/*
div#treeView{
        background: -webkit-linear-gradient(left, rgba(255,255,255,1)0%, rgba(255,255,255,1) 70%, rgba(194,194,194,0.54)100%);
    background: -o-linear-gradient(left, rgba(255,255,255,1)0%, rgba(255,255,255,1) 70%, rgba(194,194,194,0.54)100%);
    background: linear-gradient(to right, rgba(255,255,255,1)0%, rgba(255,255,255,1) 70%, rgba(194,194,194,0.54)100%);
}
*/

body.desktopframe div#helpframe{
        border:1px solid #A8A8A8;
}

body.desktopframe td.buttonbar{
        background-image:none;
        background-color:transparent;
}

body.desktopframe div#helpframe table.title{
        padding: 0.5em 0em 0em 0.5em;
}


/* Tiles */
div.box {
    -webkit-border-radius: 3px;
    border-radius: 3px;
}

.ui-dialog{
    border-radius: 0px;
    padding:0px;
    -webkit-box-shadow: 10px 10px 26px 0px rgba(207,201,207,1); -moz-box-shadow: 10px 10px 26px 0px rgba(207,201,207,1); box-shadow: 10px 10px 26px 0px rgba(207,201,207,1);
}

div.ui-dialog-content iframe{
        border: none;
}

div#tileDialog input,
div#tileDialog select{
        font-size: 1em;
        font-family: Lato, Helvetica, Arial, sans-serif;
}

div#tileDialog label{
        vertical-align: 0px;
}

div.ui-widget-header{
        border: none;
        background-color: white;
        background-image: none;
}

.ui-dialog-titlebar{
    border-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
    overflow: hidden;

}

div#dialog-extend-fixed-container div.ui-dialog-titlebar{
                /*border-bottom-left-radius: 9px;
                border-bottom-right-radius: 9px;*/
}

span.ui-dialog-title{
        font-family: 'Lato', Arial, sans-serif;
        font-weight: 300;
        font-size: 1.2em;
        white-space: nowrap;
}



div#dialog-extend-fixed-container{
  /* "My Frames" menu */
    background-color: white;
    border: none;
    border-radius: 0px;
    position: fixed; 
    width: 302px;
    z-index: 9990;
    padding: 0px;
    -webkit-box-shadow: 10px 10px 26px 0px rgba(207,201,207,1); -moz-box-shadow: 10px 10px 26px 0px rgba(207,201,207,1); box-shadow: 10px 10px 26px 0px rgba(207,201,207,1);
}

div#dialog-extend-fixed-container.hide{
    border: none;
}

div#dialog-extend-fixed-container div.ui-dialog-titlebar-buttonpane{
        padding-right: 3px;
        /* To reduce the space on the right when the tiles show in the tiles "menu" */
}


/* Zoom of minimize bar */

div#dialog-extend-fixed-container.show{
        transform: scaleY(1);
        transform-origin: 0% 100%;
        -webkit-transform: scaleY(1);
        -webkit-transform-origin: 0% 100%;
        -moz-transform: scaleY(1);
        -moz-transform-origin: 0% 100%;
        -o-transform: scaleY(1);
        -o-transform-origin: 0% 100%;
        -ms-transform: scaleY(1);
        -ms-transform-origin: 0% 100%;
        opacity:1;
}

div#dialog-extend-fixed-container.hide{
        margin: 0; 
        border: 0 ;
        transform: scaleY(0.01);
        transform-origin: 0% 100%;
        -webkit-transform: scaleY(0.01);
        -webkit-transform-origin: 0% 100%;
        -moz-transform: scaleY(0.01);
        -moz-transform-origin: 0% 100%;
        -o-transform: scaleY(0.01);
        -o-transform-origin: 0% 100%;
        -ms-transform: scaleY(0.01)
        -ms-transform-origin: 0% 100%;
        opacity:0;
}
/* End: Zoom of minimize bar */



div#dialog-extend-fixed-container div.ui-dialog{
        border-radius: 3px;
        box-shadow: none;
border-radius: 0px;
}
div#dialog-extend-fixed-container div.ui-dialog-titlebar{
        padding: 5px 1em;
        border-radius: 3px;
border-radius: 0px;
}

div#dialog-extend-fixed-container div span.ui-dialog-title{

}

a.ui-dialog-titlebar-hidemin{
        width: 19px;
        height: 18px;
}

div#dialog-extend-fixed-container a.ui-dialog-titlebar-hidemin{
        display: none;
}

div.cover {
     position: absolute;
     left: 0;
     top: 0;
     background: #000;
}

div.box td.formblock {
  background-color: transparent;
}

/* detail pages */
td.desktopdata1,
td.desktopbutton1{
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 300 ;
    font-size:1.2em;
    background:transparent;
    line-height: 1.2;
    padding-left:3px;
    padding-bottom:1px;
    padding-right:6px;
}

td.desktopdata2,
td.desktopbutton2{
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 300 ;
    font-size:16px;
    background:transparent;
    line-height: 1.2;
    padding-left:3px;
    padding-bottom:1px;
    padding-right:6px;
}

td.desktoplabel1 {
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 400 ;
    font-size:1.2em;
    background:transparent;
    line-height: 1.2;
    padding-left:3px;
    padding-bottom:1px;
    padding-right:6px;
}

td.desktoplabel2 {
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 400 ;
    font-size:17px;
    background:transparent;
    line-height: 1.2;
    padding-left:3px;
    padding-bottom:1px;
    padding-right:6px;
}

td.desktopnumber1 {
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 400 ;
    font-size:1.8em;
    background:transparent;
    line-height: 0.9;
    padding-left:3px;
    padding-bottom:0px;
    padding-right:6px
}

td.desktopnumber2 {
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 400 ;
    font-size:27px;
    background:transparent;
    line-height: 0.9;
    padding-left:3px;
    padding-bottom:0px;
    padding-right:6px;
}

td.desktoplink1 {
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 400 ;
    font-size:1.2em;
    background:transparent;
    line-height: 1.2;
    padding-left:3px;
    padding-bottom:1px;
    padding-right:6px;
}

td.desktoplink2 {
    font-family: 'Lato', Calibri, Arial, sans-serif;
    font-weight: 400 ;
    font-size:17px;
    background:transparent;
    line-height: 1.2;
    padding-left:3px;
    padding-bottom:1px;
    padding-right:6px;
}

td.desktoplink1 a,
td.desktoplink2 a{
    border: none;
    color:#ffffff;
}

td.desktoplink1 a:hover,
td.desktoplink2 a:hover{
    border-bottom: solid 1px;
}

td.desktopbutton1 button:hover,
td.desktopbutton2 button:hover{
    background-color: rgba(255,255,255,0.3);
    cursor:pointer;
    border: solid 1px rgba(255,255,255,0.3);
    border-radius: 5px;
}

td.desktopbutton1,
td.desktopbutton2{
    position: absolute;
    top: 70px;
    left: 70px;
}

div.circular {
  overflow: hidden;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  -ms-border-radius: 50%;
  -o-border-radius: 50%;
  border-radius: 50%;
}

div.circular img{
  width:100%;
}

button.coinsok, button.coinsdelete, button.coinscancel{
    color: #FFF !important;
    border-width: 1px !important;
    border-style: solid !important;
    /*border-color: #ffffff !important;*/
    border-color: #dfdfdf #bfbfbf #bfbfbf #dfdfdf;

        font-family: Lato !important;
    font-weight: 400 !important;
    padding-left: 6px;
    padding-top: 0px;
    margin: 0px 1px 0px 1px !important;
}

button.coinsok {
    color: #87d37c !important;
}

button.coinscancel {
    color:  #FFC107 !important;
}

button.coinsdelete {
    color: #f87878 !important;
}
        
button.coinsok:focus, button.coinsdelete:focus, button.coinscancel:focus{
    outline: none;
    border-color: #4a4a4a !important;
}

div.boxchart input[type='search']{
        border-radius: 15px; 
        border: 1px solid #BBBBBB; 
        height: 2em; 
        padding-left: 5px; 
        margin-bottom: 3px;
}

table.dataTable{
        font-family: 'Lato';
}

table.dataTable thead th{
        color: #000000;
        border-top: none;
        border-right: none;
        border-left: none;
        padding-bottom: 6px;
}

table.display.dataTable tr.odd,
table.display.dataTable tr.even{
        background-color: #FFFFFF;
}

div.nav-header a {
    text-decoration:none;
    color: #787878;
}

/* Unifying standard focus outline across all browsers */
:focus {
  outline: 1px dotted #212121;
}
::-moz-focus-inner {
   border: 0;
}
