/*  Program: wocoins.js
 Description: Web Object Scripts
-*/

var bMenuOpen=false;
var bHelpOpen=false;
var cUserRole='';

function showMenu(pcAction){
  removeTooltips();
  if(pcAction=="show") 
    hMainLayout.open('west');
  else if(pcAction=="hide")
    hMainLayout.close('west');
  else
    hMainLayout.toggle('west');

  setMenuStatus();
}
function setMenuStatus() {

  var lcText=$('#functionSearch').css('color');
  
  if(bNewUI) {
    var lhBanner=el$('hidemenu');
    if(lhBanner) {
     if(typeof hMainLayout != "undefined" && hMainLayout.state.west.isClosed)
       lhBanner.children[0].src=getSVGURL('showmenu$',lcText);
     else
       lhBanner.children[0].src=getSVGURL('hidemenu$',lcText);
    }
  }

  var btn, icon, burger, chevron;
  if(b1202) {
    btn = $('.toggleMenuBtn'),
    icon = $('.toggleMenuBtn .icn'),
    burger = 'icn-Menu-Burger',
    chevron = 'icn-Chevron-Left-Filled';

    if(btn) {
      if(typeof hMainLayout != "undefined" && hMainLayout.state.west.isClosed) {
        btn.removeClass('is-active');
        icon.addClass(burger).removeClass(chevron);
      }
      else {
        btn.addClass('is-active');
        icon.removeClass(burger).addClass(chevron);
      }
    }

    var frameBtn;
    if (mainarea.getFrame) {
      frameBtn = mainarea.getFrame.document.getElementById('toggleMenuBtn');
      if(frameBtn!=null) {
        if(hMainLayout.state.west.isClosed) {
          frameBtn.classList.remove('is-active');
          frameBtn.children[0].classList.add('icn-Menu-Burger');
          frameBtn.children[0].classList.remove('icn-Chevron-Left-Filled');
        }
        else {
          frameBtn.classList.add('is-active');
          frameBtn.children[0].classList.remove('icn-Menu-Burger');
          frameBtn.children[0].classList.add('icn-Chevron-Left-Filled');
        }
      }  
    }
  }

  var lhObject;
  if (mainarea.getFrame) {
    lhObject=mainarea.getFrame.document.getElementById('hidemenu');
    if(lhObject==null)    
      lhObject=mainarea.getFrame.document.getElementById('togglemenu');
    else
      lhObject=lhObject.children[0];
  }

  if(lhObject) {
   if(hMainLayout.state.west.isClosed) {
     if(bNewUI)
       lhObject.src=getSVGURL('showmenu$',lcText);
     else
       lhObject.src='/coins/' + cWebImgs + '/images/showmenu.gif';
   }
   else {
     if(bNewUI)
       lhObject.src=getSVGURL('hidemenu$',lcText);
     else
       lhObject.src='/coins/' + cWebImgs + '/images/hidemenu.gif';
   }
  }
}

function desktopVisible() {

  if(bDesktopFrame) {
    return hCOINSMain.parent.desktopVisible();
  }
  else {
    if(hMainLayout.center
    &&
    hMainLayout.center.children.layout1.state.north.isClosed==false) 
    return true;
    return false;
  }
}

function showHelpFrame(pcAction){

 $('div#userpopup').hide();
 if(hMainLayout.center
    &&
    hMainLayout.center.children.layout1.state.north.isClosed==false) return;
  
 removeTooltips();
 try {
  if(pcAction=="show") {
    hMainLayout.center.children.layout1.open('east')
  }
  else if(pcAction=="hide") {
    hMainLayout.center.children.layout1.close('east');
  }
  else {
    hMainLayout.center.children.layout1.toggle('east');
  }
  setHelpStatus();
 } catch(e) {}
}
function setHelpStatus() {

  lhObject=document.getElementById('togglehelp');

  if(hMainLayout.center.children.layout1.state.east.isClosed) {
    if(bNewUI==false) {
      if (lhObject) {
        lhObject.src='/coins/' + cWebImgs + '/images/showhelp.gif';
      }
    }
    // set the help cookie to generate help 
    document.cookie = 'COINSHelp=;path=/';
  } 
  else {
    if(bNewUI==false) {
      if (lhObject) {
        lhObject.src='/coins/' + cWebImgs + '/images/hidehelp.gif';
      }
    }
    // set the help cookie to suppress help 
    document.cookie = 'COINSHelp=true;path=/';
  }
}

function onlayoutopen(pcPane,phPane,phState,phOptions,lcLayout) {
  setMenuStatus();
  setHelpStatus();
  resizeDesktopHeader();
  if(pcPane=="east") {
      mainarea.processFrame.location.replace
        (mainarea.getFrame.location.href.setQueryValue('genhelp','Y'));
  }
  if(pcPane=="north") {
    /* fix desktop width - 99.9% width scrollbar issue */
    $('div.desktopheader')[0].style.width='99.9%';
    /* make north fill the screen */
    $('div.desktop').height('100%').parent().height('100%');
  }
}
function onlayoutclose(pcPane,phPane,phState,phOptions,lcLayout) {
  setMenuStatus();
  setHelpStatus();
  resizeDesktopHeader();
  if(pcPane=="east") {
    document.getElementById('help').innerHTML="";
  }
}

/* Script to open a separate help window */
function openHelp(pcTarget){
        propstr = "width=600,height=400,scrollbars,toolbar,left=400,resizable";
        window.open(pcTarget,"helpwin",propstr);
}

function reveal(which)
// All DIVs are set to display = none initially.
// This toggles the display of the DIV that's passed to it.
{
  if(which.style.display == 'none')
    {which.style.display='';
    morelink.innerText="Hide additional text";}
  else    
    {which.style.display='none';
        morelink.innerText="More...";
        }
}


function closeWindow()
{
        if (parent ==  self) {self.close()}  // If help is open in separate window, close the window
        else {
        parent.parent.showHelpFrame(); 
        // If help is open in a frame in the main window, run showHelp to hide the frame.
        }
}


function alertLink(topic)
{
        alert("This link would display information about "+topic);

}

function newHelpWindow()
/* Called by a menu option in writeMenu(), to 'spawn' a new window with the current content */
{
        this_topic = document.location.href;
        windowname = "newwin5";
        window.open(this_topic,windowname,winprops);
}

/* Script to write the menu into a help page */
function writeMenu()
{        dw = document.write;
        this_topic = document.location.href;
        windowname = "newwin5";
        winprops = "width=600,height=400,scrollbars,toolbar,left=400,location,resizable";
        menu_alert = "This link doesn't do anything at present, \nbut could display a help page about \nusing the menu tree."
        related = "I\'m thinking this link would display \na list of help topics that relate to the \ncurrent one."
        dw('<!--MenuItem Definition -->');
        dw('<div Id="menu1" class="menu" >');
        dw('<div Id="menuItem1_1" class="menuItem"  cmd="JavaScript:history.back()">Back</div>');
        dw('<div Id="menuItem1_2" class="menuItem"  cmd="search.htm">Search</div>');
        dw('<div Id="menuItem1_3" class="menuItem" title="Using COINS" cmd="using_coins.htm">Using COINS</div>');
        dw('<div Id="menuItem1_4" class="menuItem" title="Displays the current help topic in a new window." cmd="JavaScript:newHelpWindow()">New Help Window</div>');
        dw('<div Id="menuItem1_5" class="menuItem"  title="Closes the help frame or help window." cmd="JavaScript:closeWindow()">Close</div>');
        dw('</div><!-- End of Menu -->');
}

/* only for IE9 and above */
try {
if (window.addEventListener && iUserRefresh!=0 && bDesktopFrame==false)
  hUserSum=setInterval(refreshUserInfo,iUserRefresh);
} catch(e) {}

function setSum(pcID,pcValue) {
  /* clear expired message on all screens */
  localStorage.setItem(cEnv + '|userInfo|clearMessage','');
  localStorage.setItem(cEnv + '|userInfo|clearMessage','loginExpired');
  
  /* clear login message if present */
  hMessageWindow.dhtmlx.message.hide("loginExpired"); 

/*  pcValue=((piTasks>9)?"!":piTasks);*/
  pdTasks = parseFloat(pcValue.replace(',', ''));

  h=$('div.' + pcID)
  if (h.length!=0) {
    h.html(pcValue);

    if(pdTasks==0)
      h.hide();
    else
      h.show();
  }
 
  if(bNewUI && mainarea && mainarea.getFrame && mainarea.getFrame.$) {
  h=mainarea.getFrame.$('div.' + pcID)
  if (h.length!=0) {
    h.html(pcValue);

    if(pdTasks==0)
      h.hide();
    else
      h.show();
  }
  }
   
}

function userSum(pcInput,pcResult) {
  if(pcInput==undefined||pcInput=="") {
    localStorage[cEnv + '|userInfo|' +  iKco + pvJob + '|lastTime']=new Date();
  }
  else {
    /* show in current window */
    setSum(pcInput,pcResult);
    /* set storage to trigger in other windows */
    localStorage[cEnv + '|userInfo|' + pcInput]=pcResult;
  }
}

cUserMessage = '';
function showUserMessage(pcType,pcText) {
  /* if last message was this one or already showing then don't bother */
  if(pcType==cUserMessage
     ||
     hMessageWindow.dhtmlx.message.pull[pcType])
  return;
  lcType = pcType.substring(0,4);
  lcTime = pcType.substring(5,21);
  if(lcType=="info"){
    hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
    + "/images/"
    + ((bNewUI)?'info.svg':'info.gif')
    + "'>" + pcText
    + '<p class="alerttime">' + lcTime + '</p>',
    title:"Info",expire:10000,
    id:pcType,
    callback:function(){userInfoClear(pcType,pcText)}});  
  }  
  else if(lcType=="warn"){
    hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
    + "/images/"
    + ((bNewUI)?'warning.svg':'warning.gif')
    + "'>" + pcText
    + '<p class="alerttime">' + lcTime + '</p>',
    title:"Warning",expire:"0",
    id:pcType,
    callback:function(){userInfoClear(pcType,pcText)}});  
  }  
  cUserMessage = pcType;
}
function userInfo(pcInput,pcResult) {
  /* show on current window */
  showUserMessage(pcInput,pcResult);
  /* store to trigger on other windows */
  localStorage[cEnv + '|userInfo|message']=pcInput + '|' + pcResult;
}
function userInfoClear(pcType,pcText) {
  /* trigger on other windows */
  localStorage[cEnv + '|userInfo|clearMessage']=pcType;
}

function showLoginExpired(pcInput,pcResult) {
    hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
    + "/images/"
    + ((bNewUI)?'error.svg':'error.gif')
    + "'>" +pcResult,title:"Error",expire:"0",
    id:"loginExpired"});
}
function loginExpired(pcInput,pcResult) {
  showLoginExpired(pcInput,pcResult);
  /* store to trigger on other windows */
  localStorage[cEnv + '|userInfo|loginExpired']=pcResult;
}

if (window.addEventListener) {
  window.addEventListener("storage", handle_storage, false);
} 

function handle_storage(e) {
 if(window.bDesktopFrame==undefined || bDesktopFrame==true) return;

 if (!e) { e = window.event; }
 
  if((e.key)==cEnv + "|userInfo|newTasks")
    setSum('newTasks',e.newValue);
  if((e.key)==cEnv + "|userInfo|backgroundTasks")
    setSum('backgroundTasks',e.newValue);
  if((e.key)==cEnv + "|userInfo|basketItems")
    setSum('basketItems',e.newValue);
  if((e.key)==cEnv + "|userInfo|basketValue")
    setSum('basketValue',e.newValue);
  if((e.key)==cEnv + "|userInfo|message") {
    showUserMessage(e.newValue.getEntry(0,'|') 
                    + '|' + e.newValue.getEntry(1,'|'),
                    e.newValue.getEntry(2,'|'));
  }
  if((e.key)==cEnv + "|userInfo|clearMessage") {
    hMessageWindow.dhtmlx.message.hide(e.newValue); 
  }
  if((e.key)==cEnv + "|userInfo|loginExpired") {
    showLoginExpired('',e.newValue);
  }
  
  if(e.key.getEntry(1,'|')=="content" && e.key.getEntry(2,'|') 
     == iKco + pvJob ) {
    setTileValue(e.key.getEntry(3,'|'),e.newValue);
  }
}

