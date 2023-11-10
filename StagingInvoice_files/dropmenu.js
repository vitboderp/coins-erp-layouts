/*-
     Program: dropmenu.js
 Description: Drop down menu
-*/
/* dropmenu.js */

var isDOM = (document.getElementById ? true : false);
var isIE4 = ((document.all && !isDOM) ? true : false);
var isNS4 = (document.layers ? true : false);
var isIE = ((document.all && isDOM) ? true : false);

var dropmenuhref = "";

function getRef(id) {
if (isDOM) return document.getElementById(id);
if (isIE4) return document.all[id];
if (isNS4) return document.layers[id];
}
function getSty(id) {
return (isNS4 ? getRef(id) : getRef(id).style);
}
// Hide timeout.
var popTimer = 0;
// Array showing highlighted menu items.
var litNow = new Array();

function popOver(menuNum, itemNum) {
/* if menu is hidden then ignore */
if (menu[menuNum][0].ref.visibility=="hidden") return;

clearTimeout(popTimer);
hideAllBut(menuNum);
litNow = getTree(menuNum, itemNum);
if(bNewUI==false)
  changeCol(litNow, true);
targetNum = menu[menuNum][itemNum].target;
if (targetNum > 0) {
thisX = parseInt(menu[menuNum][0].ref.left) + parseInt(menu[menuNum][itemNum].ref.left);
thisY = parseInt(menu[menuNum][0].ref.top) + parseInt(menu[menuNum][itemNum].ref.top);
with (menu[targetNum][0].ref) {

// set x and y relative to existing menu  
if (menu[menuNum][0].isVert) {
  left = thisX + menu[menuNum][itemNum].div.offsetWidth + 'px';
  top = thisY + 'px';
}
else {
  ileft = thisX;
  if(bNewUI) 
    ileft = ileft - el$('tab-header').scrollLeft;
    
  if((ileft + iMax) 
     > el$('tab-header').offsetWidth) {
     ileft = el$('tab-header').offsetWidth 
           - iMax;
  }      

  left = ileft + 'px'
  top  = thisY + menu[menuNum][itemNum].div.offsetHeight + 'px';
}        

visibility = 'visible';
display='';
      }
   }
}
function popOut(menuNum, itemNum) {
/* if menu is hidden then ignore */
if (menu[menuNum][0].ref.visibility=="hidden") return;

if ((menuNum == 0) && !menu[menuNum][itemNum].target)
hideAllBut(0)
else
popTimer = setTimeout('hideAllBut(0)', 500);
}
function getTree(menuNum, itemNum) {

// Array index is the menu number. The contents are null (if that menu is not a parent)
// or the item number in that menu that is an ancestor (to light it up).
itemArray = new Array(menu.length);

while(1) {
itemArray[menuNum] = itemNum;
// If we've reached the top of the hierarchy, return.
if (menuNum == 0) return itemArray;
itemNum = menu[menuNum][0].parentItem;
menuNum = menu[menuNum][0].parentMenu;
   }
}

// Pass an array and a boolean to specify colour change, true = over colour.
function changeCol(changeArray, isOver) {
for (menuCount = 0; menuCount < changeArray.length; menuCount++) {
if (changeArray[menuCount]) {


        lcClass=menu[menuCount][changeArray[menuCount]].div.className;
  if(lcClass.substring(0,6)=="hover-") lcClass=lcClass.substring(6);
        
        if (isOver) lcClass="hover-" + lcClass;
        menu[menuCount][changeArray[menuCount]].div.className=lcClass;
        
      }
   }
}
function hideAllBut(menuNum) {
var keepMenus = getTree(menuNum, 1);
for (count = 0; count < menu.length; count++)
if (!keepMenus[count]) {
  menu[count][0].ref.visibility = 'hidden';
  menu[count][0].ref.display='none';
}
changeCol(litNow, false);

 if(bNewUI) {
  if(el$('tab-header').scrollWidth>el$('tab-header').clientWidth) {
    $(el$('drop-navigator')).show();
  }
  else {
    $(el$('drop-navigator')).hide();
  }
 }
 
}

