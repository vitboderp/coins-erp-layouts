/*-
     Program: lookup.js
 Description: AJAX Lookup
-*/

var hLookupField;
hLookupCode = new Array();
var iSelectedLookup;
var hAjaxLookupRequest;
var bAutoHide = false;
var bScrollableContainer = false;

Coins.lookup = Class.extend({
  init: function(phObject) {
          this.hObject=phObject;
          this.iQueryDelay=500;
          this.iMaxResultsDisplayed=10;
          this.minQueryLength=1;
          thisLookup=this;
          
          jQuery(phObject).on('keydown',bind(thisLookup,function(event){
            return this.lookupKeyPress(event);
            }));
          jQuery(phObject).on('blur',bind(thisLookup,function(event){
            thisLookup.clearKeyTimeout(event);
            }));
          jQuery(phObject).on('blur',bind(thisLookup,function(event){
            thisLookup.leaveLookup(event);
            }));
            /*
          $(phObject).on('keyup',bind(thisLookup,function(event) {
            thisLookup.hideLookupLength(event);
            }));
            */
            
          if ((phObject.length==1||phObject.length==undefined)
            && phObject.className.substring(0,8)=="disabled") {
            jQuery(phObject)
              .on('focus',this.focusLookup.bind(this))
              .on('change',this.changeLookup.bind(this));
          }
          
          phObject.autocomplete="off";
          
        },
        focusLookup: function() {
          this.hObject.setAttribute('data-lookup-orig',this.hObject.value);
        },
        changeLookup: function() {
          /* see if value has changed since focus */
          var lcLookupOrig = this.hObject.getAttribute('data-lookup-orig');
          if(this.hObject.value != lcLookupOrig)
            this.hObject.className="disabledchanged";
        },
        leaveLookup: function() {
          /* if disabled lookup and the value has been changed manually,
             then we continue with the request to show the quick lookup */
          if (this.hObject.classList.contains("disabledchanged")) {
            hideLookup();
            this.keyPressPause();
            bAutoHide=true;
          }
          else {
            stopLookup();
            this.clearKeyTimeout();
            hLookupField=null;
          }
        },
        clearKeyTimeout: function() {
           if (this.timeout) clearTimeout(this.timeout);
        },
        lookupKeyPress: function(event) {
         /*if (this.hObject.helpFunc==undefined) return;*/
         if (getFieldHelpFunc(this.hObject)==undefined
            || getFieldHelpFunc(this.hObject)=="CALENDAR"
            ) return;
         try {
          switch(event.keyCode) {
           case 16:
             break;
           case 17:
             break;
           case 18:
             break;
           case 38:
             if (iSelectedLookup>0) {
               lookupMouseOver(lookupResults.children[iSelectedLookup - 1]);
             }
             break;
           case 40:
             if (lookupControl.style.display=="none") {
               this.keyPressPause();
             }
             else {
              if (iSelectedLookup<lookupResults.children.length - 1) {
                  lookupMouseOver(lookupResults.children[iSelectedLookup + 1]);

  var containerIframe=getContainerIframe();
  var formcontainer$=parent.parent.$(containerIframe)
    .closest('div.formcontainer');
  if(formcontainer$.length==0) {
  }
  else {
    /* scroll if lookup off the page */
    if($(hLookupField).offset().top 
     + $(hLookupField).height() 
     + $(lookupControl).height() 
     > formcontainer$[0].scrollTop + formcontainer$.height())
    formcontainer$[0].scrollTop=$(hLookupField).offset().top - 10;
  }
                  
               }
             }
             break;
           case 13:
             if ($(lookupControl).is(':visible')) {
             /*
              setLookupField(hLookupField,
                lookupResults.children[iSelectedLookup].lookupValue);
                */
              setLookupField(parseInt(lookupResults.children[iSelectedLookup].id.getEntry(1) ));
              setLookupCode(parseInt(lookupResults.children[iSelectedLookup].id.getEntry(1)));

              /*
              try {
               hLookupCode.value
               =;
              } catch(e) {} 
              */
              
              lookupApplyChange(hLookupField);

              lcMulti=getFieldHelpParam(hLookupField)
              if(lcMulti) {
                lcCompoundLookup=lcMulti.getQueryValue('compoundLookup');
                lcMulti=lcMulti.getQueryValue('multiLookup');
              }
              
              if (lcMulti) lcMulti.getQueryValue("multiLookup");
              /*
              if (lcMulti=="" && lcCompoundLookup !="Y") {
                lookupApplyReturn(hLookupField);
              }
              */
              hideLookup();
              return false;
             }
             else {
               return true;
             }
             break;
           case 9:
             stopLookup();
             this.clearKeyTimeout();
             hLookupField=null;
           break;
           default:
             if (this.timeout) clearTimeout(this.timeout);
             this.timeout=setTimeout(this.keyPressPause.bind(this),
                                     this.iQueryDelay);
             hideLookup();
             break;
          }
         } catch(e) { }
        },
        keyPressPause: function() {
          lcValue=this.hObject.value;
          lcMulti=getFieldHelpParam(this.hObject);
          if (lcMulti) lcMulti.getQueryValue("multiLookup");
          if (lcMulti!="") {
           lcValue=lcValue.getEntry
             (lcValue.numEntries(lcMulti) - 1,lcMulti)
          }
          if (lcValue.length>=this.minQueryLength) {
            /* request data from server */
                lcSearch=location.search;
                if (lcSearch=="") {
                  lcSearch="?";
                } else {
                  lcSearch=lcSearch + "&";
                }
    lcSearch=lcSearch.setQueryValue("returnPage","");
    lcSearch=lcSearch.setQueryValue("ajaxmethod","syalook.quickLookup");
    if (this.hObject.id.substring(0,12)=="dynamicField") {
    lcSearch=lcSearch.setQueryValue("lookupField",this.hObject.id);
    } else {
    lcSearch=lcSearch.setQueryValue("lookupField",this.hObject.name);
    }
    lcValue = this.hObject.value.getEntry(0,String.fromCharCode(10));
    if (lcValue.length<100) {
        lcSearch=lcSearch.setQueryValue("lookupFieldValue",lcValue);
    }
    else {
      return;
    }
    lcSearch=lcSearch.setQueryValue("helpFunc",getFieldHelpFunc(this.hObject));
    lcSearch=lcSearch.setQueryValue("maxResultsDisplayed",
                                    this.iMaxResultsDisplayed);

    lcSearch=setParam(lcSearch,getFieldValidParam(this.hObject));

    url="wouajax.p" + lcSearch;      

                if (getFieldHelpParam(this.hObject)!=undefined) {
                  url=setParam(url,getFieldHelpParam(this.hObject));         
                }

                lcContextNames=getFieldHelpParam(this.hObject);
                if(lcContextNames) 
                  lcContextNames=lcContextNames.getQueryValue("contextNames");
                
                url=setParam(url,
        getInputFields(
              getFieldContextFields(this.hObject),
              lcContextNames));
                           
                //alert(url);
                bAutoHide = false;
                hAjaxLookupRequest=loadXMLDoc(url);
                this.hObject.hAjaxLookupRequest=hAjaxLookupRequest;
          } 
        },
        hideLookupLength: function() {
           if (this.hObject.value.length<this.minQueryLength) {
             stopLookup();
           }
        },
        queryDelay: function(piQueryDelay) {
          this.iQueryDelay=piQueryDelay;
        },
        maxResultsDisplayed: function(piMaxResultsDisplayed) {
          this.iMaxResultsDisplayed=piMaxResultsDisplayed;
        },
        minQueryLength: function(piMinQueryLength) {
          this.iMinQueryLength=piMinQueryLength;
        }
});