function refreshUserInfo(pbForce) {
  if (typeof cEnv == "undefined") return;
  lcLast=localStorage[cEnv + '|userInfo|' + iKco + pvJob + '|lastTime'];
  if(lcLast!=null) ljtLastDateTime=new Date(lcLast);
  ljtThisDateTime=new Date();
  
  if(
    (lcLast==null||(ljtThisDateTime - ljtLastDateTime) + 1000>=iUserRefresh
     ||pbForce)
    &&
    !hMessageWindow.dhtmlx.message.pull["loginExpired"]
    )
    {
    localStorage[cEnv + '|userInfo|' + iKco 
               + pvJob + '|lastTime']=ljtThisDateTime;
    var lcTiles = '';
    var lcTileParam ='';
    for (key in localStorage) {
      if(key.getEntry(0,'|')==cEnv 
      && key.getEntry(1,'|')=="tile") {
        lcParam=localStorage.getItem(key);
        if(lcParam.getEntry(1,'|').substring(0,1)!="!"
           && lcParam.getEntry(2,'|')!=""
           && lcParam.getEntry(5,'|')!="Y") {
        lcTiles = lcTiles
               + '|' + key.getEntry(2,'|');
        lcTileParam = lcTileParam
               + '&T' + key.getEntry(2,'|')
               + '='
               + encodeURIComponent(lcParam);
        }
      }
    }
    lcTiles = lcTiles.substring(1);
    if(lcTiles!="") {
      lcTiles = 'tiles=' + lcTiles
              + lcTileParam;
    }
    
  lcHref = location.search;
  lcHref= lcHref.setQueryValue("pvFrame","");
  lcHref= "wouajax.p"
          + lcHref
          + addFrameURL()
          + '&ajaxMethod=syasur.getInfo&nologin=Y';
          
    loadJSON(lcHref,lcTiles);
  }
}

/* run on page refresh */
function clearLocalStorage(pcTypes) {
  if(pcTypes==undefined)pcTypes="tile";
  for(key in localStorage) {
    if(key.getEntry(0,'|')==cEnv 
       && pcTypes.inList(key.getEntry(1,'|')))
    localStorage.removeItem(key);
  }
}

function setFavourites(phAnchor) {
  lcHref=phAnchor.href;
  lcHref=lcHref.setQueryValue('favTitle',(hCOINSMain.document.title));
  lcHref=lcHref.setQueryValue('favLink',
                              (hCOINSMain.mainarea.location.href)) ;
  lcHref=lcHref.setQueryValue('favMain',
                              (hCOINSMain.mainarea.getFrame.cMainArea));
  phAnchor.href=lcHref;
}

function addTile(pcName,pcInfo,pcValue) {
  window.localStorage.setItem(cEnv + '|tile|' + pcName,pcInfo);
  setTileContent(pcName,pcValue);
}
var hTileRefresh;
function updateTileValue(pcName,piEntry,pcValue) {
  var lcTile = window.localStorage.getItem(cEnv + '|tile|' + pcName);
  if(lcTile==null) return;
  if(lcTile==null&&pcValue=="") return;
  var laTile=lcTile.split('|');
  laTile[piEntry]=pcValue;
  lcTile = laTile.join('|');
  if(lcTile!=window.localStorage.getItem(cEnv + '|tile|' + pcName)) {
    $('#' + pcName).find('div p.value').html('');
    window.localStorage.setItem(cEnv + '|tile|' + pcName,lcTile);
    refreshTileValue(pcName);
  }
}

function refreshTileValue(phTile) {
  if(hTileRefresh==null)
    hTileRefresh=setTimeout(function(){hTileRefresh=null;refreshTileValueNow(phTile)},500);
}
function refreshTileValueNow(phTile) {
    var lcTile;

  if (typeof phTile == 'string')
    lcTile = phTile;
  else
    lcTile = phTile.id;

  setTileValue(lcTile, '<i class="fa fa-spinner fa-spin">',true);

  var lcHref = location.search.setQueryValue("pvFrame","");
  lcHref = "wouajax.p"
         + lcHref
         + addFrameURL()
         + '&ajaxMethod=syasur.refreshTileValues&nologin=Y';

  var lcParam = window.localStorage.getItem(cEnv + '|tile|' + lcTile);
  var lcTiles = 'tiles=' + lcTile + '&T' + lcTile + '=' + encodeURIComponent(lcParam);

  loadJSON(lcHref, lcTiles);
}

function setTileContent(pcTile,pcValue) {
  /* show in current window */
  setTileValue(pcTile,pcValue);
  /* set storage to trigger in other windows */
  window.localStorage.setItem(
    cEnv + '|content|' + iKco + pvJob + '|' + pcTile,pcValue);
}
function setTileValue(pcTile,pcValue,pbHTML) {
    var lhTile=el$('T' + pcTile);
    var lcHTML='';
    
    if(lhTile) {
    
    var lhBox=$(lhTile).parents('div.box');
    
    if(pbHTML || pcValue=="") {
      lcHTML = pcValue;
    }
    else {
    
    var lhData=lhTile;
    if(bNewDesktop && !lhData.hasAttribute('data-size'))
      lhData = $(lhData).parents('a')[0];

    var lbGrouped=($(lhData).parents('div.cds-card').length!=0);

    var lcSize=lhData.getAttribute('data-size');
    var lcIcon=lhData.getAttribute('data-icon');
    if(lcIcon && lcIcon.substring(0,1)=='%') {
      if(bNewDesktop) 
        lcIcon='icn icn-Import-Filled';
      else 
        lcIcon=lcIcon.substring(1);
    }
    if(!lcIcon && bNewDesktop) lcIcon='icn icn-Import-Filled';
    var lcFG=lhData.getAttribute('data-fg');
    var lcBG=lhData.getAttribute('data-bg');
    var lcText;
    
    /* pcValue=Label;Value|Label;Value... */
    var lcValues=pcValue.split('|');
    
    for (var i = 0; i < lcValues.length; i+=3) {
      var lcLabel=lcValues[i];
      var lcValue=lcValues[i + 1];
      var lcColour=lcValues[i + 2];
      
      if(lcColour=='') lcColour=lcBG;
      lcText=getTextColour(lcColour)
      
      if(bNewDesktop) {

      switch(lcSize) {
        case 'alert':
          if(lbGrouped) {
          lcHTML+='<div class="cds-card__info">'
                 +'<div class="cds-card__subtitle"'
                 + ((lcSize=="nolabel")?' style="display:none"':'')
                 + '>' + lhData.getAttribute('data-title') + '</div>'
                 + '<div class="cds-card__value">'
                 + '<span class="cds-card__bullet" style="background-color:' + lcColour + ';"></span>'
                 +'<span title="' + lcLabel + '">' + lcValue + '</span>'
                 + '</div>'
                 +'</div>';
                 $(lhData).find('div.cds-card__header').show();
                 $(lhData).removeClass('cds-tile').addClass('cds-card--single');
                 $(lhData).find('div.cds-card__body').css('display','');
          }
          else {
          lcHTML = '<div class="cds-tile__icon cds-circle-icon cds-circle-icon--sm"'
                 + ((lcColour)?' style="background:' + lcColour + ';'
                 + 'color:' + lcText + ';'
                 + '"':'')
                 + '>'
                 + '<i class="'
                 + lcIcon
                 + '"'
                 + ' style="'
                 + '"></i>'
                 + '</div>'
                 + '<div class="cds-tile__title">' + lhData.getAttribute('data-title') + '</div>' 
                 + '<div class="cds-tile__value" title="' + lcLabel + '"'
                 + '>' + lcValue + '</div>';
            $(lhData).find('div.cds-card__header').hide();
            $(lhData).addClass('cds-tile').removeClass('cds-card--single');
            $(lhData).find('div.cds-card__body').css('display','contents');
          }
          break;
        default:
          lcHTML+='<div class="cds-card__info">'
                 +'<div class="cds-card__subtitle"'
                 + ((lcSize=="nolabel")?' style="display:none"':'')
                 + '>' + lcLabel + '</div>'
                 +'<div class="cds-card__value"'
                 + ' style="'
                 + ((lcColour)?'color:' + lcColour + ';':'')
                 + '">' + lcValue + '</div>'
                 +'</div>'
          $(lhData).find('div.cds-card__header').show();
          $(lhData).removeClass('cds-tile').addClass('cds-card--single');
          $(lhData).find('div.cds-card__body').css('display','');
          
          break;
      } /* switch */
      
      }
      else {
        lhBox.css('background',lcColour);
        switch(lcSize) {
        case 'small':
          lcHTML+='<span class="value'
                 +(lcValues.length==3?' single':'')
                 +'" title="' + lcLabel + '">'
                 + lcValue + '</span>';
          break;
        case 'alert':
          lcHTML = '<div class="cds-tile__icon">'
                 + '<i class="'
                 + lcIcon 
                 + '"'
                 + ' style="'
                 + ((lcColour)?'color:' + lcColour + ';':'')
                 + '"></i>'
                 + '</div>'
                 + '<div class="cds-tile__title">' + lcLabel + '</div>' 
                 + '<div class="cds-tile__value">' + lcValue + '</div>';
          break;
        default:
          if(lcValues.length==3)
          lcHTML+='<span class="value single">'
                 +lcValue + '</span><br>'
                 +'<span class="label">'
                 +lcLabel + '</span>';
          else
          lcHTML+='<span class="label">'
                 +lcLabel + ':&nbsp;</span>'
                 +'<span class="value">'
                 +lcValue + '</span><br>';
      } /* switch */
      } /* else */
    }
    
    if(!bNewDesktop) {
      switch(lcSize) {
        case 'small':
          lcHTML='<span class="smallvalues">' + lcHTML + '</span>';
          break;
        case 'alert':
          break;
        default:
          lcHTML='<span class="normalvalues">' + lcHTML + '</span>';
          break;
      }
    }
    
    }
    lhTile.innerHTML = lcHTML;
    
    }
    
}

function tileTitle(id,title) {
  var lhTile$=$('#' + id);
  lhTile$.attr('data-title',title);
  if(lhTile$.hasClass('cds-card')){
    lhTile$.find('div.cds-card__header span').html(title);
  }
  else {
    lhTile$.find('div p.name').html(title);
  }
}
function tileSubtitle(id,subtitle) {
  var lhTile$=$('#' + id);
  lhTile$.attr('data-subtitle',subtitle);
  if(lhTile$.hasClass('cds-card')){
    lhTile$.find('div.cds-card__subtitle').html(subtitle);
  }
  else {
    lhTile$.find('div p.type').html(subtitle);
  }
}
function tileIcon(id,icon) {
  var lhTile$=$('#' + id);
  lhTile$.attr('data-icon',icon);
  
    if(icon && icon.substring(0,1)=='%') {
      if(bNewDesktop) 
        icon='fa fa-exclamation-circle';
      else 
        icon=icon.substring(1);
    }
  
  if(lhTile$.hasClass('cds-card')){
    lhTile$.find('div.cds-tile__icon i').attr('class',icon);
  }
  else {
    lhTile$.find('div div.icon-font i').attr('class',icon);
  }
}
function tileOption(id,options) {
  var lhA=$('#' + id);
  var lcHref=lhA[0].getAttribute('data-basehref');
  lcHref=setParam(lcHref,options);
  lhA[0].href=lcHref;
}
function tileValue(id,value) {
  updateTileValue(id,2,value);
}

