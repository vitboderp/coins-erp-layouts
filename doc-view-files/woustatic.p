/* COINS Stylesheet

*/








/* New shadow */







/* setup variables for use in other css files */
:root {
  --theme-main-color: #4a4a4a;
  --theme-lighter-color: rgba(66,73,88,0.1);
  --theme-light-color: #4a4a4a;          
}

/*******************/
/* Standard Styles */
/*******************/
html.mainarea {
        width: 99.9%;
        height: 100%;
}

.ui-layout-west{
}

iframe {
    padding:    0 !important; /* iframes should not have padding */
    overflow:   auto !important;
    display:    block;
}
 
.ui-layout-centre {
    padding:    0;    /* south pane is an iframe-container, so remove padding */
}

.inner-layout-centre {
    padding:    0;    /* south pane is an iframe-container, so remove padding */
    overflow: hidden;
}

body{font-size: 12px;}
input,textarea{font-size: 100%}

body, input, select, textarea{
/* I took "table" out of this list to fix problem with desktop tiles (RF6870).
Has it broken anything else? */
    font-family: Lato, Helvetica, Arial, Verdana, Geneva, sans-serif;
    color: #2a2a2a; 
} 
div.font {
  font-family: Lato, Helvetica, Arial, Verdana, Geneva, sans-serif;
}

INPUT, TEXTAREA,
INPUT [type='password']{
    background-position:50%;
    background-repeat:repeat-x;
    border: 1px solid #DFDFDF;
    font-weight: bold;
/* Added to 'standardise' padding in Chrome across Win/Mac */
padding-left: 1px;
padding-right: 1px;
/* SELECTORs and INPUTs of the same width weren't lining up */

}
INPUT:not([type='checkbox']){
    height: 18px;
    text-indent: .1em;
    line-height: 20px;
}

INPUT:hover, TEXTAREA:hover{
    background-color: #EEEEEE;
}

input[type='checkbox'] {
/* Restyle checkbox in Chrome - doesn't do anything in IE */
    -webkit-appearance: none;
    margin: 3px 6px 3px 6px;
    border: 1px solid #DFDFDF;
    width: 14px;
    height: 14px;
    cursor: pointer;
    background-color: #FFFFFF;
    background-image: url(wousvg.p?style=v1105&icon=checkbox_tick$.svg&colour=%23ffffff);
    background-position: 50% -300%;
    background-repeat: no-repeat;
    -webkit-transition: background-position .1s, background-color .1s;
    -moz-transition   : background-position .1s, background-color .1s;
    -o-transition     : background-position .1s, background-color .1s;
    -ms-transition    : background-position .1s, background-color .1s;
    transition        : background-position .1s, background-color .1s;
    vertical-align: text-bottom;
}

input[type='checkbox']:active,
input[type='checkbox']:focus {
    outline: 0;
    border-color: #4a4a4a;
}

input[type='checkbox']:checked{
    background-color: #4a4a4a;
    border-color: #4a4a4a;
    background-position: 50% 50%;
}
input[type='checkbox'][disabled]{
    background-color: #E4E4E4;
    color: #B0B0B0;
}

input.error + div + label{
/* To add error highlighting on radio buttons */
    border-bottom: 3px solid #E45858; 
}

td.bold, tr.odd td.bold, tr.even td.bold{
    font-weight: 900;
}

/* Scrollbar styling for Chrome and other Webkit browsers; not IE */

::-webkit-scrollbar {
    width: 6px;
    background-color: transparent;
}

::-webkit-scrollbar:horizontal{
    height: 6px;
} 

::-webkit-scrollbar-track {
    background-color: transparent;
}

::-webkit-scrollbar-track-piece{
    background-color: transparent;
}

::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}

::-webkit-scrollbar-corner{
        background-color: transparent;
}

/* Scrollbar styling for IE */
body {
    SCROLLBAR-HIGHLIGHT-color: #4a4a4a;
        scrollbar-track-color: #FFFFFF;
    SCROLLBAR-DARKSHADOW-color: #4a4a4a;
    SCROLLBAR-FACE-color: #EBEBEB;
    scrollbar-arrow-color: #4a4a4a;
}

/* Scrollbar styling for Firefox */
@supports (scrollbar-width: thin) {
  .mainarea, body * {
    scrollbar-color: rgba(0,0,0,0.25) transparent;
    scrollbar-width: thin;
  }
}

/* Unifying standard focus outline across all browsers */
:focus {
  outline: 1px dotted #212121;
}
::-moz-focus-inner {
   border: 0;
}

/**************************/
/* End of Standard Styles */
/**************************/

/* Styles for frames */

        div.systemdialog{
          border-color: #82A0D3;
        }

        .ui-dialog .ui-dialog-titlebar{
                        height: 32px;
                        padding-top: 6px;
                        padding-bottom: 0px;
        }

        .ui-dialog .ui-dialog-titlebar .ui-dialog-title{
                        padding-top: 4px;
        }

        div.systemdialog div.ui-dialog-titlebar{
                        background-color: #4a4a4a;
                        color: #ffffff;
        }

        div.systemconfirm{
                        border-color: #82A0D3;
        }
        div.systemconfirm div.ui-dialog-titlebar{
                        background-color: #4a4a4a;
                        color: #ffffff;
        }
        div.systemconfirm div.ui-widget-content {
          border: 0px;
        }

        div.systemerror{
                        border-color: #F1736A;
        }
        div.systemerror div.ui-dialog-titlebar{
                        background-color: #F1736A;
                        color: #FFFFFF;
        }

        div.systemalert {
          box-shadow: 6px 6px 10px 8px rgba(0,0,0,0.2);    
          border: 0px;
          border-radius: 0px !important;
        }

        div.systemalert div.ui-widget-content {
          border:0px;
        }

        div.systemalert div.ui-dialog-titlebar {
          border-radius: 0px !important;
        }

        div.systemalert div.coinsalert img{
          width: 36px;
          height: 36px;
          padding-right: 16px;
        }
        div.systemalert div.coinsalert table{
          padding-top:20px; 
          padding-left:10px; 
          padding-right:17px;
        }
        div.systemalert div.coinsalert td{
          vertical-align:top;
        }

div#coinslog div.coinsalert img{
  width:24px;
  height:24px;
  vertical-align: middle;
}

div.table-row {
  display: table-row;
}
div.table-cell {
  display: table-cell;
}

/* Frame display buttons */

div.ui-dialog-titlebar-buttonpane{
/* To prevent the title showing through */
        height:25px;
        padding-left:0.5em;
        margin-left:-0.5em;
        height: 24px;
}

div.ui-dialog-titlebar-buttonpane a.ui-dialog-titlebar-close:hover,
div.ui-dialog-titlebar-buttonpane a.ui-state-default:hover{
        border-color: #D3D3D3;
}
div.ui-dialog-titlebar-buttonpane a.ui-state-default{
        margin-right:2px;
}

div.ui-dialog-titlebar-buttonpane a.ui-state-default,
div.ui-dialog-titlebar-buttonpane button.ui-dialog-titlebar-close{
        background-color:transparent;
        background-image: none;
        border-color:transparent;
        padding:0px;
        right: 1em;
}

span.ui-button-icon.ui-icon.ui-icon-close{
/* Added to adjust position of the span in the close button */
        top: 7px;
        left: 7px;
        height: 26px;
        width: 26px;
}

.ui-dialog .ui-dialog-titlebar-buttonpane .ui-icon-close:hover{
        background-color: rgba(225, 225, 225, 0.2);
}

.ui-dialog .ui-dialog-titlebar-buttonpane .ui-icon{
        height: 24px;
        width: 24px;
}

.ui-dialog .ui-dialog-titlebar-buttonpane a.ui-state-default,
.ui-dialog .ui-dialog-titlebar-buttonpane button.ui-state-default{
/* This is only supposed to change the size of the minimize/maximize/close etc
buttons in the title bar of a frame. If other images change, we need to correct this.*/
        height: 24px;
        width: 24px;
        vertical-align: top;
        border-radius: 0px;
}

.ui-dialog .ui-dialog-titlebar-buttonpane a.ui-state-default:hover{
    background-color: rgba(255,255,255,0.2);
        border-color: transparent;
}

.ui-widget{
        font-size: 1em;
}

.ui-widget-overlay {
  opacity: 0.25;
}

.ui-button .ui-button-text{
        display: inline;
}

span.ui-button-text img{
        margin-right: 6px;
}

.ui-dialog .foreground-print-container {
  display: flex;
  justify-content: center;
}

.ui-dialog .foreground-print-spinner {
  text-align: center;
  min-width: 80px;
}

.ui-dialog .foreground-print-msg {
  padding-left: 1em;
}

/********************************/
/* Styles for header and popups */
/********************************/

/* popupList */
div#popupList {
    position: absolute;
    -moz-box-shadow:1px 1px 9px rgba(0,0,0,0.4);-webkit-box-shadow:1px 1px 9px rgba(0,0,0,0.4);box-shadow:1px 1px 9px rgba(0,0,0,0.4);-ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true)";filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true);
}

table.popuplist{
    border-collapse: collapse;
    background-color: #FFFFFF;
    color: #000000;
    font-family: 'Lato', Arial, sans-serif;
    font-size: 1em;
    font-weight: 400;
}

table.popuplist a{
    text-decoration: none;
    color: #2a2a2a;
}

table.popuplist a:hover{
    color: #819FD3;
}

table.popuplist th {
    text-align: left;
    font-size: 1.2em;
    font-weight: 300;
    color: #ffffff;
    background-color: #4a4a4a;
    border-color: #4a4a4a;
    padding: 8px 2px;
}

table.popuplist th img{
        height: 24px;
}
table.popuplist img:hover{
    background-color: #FCFCFC;
    border-radius: 3px;
}

table.popuplist td{
    height: 2.0em;
    height: 29px;
    margin-left: 20px;
    padding-right: 20px;
    font-family: 'Lato', Arial, sans-serif;
    border-bottom: 1px solid #EDEDED;
}

table.popuplist tr:hover{
    background-color: #EEEEEE
}


table.popuplist td td{
    border-bottom: none;
}

table.reports{
    width: 500px;
}

table.actions{
    width: 400px;
}

table.popuplist a table td{
    font-size: 1em;
    padding-top: 0em;
    padding-bottom: 0em;
}

table.popuplist a table td:first-of-type{
/* Icon on function menu popups  */
    width: 1em;
    padding-right: 10px;
}

table.popuplist a table td:first-of-type img{
    height: 24px;
}

table.popuplist th{
    font-weight: 300;
    font-size: 1.2em;
}

table.popuplist img{
    vertical-align: middle;
    margin-right: 1em;
}

table.popitem td{
        height: 24px;
}
table.popitem td img.busy {
  height: 24px;
  position: absolute;
  top: 0px;
  left: 0px;
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
}

table.history td,
table.favourites td,
table.search td{
    padding-left: 20px;
    padding-right: 20px;
}

table.history td td,
table.favourites td td,
table.search td td{
    padding-left: 0px;
    padding-right: 0px;
}

table.history td{
    padding-right: 5px;
}
table.history td.addtodesktop{
    padding-left: 0px;
    padding-right: 15px;
}

td.addtodesktop img{
    height: 1em;
}

/* End of popup list styles  */

div#userroleCombo {
/* Desktop selector */
        margin-left: 10px;
}

div#userroleCombo select{
        border: none;
        font-family: Lato, Helvetica, Arial, Verdana, Geneva, sans-serif;
        font-size: 12px;
        font-weight: 400;
}

div#userroleCombo select::-ms-expand{
    border: none;
    background-color: transparent;
/* To hide the box round the selector arrow in IE. */
}

/*button#globalsearch {
  margin-top:10px;
  margin-right:10px;
  background-color: transparent;
  border: 0px;
}*/

div#search button#globalsearch,
div#inlinemanual button#inlinemanual,
div#desktop button#desktop{
        margin-top: 0px;
}

button#globalsearch:hover,
 button#desktop:hover{
  background: #EEE;
}



/***************************************/
/* End of styles for header and popups */
/***************************************/


/********************/
/* Styles for links */
/********************/
A { 
    color: #67A3C7; /* Keep as this blue; don't change to "theme" colour */
    text-decoration:underline;
}

A:hover{
    color: #2a2a2a;
}

a.buttonanchor{
    white-space:nowrap; /*1027 added to stop lookup buttons wrapping */
}


a.tdwindow{
    text-decoration:none;
    border-bottom: #67A3C7 dotted 1px;
    padding-bottom: -1px;
}

/* Only display the little icon if hovering on the link */
/*a.tdwindow + img{visibility:hidden;}*/
/*a.tdwindow:hover + img{visibility:visible}*/

a.small {
    color: black; 
    font-size: 7pt;
}
a.small:hover {
    text-decoration: none; 
}

A.topmenu {
    font: bold 1em/1;
    text-decoration: underline;
}

A.topmenu:hover {
    font-weight: bold; 
}

a.badge, span.badge, span.tilebadge {
  display: inline;
  padding: .2em .4em .3em;
  font-size: 85%;
  color: #000000;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25em;
  background-color: #FFFFFF;
  margin: 1px;
}

span.tilebadge {
  padding: 3px 2px 1px 2px;
  border-radius: 5px;
}

a.badgered, span.badgered{
  background-color: #F48E86;
}

a.badgered-nounderline, span.badgered-nounderline{
  background-color: #F48E86;
  text-decoration: none;
}

a.badgeamber, span.badgeamber{
  background-color: #FBDB90;
}

a.badgegreen, span.badgegreen{
  background-color: #A6CB85;
}

a.badgedarkgray, span.badgedarkgray{
  background-color: #828282;
  color: #FFFFFF;
}

BODY {
    margin: 0em 0% 0em 0%;
    background-color:#FFFFFF;
    background-repeat:repeat-y;
    background-position:right;
    cursor: default;
}

BODY.iframe {
    margin: 0em 0% 0em 0%;
/*    font-size: 1em;*/
    background: #FFFFFF;
    cursor: default;
}
BODY.ipopup {
    margin: 0em 0% 0em 0%;
    background: #FFFFFF; /*1027*/
    border: solid 2pt #BBBBBB; /*1027*/
    cursor: DEFAULT;
    overflow: hidden;
}


BODY.ipopup FORM{
}

div.ui-layout-pane{
/* Added in 11.02 because of Desktop */
    border: none;
}

div.ui-layout-pane-south{
/*    border-top:outset 3px #dddddd;*/
    border:solid 1px #B8B8B8;
    padding:0px;
    background-image:none;
    background-color: #FFFFFF;
}

div.ui-layout-pane-center{
    padding: 0px;
}

#splitForm div.ui-layout-pane {
  padding: 2px !important;
  border: none !important;
}

/**********************************/
/* Styles for 'standard' buttons. */
/**********************************/
button{
    padding: 0px;
}

button.image-button, input[type='button']{
    background-color: transparent;
    border-style: solid; 
    border-color: transparent;
    border-width:1px 2px 2px 1px;
    border-radius: 3px;
    margin:0px;
}

td.buttons button,
tr.bodyhead button{
    border-color: transparent;
}
button.image-button:hover{
    background-color: #EEEEEE;
}

input[type='button'][disabled='disabled'],
input[type='button'][disabled='disabled']:hover{
    background-color: #E4E4E4;
    color: #B0B0B0;
}

img#browseBusy{
/* Border to prevent screen jumping when the busy icon is displayed in place of the selected
filter button. */
    border:solid 1px transparent;
   padding-right: 1px;

}

button#togglemenubutton{
    background:transparent;
    border:none;
}


tr.activerow button:hover,
tr.activerow a button:hover{
    background-color: #fcfcfc;
}

tr.activerow img:hover{
    background-color: #FCFCFC;
    border-radius: 3px;
}

button#toggleFilter[href='tfilteron'],
button#resetFilter,
button#showAll[href='allon'], 
button#total[href='totalon'],
button.buttonanchor.selected,
button.buttonanchor.selected:focus,
button.buttonanchor.selected:hover{
  background-color: #4a4a4a;
  color: #ffffff;
}


div.actiongroup{
    background-color: #FFFFFF;
    border-style: solid; 
    border-color: #DFDFDF #bfbfbf #bfbfbf #DFDFDF;
    border-width:1px 2px 2px 1px;
    border-radius: 3px;
    display: inline-block;
    padding: 0px;
    padding-left: 6px;
        padding-top: 1px;
        padding-bottom: 2px;
        height: 22px;
}
div.buttongroup{
    background-color: #FFFFFF;
    border-style: solid; 
    border-color: #DFDFDF;
    border-width:1px 2px 2px 1px;
    border-radius: 3px;
    display: inline-block;
    padding: 0px;
    padding-left: 6px;
    padding-bottom: 3px;
    white-space: nowrap;
}
div.buttongroup.selected {
  background-color: #4a4a4a;
}

div.buttongroup.selected:active{
    border-width: 2px 1px 1px 2px;
}

td.buttonbar div.buttongroup.selected button{
    padding-left: 6px;
    padding-right: 3px;
}

td.buttonbar div.actiongroup button{
    border: none;
    background-color: #FFFFFF;

padding: 0px;
margin: 0px;
border-width: 0px;
height: 22px;
}

td.buttonbar div.actiongroup div.styled-select{
        zoom: 90%;
}

div.actiongroup:hover, td.buttonbar div.actiongroup:hover button{
        background-color: #EEEEEE;
}

/* Filter Selected button in browse header */
button[href=filteron]{
        background-color: #ffffff;
}

button[href=filteroff]{}

button.colsets {
  /*background-color: red;*/
}

button.colsets:after{
/* Indicator that column sets exist. */
background-color: white;
border-radius: 50%;
border: solid #4a4a4a 1px;
color: #4a4a4a;
content: "i";
display: block;
font-size: 8px;
font-weight: bold;
height: 8px;
left: 24px;
padding: 2px 3px 4px 3px;
position: absolute;
top: 2px;
width: 8px;
}

/***************************/
/* Styles for text buttons */
/***************************/

td.buttonbar button,
button.text-image-button,
div.ui-dialog-buttonset button,
div.ui-dialog-buttonset .ui-state-default,
input[type='button'],
a button.buttonanchor{
    background-color: #FFFFFF;
    border-color: #DFDFDF #bfbfbf #bfbfbf #DFDFDF;
    border-radius: 4px;
    border-style:solid;
    border-width: 1px 2px 2px 1px;
    color: #2a2a2a;
    font-size:0.9em;
    font-weight: normal;
    height: 29px;
    margin: 1px;
    padding: 2px;
    text-transform: uppercase;
    white-space:nowrap;
}

div.ui-dialog-buttonset .ui-state-default{
        background-color:  #FFFFFF;
        background-image: none;
        
}

td.buttonbar button:hover,
button.text-image-button:hover,
div.ui-dialog-buttonset button:hover,
input[type='button']:hover, a.buttonanchor button:hover,
tr.activerow a button.buttonanchor:hover{
    background-color: #EEEEEE;
    border-width:1px 2px 2px 1px;
}

td.buttonbar button[disabled]:hover{
        background-color: transparent;
}

td.buttonbar button:focus,
button.text-image-button:focus,
div.ui-dialog-buttonset button:focus{
    outline: 0;
    border-width: 2px 1px 1px 2px;
    background-color: #EEEEEE;
    margin: 0px 1px 0px 1px;
}

td.buttonbar button.text-image-button,
div.ui-dialog-buttonset button.text-image-button{
    padding-right: 6px;
    padding-left: 6px;
    text-transform: uppercase;
}

/*td.buttonbar button.text-image-button:focus,
div.ui-dialog-buttonset button.text-image-button:focus{
    padding-right: 5px;
}
*/
td.buttonbar button.text-image-button.image-only,
div.ui-dialog-buttonset button.text-image-button.image-only{
    padding-right: 2px;
}

/* Adjust padding on OK/Cancel buttons */
/* Main style in wocoins-v1105 */
div.ui-dialog-buttonset .ui-state-default.coinsok, 
div.ui-dialog-buttonset .ui-state-default.coinsdelete, 
div.ui-dialog-buttonset .ui-state-default.coinscancel{
        padding-left: 6px;
}

td.buttonbar button img,
div.ui-dialog-buttonset button img{
    height: 24px;
    margin-bottom: 0px;
    padding: 0px;
    vertical-align:middle;
}

td.buttonbar button img[src$="_i.svg"]:hover{
/* No hover colour on 'inactive' buttons */
        background-color: #FFFFFF;
}

button.text-image-button img{
        margin-left: -6px;
}

/* Colours for specific buttons */

button[id='action:delete:'][class~='text-image-button'],
button#delete
{
    color: #F1736A; /* Colour of PATH in delete.svg */
}

button#add[class~='text-image-button']{
    color: #4db63a; /* Colour of PATH in add.svg */
}

div.buttongroup{
    margin-top: 0px;
    display: inline-block;
    background-color: transparent;
    border-color: #DFDFDF #bfbfbf #bfbfbf #DFDFDF;
    border-radius: 4px;
    border-style:solid;
    padding: 0px;
    border-width:1px 2px 2px 1px;
}
div.buttongroup button,
div.buttongroup button:hover{
    border: none;
    border-radius: 0px;
    padding: 1px;
        height: 24px;
}

div.buttongroup button:hover{
    background-color: #EEEEEE;
}

/**********************************/
/* End of Styles for text buttons */
/**********************************/

/* "Global shortcut' buttons in status bar */
td.statusright img{
    height: 24px;
    width: 24px;
    padding-left: 2px;
    padding-right: 2px;
}

td.statusright img:hover{
        background-color: #EEEEEE;
        border-radius: 4px;
}


/*****************************/
/* Styles for Browse Screens */
/*****************************/
TR.odd, TR.matrixodd, TR.scrollodd{
  background-color: #FFFFFF;
}

TR.even, TR.matrixeven, TR.scrolleven{
  background-color: #FFFFFF;
}

TR.activerow:hover, TR.hover{
/* TR.activerow is a browse row with data on;
   TR.hover is used on "fixed columns" browses when you hover over a cell on the opposite side */
    background-color: #EEEEEE;
}

TR.selected, TR.selected:hover{
  /* Background on selected rows */
    background-color:  rgba(66,73,88,0.1);
}

div.freezetd, div.freezeth {
  max-height:2.4em;
  overflow:hidden;
}
div.freezetd .styled-select select {
  width:100%;
}
div.freezetd var {
  padding-right: 0.3em; /* avoiding italics overflow */
}

td.overflowed, th.overflowed {
        background-image: url(/coins/devstage/20230228063043/skin/v1105/images/ellipsis.svg);
        background-position: 100% 50%;
        background-repeat: no-repeat;
}

tr#freezeColumns td{
    vertical-align: top;
}
tr#freezeColumns td td{
    vertical-align: middle;
}
tr#freezeColumns table td{
    /*height:2.4em;*/
}

TR.odd > TD, TR.even > TD{
    font-weight: bold;
    height: 31px; /*line-height: 1.1em; */
    padding-left:0.5em;
    padding-right:0.5em;
    border:solid #E9E9E9 1px;
    border-left: none;
    border-right: none;
}

td.formexpandblock{
    padding:6px; /* 1027 added to pad body detail  */
}
td.expand{
border-left: #E9E9E9 1px solid;
}
A.th {
    color: #FFFFFF; 
    font-weight: normal; 
    text-decoration: none;
}