function setLookupField(piResult) {
  pcValue=hLookupResult[piResult].code;

              lcMulti=getFieldHelpParam(hLookupField);
              if (lcMulti) lcMulti=lcMulti.getQueryValue("multiLookup");

  if (lcMulti==""||hLookupField.value.numEntries()==1) {
    hLookupField.value=pcValue;
  }
  else {
    lcFieldValue=hLookupField.value;
    lcValue=lcFieldValue.getEntry(lcFieldValue.numEntries(lcMulti) - 1,lcMulti);
    liLength=lcFieldValue.length - lcValue.length - 1;
    lcValue=lcFieldValue.substring(0,liLength);
    lcValue=lcValue + lcMulti + pcValue;
    hLookupField.value=lcValue;
  }
  if (hLookupField.classList.contains("disabledchanged")) {
    hLookupField.className="disabled";
  }
  
  hLookupField.setAttribute('data-lookup-orig',hLookupField.value);
  
}

function setLookupCode(piResult) {
  /* we have selected piResult from the list of results
     we need to fill in all the lookup codes */
  lhLookupResult=hLookupResult[piResult].hResult;

  for (i=0;i<hLookupCode.length;i++) {
    try {
    if (hLookupCode[i]!=undefined) {
      lcValue = lhLookupResult.keycode[i];

      if (hLookupCode[i].value!=null) {
        lcValue = xmlDecode(lcValue);
        
        // For a tickbox we need to check the option not set the value.
        if (hLookupCode[i].type=="checkbox") {
          lcValue = lcValue.toLowerCase();
          hLookupCode[i].checked = (lcValue=="yes" || lcValue=="y");
        }
        else hLookupCode[i].value = lcValue;
      }
      // For a radio set we need to check the option not set the value.
      else if (hLookupCode[i].length!=undefined &&
               hLookupCode[i][0].type=="radio") {
        lcValue = xmlDecode(lcValue);

        for (j = 0; j < hLookupCode[i].length; j++) {
          if (hLookupCode[i][j].value==lcValue) {
            hLookupCode[i][j].checked = true;
            break;
          }
        }
      }
      else hLookupCode[i].innerHTML = lcValue;
    }
    }
    catch(e) { } 
  }
}