oTiles = {"1":{"width":1,"height":1},
          "2":{"width":2,"height":1}, 
          "3":{"width":3,"height":1}, 
          "4":{"width":4,"height":1}, 
          "5":{"width":5,"height":1}, 
          "6":{"width":6,"height":1}, 
          "12":{"width":12,"height":1}, 
          "nolabel":{"width":1,"height":1},
          "small":{"width":1,"height":1}, 
          "tall":{"width":2,"height":4}, 
          "normal":{"width":2,"height":2}, 
          "big":{"width":4,"height":4}, 
          "wide":{"width":4,"height":2}, 
          "half":{"width":6,"height":4}, 
          "full":{"width":12,"height":8},
          "alert":{"width":2,"height":1}
         };
          
function tileSize(id,size) {
  var lhTile$=$('#' + id);
  lhTile$.attr('data-size',size);
  if(size=='')size="normal";
  
  if(lhTile$.hasClass('cds-card')){
    /* group tile or single tile */
    lhTile$.parent().attr('class','col-' + oTiles[size].width + ' cds-card__minwidth');
    refreshTileValue(id);
  }
  else {
    lhTile$.parents('div.box')
    .removeClass('normal wide small big tall full')
    .addClass(size)
    .parents('div.taskbar')
    .find('div.taskbarheader')
    .click().click();
  }
}
function tileApptype(id,apptype) {
  el$(id).setAttribute('data-apptype',apptype);
}
function tileFg(id,fg) {
  var lhTile$=$('#' + id);
  lhTile$.attr('data-fg',fg);
  if(lhTile$.hasClass('cds-card')){
    lhTile$.find('div.cds-tile__icon i').css('color',fg);
  }
  else {
    lhTile$.parents('div.box').css('color',fg);
    lhTile$.find('p,div.icon-font').css('color',fg);
  }
}
function tileBg(id,bg) {
  var lhTile$=$('#' + id);
  lhTile$.attr('data-bg',bg);
  if(lhTile$.hasClass('cds-card')){
  }
  else {
    lhTile$.parents('div.box').css('background-color',bg)
  }
  if(bg.substring(0,1)=="$")bg=bg.substring(1);
  updateTileValue(id,4,bg);
}

function setmsi_icon(pcValue) {
  var liIcon = el$('msi_iconvalues').value.getLookup(pcValue);
  if(liIcon==-1)
    $("#RO_msi_icon").ddslick("select",{index:0});
  else
    $("#RO_msi_icon").ddslick("select",{index:liIcon});
}
function setmsi_appoption(pcSource,pcValue) {
  var lhCombo = el$('msi_appoption');
  populateCombo(lhCombo,pcSource,pcValue);
}
function setmsi_appval(pcSource,pcValue) {
  var lhCombo = el$('msi_appvalSource');
  populateCombo(lhCombo,pcSource,pcValue);
  el$('msi_appvalFilter').value='';
  filterList(el$('msi_appvalSource'),el$('msi_appvalLeft'),'','');
  setSelectionListValue(el$('msi_appval'),pcValue);
}

function editTile(phAnchor) {
/*
  var lcSize = phAnchor.getAttribute('data-size');
  if(lcSize==undefined || lcSize==null)lcSize='';
  tiledialogform.msi_size.value=lcSize;
  
  var lcAppType = phAnchor.getAttribute('data-apptype');
  if(lcAppType==undefined || lcAppType==null)lcAppType='';
  tiledialogform.msi_apptype.value=lcAppType;
  
  var lcFg = phAnchor.getAttribute('data-fg');
  if(lcFg==undefined || lcFg==null)lcFg='';
  tiledialogform.msi_fg.value=lcFg;
  $('#msi_fg').colorpicker('val',lcFg);
  
  var lcBg = phAnchor.getAttribute('data-bg');
  if(lcBg==undefined || lcBg==null)lcBg='';
  tiledialogform.msi_bg.value=lcBg;
  $('#msi_bg').colorpicker('val',lcBg);
  
  lcTitle = phAnchor.getAttribute('data-title');
  tiledialogform.ms_menuitemRowid.value=phAnchor.id;
  */
  
  ajaxGet('syasur.edittile','id=' + phAnchor.getAttribute('id'));
}
function tileDialogOpen(input,result) {  
  $('#tileDialog')
    .dialog('option','title',result)
    .dialog('open');
}
function consoleOpen() {
  $('#coinslog').dialog('open');
  coinslog.scrollTop=coinslog.scrollHeight;
}

function buildTileDialog() {

  var lhConsole=$('#coinslog').dialog({
    autoOpen:false,
    dialogClass: 'systemdialog',
    width:400,
    height:200
  }).dialogExtend({"closable" : true});
  
  lhDialog=lhConsole.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });
    
  var lhDialog=$('#searchDialog').dialog({
    autoOpen:false,
    dialogClass: 'systemdialog',
    modal:true,
    width:920,
    resizeStop: function() {
      var liHeight=$('#searchDialog').height() - $('#searchHeader').height()
                  - 24;
      $('#searchResults').height(liHeight);
      $('#searchList').height(liHeight);
      $('#searchDetail').height(liHeight);
    }
  }).dialogExtend({"closable" : true});

  lhDialog=lhDialog.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });
  
  setColourPickers();
  $tileDialog=$('#tileDialog').dialog({
     autoOpen:false,
     height:"500",
     width:"560",
     dialogClass: 'systemdialog',
     modal:true,
     buttons:[
     {text:cDelete,
        "class":"buttonanchor text-image-button",
        id:"delete",
       click:function() {
      loadJSON('wouajax.p?'
                 + buildURL(location.search,"short","")
                 + "&ajaxMethod=syasur.deleteTile", 
                 getFormValues(tiledialogform));
       }
     },
     {text:cCancel,
        "class":"buttonanchor text-image-button",
        id:"undo",
      click:function() {
         $(this).dialog("close");
      }
     },
     {text:cSave,
      id: "action:save",
      class: "buttonanchor text-image-button",
      click:function() {
      loadJSON('wouajax.p?'
                 + buildURL(location.search,"short","")
                 + "&ajaxMethod=syasur.updateTile", 
                 getFormValues(tiledialogform));
      }
     }
     
     ]
  
  }).dialogExtend({"closable" : true});
  
  lhDialog=$tileDialog.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });
  
  
  if(bNewUI) {
    addDialogButtonIcons($tileDialog);
  }
  else {
  $('button.ui-button#delete').html
    ('<IMG src="/coins/' + cWebImgs + '/images/delete.gif" '
   + ' border="0" class="button"/>'
   + cDelete);
  $('button.ui-button#undo').html
    ('<IMG src="/coins/' + cWebImgs + '/images/undo.gif" '
   + ' border="0" class="button"/>'
   + cUndo);
  $('button.ui-button#action\\:save').html
    ('<IMG src="/coins/' + cWebImgs + '/images/save.gif" '
   + ' border="0" class="button"/>'
   + cSave);
  }
   
}

function deleteTile(input,response) {
  if(bNewDesktop)
    $('#' + input).parents('a.cds-card').parent().remove();
  else
    $('#' + input).parents('div.box').remove();
  window.localStorage.removeItem(cEnv + '|tile|' + input);
  tileDialogClose();
}
function tileDialogClose() {
  $('#tileDialog').dialog('close');
}

function clickTile(phAnchor) {

  if (iButton==2) return true;
  
  if(bCtrlKey || bAltKey){
    if(phAnchor.getAttribute('data-menuitem').substring(0,2)=="0x"
       && bTileMaint
      )
      editTile(phAnchor);
    return false;
  }
  var lcAppType = phAnchor.getAttribute('data-apptype');
  
  /* if different kco then must be window */
  if(location.href.getQueryValue('kco')!=phAnchor.href.getQueryValue('kco'))
    lcAppType='window';

  if(lcAppType=="frame" || lcAppType=="frameb") {
   desktopFrame(phAnchor.getAttribute('data-menuitem'),
                phAnchor.getAttribute('data-title'),phAnchor,
                (lcAppType=="frameb"));
   return false;
  }
  else if(lcAppType=="window") {
    window.open(phAnchor.href,'_blank');
    return false;
  }
  else {
  lcMainArea=phAnchor.href.getQueryValue("MainArea");
  if(lcMainArea) {
    document.cookie = "lastFunction=" + lcMainArea + ";path=/";
  }
  hideDesktop();
  return true;
  }
}
function hideDesktop() {
  hMainLayout.center.children.layout1.close('north');
}
function toggleDesktop() {

  $('#userpopup').hide();
  
  if(hMainLayout.center.children.layout1.state.north.isClosed) {
  
    bMenuOpen=!hMainLayout.state.west.isClosed;
    bHelpOpen=!hMainLayout.center.children.layout1.state.east.isClosed;
    
    hMainLayout.center.children.layout1.close('east');
    hMainLayout.center.children.layout1.hide('east');
    hMainLayout.close('west');
    
    setTimeout(function() {
      hMainLayout.center.children.layout1.open('north')
      if(bNewDesktop)
        newLoadTiles();
      else {
        moveNavTracker();
        openDefaultSections();
      }
    },100);
    
  }
  else {
    hMainLayout.center.children.layout1.close('north')

    hMainLayout.center.children.layout1.show('east',false);
    if(bMenuOpen) hMainLayout.open('west');
    if(bHelpOpen) hMainLayout.center.children.layout1.open('east');
    
  } 
  
}

var hPopupHideTimer;
function popupListOver() {
  if(hPopupHideTimer) clearTimeout(hPopupHideTimer);
}
function hidepopups(pcExclude) {
  if(pcExclude==undefined)pcExclude='';
  if(pcExclude!='popupList')
    $('#popupList').hide();
  if(pcExclude!='userpopup')
    $('#userpopup').hide();
  if(pcExclude!='rolepopup')
    $('#rolepopup').hide();
  if(pcExclude!='productpopup')
    $('#productpopup').hide();
}
function popupListOut() {
  hPopupHideTimer=setTimeout(function(){
    hidepopups();
  },500);
}

  function userPopupOver(phObject) {
    var lhPop=$('div#userpopup');
    if(phObject && b1202 && lhPop.is(':visible')) {
      lhPop.hide()
      return;
    }
      if(hPopupHideTimer) clearTimeout(hPopupHideTimer);
      if(phObject) {
       setFrameButtons();
       if(desktopVisible())
         $('a#togglehelp').hide();
       else
         $('a#togglehelp').show();
       var lhButton=$(phObject);
       var lhPos=lhButton.offset();
       var liSide=(($(phObject).closest('body.wocoins').length==0)
                   ?sidemenu.offsetWidth:0)
       var liLeft=lhPos.left + lhButton.outerWidth() - lhPop.outerWidth()
                 +liSide;
       var lhBody=$('body');
      //  if((lhBody[0].clientWidth - liLeft)<200)
      //    liLeft = lhBody[0].clientWidth - 200;
       lhPop.css({
         top: lhPos.top + lhButton.outerHeight(),
         left: liLeft
       })
       .show();
       /* hide any popuplist */
       hidepopups('userpopup');
      }
  }
  function userPopupOut(phObject){
      if(hPopupHideTimer) clearTimeout(hPopupHideTimer); 
      hPopupHideTimer=setTimeout(function() {
        hidepopups();
      },500)
  }

  function productPopupOver(phObject) {
    var lhPop=$(phObject && b1202 && 'div#productpopup');
    if(lhPop.is(':visible')) {
       lhPop.hide()
       return;
    }

    if(hPopupHideTimer) clearTimeout(hPopupHideTimer);
    if(phObject) {
     setFrameButtons();
     var lhButton=$(phObject);
     var lhPos=lhButton.offset();
     var liSide=(($(phObject).closest('body.wocoins').length==0)
                 ?sidemenu.offsetWidth:0)
     var liLeft=lhPos.left //+ lhButton.width() - lhPop.width()
               +liSide;
     var lhBody=$('body');
     if((lhBody[0].clientWidth - liLeft)<200)
       liLeft = lhBody[0].clientWidth - 200;
     lhPop.css({
       top: lhPos.top + lhButton.height() + 5,
       left: liLeft
     })
     .show();
     /* hide any popuplist */
     hidepopups('productpopup');
    }
}
function productPopupOut(phObject){
  if(hPopupHideTimer) clearTimeout(hPopupHideTimer);
  hPopupHideTimer=setTimeout(function() {
    hidepopups();
    },500)
}