A.th:hover {
    text-decoration: underline;
}

TR.headertitle a.td{
    color: #002a5c;
}
TD.oddexpand, TD.oddexpandfixed {
    height: 24px; line-height: 1.1em;
    border:solid #BBBBBB 1px;
} 

tr.headertitle {
  color: #ffffff;
}

tr.headertitle button#hidemenu {
  background-color: #4a4a4a;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.headertitlexml {
  margin: 0 0 10px;
}

TD.oddexpand TR{
/*    background: #FAFAF8;*/
/* Commented out as per TD.evenexpand TR */
}

TD.oddexpandfixed textarea, TD.evenexpandfixed textarea{
    font-family:monospace,monospace;
    /* This duplication is to stop Chrome reducing the font size */
    font-size:1em;
}

TD.evenexpand, TD.evenexpandfixed {
    height: 24px; line-height: 1.1em;
    border:solid #BBBBBB 1px;
}

TD.evenexpand TR{
/*    background: #F3F3F3;*/
/* This was creating a shaded border round layout groups in body detail */
}

TD.formexpandsubheader {
    font: bold; line-height: 1.2;
}

TD.formexpanddata {
    font-weight: bold; 
    line-height: 1.2; 
    padding-left:0.5em;
    padding-bottom:1pt; /* to allow dotted line on TDWindow links to show*/
}
TD.formexpandblank {
    font-weight: normal; 
    height: 10px;
}
TD.formexpandlabel {
    font-weight: normal; 
    padding-right:0.5em;
    padding-bottom:1pt; /* to align label with change to data */
}

TD.select, TD.selected {
    background-color: transparent;
    BORDER: #E9E9E9 solid 1px;
    border-left: none;
    border-right: none;
}

TD.select img, TD.selected img{
        height: 24px;
        width: 24px;
}

td div#readstatus.unread{
/* Unread report indicator on Report Status */
    display: block;
    background-color: #4a4a4a;
    color: #FFFFFF;
    text-align: center;
    width: 8px !important;
    height: 8px;
    font-size: 8px;
    padding: 1px;
    border-radius: 50%;
}

div.indicator{
/* Indicator Dots */
    display: block;
    color: #FFFFFF;
    text-align: center;
    width: 8px !important;
    height: 8px;
    font-size: 8px;
    padding: 1px;
    border-radius: 50%;
}

.big_indicator{
    display: block;
    color: #FFFFFF;
    text-align: center;
    font-size: 8px;
    padding: 1px;
    border-radius: 50%;
    height: 20px;
    width: 20px !important;
}