initialiseLookupControl();

function initialiseLookupControl() {
document.write('<div id="lookupControlWrapper" style="height:0px">'
             + '<div id="lookupControl" class="lookupcontrol"'
             + ' style="display:none;z-index:9999"'
             + '></div></div>');
}

function stopLookup() {
  /* if we have hidden the lookup then stop any waiting request */
  hideLookup();
  if (hAjaxLookupRequest) {
    deleteAjaxRequest(hAjaxLookupRequest);
  }
}
function showLookup() {
  if (bAutoHide) return;

  var container$ = $(lookupControl).closest('div.formcontainer'),
      lbOut = ($(hLookupField).offset().top
               + $(hLookupField).height()
               + $(lookupControl).height() > container$.height());

  if (lbOut && !bScrollableContainer) {
    /* only when lookup is off the container, and the container itself
       has no scroll -- otherwise 'oveflow: visible' causes scroll jumps */
    container$.css('overflow','visible');
  }

  lookupControl.style.display="block";
}
function hideLookup() {
  var container$=$(lookupControl).closest('div.formcontainer');
  container$.css('overflow','auto');
  lookupControl.style.display="none";
}

hLookupResult=new Array();
iLookupCount=-1;

function resetFocus() {
  /* re-enable validation */
  stopValidation(false);
  fieldData[hLookupField.name].stopFocus=true;
  hLookupField.focus();
  fieldData[hLookupField.name].stopFocus=false;
  setValueChanged(hLookupField);
}

Coins.lookupResult = Class.extend({
  init: function(pcCode,phResult) {
    this.code=pcCode;
    this.hResult=phResult;
  },
  writeResult: function(piResult) {
    iLookupCount+=1;
    var i=0;
     lcFields=this.hResult.fields;
     lcKeyCode=this.hResult.keycode;
      lcDesc="";
      for (i=0;i<lcFields.length;i++) {
        lcDesc+='<TD><NOBR>' + lcFields[i] + '</NOBR></TD>';
      }
    return ('<TR class="lookupresult"'
          + ' onMouseOver="lookupMouseOver(this);"'
          + ' onMouseDown="stopValidation(true);'
          + 'setLookupField(this.id.getEntry(0));'
          + 'setLookupCode(this.id.getEntry(1));'
          + 'resetFocus();'
          /* TPA 
          + 'try {'
          + 'hLookupCode.value'
          + '=lookupResults.children[iSelectedLookup].lookupCode;'
          + '} catch(e) {}'
          */
          /*
          + 'hLookupField.blur();'
          + 'hLookupField.focus();'
          */
          /*+ 'lookupApplyChange(hLookupField);'*/
          /*+ 'try {lookupApplyReturn(hLookupField)} catch(e) { }'*/
          + 'hideLookup();'
          + 'return false;'
          + '"'
          + ' lookupRow="' + iLookupCount + '"'
          /*+ ' lookupValue="' + this.code + '"'*/
          + ' lookupResult="' + piResult + '"'
          /*+ ' lookupCode="' + lcKeyCode[0] + '"'*/
          + ' id="' + iLookupCount + ',' + piResult + '"'
          + '>'
          + lcDesc
          + '</TR>');
  }
});

function lookupMouseOver(phObject) {
  if (iSelectedLookup!=-1) {
    lookupResults.children[iSelectedLookup].className="lookupresult";
  }
  phObject.className="lookupresulthi";
  iSelectedLookup=parseInt(phObject.id.getEntry(0));
}

var bMore;
function lookupClear(pcInput,pcResult) {
  hLookupResult.length=0;
  iLookupCount=-1;
  lookupControl.innerHTML='';
  bMore=false;
}
function lookupResult(pcInput,phResult) {
  hLookupResult[hLookupResult.length]=new Coins.lookupResult(pcInput,phResult);
}
function lookupMore(pcInput,pcResult) {
  bMore=true;
}