function clickRole(phObject) {
  $('div#rolepopup').hide()
  setRole(phObject);

  // clear old menu
  $('#menuTree').html('');
  // clear search 
  $('#functionSearch').val('');
  $('#functionSearchList').html('');
  // restart menu load 
  began=false;
  cUserRole=phObject.getAttribute('data-role');

  // set current role
  lcHref = location.search;
  lcHref="?" + buildURL(lcHref,"short","pvFrame");
  lcHref= "wouajax.p"
          + '?ajaxMethod=syasur.setRole';

          $.ajax({
            type:"post",
            url:lcHref,
            data:{"role": cUserRole},
            error: function(pcText) {
              console.log(pcText);
            },
            success: function(pcText) {
              console.log(pcText);
            }
          });

  if(cUserRole==='') {
    buildTree('menuTree',cMainMenu,'');
    $('#menuTree').removeClass('rolemenu');
  }
  else {
    buildTree('menuTree',cUserRole,'');
    $('#menuTree').addClass('rolemenu');
  }
  return false;
}
function rolePopupOver(phObject) {
  var lhPop=$('div#rolepopup');
  if(phObject && b1202 && lhPop.is(':visible')) {
     lhPop.hide()
     return;
  }

  if(hPopupHideTimer) clearTimeout(hPopupHideTimer);
  if(phObject) {
   setFrameButtons();
   var lhButton=$(phObject);
   var lhPos=lhButton.offset();
  //  var liSide=(($(phObject).closest('body.wocoins').length==0)
  //              ?sidemenu.offsetWidth:0)
  //  var liLeft=lhPos.left //+ lhButton.width() - lhPop.width()
  //            +liSide;
  //  var lhBody=$('body');
  //  if((lhBody[0].clientWidth - liLeft)<200)
  //    liLeft = lhBody[0].clientWidth - 200;
    var liLeft=lhPos.left;
    lhPop.css({
     top: lhPos.top + lhButton.outerHeight(),
     left: liLeft
   })
   .show();
   roleSearch.value='';
   $('.cds-dropdown__item').show();
   /* hide any popuplist */
   hidepopups('rolepopup');
  }
}
function rolePopupOut(phObject){
  if(hPopupHideTimer) clearTimeout(hPopupHideTimer);
  hPopupHideTimer=setTimeout(function() {
    hidepopups();
  },500)
}
  
var hPopupListTimer;
function showPopupListOver(pcMethod,phObject,pcParam) {

  if(pcParam==undefined) pcParam='';

  hPopupListTimer=setTimeout(function(){
  /* get history via ajax and show the results */
  lcHref = location.search;
  lcHref="?" + buildURL(lcHref,"short","pvFrame");
  lcHref= "wouajax.p"
          + lcHref
          + addFrameURL()
          + '&ajaxMethod=syasur.' + pcMethod
          + pcParam;

          $.ajax({
            type:"get",
            url:lcHref,
            error: function(pcText) {
              alert('AJAX Failure');
            },
            success: function(pcText) {
              ajaxResponse(pcText);
  lhPos=$(phObject).offset();
  
       var liSide=(($(phObject).closest('body.wocoins').length==0)
                   ?sidemenu.offsetWidth:0)

       var liLeft=lhPos.left 
//                 + $(phObject).outerWidth()
                 - $("#popupList").outerWidth()
                 + liSide;
       var lhBody=$('body');
      //  if((lhBody[0].clientWidth - liLeft)<500)
      //    liLeft = lhBody[0].clientWidth - 500;
         
  if(bNewUI) {
     if(pcMethod=="showReports") {
       $("#popupList").css({
         top: lhPos.top + $(phObject).outerHeight(),
         left: liLeft
       }).show();
       $('#userpopup').hide();
     }
     else if(pcMethod=="showPaperclip") {
       $("#popupList").show().position({
        my: "top",
        at: "top",
        of: $(phObject),
        collision: "fit flip"
        });      
     }
     else
       $("#popupList").show().css({
         top: lhPos.top,
         left: liLeft
       });       
  }
  else
  $("#popupList").show().position({
      my: "right+60 bottom-10",
      at: "center top",
      of: $(phObject),
      collision: "fit flip"
  }).show();
              
            }
            
          });
  
  //loadXMLDoc(lcHref)
  
  },200);
  
}
function showPopupListOut(pcMethod) {
  if(hPopupListTimer) clearTimeout(hPopupListTimer);
}

function ajaxShowPopupList(input,response) {

  popupList.innerHTML
         ='<iframe style="position:absolute; height:100%; width:100%;'
         +' top:0px; left:0px; z-index:-9999"'
         +' frameborder="0">'
         +'</iframe>'
         + response;

}

function clickPopupList(phAnchor) {
  hidepopups();
  
  lcMainArea=phAnchor.href.getQueryValue("MainArea");
  if(lcMainArea) {
    document.cookie = "lastFunction=" + lcMainArea + ";path=/";
  }
  
  if(phAnchor.target=="mainarea") {
    hideDesktop();
  }
  
}

var hStatusHideTimer;
function statusOver() {
  if(hStatusHideTimer) clearTimeout(hStatusHideTimer);
  var lh=$('#dialog-extend-fixed-container');

  if (b1202) {
  var liLeft=$('.toggleDesktopBtn').offset().left;
  if(liLeft==0)
    liLeft=mainarea.getFrame.$('.toggleDesktopBtn').offset().left  
          + sidemenu.offsetWidth;
  lh.css({
    left: liLeft,
    top: 54
  });
  }
  else {
  var liLeft=$('div#desktop').offset().left;
  if(liLeft==0)
    liLeft=mainarea.getFrame.$('div#desktop').offset().left  
          + sidemenu.offsetWidth;
  lh.css({
    left: liLeft - 300 + 30,
    top: 36
  });
  
  }

  if(lh.length>0 && lh[0].offsetHeight>1)
    lh.removeClass("hide").addClass("show");
}
function statusOut() {
  setFrameButtons();
  if($('#dialog-extend-fixed-container').children().length==0)
    $('#dialog-extend-fixed-container').removeClass("show").addClass("hide");
  else
  hStatusHideTimer=setTimeout(function(){
    $('#dialog-extend-fixed-container').removeClass("show").addClass("hide");
  },1000);
}
function statusFlash() {
  setFrameButtons();
  statusOver();
  hStatusHideTimer=setTimeout(function(){
    $('#dialog-extend-fixed-container').removeClass("show").addClass("hide");
  },2000);
}
function setFrameButtons() {
  var liMin=($('#dialog-extend-fixed-container').children().length);
  if(liMin==0)
    $('div.minframes').html('').hide();
  else
    $('div.minframes').html(liMin).show();

  if(typeof mainarea.getFrame=="object"
     &&
     typeof mainarea.getFrame.$=="function") {
    min$=mainarea.getFrame.$('div.minframes');
    if(min$.length!=0){
     if(liMin==0)
       min$.html('').hide();
     else
       min$.html(liMin).show();
    }
  }
  
  if($('div.desktopframe').length==0) {
    $('#minimizeFrames').hide();
    $('#restoreFrames').hide();
  }
  else {
    $('#minimizeFrames').show();
    $('#restoreFrames').show();
  }
  
}

var taskBarClick = function() {

  var lcSections;
  
  if(bShiftKey && (bCtrlKey || bAltKey)) {
    /* launch section maintenance */
    phAnchor=$(this).find('A')[0];
    if(phAnchor) 
      desktopFrame('',phAnchor.title,phAnchor);
    return;
  }
  
  lcSections = localStorage.getItem(cEnv + "|desktop|sections");
  if(lcSections==null || lcSections==undefined) lcSections='';
  
  if ($(this).parent().hasClass('open')) {
    taskBarHeaderHeight = $(this).height() + 8;
    $(this).parent()
    .stop().animate({height: taskBarHeaderHeight}, 300, 'swing')
    .removeClass('open')
    lcSections = lcSections.deleteFromList($(this)[0].id);
  }
  else {
    taskBarHeaderHeight = $(this).height() + 8;
    var taskBarHeight 
      = $(this).parent().find('.taskbarinnerwrapper')
        .height() + taskBarHeaderHeight;
    $(this).parent().addClass('open')
    .stop().animate({height: taskBarHeight}, 300, 'swing');
    
    lcSections = lcSections.addToList($(this)[0].id);
    loadTiles();
  }
  
  window.localStorage.setItem(cEnv + "|desktop|sections",lcSections);
  
}

var setNavDefaults = function() {

  /* put popups at end of DOM to show on top */
  $('body').append($('div#userpopup'));
  $('body').append($('div#productpopup'));
  $('body').append($('div#rolepopup'));
  $('body').append($('div#popupList'));

  var lcDefaultTab=window.localStorage.getItem(cEnv + "|desktop|tab");
  if(el$(lcDefaultTab)) {
    navBarClick.call(el$(lcDefaultTab));
  }
  else{
    lcDefaultTab=$('div#nav-header a.navbar');
    if(lcDefaultTab.length!=0)
      navBarClick.call(el$(lcDefaultTab[0].id));
  }
  loadTiles();

}

var navDivClick = function() {
  this.children[0].click();
}

var navBarClick = function() {

  window.localStorage.setItem(cEnv + "|desktop|tab",this.id);
  
  /* hide all */
  $(".sitemiddleinner").removeClass("open");
  /* view tab */
  $(this.hash).addClass("open");
  
  /* unselect all tabs */
  $('.navbar').parent().removeClass('on');
  /* select this tab */
  $(this).parent().addClass('on');
  
  openDefaultSections();
  
  /* if any tables then adjust them */
  if(typeof Coins.tableadjust=="function")
    Coins.tableadjust();
  
  moveNavTracker();
  return false;
}

function openDefaultSections() {
  var lcSectionList
    = localStorage.getItem(cEnv + "|desktop|sections");

  if (lcSectionList!=null && lcSectionList!="") {
  
  var lcSections=lcSectionList.split(",");
  
  lcSectionList = '';
  for (var i = 0; i < lcSections.length; i++) {
    if($('#' + lcSections[i]).length>0) {
      if($('#' + lcSections[i]).is(':visible')) {
        openDefaultSection.call($('#' + lcSections[i]));
      }
      lcSectionList = lcSectionList + ',' + lcSections[i];
    }
  }

  lcSectionList=lcSectionList.substring(1);
  window.localStorage.setItem(cEnv + "|desktop|sections",lcSectionList);
  }
 
  /* load any visible tiles that aren't loaded */
  loadTiles();

  if(b1202)
    $('.toggleDesktopBtn').addClass('is-active');
 
}

function loadTiles() {
    $('iframe.inlinetile.toload').each(function() {
      if($(this).parents('div.sitemiddleinner.open').length>0
         &&
         $(this).parents('div.taskbar.open').length>0
        ) {
        $(this).removeClass('toload');
        this.contentDocument.location.href=this.getAttribute('data-src');
      }
    });
    
    $('div.boxchart.toload').each(function() {
      if($(this).parents('div.sitemiddleinner.open').length>0
         &&
         $(this).parents('div.taskbar.open').length>0
        ) {
        $(this).removeClass('toload');
        var lcFunc='loadTile' + this.getAttribute('data-func') + '()';
        try {
          eval(lcFunc);
        } catch(e) {
          console.error('%s failed', lcFunc, e);
        }
      }
    });     
}