.indicator.coins_white, .big_indicator.coins_white{
    border: solid 1px #2a2a2a;}

 .indicator.coins_white{
 height: 6px; width: 6px !important;
}

 .big_indicator.coins_white{
 height: 18px; width: 18px !important;
}

TD.bodytitle {
/* For example, "Operating company" header on company workbench */
    font-weight: normal;
    color: #FFFFFF;
    height: 26px;
    background-color: #4a4a4a;
    padding-left: 1em;
}
TD.total, TD.totalbuttons {
    font-weight: bold;
    color: #ffffff;
    height: 36px;
    background:#4a4a4a;
    padding-left:0.2em;
}

TD.total.small {
  height: 25px;
}

TD.total var{
    font-style: normal;
    font-weight: bold;
    padding-left: 0.5em;
    padding-right: 0.5em;
/* Padding same as browse cells */
}

TD.totalschedred{
    font: bold;
    color: #FFFFFF;
    height: 26px;
    background-color: #F48E86;
    padding-left:0.2em;
}

TD.totalschedamber{
    font: bold;
    color: #FFFFFF;
    height: 26px;
    background-color: #FBDB90;
    padding-left:0.2em;
}

TD.totalschedgreen{
    font: bold;
    color: #FFFFFF;
    height: 26px;
    background-color: #A6CB85;
    padding-left:0.2em;
}

TD.totalschedyellow{
    font: bold;
    color: #FFFFFF;
    height: 26px;
    background-color: #FFFF00;
    padding-left:0.2em;
}
TD.totalschedgrey{
    font: bold;
    color: #FFFFFF;
    height: 26px;
    background-color: #C0C0C0;
    padding-left:0.2em;
}


/*
These two are to give a border to column-spanned headings,
then remove it again for the Selectors headings.
*/
th{
    color: #2C326A;
}

th.th{
    border:none;
    color: #FFFFFF;
}

th.sortable:hover,
th.scrollsortable:hover{
    background-color: #4a4a4a;
    cursor: pointer;
}

th.sortable img, th.scrollsortable img, 
th.scrollcurrent img, th.current img {
  height:24px;
  width: 24px;
}

th.noresize{
        position: relative;
/* Added so that the column sets indicator (button.colsets:after) can be positioned. */

}

table.browse th.current,
table.browse th.scrollcurrent{
    background-color: #4a4a4a;
}
table.browse th.current:hover,
table.browse th.scrollcurrent:hover{
    cursor: pointer;
}

th.th {text-align: left;
    padding: 3px 0px 3px 4px;
}

th.columnset{
    text-align:right;
}

div.sortlabel, div.sortimage{
        white-space: normal;
        display: table-cell;
        vertical-align: middle;
}
div.sortimage img{
        height: 24px;
        width: 24px;
}

th.sortable, th.current{
        display: table-cell;
        white-space: nowrap;
}
a.columnsort{
        white-space: nowrap;
}


tr.sidemenutitle {background-color: #6699cc;}

tr.bodyspan th{
        color: #ffffff;
}
tr.bodyspan th.column-group{
background: #4a4a4a;
background: -moz-linear-gradient(left, #4a4a4a 0%, #4a4a4a 100%);
background: -webkit-gradient(left top, right top, color-stop(0%, #4a4a4a), color-stop(100%, #4a4a4a));
background: -webkit-linear-gradient(left, #4a4a4a 0%, #4a4a4a 100%);
background: -o-linear-gradient(left, #4a4a4a 0%, #4a4a4a 100%);
background: -ms-linear-gradient(left, #4a4a4a 0%, #4a4a4a 100%);
background: linear-gradient(to right, #4a4a4a 0%, #4a4a4a 100%);
filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#4a4a4a', endColorstr='#4a4a4a', GradientType=1 );
}

tr.bodyspan th:last-of-type{
        border-right: none;
}

tr.bodyhead th{
/* Column headers in a browse */
    background-color: #4a4a4a;
    color: #ffffff;
    height: 30px;
    padding-left:0.5em;
    padding-right:0.5em;
    border-left: none;
    border-right: none;
}

tr.bodyhead a:hover{
    color: #ffffff;
}

tr.bodyhead button:hover{
        background-color: #4a4a4a;
}

table.browse th{
    background-color: #4a4a4a; /* header above browse columns */
}

/* Styles for the 'column set' button bar above a browse. */
tr.bodyhead td.buttonbar{background:none;background-color: #FFFFFF;}
tr.bodyhead td.buttonbar button:hover,
tr.bodyhead td.buttonbar button img:hover{background-color: #F3F3F3;}

tr.selected td.norecord{
    background-color: #FAD69A;
}

tr.oddselected td.oddexpandrecordtwo,
tr.evenselected td.evenexpandrecordtwo,
tr.evenselected td.evenrecordtwo,
tr.oddselected td.oddrecordtwo
    {background-color: #F19E14;}

td.schedred, td.oddschedred, td.oddexpandschedred, td.formatdataschedred{
    background-color: #F48E86;
}

td.formdataschedred{
    background-color: #F48E86;
    font: normal;
    padding-left:0.5em;
}

td.schedamber, td.oddschedamber, td.oddexpandschedamber, td.formdataschedamber{
    background-color: #FBDB90;
}
td.schedgreen, td.oddschedgreen, td.oddexpandschedgreen, td.formdataschedgreen{
    background-color: #A6CB85;
}
td.schedyellow, td.oddschedyellow, td.oddexpandschedyellow, td.formdataschedyellow{
    background-color: #FFFF00;
}
td.schedgrey, td.oddschedgrey, td.oddexpandschedgrey, td.formdataschedgrey{
    background-color: #C0C0C0;
}
td.evenschedred, td.evenexpandschedred{
    background-color: #F48E86;
}
td.evenschedamber, td.evenexpandschedamber{
    background-color: #FBDB90;
}
td.evenschedgreen, td.evenexpandschedgreen{
    background-color: #A6CB85;
}
td.evenschedyellow, td.evenexpandschedyellow{
    background-color: #FFFF00;
}
td.evenschedgrey, td.evenexpandschedgrey{
    background-color: #C0C0C0;
}

td.oddschedpink, td.oddexpandschedpink, td.formdataschedpink,
td.evenschedpink, td.evenexpandschedpink{
     background-color: #FF00FF;
}

td.oddscheddarkgreen, td.oddexpandscheddarkgreen, td.formdatascheddarkgreen,
td.evenscheddarkgreen, td.evenexpandscheddarkgreen{
     background-color: #008000;
}

td.oddschedteal, td.oddexpandschedteal, td.formdataschedteal,
td.evenschedteal, td.evenexpandschedteal{
    background-color: #008080;
}

td.oddschedblue, td.oddexpandschedblue, td.formdataschedblue,
td.evenschedblue, td.evenexpandschedblue{
    background-color: #0000FF;
}

td.oddschedcyan, td.oddexpandschedcyan, td.formdataschedcyan,
td.evenschedcyan, td.evenexpandschedcyan{
    background-color: #00FFFF;
}

td.oddschedpurple, td.oddexpandschedpurple, td.formdataschedpurple,
td.evenschedpurple, td.evenexpandschedpurple{
     background-color: #800080;
}

td.oddbtnred input, td.evenbtnred input, 
td.formdatabtnred input, td.formdatabtnred button{
    background-color: #ff0000;
    color: #000000;
    border:1px solid black;
    line-height:1.2;
    /*border-radius: 4px;*/
}

td.oddbtnred input:hover, td.evenbtnred input:hover, td.formdatabtnred input:hover, td.formdatabtnred button:hover{
    color: #FFFFFF;
    background-color: #FF0000;
}

TD.oddbold{
    font-weight: bold;
}
TD.oddboldperf100{
    font-weight: bold;
}
TD.oddboldperf60{
    font-weight: bold;
}
TD.evenbold{
    font-weight: bold;
}


TD.perf30, TD.perf60, TD.perf100, TD.perfna, 
TD.formdataperf30, TD.formdataperf60, TD.formdataperf100, TD.formdataPerfNA, TD.overdue,
TD.expired, TD.expiring, TD.formdataoverdue, TD.formdataexpiring, TD.formdataexpired,
TD.formdatarestricted, TD.formdatayellow{
    border:solid 1px #BBBBBB;
    font: normal;
    height: 24px; line-height: 1.1em;
    padding-left:0.1em;
    padding-right:0.1em;
}
.perf30{background-color:#F48E86 !important;}
.perf60{background-color: #FFE680 !important;}

.perf60{background-color: #FBDB90 !important;}

.boldperf60{background-color: #FFE680 !important;}
.perf100{background-color: #A6CB85 !important;}
.boldperf100{background-color: #A6CB85 !important;}
.perfna{background-color: #828282 !important;}
.expiring{background-color: #FFE680 !important;}
.expired{background-color: #F48E86 !important;}
.overdue{background-color: #F48E86 !important;}
.restricted{background-color: #F48E86 !important;}
.formdataperf30{background-color: #F48E86 !important;}
.formdataperf60{background-color: #FFE680 !important;}
.formdataperf100{background-color:#A6CB85 !important;}
.formdataperfna{background-color: #828282 !important;}
.expandexpiring{background-color: #FFE680 !important;}
.expandexpired{background-color:#F48E86 !important;}
.expandoverdue{background-color:#F48E86 !important;}
.expandrestricted{background-color:#F48E86 !important;}
.formdataexpiring{background-color: #FFE680 !important;}
.formdataexpired{background-color:#F48E86 !important;}
.formdataoverdue{background-color:#F48E86 !important;}
.formdatarestricted{background-color:#F48E86 !important;}
.formdatayellow{background-color: #FFFF00 !important;}
.oddorderonbehalf{background-color:#FBDB90 !important;}
.evenorderonbehalf{background-color:#FBDB90 !important;}

/* Styles for My Diary */ 

table.diary th{
        background-color: #4a4a4a;
        border-left: 1px solid #ffffff;
        border-right: 1px solid #ffffff;
        padding-left: 6px;
        padding-right: 6px;
}

table.diary-calendar{
        border-collapse: collapse;
}

table.diary-calendar th{
        padding: 2px;
}

table.diary-calendar > tbody > tr > th{
/* Only the top-level header of the calendar */
        border: none;
}

table.diary div.diary-column{
        border: 1px solid #4a4a4a;
}


div#browsepopup, div#userpopup, div#productpopup, div#rolepopup {
  position: absolute;
  display:none;
  color: black;
  z-index: 9;
  background-color: #FFFFFF;
  -moz-box-shadow:1px 1px 9px rgba(0,0,0,0.4);-webkit-box-shadow:1px 1px 9px rgba(0,0,0,0.4);box-shadow:1px 1px 9px rgba(0,0,0,0.4);-ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true)";filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true)
}


/* Styles for browsespopup contents are under popup menus... */


/************************************/
/* End of styles for Browse Screens */
/************************************/

/***********************/
/* Styles for tooltips */
/***********************/

div.ui-tooltip{
    padding: 5px;
    max-width:800px;
}
div.ui-tooltip-content{
    font-size:0.9em;
    font-family:Arial;
}
div.ui-tooltip-content table{
    border-collapse:collapse;
}

div.ui-tooltip-content td{
    border:solid 1px #4a4a4a;
    color: #2a2a2a;
    padding:3px 6px;
}
div.ui-tooltip-content th{
    border:solid 1px #4a4a4a;
/*    border-top-color: #4a4a4a;*/
    background-color: #4a4a4a;
    color: #ffffff;
    padding:3px 6px;
}
div.ui-tooltip-content th:first-of-type{
    border-left-color: #4a4a4a;
}
div.ui-tooltip-content th:last-of-type{
    border-right-color: #4a4a4a;
}

/*************************/
/* Styles for menu trees */
/*************************/

a.sidemenu {
    text-decoration: underline;
    font-size: 8pt;
    color: #000066;
    font-style : normal;
    font-weight: bold;
}
a.sidemenu:hover {
    font-weight: bold; 
    color: #ff6600;
}

a.sidemenucurrent {
    text-decoration: underline;
    font-size: 8pt;
    color: #ff6600;
    font-style : italic;
    font-weight: bold;
}
a.sidemenucurrent:hover {
    font-weight: bold; 
    color: #000066;
}

tr.trtreehead button#undo{
/*  Style for 'refresh' button in treeview menu. */
    background-color:transparent;
    border: solid 1px transparent;
    padding:0px;
    margin:0px;
}

tr.trtreehead button#undo:hover{
    background-color: #E9E9E9;
    border:solid 1px #E9E9E9;
    border-radius:4px;
}

div.ui-layout-west{
    background-repeat:no-repeat;
    background-position:0 0;
    background-attachment:fixed;
    color: #FFFFFF;
    padding:0px;
    overflow:hidden;
}

div#treeView{
    background-color: #FFFFFF;
    /*background: -webkit-linear-gradient(left, rgba(255,255,255,1)0%, rgba(255,255,255,1) 90%, rgba(194,194,194,0.54)100%);
    background: -o-linear-gradient(left, rgba(255,255,255,1)0%, rgba(255,255,255,1) 90%, rgba(194,194,194,0.54)100%);
    background: linear-gradient(to right, rgba(255,255,255,1)0%, rgba(255,255,255,1) 90%, rgba(194,194,194,0.54)100%);
*/
} 

/* No image on documentation menu */ 
div.documentation div#treeView{
    background-image:none;
    background-color: #FFFFFF;
}

div.ui-layout-west td{
    line-height:0; /*10.27: 0 added to close up vertical space in menu  */}


div#treeView{overflow:auto;padding:3px;height:90%;}

table.root td{
    font-weight: bold;
}

table.root td a.treelink{
        color: #2a2a2a;
}

td.treegroup {
    color: #767676;
    padding-left: 3px;
    text-transform: uppercase;
    padding-top: 24px;
    padding-bottom: 8px;
}

/* hide top menu icon on side menu only */
table.subtree img.treefiller{
    width: 24px;
}

td.menu-opener img{
        width: 24px;
}

div#menuTree i.icn.menuicon{
    display:none;
}

table.treeitems i.icn {
    font-size: 18px;
    color: #2a2a2a;
}

table.root td.menu-opener{
    padding-left: 0px;
}

div#treeView td.menu-opener img{
}

TD.treelink {
    font-size: 1.1em;
    color: #2a2a2a;
    padding-left: 3px;
    padding-right: 3px;
}

TD.treelink:hover{
    background-color: #EEEEEE;
}

td.treelink td.treelink{
    padding-left: 12px;
}

/* Styles for highlights in menu.  */
TD.treelinkhi {
    color: #ffffff;
    font-size: 1.1em; 
    padding-left: 3px;
    padding-right: 3px;
    background-color: #4a4a4a;
}

a.treelink{color: #2a2a2a;text-decoration: none;cursor:pointer}
a.treelink:hover{color: #2a2a2a;}
td.treelinkhi a.treelink{color: #ffffff;}

img.treefiller {
    width:14px;
    height:0px;
}

span.loading{
    color: #4a4a4a; 
    padding-left:6px;
}

DIV#loading{
    height: 36px;
}

DIV.menuarea {
    overflow: auto;
    width: 100%;
    height: 80px;
}
DIV.wholemenu {
    height: 100%;
    overflow: hidden;
}

div#treeView tr,
table.treeitems tr, table.subtree tr {
    height: 24px;
}

table.treeitems img {
  height:24px;
  width:24px;
}


/* Selectors in side menu */

div#functionSearchInput {
    padding-left: 6px;
    padding-right: 10px;
    white-space: nowrap;
}
div#functionSearchInput img {
  width: 24px;
}

div#functionSearchInput img {
  width: 24px;
  height: 24px;
}

div#functionSearchInput i.icn{
    font-size: 18px
}
div#functionSearchInput i#clearicon{
    display: none;
}
div#functionSearchInput.filter-on i#searchicon {
    display: none;
}
div#functionSearchInput.filter-on i#clearicon {
    display: block;
    cursor: pointer;
}

i#clearicon:hover{
    background-color: #4a4a4a;
    border-radius: 4px;
}

/* Hide the browser's default 'x' in the search box */
div#selectors input::-ms-clear {  display: none; width : 0; height: 0; }
div#selectors input::-ms-reveal {  display: none; width : 0; height: 0; }
div#selectors input::-webkit-search-decoration,
div#selectors input::-webkit-search-cancel-button,
div#selectors input::-webkit-search-results-button,
div#selectors input::-webkit-search-results-decoration { display: none; }


div#functionSearchInput table{
    background-color: rgba(255,255,255,0.2);
        color: #ffffff;
    margin-left: 3px;
    margin-right: 3px;
}

div#selectors input#functionSearch{
    width: 100%;
    height: 24px; 
    background-color: transparent;
    border: none;
        border-radius: 3px;
    vertical-align: top;
    outline: 0;
        padding-left: 0.5em;
}

input#functionSearch{
        background-color: #4a4a4a;
        color: #ffffff;
}
input#functionSearch::-webkit-input-placeholder{
        color: #ffffff;
}
input#functionSearch:focus::-webkit-input-placeholder{
    color: #DDDDDD;
}

input#functionSearch: -ms-input-placeholder{
        color: #FFFFFF;
}
input#functionSearch:focus: -ms-input-placeholder{
        color: #DDDDDD;
}

table#functionsearchlist{
        width: 100%;
}

tr.resultrow{
        white-space: nowrap;
        line-height: auto;
}

tr.resultrow.highlight{
        background-color: #EEEEEE;
}
tr.resultrow td a{
        color: #828282;
        text-decoration: none;
}

tr.resultrow td a.moreresults{
        color: #67A3C7;
        text-decoration: underline;
}

div#noresults {
 padding:10px;
 font-weight: 400;
 color: #2a2a2a;
}

div#selectors div#functionSearchInput{
    background-color: #4a4a4a;
    padding-top: 5px;
    height: 32px;
}
div#selectors div#closeAll {
    background-color: #4a4a4a;
  padding: 0px;
  height: 5px;
}
div#selectors div#closeAll:hover {
  background-color: #4a4a4a;
  cursor: pointer;
}

div#selectors select{
    vertical-align: middle;
    border: none;
    background-color: #FFFFFF;
    height: 32px;
}

div#selectors option{
    background-position: center;
    background-color: #F3F3F3;
}


/* Styled selectors */
.styled-select{
    background-image: url(/coins/devstage/20230228063043/skin/v1105/images/down_arrow.svg);
/* Note: I had to add preserveAspectRatio="xMinYMid" to the SVG file to
get this to position in IE */
    background-repeat: no-repeat;
    background-position-x: right;
        background-position-y: top;
    border: 0px solid #DFDFDF;
    display: inline-block;
}

.styled-select.mandatory{
    background-color: #EFF4FA;
    background-image: url(/coins/devstage/20230228063043/skin/v1105/images/down_arrow.svg);
}
.styled-select select::-ms-expand{display: none;}
/* To hide the default arrow in IE */

tr.activerow styled-select{
        background-color: #FFFFFF;
}

.styled-select select{
    /*background-image: url(/coins/devstage/20230228063043/skin/v1105/images/input_underline.jpg);*/
    background-image: 
     url(wousvg.p?style=v1105&icon=input_underline$.svg&colour=%234a4a4a);
    background-size: 0px 2px;
    background-position: left bottom;
    background-repeat: no-repeat;
    -webkit-transition: background-size .2s;
    -moz-transition: background-size .2s;
    -o-transition: background-size .2s;
    -ms-transition: background-size .2s;
    transition: background-size .2s;
}

.searchSort-select select{
    width: 130px;
    border-radius: 3px;
}

div#searchType span.ui-icon-triangle-1-s{
/* Reposition the triangle on the Search Type drop-down */
    margin-top: 0px;
}

.styled-select select{
   background-color: transparent;
   padding: 1px;
   line-height: 1;
   border: none;
   border-radius: 0;
   height: 34px;
   -webkit-appearance: none;
   padding-right: 20px;
   color: #2a2a2a;
}

.styled-select select[disabled] {
    color: #b9b9b9;
    background-color: #E4E4E4;
}

.styled-select select.readonly{
    background-color: #f3f3f3;
    color: #b0b0cd;
}

li.company-selector {
        padding-left: 6px;
}
li.company-selector .styled-select select,
li.role-selector .styled-select select{
        background-color: transparent;
}

.styled-select:hover, .styled-select:focus{
    background-color: #EEEEEE;
}

li.company-selector .styled-select,
li.role-selector .styled-select{
    height: 21px;
}

tr.activerow div.styled-select select{
        background-color: transparent;
}

.styled-select select:focus{
    background-color: transparent;
}

.styled-select select option{
    border: none;
}

/* End style for selectors */


p{
    margin: 1px;
}

table#leftScrollTable TR, table#rightScrollTable TR {
  height: 30px;
}
table#leftScrollTable TR TH div.actionth {
  width: 50px;
}

table#COINSScheduler td.treelinkhi,
table#COINSScheduler td.treelink
 {color: #000000;font-weight: normal;font-size: 11px}
table#COINSScheduler a{color: #1168C8;}

body.treeview {
    background-color: #FFFFFF;
    margin-right : 0;
    margin-top : 0;
    margin-left : 0;
    margin-bottom : 0;
    border-right: 1px solid #A6A6A6;
    border-top: 1px solid #A6A6A6;
    border-left: none;
    border-bottom: none;
}

body.treeview td{
    line-height: 0;
}

body.treeview td.treelinkhi{
    background-color: #8D8D8D;
}
body.treeview a.treelink{
    color: #000000;
}

body.treeview td.treelinkhi a.treelink{
    color: #E8EDF4;
}

body.treeview span.loading{
    color: #000000;
}

/**************************/
/* End of treeview styles */
/**************************/

/******************************/
/* End: Styles for menu trees */
/******************************/


div.lookupcontrol {
    position:relative; 
    display:block;
    border:1px solid #CCC;
    border:outset #F3F3F3 2px;
    border: none;
    z-index:4;
    -moz-box-shadow:1px 1px 9px rgba(0,0,0,0.4);-webkit-box-shadow:1px 1px 9px rgba(0,0,0,0.4);box-shadow:1px 1px 9px rgba(0,0,0,0.4);-ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true)";filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true);
}

table.lookupresult{
    border-collapse: collapse;
    padding: 0; 
    margin-left: 0px; 
    list-style-type: none; 
    font-size: 12px;
    background-color: #FFFFFF;
    width: 100%;
}

tr.lookupresult{
    background-color: transparent;
}

tr.lookupresult, tr.lookupresulthi {
  padding: 0 5px; cursor: default; white-space: nowrap;
}

tr.lookupresulthi {
  background-color: #EEEEEE;
}

tr.lookupresult td, tr.lookupresulthi td{
    padding: 3px;
    border: solid 1px;
    border-color: #E9E9E9 transparent #E9E9E9 transparent;
    height: 24px;
}

div.lookupmore{
    height: 24px;
    padding-right: 12px;
    color: #4a4a4a;
    background-color: #FFFFFF;
    font-size: 18px;
}

div.formcontainer{
  padding: 0px 4px;
  background-color: #fbfbfb;
  overflow: auto;
}

td.formlabel{
/* So that display forms are spaced out same as input forms... */
    height: 18px;
    line-height: 20px;
/* The line-height makes display-only textarea data appear too high up! Need to find a solution;
 see Development Maintenance > Information tab */

}

INPUT.search{
/* Search box in global search */ 
    height: 37px;
}

SELECT:not([multiple]){
    height: 22px;
    border: 1px solid #DFDFDF;
}

SELECT:focus{
    outline: none;
}

INPUT[type='text'], 
INPUT[type='password'], TEXTAREA, SELECT, .ui-multiselect {
    border: 1px solid #DFDFDF;
    outline: none;
   background-image: url(wousvg.p?style=v1105&icon=input_underline$.svg&colour=%234a4a4a);
    background-size: 0px 2px;
    background-position: left bottom;
    background-repeat: no-repeat;
    -webkit-transition: background-size .2s;
    -moz-transition: background-size .2s;
    -o-transition: background-size .2s;
    -ms-transition: background-size .2s;
    transition: background-size .2s;
}

INPUT:not([type='checkbox']):focus, TEXTAREA:focus, SELECT:focus, DIV.styled-select:focus select, .ui-multiselect:focus{
    background-size: 5000px 2px;
    background-position: left bottom;
    background-repeat: no-repeat;
    background-color: #EEEEEE;
}

INPUT.error, TEXTAREA.error, SELECT.error, .ui-multiselect.error {
    background-image: url(/coins/devstage/20230228063043/skin/v1105/images/error_underline.svg);
    background-size: 5000px 2px;
}

div.errormessage {
    background-color: #E45858;
    color: #FFF;
    display: none;
    padding: 8px 12px;
    z-index: -1;
    position: absolute;
    margin-top: -17px;
    margin-left: -2000px;
    opacity: 0;
    -webkit-transform: translateX(5px);
    -ms-transform: translateX(5px);
    -o-transform: translateX(5px);
    transform: translateX(5px);
    -webkit-transition: opacity .1s, transform .1s;
    -moz-transition   : opacity .1s, transform .1s;
    -o-transition     : opacity .1s, transform .1s;
    -ms-transition    : opacity .1s, transform .1s;
    transition        : opacity .1s, transform .1s;
}

div.errormessage.right:before {
    display: block;
    content: '';
    position: absolute;
    left: -14px;
    height: 1px;
    width: 1px;
    border: 7px solid transparent;
    border-right-color: #E45858;
    top: 50%;
    margin-top: -7px;
}

div.errormessage.left:after {
    display: block;
    content: '';
    position: absolute;
    right: -14px;
    height: 1px;
    width: 1px;
    border: 7px solid transparent;
    border-left-color: #E45858;
    top: 50%;
    margin-top: -7px;
}


.error:hover + div.errormessage {
    margin-left: 0px;
    opacity: 1;
        z-index: 1;
        display: block;
    -webkit-transform: translateX(0px);
    -ms-transform: translateX(0px);
    -o-transform: translateX(0px);
    transform: translateX(0px);
}

var input{vertical-align:inherit}
input[type='checkbox']+var.formexpandlabel{vertical-align: 3px; padding-right: 0px}
/* Ref: Mantis 12333 - the above line is to correct the alignment of labels for 
checkboxes when more than one on the same line. */


INPUT.button{
    /*cursor:pointer;*/
}

INPUT.addbutton {
    font-size: xx-small;
    font-weight: normal;
    color: #FFFFFF;
    background: #FF9933;
    cursor: pointer;
}

INPUT.delbutton {
    font-size: xx-small;
    font-weight: normal;
    color: #FFFFFF;
    background: #CC0000;
    cursor: pointer;
}

INPUT.cha{
}

input.chal{
    background-position: top right;
    background-repeat: no-repeat;
}

INPUT.int{
    text-align : right;
}
input.intL{
    text-align : right;
    background-repeat: no-repeat;
}

INPUT.dec{
    text-align : right;
}

input.decL{
    text-align : right;
    background-repeat: no-repeat;
}

INPUT.decdisabled, INPUT.intdisabled {
    text-align : right;
    background: #E4E4E4;
    background-image: none;
    color: #A0A0A0;
}

INPUT.chadisabled, INPUT.datdisabled, INPUT.logdisabled {
    vertical-align: text-bottom;
    background: #E4E4E4;
    background-image: none;
    color: #A0A0A0;
}

INPUT.disabled {
    background: #E4E4E4;
    background-image: none;
    color: #A0A0A0;
}

input[type='radio'].disabled{
    background-color: transparent;
}

input.disabledchanged {
    background: #FF7D96;
    background-image: none;
}

/*INPUT.readonly{
    background-color: #F3F3F3;
    color: #b0b0cd;
}*/

INPUT.readonly{
    background-color: #E4E4E4;
    color: #A0A0A0;
}

P.d2 {
    background: #F3F3F3;
    font-style : italic;
    font-weight : bolder;
}

SELECT {
    font-size: 1em;
    font-weight: bold;
}

select.selhead {
    background-color: #F3F3F3;
    color: #000066;
    font-size: 10pt;
}

select.selectioninput {
    vertical-align: top;
    margin: 1px;
}


TABLE.coinsinfo TD{
    vertical-align: top;
    BORDER-BOTTOM: solid #6699CC 1pt;
    padding: 2pt;
    line-height: normal;
}

img.coinsinfo{
        height: 18px;
}

table.filled{
    border-collapse: collapse;
}


table.rechead{
/* Record header */
    border-bottom: 1px solid #E9E9E9;
        margin-bottom: 9px;
}

table.rechead table.rechead{
    border: none; 
    /* Prevents a thick border when RECHEAD tables are nested */
}
 
INPUT.gridinitial{
    font-size: 0.9em;
    text-align : right;
}
INPUT.gridupdated{
    font-size: 0.9em;
    text-align : right;
    background-position: top right;
    background-repeat: no-repeat;
        background-image: -ms-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background-image: -webkit-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background: linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
}

/* Advanced Filter */
.ui-dialog{
        border-radius: 0px;
        border: none;
        padding: 0px;
        -webkit-box-shadow: 5px 7px 43px 7px rgba(100,100,100,0.25);-moz-box-shadow: 5px 7px 43px 7px rgba(100,100,100,0.25);box-shadow: 5px 7px 43px 7px rgba(100,100,100,0.25);
}

.ui-dialog .ui-dialog-titlebar{
        border-radius: 0px;
        background-image: none;
        background-color: #4a4a4a;
        color: #ffffff;
        font-weight: normal;
}

/*div.ui-dialog-titlebar-buttonpane a.ui-dialog-titlebar-close,
div.ui-dialog-titlebar-buttonpane a.ui-dialog-titlebar-help,
div.ui-dialog-titlebar-buttonpane a.ui-dialog-titlebar-refresh,
div.ui-dialog-titlebar-buttonpane a.ui-dialog-titlebar-minimize,
div.ui-dialog-titlebar-buttonpane a.ui-dialog-titlebar-maximize,
div.ui-dialog-titlebar-buttonpane a.ui-dialog-titlebar-restore
{
  background-color: transparent
}*/

table#advancedFilter th{
        background-color: #FFFFFF;
        color: #2a2a2a;
        align: left;
}
/* End Advanced Filter */

td#applyFilter{
    background-color: #FFFFFF;
    cursor: pointer;
    width: 26px;
    border-left: #C9C9C9 solid 1px;
}
td#applyFilter:hover{
    background-color: #E9E9E9;
}

td.button_n#applyFilter,
td.button_h#applyFilter:hover
{
    border-top: 1px solid #A5A5A5;
    border-left: 1px solid #c9c9c9;
    border-right: 1px solid #c9c9c9;
    border-bottom: 1px solid #c9c9c9;
}


INPUT.nextred, input.nextred:focus,
button[class~='text-image-button'][class~='nextred']
/* This is to allow for 'Next' buttons that are replaced by text 
   when text or text+image buttons are enabled. */
{
    font-weight: normal;color: #FFFFFF;
    background-color: #F48E86;
    background-image: none;
    cursor: pointer;
}

INPUT.nextred:hover{
    background-color: #fd9fa7;
}

input.nextgreen, input.nextgreen:focus,
button[class~='text-image-button'][class~='nextgreen']
/* This is to allow for 'Next' buttons that are replaced by text 
   when text or text+image buttons are enabled. */
{
    font-weight: normal;
    color: #FFFFFF;
    background-color: green;
    background-image: none;
    cursor: pointer;
}

INPUT.nextgreen:hover {
    background-color: #00aa00;
}

INPUT.nextamber, input.nextamber:focus,
button[class~='text-image-button'][class~='nextamber']
/* This is to allow for 'Next' buttons that are replaced by text 
   when text or text+image buttons are enabled. */
{
    font-weight: normal;color: #FFFFFF;
    background-color: #FBDB90;
    background-image: none;
    cursor: pointer;
}

INPUT.nextamber:hover{
    background-color: #ffc993;
}


TD.d1 {
    font-size: 8pt; background: #FFFFFF; line-height: 1;
}

TD.d2 {
    font-size: 8pt; background: #F3F3F3; line-height: 1;
}
TD.d3 {
    font-size: 8pt; background: #D3D3D3; line-height: 1; /*1027*/
    padding-left: 3px;
}

TD.alert {
    font-weight: normal;
    height: 24px; line-height: 1.1em;
    padding-left: 0.2em;
    padding-right: 0.2em;
    color: red;
    border: solid #BBBBBB 1px;
}

TD.nh {
    font-weight: normal;
    background-color: #F3F3F3;
    line-height: 1.5em;
    padding-left: 0.1em;
    padding-right: 0.1em;
}

TD.norecord{
    height: 24px;
    border-top: solid #BBBBBB 1px;
    border-bottom: solid #BBBBBB 1px;
    background-color: #E6E6E6;
}

TD.notrelevant{
    color: #B9B9B9;
}

td.high{
    background-color: #F0F0f0;
    border: 1px solid #BBBBBB;
}

td.buttons{
    white-space: nowrap; /* 1027 to keep open/detail buttons on one line  */
}

td.nowrap {
  white-space: nowrap;
}

td.text_top{
    vertical-align:text-top; 
}

td.text_middle{
    vertical-align:middle; 
}

td.text_bottom{
    vertical-align:text-bottom; 
}

/*td.unread {
  font-weight: 900;
}*/
table.orderedlist select{
    min-width: 5cm;
}

div.editor {
  display: inline-block;
}

/*************************/
/* Styles for UI Dialogs */
/*************************/
.ui-tabs .ui-tabs-nav li.ui-tabs-active .ui-tabs-anchor, .ui-tabs .ui-tabs-nav li.ui-state-disabled .ui-tabs-anchor, .ui-tabs .ui-tabs-nav li.ui-tabs-loading .ui-tabs-anchor{
        background-color: #FFFFFF;
}

.ui-state-active, .ui-widget-content .ui-state-active, .ui-widget-header .ui-state-active, a.ui-button:active, .ui-button:active, .ui-button.ui-state-active:hover{
        border-color: #AAAAAA;
}
.ui-tabs .ui-tabs-nav li.ui-tabs-active{
        padding-bottom: 0px;
        border-bottom: 1px solid #FFFFFF;
}

.ui-state-active a, .ui-state-active a:link, .ui-state-active a:visited{
        color: #2a2a2a
}
/********************************/
/* End of Styles for UI Dialogs */
/********************************/


/****************************************/
/* STYLES FOR CodeMirror EDITOR BOXES.  */
/****************************************/
div.CodeMirror{
    border: solid 1px;
    border-color: #ABADB3 #E3E9EF #E3E9EF #ABADB3;
    font-size: 12px;
}

div.CodeMirror-dialog{
    background-color: #EBEBEB;
    border: solid 1px;
    border-color: #ABADB3 #C0C0C0 #C0C0C0 #ABADB3;
    font-family: Arial, Verndana, sans-serif;
    padding-bottom:6px;
    padding-top:6px;
    left:auto;
    top:0px;
    float:right;
    width:5cm;
}
div.CodeMirror-dialog input{
    background-color: #FFFFFF;
    font-family:monospace;
}

div.CodeMirror-dialog span{
/* Hide unwanted text in the Search/Replace dialog. */
    display:none;
}

div.codemirror-jsro div.CodeMirror-scroll div,
div.codemirror-progressro div.CodeMirror-scroll div,
div.codemirror-coinscalcro div.CodeMirror-scroll div,
div.codemirror-htmlro div.CodeMirror-scroll div,
div.codemirror-xmlro div.CodeMirror-scroll div,
div.codemirror-cssro div.CodeMirror-scroll div
{
/* Inactive background for read-only versions of code editors. */
    background-color: #f3f3f3;
    cursor:default;
}

div.codemirror-jsro .CodeMirror-activeline-background,
div.codemirror-progressro .CodeMirror-activeline-background,
div.codemirror-coinscalcro .CodeMirror-activeline-background,
div.codemirror-htmlro .CodeMirror-activeline-background,
div.codemirror-xmlro .CodeMirror-activeline-background,
div.codemirror-cssro .CodeMirror-activeline-background{
/* Make the active line the same as the background on read-only editors. */
    background-color: #f3f3f3 !important;
}

span.CodeMirror-matchingbracket{
    color: #0000ff !important;
}

/* suppress TINYMCE branding */
span.tox-statusbar__branding {
  display:none;
}

/******************************************/
/* END OF STYLES FOR CodeMirror EDITORS.  */
/******************************************/

/*********************************/
/* SCROLL STYLES     */
/*********************************/

th.scroll, th.scrollcurrent, th.scrollsortable{
    /*font-weight:bold;*/
}

tr.bodyhead th.scroll{
    border: 1ps solid #4a4a4a;
}

tr.bodyhead th.scroll:last-of-type{
        border-right: #FFFFFF;
}
tr.bodyhead th.scroll:hover,
table.browse th.scrollcurrent:hover,
table.browse th.scrollsortable:hover{
/* Because of collapsed borders, the left border = right border of previous cell, so doesn't
change on hover. So I've used an internal box shadow of 1px */
        -webkit-box-shadow: inset 1px 0px 0px 0px rgba(255,255,255,1);
        -moz-box-shadow: inset 1px 0px 0px 0px rgba(255,255,255,1);
        box-shadow: inset 1px 0px 0px 0px rgba(255,255,255,1);
        border-right: #ffffff 1px solid;
}

div.srt-draghandle:hover{
/* The line that you 'grab' when dragging resizable columns */
    border-right: 1px solid #4a4a4a;
    border-left: none;
/* The extension of the line into the column header */
    background-image: url(wousvg.p?style=v1105&icon=slider_top$.svg&colour=%23ffffff);
    background-repeat: no-repeat;
    background-position: top right;
    background-size: 1px 32px;
}

tr.scrollodd td.undl, tr.scrolleven td.undl{
    border-top-color:black;
    border-top-width:2px;
}

td.blue{
    background-color: #B5CEE7;
}

td.bluefont{
    color: #2C326A;
}

tr.scrollodd td.red, tr.scrolleven td.red{
    background-color: #F48E86;
}

tr.scrollodd td.amber, tr.scrolleven td.amber{
    background-color: #FBDB90;
}

tr.scrollodd td.green, tr.scrolleven td.green{
    background-color: #A6CB85;
}

tr.scrolleven a.td, tr.scrollodd a.td{
    height:12px;
}

/*********************************/
/* END OF SCROLL STYLES      */
/*********************************/


TD.rednh {
    font: normal;
    background: red;
    line-height: 1.5em;
    padding-left:0.1em;
    padding-right:0.1em;
}

TD.bluenh {
    font: normal;
    background: blue;
    line-height: 1.5em;
    padding-left:0.1em;
    padding-right:0.1em;
    color: #FFFFFF;
}

TD.bluenh A.td {
    color: #FFFFFF;
}
TD.purplenh {
    FONT: normal;
    background: #D3B8E2;
    line-height: 1.5em;
    padding-left:0.1em;
    padding-right:0.1em;
}

TD.gridplugged{
    font-size: 0.7em;
    text-align : right;
    background-position:top right;
    background-repeat:no-repeat;
        background-image: -ms-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background-image: -webkit-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background: linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
}


td.matrixodd-inp {
    font: normal;
        background-image: -ms-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background-image: -webkit-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background: linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    height: 24px; line-height: 1.1em;
    padding-left:0.2em;
    padding-right:0.2em;
}

td.matrixeven-inp {
    font: normal;
        background-image: -ms-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background-image: -webkit-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background: linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    height: 24px; line-height: 1.1em;
    padding-left:0.2em;
    padding-right:0.2em;
}

table.context{
    border-bottom:solid 1px #E9E9E9;
}

td.contextlabel {
    font: bold; 
    padding-right:0.5em;
    padding-top:6px;
    padding-bottom:6px;
}
TD.contextdata {
    background: #FFFFFF;
}
td.contextlabel table tr td {
  vertical-align:middle;
/*  padding-top:1px;*/  /* ?? Removed as it was affecting the Options button*/
}
td.contextbutton{
    width:1%;
    text-align:right;
    white-space: nowrap;
}

td.contextcollabel {
  font-size: 13px;
  padding-left: 12px !important;
  font-weight: normal;
}

td.contextcoldata {
  position: relative;
  font-size: 13px;
  padding-left: 12px;
}

td.contextcoldata:before {
  content: '';
  background: white;
  position: absolute;
  bottom: 0px; 
  width: 1px;
  height: 4px;
  left: -1px;  
}

td.contextcoldivider {
  border-left: solid 1px #E9E9E9 !important;
}

td.contextcolnarrow {
  width: 1%;
  padding: 0px 0px 0px 3px !important;

}

div.contextcolbadge {
  background: #4a4a4a;
  color: #ffffff;
  position: relative;
  top: -5px;
  width: 36px; 
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center; 
  justify-content: center;
}

td#mbutn{
    vertical-align:bottom;
}

TD.d1 {
    font-size: 8pt; background: #FFFFFF; line-height: 1;
}

TD.d2 {
    font-size: 8pt; background: #F3F3F3; line-height: 1;
}
TD.formdata {
    font-weight: bold; 
    background:transparent; 
    line-height: 1.2; 
    padding-bottom:1px;
    padding-right:6px;
    border: none;
}


TD.formdata strong, TD.formdata b {
        font-weight: bolder;
        /* Formdata text is already bold; make bold text bolder */
}

table.dislookup{display:inline}

/* To align input fields with the label and lookup button.. */

td.forminline {
  padding: 0px
}

td.formdata input[type='checkbox']{
  vertical-align:middle;/* Updated for Mantis 10007*/
}

img.button {
    vertical-align:middle;
    height: 24px;
        width: 24px;
}
/* This is to re-align the lookup button with the field */

table.multiselect br{line-height:0}
table.multiselect img{vertical-align:text-bottom} /* Mantis 10007 */
table.multiselect td{border:none}

td.formdata var.datalookup {
    vertical-align:4px;
    padding-left:6px;
    font-style: normal;
}

td.formdata div iframe{
/* To put a border round the documentation topic editor  */
    border:solid 1px #e2e3ea;
}

/* To align radio button labels with the button .. */

label{
    vertical-align:4px;
}

TD.formdatahighlight{
    font: normal;
    padding-left:0.5em;
    font-weight:bold;
    background-color: #FFFF00;
}

/* it was following color for highlighting #FFD700 */

TD.formdatahighlight  INPUT.dec, TD.formdatahighlight INPUT.decdisabled{
    font: normal; 
    padding-left:0.5em;
    font-weight:bold;
    background-color:  #FFFF00;
    background-image:none;
}

TD.formblank, td.formlayoutblank {
    font-weight: normal;
    font-size: 0.7em; 
    background-color:transparent; 
    height: 0px;  /* 10px - iframe padding!! */
    padding:0px;
}

TD.formlabel{
    font-weight: normal ;
    background:transparent;
    padding:0px;
    padding-right: 12px;
    padding-bottom:1px;
}

TD.formexpanddata TD.formlabel{
    background:transparent;
/* Added to solve problem with wrong colour in TD.formexpanddata
   (e.g. on Selection lists).  */
}

/* Styles for labels on dynamic filters */
td.dynamicfilter{
    text-align:right;
    padding-right: 12px;
}

td.dynamicfilter select{
    direction:rtl; /* To put the arrow buttons on the left */
    margin-right:6px;
    /* Needs to be the same colour as the background of the filter*/
    margin-right:0px;
}

/* Different colour for dynamic filters on forms */
td.formbg td.dynamicfilter,
td.formbg td.dynamicfilter select{
/*    background-color: #F3F3F3;*/
}

/* End: labels on dynamic filters */


TD.formlabelalert {
    font-weight: normal; 
    color: red; 
    padding-right:0.5em;
}

td.formlabelalertlaya {
    font-weight: normal; 
    color: red; 
    padding-right:0.5em;
}

TD.formlabelsubtitle {
    font: bold; 
    color: #FFFFFF; 
    background: #BBBBBB; 
    padding:3px;
}
TD.formdataalert {
    font-weight: bold; 
    color: red; 
    line-height: 1.2; 
    padding-left:0.5em;
}
TD.formdataalertbold {
    font-weight: 700; 
    color: red; 
    line-height: 1.2;
    padding-left:0.5em;
}
td.formdataalertboldlaya {
    font: bold; 
    color: red; 
    background: #EEF3F8; 
    line-height: 1.2;
    padding-left:0.5em;
}

TD.formdatafixed {
    font: normal courier; 
    background: #F3F3F3; 
    line-height: 1.2; 
    padding-left:0.5em; 
    white-space: pre;
}
TD.formdatabold {
    background:transparent; 
    font-style: normal;
    line-height: 1.2; 
    padding-left: 0.5em;
}

td.formdatabold var.data{font-style:normal}

td.formdatabolda {
    font-weight: bold;
    font-size: 1.2em; 
    line-height: 1.2; 
    padding-left:0.5em;
    padding-right:0.5em;
}
TD.formdatakpighost {
    font-size:0.8em;
    color: #F3F3F3;
    padding:3px;
}
TD.formdatanorm10 {
    font: normal 1em/1; background: #F3F3F3; line-height: 1.2;
      padding-left:0.5em;
}
TD.formdatasubtitle {
    font: bold; 
    color: #FFFFFF; 
    background: #BBBBBB;
    padding:3px;
}
TD.formsubheader {
    font: normal /*0.7em*/; background:transparent; line-height: 1.2;
    padding-left:3pt; padding-right:3pt;
}
td.formsubheaderalertbold {
    font: bold; color: red; background: #F3F3F3; line-height: 1.2;
    padding-left:0.5em;
}

/* Changed background from F3F3F3 to E1E1E1 for selection 
   area below a browse; are these classes used elsewhere? */

TD.formselectionlabel {
    font: normal;
    color:black;
    padding-right: 9px;
    background: #FFFFFF;
}
TD.formselectiondata {
    font: bold;
    color:black;
    background: #FFFFFF;
}
TD.formselectioninput {
    font: bold 50%;
    color:black;
    background: #FFFFFF;
}
TD.formselectionblank {
    font-size: 6pt;
    background: #FFFFFF;
}

TD.confirm {
    font: bold; background: #F3F3F3;   padding-right:0.5em;
}

TD.buttonbar {
        background-color: #FFFFFF;
    background-image: -webkit-linear-gradient(#FFFFFF, #FFFFFF, #FFFFFF, #E7E7E7);
    background-image: -ms-linear-gradient(#FFFFFF, #FFFFFF, #FFFFFF, #E7E7E7);
    background: linear-gradient(to bottom, #FFFFFF, #FFFFFF, #FFFFFF, #E7E7E7);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#ffffff', EndColorStr='#E7E7E7');
    line-height: 1;
    font-weight:normal;
    height:36px;
    border-top: #E9E9E9 1px solid;
}

body.login td.buttonbar{
    background-color:transparent;
    width: 640px;
}

TD.buttonbar IMG{
  vertical-align:bottom;
  vertical-align:middle; 
  /*Trying to align selectors in button bar - not sure why this was "bottom" */

}

TD.buttonbar input, TD.buttonbar select{
    vertical-align:middle;
}

td.filterbar, td.filterbar td.buttonbar{
    background-color: #FFFFFF;
    background-image:none;
    filter:none;
}

td.filterbar, td.filter{
    border-top:1px #a5a5a5 solid;
    border-bottom:1px #a5a5a5 solid;
    /* Bottom border same as background; added so that the filter
      button aligns with the filter bar. */
}

TD.filter, table#advancedFilter {
    /*font-size: 8pt;*/ 
    background-color: #FFFFFF; 
    line-height: 1; 
    padding: 0px;
}

td.filter th{
    background-color:transparent;
    color: #000000;
    font-weight:bold;
    border:none;
    border-bottom:1px solid #C9C9C9;
}

td.filter td.formselectionblank{
    background-color: #FFFFFF;
}

TD.banner {
    /*font-size: 8pt; line-height: 1;
    background-color: #F3F3F3;
    background-image: url(imgs/gradient.gif);
    background-repeat: repeat-x;
    color: #000066;
    font-weight : bold;*/
    background-color:pink;
    /* I don't think this is used so I've highlighted it pink! */
}

td.sidemenu {
    font-size:10pt;
    color : Gray;
}

td.sidemenusub {
    font-size:10pt;
    font-style : italic;
    color: #000066;
    font-weight:bold;
}
td.sidemenutitle{
    color: #ffffff;
    font-weight:bold;
}

TD.topTitle {
    font-size : 1.2em;
    font-weight : bold;
}

TABLE.headertitle {
    border-collapse:collapse;
}
TR.headertitle {
    color: #4E4E4E;
    background: #FFFFFF;
    padding-left:0.2em;
    padding-right:0.4em;
    height:24px;
    font-weight: normal;
    /*font-family:Arial;*/
    background-color: #FFFFFF;
}

TD.headertitle {
    padding:0px;
    padding-right: 0.5cm;
    BORDER-color: #FFFFFF;
    font-size:1.1em;
}

td.headertitle.menu-control {
        padding-right: 0px;
}
td.headertitle.menu-control button{
    padding-right: 0px;
    /*background-color: #4a4a4a;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;*/
    height: 26px;
    width: 18px;
    outline: 0px;
}

td.headertitle.menu-control img{
        vertical-align: middle;
                height: 24px;
                width: auto;
                margin-left: -4px;
}

div#logo img{
    height:34px;
    width: 116px;
        vertical-align:bottom;
}

/* Adapted from CCD stylesheet */

td.headertitle ul {
    list-style: none;
    padding: 8px 10px 15px 10px;
    margin: 0;
    cursor: default;
}

td.headertitle li {
    border-top: 1px solid #D8D8D8;
    border-bottom: 1px solid #D8D8D8;
    float: left;
    position: relative;
    margin-right: 7px;
}

td.headertitle li img {
  height: 21px;
}

td.headertitle li.link:hover {
    border-color: #B8B8B8;
}

td.headertitle li span:before,
td.headertitle li span:after,
td.headertitle li.link:hover span:before,
td.headertitle li.link:hover span:after
{
    display: block;
    position: absolute;
    width: 13px;
    height: 100%;
    top: 0;
    content: '';
    background-image: url(/coins/devstage/20230228063043/skin/v1105/images/breadcrumbs_arrow.svg);
    background-size: 50px 35px;
    background-repeat: no-repeat;
/* Adjustments to try to get the arrows to join better to the top/bottom borders. */
background-size: 39px 26px;
height: 26px;
top: -1px;
}

td.headertitle li span:before {
    left: 0;
}

td.headertitle li span:after {
    right: -13px;
}

td.headertitle li span:before,
td.headertitle li span:after {
    background-position: -0.5px 0px;
}

td.headertitle li.link:hover span:before,
td.headertitle li.link:hover span:after {
    background-position-x: -28px;
}

td.headertitle li:first-child {
    border-left: 1px solid #D8D8D8;
    width: 24px;
}
td.headertitle li:first-child img{
    height: 24px;
        width: 24px;
        position: absolute;
        top: 0px;
        left: 0px;
}
td.headertitle li:first-child span:before,
td.headertitle li:last-child span:after {
    display: none;
}

td.headertitle li:last-child {
    border-right: 1px solid #D8D8D8;
    margin-right: 0px;
}

td.headertitle span{
    display: block;
    padding: 7px 12px 0px 25px;
    text-decoration: none;
    font-size: 1.083em;
    color: #2a2a2a;
    height: 26px;
    line-height: 17px;
    /*cursor: pointer;*/
}

td.headertitle li span{
    font-size: 12px;
    height: 18px;
    line-height: 12px;
    padding: 6px 10px 0px 15px;
}

td.headertitle li.link:hover span {
    color: #3A3A3A;
}

td.headertitle li.company-selector span {
    padding-top: 1px;
    padding-bottom: 5px;
    padding-left: 6px;
}
td.headertitle li.company-selector span#singleCompany {
   padding-top: 6px;
}
td.headertitle li.role-selector span {
    padding-top: 1px;
    padding-bottom: 5px;
    padding-left: 6px;
}

/* End of adapted styles */

td.headertitle li:before,
td.headertitle li:after{
    /*display: block;
    position: absolute;
    width: 13px;
    height: 100%;
    top: 0;
    content: '';
    background-image: url(/coins/devstage/20230228063043/skin/v1105/images/breadcrumbs_arrow.png);
    background-repeat: no-repeat;
*/}

td.headertitle li:before, 
td.headertitle li:after{
    /*background-image: none;
*/}
table.frame td.headertitle div.styled-select{
        background-image: none;
        padding-top: 5px;
} 



td.headertitle li:first-of-type span{
    padding-left: 5px;
}



td.headertitle li:first-child:before,
td.headertitle li:first-child:after{
    background-image: none;
}

td.headertitle select{
    height: 24px;
    border: none;
    color: #2a2a2a;
    font-size: 12px;
    font-weight: normal;
}

div.banner{
  display:inline-block;
  white-space:nowrap;
}

div.banner div{
    display: inline-block;
    vertical-align: middle;
    margin-left: 3px;
    margin-right: 3px;
}

div.banner img{
    vertical-align: middle;
}

div.banner img:hover, div.banner div#user-header:hover{
    background-color: #EEEEEE;
    border-radius: 3px;
}

div#menu_closed img{
  height:24px;
  width: 24px;
}
div#reports img{
    height: 24px;
    width: 24px;

}

