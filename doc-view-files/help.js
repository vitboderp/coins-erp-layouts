/*-
     Program: help.js
 Description: Script file for on-line help.
-*/

var hHelp;
var cAjaxFields='';

cInsert="";

var hDocuTimer;
function docuPassThru (pcTo) {
  hDocuTimer=setTimeout(function(){
    lcHref = location.search;
    lcHref="?" + buildURL(lcHref,"short","pvFrame");
    lcHref= "wouajax.p" + lcHref + addFrameURL()
          + '&docuFunc=' + pcTo
          + '&ajaxMethod=syadocu.getDocuURL'; 
    $.ajax({
      type:"get",
      url:lcHref,
      error: function(pcText) {
          alert('AJAX Failure');
      },
      success: function(pcText) {
        ajaxResponse(pcText);
      }          
    });  
  })
}

function setInsert(pcInsert) {
  try {
    if (pcInsert!="") eval(pcInsert);
    cInsert=pcInsert;
  }
  catch(e) {
    cInsert = 'appendHelp';
  }
}
function resetHelp(pbResetFields) {
  hHelp=document.getElementById('help');
  if(pbResetFields==undefined) pbResetFields=true;
  if (cInsert=="") {
    if(pbResetFields) 
      cAjaxFields = '';
    hHelp.innerHTML="";
    document.getElementById('appendHelp').innerHTML='';
  }
  else {
    lhHelp = document.getElementById(cInsert);
    //eval("lhHelp=" + cInsert);
    lhHelp.innerHTML="";
  }
}
function addHelp(pcString) {

  if (cInsert=="") {
    hHelp.innerHTML=hHelp.innerHTML+pcString;
  }
  else {
    lhHelp = document.getElementById(cInsert);
    //eval("lhHelp=" + cInsert);
    lhHelp.innerHTML=lhHelp.innerHTML + pcString;
  }

}

function setWebImgs(pcWebImgs) {
  cWebImgs = pcWebImgs;
}

function showAjaxFields(pcID,pbShow) {
  /* this is run multiple times to decode before encoding */
  pcID = encodeFieldName(decodeFieldName(pcID));

  if(pbShow)
    cAjaxFields=cAjaxFields.addToList(pcID);
  else if(cAjaxFields.inList(pcID))
    cAjaxFields=cAjaxFields.deleteFromList(pcID);  
    
  lhID=el$(pcID);
  if(lhID) {
    if(pbShow) {
      lhID.style.display="";
    } else {
      lhID.style.display="none";
    }
  }
}

function expandAjaxFields() {
  var fields=cAjaxFields.split(',');
  cAjaxFields='';
  for (var i = 0; i < fields.length; i++) {
    showAjaxFields(fields[i],true);
  }
}

function showHide(pcBlock,pcshowhide) {

lhOuter=eval(pcBlock + "Outer");
try{
lhLink =eval(pcBlock + "Link");
}
catch(e)
{
  lhLink = eval("thisForm." + pcBlock + "Link");
}
lhMore =eval(pcBlock + "Text");

  if((lhMore.style.display == 'none'&&pcshowhide==undefined)||pcshowhide=='show')
    {lhMore.style.display='';
        lhLink.src=lhLink.src.replace("more.gif","less.gif");
        lhOuter.className=lhLink.className;

  }
  else if((lhMore.style.display == ''&&pcshowhide==undefined)||pcshowhide=='hide')
    {lhMore.style.display='none';
        lhLink.src=lhLink.src.replace("less.gif","more.gif");
        lhOuter.className="";
    }

}


function showAll () {

    for (var i=0;i<document.all.length;i++) {
      lcID=document.all[i].id;
      if (typeof lcID == "string"
        && lcID.substring(0,4)=="More" 
        && lcID.substring(lcID.length - 4)=="Text") {
        showHide(lcID.substring(0,lcID.length-4),"show");
      }
    }  

}
function hideAll () {

    for (var i=0;i<document.all.length;i++) {
      lcID=document.all[i].id;
      if (typeof lcID == "string"
        && lcID.substring(0,4)=="More" 
        && lcID.substring(lcID.length - 4)=="Text") {
        showHide(lcID.substring(0,lcID.length-4),"hide");
      }
    }  

}

        
/* Function to call ActiveX help */
features = "toolbar=no,left=100,top=100,scrollbars=yes,resizable=yes,width=750,height=500,menubar=no,location=no";
winname="helpmain";

function openHelp(topic){
  var w = window.open(topic,winname,features);
  w.focus();
}

/* Function to print a documentation "book";
  pass in the book's function code as a parameter to printBook */
function printBook(book){
  bookURL = "wouhprn.p?&DocModule=Y&sidemainhelp='0,*,0'";
  bookURL = bookURL + "&MainArea=%WDSYPRN&startmenu=" + book;
  window.open(bookURL);
  }
