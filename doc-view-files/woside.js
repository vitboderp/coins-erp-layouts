/*-
     Program: woside.js
 Description: Side Frame Scripts
-*/

function getWidth(pcWidth) {
    /* in IE8 sometimes adds 00 to width when manually moved ????
       or creates very large numbers
    */
    liWidth=parseInt(pcWidth);
    if (liWidth>2000) {
      pcWidth=pcWidth.substring(0,pcWidth.length - 2);
    }
    return pcWidth;
}
var selectedJobParams='';
function selectCompany(phCompany, pcKcoJobPhase) {
  //lhWindow=hCOINSMain;
  //if (lhWindow==undefined) {
  lhWindow=parent.mainarea;
  //}
  if (lhWindow==undefined) {
    lhWindow=window;
  }
  
  lbHomePage = hMainLayout.center.children.layout1.state.north.isVisible;

  lcCompany = phCompany.options[phCompany.selectedIndex].value;
  lcTopMenu = phCompany.options[phCompany.selectedIndex].TopMenu;
  
  // parent will be the top of the COINS frameset
  // If we have any Rowid's then go to same topmenu and drop everything else
  if (lcTopMenu!=undefined) {
    lcHref = parent.location.pathname
        + "?TopMenu=" + lcTopMenu
        + "&kco=" + lcCompany;
  }
  else {
   try {
    var lcURL=mainarea.location.href.toLowerCase();
    
    /* keep function if only menuparm or sysuser */
    lcURL=lcURL.setQueryValue('sysuserrowid','');
    lcURL=lcURL.setQueryValue('menuparm','');
    
    /* will replace jc_job and pi_project later */
    lcURL = replaceAll(lcURL,'jc_jobrowid','');
    lcURL = replaceAll(lcURL,'pi_projectrowid','');
    if(lcURL.indexOf("rowid=0x") >= 0) {
    lcHref = location.pathname
        + "?TopMenu=" + mainarea.location.href.getQueryValue("TopMenu")
        + "&kco=" + lcCompany;
    } 
    else {
    lcHref=lhWindow.location.search;
    lcHref=lcHref.setQueryValue('jc_jobRowid','');
    lcHref=lcHref.setQueryValue('pi_projectRowid','');
    if (lcHref=="") lcHref=parent.location.search;
    // Just change the company
    lcHref = location.pathname
           + hCOINSMain.setThisQueryValue(lcHref,
            "kco",lcCompany);
    }
   }
   catch(e) {
    lcHref=location.search;
    // Just change the company
    lcHref = location.pathname
           + hCOINSMain.setThisQueryValue(lcHref,
            "kco",lcCompany);
   }
  }
  
  if(lbHomePage){
    lcHref=lcHref.setQueryValue('HomePage','Y');
  }
  else {
    lcHref=lcHref.setQueryValue('HomePage','N');
  }
  
  /*
  var arKcoJobPhase = pcKcoJobPhase.split(".");
  if ((arKcoJobPhase[0] ==
         phCompany.options[phCompany.selectedIndex].value) &&
      (arKcoJobPhase[1] != "")) {
     lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvjob",
                arKcoJobPhase[1]);
     if (arKcoJobPhase[3] == undefined) {
       lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvphase","",true);
       lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvhidemenu",
                arKcoJobPhase[2]);
     }
     else {
       lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvphase",
                arKcoJobPhase[2]);
       lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvhidemenu",
                arKcoJobPhase[3]);
     }
  }
  else {
    // why doesnt this setthisqueryvalue work?
    // hCOINSMain.setThisQueryValue(lcHref, "pvjob", "", false);
    // hCOINSMain.setThisQueryValue(lcHref, "pvphase", "", false);
    lcHref = lcHref.replace(("&pvjob=" +
                             parent.location.href.getQueryValue("pvjob")),
                            "");
    lcHref = lcHref.replace(("&pvphase=" +
                             parent.location.href.getQueryValue("pvphase")),
                            "");
    lcHref = lcHref.replace(("&pvhidemenu=" +
                             parent.location.href.getQueryValue("pvhidemenu")),
                            "");
  }
  */
  
  try {
  lcHref=hCOINSMain.setThisQueryValue(lcHref, "rtbtask",
           lhWindow.location.href.getQueryValue("rtbtask"));
  if (lhWindow.location.href.indexOf("pvCILevel") > -1) {
    lcHref=hCOINSMain.setThisQueryValue(lcHref, "pvCILevel",
             lhWindow.location.href.getQueryValue("pvCILevel"));
  }
  } catch(e) {}
  
  var lcAjax = 'wouajax.p?'
                  + buildURL(location.href,"short","pvFrame")
                  + '&ajaxMethod=sya002.selectedProjectParams';
  lcAjax = lcAjax.setQueryValue('kco',lcCompany);
                  
          $.ajax({
            type:"get",
            url: lcAjax,
            error: function(pcText) {
              alert('AJAX Failure');
            },
            success: function(pcText) {
              // response will set selectedJobParams
              ajaxResponse(pcText);
              if(typeof selectedJobParams=="string")
                lcHref = setParam(lcHref,selectedJobParams);
              parent.location.href =lcHref;
            }
          });

}