div.accountimage {
    width: 34px;
    height: 34px;
    margin: 0px 0px 0px 0px;
    float: right;
    border-radius: 50%;
    background-size: cover;
}


TD.formbg {
    /*background: #B5CEE7;*/ 
    /*line-height: 1;*/
    background-color: #FFFFFF;
    padding:0px;
    border: 1px solid #A8A8A8; 
    border: none; /* To remove borders on browse tables; does this affect anything else? */
}

TD.formbg TABLE{
/* Removes empty space BETWEEN table cells */
    border-collapse:collapse;
}


TABLE.editorbuttons{
    background-color: #F4F4F7;
    border:outset 1pt silver;
}

TABLE.editorbuttons TD{
    font-size:1pt;
}

TABLE.editorbuttons img{
}

TABLE.editorbuttons td select{
    font-size:7pt;
}

TABLE.gridcomplete {
  background-color: green;
}

TH {
    font-weight: normal;
    color: #FFFFFF;
    background-color: #BBBBBB;
    padding-left:0.2em;
    padding-right:0.2em;
}




VAR.reminder {
    font-weight: bold;
}
VAR.data {
}
VAR.datahidden, VAR.datainvisible,
td.formdatainvisible, td.formlabelinvisible{
  display:none;
}

var.addtype{
    font-style:normal;
}
var.addtype img{
    vertical-align:middle;
}
var.addtype select{
     margin-left:3pt;
}


VAR.dec {
    text-align : right;
}

VAR#statusLine{
    font-style: normal;
    font-size:1em;
    padding-right:2em;

}

VAR.formlabel{
    font-weight: normal;
    font-style: normal;
    background:transparent;
    padding-right: 6px;
    padding-left: 6px;
}

VAR.formexpandlabel {
    font-weight: normal;
    font-style:normal;
    padding-right:0.5em; 
    line-height: 1;
}

var.formselectionlabel{
    font-style:normal;
    vertical-align:-4px;
 /* Added to stop second label in a selector (following
  select.selectioninput) being raised above the line. */
}

/* Classes for scrolling text boxes */
VAR.datascroll40 {
    height:40px;
    display:block;
    width:100%;
    overflow:auto;
}
VAR.datascroll75 {
    height:75px;
    display:block;
    width:100%;
    overflow:auto;
}
VAR.datascroll100 {
    height:100px;
    display:block;
    width:100%;
    overflow:auto;
}
VAR.datascroll150 {
    height:150px;
    display:block;
    width:100%;
    overflow:auto;
}
VAR.datascroll200 {
    height:200px;
    display:block;
    width:100%;
    overflow:auto;
}

var.datawidth400 {
  width: 400px;
}
var.datawidth600 {
  width: 600px;
}
var.datawidth800 {
  width: 800px;
}
var.datadisabled {
  background: #f3f3f3;
}

var.dataalert {
    color: #F48E86;
}

var.datablock {
  display: block;
}

var.databolder {
  font-weight: 1000;
}

var.datasmall {
  font-size: 10px;
}

var.datalabel {
  font-weight: normal;
  font-style: normal;
  padding: 0 5px 0 5px;
}

.alert {
    color: #FF0000;
}

.early {
    color: #00CC00;
    font-weight: bold;
}

.ontime {
    color: #00CC00;
    font-weight: bold;
}

.late {
    color: #FF0000;
    font-weight: bold;
}


.disabledlabel
{
    color: #999999;
}

td.nonworking{
    background-color: #F3F4A4;
}
td.recordtwo{
    background-color: #CEC8F7;
}


.button_n{
    border:solid 1px #F3F3F3;
    background-color: #E7E7E7;
    padding:4px;
    text-align:center;
    font-weight:normal;
    border-top-color: #CBCBCB;
  /* Top border to match line on button bar bg. image */
    border:none;
    background-color: #f3f3f3;
    border-top: solid 1px #CBCBCB;
}

.button_h{
    padding:4px;
    text-align:center;
    cursor:pointer;
    font-weight:normal;
    background-color: #E7E7E7;
    border:none;
    border-top: solid 1px #CBCBCB;
}

.button_d{
    border:solid 1px;
    background-color: #F3F3F3;
    border-top-color:black;
    border-left-color:black;
    border-right-cOlor: #FFFFFF;
    border-bottom-color: #FFFFFF;
    padding:4px 4px 4px 4px;
    text-align:center;
    cursor:pointer;
    font-weight:normal;
    border:none;
    border-top: solid 1px #CBCBCB;
}
  
/* Coloured Text Buttons */

td.formdatabtnred{
    font-weight: normal;
    line-height: 1.2;
    padding:3px;
    margin-top:1px;
}


/* these mandatory background colours must be after the earlier
   disabled with lookup style as the mandatory colour
   needs to override the disabled colour */
.mandatory {
    background-color:#EFF4FA;
}

.mandatory:hover{
    background-color: #E5EDF5;
}

table.bodysel td.formselectionblank{
    height:6px;
}

textarea.l {
    border-left-width: 4px;
    padding-left: 2px;
    margin-left: -3px;
}

TEXTAREA.mandatory{
    background-color: #EFF4FA;
}
TEXTAREA.mandatoryl {
    background-color: #EFF4FA;
}

SUP.mandatory {
    display:none;
    color: red;
    margin-left:0.3em;
}   


td.buttonbar td.buttonbar{
/* There seem to be nested td.buttonbars so this removes the image */
    background-image:none;
    background-color:#FFFFFF;
}

td#mbutn{
/* To override style on Options button, otherwise it looks silver */
    background-color: transparent;
    border-top:none;
    padding-left: 9px;
    padding-right: 9px;
    vertical-align:middle;
}

td.button_h img, td.button_d img, td.button_n img{
    margin-left:3px;
    height: 24px;
    width: 24px;
    vertical-align: middle;
}


/* Styles for Options menu items */

DIV#EventList{
    z-index: 4; /* To bring it in front of tab menus */
}

.menubody{
    position:absolute;
    top:0;
    left:0;
    overflow:auto;
    overflow-x:hidden;
    background-color: #FFFFFF;
    -moz-box-shadow:1px 1px 9px rgba(0,0,0,0.4);-webkit-box-shadow:1px 1px 9px rgba(0,0,0,0.4);box-shadow:1px 1px 9px rgba(0,0,0,0.4);-ms-filter:"progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true)";filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=1,OffY=1,Color=#66000000,Positive=true)
}

div.option{
        color: #2a2a2a;
}

.menuitem, .menuitemover, 
div.popupmenu div.option {
    display: block;
    padding: 6px 12px 1px 6px;
    height: 24px;
    border-bottom: 1px solid #EDEDED; /* SAME AS table.popuplist td */  
}

div.popupmenu div.title img{
        height: 24px;
        width: 24px;
        vertical-align: middle;
        margin-right: 12px;
}

button#savewidths img{
        margin-left: 6px;
        margin-right: 0px;
}

button#resetwidths img{
        margin-left: 0px;
        margin-right: 0px;
}
div.popupmenu div.optionicon img{
        max-height: 24px;
        height: auto;
        width: 24px;
        vertical-align: middle;
        padding-right: 6px;
}

div.popupmenu a{
        color: #2a2a2a;
}

div#browsepopup, div#userpopup{
        z-index: 9999;
}

div#browsepopup div.option,
div#userpopup div.option{
/* Options with icons get aligned differently */
        padding-top: 4px;
        padding-bottom: 4px;
}

div#userpopup a div.option{
/* Reset padding if it's in an anchor! */
        padding-top: 6px;
        padding-bottom: 1px;
}

div#browsepopup div.columnset{
    padding-top: 8px;
        padding-bottom: 0px;
}

div.optionitem {
  display:inline-block;
  vertical-align: middle;
}

div.optionitem img {
  height: 24px;
}

div.actions {
  background-color: #E45858;
  border-radius: 50%;
  color: #FFFFFF;
  height:16px;
  text-align: center;
  width: 16px;
}

.menuitem{
    color: #000000;
}

.menuitemover,
div.popupmenu div.option:hover {
    cursor:pointer;
    color: #000000;
    background-color: #EEEEEE; 
}

div#browsepopup div.optionitem{
    vertical-align: middle;
}

div#browsepopup div.option.selected{
        font-weight: bold;
}

/* Styles to hide current item in list and make title look like current item */
div#browsepopup div.option.selected{
                display: none;
}
div#browsepopup div#currentcolset{
    font-weight: bold;
    color: black;
    background-color: rgba(66,73,88,0.1);
    padding-left: 48px;
    padding-top: 8px;
    padding-bottom: 0px;
}

div#browsepopup div#currentcolset button{
    margin-top: -2px;
}

div#browsepopup div#currentcolset:hover{
    background-color: #EEEEEE; 
}

/* End*/


div#browsepopup div.option.selected button:first-of-type{
        margin-left: 12px;
}

div#browsepopup div#columnset{
        padding-left: 48px;
}


.menuheader, div#browsepopup div.title, div#userpopup div.title{
    background-color: #4a4a4a;
    color: #ffffff;
    margin-left:0px;
    margin-right:0pt;
    padding-top:10px;
    padding-bottom:3px; 
    padding-left:6px; 
    height: 24px;
    font-weight: 300;
}

img.popupover{
    vertical-align:text-bottom;
    background-color: #6699cc;
}

img.popupout{
    vertical-align:text-bottom;
    background-color: #F3F3F3;
}


img.menuicon {
 vertical-align:middle;
 display:none;
}

img.dm_card{
 border: solid 1px #333333; 
 box-shadow: 5px 10px #888888;
}                

td.folder a, td.function a, td.hover-function a, td.hover-folder a {
  text-decoration:none;
  color: #FFFFFF;  /* This was black; chanaged to white for page menus; is it used elsewhere? */
  white-space:nowrap;
}


/************************************************************/
/*    STYLES FOR "TAB MENUS"    */
/*    dropmenu DIVs are the first level (tab style) items.  */
/*    popup DIVs are the remaining level items.     */
/************************************************************/

/*  New styles for dropdown tab menus */

div.popup, div.selectedpopup{
    background-color: #ffffff;
    border-left: 1px solid #E9E9E9;
    border-right: 1px solid  #C0C0C0;
    padding: 0px 6px;
    -webkit-box-shadow: 10px 10px 26px 0px rgba(207,201,207,1); -moz-box-shadow: 10px 10px 26px 0px rgba(207,201,207,1); box-shadow: 10px 10px 26px 0px rgba(207,201,207,1);
}

div.popup:hover, div.selectedpopup:hover{
    background-color: #EEEEEE;
}

div.popup.firstitem, div.selectedpopup.firstitem{
    border-top: 1px solid #E9E9E9;
}

div.popup.lastitem, div.selectedpopup.lastitem{
    border-bottom: 1px solid #C0C0C0;
}

table.endpopup{
    display: none;
}

div.selectedpopup{
    font-weight: bold;
}

div.droptitle{
    font-weight: bold;
    margin: 6px 3px;
}

td.submenu{
        padding: 0px;
}

/*  End of new styles for dropdown tab menus */

td.fonticon, td.fonticon table tr td{
 font-family: "coinsicons";
 font-size: 20px;
}

td.fonticon a{
    text-decoration: none;
    color: black;
}
/*
td.fonticon select, td.fonticon select option{
    font-size: 24px;
    margin: 6px;
}*/

td.icon{
    display:none;
/*   
    background-image:url(imgs/ddmenuside.gif);
    background-repeat:repeat-y;
    border-right:solid 1px #6699CC;
    width:25px;
    height:22px;
    padding:0px;
    cursor:default;
*/    
    /* You can't click the icon */
}

div.selectedpopup td.icon{
/* Border on selected menu item pushes the image right 1px so */
/* need to compensate. */
    width:24px;
}

td.icon img{
/* "display:none" or "visibility:hidden;" here would hide the menu icons */
}

table.endpopup {
/* Bottom border of popup menu */
    background: #C0C0C0;
    height:1px;
}

table.breakpopup{
    height:1px;
    background-color:gray;
    font-size:1px;
}

table.breakpopup td.icon{
    height:1px;
    width:25px;
    padding:0px;
}

div.hover-popup td.icon, div.hover-selectedpopup td.icon{
    background-image:none;
    background-color: #FFDFA0;
    border-right-color: #FFDFA0;
}

/**********************************/
/* End of styles for "tab menus"  */
/**********************************/

/**********************/
/*  Home Page Styles  */
/**********************/

div.homepage{
    background-color: #fbfbfb;
    margin: 0pt;
    width: 100%;
    height:90%;
}

div.homepage A{
    font-weight: bold;
    text-decoration: none;
}

div.homepage A:hover {
    color: #2a2a2a;
    text-decoration: underline;
}

table.hpmesbrd, table.hplinkscontainer,table.hprss{
    width:100%;
    border-collapse: collapse;
        font-weight: bold;
}

div.hpenvtxt,div.hpmodtxt,table.hpmesbrd{
    margin:0px;
}

table.hplinkscontainer, table.hprss{
    margin:0px;
}

div.homepage br{
    line-height:6px;
}

div.homepage td.headertitle{
    padding-top:6px;
}

div.hpenvtxt{
    background-color: #FFFFFF;
    border: #FFFFFF solid 1px;
    padding:6px;
}

div.hpmodtxt{
    background-color: #fbfbfb;
    padding:6px;
}

div.hpmodtxt IMG.logo{
    float:left;
    height:60px;
    width:60px;
    margin-right:6pt;
}
div.hpmodtxt ul,div.hpmodtxt ol{
/* This is to prevent the bullets overlapping a floated image. */
    overflow:hidden;
}

div.hpmodtxt TABLE{
  width: 100%;
}