function lookupFill(pcInput,pcResult) {
  var lhObject;
  if(typeof advancedFilterForm=="object") 
    eval("lhObject=advancedFilterForm." + pcInput);
  if(!lhObject)
    eval("lhObject=thisForm." + pcInput);
  
  /* if we're no longer in the field then don't show */
  if(hThisField!=lhObject) return;
  
  hLookupField=lhObject;
  
  if(hLookupField==null || jQuery(hLookupField).is(":visible")==false) return;
  
  if (hLookupResult.length==0) return;

  pcResult = '<TABLE class="lookupresult"><TBODY>';
  var i=0;
  for (i=0;i<hLookupResult.length;i+=1) {
    pcResult+=hLookupResult[i].writeResult(i);
  }
  pcResult+="</TBODY></TABLE>"
  
  if (bMore) {
    pcResult+='<DIV class="lookupmore" align="right">...</DIV>';
  }
  
  hLookupCode.length=0;
  
  lcLookupCode=getFieldHelpParam(hLookupField);
  if (lcLookupCode) lcLookupCode = lcLookupCode.getQueryValue("lookupCode");
  if (lcLookupCode==undefined) lcLookupCode='';

  if (lcLookupCode!="") {
  lcLookupCode=lcLookupCode.split(",");
  for (i=0;i<lcLookupCode.length;i++) {
    if(typeof advancedFilterForm=="object") 
      eval("hLookupCode[i]=advancedFilterForm." + lcLookupCode[i]);
    if(!hLookupCode[i])
      eval("hLookupCode[i]=thisForm." + lcLookupCode[i]);
    try {
    if (hLookupCode[i]==undefined) {
      eval("hLookupCode[i]=" + lcLookupCode[i]);
    }
    } catch(e) {} 
  }
  }
  iSelectedLookup=-1;

  /*
      var fieldPos = new positionInfo(lhObject);

      var x = fieldPos.getElementLeft();
      var y = fieldPos.getElementBottom();
      
  lookupControl.style.top=y + 'px';
  lookupControl.style.left=x + 'px';*/
  lookupControl.innerHTML=pcResult;
 
//  lookupControl.style.width=$(lookupControl).width() + 'px';

  var container$ = $(lhObject).closest('div.formcontainer');

  if (container$.length == 0)
    container$ = $('body');

  // used later in the showLookup -- just need to calculate it before lookup is added
  bScrollableContainer = ((container$[0].scrollHeight > container$[0].clientHeight) ||
                          (container$[0].scrollWidth > container$[0].clientWidth));

  /* insert the control in the right part of the dom */
  container$.prepend($(lookupControlWrapper));

  showLookup();

  $(lookupControl).css('width','1px');
  $(lookupControl).css('width',$(lookupControl).find('table').width());

  $(lookupControl).show().position({
    my: "left top",
    at: "left bottom",
    of: $(lhObject),
    collision: "flip",
    within: container$
  });

  /* <DIV><TABLE><TBODY> */
  lookupResults=lookupControl.children[0].children[0];
  
/*  if (hLookupResult.length==1
*      &&hLookupField.className.substring(0,8)=="disabled") {
*    setLookupField(0);
*    setLookupCode(0);
*    return;
*  }*/

  try {
  if (hLookupField!=hThisField) return;
  } catch(e) { }
}

function lookupApplyChange(phField) {

/******************
TPA: 08/11/11
we just set the field valueChanged to true and the focus back to the field
so that when the user leaves the field the field trigger will fire

  if(phField.helpParam.toLowerCase().getQueryValue("novalidation")=='y') {
    stopValidation();
    return;
  }
              hLookupField.blur();
********************/
              hLookupField.focus();
            setValueChanged(hLookupField);
}
function lookupApplyReturn(phField) {
  
  /*
  if(phField.helpParam.toLowerCase().getQueryValue("novalidation")=='y') {
    hideLookup();
    return;
  }
  */
  if(fieldData[phField.name].noValidation==true) {
    hideLookup();
    return;
  }

  /* this call re-instated - previously removed to avoid double validation,
  but is required to get onChange to fire when lookup picked from dropdown list
  */
  if (phField.onchange!=null) {
    phField.onchange();
  }
  /* the call below is not required as keypress.applyReturn() will change focus 
   if (phField.onblur!=null) {
    phField.onblur();
  } */
  applyReturn();
  
}

function ajaxCreateLookups(input,response) {
  for (field in fieldData){
    if(fieldData[field].inline)
      fieldData[field].hInline=new Coins.lookup(input$(field))
  }
}
function ajaxDeleteLookups(input,response) {
  for (field in fieldData){
    if(fieldData[field].inline)
      delete(fieldData[field].hInline);
  }
}

function ajaxUpdateCreateLookups(input,response) {
  var lhMain=hCOINSMain.mainarea.getFrame;
  /* copy local fieldData to mainarea */
  for (field in fieldData){
    lhMain.fieldData[field]=fieldData[field]
    if(fieldData[field].inline)
      lhMain.fieldData[field].hInline=new lhMain.Coins.lookup(lhMain.updatedialogform[field])
  }
}
function ajaxUpdateDeleteLookups(input,response) {
  var lhMain=hCOINSMain.mainarea.getFrame;
  for (field in fieldData){
    if(fieldData[field].inline)
      delete lhMain.fieldData[field].hInline;
    delete lhMain.fieldData[field];
  }
}