function openDefaultSection() {

  if ($(this).parent().hasClass('open')) {
    /* already open - do nothing */
  }
  else {
    taskBarHeaderHeight = $(this).height();
    var taskBarHeight 
      = $(this).parent().find('.taskbarinnerwrapper')
        .height() + taskBarHeaderHeight;
    $(this).parent().addClass('open')
    .stop().animate({height: taskBarHeight}, 300, 'swing');
    
    loadTiles();
  }
  
}

var hGlobalSearchTimer;
var globalSearchKeyUp = function(phEvent) {

  /* ignore shift, ctrl, alt */
  if(phEvent.keyCode==16 || phEvent.keyCode==17 || phEvent.keyCode==18) return;
  if(phEvent.keyCode==191 && phEvent.ctrlKey && phEvent.shiftKey) return;
  
  if(iGlobalSearchResults!=0) {
    if(phEvent.keyCode==38 || phEvent.keyCode==40) {

      globalSearchHighlight(false);
  
      if(phEvent.keyCode==38 && iGlobalSearchRow>1) iGlobalSearchRow--
      if(phEvent.keyCode==40 && iGlobalSearchRow<iGlobalSearchResults) iGlobalSearchRow++
  
      globalSearchHighlight(true);
        
      return;
    }
    else if(phEvent.keyCode==13) {
      if(iGlobalSearchRow==0) return false;
      
      $('#globalsearchlist tr.resultrow')
        .eq(iGlobalSearchRow - 1).find('a')[0].click();
      return false;
    }
  }

  /* cancel any outstanding request */
  if(hGlobalSearchTimer) clearTimeout(hGlobalSearchTimer);

  if(this.value!='' && encodeURIComponent(this.value).length>=3) {
  hGlobalSearchTimer = setTimeout(bind(this,function() {
  /* search for this.value */

  /* get history via ajax and show the results */
  lcHref = location.search;
  lcHref="?" + buildURL(lcHref,"short","pvFrame");
  var lcSearchTypes = $('select#searchType').val();
  if(lcSearchTypes) 
    lcSearchTypes=lcSearchTypes.toString() 
  else
    lcSearchTypes='';
   
  var lcSortType = $('select#searchSort').val();
  if (lcSortType)
    lcSortType = lcSortType.toString()
  else
    lcSortType = '';
    
  lcHref= "wouajax.p"
          + lcHref
          + addFrameURL()
          + '&ajaxInput=' + hGlobalSearchTimer
          + '&ajaxMethod=syasur.globalsearch'
          + '&userrole=' + cUserRole
          + '&globalsearch=' 
          + encodeURIComponent(this.value)
          + '&searchtype=' 
          + encodeURIComponent(lcSearchTypes)
          + '&searchsort='
          + encodeURIComponent(lcSortType);
    iGlobalSearchResults=0;
    iGlobalSearchRow=0;
    if(bNewUI) 
      searchList.innerHTML='<img src="'
                        + getSVGURL('busy$',oPalette.theme)
                        + '" style="margin-top:168px;margin-left:200px;'
                        + 'height:48px;"'
                        + ' class="fa-spin"'
                        + '>';
    else
      searchList.innerHTML='<img src="'
                        + '/coins/' + cWebImgs 
                        + '/images/coins_preloader.gif"'
                        + ' style="margin-top:168px;margin-left:200px"'
                        + '>';
    searchDetail.innerHTML='';
    searchDetail.setAttribute('data-rowid','');
    
  loadXMLDoc(lcHref)
  
  }),500);
  }
  else {
    searchList.innerHTML='';
    searchDetail.innerHTML='';
    searchDetail.setAttribute('data-rowid','');
    iGlobalSearchResults=0;
    iGlobalSearchRow=0;
  }
   
}

function globalSearch(pbClear) {
  if(pbClear) {
    iGlobalSearchResult = 0;
    iGlobalSearchRow = 0;
    searchList.innerHTML='';
  }
  if(bDesktopFrame) {
    hCOINSMain.parent.globalSearch();
  }
  else {
    $('#searchDialog').dialog('open');
    iGlobalSearchResults=$('table#globalsearchlist tr.resultrow').length;
    el$('globalSearch').focus();
    el$('globalSearch').select();
  }
}
function clickSearchList(phAnchor,pbHistory) {
  var lcTitle=phAnchor.getAttribute('data-title');
  var lcTarget=phAnchor.target;
  if(hCOINSMain.mainarea.getFrame.dialogForms.length!=0)lcTarget='window';
  var lcMainArea=phAnchor.href.getQueryValue("MainArea");
  
  $('#searchDialog').dialog('close');

  if(lcTarget=='mainarea') {
    var lcRole=phAnchor.getAttribute('data-role');
    if(b1202 && lcRole!=cUserRole) {
      $("div#rolepopup a.cds-dropdown__item[data-role='" + lcRole + "']").click();
    }
  }
  
  functionSearch.value='';
  highlightFunction(lcMainArea);
  
  if(lcMainArea && pbHistory) {
    document.cookie = "lastFunction=" + lcMainArea + ";path=/";
  }
  if(lcTarget=="window") {
    return false;
  }
  if(lcTarget=="frame") {
    desktopFrame('',lcTitle,phAnchor,false);
    return false;
  }
  else if(lcTarget=="frameb") {
    desktopFrame('',lcTitle,phAnchor,true);
    return false;
  }
  else {
    if(lcTarget=="mainarea") {
      var lcHref=phAnchor.href;
      lcHref=lcHref.setQueryValue('pvFrame',
               'W,' + $(window).width() + ',' + $(window).height());
      phAnchor.href=lcHref;
      hideDesktop();
    }
  }
  setTimeout(function() {
    clearFunctionSearch();
  },100);
  
  return true;
  
}


function ajaxGlobalSearchList(input,response) {

  /* if we have moved on then do nothing */
  if(hGlobalSearchTimer!=input) return;

  searchList.innerHTML=response;
  
  iGlobalSearchResults=$('table#globalsearchlist tr.resultrow').length;
  iGlobalSearchRow=0;
  /*if(iGlobalSearchResults!=0) {
    $('#globalsearchresults tr.resultrow').first().addClass('highlight');
    iGlobalSearchRow=1;
  }*/

  $('table#globalsearchlist tr.resultrow')
    .on('mouseover',function(){
      if(iGlobalSearchRow!=this.rowIndex + 1) {
        globalSearchHighlight(false);
        iGlobalSearchRow=this.rowIndex + 1
        globalSearchHighlight(true);
      }
    })
  
}

var hGlobalDetailTimer;
function globalSearchHighlight(pbOn) {
  if(pbOn) {
    var lhRow=$('#globalsearchlist tr.resultrow')
    .eq(iGlobalSearchRow - 1).addClass('highlight');
    
    if(hGlobalDetailTimer) clearTimeout(hGlobalDetailTimer);

    hGlobalDetailTimer = setTimeout(bind(lhRow[0],function() {
      var lcDetail=this.getAttribute('data-detail');
      var lhDetail=$('div#searchDetail')[0];
      
      if(lcDetail) {

        /* if we have a new record */
        if(lhDetail.getAttribute('data-rowid')
           !=this.getAttribute('data-rowid')) {
           
          lcHref="wou005.p?" + buildURL(location.href,"short","");
          lcHref=lcHref 
            + '&MainArea=' + lcDetail
            + '&' + this.getAttribute('data-table')
            + 'Rowid=' + this.getAttribute('data-rowid')
            + '&dialogform=searchdetail';

    if(bNewUI) 
          lhDetail.innerHTML='<img src="'
                        + getSVGURL('busy$',oPalette.theme)
                        + '" style="margin-top:168px;margin-left:120px;'
                        + 'height:48px;"'
                        + ' class="fa-spin"'
                        + '>';
    else
          lhDetail.innerHTML='<img src="/coins/' + cWebImgs 
                        + '/images/coins_preloader.gif"'
                        + ' style="margin-top:168px;margin-left:120px"'
                        + '>';
          lhDetail.setAttribute('data-rowid',this.getAttribute('data-rowid')); 

          /* request detail page, only show if the rowid is still set */
          $.ajax({
            type:"get",
            url:lcHref,
            rowid:this.getAttribute('data-rowid'),
            success: function(pcText,pcStatus,phXHR) {
              lhDetail=$('div#searchDetail')[0];
              if(lhDetail.getAttribute('data-rowid')==this.rowid)
                lhDetail.innerHTML=pcText;
            }
          });
          
        }
        
      }
      else {
        lhDetail.setAttribute('data-rowid','');
        lhDetail.innerHTML='';
      }
    }),300);

    lhRow=lhRow[0];
    var lhDiv = el$('searchList');
    var liTop;
         if(lhRow.offsetTop + lhRow.offsetHeight
       >lhDiv.scrollTop + lhDiv.offsetHeight) {
      liTop = lhRow.offsetTop 
            + lhRow.offsetHeight 
            - lhDiv.offsetHeight;
      lhDiv.scrollTop=liTop;
     }
     else if(lhRow.offsetTop < lhDiv.scrollTop) {
      lhDiv.scrollTop=lhRow.offsetTop;
     }
    
    
  }
  else {
    $('#globalsearchlist tr.resultrow')
    .eq(iGlobalSearchRow - 1).removeClass('highlight');
  }
}

function desktopDialog(pcTitle,phAnchor,phOnClose) {

  var lcHref='';
 
  if(bDesktopFrame) {
    hCOINSMain.parent.desktopDialog(pcTitle,phAnchor,phOnClose);
  }
  else {

  var lcID='',lcTitle='',lbSideDialog=false,loPosition={};

  if(typeof phAnchor=="string")
    lcHref=phAnchor;
  else {
    lcHref=phAnchor.href;
    lcID=phAnchor.getAttribute('data-menuitem');
  }
    
  if(typeof pcTitle == "object") {
    lcID=pcTitle.id
    lcTitle=pcTitle.title
  }
  else {
    lcTitle=unescape(pcTitle);
  }
  
  var liWidth,liHeight;
  if(lcID && sessionStorage['FRAME_' + lcID]){
    liWidth=sessionStorage['FRAME_' + lcID].getEntry(0);
    liHeight=sessionStorage['FRAME_' + lcID].getEntry(1);
  }
  else {
    liWidth=parseInt(lcHref.getQueryValue('appwidth'));
    if(isNaN(liWidth)) liWidth = 600;
    liHeight=parseInt(lcHref.getQueryValue('appheight'));
    if(isNaN(liHeight)) liHeight = 400;
  }
  
  if(liHeight < 250) liHeight=250;

  if(liWidth>document.body.clientWidth)liWidth=document.body.clientWidth;
  if(liHeight>document.body.clientHeight)liHeight=document.body.clientHeight;
  
  lbSideDialog = (lcHref.getQueryValue('sideDialog') == 'Y');
  if (lbSideDialog==true) {
    liHeight = document.body.clientHeight;
    loPosition = {my:"right top", at:"right top", of: window};
  }

  if (lcHref.getQueryValue('sizeToFit') == 'Y') {
    liHeight = document.body.clientHeight - 100;
    liWidth = document.body.clientWidth - 100;
  }

  lcHref=lcHref.setQueryValue('iframe','true');
  lcHref=lcHref.setQueryValue('dialog','Y');
  lcHref = lcHref.replace('woframe.p','wocoins.p');
   
  if(lcHref.inQuery('afterPost')==false) 
    lcHref=lcHref.setQueryValue('afterPost','hCOINSMain.desktopDialogClose()');

  lhDialog=$('<DIV id="desktopDialog" title="' + lcTitle
  + '"'
  + ' data-menuitem="' + lcID + '"'
  + '><IFRAME width="100%" height="99%" src="'
  + /*lcHref +*/ '"></IFRAME>'
  + '</DIV>').dialog({
    width:liWidth,
    height:liHeight,
    show: {effect:"scale",easing:"easeOutSine",duration:200},
    hide: {effect:"scale",easing:"easeInSine",duration:200},
    modal:true,
    dialogClass: "systemdialog",
    position: loPosition,
    resizeStop: function(){
      bind(this,setAppSize)();
    },
    open: function(event,ui) {
      setTimeout(bind(this,function() {
        var lhiframe=$(this).find('iframe')[0]
        if(lhiframe){
        var lhDoc=lhiframe.contentDocument;
    if(bNewUI) 
      lhDoc.body.innerHTML='<div style="position:relative;top:50%;'
                        +'width:100;margin:auto">'
                        + '<img src="'
                        + getSVGURL('busy$',oPalette.theme)
                        + '" class="fa-spin" style="height:48px"'
                        + '></div>';
    else
        lhDoc.body.innerHTML
          ='<div style="position:relative;top:50%;'
          +'width:100;margin:auto">'
                        +'<img src="/coins/' + cWebImgs 
                        + '/images/coins_preloader.gif"'
                        + '>';
          + '</div>';
          lhDoc.location.replace(lcHref);
        } /* if lhiframe */
      }),300);
      /* setTimeout(bind(this,function() {
        $(this).find('iframe').attr('src',lcHref);
      }),300);*/
    },
    beforeClose: function(event,ui) {
     /* remove iframe before close effect as moves in DOM and refreshes */
     this.innerHTML='';
    },
    close: function(event, ui){
      lcReturn=$(this).data('return');
      $(this).dialog('destroy').remove();
      if(typeof phOnClose=="function") phOnClose(lcReturn);
    }
  });
  lhDialog.dialogExtend({"closable" : true});
  var lhDialog=lhDialog.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',lcColour) + ')',
    "background-position": 0
    });
  }
  
  if (lbSideDialog==true) {
    lhDialog.find(".ui-dialog-content").css({"padding": "0px"});
  }

}