div#search button,
div#inlinemanual button,
div#desktop button{
        border: none;
        background-color: transparent;
}

div#search button:hover,
div#desktop button:hover{
        background-color: #EEEEEE;
        border-radius: 3px;
}


div.homepage H2{
    font-weight:normal;
    color: #A4A4A4;
    font-size:20px;
    margin-top: 18px;
}

table.hplinkscontainer{
    border-collapse:separate;
    margin-left: 14px;
    margin-right:14px;
    width: 99%;

}

table.hplinkscontainer td{
    width:30%;
    height:100%;
    padding:0pt;
    vertical-align:top;
}

table.hplinkscontainer td{
/* Similar to layout styles */
    background-color: #FFFFFF;
    border: solid;
    border-color: #E9E9E9;
    border-width: 1px 3px 3px 1px;
    padding: 6px 6px 16px 6px;

}

table.hplinkscontainer div.hptitle{
    font-size: 1.2em;
    font-weight: bold;
}

table.hplinkscontainer td.spacer{
    width:1%;
    background-color:transparent;
    border:none;
}

div.hplinks ul{
    padding-top:6pt;
    list-style-type:none;
}

div.hplinks ul li:before {
    display: inline-block;
    font-size: 1em;
    margin-left: - 1.5em;
    height: 2em; 
    width: 1.5em;
    content: url(/coins/devstage/20230228063043/skin/v1105/images/favourites.svg);
    vertical-align: middle;
}

table.hplinkscontainer{
    padding:0px;
}

table.hprss td, table.hpmesbrd td{
    padding:3pt;
    height: 30px;
    border-bottom:1px solid #CCCCCC;
}
body.homepage table{
    border-collapse:collapse;
}

div.homepage th.hptitle{
    background-color: #FFFFFF;
    color: #2a2a2a;
    font-size: 1.2em;
    font-weight:bold;
    height:36px;
    padding-left:6px;
    padding-right:8px;
    padding-top:14px;
    text-align:left;
    text-align:left;
}

div.homepage th.hptitle button:hover{
    background-color: rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);
}

div.homepage div.hptitle img,
div.homepage th.hptitle img{
    float:right;
}

div.homepage DIV.hptitle{
    font-weight:bold;
    text-align:left;
    padding-left:6px;
    padding-top:12px;
    padding-right:8px;
    height:26px;
}

div.homepage tr.colhead th,
div.homepage tr.colhead th{
    background-color: #4a4a4a;
    color: #ffffff;
    font-weight:bold;
    text-align:left;
    padding:12px ;
    height: 12px;
}

div.homepage tr.msgeven,
div.homepage tr.msgodd{
    background-color: #FFFFFF;
}

div.homepage tr.rsseven,
div.homepage tr.rssodd{
    background-color: #FFFFFF;
}

div.homepage tr.rsseven TD{
    border-bottom:none;
}

div.homepage TR.rssodd TD{
    border-bottom:none;
}

div.homepage TR.last TD,div.homepage tr.rssodd td.source,
div.homepage  tr.rsseven td.source{
    border-bottom:1px solid #CCCCCC;
}

/*****************************/
/*  End of Home Page Styles  */
/*****************************/

/* calendar popup */

#CalendarControlIFrame {
    display: none;
    left: 0px;
    position: absolute;
    top: 0px;
    height: 350px;
    width: 250px;
    z-index: 99;
}

#CalendarControl {
    position:absolute;
    background-color: #FFF;
    margin:0;
    padding:0;
    display:none;
    z-index: 100;
    -webkit-box-shadow: 5px 7px 43px 7px rgba(100,100,100,0.25);-moz-box-shadow: 5px 7px 43px 7px rgba(100,100,100,0.25);box-shadow: 5px 7px 43px 7px rgba(100,100,100,0.25);
}

#CalendarControl table {
    font-family: Lato, helvetica, verdana, arial, sans-serif;
    /*font-size:10px; */
    /*border-left: 1px solid #336;
    border-right: 1px solid #336;
    border-bottom: 1px solid #336;
*/}

#CalendarControl th {
    font-weight: normal;
        background-color: #FFFFFF;
        color: #2a2a2a;
        border-bottom: 1px solid #E9E9E9;
        font-size: 0.8em;
        padding-top: 6px;
        padding-bottom: 3px;
}

#CalendarControl th a {
    font-weight: normal;
    text-decoration: none;
    color: #2a2a2a;
    padding: 1px;
}

#CalendarControl td {
    text-align: center;
    height: 2.5em;
padding-left: 0.25em;
padding-right: 0.25em;
border-bottom: 1px solid #E9E9E9;
}

#CalendarControl .weekday,
#CalendarControl .weekend,
#CalendarControl .current {
    display: block;
    text-decoration: none;
    border: 1px solid #FFF;
    border: 5px solid #FFFFFF;
        width: 2em;
    height: 2em;
        line-height: 2em;
}

#CalendarControl .weekday {
    background-color: #FFFFFF;
    color: #2a2a2a;
}

#CalendarControl .weekend {
    background-color: #EEEEEE;
    border-color: #EEEEEE;
    color: #2a2a2a;
}

#CalendarControl .current {
    background-color: #4a4a4a;
        border-radius: 50%;
        color: #FFF;
}

#CalendarControl .weekday:hover{
    background-color: #EEEEEE;
        border-radius: 50%;
}

#CalendarControl .weekend:hover{
        background-color: rgba(66,73,88,0.1);
        border-radius: 0%;
        border-color: rgba(66,73,88,0.1);
}

#CalendarControl .current:hover{
        background-color: #4a4a4a;
}

#CalendarControl .header {
    background-color: #4a4a4a;
        color: #ffffff;

}
#CalendarControl tr.header td{
        font-family: Lato;
        font-size: 1.2em;
        padding-left: 3px;
        padding-right: 3px;
}

#CalendarControl tr.header td.next a,
#CalendarControl tr.header td.previous a{
        color: #ffffff;
        font-size: 2em;
        font-weight: 200;
        line-height: 1em;
        text-decoration: none;
    padding-left: 3px;
        padding-right: 3px;
}

#CalendarControl tr.header td.next a:first-of-type,
#CalendarControl tr.header td.previous a:last-of-type{
/* To align the chevrons with the &gt; / &lt; signs */
        vertical-align: 2px;
}

#CalendarControl .previous {
    text-align: left;
}

#CalendarControl .next {
    text-align: right;
}

#CalendarControl .title {
    text-align: center;
    font-weight: bold;
}

#CalendarControl .empty {
    background-color: #FFFFFF;
}


td.oddboq, td.evenboq{
    background-color: #FFFFFF;
    border-style:none solid none none;
    border-right-color: #AAAAAA;
    border-right-width:1px;
    vertical-align:text-top;
    padding:3;
}

td.oddboqheading, td.evenboqheading{
    background-color: #FFFFFF;
    border-style:none solid none none;
    border-right-color: #AAAAAA;
    border-right-width:1px;
    vertical-align:text-top;
    font-weight:bold;
    padding:3;
}
tr.oddselected td.oddboq, tr.oddselected td.oddboqheading, 
tr.evenselected td.evenboq, tr.evenselected td.evenboqheading{
    background-color: #FAD69A;
}

td.formsubheadersubtitle {
    font: bold verdana;
    color: #FFFFFF;
    background: #6699CC;
    padding-right:0.5em;
}

/* Portal Monitor styles */
td.formdatapmonhead{
    font-weight:bold;
        background-color: #F1F1F1;
    background-image: -webkit-linear-gradient(#FFFFFF, #4a4a4a);
    background-image: -ms-linear-gradient(#FFFFFF, #4a4a4a);
    background: linear-gradient(to bottom, #FFFFFF, #4a4a4a);
    filter: progid:DXImageTransform.Microsoft.gradient(startColorStr='#FFFFFF', EndColorStr='#4a4a4a');;
    border:solid 1px #C0C0C0;
    padding:3px;
}
td.formdatapmoncell{
    border:solid 1px #C0C0C0;
    padding:3px;
    background-color: #F3F3F3;

}
td.formdatapmoncell2{
    padding:0px;
    background-color: #F3F3F3;
}

td.formdatapmonlabel{
    border:solid 1px #C0C0C0;
    font-weight:bold;
    padding:3px;
}
td.formdatapmoninput{
    border:solid 1px #C0C0C0;
    padding:3px;
    background-color: #F3F3F3;
}
td.formdatapmondiff{
    border:solid 2px #FF0000;
    padding:3px;
    background-color: #F3F3F3;
}


/* CVR styles */
td.cvrtitle, td.formdatacvrtitle, td.formexpanddatacvrtitle{
    font-weight:bold;
    background-color: #BBBBBB;
    border:solid 1px #808080;
    padding:3px;
}

td.cvrhead, th.cvrhead, td.formdatacvrhead, td.formexpanddatacvrhead {
    font-weight:bold;
    background-color: #4a4a4a;
    background-position:50%;
    color: #ffffff;
    border:solid 1px #E9E9E9;
    padding:3px;
}

td.bqhead, td.formdatabqhead, td.formexpanddatabqhead{
    font-size:8pt;
    font-weight:bold;
    color: #FFFFFF;
    background-color: #5C5C5C;
    border:solid 1px #808080;
    padding:3px;
}

td.cvrrowtotal, td.formdatacvrrowtotal, td.formexpanddatacvrrowtotal{
    font-weight:bold;
    border:solid 1px #808080;
    padding:3px;
}

td.cvrrow, td.formdatacvrrow, td.formexpanddatacvrrow{
    border:solid 1px #808080;
    padding:3px;
}

td.boqupdrow, td.formdataboqupdrow, td.formexpanddataboqupdrow{
    border:solid 1px #808080;
    padding:1px;
}

td.mksmallupdrow, td.formdatamksmallupdrow, td.formexpandDatamksmallupdrow{
    border:solid 1px #808080;
}

td.mksmallupdrow, td.formdatamksmallupdrow nobr input, td.formexpanddatamksmallupdrow nobr input{
    font-style: Italic;
    padding:1px;
}

td.mksmallinpfield, td.formdatamksmallinpfield nobr input, td.formexpanddatamksmallinpfield nobr input{
    font-style: Italic;
    padding:1px;
}

td.cvrlabel, td.formdatacvrlabel, td.formexpanddatacvrlabel{
    border:solid 1px #808080;
    font-weight:bold;
    padding:3px;
}

td.cvrinput, td.formdatacvrinput, td.formexpanddatacvrinput{
    border:solid 1px #808080;
    padding:3px;
    background-color:yellow;
}

td.cvrwarning, td.formdatacvrwarning, td.formexpanddatacvrwarning{
    border:solid 1px #808080;
    padding:3px;
    background-color:#F48E86;
}

td.cvrrowwt, td.formdatacvrrowwt {
    background-color: #FFFFFF;
    border:solid 1px #000000;
    padding:3px;
}

td.cvrrowgy, td.formdatacvrrowgy{
    background-color: #8B7E66;
    border:solid 1px #000000;
    padding:3px;
}

td.cvrrowgr, td.formdatacvrrowgr{
    background-color: #BCED91;
    border:solid 1px #000000;
    padding:3px;
}

td.cvrsh30, td.formdatacvrsh30{
    background-color: #E35151; 
    border:solid 1px #000000;
    padding:3px;
}

td.cvrsh60, td.formdatacvrsh60{
    background-color: #FFCC00;
    border:solid 1px #000000;
    padding:3px;
}

td.cvrsh100, td.formdatacvrsh100{
    background-color: #67CD67;
    border:solid 1px #000000;
    padding:3px;
}

td.cvrrowa, td.formdatacvrrowa, td.cvrrowab, td.formdatacvrrowab{
    border: solid 1px #808080;
}

td.cvrsub, td.formdatacvrsub, td.formexpanddatacvrsub { 
    border:solid 1px #808080; 
    background-color: #E6E6E6; 
    padding:3px; 
}
    
td.cvrsubbold, td.formdatacvrsubbold, td.formexpanddatacvrsubbold {
    font-weight:bold; 
    border:solid 1px #808080; 
    background-color: #E6E6E6; 
    padding:3px; 
}
   
td.glenqtot, td.formdataglenqtot, td.formexpanddataglenqtot{
    border-bottom: solid !important;
}


td.glenqsubtot, td.formdataglenqsubtot, td.formexpanddataglenqsubtot{
    border-bottom: double !important;
}


td.glenqright, td.formdataglenqright, td.formexpanddataglenqright{
  text-align: right;
}

td.glenqleft, td.formdataglenqleft, td.formexpanddataglenqleft{
  text-align: left;
}


td.glenqcenter, td.formdataglenqcenter, td.formexpanddataglenqcenter{
  text-align: center;
}







tr.selected td[class^="cvr"],
tr.activerow:hover td[class^="cvr"]{
    opacity: 0.4;
}



/* Layout/Field Group styles */

td.formblock{
    background-color: #FFFFFF;
/*    padding:6px;    1027 added for padding but looks too wide when 
      it contains a browse inside an iframe.*/
}

div.formcontainer td.formblock{

}


/* Revised layout table */
td.formbg table.layout{
        border-collapse: separate;
        border-spacing: 10px 10px;
    background-color: #fbfbfb;
}

/*td.formbg table.layout > tbody > tr > td:not([class='formblank'])*/

tr.layoutrow > td{
    background-color: #FFFFFF;
    border: solid;
    border-color: #E9E9E9;
    border-width: 1px 1px 1px 1px;
    padding: 6px 6px 16px 6px;
}

tr.layoutrow > td.formgroup{
/*        background-color: transparent;
        border: none;*/
}

td.formbg table.layout table{
        border-collapse: collapse;
}

/* Default style with no name - no border */

td.formgroup td.layouttitle,
td.formexpandgroup td.layouttitle,
td.layoutbody td.formgroup td.layouttitle,
td.layoutbody td.formexpandgroup td.layouttitle{
    background:none;
    border:none;
    color: #000000;
    font-weight:bold;
    margin:0;
    padding:0px;
}

td.layoutbody td.formgroup td.layoutbody,
td.layoutbody td.formexpandgroup td.layoutbody{
    border:none;
}

/* LayA style = box with title */

/* Need to think about different layouts. Maybe they're all the same now! */

td[class^='formgrouplay'] table{
        background-color: #FFFFFF;
}

td[class^='formgrouplay'] td.layouttitle,
td.formexpandgrouplaya td.layouttitle,
td.formexpandgrouplayicon td.layouttitle,
td.layoutbody td[class^='formgrouplay'] td.layouttitle,
td.layoutbody td.formexpandgrouplaya td.layouttitle{
    height:7mm;
    /*border:solid 1px;
    border-color: #E9E9E9;
    border-right-width: 3px;
    border-bottom: none;
*/    font-weight:bold;
    padding-top: 12px;
        padding-bottom: 2px;
    font-size: 1.2em;
    padding-left: 18px;
}

td[class^='formgrouplay'] td.layoutbody,
td.formexpandgrouplaya td.layoutbody,
td.layoutbody td[class^='formgrouplay'] td.layoutbody,
td.layoutbody td.formexpandgrouplaya td.layoutbody{
}

td.formgrouplaybnotitle td.layouttitle{
        height: 0mm;
        padding: 0px;
        font-size: 1px;
}

td[class^='formgroup'].notitle > table > tbody > tr > td.layouttitle {
  display: none;
}

td[class^='formgroup'].top {
  vertical-align: top;
}

td[class^='formgrouplay'].nobg,
td[class^='formgrouplay'].nobg > table {
  background-color: #fbfbfb;
}

/* LAYICON - Layout with title underline and icon */
td.formgrouplayicon, 
td.formexpandgrouplayicon {
        vertical-align: top;
  padding-bottom: 8px !important;
}

td.formgrouplayicon td.layouttitle,
td.formexpandgrouplayicon td.layouttitle {
  border-bottom-style: solid;
  border-bottom-color: #E9E9E9; 
  border-bottom-width: 1px; 
  height: 36px;
  padding: 0px 0px 0px 6px;
}

td.formgrouplayicon i.layouticon,
td.formexpandgrouplayicon i.layouticon {
  padding-right: 6px; 
  padding-top: 1px;
  color: #4a4a4a;
  font-size: 22px;
} 

td.formgrouplayicon svg.layiconsvg,
td.formexpandgrouplayicon svg.layiconsvg {
  color: #4a4a4a;
  height: 24px;
  width: 24px;
  padding-top: 1px;  
} 

td.formgrouplayicon span.layicontitle,
td.formexpandgrouplayicon span.layicontitle {
  display: inline-block;
  vertical-align: top;
  padding: 5px 0px 0px 6px;
  height: 24px;
  font-size: 16px;
  font-weight: 600;
}

td.formgrouplayicon td.layoutbody,
td.formexpandgrouplayicon td.layoutbody {
  padding-top: 6px; 
} 


/* LayCompact = compact layouts */

td.formgrouplaycompact {
  padding: 0 !important;
}

td.formgrouplaycompactnb {
  padding: 0 !important;
  border: none !important;
}

td.formgrouplaycompact td.layouttitle,
td.formexpandgrouplaycompact td.layouttitle,
td.layoutbody td.formgrouplaycompact td.layouttitle,
td.layoutbody td.formexpandgrouplaycompact td.layouttitle,
td.formgrouplaycompactnb td.layouttitle,
td.formexpandgrouplaycompactnb td.layouttitle,
td.layoutbody td.formgrouplaycompactnb td.layouttitle,
td.layoutbody td.formexpandgrouplaycompactnb td.layouttitle {
  background: none;
  border: none;
  color: #000000;
  font-weight: bold;
  margin: 0;
  padding: 0px;
  font-size: 12px;
  padding: 2px 0 0 5px;
  height: auto;
}

td.layoutbody td.formgrouplaycompact td.layoutbody,
td.layoutbody td.formexpandgrouplaycompact td.layoutbody,
td.layoutbody td.formgrouplaycompactnb td.layoutbody,
td.layoutbody td.formexpandgrouplaycompactnb td.layoutbody {
  border:none;
}

/* LayXNoTitle = no border, transparent but no title,
 - less space above and below borders. Used for Service Orders */

tr.layoutrow > td.formgrouplayxnotitle{
    padding-bottom: 6px;
}

tr.layoutrow > td.formgrouplayxnotitle td.layouttitle{
    display: none;
}


/* LayNoBox - layout with no box, no title or anything */
td[class^='formgrouplaynobox'] table {
  background-color: #fbfbfb;
}

tr.layoutrow > td.formgrouplaynobox {
  padding: 6px 0px 6px 0px;
  border: none;
  background-color: #fbfbfb;
}

tr.layoutrow > td.formgrouplaynobox td.layouttitle {
  display: none;
}

tr.layoutrow > td.formgrouplaynobox > td.formdata {
  padding: 0px 0px 0px 0px;
}

td[class^='formgrouplaynobox'] td.formdata {
  padding: 0px 0px 0px 0px;
}


@media ignore{
/* Ingore all other layout styles */

/* LayB = bordered with transparent background */

td.formgrouplayb td.layouttitle,
td.formexpandgrouplayb td.layouttitle,
td.layoutbody td.formgrouplayb td.layouttitle,
td.layoutbody td.formexpandgrouplayb td.layouttitle{
    margin:0;
    background-color:transparent;
    border:solid 1px #A6A6A6;
    border-bottom:none;
    background-image:none;
    color: #000000;
    font-weight:normal;
    height:6mm;
    padding:3px;
}

td.formgrouplayb td.layoutbody,
td.formexpandgrouplayb td.layoutbody,
td.layoutbody td.formgrouplayb td.layoutbody,
td.layoutbody td.formexpandgrouplayb td.layoutbody{
    border:solid 1px #A6A6A6;
    border-top:none;
}

/* LayBNoTitle = bordered with transparent background
   but no title - less space above and below borders */

td.formgrouplaybnotitle td.layouttitle,
td.formexpandgrouplaybnotitle td.layouttitle{
    line-height:1px;
    margin:0;
    background-image:none;
    height:1mm; 
    /* Needed to override settings if this was nested */
    background-color:transparent;
    border:solid 1px #A6A6A6;
    border-bottom:none;
    color:transparent;
}

td.formgrouplaybnotitle td.layoutbody,
td.formexpandgrouplaybnotitle td.layoutbody,
td.layoutbody td.formgrouplaybnotitle td.layoutbody,
td.layoutbody td.formexpandgrouplaybnotitle td.layoutbody{
    border:solid 1px #a6a6a6;
    border-top:none;
    padding-bottom:6px;
}

/* LayC and LayD requested by Yan Llamas */

td.formgrouplayc td.layouttl,
td.formexpandgrouplayc td.layouttl{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_tl.gif);
    background-position:left top;
    }

td.formgrouplayc td.layouttr,
td.formexpandgrouplayc td.layouttr{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_tr.gif);
    background-position:right top;
}

td.formgrouplayc td.layoutbl,
td.formexpandgrouplayc td.layoutbl{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_bl.gif);
    background-position:left bottom;
}

td.formgrouplayc td.layoutbr,
td.formexpandgrouplayc td.layoutbr{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_br.gif);
    background-position:right bottom;
}

td.formgrouplayc td.layouttm,
td.formexpandgrouplayc td.layouttm{
    margin:0;
    background-color: #F3F3F3;
    border-top:solid 1px #0000C0;
}

td.formgrouplayc td.layoutr,
td.formexpandgrouplayc td.layoutr{
    background-color: #F3F3F3;
    border-right:solid 1px #0000C0;
}

td.formgrouplayc td.layoutl,
td.formexpandgrouplayc td.layoutl{
    background-color: #F3F3F3;
    border-left:solid 1px #0000C0;
}

td.formgrouplayc td.layoutbm,
td.formexpandgrouplayc td.layoutbm{
    background-color: #F3F3F3;
    border-bottom:solid 1px #0000C0;
}

td.formgrouplayc td.layoutm,
td.formexpandgrouplayc td.layoutm,
td.formgrouplayc td.layoutm table,
td.formexpandgrouplayc td.layoutm table{
    background-color: #F3F3F3;
}

td.formgrouplayc td.layoutm td.formdata,
td.formgrouplayc td.layoutm .formlabel,
td.formgrouplayc td.layoutm td.formsubheader,
td.formgrouplayc td.layoutm td.formblank{
    background-color:transparent;
}

td.formexpandgrouplayc td.layoutm td.formexpanddata,
td.formexpandgrouplayc td.layoutm .formexpandlabel,
td.formexpandgrouplayc td.layoutm td.formexpandsubheader,
td.formexpandgrouplayc td.layoutm td.formexpandblank,
td.formexpandgrouplayc td.formlayoutexpandblank,
td.formexpandgrouplayc td.formexpandblock table {
    background-color: #F3F3F3;
}

td.formgrouplayc td.layouttm,
td.formexpandgrouplayc td.layouttm {
    color: #FFFFFF;
    background-color: #3A3F8C;
    padding:3px;
}

td.formgrouplayd td.layouttl,
td.formexpandgrouplayd td.layouttl{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_tl.gif);
    background-position:left top;
}

td.formgrouplayd td.layouttr,
td.formexpandgrouplayd td.layouttr{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_tr.gif);
    background-position:right top;
}

