/*-
     Program: tabs.js
 Description: COINS (OA) Stylesheet for Tab Pages
-*/

var numTabs = 0;
var tabID = new Array();
var tabGroupID = new Array();
var arrFrames = new Array();
var tabName = new Array();
var oldn = -1;
var oldtgroup="";
var tabsLoaded=false;
var cFirstTabGroup="";

function isOpen() {
  var lcButton = location.href.getQueryValue("Button");
  var lcAction = lcButton.getEntry(1,":");
    
  if (cando("open,add,insert,copy,multi",lcAction)) return true;
      
  return false;
}

function loadFrames(lcFrameID) {

  lcFrameID=lcFrameID.toUpperCase();
  
  /* loop round iframes with first entry in name (using |) = frameID */
  /*for (var i=0;i<window.frames.length;i++) {
    lcFrameName=window.frames[i].name.getEntry(0,"|").toUpperCase();
    if (lcFrameName==lcFrameID||lcFrameName.replace("%","$A$")==lcFrameID) {
      if (window.frames[i].location.href=="about:blank") {
        if (window.frames[i].name.indexOf("!|")==-1) {
       // window.frames[i].location.href=window.frames[i].name.getEntry(1,"|");
          lcHref=window.frames[i].name;
          lcHref=lcHref.substring(lcHref.indexOf("|") + 1);
          window.frames[i].location.href = lcHref;
        }
      }
      else {
        lhTab=el$('tab' + lcFrameID.getEntry(1,"_"));
        if (lhTab && lhTab.refresh==true) {
          lhTab.refresh=false;
          window.frames[i].location.reload();
        }
        else {
          try {
          window.frames[i].getFrame.pageFocus();
          } catch(e) { } 
        }
      }
    }
  }*/
  
  var $iframe=$('iframe');
  for (var i=0;i<$iframe.length;i++) {
    lcFrameName=$iframe[i].name.getEntry(0,"|").toUpperCase();
    if (lcFrameName==lcFrameID||lcFrameName.replace("%","$A$")==lcFrameID) {
      if ($iframe[i].contentDocument.location.href=="about:blank") {
        if ($iframe[i].name.indexOf("!|")==-1) {
          lcHref=$iframe[i].name;
          lcHref=lcHref.substring(lcHref.indexOf("|") + 1);
          var lcFrame=lcHref.getQueryValue('pvFrame');
          var liHeight=$iframe[i].height;
          /* breaks proportional height of dual inline */
          /*
          var $formcontainer=$iframe.closest('div.formcontainer');
          if($formcontainer.length!=0)liHeight=$formcontainer.height();
          */
          lcFrame=lcFrame.setEntry(2,liHeight,',');
          
          lcHref=lcHref.setQueryValue('pvFrame',lcFrame);
          if($('body').hasClass('ipopup'))
            lcHref=lcHref.setQueryValue('ipopup','true');
          $iframe[i].contentDocument.location.href = lcHref;
        }
      }
      else {
        /* if tab set to refresh then refresh frames */
        lhTab=el$('tab' + lcFrameID.getEntry(1,"_"));
        if (lhTab && lhTab.refresh==true) {
          lhTab.refresh=false;
          $iframe[i].contentDocument.location.reload();
        }
        else {
          try {
          $iframe.contentDocument.getFrame.pageFocus();
          } catch(e) { } 
        }
      }
    }
  }
  

}

function clickTab(n)
{

  if (n == oldn) return;
  if (tabID[n]==null) return;
  
  $subheader=$('#sub-header>div.tabs>div.tab').removeClass('on');

  var obj = document.getElementById("tabbar");

  /* hide any calendar lookups */
  try {
    hideCalendarControl();
  } catch(e) { }
  
  showWin(n,oldn); 
  showTabs(n,oldn);
  
  moveMenuTracker();

  lcFrameID = tabID[n];

  /* store the tab in a cookie for later transmission */
  /* e.g. CSBTab%WCISCIB=%WCISCIBT2 */
  document.cookie = 'CSBTab' + cMainArea + '=' + lcFrameID + ';path=/';
  
  loadFrames(lcFrameID);
  
  /* if non zero tab clicked or iframe then move help */
  if (n!=0||location.href.getQueryValue("iframe")=="true")
  {
    /* need to catch error if the tab has another page which overwrites the help page */
    try {
      /* lose the tabFrame part of the name */
      tabCode = "HT" + lcFrameID.substring(8); 
      hCOINSMain.el$(tabCode).scrollIntoView(true);
      hCOINSMain.helpframe.scrollLeft=0;
      /*hCOINSMain.helpframe[tabCode].scrollIntoView(true);*/
    }
    catch(e) {
    }

  }
  else {
    try {
    hCOINSMain.helpframe.scrollTop=0;
    hCOINSMain.helpframe.scrollLeft=0;
    } catch(e) { }
  }  
  
  oldn = n;

  /* if we have a clickTab script then apply it now */
  /**** NOT USED and causes IE XSS error because of () in URL
  lcTabChange=location.href.getQueryValue("onTabChange");
  if (lcTabChange!="") {
    try {
      eval(lcTabChange);
    }
    catch(e) {
    }
  } ****/
  
  if (typeof codeMirrorObjects != "undefined") { 
    for (var key in codeMirrorObjects){
      if (typeof codeMirrorObjects[key] == "object") codeMirrorObjects[key].refresh();   
    }
  }
  
  contentResize();
  
}