function setMenuCombos() {
  if(el$('companySelector')!=null)
    el$('companySelector').value=location.href.getQueryValue("kco");
  if(el$('moduleSelector')!=null)
    el$('moduleSelector').value=location.href.getQueryValue("TopMenu");
}

function selectModule(phModule) {
        // parent will be the top of the COINS frameset
        if (phModule.options[phModule.selectedIndex].value == "Logout") {
          parent.location.href = "wologin.p?type=logout";
        } else {
          lcHref= parent.location.pathname + "?TopMenu="
                + phModule.options[phModule.selectedIndex].value
                + "&kco="
                + getThisQueryValue(parent.location.href,"kco");

  if (parent.location.href.indexOf("pvjob") > -1) {
     // if they exist in the url make them persist
     lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvjob",
                parent.location.href.getQueryValue("pvjob"));
     lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvphase",
                parent.location.href.getQueryValue("pvphase"), true);
     lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvhidemenu",
                parent.location.href.getQueryValue("pvhidemenu"), true);
  }
  if (parent.location.href.indexOf("pvCILevel") > -1) {
     lcHref = hCOINSMain.setThisQueryValue(lcHref, "pvCILevel",
                parent.location.href.getQueryValue("pvCILevel"));
  }
          lcHref=hCOINSMain.setThisQueryValue(lcHref, "rtbtask",
                    parent.location.href.getQueryValue("rtbtask"));
          lcHref=hCOINSMain.setThisQueryValue(lcHref, "helpMode",
                    parent.location.href.getQueryValue("helpMode"));
          lcHref=hCOINSMain.setThisQueryValue(lcHref, "permUser",
                    parent.location.href.getQueryValue("permUser"));
          if(lcHref.inQuery('MainArea')) {
          }
          else {
            lcHref=lcHref + '&MainArea=';
          }
          parent.location.href =lcHref;
        }
}


function selectTask(phTask) {

          lcHref= parent.location.href;
          lcHref=hCOINSMain.setThisQueryValue(lcHref, "rtbtask", phTask.value)

          parent.location.href =lcHref;
}

function resizeMenu(){
  selectHeight = el$('selectors').offsetHeight;
  wholeHeight = el$('wholemenu').offsetHeight;
  logoHeight = el$('logoarea').offsetHeight;
  newHeight = wholeHeight - selectHeight - logoHeight;
  if (newHeight > 1) {
    el$('menuarea').style.height = newHeight;
  }
  menuHeight = el$('menuarea').offsetHeight;
}

var h;
function resizeMenuW3C(){
  
  try {
    clearTimeout(h);
  } catch(e) { } 
  
  /* set north pain size, resize and then reset to see status bar */
  if(hMainLayout.center.children.layout1.state.north.isVisible){
  hMainLayout.center.children.layout1.sizePane('north',1);
  hMainLayout.resizeAll();
  hMainLayout.center.children.layout1.sizePane('north',2000);
  }
  
  el$('treeView').style.display="none";
  
  h=setTimeout(function() {
 
  if(el$('selectors'))
    selectHeight = Math.max(realHeight(selectors),selectors.offsetHeight);
  else
    selectHeight = 0;
    
  wholeHeight = realHeight(sidemenu);
  /*logoHeight = el$('logoarea').offsetHeight;*/
  logoHeight=0;
  
  newHeight = wholeHeight - selectHeight - logoHeight - 6;
  
  if (newHeight > 1) {
    el$('treeView').style.height = newHeight + 'px';
  }
  el$('treeView').style.display="";
  
  resizeDesktopHeader();
  
  },500);
  
/*  menuHeight = el$('menuarea').offsetHeight;*/
}

function resizeDesktopHeader() {
  /* if header larger then 88 - north height then hide name */
  if($('#headerinner').length==1) {
   $('p.accountname').show();
   if(headerinner.offsetHeight>88) {
     $('p.accountname').hide();
   }
  }
}