td.formgrouplayd td.layoutbl,
td.formexpandgrouplayd td.layoutbl{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_bl.gif);
    background-position:left bottom;
}

td.formgrouplayd td.layoutbr,
td.formexpandgrouplayd td.layoutbr{
    width:10px;
    height:10px;
    background-repeat:no-repeat;
    background-image:url(bgb2_br.gif);
    background-position:right bottom;
}

td.formgrouplayd td.layouttm,
td.formexpandgrouplayd td.layouttm{
    margin:0;
    background-color: #F3F3F3;
    border-top:solid 1px #0000C0;
}

td.formgrouplayd td.layoutr,
td.formexpandgrouplayd td.layoutr{
    background-color: #F3F3F3;
    border-right:solid 1px #0000C0;
}

td.formgrouplayd td.layoutl,
td.formexpandgrouplayd td.layoutl{
    background-color: #F3F3F3;
    border-left:solid 1px #0000C0;
}

td.formgrouplayd td.layoutbm,
td.formexpandgrouplayd td.layoutbm{
    background-color: #F3F3F3;
    border-bottom:solid 1px #0000C0;
}

td.formgrouplayd td.layoutm,
td.formexpandgrouplayd td.layoutm,
td.formgrouplayd td.layoutm table,
td.formexpandgrouplayd td.layoutm table{
    background-color: #F3F3F3;
}

td.formgrouplayd td.layoutm td.formdata,
td.formgrouplayd td.layoutm .formlabel,
td.formgrouplayd td.layoutm td.formsubheader,
td.formgrouplayd td.layoutm td.formblank{
    background-color:transparent;
}

td.formexpandgrouplayd td.layoutm td.formexpanddata,
td.formexpandgrouplayd td.layoutm .formexpandlabel,
td.formexpandgrouplayd td.layoutm td.formexpandsubheader,
td.formexpandgrouplayd td.layoutm td.formexpandblank,
td.formexpandgrouplayd td.formlayoutexpandblank,
td.formexpandgrouplayd td.formexpandblock table{
    background-color: #F3F3F3;
}

td.formgrouplayd td.layouttm,
td.formexpandgrouplayd td.layouttm{
    color: #FFFFFF;
    background-color: #3A3F8C;
    padding:3px;
}

td.layoutm td.formexpanddata td{
/* This is to allow tick boxes in layouts to inherit the
   background colour of the layout; otherwise the <TR> they
   are in inherits from the "td.[even|odd]expand tr" rule.*/
  background-color:transparent;
}

}
/* End of ignored extra styles */
/* End of Layout styles */

td.formdatakpihead{
    font-size:8pt;
    font-weight:normal;
    color: #FFFFFF;
    background-color: #3A3F8C;
    border:solid 1px #FFFFFF;
    padding:3px;
    background-image:url(sedback.gif);
}

td.formdatakpirow{
    border:solid 1px #C0C0C0;
    background-color: #FFFFFF;
    font-size:0.7em;
    padding:3px;
}

td.formdatakpilabel{
    border:solid 1px #C0C0C0;
    font-weight:bold;
    font-size:0.7em;
    padding:3px;
}

td.formdatakpiinput{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color:yellow;
}

td.formdatakpirowa{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #F5F5F5;
}

td.formdatakpirowb{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #B0E0E6;
}

td.formdatakpirowab{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    font-weight:bold;
    background-color: #F5F5F5;
}

td.formdatakpirowbb{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    font-weight:bold;
    background-color: #B0E0E6;
}