function clickTabName(pcName) {
  n = tabName[pcName];
  clickTab(n);
}

function showWin(newnn,oldnn)
{
  if (tabsLoaded||isLoaded)
  { 
    if (oldnn!=-1) {
      var oldObj = document.getElementById(arrFrames[oldnn]);
      oldObj.style.display = 'none';
    }
    var newObj = document.getElementById(arrFrames[newnn]);
    newObj.style.display = '';
    
    try {
      if (oldnn==0) {
        advancedFilter.style.display="none";
      }
      if (newnn==0) {
        advancedFilter.style.display="";
      }
    } catch(e) {}
    
  }  
  
}

function showTabs(newnn) {

  if (oldn!=-1) {
    setTabClass("tab" + tabID[oldn].getEntry(1,"_"),false);
  }
  setTabClass("tab" + tabID[newnn].getEntry(1,"_"),true);
  
  /* we have clicked on tab number newnn 
     we need to hide all the tabs with groupID the same as oldtgroup 
     and view all the tabs with groupID the same as newnn
  */

 lcNew=tabGroupID[newnn];
    
 if (tabsLoaded||isLoaded)
  { 
    if (oldtgroup!=""&&lcNew!="") {
      showTabGroup(oldtgroup,"none");
    }
    if (lcNew!="") {
      showTabGroup(lcNew,"");
    }
  }
  if (lcNew!="") {
    oldtgroup=lcNew;
  }
      
  /* set the tab group selector if it's there */ 
  try {
    if (lcNew!="") {
      thisForm.thisTabGroup.value=lcNew;
    } 
  }
  catch(e) {
  }
}
function setTabClass(pcTabID,pbSet) {
  if (pbSet)
      $(eval(pcTabID))
        .addClass('t1 on')
        .removeClass('error')
        .removeClass('t2');
  else
      $(eval(pcTabID))
        .removeClass('t1 on');
}

function showTabGroup(pcTabGroupID,pcDisplay) {
  if (pcTabGroupID=="") return;
  for (var i=0;i<tabGroupID.length;i++) {
    if (tabGroupID[i]==pcTabGroupID) {
      lhTab=eval("tab" + tabID[i].getEntry(1,"_"));
      if(lhTab.style!=undefined){
        if(lhTab.getAttribute('data-disableobject')==="true"
           &&
           lhTab.getAttribute('data-disableaction')==="hide");
        else
        lhTab.style.display=pcDisplay;
      }
    }
  }
}

function changeTabGroup(pcTabGroupID) {
  /* find the first tab in this tab group and click it */
  for (var i=0;i<tabGroupID.length;i++) {
    if (tabGroupID[i]==pcTabGroupID) {
      clickTab(i);
      break;
     }
  }
}

function beginTabs()
{
  document.writeln('<table id="tabbar" class="tabs" border=0 cellpadding="0" cellspacing="0"><tr>');
}
function beginTabsv1105() {
  document.writeln(''
         + '<div id="sub-navigator">'
         + '<button id="left" title="'
         + cScrollTabsLeft
         + '">&lt;</button>'
         + '<button id="right" title="'
         + cScrollTabsRight
         + '">&gt;</button>'
         + '</div>'
         + '<div class="sub-header" id="sub-header">'
                 + '<div id="sub-header-tracker"'
                 + ' class="sub-header-tracker"'
                 + ' style="width:0px; margin-left:0px">'
                 + '</div>');
}

function endTabs()
{
  document.writeln('</tr></table>');
}
function endTabsv1105()
{
  document.writeln('</div>');
}