// *** MENU CONSTRUCTION FUNCTIONS ***

function Menu(isVert, menuClass) {
// True or false - a vertical menu?
this.isVert = isVert;
// The stylesheet class used for item borders and the text within items.
this.menuClass = (menuClass ? menuClass : "popup");
// Parent menu and item numbers, indexed later.
this.parentMenu = null;
this.parentItem = null;
// Reference to the object's style properties (set later).
this.ref = null;
// handle to the div assigned later 
this.div = null;
//
this.height = null;
}

function Item(text, href, frame, target, treebreak, itemIcon, itemClass) {
this.text = text;
lcProg = href.getEntry(0,'?');
if(href=="") {
  this.href = '';
} else {
  href = href.substring(lcProg.length + 1);
  this.href = lcProg + '?' + setParam(dropmenuhref,href);
}
this.frame = frame;
this.target = target;
this.treebreak = treebreak;
this.itemIcon = itemIcon;
this.itemClass = itemClass;
// Reference to the object's style properties (set later).
this.ref = null;
// handle to the div assigned later 
this.div = null;
}

function writeMenus() {
if (!isDOM && !isIE4 && !isNS4) return;

var liMenu;
var liItem;

for (currMenu = 0; currMenu < menu.length; currMenu++) with (menu[currMenu][0]) {
// Variable for holding HTML for items and positions of next item.
var str = '', itemX = 0, itemY = 0;
if(bNewUI)
str+='<div id="tab-header-tracker"'
        + ' class="tab-header-tracker"'
        + ' style="width:0px; margin-left:0px">'
        + '</div>';

lcMenuClass=menuClass;

// Remember, items start from 1 in the array (0 is menu object itself, above).
// Also use properties of each item nested in the other with() for construction.
for (currItem = 1; currItem < menu[currMenu].length; currItem++) with (menu[currMenu][currItem]) {
var itemID = 'menu' + currMenu + 'item' + currItem;
lcMenuClass=menuClass;

liItem=menu[currMenu][0].parentItem;
liMenu=menu[currMenu][0].parentMenu;
if(liMenu!=0 && liMenu!=null) {
  while(liMenu!=0) {
    liItem=menu[liMenu][0].parentItem;
    liMenu=menu[liMenu][0].parentMenu;
  }
}

if (href!="") {
  str += '<a href="' + href + '"'
       + ((isVert)
          ?' onclick="selectTab(' + liItem + ')"'
          :'')
       + ' class="dropmenu-item"'
       + (frame ? ' target="' + frame + '">' : '>');
}



// Create a div or layer text string with appropriate styles/properties.
// Thanks to Paul Maden (www.paulmaden.com) for helping debug this in IE4, apparently
// the width must be a miniumum of 3 for it to work in that browser.
if (isDOM || isIE4) {
str += '<div id="' + itemID + '" style="position: absolute; left: ' 
    + itemX + 'px;' /*+ 'top: ' + itemY */
    + 'px; visibility: inherit;';
str += '" ';
}
if (isNS4) {
str += '<layer id="' + itemID + '" left="' + itemX + 'px" top="' + itemY 
    + 'px" visibility="inherit" ';
}
lcItemClass=itemClass;
lcClass="";
if (lcItemClass) lcClass=lcItemClass;
if (lcClass=="") lcClass=lcMenuClass;

if (isVert&&currItem==1)
  lcClass+=" firstitem";
if (isVert&&currItem==menu[currMenu].length - 1)
  lcClass+=" lastitem";

if (lcClass!="") str += 'class="' + lcClass + '" ';

// Add mouseover handlers and finish div/layer.
str += 'onMouseOver="popOver(' + currMenu + ',' + currItem + ')" onMouseOut="popOut(' + currMenu + ',' + currItem + ')"';

str += '>';

// Add contents of item (default: table with link inside).
// In IE/NS6+, add padding if there's a border to emulate NS4's layer padding.
// If a target frame is specified, also add that to the <a> tag.

/* if first item on menu and vertical then add dummy table */
if (isVert&&currItem==1) {
  str += '<TABLE class="startpopup" cellpadding="0" cellspacing="0">'
       + '<TR><TD></TD></TR></TABLE>';
}

/* if we have the horizontal (first) menu then we want a table structure 
   around it */
if (isVert==false) {
  str += '<table cellpadding="0" cellspacing="0"><tr><td>';
}

if (isVert&&treebreak) {
  str += '<TABLE class="breakpopup" cellpadding="0" cellspacing="0">'
       + '<TR><TD class="icon">'
       + '<IMG src="/coins/' + cWebImgs + '/images/'
        + 'blank'
        + '.gif">'
       + '</TD><TD>&nbsp;</TD></TR></TABLE>';
}

str += '<table border="0" cellspacing="0" cellpadding="' 
    + (!isNS4 && lcMenuClass ? 3 : 0) + '" class="popitem"><tr>';
if (isVert) {
  str += '<td class="icon">';
  if (itemIcon!=null&&itemIcon!="") {
    str += '<IMG src="/coins/' + cWebImgs + '/images/'
        + itemIcon
        + '.gif">';
  }
  else {
    str += '<IMG src="/coins/' + cWebImgs + '/images/'
        + 'blank'
        + '.gif">';
  }
  str += '</td>'
}

str +='<td align="left">';

  str += '<NOBR>' + text + '</NOBR>';

  str += '</td>';

if (target > 0) {

// Set target's parents to this menu item.
menu[target][0].parentMenu = currMenu;
menu[target][0].parentItem = currItem;

// Add a popout indicator.
if (isVert) {
  str += '<td class="submenu" align="right">' 
       + '<IMG src="/coins/' + cWebImgs + '/images/'
       + ((bNewUI)?'menu_open.svg':'more.gif')
       + '"></td>';
} else{
  str += '<td class="submenu" align="right">' 
       + '<IMG src="/coins/' + cWebImgs + '/images/'
       + ((bNewUI)?'menu_closed.svg':'darrow.gif')
       + '"></td>';
}

} /* target > 0 */
else {
  if (isVert) {
    str += '<td class="submenu">&nbsp;</td>';
  }
}

str += '</tr></table>' 

/* if we have the horizontal (first) menu then we want a table structure 
   around it */
if (isVert==false) {
  str += '</td></tr></table>';
}

/* if last item on menu and vertical then add dummy table */
if (isVert&&currItem==menu[currMenu].length - 1) {
  str += '<TABLE class="endpopup" cellpadding="0" cellspacing="0">'
       + '<TR><TD></TD></TR></TABLE>';
}

str += (isNS4 ? '</layer>' : '</div>');

if (href!="") {
  str += '</a>';
}

}
if (isDOM) {
var newDiv = document.createElement('div');
document.getElementsByTagName('body').item(0).appendChild(newDiv);
newDiv.innerHTML = str;
if(isVert==false && bNewUI) {
  newDiv.className="tab-header";
  newDiv.id="tab-header";
}
ref = newDiv.style;
ref.position = 'absolute';
ref.visibility = 'hidden';
}

// Insert a div tag to the end of the BODY with menu HTML in place for IE4.
if (isIE4) {
document.body.insertAdjacentHTML('beforeEnd', '<div id="menu' + currMenu + 'div" ' + 'style="position: absolute; visibility: hidden; display:none;"'
  + '>' 
  + str + '</div>');
ref = getSty('menu' + currMenu + 'div');
}

// In NS4, create a reference to a new layer and write the items to it.
if (isNS4) {
ref = new Layer(0);
ref.document.write(str);
ref.document.close();
}

for (currItem = 1; currItem < menu[currMenu].length; currItem++) {
      itemName = 'menu' + currMenu + 'item' + currItem;
      if (isDOM || isIE4) menu[currMenu][currItem].ref = getSty(itemName);
      if (isNS4) menu[currMenu][currItem].ref = ref.document[itemName];
                        menu[currMenu][currItem].div=getRef(itemName);
   }
}
with(menu[0][0]) {
ref.visibility = 'visible';
   }
   
}