function desktopDialogUpdate(pcTitle,pcHTML,phOpen,phOK,piWidth,piHeight) {

  if(bDesktopFrame) {
    hCOINSMain.parent.desktopDialogUpdate(pcTitle,pcHTML,phOpen,phOK,piWidth,piHeight);
  }
  else {

  var liWidth = (piWidth == undefined ? 600 : piWidth);
  var liHeight = (piHeight == undefined ? 400 : piHeight);

  if(liHeight < 250) liHeight=250;

  if(liWidth>document.body.clientWidth)liWidth=document.body.clientWidth;
  if(liHeight>document.body.clientHeight)liHeight=document.body.clientHeight;

  lhDialog=$('<DIV id="desktopDialog" title="' + unescape(pcTitle)
  + '">' + pcHTML
  + '</DIV>').dialog({
    width:liWidth,
    height:liHeight,
    show: {effect:"scale",easing:"easeOutSine",duration:200},
    hide: {effect:"scale",easing:"easeInSine",duration:200},
    resizable: false,
    modal:true,
    dialogClass: "systemdialog",
    open: phOpen,
    beforeClose: function(event,ui) {
    },
    close: function(event, ui){
      ajaxStatusNew();
      $(this).dialog('destroy').remove();
    },
    buttons:[
     {text:cOK,
      id: "action:save",
      class: "buttonanchor text-image-button coinsok",
      click:function() {
        phOK();
      }
     },
     {text:cCancel,
        "class":"buttonanchor text-image-button coinscancel",
        id:"undo",
      click:function() {
        $(this).dialog("close");
      }
     }
    ]
  });
  lhDialog.dialogExtend({"closable" : true});

  /* dialog overlay */
  lhDialog.dialog('widget').append(
    '<div class="dialog_overlay">'
    + '<img src="' + getSVGURL('busy$',oPalette.theme)
      + '" class="fa-spin" style="height:48px">'
    + '</div>'
  );

  var lhDialog=lhDialog.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',lcColour) + ')',
    "background-position": 0
    });
  
  }

}

function desktopDialogClose(phClose,pConfig) {
  /* if closing then redirect any info to parent */
  hMessageWindow=parent;
  var lhDialog=parent.$('div#desktopDialog:last');
  if(phClose) phClose(pConfig);
  lhDialog.dialog('close');
}
function desktopDialogReturn(pcReturn) {
  var lhDialog=parent.$('div#desktopDialog:last');
  lhDialog.data('return',pcReturn);
  desktopDialogClose();
}
function desktopFrameClose(phClose,pConfig) {
  var lcFrameID=location.href.getQueryValue('frameID');
  if(bDesktopFrame && lcFrameID) {
    var lhFrame=parent.$('#frameID' + lcFrameID);
    if(phClose) phClose(pConfig);
    lhFrame.dialog('close');
  }
}

function coinsConfirm(pcText,phOK,phCancel) {

  if(bDesktopFrame) {
    hCOINSMain.parent.coinsConfirm(pcText,phOK,phCancel);
  }
  else {

  var lhConfirm=$('<DIV class="coinsalert" title="' + cWarning + '">'
  + '<table><tr><td>'
  + '<img src="/coins/' + cWebImgs + '/images/'
  + ((bNewUI)?'alert.svg':'alert.png')
  + '">'
  + '</td><td><div style="max-height:400px;overflow:auto">'
  + pcText
  + '</div></td></tr></table></DIV>').dialog({
    show: {effect:"fade",easing:"easeOutSine",duration:200},
    /*hide: {effect:"fade",easing:"easeInSine",duration:200},*/
    width:400,
    modal:true,
    resizable: false,
    dialogClass: "systemconfirm systemalert",
    close: function(event, ui){
      $(this).dialog('destroy').remove();
    },
     buttons:[
     {text:cOK,
      id: "action:save",
      class: "buttonanchor text-image-button coinsok",
      click:function() {
        if(phOK) {
          if(phOK()!=false)
            $(this).dialog("close");
        }
        else 
          $(this).dialog("close");
      }
     },
     {text:cCancel,
        "class":"buttonanchor text-image-button coinscancel",
        id:"undo",
      click:function() {
        if(phCancel) {
          if(phCancel()!=false)
            $(this).dialog("close");
        }
        else 
          $(this).dialog("close");
      }
     }
     ]
     
  });
  lhConfirm.dialogExtend({"closable" : true});
  var lhDialog=lhConfirm.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',lcColour) + ')',
    "background-position": 0
    });
  }

}

function coinsError(pcText,phOK) {

  if(bDesktopFrame) {
    hCOINSMain.parent.coinsError(pcText,phOK);
  }
  else {

  var lhConfirm=$('<DIV class="coinsalert" title="' + cError + '">'
  + '<table><tr><td>'
  + '<img src="/coins/' + cWebImgs + '/images/'
  + ((bNewUI)?'error.svg':'error.png')
  + '">'
  + '</td><td><div style="max-height:400px;overflow:auto">'
  + pcText
  + '</div></td></tr></table></DIV>').dialog({
    show: {effect:"fade",easing:"easeOutSine",duration:200},
    /*hide: {effect:"fade",easing:"easeInSine",duration:200},*/
    width:400,
    modal:true,
    resizable: false,
    dialogClass: "systemerror systemalert",
    beforeClose: function (event, ui) {
      if(phOK) return phOK();
    },
    close: function(event, ui){
      $(this).dialog('destroy').remove();
    },
     buttons:[
     {text:cOK,
      id: "action:save",
      class: "buttonanchor text-image-button coinsok",
      click:function() {
          $(this).dialog("close");
      }
     }
     ]
     
  });
  lhConfirm.dialogExtend({"closable" : true});
  var lhDialog=lhConfirm.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',lcColour) + ')',
    "background-position": 0
    });
  
  }
}

function coinsAlert(pcText,phOK,piWidth) {

  if(bDesktopFrame) {
    hCOINSMain.parent.coinsAlert(pcText,phOK);
  }
  else {

  var lhConfirm=$('<DIV class="coinsalert" title="' + cAlert + '">'
  + '<table><tr><td>'
  + '<img src="/coins/' + cWebImgs + '/images/'
  + ((bNewUI)?'info.svg':'info.png')
  + '">'
  + '</td><td><div style="max-height:400px;overflow:auto">'
  + pcText
  + '</div></td></tr></table></DIV>').dialog({
    show: {effect:"fade",easing:"easeOutSine",duration:200},
    /*hide: {effect:"fade",easing:"easeInSine",duration:200},*/
    width: (piWidth == undefined ? 400 : piWidth),
    modal:true,
    resizable: false,
    dialogClass: "systemdialog systemalert",
    beforeClose: function (event, ui) {
      if(phOK) return phOK();
    },
    close: function(event, ui){
      $(this).dialog('destroy').remove();
    },
     buttons:[
     {text:cOK,
      id: "action:save",
      class: "buttonanchor text-image-button coinsok",
      click:function() {
          $(this).dialog("close");
      }
     }
     ]
     
  });
  lhConfirm.dialogExtend({"closable" : true});
  var lhDialog=lhConfirm.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',lcColour) + ')',
    "background-position": 0
    });
  }
}

var iDesktopFrameID=0;
function getFrameID() {
  iDesktopFrameID++;
  return iDesktopFrameID;
}