function addTab(tabTitle,frameID,groupID)
{
  var lcID = frameID;
  var lcHiddenTabs = location.href.getQueryValue("hiddenTabs");
  var tabClass = "";
  arrFrames[numTabs] = "tabFrame" + frameID; 
  
  tabName[frameID] = numTabs;
  
  if (isOpen()==false) lcHiddenTabs="";
  
  if (numTabs == 0)
  {
    tabClass = "t1";                                 
    tabTitle = '<div id="mainTab">' + tabTitle + '</div>';
  }  

  /* if tab group set then default display to hidden */
  if (groupID==""||cFirstTabGroup==""||cFirstTabGroup==groupID) {
    lcGroup="";
    lcStyle="";
    if (groupID!="") {
      oldtgroup="tabGroup" + groupID;
    } 
    if (cando(lcHiddenTabs,lcID.getEntry(1,"_"))&&lcID!="") {
      lcStyle=' style="display:none"';
    }
  }
  else
  {
    lcGroup=' groupID="tabGroup' + groupID + '"'
    lcStyle=' style="display:none"';
  }
  if (groupID!=""&&cFirstTabGroup=="") {
    cFirstTabGroup=groupID;
  }
  document.writeln('<td class="' + tabClass + '" '
                 + 'onclick="clickTab(' + numTabs + ')"'
                 + ' id="tab' + frameID.getEntry(1,"_") + '"' 
                 + lcGroup
                 + lcStyle
                 + ' onMouseOver="mouseOverTab(this)"'
                 + ' onMouseOut="mouseOutTab(this)"'
                 + '>'
                 + tabTitle
                 + '</td>');
                 /*
                 + '<table cellspacing=0 cellpadding=0 border=0>');
  document.writeln('<tr>'
                 + '<td class="tx">' + tabTitle 
                 + '</td>'
                 + '</tr>');
  document.writeln('</table></td>');
  */
  
  tabID[numTabs]="tabFrame" + frameID;
  if (groupID=="") {
    tabGroupID[numTabs]="";
  }
  else {
    tabGroupID[numTabs]="tabGroup" + groupID;
  }
  numTabs = numTabs + 1;
}

function addTabv1105(tabTitle,frameID,groupID)
{
  var lcID = frameID;
  var lcHiddenTabs = location.href.getQueryValue("hiddenTabs");
  var tabClass = "";
  arrFrames[numTabs] = "tabFrame" + frameID; 
  
  tabName[frameID] = numTabs;
  
  if (isOpen()==false) lcHiddenTabs="";
  
  if (numTabs == 0)
  {
    //tabClass = "t1";                                 
    /*tabTitle = '<div id="mainTab">' + tabTitle + '</div>';*/
  }  

  /* if tab group set then default display to hidden */
  if (groupID==""||cFirstTabGroup==""||cFirstTabGroup==groupID) {
    lcGroup="";
    lcStyle='';
    if (groupID!="") {
      oldtgroup="tabGroup" + groupID;
    } 
    if (cando(lcHiddenTabs,lcID.getEntry(1,"_"))&&lcID!="") {
      lcStyle=' style="display:none"';
    }
  }
  else
  {
    lcGroup=' groupID="tabGroup' + groupID + '"'
    lcStyle=' style="display:none"';
  }
  if (groupID!=""&&cFirstTabGroup=="") {
    cFirstTabGroup=groupID;
  }
  document.writeln('<div'
                 + ' id="tab' + frameID.getEntry(1,"_") + '"' 
                 + ' data-tabnum="' + numTabs + '"'
                 + ' class="tab"'
                 + lcStyle
                 + '>' 
                 + tabTitle + '</div>');
  
  tabID[numTabs]="tabFrame" + frameID;
  if (groupID=="") {
    tabGroupID[numTabs]="";
  }
  else {
    tabGroupID[numTabs]="tabGroup" + groupID;
  }
  numTabs = numTabs + 1;
}

function mouseOverTab(phTab) {
  if (phTab.className=="") {
    phTab.className="t2";
  }
}
function mouseOutTab(phTab) {
  if (phTab.className=="t2") {
    phTab.className="";
  }
}

var sectionBarToggle = function(piAnimate) {

  if (piAnimate == undefined)
    piAnimate = 300;

  if ($(this).parent().hasClass('open')) {
    sectionBarHeaderHeight = $(this).height() + 8;
    $(this).parent()
    .stop().animate({height: sectionBarHeaderHeight}, piAnimate, 'swing',
                    function() { $(this).removeClass('open'); });
  }
  else {
    sectionBarHeaderHeight = $(this).height() + 8;
    var sectionBarHeight 
      = $(this).parent().find('.sectionbarinnerwrapper')
        .height() + sectionBarHeaderHeight;
    $(this).parent().addClass('open')
    .stop().animate({height: sectionBarHeight}, piAnimate, 'swing');

    loadFrames($(this).parent().find('div.section')[0].id);

    /* need to catch error if the tab has another page which overwrites the help page */
    try {
      /* lose the tabFrame part of the name */
      lcFrameID=$(this).parent().find('div.section')[0].id;
      tabCode = "HT" + lcFrameID.substring(8); 
      hCOINSMain.el$(tabCode).scrollIntoView(true);
      hCOINSMain.helpframe.scrollLeft=0;
      /*hCOINSMain.helpframe[tabCode].scrollIntoView(true);*/
    }
    catch(e) {
    }

  }

}