// These two lines handle the window resize bug in NS4. See <body onResize="...">.
// I recommend you leave this here as otherwise when you resize NS4's width menus are hidden.

//var popOldWidth = window.innerWidth;
//nsResizeHandler = new Function('if (popOldWidth != window.innerWidth) location.reload()');


// This is a quick snippet that captures all clicks on the document and hides the menus
// every time you click. Use if you want.

//if (isNS4) document.captureEvents(Event.CLICK);
//document.onclick = clickHandle;
/*
function clickHandle(evt)
{
 if (isNS4) document.routeEvent(evt);
 hideAllBut(0);
}
*/

var bFirst=true;

function setMenu()
{
phObject=document.getElementById("dropmenu");
if (phObject==null) return;

 /* add up all the offsets of the objects 
    to get the x,y co-ordinates within the window
 */
 var i;
 var count;
 
 x=0;
 y=0;
 while (phObject.offsetParent!=null) {
   x = x + phObject.offsetLeft;
   y = y + phObject.offsetTop;
   phObject = phObject.offsetParent;
 }
 
 menu[0][0].ref.left = x + 'px';
 menu[0][0].ref.top = y + 'px';

 if (bFirst) {
 for (i = 0; i < menu.length; i++) {
   xmenu=menu[i];                                 

   /* set the widths of the DIV to the widest in the menu */
         if (xmenu[0].isVert) {
           iMax=0;
           for (count = 1; count < xmenu.length; count++) {
             if (xmenu[count].div.offsetWidth>=iMax) iMax=xmenu[count].div.offsetWidth;
           }
     for (count = 1; count < xmenu.length; count++) {
       xmenu[count].ref.width = iMax + 'px';
       /* set table width to fit */
       xmenu[count].div.childNodes[0].style.width=iMax + 'px';
       /* resize children 1 and 2 as well if we have divider or end of 
          popup for border */
       try {
         xmenu[count].div.childNodes[1].style.width=iMax + 'px';
       } catch (e) {
       }
       try {
         xmenu[count].div.childNodes[2].style.width=iMax + 'px';
       } catch (e) {
       }
     }
         }
   for (count = 1; count < xmenu.length; count++) {
     /* set the height of the DIV to the height of the contents */
                 xmenu[count].ref.height=xmenu[count].div.offsetHeight;
                 xmenu[count].height = xmenu[count].div.offsetHeight;
   }
 }
 bFirst=false;
 } /* bFirst */
 
 /* position the DIV of the menu items relative to the menu */
 for (i = 0; i < menu.length; i++) {
   xmenu=menu[i];
         if (xmenu[0].isVert) {
           y=0;
     for (count = 1; count < xmenu.length; count++) {
       xmenu[count].ref.top = y + 'px';
           /* offsetHeight returns 0 when resizing the window !!!??? */
                   /*y = y + xmenu[count].div.offsetHeight;*/
                   y = y + xmenu[count].height;
           }
         }
         else {
           x=0;
     for (count = 1; count < xmenu.length; count++) {
           xmenu[count].ref.top = 0;
       xmenu[count].ref.left = x + 'px';
                   x = x + xmenu[count].div.offsetWidth + 2;
                   
           }
         }
 } /* for i = */
 
}

/* Because menu is "absolute" positioned element we need to reposition it 
   each time when window is resized
*/
$(document).ready(function () {
  if(document.getElementById("dropmenu") == null) return;
  window.addEventListener("resize", setMenu);
});