function desktopFrame(pcID,pcTitle,phAnchor,pbBanner) {
  var lcHref='';

  if(bDesktopFrame) {
    hCOINSMain.parent.desktopFrame(pcID,pcTitle,phAnchor,pbBanner);
  }
  else {

  if(typeof phAnchor=="string")
    lcHref=phAnchor;
  else
    lcHref=phAnchor.href;
    
  var lcFrameID=getFrameID();  

  var liWidth,liHeight,lbMax=false;
  if(pcID && sessionStorage['FRAME_' + pcID]){
    liWidth=sessionStorage['FRAME_' + pcID].getEntry(0);
    liHeight=sessionStorage['FRAME_' + pcID].getEntry(1);
    lbMax=(sessionStorage['FRAME_' + pcID].getEntry(2)=="true");
  }
  else {
    liWidth=parseInt(lcHref.getQueryValue('appwidth'));
    if(isNaN(liWidth)) liWidth = document.body.clientWidth - 100;
    liHeight=parseInt(lcHref.getQueryValue('appheight'));
    if(isNaN(liHeight)) liHeight = document.body.clientHeight - 180;
    if(lcHref.getQueryValue('appmax')=='Y') lbMax=true;
  }

  if(liHeight < 250) liHeight=250;
  
  if(liWidth>document.body.clientWidth)liWidth=document.body.clientWidth;
  if(liHeight>document.body.clientHeight)liWidth=document.body.clientHeight;
  
  lcHref = setParam(lcHref,'iframe=true');
  lcHref = lcHref.replace('woframe.p','wocoins.p');
  
  var lcBg,lcFg;
  lcBg=lcHref.getQueryValue('background-color');
  try {
  if(!lcBg)
    lcBg = $(phAnchor).parents('.box').css('background-color');  
  lcFg=lcHref.getQueryValue('color');
  if(!lcFg)  
    lcFg = $(phAnchor).parents('.box').css('color');
  }
  catch(e) {}
  
  lcHref=setParam(lcHref,'FrameBanner=' 
                + ((pbBanner)?'Y':'N'));
  lcHref=setParam(lcHref,'frameID=' + lcFrameID);
  
  var dialogExtendOptions = {
    "closable" : true,
    "maximizable" : true,
    "minimizable" : true,
    "minimizeLocation" : "left",
    "collapsable" : false,
    "dblclick" : "maximize",
    "minimize": function() {
      statusFlash();
    },
    "restore": function() {
      statusOut;
      bind(this,setAppSize)();
    },
    beforeMaximize: function(evt) {
      this.setAttribute('data-width',$(this).parent().width());
      this.setAttribute('data-height',$(this).parent().height());
    },
    maximize: function() {
      bind(this,setAppSize)();
    },
    "buttonbar": {
      "refresh": {
        title: "Refresh",
        action: function(phA,phEvent) {
          if(phEvent.shiftKey && (phEvent.altKey || phEvent.ctrlKey)) {
          var lhLoc=$(phA)
          .parent().parent().parent()
          .find('.desktopframe iframe')[0]
          .contentDocument.location;
          var lcHref=lhLoc.href;
          
    if (lcHref.getQueryValue("COINSInfo") == "true") {
      lcHref=lcHref.setQueryValue("COINSInfo","");
    }
    else {
      lcHref=lcHref.setQueryValue("COINSInfo","true");
    }
          lhLoc.replace(lcHref);
          }
          else {
          $(phA)
          .parent().parent().parent()
          .find('.desktopframe iframe')[0]
          .contentDocument.location.reload()
          }
        }
      },
      "help": {
        title: "Help",
        action: function(phA) {
          $(phA)
          .parent().parent().parent()
          .find('.desktopframe iframe')[0]
          .contentWindow.showHelpFrame()
        }
      }
    }
    };
    
  var lbSystem=("preferences,favourites,activityWorkbench,reportStatus"
                .inList(phAnchor.id)
                ||
                (typeof phAnchor=="object" && $(phAnchor).hasClass('system'))
               );
                
  var lhDialog=$('<DIV class="desktopframe"'
  + ' title="' + unescape(pcTitle).replace(/"/g,'&quot;') + '"'
  + ' data-menuitem="' + pcID + '"'
  + ((lbMax)?' data-max="Y"':'')
  + ' id="frameID' + lcFrameID + '"'
  + '><IFRAME width="100%" height="99%" src="'
  + '"></IFRAME>'
  + '<DIV class="cover"></DIV>'
  + '</DIV>').dialog({
    width:liWidth,
    height:liHeight,
    show: {effect:"scale",easing:"easeOutSine",duration:200},
    hide: {effect:"scale",easing:"easeInSine",duration:200},
    dialogClass: ((lbSystem)?'systemdialog':''),
    resizeStart: function() {
      $(this).parent().find('div.cover')
      .show()
       .css({ opacity: 0.2,
             width:$(document).width(),
             height:$(document).height()})
    },
    resizeStop: function(){
     $(this).parent().find('div.cover').hide();
     bind(this,setAppSize)();
    },
    open: function(event,ui) {
      setTimeout(bind(this,function() {

        if(this.getAttribute('data-max')=="Y") {
          $(this).dialogExtend('maximize');
          lcHref=lcHref.setQueryValue('pvFrame',
                                      'F,' + $(this).width() 
                                    + ',' + $(this).height());
        }
      
        var lhiframe=$(this).find('iframe')[0]
        var lhDoc=lhiframe.contentDocument;
      if(bNewUI) 
      lhDoc.body.innerHTML=
        '<link rel="STYLESHEET" type="text/css" href="/coins/'
      + cWebStyle + '/style/fonts.css">'
                        + '<div style="position:relative;top:50%;'
                        +'width:100;margin:auto">'
                        + '<img src="'
                        + getSVGURL('busy$',oPalette.theme)
                        + '" class="fa-spin" style="height:48px"'
                        + '></div>';
      else
        lhDoc.body.innerHTML
          ='<div style="position:relative;top:50%;'
          +'width:100;margin:auto">'
                        +'<img src="/coins/' + cWebImgs 
                        + '/images/coins_preloader.gif"'
                        + '>';
          + '</div>';
        lhDoc.location.replace(lcHref);
      }),300);
      /*
      setTimeout(bind(this,function() {
        $(this).find('iframe').attr('src',lcHref);
      }),300);
      */
    },
    beforeClose: function(event,ui) {
     /* remove iframe before close effect as moves in DOM and refreshes */
     this.innerHTML='';
    },
    close: function(event, ui){
      $(this).dialog('destroy').remove();
      setFrameButtons();
    }
  });
  lhDialog.prev(".ui-dialog-titlebar")
          .css("background",lcBg)
          .css("color",lcFg);
          
  lhDialog.dialogExtend(dialogExtendOptions);

  var lhDialog=lhDialog.parent();
  var lhPane=lhDialog.find(".ui-dialog-titlebar-buttonpane")
    .css("top","40%");
  var lcColour=lhPane.parent().css('color');
  
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',lcColour) + ')',
    "background-position": 0
    });
  lhDialog.find('.ui-icon-newwin')
  .css({
    "background-image":
      'url(' + getSVGURL('restore_popup$',lcColour) + ')',
    "background-position": 0
    });
  lhDialog.find('.ui-icon-extlink')
  .css({
    "background-image":
      'url(' + getSVGURL('maximize_popup$',lcColour) + ')',
    "background-position": 0
    });
  lhDialog.find('.ui-icon-minus')
  .css({
    "background-image":
      'url(' + getSVGURL('minimize_popup$',lcColour) + ')',
    "background-position": 0
    });
  lhDialog.find('.ui-icon-refresh')
  .css({
    "background-image":
      'url(' + getSVGURL('refresh_popup$',lcColour) + ')',
    "background-position": 0
    });
  lhDialog.find('.ui-icon-help')
  .css({
    "background-image":
      'url(' + getSVGURL('help_popup$',lcColour) + ')',
    "background-position": 0
    });

  setFrameButtons();
  }
}

function setAppSize() {
   var lcID=this.getAttribute('data-menuitem');
   var lbMax;
   if(lcID && lcID!="null") {
     if($(this).dialogExtend('state')=='maximized') {
       liWidth=this.getAttribute('data-width');
       liHeight=this.getAttribute('data-height');
       lbMax=true;
     }
     else {
       liWidth=$(this).parent().width();
       liHeight=$(this).parent().height();
       lbMax=false;
     }
     lcURL='id=' + encodeURIComponent(lcID)
          + '&appwidth=' + liWidth
          + '&appheight=' + liHeight
          + '&appmax=' + lbMax;

     ajaxPost('syasur.setAppSize',lcURL);

     /* if ID is rowid then tile so set href */
     var tile = null;
     if (lcID.substring(0,2) == "0x")
       tile = document.querySelector('[id^="' + lcID + '"]');

     if (tile) {
       lchref=tile.href;
       lchref=lchref.setQueryValue('appwidth',liWidth);
       lchref=lchref.setQueryValue('appheight',liHeight);
       lchref=lchref.setQueryValue('appmax',lbMax);
       tile.href=lchref;
     } else {
       sessionStorage['FRAME_' + lcID]=liWidth + ',' + liHeight + ',' + lbMax;
     }
   }
}

function minimizeDesktopFrames() {
  var lhFrames=$('div.desktopframe');
  for (i=0;i<lhFrames.length;i++) {
    if(!$(lhFrames[i]).hasClass('ui-dialog-minimized'))
      $(lhFrames[i]).dialogExtend('minimize');
  }
}
function restoreDesktopFrames() {
  var lhFrames=$('div.desktopframe');
  for (var i=0;i<lhFrames.length;i++) {
    if($(lhFrames[i]).hasClass('ui-dialog-minimized'))
      $(lhFrames[i]).dialogExtend('restore');
  }
}

function setLocalStorage(pcID,pcValue) {
  localStorage.setItem(cEnv + '|' + pcID,pcValue);
}

function addFrameURL() {
  if(window==top)
  return '&pvFrame='
       + 'W,' + $(window).width() + ',' + $(window).height();
  else
  return '&pvFrame='
       + 'F,' + $(window).width() + ',' + $(window).height();
}

function selectRole(phRole) {
  lcHref = location.search;
  lcHref="?" + buildURL(lcHref,"short","pvFrame");
  lcHref= "wouajax.p"
          + lcHref
          + '&desktop=' + phRole.value
          + '&ajaxMethod=syasur.selectrole';
  loadXMLDoc(lcHref);
}

function refreshDesktop(input,response) {
  desktopLogo.click();
}

function setRole(phObject) {
  /* set role text */
  $('div#roleSelector div.cds-dropdown-btn__data div.cds-dropdown-btn__value')
    .text($(phObject).find('div.cds-role-title').text());
  /* set icon and colour */
  $('div#roleSelector div.cds-dropdown-btn__icon')
    .css('background',$(phObject).find('.cds-role-icon').css('background'))
    .html($(phObject).find('.cds-role-icon').html())
}
function setFunctionSearch() {
  $('#roleSearch').on('keyup',functionRoleSearchKeyUp);
  // don't bother with role search if 3 or less roles
  if($('#rolepopup .cds-dropdown__item').length<=2) $('#rolepopup .cds-dropdown__search').hide();
  $('#rolepopup .cds-dropdown__item').each(function(){
    if(this.getAttribute('data-role')===cUserRole)
      setRole(this);
  });

  $('#functionSearch').on('keyup',functionSearchKeyUp)
  .on('mouseup',function() {
     setTimeout(bind(this,function() {
       if(this.value=='') {
       clearFunctionSearch();
       }
     }),1);
   });
  $('i#clearicon').on('click',function(){
    functionSearch.value='';
    clearFunctionSearch();
  });
}
function clearFunctionSearch() {
    $('div#functionSearchInput')
      .removeClass('filter-on')
    menuTree.style.display='';
    /* restore menu position */
    if(treeView.scrollTop==0)
      treeView.scrollTop=iMenuScrollTop;
    functionSearchList.innerHTML='';
    iFunctionSearchResults=0;
    iFunctionSearchRow=0;
}

var functionRoleSearchKeyUp = function(phEvent) {
  /* ignore shift, ctrl, alt */
  if(phEvent.keyCode==16 || phEvent.keyCode==17 || phEvent.keyCode==18) return;
  if(phEvent.keyCode==191 && phEvent.ctrlKey && phEvent.shiftKey) return;

  var lcSearch=this.value;

  if(this.value=='') {
    $('.cds-dropdown__item').show();
  }
  else {
    $('.cds-dropdown__item').each(function(index){
      var lhRole$=$(this);
      if(lhRole$.text().toLowerCase().search(lcSearch.toLowerCase())==-1)
        lhRole$.hide();
      else
        lhRole$.show();
    });
  }
}

var hFunctionSearchTimer,iFunctionSearchResults=0,iFunctionSearchRow=0;
var iMenuScrollTop=0;
var functionSearchKeyUp = function(phEvent) {

  /* ignore shift, ctrl, alt */
  if(phEvent.keyCode==16 || phEvent.keyCode==17 || phEvent.keyCode==18) return;
  if(phEvent.keyCode==191 && phEvent.ctrlKey && phEvent.shiftKey) return;

  if(iFunctionSearchResults!=0) {
    if(phEvent.keyCode==38 || phEvent.keyCode==40) {

      functionSearchHighlight(false);
  
      if(phEvent.keyCode==38 && iFunctionSearchRow>1) iFunctionSearchRow--
      if(phEvent.keyCode==40 && iFunctionSearchRow<iFunctionSearchResults) 
        iFunctionSearchRow++
  
      functionSearchHighlight(true);
        
      return;
    }
    else if(phEvent.keyCode==13) {
      if(iFunctionSearchRow==0) return false;
      
      $('#functionsearchlist tr.resultrow')
        .eq(iFunctionSearchRow - 1).find('a')[0].click();
      return false;
    }
  }

  /* cancel any outstanding request */
  if(hFunctionSearchTimer) clearTimeout(hFunctionSearchTimer);

  if(this.value!='' && encodeURIComponent(this.value).length>=3) {
  hFunctionSearchTimer = setTimeout(bind(this,function() {
  /* search for this.value */

  /* get history via ajax and show the results */
  lcHref = location.search;
  lcHref="?" + buildURL(lcHref,"short","pvFrame");
  var lcSearchTypes = "FUNCTION";
    
  lcHref= "wouajax.p"
          + lcHref
          + addFrameURL()
          + '&ajaxInput=' + hFunctionSearchTimer
          + '&ajaxMethod=syasur.functionsearch'
          + '&userrole=' + cUserRole
          + '&globalsearch=' 
          + encodeURIComponent(this.value)
          + '&searchtype=' 
          + encodeURIComponent(lcSearchTypes);
    iFunctionSearchResults=0;
    iFuntionSearchRow=0;
    iMenuScrollTop=treeView.scrollTop;
    menuTree.style.display='none';
    $('div#functionSearchInput')
      .addClass('filter-on');
    if(bNewUI) 
    functionSearchList.innerHTML='<img src="'
                        + getSVGURL('busy$',oPalette.theme)
                        + '" class="fa-spin"'
                        + ' style="margin-top:168px;margin-left:'
                        + ((treeView.offsetWidth - 64) / 2)
                        + 'px;height:48px"'
                        + '>';
    else
    functionSearchList.innerHTML='<img src="/coins/' + cWebImgs 
                        + '/images/coins_preloader.gif"'
                        + ' style="margin-top:168px;margin-left:'
                        + ((treeView.offsetWidth - 64) / 2)
                        + 'px"'
                        + '>';
    
  loadXMLDoc(lcHref)
  
  }),500);
  }
  else {
    clearFunctionSearch();
  }

} 