var sectionBarClick = function() {
  return sectionBarToggle.call(this, 300);
}

function sectionBarKeydown(event) {
  /* toggle by Enter or Space */
  if (event.keyCode == 13 || event.keyCode == 32) {
    $(this).click();
    return false;
  }
}

function sectionBarDefaults() {
  /*lhsectionBarHeader=$('#tabFrameTIMT_MAIN')
    .parent().parent().parent().find('div.sectionbarheader');
    */
  /* open first section */
  $('div.sectionbarheader')[0].click();
  /*
  lhSectionBarHeader=$($('div.sectionbarheader')[0]);
  openSectionBar.call(lhSectionBarHeader);
  */
}

/*
function openSectionBar() {

  if ($(this).parent().hasClass('open')) {
    // already open - do nothing
  }
  else {
    sectionBarHeaderHeight = $(this).height();
    var sectionBarHeight 
      = $(this).parent().find('.sectionbarinnerwrapper')
        .height() + sectionBarHeaderHeight;

    $(this).parent().addClass('open')
    .stop().animate({height: sectionBarHeight}, 300, 'swing');

  }
  
}
*/

function setSectionBarHeight() {
  if ($(this).parent().hasClass('open')) {
    sectionBarHeaderHeight = $(this).height();
    /* sectionbarinnerwrapper has height() zero - Chrome !!! */
    var sectionBarHeight 
      = $(this).parent().find('.sectionbarinner')[0].offsetHeight
        + sectionBarHeaderHeight;
    $(this).parent().css({height: sectionBarHeight});
  }
}

function moveMenuTracker(){
  $currentSubPage = $('#sub-header').find('.on');
  if($currentSubPage.length==0) return;
  $('#sub-header-tracker').css({
    "width": $currentSubPage.outerWidth(),
    "margin-left": ($currentSubPage.position().left 
                + $('#sub-header')[0].scrollLeft
    /* + 5 
      - parseInt($currentSubPage.css("padding-left"))*/)
  });
}

function initSubMenu(){
  $subHeaderUL = $('#sub-header');
  /* prevent initial animation */
  var $tracker=$('#sub-header-tracker');
  $tracker.removeClass('sub-header-tracker');
  moveMenuTracker();
  $tracker.addClass('sub-header-tracker');
  $subHeaderUL.find('>div.tab').click(function(){
    clickTab(this.getAttribute('data-tabnum'));
  });
}

function resizeSubMenu() {
  $('div#sub-header').width($('body').width() - 2);
 
 if(bNewUI) {
  if(el$('sub-header').scrollWidth>el$('sub-header').clientWidth) {
    $(el$('sub-navigator')).show();
  }
  else {
    $(el$('sub-navigator')).hide();
  }
 }
 }

function moveTabTracker(){
  $currentSubPage = $('#tab-header').find('.on');
  if($currentSubPage.length==0) return;
  $('#tab-header-tracker').css({
    "width": $currentSubPage.outerWidth(),
    "margin-left": ($currentSubPage.position().left /* + 5
      - parseInt($currentSubPage.css("padding-left"))*/)
  });
}

function initTabMenu(){
  $subHeaderUL = $('#tab-header');
  /* prevent initial animation */
  var $tracker=$('#tab-header-tracker');
  $tracker.removeClass('tab-header-tracker');
  moveTabTracker();
  /* timeout 0 (!!!) to do immediately but prevent it causing animation ???*/
  setTimeout(function(){
    $tracker.addClass('tab-header-tracker');
  },0);
  $subHeaderUL.find('div.tab').click(function(){
    if ($(this).hasClass('on'))
      return; /* active tab - nothing to do */

    $subheader=$('#tab-header div.tab,#tab-header div.tabmenu')
      .removeClass('on');
    $(this).addClass('on');
    document.body.style.cursor='wait';
    $(this).find('table.popitem td')
      .prepend('<img src="wousvg.p?style=v1105&icon=busy$.svg&colour=black"'
             + ' class="busy">');
    moveTabTracker();
  });
}

function selectTab(piMenu) {
    $tab = $('#tab-header div#menu0item' + piMenu);

    $tab.find('table.popitem td')
      .prepend('<img src="wousvg.p?style=v1105&icon=busy$.svg&colour=black"'
             + ' class="busy">');

    if ($tab.hasClass('on'))
      return; /* active tab - nothing to do */

    $subheader=$('#tab-header div.tab,#tab-header div.tabmenu')
      .removeClass('on');
    $tab.addClass('on');
    document.body.style.cursor='wait';
    moveTabTracker();
}