td.formdatakpiupred{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(upred.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpiupgreen{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(upgreen.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpidowngreen{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(downgreen.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpidownred{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(downred.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpinochyell{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(nochyellow.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpinochred{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(nochred.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpinochgreen{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(nochgreen.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpidownyell{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(downyellow.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpiupyell{
    border:solid 1px #C0C0C0;
    font-size:0.7em;
    padding:3px;
    background-color: #FFFFFF;
    background-image:url(upyellow.gif);
    background-repeat:no-repeat;
    background-position:center;
}

td.formdatakpighost{
    font-size:0.8em;
    color: #F3F3F3;
    padding:3px;
}

/* The following lines are for use on the Proof of Concept Online RFP screen */
td.formdata.title {
  font-weight: bold;
  font-size: 20px;
}
td.formdata.subtitle {
  font-size: 16px;
}
td.formdata.submitted{
  font-weight: bold;
  font-size: 20px;
  color: #FFFFFF;
  background-color: #8EBE64;
}
td.formdata.declined{
  font-weight: bold;
  font-size: 20px;
  color: #FFFFFF;
  background-color: #F86359;
}
td.formlabel.labelalert {
  font-weight: bold;
  font-size: 14px;
  color: red;
}

/* end of Proof of Concept Online RFP screen */


/* End of new styles */

span.filterlabel {
    font-weight:normal;
    padding-left: 1em;
}
span.filterstatus {
    color: #3A3F8C;
    padding:2px;
    font-weight:normal;
}

span.append2{
    width:100%;
    background-color: #B5CEE7;
}

td.oddperf60 span.append2{
    width:100%;
    background-color: #E8EAEC;
}

table td.wikititle{
    color: #FFFFFF;
    font-size:2em;
}

td.wikitext{
    background-color: #FFFFFF;
    padding:6pt;
}

td.wikitext img{
    vertical-align:middle;
}

td.wikitext li{
    margin-top:3pt;
    margin-bottom:3pt;
}

td.wikitext ul ul, td.wikitext ol ul{
    list-style-type:disc;
}

td.wikitext a{
    text-decoration:none;
}

td.wikitext a:hover{
    text-decoration:underline;
}

/*td.wikitext h1 {
    font-size:18pt;
}
td.wikitext h2 {
    font-size:12pt;
}
*/

TD.scrolllabel {
    height: 24px; 
    padding-left:0.1em;
    padding-right:0.1em;
    border:solid #BBBBBB 1px;
    font: bold;
    color: #FFFFFF;
    background: #6699CC;
    padding-left:4px;
    padding-right:4px;}

TD.gridlabel {
    font-weight: normal;
    height: 24px;
    padding-left:0.1em;
    padding-right:0.1em;
    border:solid #BBBBBB 1px;
    color: #FFFFFF;
    background: #535353; /*1027*/
}

TD.indent1 {
    white-space:nowrap;
    text-indent:12px;
}

TD.indent2 {
    white-space:nowrap;
    text-indent:24px 
    
}

td.gridlabelodd{
    background: #FFFFFF;
}

TD.gridlabelaction{
    cursor:pointer;
    font-weight: normal;
    border:solid #BBBBBB 1px;
    background: #535353;
    text-decoration: underline;
    padding-left:1px;
    padding-right:1px;
    color: #FFFFFF;
    line-height: 1em;
 }

div.selectedcell{
    border:solid black 1px;
}

/* Styles for scrolling grids */

table#COINSMatrix{
    background-color: #eeeeee;
    border:double 6px #F3F3F3;
}

table#COINSMatrix div#rightHeader td,
table#COINSMatrix div#rightBody td{
/* Adjust height of scrolling cells in grid (matrix) only (not in fixed column browses */
        height: 24px;
}

table#COINSMatrix div#rightBody td{
        background-color: #FFFFFF;
        border: solid 1px #4a4a4a;
        padding-right: 5px;
        padding-left: 4px;
}

table#COINSMatrix div#leftHeader td,
table#COINSMatrix div#leftBody td{
        border: solid 1px #4a4a4a;
}

table#COINSMatrix div#leftBody td{
        padding-right: 3px;
        padding-left: 3px;
        height: 24px;
}

table#COINSMatrix div#rightBody td div{
}

table#COINSMatrix div#bodyHeadLeft, 
table#COINSMatrix div#bodyHeadRight{
        height: 24px;
}


table#COINSMatrix td.gridlabel, 
table#COINSMatrix td.gridlabelaction{
        background-color: #4a4a4a;
        color: #ffffff;
        border-color: #ffffff;
        padding-left: 3px;
        padding-right: 3px;
}

table#COINSMatrix td.gridlabel div, 
table#COINSMatrix td.gridlabelaction div{
        height: 20px !important;
/* Override inline height */
}

table#COINSMatrix div#leftBody div,
table#COINSMatrix div#rightHeader div,
table#COINSMatrix div#leftHeader  div{
    margin-top:1px;
    line-height:20px;
    padding-left:3px;
}

table#COINSMatrix td.updcell{
    color: #3A3F8C;
    background-color: #FFFFFF;
}

table#COINSMatrix td.updcell div{
    background-color: #FFFFFF;
}

table#COINSMatrix td.updcell,
table#COINSMatrix div#rightHeader td{
        border: solid 1px #4a4a4a;
}

table#COINSMatrix div#rightBody td.nonupdcell {
    background-color: #F7F7F7;
}

table#COINSMatrix td.cellnoteupd {
    background-position: top right;
    background-repeat: no-repeat;
    background-image: -ms-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background-image: -webkit-linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
    background: linear-gradient(225deg, #F48E86 5px, #FFFFFF 5px);
}

table#COINSMatrix td.cellnotenonupd {
    background-position: top right;
    background-repeat: no-repeat;
    background-image: -ms-linear-gradient(225deg, #F48E86 5px, #F7F7F7 5px);
    background-image: -webkit-linear-gradient(225deg, #F48E86 5px, #F7F7F7 5px);
    background: linear-gradient(225deg, #F48E86 5px, #F7F7F7 5px);
}

/* End of styles for scrolling grids */

TD.scrollbold {

}

TR.odd TD.indent,
TR.even TD.indent{
    padding-left:2.5em;
}
/* oddindent and evenindent probably no longer used.
Were for Luckins screens */

TD.oddindent{
    padding-left:2.5em;
}
TD.evenindent{
    padding-left:2.5em;
}

td.oddwatchup,td.evenwatchup,td.formdatawatchup {
    border:solid #BBBBBB 1px;
    font: normal;
    height: 24px;
    line-height: 1.1em;
    padding-left:0.1em;
    padding-right:0.1em;
    background-image:url("imgs/watchlist_up.gif");
    background-repeat:no-repeat;
    background-position:center;
    color: #000000;
}

td.oddwatchdown,td.evenwatchdown,td.formdatawatchdown {
    border:solid #BBBBBB 1px;
    font: normal;
    height: 24px;
    line-height: 1.1em;
    padding-left:0.1em;
    padding-right:0.1em;
    background-image:url("imgs/watchlist_down.gif");
    background-repeat:no-repeat;
    background-position:center;
    color: #000000;
}

td.oddwatchupb,td.evenwatchupb,td.formdatawatchupb {
    border:solid #BBBBBB 1px;
    font: normal;
    height: 24px;
    line-height: 1.1em;
    padding-left:0.1em;
    padding-right:0.1em;
    background-image:url("imgs/watchlist_upB.gif");
    background-repeat:no-repeat;
    background-position:center;
    color: #000000;
}

td.oddwatchdownb,td.evenwatchdownb,td.formdatawatchdownb {
    border:solid #BBBBBB 1px;
    font: normal;
    height: 24px;
    line-height: 1.1em;
    padding-left:0.1em;
    padding-right:0.1em;
    background-image:url("imgs/watchlist_downB.gif");
    background-repeat:no-repeat;
    background-position:center;
    color: #000000;
}


/* required for VML */
v\: * { behavior:url(#default#VML); display:inline-block }

div.coinsinfo{
    background-color: #F5F5F5;
    padding:3pt;
    margin:3pt;
    border:groove 3px #e4e4e4;
}

h2{
    font-size:14pt;
    margin-bottom:6pt;
}

H2.coinsinfo a{
    text-decoration:none;
}

H2.coinsinfo a:hover{
    text-decoration:underline;
    color: #FF6633;
}

img.sign{
    height:14px;
    margin-right:0.5em;
}

p.infolinks{
    margin-top:0pt;
    /*font-size:8pt;*/
}

div.infoblock{
    padding:1em;
}

/* DHTMLX messages */
.dhtmlx_message_area{
    position:absolute;
    right:5px;
    width:250px;
    z-index:1002;
}

.dhtmlx-info{
    min-width: 120px;
    padding:4px 4px 4px 20px;
    font-family:Lato;
    font-weight: 400;
    color: #888888;
    z-index: 10000;
    margin:5px;
    margin-bottom:10px;

    -webkit-transition: all .5s ease;
    -moz-transition: all .5s ease;
    -o-transition: all .5s ease;
    transition: all .5s ease;
}

.dhtmlx-info.hidden{
    height:0px;
    padding:0px;
    border-width:0px;
    margin:0px;
    display:none;
    overflow:hidden;
}

.dhtmlx_modal_box{
    overflow:hidden;
    display: inline-block;
    min-width: 300px;
    width: 300px;
    text-align: center;
    position:absolute;
    background-color: #fff;
    xbackground:-webkit-linear-gradient(top, #ffffff 1%, #d0d0d0 99%);
    xbackground:-moz-linear-gradient(top, #ffffff 1%, #d0d0d0 99%);
    xbox-shadow: 0px 0px 14px #888;

    font-family: Lato;

    z-index:20000;

    border-radius:6px;
    border: 1px solid #ffffff;
}

.dhtmlx_popup_title{
    border-top-left-radius:5px;
    border-top-right-radius:5px;

    border-width:0px;
    background-color: #4c4c4c;
    background-color: #FFF;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAsCAIAAAArRUU2AAAARElEQVR4nH3MMQqAQBQD0dnZBTvvf80tBBEhNh9EFKuERwhz2z3OGDA0EwxI5aelvDq/hkn54+O210dtujjEYXN0XJdc1CE1MA5mcdsAAAAASUVORK5CYII=);
}

.dhtmlx-info, .dhtmlx_popup_button, .dhtmlx_button{
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select:-moz-none;

    cursor:pointer;
}

.dhtmlx_popup_text{
    overflow:hidden;
}

.dhtmlx_popup_controls{
    border-radius:6px;
    padding:5px;
}

.dhtmlx_popup_button, .dhtmlx_button{
    height: 30px;
    line-height:30px;

    display: inline-block;
    margin: 0 5px;
    border-radius: 6px;

    color: #FFF;
}
.dhtmlx_popup_button{
    min-width: 120px;
}

div.dhx_modal_cover {
    background-color: #000;
    cursor:default;

    filter:alpha(opacity = 20);
    opacity: 0.2;

    position: absolute;
    z-index:19999;
    left: 0px;    top: 0px;
    width: 100%;    height: 100%;

    border: none;
    zoom: 1;
}

/*.dhtmlx-info img, .dhtmlx_modal_box img{
    float:left;
/*    margin-right:20px;*//*7    width: 24px;
    height: 24px;
}
*/
.dhtmlx-info div{
/* Task 29429 */
    margin-left: 12px;
}

.dhtmlx-info img{
    float:left;
    margin-left:-27px;
    margin-right:0px;
    width: 24px;
    height: 24px;
}

.dhtmlx-alert-error .dhtmlx_popup_title, .dhtmlx-confirm-error .dhtmlx_popup_title{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAsCAIAAAArRUU2AAAATklEQVR4nIWLuw2AMBBDjVuQiBT2oWbRDATrnB0KQOJoqPzRe3BrHI6dcBASYREKovtK6/6DsDOX+stN+3H1YX9ciRgnYq5EWYhS2dftBIuLT4JyIrPCAAAAAElFTkSuQmCC);
    /* red gradient */
}
.dhtmlx-alert-error, .dhtmlx-confirm-error {
    border: 1px solid #ff0000;
}

/*Skin section*/
.dhtmlx_button, .dhtmlx_popup_button{
    box-shadow: 0px 0px 4px #888;
    border:1px solid #838383;
}
.dhtmlx_button input, .dhtmlx_popup_button div{
    border:1px solid #FFF;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAIAAABi9+OQAAAAQElEQVR4nE3LMQ7AIAxD0R9TxP3PydalW8xAQJ0i2y/M95ONTOxrlCC7MigdMtz92LxdlKPc/3d7jPqDRgv1xgLuDiwEIl5MZQAAAABJRU5ErkJggg==);
/* blue gradient */
    color: #000;
    border-radius:6px;
    font-size:15px;

    -moz-box-sizing:content-box;
    box-sizing:content-box;

    color: #000; padding:0px; margin:0px;
    vertical-align:top;

    height:28px;
    line-height:28px;
}

.dhtmlx_button input:focus, .dhtmlx_button input:active, .dhtmlx_popup_button div:active, .dhtmlx_popup_button div:focus{
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAeCAIAAABi9+OQAAAARklEQVR4nE2LMQ6AIADEykUG3Nz9/yf4Ar8g7K4Oeg4KOFxyTVNyqUrbLoMwAgt4+dt0nT0+IP/cbD0ag0JAabm1xkvn0R7oABW07Ic3sQAAAABJRU5ErkJggg==);
/* blue background with gray line */
}
.dhtmlx_popup_title{
    color: #000;

    height:40px; line-height:40px;
    font-size:20px;
}
.dhtmlx_popup_text{
    margin:15px 15px 5px 15px;
    font-size:14px;
    color: #000;
    min-height:30px;
    border-radius:6px;
}

.dhtmlx-info, .dhtmlx-error{
    font-size:14px;
    color: #000;
    /*box-shadow: 0px 0px 4px #000;
*/    margin-bottom:10px;

/*    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAsCAIAAAArRUU2AAAARElEQVR4nH3MMQqAQBQD0dnZBTvvf80tBBEhNh9EFKuERwhz2z3OGDA0EwxI5aelvDq/hkn54+O210dtujjEYXN0XJdc1CE1MA5mcdsAAAAASUVORK5CYII=);

    background-color:rgba(0,0,0,0.8); */
    background-color: #FFF;
    border-radius:5px;
    border:1px solid #819FD3;
}



.dhtmlx-error{
    color:red;
}

p.alerttitle {
  font-weight: bold;
}
p.alerttime {
  font-size: 6pt;
}
 

/* Overrides for popup dialogues */

body.dialog td.buttonbar{
    background: none;
}



/*******************************************/
/* Colours for Data Display Colour Ranges  */
/* "td." added because the *. were being   */
/* overridden by more specific td.formdata */
/*******************************************/

*.coins_orange, td.coins_orange
    {background-color: #EAB46A}
*.coins_amber, td.coins_amber
    {background-color: #FBDB90;}
*.coins_aqua,td.coins_aqua 
    {background-color: #B2FFFF}
*.coins_black,td.coins_black        
    {background-color: #000000; color: #FFFFFF;}
*.coins_blue,td.coins_blue
    {color: #FFFFFF; background-color: #9BBADD}
*.coins_darkgray, td.coins_darkgrey,*.coins_darkgray, td.coins_darkgrey
    {background-color: #828282; color: #FFFFFF;; background-color: #828282}
*.coins_fuchsia,td.coins_fuchsia,*.coins_violet,td.coins_violet
    {background-color: #CB9BDD}
*.coins_green,td.coins_green
    {background-color: #A6CB85}
*.coins_maroon,td.coins_maroon
    {color: #FFFFFF; background-color: #CA8C8C}
*.coins_navy,td.coins_navy
    {background-color: #1175b0; color: #FFFFFF;}
*.coins_olive,td.coins_olive
    {background-color: #B3B366}
*.coins_purple,td.coins_purple
    {color: #FFFFFF;; background-color: #A98FDF}
*.coins_red,td.coins_red
    {background-color: #F48E86}
*.coins_silver,td.coins_silver
    {background-color: #E6E6E6}
*.coins_teal,td.coins_teal
    {background-color: #7FCEBE}
*.coins_yellow,td.coins_yellow
    {background-color: #EFCD7F}
*.coins_white,td.coins_white
    {background-color: #FFFFFF;}
*.coins_magenta,td.coins_magenta
    {background-color: #EF8FEF}
    
*.disabled_text,td.disabled_text {
  color: silver;
}

*.coins_red_vivid, td.coins_red_vivid{background-color: #F86359}
*.coins_amber_vivid, td.coins_amber_vivid{background-color: #ffC235}
*.coins_green_vivid, td.coins_green_vivid{background-color: #8EBE64}
*.coins_magenta_vivid, td.coins_magenta_vivid {background-color: #FA58F4}
*.coins_yellow_vivid, td.coins_yellow_vivid {background-color: $colour_coinsyellow_vivid; color: #000000;}

*.heatmap1,td.heatmap1
    {background-color: #F8696B}
*.heatmap2,td.heatmap2
    {background-color: #F98570}
*.heatmap3,td.heatmap3
    {background-color: #FBA276}
*.heatmap4,td.heatmap4
    {background-color: #FCBF7B}
*.heatmap5,td.heatmap5
    {background-color: #FEDC81}
*.heatmap6,td.heatmap6
    {background-color: #EEE683}
*.heatmap7,td.heatmap7
    {background-color: #CCDD82}
*.heatmap8,td.heatmap8
    {background-color: #A9D27F}
*.heatmap9,td.heatmap9
    {background-color: #86C97E}
*.heatmap10,td.heatmap10
    {background-color: #63BE7B}

/**********************************************/
/* END Colours for Data Display Colour Ranges */
/**********************************************/

/* Total and header cells for coloured columns */
/* Selectors for headers changed to use class*= - 
   this is to allow for sortable columns e.g.
   class="coins_greencurrent" */

td.total[class*="coins_"],table.browse th[class*="coins_"]{
        color: #ffffff;
}

td.total.coins_amber,table.browse th[class*="coins_amber"]{background-color: #ffC235;}
td.total.coins_red,table.browse th[class*="coins_red"]{background-color: #F86359;}
td.total.coins_green,table.browse th[class*="coins_green"]{background-color: #8EBE64;}
td.total.coins_orange,table.browse th[class*="coins_orange"]
        {background-color: #F17240;}
td.total.coins_aqua,table.browse th[class*="coins_aqua"]{background-color: #26FFFF;}
td.total.coins_blue,table.browse th[class*="coins_blue"]{background-color: #427DBF;}
td.total.coins_darkgrey,table.browse th[class*="coins_darkgrey"]{background-color: #5B5B5B;}
td.total.coins_fuchsia,table.browse th[class*="coins_fuchsia"]{background-color: #8B39AA;}
td.total.coins_maroon,table.browse th[class*="coins_maroon"]{background-color: #A64D4D;}
td.total.coins_navy,table.browse th[class*="coins_navy"]{background-color: #0A4365;}
td.total.coins_olive,table.browse th[class*="coins_olive"]{background-color: #848442;}
td.total.coins_purple,table.browse th[class*="coins_purple"]{background-color: #6437C1;}
td.total.coins_silver,table.browse th[class*="coins_silver"]{background-color: #AEAEAE;}
td.total.coins_teal,table.browse th[class*="coins_teal"]{background-color: #45B49D;}
td.total.coins_yellow,table.browse th[class*="coins_yellow"]}{background-color: #FEFD02;}
td.total.coins_magenta,table.browse th[class*="coins_magenta"]{background-color: #FA58F4;}

/* Same as coins_fuchsia */
td.total.coins_violet,table.browse th[class*="coins_violet"]{background-color: #8B39AA;}

tr.bodyspan th.column-group.coins_amber{
        background: linear-gradient(to right, #ffC235, #FBDB90);
}

tr.bodyspan th.column-group.coins_red{
        background: linear-gradient(to right, #F86359, #F48E86);        
}
tr.bodyspan th.column-group.coins_green{
 background: linear-gradient(to right, #8EBE64, #A6CB85);        
}
tr.bodyspan th.column-group.coins_orange{
        background: linear-gradient(to right, #F17240, #EAB46A);        
}
tr.bodyspan th.column-group.coins_aqua{
        background: linear-gradient(to right, #26FFFF, #B2FFFF);        
}
tr.bodyspan th.column-group.coins_blue{
        background: linear-gradient(to right, #427DBF, #9BBADD);        
}
tr.bodyspan th.column-group.coins_darkgrey{
        background: linear-gradient(to right, #5B5B5B, #828282);        
}
tr.bodyspan th.column-group.coins_fuchsia{
        background: linear-gradient(to right, #8B39AA, #CB9BDD);        
}
tr.bodyspan th.column-group.coins_violet{
/* Same as coins_fuchsia */
        background: linear-gradient(to right, #8B39AA, #CB9BDD);        
}
tr.bodyspan th.column-group.coins_maroon{
        background: linear-gradient(to right, #A64D4D, #CA8C8C);        
}
tr.bodyspan th.column-group.coins_navy{
        background: linear-gradient(to right, #0A4365, #1175b0);        
}
tr.bodyspan th.column-group.coins_olive{
        background: linear-gradient(to right, #848442, #B3B366);        
}
tr.bodyspan th.column-group.coins_purple{
        background: linear-gradient(to right, #6437C1, #A98FDF);        
}
tr.bodyspan th.column-group.coins_silver{
        background: linear-gradient(to right, #AEAEAE, #E6E6E6);        
}
tr.bodyspan th.column-group.coins_teal{
        background: linear-gradient(to right, #45B49D, #7FCEBE);        
}
tr.bodyspan th.column-group.coins_yellow{
        background: linear-gradient(to right, #FEFD02, #EFCD7F);        
}
tr.bodyspan th.column-group.coins_magenta{
        background: linear-gradient(to right, #FA58F4, #EF8FEF);        
}

/* Use black text on yellow background */
td.total.coins_yellow,table.browse th.coins_yellow,
tr.bodyspan th.column-group.coins_yellow{
        color: #000000;
}

/* Paritally transparent backgrounds for cells on */
/* highlighted/selected rows                      */
tr.activerow:hover td[class*="coins_"],
tr.selected td[class*="coins_"]{
        opacity: 0.7;
}

/* Empty cells with vertical borders */
TR.odd td.right-border, TR.even td.right-border{
        border-right: solid #E9E9E9 1px; width: 2px;
}

TR.odd td.left-border, TR.even td.left-border{
        border-left: solid #E9E9E9 1px; width: 2px;
}



/***********************************/
/* Styles from docstyle-v1026b.css */
/***********************************/

div.ui-layout-pane-east{
    border:solid #5C5C5C 3px;
    padding:2px;
}

.caption{
    font-weight:bold;
}

body.helpmain img[id^="More"]{
/* Size of arrowheads in "Show more" links in the documentation, which are now SVGs */ 
        height: 16px;
        width: 16px;
}

body.helpmain td.paramhelp img[id^="More"]{
/* ... but "Show more" links in parameter help still use GIFs */
     height: 8px;
         width: 8px;
}

.def {
    color: #336600;
}

.field{
    color: #002A5C;
}

.fieldname{
    color: #53555a;
}


.filename{
    font-family: "Courier New", Courier, monospace;
}

*.module {
    font-style:italic;
}

select.module{font-style:normal} /*1027 for module selectors*/

.parameter, p.paramlist{
    color: #205FAC; 
    font-weight:bold;
    text-transform:uppercase;
}
TABLE.parampage P.paramlist{
    DISPLAY:NONE;
}

.searchOptions{
    font-size:1em;
    hidefocus: true;
}

td.screen, td.screentype{
    font-family:"Arial", "Letter Gothic MT", "Courier New", monospace;
    color: #002A5C;
    font-style:normal;
}

/* What was this for? 

.screen:hover{
    text-decoration:none;
    color: #639ACE;
}
*/
.sysmsg{
    font-family:"Letter Gothic MT", "MS Reference Sans Serif", "Courier New", monospace;
    color: #205fac;
    font-weight:normal;
    font-size:0.9em;
}

.unlabelled{
    font-style:italic;
}

.userinput{
/* Text that the user enters. */
    font-weight:bold;
}

.userselect{
/* Options that the user selects. */
    font-weight:bold;
    color: #53555a;
}

a.helpbutton{
    float:right;
    clear:right;
    margin-right:3px;
}

a.helpbutton img{
        height: 16px;
        width: 16px;
}

.glossdef{
    color: #205fac;
}

a.glossterm,a.glossterm:visited,a.glossterm:hover{
    color: #205FAC;    
    text-decoration:none;
    border-bottom:1px dotted blue;
}

a.glossterm:hover{
    color:blue;
    color: #205FAC;
}

span.glossdef a.glossterm{
/* Glossary term within glossary definition. Could be a different colour
   from the glossary definition, but current style is same colour. */
    color: #205FAC;
}

a.hbutton img{
    background-color: transparent;
}

a.hbutton:hover img{
    background-color: rgba(233, 233, 233, 0.5);
    border-radius: 2px;
}

a.hbutton {
    color: #ffffff;
    text-decoration: none;
    font-size: 24px;
}

a.more,a.more:visited, a.parameters,a.parameters:visited{
    color: #0C2340;
    text-decoration:none;
    font-style:normal;
    font-weight:bold;
    margin-top:6px;
    margin-bottom:6px;
    font-size:0.8em;
    margin-right:0.5em;
}

a.more:hover, a.parameters:hover{
    text-decoration:underline;
}

a.morelink{
    font-size:7pt;
    text-decoration:none;
}

div.ui-layout-pane-east{
    border: #414141 3px solid;
    margin: 5px 0% 5px 5px;
    font-size:1.1em;
    font-family: "Arial", "Verdana", sans-serif;
    SCROLLBAR-HIGHLIGHT-color: #C0C0C0;
    SCROLLBAR-TRACK-color: #FFFFFF;
    SCROLLBAR-DARKSHADOW-color: #C0C0C0;
    SCROLLBAR-FACE-color: #EBEBEB;
    scrollbar-arrow-color: #4D4D4D;
}

div.actionlist, div.elementlist,
div.rowlist, div.matrixlist{
    margin-top:6px;
    margin-bottom: 6px;
    padding:6px;
    border:solid 1px #2C326A
}

ul.actionlist li a.function, 
ul.elementlist li a.function,
ul.rowlist li a.function, 
ul.matrixlist li a.function{
/* Style for function links within Choose Action lists  */
    border-bottom:none;
    color:black;
    cursor:text;
}

div.optionlist,
div.commandbarlist {
    padding:6px;
    margin-top:6px;
    margin-bottom: 6px;
    background-color: #f7f3f3;
}

div.optionlist li p,
div.commandbarlist li p {
    margin-top:0;
}

div.code{
/* For samples of program code etc. */
    margin-top:3pt;
    margin-bottom:3pt;
    padding:2pt;
    margin-left:6em;
    margin-right:6em;
    font-family:"Letter Gothic MT", "Courier New", monospace;
    background-color: #D2D3D4; 
}

div.helpbody{
    margin-left:10pt;
    height:100%;
}

div.helptitle{
    position:fixed;
    margin:4px;
    margin-bottom:0px;
    z-index:-1;
}

div.parameters p{
    margin-bottom:3px;
}

div.parameters, div.configuration{
    background-color: #EEF2F7;
    margin-top: 6px;
    margin-bottom:6px;
}
div.insetbox{
    border: black 1px solid; 
    FLOAT: right; 
    WIDTH: 40%; 
    background-color: #f2f2f2;
    padding: 3px;
    margin:6px;
}


/* Tab help */
div.recheadhelp, div.contexthelp, div.headerhelp{
    border:solid 1px #4a4a4a;
    margin-bottom:6pt;
    margin-top:6pt;
    padding:6px;
    padding-top:0px;
}
    

div.tabhelp{
    margin-bottom:6pt;
    margin-top:6pt;
    padding:6px;
    padding-top:0px;
}

div.tabhelp div.tabhelp{
    border:solid 1px #4a4a4a;
}
    
h2.tabhelp{
    padding:3px;
    border-bottom:solid 3px #4a4a4a;
    background-color: #FFFFFF;
    margin-left:0px;
        margin-bottom: 6px;
    /*background-image:-webkit-linear-gradient(#FFFFFF, #6B9CCE);
    background-image:-ms-linear-gradient(#FFFFFF, #6B9CCE);
    background: linear-gradient(to bottom, #FFFFFF, #6B9CCE);
    background-position:bottom;
*/}

div.contexthelp, div.recheadhelp, div.tabhelp, div.headerhelp{
    width:100%;
    }
    

/* End of tab help  */


div.usertext{
/*    background-image: url(imgs/userlogo_small.gif);
    background-repeat:no-repeat;*/
    background-color: #ECFFFF;
    border: solid 1px #523873;
    padding: 2px;
    padding-left: 18px;
}

div.usertext p:first-of-type:before{
    content: "\f0c6";
    font-family: "FontAwesome";
    font-size: 14px;
    margin-left: -15px;
    margin-right: 5px;
}
            

div.verbose{
    display:"";
}

H1 {
    color: #4a4a4a;
    font-size:1.2em;
    margin-top:0.5em;
    margin-bottom:0.5em;
    font-style:normal;
}

H1.print{
    color: #f47322;
    font-size: 24pt;
    background-image: url(/coins/devstage/20230228063043/skin/v1105/images/COINS_banner_logo.png);
    background-position:top right;
    background-repeat:no-repeat;
    border-top:solid 0.75pt #97999b;
    border-bottom: solid 1.75pt #97999b;
    border-right:none;
    border-left:none;
    padding-right:140px;
}

H2 {
    margin-bottom:0;
    margin-top:6pt;
    font-weight:bold;
    font-size:1em;
    font-style:normal;
}

div.ui-layout-pane-east img{
    border:none;
}


div.ui-layout-pane-east img.button, 
body.helpmain img.button{
    vertical-align:middle;
    background-color: #f0f0f0;
}

input.navbut{
    font-size:0.9em;
}

li {
    font-size:1em;
    font-style:normal;
    margin-bottom:6pt;
}

body.helpmain, body.helpmain table{
/*        body, input, select, textarea, table */
    font-family: Lato, sans-serif;
    color: #5b5b5b;
}

body.helpmain p{
    margin-bottom:6pt;
    font-size: 13px;
}

body.helpmain ul{
    margin-left:-24px;
}

body.helpmain ul,
body.helpmain ol{
        margin-top: 6px;
}

body.helpmain h2{
    font-size: 18px;
    color: #53555a;
    color: #51A3E2;
    font-family: Lato, sans-serif;
    font-weight: 400;
    margin-top:12px;
}

body.helpmain h2.section{
    margin-top:0px;
}
body.helpmain h3{
    font-size: 14px;
    color: #53555a;
    margin-top:15px;
}

li p{
    margin-top:6px;
    margin-left:0px;
}

p.intro{
    margin-top:0.3em;
    font-size:0.9em;
    margin-bottom:6pt;
}

p.morelink{
    text-align:right;
    margin-top:-6pt;
    margin-right:20%;
}

p.note, DIV.note, p.warning, div.warning{
  margin-top:0pt;
  margin-left:2em;
  margin-right:2em;
  margin-bottom:1em;
  padding: 3pt;
  font-style:normal;
  background-color:transparent;
}

DIV.note, p.note{
    border:solid 1px #97999b;
}

p.paramtitle{
    font-size:0.8em;
    font-weight:bold;
}

p.warning, div.warning{
  border: solid 1px #F47322;
}

p.noteheader, p.warningheader{
  margin-bottom:0pt !important;
  padding: 3pt;
  text-align:left;
  color: #FFFFFF;
  margin-left:2em;
  margin-right:2em;
  font-weight:bold;
  page-break-after:avoid;
}

p.noteheader{
    background-color: #97999b;
}

p.warningheader{
    background-color: #F47322;
}

body.helpmain p.paramdesc{
    margin-top: 0px;
    margin-bottom: 0px;
}

p.paramname{
    margin-bottom:0;
    font-weight:bold;
    padding-top:6px;
}

p.preview{
    margin-left:5mm;
}

p.yesnolist{
    margin-top:3pt;
    margin-bottom:3pt;
    margin-left:1.5em;
    text-indent:-1.5em;
/*brand*//*Was 2.4em*/
}

div.ui-layout-pane-east p{
    font-style: normal;  /* Added by DJB */
    margin-top:0;  /* Added by DJB */
    margin-bottom:0.5em;  /* Added by DJB */
    line-height:1.2;
}


span.bgamber{
    background-color:#FBDB90;
    padding:1px 3px 1px 3px;
}

span.bggreen{
    background-color:#A6CB85;
    padding:1px 3px 1px 3px;
}

span.bgred{
    background-color:#F48E86;
    padding:1px 3px 1px 3px;
}

span.textamber{
    color: #ffC235;
}
span.textgreen{
    color: #8EBE64;
}
span.textred{
   color: #F86359;
}

SPAN.key{
    background-color: #dedeef;
    color:black;
    border:solid 1px;
    border-color: #000000;
    border-radius:3px;
    padding: 0pt 2pt 0pt;
    font-size:80%;
    font-weight:normal;
}

SPAN.maxlen{
    margin-left:0em;
    font-style:italic;
}

SPAN.notlink{
    color: #808080;
    font-style:italic;
}

SPAN.nw{
    white-space:nowrap;
}

SPAN.procedure, a.function, SPAN.function{
    color: #0C2340;
    font-weight:bold;
}

a.function{
    CURSOR:HELP;
}

span.function a.function{
    text-decoration:none;
    border-bottom:solid 1px #dddddd;
}

span.function a.function:hover{
    border-bottom-color: #FF9960;
}

span.menupath{
    font-style: italic;
    font-weight: normal;
}

span.topicunavailable{
    font-style:italic;
}

span.wrap{
/* Allows text to wrap other than at spaces (for example, after a /); 
   insert spaces in the text - this style collapses them.
   This is overridden in onlinedoc.css because the online doc. font 
   is different. */
    word-spacing:-0.2em;
}

fieldset.dimensions_block {
  display: inline-block;
  border: none;
  padding: 0 0 10px 0;
  white-space: nowrap;
  margin: 0px;
}

fieldset.dimensions_block legend {
  font-size: 10px;
  color: gray;
  font-weight: normal;
}

span.x {
  color: gray;
  padding: 0 0.5em 0 0.5em;
  font-weight: normal;
  font-size: 70%;
}

span.x:after {
  content: '✕';
}

SUP{
    font-size:90%;
}

TABLE.fields TD{
    text-align:left;
    background-color: #fbfbfb;
    /*font-size:12px;*/
    padding:0.3em;
}

TABLE.fields TH{
    font-weight:bold;
    background-color:#4a4a4a;
    font-style:normal;
        padding: 6px;
}

TABLE.fields{
    text-align:left;
}

TABLE.fields TD.layoutlabel{
    padding-top: 12pt;
    padding-bottom:0pt;
    color: #3A3F8C;
    font-weight: bold;
    background-color:transparent;
}

TABLE.fields TD.layout{
    background-color:transparent;
    padding-top:0pt;
}


TABLE.title{
    font-weight:bold;
    color: #FFFFFF;
    text-align:right;
    padding:0;
    border-width:0;
    margin:-5px;
    margin-bottom:5px;
    height:1.6em;
/* Options for new title background */    
    background-color: #4a4a4a;
    background-position:center;
/* End of Options for new title background */
}

TABLE.title TD.title{
    text-align:left;
    font-weight: bold;
    font-style:normal;
    padding-left: 1em;
    vertical-align:middle;
}

TABLE.title TD{
    vertical-align:middle;
}

table.title img{
    height:25px;
}

td.screen{
    width:25%;
    padding-left:0.1em;
}

div.ui-layout-pane-east td{
    vertical-align:top;
}

td.paramlabel{
    font-style:normal;
    font-weight:bold;
    color: #205FAC;
    vertical-align:top;
}

td.paramhelp{
    width: 100%;
}

div.ui-layout-pane-east ul{
    margin-top:0pt;
    margin-bottom:0pt;
    margin-left:0px;
    font-style:normal;
    padding-left:1.5em;
}

div.ui-layout-pane-east ul ul{
    margin-top:6pt;
    list-style-type:disc
}

td#genStatus{
    vertical-align:middle;
}

/***********************************************/
/* Additional styles for online documentation. */
/***********************************************/

div#helpframe{
        font-family: Lato, Helvetica, Arial, Verdana, Geneva, sans-serif;
}

table.navigation td{
    vertical-align:top;
    height: 70px;
    padding-top: 10px;
}

table.navigation input.odbut{
    min-height: 33px;
    border-width: 1px;
    border-style: solid;
    background-color: #51A3E2;
    border-color: #51A3E2;
    border-radius: 2px;
    color: #FFFFFF;
    font-family: Lato, sans-serif;
    font-size: 13px;
    font-weight: bold;
        padding-left: 6px;
        padding-right: 6px;
}

table.navigation input.odbut:disabled,
table.navigation input.odbut:disabled:hover{
    background-color: #DDDDDD;
    border-color: #DDDDDD;
}

table.navigation input.odbut:hover{
    background-color: #86BFEA;
    border-color: #86BFEA;
}

table.navigation input#searchText{
    border-radius: 3px;
    padding-left: 5px;
    border: solid 1px #BBBBBB;
    height: 29px;
    margin-right:6px;
    outline: none;
    width: 200px;

}

table.navigation input#searchText:focus{
    border-color: #51A3E2;
}


body.helpmain {
    SCROLLBAR-TRACK-color: #fbfbfb;
}


div.documentation TABLE.title{
    background-color: #FFFFFF;
    background-image:url(/coins/devstage/docimage/image001.png);
    background-repeat:no-repeat;
    background-position:-45mm 1cm;
    border-width:0;
    border-bottom:solid 6px #FFFFFF;
    color:black; /*#ED741B;*/
    font-weight:bold;
    height:2cm;
    margin:0;
    padding:0;
    text-align:left;
    width:100%;     
}

div.documentation table.title td{
    /*background-color:transparent;*/
    border:none;
    color: #000000;
    font-size:12pt;
    font-family:Calibri;
    padding:6pt;
    width:99%;
    white-space:nowrap;
} 

div.documentation div.selectors{
    background-color: #FFFFFF;
    background-image:none;
}

div.documentation div#selectors div{
    padding:0px;
}

div.documentation *.treelink,
div.documentation *.treelinkhi,
div.documentation *.treelink:visited,
div.documentation td.treelinkhi a.treelink,
div.documentation span.loading{
    color: #000000;
}

div.documentation td.treelink{
        padding: 0px;
}

div.documentation td.treelinkhi{
    background-color: #999999;
}
div.documentation td.treelinkhi a.treelink{
    color: #FFFFFF;
}

div.documentation a.treelink:hover{
    text-decoration:underline;
}

div.documentation td.menu-opener{
        display: none;
}

div#ODPageTitle{
    border-bottom: solid 1.75pt #51A3E2;
    color: #F47322;
    font-size:1.8em;
    margin-top:0pt;
    margin-bottom:0pt;
    padding:6pt;
    padding-right:70px;
    padding-bottom:6pt;
    padding-right:4cm;
}
/* New styles */
div#ODPageTitle{
    font-size: 34px;
    color: #000000;
    font-family: Lato, sans-serif;
    font-weight: 300;
}

div#helpHeader{
    background-color: #fbfbfb;
}

div#helpHeader table.navigation{
    background-color:  #ffffff;
}


div.documentation h1{
    margin-bottom:6pt;
}

body.helpmain table td{
    vertical-align:top;
}

body.helpmain{
    padding:6px;
    line-height:1.3;
    font-size:75%;
    font-size: 13px; /* new */
    font-family: Lato, sans-serif;
    background-color: #fbfbfb; /* new */
    max-width: 65em;
}


table.config{
    border:solid 1px blue;
    width:100%;
}

A.prn-button img, a.pdf-button img{
    border:solid 1px transparent;
    vertical-align:middle;
}
  
a.prn-button img:hover, a.pdf-button img:hover{
    border:solid 1px;
    border-color: #cccccc black black #cccccc;
}

button.docbutton, button.docbutton:hover{
  background-color: #f0f0f0;
}

/*********************************************/
/* Styles for multi-page documentation print */
/*********************************************/
div.document, div.document table, div.document li{
    font-size:11pt;/*brand*/
    font-family:Calibri;/*brand*/
}

div.document{
    padding-left:1cm;
    padding-right:1cm;
}

table.docprint{
    border-collapse:collapse;
}

table.type1 td{
    page-break-inside:avoid;
}

div.document thead{
    display: table-header-group;
}

div.document thead th.pageheader{
    font-size:14pt;
/*    color: #DC4405;*/
    text-align:left;
    font-weight:normal;
/*    border-bottom:solid 1.75pt #97999b;/*brand*/
/*    border-top:solid 0.75pt #97999b;/*brand*/
    background-color: #FFFFFF;
    padding-bottom:0px;
    padding-top:8mm;
}

img.hdrlogo{
/*    width:5cm;
    margin-bottom:3px;
    float:right;*/
    display:none; /* brand */

}

div.document p{
    margin-bottom:6pt;
}
p.preview{
    /* Online doc. search results */
    margin-bottom:12px;
}

th.pageheader{
    background-image:url(https://ukazux01.coinscloud.com:4433/coins/devstage/docimage/docprint.png);
    background-repeat:no-repeat;
    background-position:right;
    border:none;
    height:3cm;
    vertical-align:top;
}  /* brand */

th.pageheader + th{
    display:none;
/* Right hand cell in page header has a logo image, not needed in this style. */
}

div.document tfoot{
    border-top:solid 1px black;
    display: table-footer-group;
    width:100%;
}

div.document tfoot td.pagefooter{
    border-top:solid 1px black;
    font-style:normal;
    padding-top:3pt;
    text-align:left;
    width:100%;
}

tbody{
    padding-top:1cm;
    padding-bottom:1cm;
}    
    
/* Table of contents */
div.contents table{
    width:100%;
}

td.toctitle{
    font-size:14pt;
    text-transform:uppercase;
    text-align:center;
    font-weight:bold;
}

td.toc1, td.toclev1, td.toc2, td.toclev2, 
td.toc3, td.toclev3, td.toc4, td.toclev4,
td.toc5, td.toclev5{
    font-size:12pt;
    padding-right:0.2mm;
    margin-top:2mm;
    margin-bottom:2mm;
    vertical-align:top;
}

td.toc1, td.toclev1{
    font-weight:bold;
}

td.toclev1{
    width:9mm;
} 

td.toclev2, td.toclev3, td.toclev4, td.toclev5{
    width:12mm;
}

/* End of table of contents */
div.document p, div.document li, div.document td.paramlabel, 
div.document DIV.note{
    page-break-inside:avoid;
}

div.document h2{
    font-size:14pt;
    font-weight:bold;
    margin-top:0pt;
    page-break-after:avoid;
}

div.document  *.title{ /* Default for titles beyond H3*/
    font-size:12pt;
    margin-bottom:6pt;
    color: #53555A;
}

div.document h1.title{
    font-size:22pt;
    padding-left:0;
    background:none;
    page-break-before:always;
    page-break-after:avoid;
    border:none;
}

div.document h2.title{
    margin-top:6pt;
}

div.document h3{
    page-break-after:avoid;
    font-size:12pt;
}

div.document h2.title{
    font-size:18pt;
}

div.document h3.title{
    font-size:14pt;
    color: #F47322;
}

div.document table.config{
    page-break-before:avoid;
    page-break-inside:avoid;
}
div.document table.config td{
    padding-left: 6px;
    padding-right: 6px;
}

div.document table.config h2{
    font-size:10pt;
    page-break-before:avoid;
}

div.document table.config h3{
    font-size:10pt;
    page-break-before:avoid;
}

table.type1{
    border-collapse:collapse;
}
table.type1 th{
    background-color: #51A3E2;
    border-color: #51A3E2;
    color: #FFFFFF;
    font-weight: bold;
    padding:6px 3px;
}

table.type1 td{
    border:solid 1px #51A3E2;
    padding:3px;
}

table.type1 th p{
    margin-bottom:0;
}

div.document span.field{
    font-family:Verdana;
    font-size:9pt;
}

div.document a{
    text-decoration:none;
}

div.document a.helpbutton img{
    display:none;
}

div.document img.screen{
    width:16cm;
}

img.resize{
    width:95%;
    max-width: 18cm;
}

div.document p.helpnew{
    border:none;
}

div.document p.pagebreak{
    page-break-after:always;
}

div.document p.img img{
    width:10cm;
}

div.document div.parameters{
/*    width:14cm;*/
    overflow:hidden;
    padding:6px;
}

div.document div.parameters p.noteheader{
    margin-bottom:0px;
}

/****************************************************/
/* End of styles for multi-page documentation print */
/****************************************************/


@media screen{
    *.print{display:none}
}

@media print{
/* styles to indent body of documentation when printed */ 
    
    body.helpmain{
            background-color: #FFFFFF;
    }

    td.printbody{
    padding-left:1cm;
    }
    td.printbody h1,td.printbody h2,td.printbody h3,
    td.printbody h4,td.printbody h5,td.printbody h6,
    td.printbody h7{
    text-indent:-1cm;
    }
    td.printbody h2.section{
    text-indent:0;
    page-break-after:avoid;
    font-size: 14pt;
    }
    td.printbody table h1,td.printbody table h2,td.printbody table h3,
    td.printbody table h4,td.printbody table h5,td.printbody table h6,
    td.printbody table h7{
    /* We don't want to have hanging titles in tables. */
    text-indent:0;
    }

    div.contents{
    margin-left:-1cm;
    }
/*    img{max-width:15cm}*/
/*    div.contents table{
    width:80%;
    }*/
    td.printbody table.config h3{text-indent:0;}

    
/* End of body indent styles */

    a.more{
    display:none;
    }
    
    div.parameters{
    border:solid 1px black;
    }

    div.parameters div.parameters{
    border:none;
    }
    
    *.noprint{
    display:none;
    }
    
    *.caption{
    display:block;
    text-align:center;
    text-decoration:none;
    }
    
    a.helpbutton{
    display:none;
    }
    
    img.resize{
    width:14cm;
    }

    div#helpHeader{
    display:none;
    }
}
/* End of @media print for documentation */

/* highlight numbers in status line */
td.toolbarbutton {
  position:relative;
  display:block;
}

div.outstandingnumber {
  position:absolute;
  display:block;
  z-index:1;
  left:12px;
  top:5px;
  background-color: #FF3C3C;
  color: #FFFFFF;
  text-align:center;
  min-width:8px;
  height:8px;
  font-size:8px;
  padding: 2px;
  /*padding-top: 1px;
  padding-bottom: 3px;*/
  border:solid #FF3C3C 1px;
  border-top-width: 0px;
  border-bottom-width: 2px;
  border-radius:8px;
  cursor:pointer;
}

div.outstandingnumber.newTasks {
  left: 15px;
  top: -28px;
}

div#user-header div.outstandingnumber.newTasks {
  left:24px;
  top: 1px;
}

div.outstandingnumber.backgroundTasks {
  left: -13px;
  top: -15px;
}

div.outstandingnumber.unreadReports,
div.outstandingnumber.minframes,
div.outstandingnumber.basketItems,
div.outstandingnumber.basketValue {
  left: -35px;
  top: -15px;
  background: #4a4a4a;
  border:solid #4a4a4a 1px;
  border-top-width: 0px;
  border-bottom-width: 2px;
  color: $(theme_colour_text);
  height: 10px;
  line-height: initial;
  width: auto;
}

div.outstandingnumber.basketItems {
  left: 83px;
  top: -34px;
  font-style: normal;
  font-size:10px;
}

div.outstandingnumber.basketValue {
  left: -8px;
  top: -5px;
  font-style: normal;
  font-size:10px;
}

/* charts */
.c3 svg {
  font-family: 'Lato', sans-serif;
  font-weight: 300;
}
svg text.title {
    font-family: 'Lato';
    font-size: 1.4em;
    font-weight: 600;
}
svg text.fonticon {
 font-family: "coinsicons";
 font-size: 1.2em;
 opacity: 0.5;
}
svg text.title.fonticon:hover {
    cursor:pointer;
}

/* expanding sections */
div.sectionbarheader:hover {
    background-color: #4a4a4a;
    -webkit-transition: background-color .1s;
    -moz-transition: background-color .1s;
    -o-transition: background-color .1s;
    -ms-transition: background-color .1s;
    transition: background-color .1s;
}

div.sectionbarheader {
    width: 100%;
    background-color: #EFEFEF; /* Changed for 'form sections' */
    height: 45px;    
    cursor: pointer;
    border-bottom: 1px solid #4a4a4a;

 /* Changed for 'form sections' */
    -webkit-border-top-left-radius: 0px;
    -webkit-border-top-right-radius: 0px;
    -moz-border-radius-topleft: 0px;
    -moz-border-radius-topright: 0px;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;

    -webkit-transition: background-color .4s;
    -moz-transition: background-color .4s;
    -o-transition: background-color .4s;
    -ms-transition: background-color .4s;
    transition: background-color .4s;
}

div.sectionbarheader h2 {
    font-size: 1.4em; /* Changed for 'form sections' */
    color: #333;
    text-transform: none;
    font-weight: 300;    
    line-height: 45px;
}

div.sectionbarheader:hover h2 {
    color: #ffffff;
}

div.sectionbarbtn {
    width: 45px;
    height: 45px;
    background-image: url(/coins/devstage/20230228063043/skin/v1105/images/task_arrows.png);
    background-position: center bottom;
    background-repeat: no-repeat;
    float: left;
}

div.sectionbar.open div.sectionbarbtn {
    background-position: center top;
}

div.sectionbarinner {
    padding: 4px;
    background-color: rgba(256,256,256, 1);
    overflow: auto;
}

div.sectionbarinner.transparent{
    background-color: rgba(256,256,256,0.8);
}

div.sectionbar {
  overflow:hidden;
}
div.sectionbar div.sectionbarinnerwrapper {
  visibility: hidden;
}
div.sectionbar.open div.sectionbarinnerwrapper {
    visibility: visible;
    display: inline;
} 

/* "Tabs" */
table.tabcontainer{
    width: 100%;
    background-color: #fbfbfb;
}

td.rowdetailstab{
        background-color: #FFFFFF;
}

.sub-header, .tab-header, .drop-header, .nav-header{
    background-color: #FFFFFF;
    padding: 0px 0px;
    list-style: none;
    margin: 0;
    margin-bottom: 9px;
    width: 100%;
    height: 51px;
    white-space: nowrap;
    overflow: hidden;
    -webkit-box-shadow: 0px 3px 7px rgba(0,0,0,0.14);
    -moz-box-shadow: 0px 3px 7px rgba(0,0,0,0.14);
    box-shadow: 0px 3px 7px rgba(0,0,0,0.14);
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

div#sub-navigator {
  margin-top: -29px;
  top: 19px;
  position:relative;
}

div#drop-navigator {
  position:absolute;
}

div#drop-navigator, div#sub-navigator {
  z-index:1;
  display:none;
}

div#drop-navigator button, div#sub-navigator button{
        background-color: transparent;
        border: none;
        color: #4a4a4a;
        padding: 0px 3px;
        font-family: Lato, Helvetica, Arial, Verdana, Geneva, sans-serif;
        font-size: 24px;
        font-weight: 200;
}

div#drop-navigator button:hover, div#sub-navigator button:hover{
        font-weight: 300;
}

div#drop-navigator button:focus, div#sub-navigator button:focus{
        outline: none;
}

/* The original style had 10px horizontal padding on the .sub-header/.tab-header,
   but that produced a horizontal scroll bar. Setting the padding to 0 threw the 
   "tracker" underline out, so I've adjusted the padding on the first and last DIVs. */

.sub-header div.tab, .tab-header div.tab, .sub-header div.groupselect,
.tab-header div.tabmenu, .nav-header div.tab{
    font-size: 1.083em;
    display: inline-block;
    padding: 15px 10px 15px 10px;
    color: #626262;
    cursor: pointer;
    -webkit-transition: box-shadow .15s;
    -moz-transition   : box-shadow .15s;
    -o-transition     : box-shadow .15s;
    -ms-transition    : box-shadow .15s;
    transition        : box-shadow .15s;
}

.sub-header div:not(.on):hover,
.nav-header div:not(.on):hover,
.tab-header div:not(.on):hover {
    -webkit-box-shadow: 0px 15px 20px rgba(0,0,0,0.14);
    -moz-box-shadow: 0px 15px 20px rgba(0,0,0,0.14);
    box-shadow: 0px 15px 20px rgba(0,0,0,0.14);
}


.sub-header div.groupselect:hover,
.sub-header div.styled-select:hover,
.tab-header div.groupselect:hover{
/* Don't highlight tab group selectors on hover */
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
}

.sub-header div.tab.on,
.nav-header div.tab.on,
.tab-header div.tab.on {
    color: #2a2a2a;
    font-weight: bold;
}

.sub-header div.tab.error {
        padding-bottom: 14px;
        border-bottom: #E45858 3px solid;
}

.sub-header-tracker,
.tab-header-tracker,
.nav-header-tracker{
    height: 3px;
    background-color: #94BED8;
    background-color: #4a4a4a;
    position: relative;
    top: 48px;
    margin-left: 0px;
    -webkit-transition: width .2s, margin-left .2s;
    -moz-transition   : width .2s, margin-left .2s;
    -o-transition     : width .2s, margin-left .2s;
    -ms-transition    : width .2s, margin-left .2s;
    transition        : width .2s, margin-left .2s;
}

/* down arrow on dropdown menus 
   needed to make the size of the menu for the underline position */
td.submenu img {
  width: 24px;
  height: 24px;
}

td.centered-img img {
  display: block; /* allow images to be vertically centered */
}

/* No borders on background of pivot table viewer */
.pvtAxisContainer, .pvtVals{
    border-width: 0px !important;
}

div#overlay, div.dialog_overlay {
  position: fixed; /* Sit on top of the page content */
  display: none; /* Hidden by default */
  width: 100%; /* Full width (cover the whole page) */
  height: 100%; /* Full height (cover the whole page) */
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.05); /* Black background with opacity */
  z-index: 9999;
  cursor: progress; /* Add a pointer on hover */
  justify-content: center;
  align-items: center;
}

div.dialog_overlay {
  position: absolute;
  height: calc(100% - 38px); /* compensate header height */
  top: 38px;
}

table.progress {
  background-color: rgba(255,255,255,.8);
  border-radius: 20px;
  padding: 20px;
}
table.progress tr {
  height: 1.5em;
}
table.progress tr td {
}

div.progress {
  background-color: silver;
  height: 24px;
  width: 200px;
}
div.progressbar {
  background-color: #4a4a4a;
  height: 24px;
  width: 0%;
}    

table.progress div#animation {
  height: 60px;
  width: 60px;
}

/* jquery.multiselect */

a.ui-multiselect-all, a.ui-multiselect-none {
  font-weight: normal;
}

ul.ui-multiselect-checkboxes li {
  margin-bottom: 0px;
}

ul.ui-multiselect-checkboxes li label.ui-state-hover{
  background: #DADADA;
}

.ui-multiselect-menu li label{
  border-radius: 0px;
}

ul.ui-multiselect-checkboxes li label.ui-state-hover{
  background-color: #EEEEEE;
  border-color: #EEEEEE;
}

div.ui-widget-content .ui-multiselect-checkboxes li,
div.ui-widget-content .ui-multiselect-checkboxes .ui-state-hover,
a.ui-multiselect-all span, a.ui-multiselect-none span{
  font-family: 'Lato', Arial, sans-serif;
  font-weight: 400;
  font-size: 1em;
}

.ui-multiselect {
  min-height: 24px;
  font-family: 'Lato', Arial, sans-serif;
  font-weight: 700;
  font-size: 1em;
  border-radius: 0;
}

.ui-multiselect-header {
  background: white;
  border: none;
}

.ui-multiselect.ui-state-default,
.ui-multiselect.ui-state-active {
  background-color: white;
  color: #2a2a2a;
}

.ui-multiselect.ui-state-default:hover {
    background-color: #EEEEEE;
}


/* command bar buttons */
div.cmdbarcontainer {
  width:100%;
  padding-bottom: 6px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

div.cmdbardiv {
  padding: 0px 3px 0px 3px;    
}

div.cmdbardiv.cmdbardropdown {
  position: relative;
}

button.cmdbarbut {
  background: #F4F5F9;
  color: #626262;
  background-color: #FFFFFF;
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  xborder-color: #4a4a4a;
  border-color: #bfbfbf;
  font-family: Lato, Helvetica, Arial, Verdana, Geneva, sans-serif;
  line-height: 26px;
  height: 32px;
  font-size: 13px;
  outline: none;
  padding: 2px 6px 1px 6px;
}

button.cmdbarbut:hover {
   background-color: #EEEEEE;
}

div.cmdbardiv.cmdbarright {
        margin-left:auto;
}   
 
.cmdbaricon {
  color: #626262;
  padding-right: 4px;
  font-size: 18px;
  position: relative;
  top: 2px;
}

.cmdbarsvg {
  vertical-align: middle;
  padding-right: 4px;  
}  

.cmdbarcaret {
        padding-left: 3px;
  font-size: 14px;
}

.cmdbarbutbadge {
  position:relative;
  display: inline-block;
  right: -3px;
  top: -6px;
  background-color: #FF3C3C;
  color: #FFFFFF;
  text-align:center;
  width:9px;
  height:8px;
  font-size:8px;
  padding: 1px;
  border:solid #FF3C3C 2px;
  border-radius:8px;
  cursor:pointer;
  line-height: 8px;
  padding-left: 1px;
}

span.cmdbarbuttext {
  position: relative;
  top: 0px;
}

.cmdbardropitem {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 2;
  box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.1), 0 1px 7px 0 rgba(0, 0, 0, 0.1);
  border-style: solid;
  border-width: 1px;
  border-radius: 6px;
  border-color: #bfbfbf;  
  color: #626262;
  background-color: #FFFFFF;  
  font-family: Lato, Helvetica, Arial, Verdana, Geneva, sans-serif;
  font-size: 13px;  
  margin-top: 4px;
  overflow-y: auto;
}

.cmdbardropitem a {
  float: none;
  color: #626262;
  padding: 6px 6px;
  text-decoration: none;
  display: block;
  text-align: left;
  white-space: nowrap;
}

.cmdbardropitem.cmdbardropitemright {
  right: 0;
  left: auto;
}

.cmdbardropitem a:hover {
  background-color: #EEEEEE;
}

.cmdbardropitem a:first-child {
  border-radius: 6px 6px 0px 0px;
}

.cmdbardropitem a:last-child {
  border-radius: 0px 0px 6px 6px;
}

.cmdbardivider {
    height: 0;
    margin: 4px 4px 4px 4px;
    overflow: hidden;
    border-top: 1px solid #e9ecef
}

.cmdbarshow {
  display: block;
}

/* generic classes to access theme colours on non standard elements */
.theme-main-background {
  background-color: #4a4a4a !important;
}

.theme-main-color {
  color: #4a4a4a !important;
}

.theme-main-border-color {
  border-color: #4a4a4a !important;
}

.theme-border-color {
  border-color: #E9E9E9 !important;
}

/* Style overrides for SE Quote screen. */
/* PDR 27345 */

div.UI_A td.formdatacvrhead{
/* Remove blue background from labels */
  background-color: transparent;
  color: #2a2a2a;
}

div.UI_A td.formdatacvrhead:first-of-type {
/* Right-align the field labels in the first column */
  text-align: right;
  font-weight: normal;
  padding-right: 12px;
}

div.UI_A td[class^="formdata"] {
/* Remove cell borders */
  border: none;         
}        

div.UI_A td[class^="formgroup"]{
/* Add rounded border to layouts */
  border-color: #4a4a4a;
  border-radius: 3px;
}

div.UI_A tr.bodyhead th,
div.UI_A td.total {
/* Remove blue headers and footers on dynamic line blocks */
  background-color: #FFFFFF;
  color: #4a4a4a;
  font-weight: bold;

}

div.UI_A td.layouttitle {
/* Make title a bit larger on line blocks */
  font-size: 1.2em;
}

div.UI_A tr.bodyhead button {
  border: none;        
}

td.wrapped{
  overflow-wrap: anywhere;
}

/* hsstyle included in standard */
div.progbarContainer {
  width:100%; 
  overflow-y: hidden;
  border: none;
}

div.progbarColumn {
  display: inline;
  float: left;
  width: 100px;
  height: 32px;
  color: white;
  text-align: left;
  position: relative;
  text-decoration: none;
  white-space: nowrap;
  padding: 0px 2px 0px 0px;
  border: solid;
  border-width: 1px 1px 1px 1px;  
}

div.progbarColumn.progbarFuture {
  background-color: #FFFFFF;
}

div.progbarColumn.progbarComplete {
  background-color: #61d800;
  border-color: #61d800;
}

div.progbarSpacer {
  display: inline;
  float: left;
  width: 10px;
  height: 28px;
  border: none;
}

div.progbarHidden {
  display: none;
}

a.progbarAnchor {
  display: block;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  color: white;
  padding: 9px 4px 0px 4px;
}

a.progbarAnchor:hover {
  color:yellow;
}

span.progbarSpan {
  display: block;
  overflow: hidden;
  font-size: 14px;
  font-weight: 500;
  color: white;
  padding: 9px 4px 0px 4px;
  overflow-inline: hidden;
}

/* KPI bar */
div.kpibarContainer {
    width: 100%; 
    overflow-y: hidden;
    border: none;
    display: block;
}
    
div.kpibarColumn {
    display: inline-block;
    width: 200px;
    height: 62px;
    color: white;
    text-align: left;
    white-space: nowrap;
    border: solid;
    border-width: 1px 1px 1px 1px;
    border-color: #E9E9E9;
    background-color: #FFFFFF;
}
  
div.kpibarColumn:hover {
background-color: #EEEEEE;
}

div.kpibarContent {
display: inline-block;
position: relative;
overflow: hidden;
top: -4px;
}

div.kpibarCount {
display: block;   
padding: 4px 0px 0px 8px;
}

div.kpibarLabel {
display: block;
padding: 2px 0px 0px 8px;
}

div.kpibarRAG {
display: inline-block; 
background-color: red;
height:100%;
width: 3px;
}

div.kpibarSpacer {
display: inline-block;
width: 10px;
height: 28px;
border: none;
}

div.kpibarHidden {
display: none;
}

span.kpibarLabel {
font-size: 14px;   
color: #333333;
}

span.kpibarCount {
font-size: 26px;   
color: #333333 ;
font-weight: 900;
}

span.kpibarSpan {
display: block;
overflow: hidden;
font-size: 14px;
font-weight: 500;
color: white;
padding: 7px 4px 0px 4px;
overflow-inline: hidden;
}

/* progress timeline bar styles */
.cds-timeline {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -ms-flex-direction: row;
      flex-direction: row;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: start;
      justify-content: flex-start;
  box-sizing: border-box;
  width: 100%;
}

.cds-timeline__step {
  background: #FFFFFF;
  border-top: 1px solid rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(0,0,0,0.1);
  border-top-right-radius: 1px;
  border-bottom-right-radius: 1px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
  -ms-flex-direction: row;
      flex-direction: row;
  -ms-flex-pack: start;
      justify-content: flex-start;
  padding: 8px 4px 8px 24px;
  height: 42px;
  box-sizing: border-box;
  position: relative;
  flex: 1;
}

.cds-timeline__step:last-child {
  border-right: 1px solid rgba(0,0,0,0.1);
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding-right: 12px;
}

.cds-timeline__step:last-child:after {
  display: none;
}

.cds-timeline__step:first-child {
  border-left: 1px solid rgba(0,0,0,0.1);
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  padding-left: 12px;
}

.cds-timeline__step:after {
  content: '';
  position: absolute;
  top: 7px;
  right: -13px;
  width: 25px;
  height: 25px;
  border-top: 1px solid rgba(0,0,0,0.1);
  border-right: 1px solid rgba(0,0,0,0.1);
  transform: rotate(45deg) skew(10deg, 10deg);
  border-radius: 2px 4px 2px 0px;
  z-index: 1;
  background: #FFFFFF;
}

.cds-timeline__step--done .cds-timeline__icon {
  color: #40B915;
}

.cds-timeline__step--progress {
  background: #4A4A4A;
}

.cds-timeline__step--progress .cds-timeline__name {
  color: #FFFFFF;
}

.cds-timeline__step--progress .cds-timeline__icon {
  color: #FDB31A;
}

.cds-timeline__step--progress:after {
  background: #4A4A4A;
}

.cds-timeline__step--uncomplete {
  background: #EDEDEF;
}

.cds-timeline__step--uncomplete .cds-timeline__icon {
  color: #767676;
}

.cds-timeline__step--uncomplete:after {
  background: #EDEDEF;
}

.mode-dark .cds-timeline__step--uncomplete,
.mode-dark .cds-timeline__step--uncomplete:after,
.mode-dark .cds-timeline__step--done,
.mode-dark .cds-timeline__step--done:after  {
    background-color: #ffffff;
}

.cds-timeline__icon {
  margin-right: 4px;
  font-size: 20px;
}

.cds-timeline__name {
  color: #2A2A2A;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  position: relative;
  z-index: 2;
}

.cds-timeline__step--uncomplete .cds-timeline__name,
.cds-timeline__step--done .cds-timeline__name {
    color: #2a2a2a;
}

.cds-timeline__anchor {
  color: #FFFFFF;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
}

.cds-timeline__anchor:hover {
  color: #F8F8F8;
}


/* context columns */
td.contextcolwidth20 {
    width: 20%;
}  

td.fttile_title {
	vertical-align: top;
}

td.fttile_title a {
  vertical-align: top;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  color: #4A4A4A;
  position: relative;
  top: -6px;
}

body.mode-dark {
    background-color: #ffffff;
}