function ajaxFunctionSearchList(input,response) {

  /* if we have moved on then do nothing */
  if(hFunctionSearchTimer!=input) return;

  functionSearchList.innerHTML=response;
  
  iFunctionSearchResults=$('table#functionsearchlist tr.resultrow').length;
  iFunctionSearchRow=0;
  /*if(iGlobalSearchResults!=0) {
    $('#globalsearchresults tr.resultrow').first().addClass('highlight');
    iGlobalSearchRow=1;
  }*/

  $('table#functionsearchlist tr.resultrow')
    .on('mouseover',function(){
      var lhResult=this;
      functionSearchHighlight(false);
      $('table#functionsearchlist tr.resultrow').each(function(liIndex){
        if(this==lhResult)iFunctionSearchRow=liIndex + 1;
      });
      functionSearchHighlight(true);
    })
  
}

function functionSearchHighlight(pbOn) {
  if(pbOn) {
    var lhRow=$('#functionsearchlist tr.resultrow')
    .eq(iFunctionSearchRow - 1).addClass('highlight');
    
    lhRow=lhRow[0];
    var lhDiv = el$('functionSearchList');
    var liTop;
         if(lhRow.offsetTop + lhRow.offsetHeight
       >lhDiv.scrollTop + lhDiv.offsetHeight) {
      liTop = lhRow.offsetTop 
            + lhRow.offsetHeight 
            - lhDiv.offsetHeight;
      lhDiv.scrollTop=liTop;
     }
     else if(lhRow.offsetTop < lhDiv.scrollTop) {
      lhDiv.scrollTop=lhRow.offsetTop;
     }
    
  }
  else {
    $('#functionsearchlist tr.resultrow')
    .eq(iFunctionSearchRow - 1).removeClass('highlight');
  }
}


function moveNavTracker(){
  $currentSubPage = $('div.nav-header').find('.on');
  if($currentSubPage.length==0) return;
  /* -12 is padding on the nav-header */
  $('#nav-header-tracker').css({
    "width": $currentSubPage.outerWidth(),
    "margin-left": ($currentSubPage.position().left) 
  });
  
}

function reloadUserImg() {
  var img$=el$('user-image');
  var lcURL=img$.style.backgroundImage;
  /* change URL to force reload */
  lcURL=lcURL.replace('mod-time=','mod-time=X');
  img$.style.backgroundImage=lcURL;
  
  /* refresh image in mainarea too */
  img$=mainarea.getFrame.el$('user-image');
  if(img$) img$.style.backgroundImage=lcURL;
  
}

function reloadUserName(pcName) {
  var hCOINSTop=getCOINSTop();
  pcName=valueEncode(pcName);
  hCOINSTop.$('div#user-name').html(pcName);
  
  if(typeof hCOINSTop.mainarea == "object" 
  && typeof hCOINSTop.mainarea.getFrame == "object")
    hCOINSTop.mainarea.getFrame.$('div#user-name').html(pcName);
}

function emailLink() {
  lcHref=escape(hCOINSMain.mainarea.document.location.href);
  /* email does not like &pi_ but it's OK with &PI_ !!!! */
  lcHref=replaceAll(lcHref,"%26pi_","%26PI_");
  if (lcHref) {
    window.open("mailto:"
         +"?subject=" + escape(hCOINSMain.document.title) + "&body="
         +lcHref, "_self");
  }
}

function issueReport(pcTitle,pcFunction) {
  if(pcFunction=="") pcFunction = '%WSY2580FXXX';
  var lcHref = "woframe.p?" 
             + "kco=" + location.href.getQueryValue("kco") 
             + '&MainArea=' + escape(pcFunction)
             + '&mf_function=' 
             + hCOINSMain.mainarea.document.location.href
               .getQueryValue('MainArea')
             + '&appwidth=800';
  hCOINSMain.desktopDialog(pcTitle,lcHref);
}

function issueInfo() {
  var lcAlerts='';
  var hCOINS=getCOINSTop();
  var lcPlus='';
  try {
    lcPlus = hCOINS.mainarea.getFrame.plusversion.innerText;
  } catch(e) { }
  
  hCOINS.$('div#coinslog div.coinsalert div.row').each(function() {
    lcAlerts= lcAlerts
            + this.children[0].innerText
            + ' ' 
            + this.children[1].innerText
            + '\n';
  });
  var lcInfo = navigator.userAgent + '\n\n'
             + ((lcPlus=='')?'':'+ ' + 'User Modified Page\n\n')
             + ((lcAlerts=='')?'':lcAlerts + '\n')
             + hCOINS.mainarea.document.location.href + '\n'
             ;
  return lcInfo;
}

function userAgentInfo() {
  var lcAgentInfo = navigator.userAgent;
  return lcAgentInfo;
}

function userPluginsInfo() {
  var ipluginsLength = navigator.plugins.length;
  let lcPlugins = '';
  for(var i = 0; i < ipluginsLength; i++) {
      if(i==0);
      else
       lcPlugins += ',';
      lcPlugins += navigator.plugins[i].name;
  }
  return lcPlugins;
}

function userWindowInfo() {
  let lcWindow = '';
  lcWindow = 'width=';
  lcWindow += screen.width;
  lcWindow += '&height=';
  lcWindow += screen.height;
  lcWindow += '&scaling-factor=1';
  lcWindow += '&colour-depth=';
  lcWindow += screen.colorDepth;
  return lcWindow;
}

function downloadFile(pcFile,pcName,pcHash,pbDelete) {
   var lcHref='wourun.p?program=sywraw&filename='
             + encodeURIComponent(pcFile)
             + '&attachname=' + pcName
             + ((pbDelete)?'&delete=Y':'')
             + '&' + pcHash;
   var anchor=document.createElement('a');
   anchor.href = lcHref;
   anchor.setAttribute("download",pcName);
   anchor.style.display = "none";
   document.body.appendChild(anchor);
   setTimeout(function() {
     anchor.click();
     console.log(anchor);
     document.body.removeChild(anchor);
   }, 100);
   
}

var theFiles;
var theImagelink;
function uploadFiles(files,imagelink) {
  theFiles=files;
  theImagelink=imagelink;
  var lcHref = 'wocoins.p?'
             + buildURL(location.search,"short","")
             + '&MainArea=%25WSYFPUT';

  desktopDialog(
    'Upload Files',
    lcHref,
    function() {
      theFiles = null;
      theImageLink = null;
    }
  );
}

function initNewDesktop() {

  $('.cds-accordion__head').on('click',function() {
  
  if(bShiftKey && (bCtrlKey || bAltKey)) {
    /* launch section maintenance */
    phAnchor=$(this).find('A')[0];
    if(phAnchor) 
      desktopFrame('',phAnchor.title,phAnchor);
    return;
  }
  
    /* if active then add to list, otherwise delete */
    var lcSectionList
      = localStorage.getItem(cEnv + "|desktop|sections");
    if(lcSectionList==null || lcSectionList==undefined) lcSectionList='';      
      
    if($(this).hasClass('is-active'))
      lcSectionList=lcSectionList.deleteFromList(this.id);
    else
      lcSectionList=lcSectionList.addToList(this.id);
      
    window.localStorage.setItem(cEnv + "|desktop|sections",lcSectionList);
    
    this.classList.toggle("is-active");
    
    var panel = this.nextElementSibling;
    panel.classList.toggle("is-active");
    /*if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
      } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }*/ 
    
    newLoadTiles();
    
  });

  /* select default tab */
  var lcDefaultTab
    = localStorage.getItem(cEnv + "|desktop|tab");
    
  var lcTab$;
  if(lcDefaultTab)
    lcTab$=$('button.cds-tabs__btn#' + lcDefaultTab);
  if(lcTab$ == undefined || lcTab$.length==0)lcTab$=$($('.cds-tabs__btn')[0])
  if(lcTab$)
    lcTab$.click();

}

function openTab(evt, tabName) {

  /* if tab active do nothing */
  if($(evt.target).hasClass('is-active') 
     || !$('div.cds-tabs')) return;
  
  $('.cds-tabcontent').hide();
  $('.cds-tabs__btn').removeClass('is-active');
  var lhTab$=$('#' + tabName)
  lhTab$.css('display','block');
  $(evt.target).addClass('is-active');
  
  window.localStorage.setItem(cEnv + "|desktop|tab",'tab' + tabName);
  
  var lcSectionList
    = localStorage.getItem(cEnv + "|desktop|sections");
  if(lcSectionList==null || lcSectionList==undefined) lcSectionList='';      

  lhSections$=lhTab$.find('div.cds-accordion__head');
  /* if only one section - open it */
  if(lhSections$.length==1){
    /* if section not active then click it */
    if(!$(lhSections$).hasClass('is-active'))
      $(lhSections$[0]).click().addClass('is-active');
  }
    
  if (lcSectionList!=null && lcSectionList!="") {
  
    var lcSections=lcSectionList.split(",");
  
    lcSectionList = '';
    for (var i = 0; i < lcSections.length; i++) {
      lcSection$=$('#' + lcSections[i]);
      if(lcSection$.length>0) {
        if(lcSection$.is(':visible') && !lcSection$.hasClass('is-active')) {
          lcSection$.click();
        }
        lcSectionList = lcSectionList + ',' + lcSections[i];
      }
    }

    lcSectionList=lcSectionList.substring(1);
    window.localStorage.setItem(cEnv + "|desktop|sections",lcSectionList);
  }
  
  newLoadTiles();
  
}

function newLoadTiles() {


    $('iframe.inlinetile.toload').each(function() {
      if($(this).parents('div.cds-accordion__body.is-active').length>0
         &&
         $(this).parents('div.cds-tabcontent:visible').length>0
        ) {
        $(this).removeClass('toload');
        this.contentDocument.location.href=this.getAttribute('data-src');
      }
    });
    
    $('div.boxchart.toload').each(function() {
      if($(this).parents('div.cds-accordion__body.is-active').length>0
         &&
         $(this).parents('div.cds-tabcontent:visible').length>0
        ) {
        $(this).removeClass('toload');
        var lcFunc='loadTile' + this.getAttribute('data-func') + '()';
        try {
          eval(lcFunc);
        } catch(e) {
          console.error('%s failed', lcFunc, e);
        }
      }
    });     
}

function menuFilter(searchinput) {
  var lcSearch=searchinput.value;
  var lhTiles$=$(searchinput).parents('div.cds-card').find('a.cds-card-tiles__item');
  lhTiles$.show();
  for (var i = 0; i < lhTiles$.length; i++) {
    if(!$(lhTiles$[i]).find('span')[0].innerText.toLowerCase().includes(lcSearch.toLowerCase())) $(lhTiles$[i]).hide();
  }
}
