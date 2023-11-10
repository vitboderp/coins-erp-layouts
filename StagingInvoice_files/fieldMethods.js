/*-
     Program: fieldMethods.js
 Description: Field Methods JavaScript
-*/


function matches(pcVal,pcPattern) {
  // change PROGRESS style wildcards to javaScript regular expression
  // escape values incase they have $ in them 
  pcVal=escape(pcVal);
  pcPattern=escape(pcPattern);
  pcPattern = "^" + pcPattern.replace("*","\\w*") + "$";
  re = new RegExp(pcPattern,"i"); // set regular expression (ignore case) 
  return re.test(pcVal); 
}
      
function cando(pcList, pcVal) { 
  lcCase = pcList.split(","); // split in to an array
  for(var i = 0; i < lcCase.length; i++) {      
    if(lcCase[i].charAt(0) == "!") { // ! means not
      lbNegate = true;
      lcCase[i] = lcCase[i].substring(1,lcCase[i].length);
    }
    else { lbNegate = false; }
    if(matches(pcVal,lcCase[i])) { return !lbNegate; }  
  }                                               
  return false; // if we get here we have no match   
}                
 
function safeInt(pcValue) {
   try {
      if (typeof pcValue != 'undefined') {
         if (pcValue != null && pcValue.length > 0) {
            var liTmp = parseInt(pcValue.replace(/,/g, ""), 10);
            if (!isNaN(liTmp))
               return liTmp;
            else
               return 0;
         }
         else { return 0; }
      }
      else { return 0; } 
   }
   catch(e) { return 0; }
}

function safeFloat(pcValue) {
   try {
      if (typeof pcValue != 'undefined') {
         if (pcValue != null && pcValue.length > 0) {
            var ldTmp = parseFloat(pcValue.replace(/,/g, ""));
            if (!isNaN(ldTmp))
               return ldTmp;
            else
               return 0;
         }
         else { return 0; }
      }
      else { return 0; } 
   }
   catch(e) { return 0; }
}

function defaultTo(phFrom,phTo) {
  if (phTo.value == "") {
    phTo.value = phFrom.value;
  }
}
function setField(phTarget,phSource) {
  phTarget.value = phSource.value;
}
function setField(pcTarget,pcSource) {
  try {
    eval("lhTarget=thisForm." + pcTarget);
    eval("lhSource=thisForm." + pcSource);
    lhTarget.value = lhSource.value;
  } catch(e) { }
}

function blankOnChange(pcFields) {

  /* if page is not loaded then don't do anything, 
     we only want to blank out on a user change */
  if (isLoaded==false) return true;
  
  /* blank out fields in a list */
  lcFields=pcFields.split(",");

  // now set the values of the fields 
  for (var i = 0; i < lcFields.length; i++) {
    if (lcFields[i] != "") {

      // try a form field 
      try {
        eval("thisForm."    
          + lcFields[i] + '.value="";');
      }
      catch (e) {
      }
      try {
      // try an id field 
        eval(lcFields[i] + '.innerHTML=""');
      }
      catch (e) {
      }
    }
  }
}

function disableThisLookup(phObject,lbDisable,pcAction) {

     lhLookup=el$('lfield' + phObject.id);
     if(lhLookup && pcAction!="mandatory") {
     try {
        if(lbDisable == true) {
          lhLookup.style.display="none";
        }
        else {
          lhLookup.style.display="";
        }
     }
     /* in case the lookup buttons don't exist */
     catch(e) {
     }
     }

}
function disableThisObject(phObject,lbDisable,pcAction) {
     try {
        if(lbDisable == true) {
          /* if focus is on this field then apply return first */
          try {
          if (phObject==hThisField) {
            applyReturn(true);
          }
          } catch(e) { } 
          if(pcAction == "hide") {
            phObject.style.display="none";
          }
          else if (pcAction == "readonly") {
            phObject.readOnly=true;
            jQuery(phObject).addClass("readonly");
          }
          else if (pcAction == "mandatory") {
            fieldData[phObject.name].mandatory=true;
            jQuery(phObject).addClass("mandatory");
          }
          else {
            phObject.disabled = true;
            if (phObject.type=="checkbox") {
              if (phObject.className.indexOf(' checkboxdisabled')==-1) {
                phObject.className = phObject.className + ' checkboxdisabled';
              }
            } else {
              if (phObject.className.indexOf(' disabled')==-1) {
                phObject.className = phObject.className + ' disabled';
              }
            }
          }
        }
        else {
          if(pcAction == "hide") {
            phObject.style.display="";
          }
          else if (pcAction == "readonly") {
            phObject.readOnly=false;
            jQuery(phObject).removeClass("readonly");
          }
          else if(pcAction == "mandatory") {
            fieldData[phObject.name].mandatory=false;
              lcClass=phObject.className;
              jQuery(phObject).removeClass("mandatory");
           }
          else {
            phObject.disabled = false;
            if (phObject.type=="checkbox") {
              if (phObject.className.indexOf(' checkboxdisabled')!=-1) {
                lcClass=phObject.className;
              lcClass=lcClass.substring(0,lcClass.indexOf(' checkboxdisabled'));
                phObject.className = lcClass;
              }
            }
            else {
              if (phObject.className.indexOf(' disabled')!=-1) {
                lcClass=phObject.className;
                lcClass=lcClass.substring(0,lcClass.indexOf(' disabled'));
                phObject.className = lcClass;
              }
            }
            /* this fixes a bug where a combo has an option of blank
               when you enable it the combo shows blank rather than the 
               option - this forces to select the blank option */
            if (phObject.type=="select-one") {
              if(phObject.value=="") {
                phObject.value="";
              }
            }
          }
        }
        disableThisLookup(phObject,lbDisable,pcAction);
     }
     /* in case any of the fields are not built */
     catch(e) {
     }
}
function disableThisField(phObject,lbDisable,pcAction) {
  try {
  
  /* if we passed a string then try to get the object */
  try {
    /* this will force an error if not a string */
    phObject.substr(0);
    try {
      eval("phObject=" + phObject);
    }
    catch(e) {
    
    }
    eval("phObject=thisForm." + phObject);
  }
  catch(e) {
  
  }
  
  if (phObject!=undefined) {
  if (phObject.length==undefined||phObject.length==0||
       (phObject[0].type!="radio"&&phObject[0].type!="checkbox")) {
       disableThisObject(phObject,lbDisable,pcAction);
       phObject.setAttribute('data-disableObject',lbDisable);
       phObject.setAttribute('data-disableAction',pcAction);
   }
  else {
    for (var i = 0; i < phObject.length; i++) {
     disableThisObject(phObject[i],lbDisable,pcAction);
       phObject[i].setAttribute('data-disableObject',lbDisable);
       phObject[i].setAttribute('data-disableAction',pcAction);
    }
  }
  }
  }
  catch(e) {
  }
}

function disableButton (pcButton, pbDisable) {
  var lhButton = document.getElementById(pcButton);
  if (!lhButton)
    return;

  if (pbDisable) {
    lhButton.setAttribute('disabled', 'disabled');
    if (lhButton.firstChild != undefined)
      lhButton.firstChild.setAttribute('disabled', 'disabled');
  }
  else {
    lhButton.removeAttribute('disabled');
    if (lhButton.firstChild != undefined)
      lhButton.firstChild.removeAttribute('disabled');
  }
}

function disableFields(pcAction,phObject,pcValue) {
  if (phObject==undefined) return;
  try {
  /* disables/enables field(s) based on an obejcts current value */  
  lcThisValue = getThisFieldValue(phObject);
  lbDisable = cando(pcValue,lcThisValue);
  switch(pcAction){
    case "show":
      lbDisable = !lbDisable; 
      pcAction = "hide"; 
      break;
    case "enable":
      lbDisable = !lbDisable; 
      pcAction = "disable"; 
      break;
    case "optional":
      lbDisable = !lbDisable;
      pcAction = "mandatory";
      break;
    case "update":
      lbDisable=!lbDisable;
      pcAction="readonly";
  }
  for (var i = 3; i < disableFields.arguments.length; i++) {
     disableThisField(disableFields.arguments[i],lbDisable,pcAction);
  }
  }
  catch(e) {
  }
  contentResize();
}
function contentResize(){
  /* in case we have resized the frame */
  try {
    resizeBody()
  }
  catch(e) {
  }
}

function getThisFieldValue (phObject) {
  if (phObject==undefined) return "";

  var lcThisValue="";
  try {
    if (phObject.length==undefined||phObject[0].type!="radio") {
      lcThisValue=phObject.value;
    }
    else {
      lcThisValue="";
      for (var i = 0; i < phObject.length; i++) {
        if (phObject[i].checked==true) {
          lcThisValue=phObject[i].value;
        }
      }
    }
    if(phObject.tagName && phObject.tagName.toLowerCase()=="var") {
      lcThisValue=phObject.innerHTML;
    }
    if(typeof phObject=="string") {
      lcThisValue=phObject;
    }
    if(phObject.type=="checkbox"&&phObject.checked==false) {
      lcThisValue="";
    }
  } catch(e) {}
  return lcThisValue;
}

function disableThisFieldGroup (pcAction,pcGroup) {
  var phForm = document.thisForm;
  var lbDisable = true;
  if (pcAction=="enable") {
    lbDisable = false;
    pcAction = "disable";
  }

  try {
    for (var lcField in fieldData) {
      if (lcField == '') continue;
      var lhObject = phForm[lcField];
      if (pcGroup==fieldData[lcField].fieldGroup) {
        if (lbDisable==true && lhObject.disabled==false) {
          disableThisField (lhObject,lbDisable,pcAction);
          lhObject.setAttribute('data-disabledGroup', pcGroup);
        }
        if (lbDisable==false
            && lhObject.getAttribute('data-disabledGroup')==pcGroup) {
          disableThisField (lhObject,lbDisable,pcAction);
          lhObject.removeAttribute('data-disabledGroup');
        }
      }
    }
  } catch(e) {}
}

function disableFieldGroup (pcAction,phObject,pcValue,pcGroup) {
/*- pcAction = "enable" / "disable"
 *  phObject = checked field
 *  pcValue  = checked field value
 *  pcGroup  = group name (in the fieldData notation)
-*/
  if (phObject==undefined) return;
  try {
    lcThisValue = getThisFieldValue (phObject);
    lbOk = cando(pcValue,lcThisValue);
    if (pcAction=="enable"&&lbOk==false) { pcAction = "disable"; }
    disableThisFieldGroup (pcAction,pcGroup);
  } catch(e) {}
}

function enableField(pcAction,phObject,pbOr) {
  /* 
  disables/enables or hides/show a field based on objects values
  
  USE when the update of a field depends on multiple input fields
   
  pcAction - [hide|show|enable|disable] 
  phObject - the object to affect e.g. thisForm.xxx_field
  pbOr - true means one of the following conditions must be met
       - false means all of the following 

  following the hard-coded parameters, params come in pairs:
  1 - object value to check e.g. thisForm.xxx_field
  2 - CAN-DO list to check against (PROGRESS wildcards)
  */  

  for (var i = 3; i < enableField.arguments.length; i+=2) {
    lcValue=enableField.arguments[i].value;
    if(enableField.arguments[i].type=="checkbox") {
      if(enableField.arguments[i].checked==false) { lcValue=""; }
    }
    lbEnable = cando(enableField.arguments[i+1],lcValue);
    /* if we fail an AND condition leave early (or on passing an OR) */
    if(pbOr==lbEnable) { break; } 
  }

  switch(pcAction){
    case "hide":
      lbEnable = !lbEnable; 
      pcAction = "show"; 
      break;
    case "disable":
      lbEnable = !lbEnable; 
      pcAction = "enable"; 
      break;
  }

  try {
    if(pcAction == "show") { 
      if(lbEnable==true) phObject.style.display=""; 
      else phObject.style.display="none";
    }
    else phObject.disabled = !lbEnable;
  }
  catch(e) { // copy paucoc's error handling
  }
}

function makeFieldsRO(pbROValue,phObject,pcValue) {
  /* 
    set field(s) property readOnly to true or false based on an
    obejcts current value.
    Fields become read only, but they are not disabled - so they
    can be used in RSPs.
  */
  if (phObject==undefined) return;
  try {  
    if (phObject.length==undefined||phObject[0].type!="radio") {
      lcThisValue=phObject.value;
    }
    else {
      lcThisValue="";
      for (var i = 0; i < phObject.length; i++) {
        if (phObject[i].checked==true) {
          lcThisValue=phObject[i].value;
        }
      }
    }
    if(phObject.type=="checkbox"&&phObject.checked==false) {
      lcThisValue="";
    }
        if(!cando(pcValue,lcThisValue)) {
          pbROValue = !pbROValue;
        }

    for (var i = 3; i < makeFieldsRO.arguments.length; i++) {
       makeFieldsRO.arguments[i].readOnly = pbROValue;
       makeFieldsRO.arguments[i].style.color = (pbROValue ? 'gray' : 'black');
       disableThisLookup(makeFieldsRO.arguments[i],pbROValue,"disable");
    }
  }
  catch(e) {
  }
}

function refreshParentField() {

  for (var i = 0; i < refreshParentField.arguments.length; i+=2) {
    lcField=refreshParentField.arguments[i];
    lcData =refreshParentField.arguments[i+1];

    try {
      eval("lhField=parent.parent.thisForm." + lcField);
      lhField.value=lcData;
      if (lhField.onblur) {
        lhField.onblur();
      }  
    }
    catch (e) {
    }
  
  }
}

function refreshParentData() {

  for (var i = 0; i < refreshParentData.arguments.length; i+=2) {
    lcField=refreshParentData.arguments[i];
    lcData =refreshParentData.arguments[i+1];

    try {
      eval("parent.parent." + lcField + '.innerHTML="' + lcData + '"');
    }
    catch (e) {
    }
  
  }
}

function refreshParentTooltip() {
  for (var i = 0; i < refreshParentTooltip.arguments.length; i+=2) {
    lcField = refreshParentTooltip.arguments[i];
    lcData = refreshParentTooltip.arguments[i+1];
    try { parent.parent.el$(lcField).title = lcData; } catch (e) {}
  }
  try { parent.parent.setTooltips(); } catch(e) {}
}

function refreshParentDataCheckbox() {

  for (var i = 0; i < refreshParentDataCheckbox.arguments.length; i+=2) {
    lcField=refreshParentDataCheckbox.arguments[i];
    lcData =refreshParentDataCheckbox.arguments[i+1];
    lcData = lcData.toLowerCase();

    if("y,yes,1,true".getLookup(lcData)!=-1)
      lcSrc = '/coins/' + cWebImgs + '/images/tick.gif';
    else
      lcSrc = '/coins/' + cWebImgs + '/images/notick.gif';
      
    lcData = '<IMG src=\\"' + lcSrc + '\\" border=\\"0\\">';  
      
    try {
      eval("parent.parent." + lcField + '.innerHTML="' + lcData + '"');
    }
    catch (e) {
    }
  
  }
}

function refreshChildData() {

  for (var i = 0; i < refreshChildData.arguments.length; i+=2) {
    lcField=refreshChildData.arguments[i];
    lcData =refreshChildData.arguments[i+1];

    /* loop round iframes and try to poke the field */
    for (var j=0;j<parent.parent.frames.length;j++) {
      try {
        eval("parent.parent.frames[j].getFrame."
            + lcField + '.innerHTML="' + lcData + '"');
      }
      catch (e) {
      }
    }
  
  }
}

function refreshTab(pcName) {
  /* loop round iframes and refresh pcName function */
  for (var i=0;i<parent.parent.frames.length;i++) {
   /* getFrame might not yet exist, so catch the error */
   try {
  if (parent.parent.frames[i].getFrame.location.href.getQueryValue("MainArea") ==  pcName) {
      if (parent.parent.frames[i].getFrame.location.href!="about:blank") {
        parent.parent.frames[i].getFrame.location.reload();
        }
      }
   }
   catch(e) {
   }
  }

}

function refreshPageTab(pcName) {
  /* loop round iframes and refresh pcName function */
  for (var i=0;i<window.frames.length;i++) {
   /* getFrame might not yet exist, so catch the error */
   try {
  if (window.frames[i].getFrame.location.href.getQueryValue("MainArea") ==  pcName) {
      if (window.frames[i].getFrame.location.href!="about:blank") {
        window.frames[i].getFrame.location.reload();
        }
      }
   }
   catch(e) {
   }
  }

}

function getTabFrameHandle(pcName) {

  /* loop round iframes and return when matching pcName function */
  for (var i=0;i<window.frames.length;i++) {
   /* getFrame might not yet exist, so catch the error */
   try {
   
  if (window.frames[i].name.getQueryValue("MainArea") == pcName) {
        return window.frames[i];
      }
   }
   catch(e) {
   }
  }
  
}

function getParentFrameHandle(pcName) {

  /* loop round iframes and return when matching pcName function */
  for (var i=0;i<parent.parent.frames.length;i++) {
   /* getFrame might not yet exist, so catch the error */
   try {
     if (parent.parent.frames[i].name.getQueryValue("MainArea") == pcName) {
        return parent.parent.frames[i];
      }
   }
   catch(e) {
   }
  }
  
}

function getFrameHandle(pcName) {

  /* loop round all frames and return when matching pcName function */
  for (var i=0;i<parent.parent.frames.length;i++) {
   /* getFrame might not yet exist, so catch the error */
   try {
     if (parent.parent.frames[i].name == pcName) {
        return parent.parent.frames[i];
      }
   }
   catch(e) {
   }
  }  

  try {
    lhRoot = parent.parent.parent.parent;
    /* loop round all frames and return when matching pcName function */
    for (var i=0;i<lhRoot.frames.length;i++) {
     /* getFrame might not yet exist, so catch the error */
     try {
       if (lhRoot.frames[i].name == pcName) {
          return lhRoot.frames[i];
        }
     }
     catch(e) {
     }
    }  
  } catch(e) {
  }
  
}

function getFrameHandleById(pcID) {
  /* search either in current or parent window */
  try {
    return document.getElementById(pcID).getElementsByTagName('iframe')[0];
  } catch(e) {
    try {
      return parent.parent.document.getElementById(pcID).getElementsByTagName('iframe')[0];
    } catch(e) {}
  }
}

function reloadFrameById(pcID, pcParam) {
  try {
    var lhFrame = getFrameHandleById(pcID).contentWindow.getFrame;
    lhFrame.setRowidsCookie();
    if (pcParam == undefined)
      lhFrame.location.reload();
    else {
      lhFrame.location.replace(setParam(lhFrame.location.href, pcParam));
    }
  } catch (e) {}
}

function getFrameSelectedTables(pcID) {
  try {
    return getFrameHandleById(pcID).contentWindow.getFrame.cSelectedTables;
  } catch (e) {
    return '';
  }
}

function getFrameSelectedRowids(pcID) {
  try {
    return getFrameHandleById(pcID).contentWindow.getFrame.cSelectedRowids;
  } catch(e) {
    return '';
  }
}

function refreshTabData(pcName) {

  /* loop round iframes and refresh pcName function */
  for (var i=0;i<parent.parent.frames.length;i++) {
   /* getFrame might not yet exist, so catch the error */
   try {
  if (parent.parent.frames[i].getFrame.location.href.getQueryValue("MainArea") ==  pcName) {
      lcSearch=parent.parent.frames[i].getFrame.location.search;
      lcSearch=lcSearch.setQueryValue("MainArea",
                 lcSearch.getQueryValue("MainArea") + "G");
      if (parent.parent.frames[i].getFrame.location.href!="about:blank") {
        parent.parent.frames[i].getFrame.location.replace('wougen.p'
            + lcSearch);
        }
      }
   }
   catch(e) {
   }
  }

}

function setTabRefresh(pcTab) {
  eval('lhTab=parent.parent.tab' + pcTab);
  if (lhTab!=undefined) {
    lhTab.refresh=true;
  }
}

function clearFields(pcList) {

  lcFields = pcList.split(","); // split in to an array
  for(var i = 0; i < lcFields.length; i++) {      

    lcField=lcFields[i];
    try {
      eval("lhField=thisForm." + lcField);
      if (lhField.type=="checkbox") {
        lhField.checked=false;
      }
      else {
        lhField.value="";
      }
      if (lhField.onblur) {
        lhField.onblur();
      }  
      if (lhField.onchange) {
        lhField.onchange();
      }  
      
    }
    catch (e) {
    }
  
  }

}

function getFullFrameHandle(pcName) {
  lhHandle=getTabFrameHandle(pcName);
  if (lhHandle==undefined) {
    lhHandle=getParentFrameHandle(pcName);
    if (lhHandle == undefined) {
       lhHandle = getFrameHandle(pcName);
    }
  }
  if (lhHandle!=undefined) {
    return lhHandle;  
  }
}

/* finds the frame with pcName, and loads the frame contents */
/* replacing argument pair */
function loadFrame(pcName) {

  lhFrame=getFullFrameHandle(pcName);

  if (lhFrame.location.href=='about:blank'&&lhFrame.name.indexOf('!|')!=-1) {
    lcHref=lhFrame.name.getEntry(1,'|');
 
    /* replace argument pairs */
    for (var i = 1; i < loadFrame.arguments.length; i+=2) {
      lcHref=lcHref.setQueryValue(loadFrame.arguments[i],
                                  loadFrame.arguments[i+1]);
    }
    
    lhFrame.location.href=lcHref;
  }
    
}

/* finds the frame with pcName, and loads the frame contents or reloads */
/* replacing argument pair */
function replaceFrame(pcName) {
  lhFrame=getFullFrameHandle(pcName);

  if (lhFrame!=undefined) {    /*- do nothing if there is no frame -*/
    lcHref=lhFrame.name.getEntry(1,'|');
 
    /* replace argument pairs */
    for (var i = 1; i < replaceFrame.arguments.length; i+=2) {
      lcHref=lcHref.setQueryValue(replaceFrame.arguments[i],
                                  replaceFrame.arguments[i+1]);
    }
 
    if (lhFrame.location.href=='about:blank') {
      /* find the iframe that contains this window */
      lhFrame=getParentIframe(lhFrame);
      /* set the name so when it loads it is correct */
      lhFrame.name=lhFrame.name.getEntry(0,'|') + '|' + lcHref;
    }
    else {
      /* replace with new URL */
      lhFrame.location.replace(lcHref);
    }
  }
}

/* set focus at the end of text in text box field */
function setFocusAtEnd (phObject) {
  if (phObject==undefined) return;
  try {
    var pos = phObject.value.length;

    if (phObject.createTextRange) {          /*- IE -*/
      var range = phObject.createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
    else if (phObject.setSelectionRange) {   /*- Mozilla -*/
      phObject.focus();
      phObject.setSelectionRange(pos, pos);
    }
  }
  catch(e) {
  }
}

function fireOnblur(object)
{
  var lhObject=((object.length==undefined)?object:object[0]);
  
  if(document.dispatchEvent) // W3C
  {
    var oEvent = document.createEvent("MouseEvents");
    oEvent.initMouseEvent("blur", true, true,window, 1, 1, 1, 1, 1,
                          false, false, false, false, 0, lhObject);
    lhObject.dispatchEvent( oEvent );
  }
  else if(document.fireEvent)  // IE
  {
    lhObject.fireEvent("onblur");
  }    
}

function fireOnchange(object)
{
  if (typeof(object) == 'undefined') return;  
  var lhObject = Array.isArray(object) ? object[0] : object;
  if(document.dispatchEvent) // W3C
  {
    var oEvent = document.createEvent("MouseEvents");
    oEvent.initMouseEvent("change", true, true,window, 1, 1, 1, 1, 1,
                          false, false, false, false, 0, lhObject);
    lhObject.dispatchEvent( oEvent );
  }
  else if(document.fireEvent)  // IE
  {
    lhObject.fireEvent("onchange");
  }
}

function fireValidation(phField)
{
  if (phField == null) return;
  stopValidation(false);
  setValueChanged(phField);
  if (phField.type=="select-one") 
    fireOnchange(phField);
  else
    fireOnblur(phField);
}

function setKcoCheckboxes(pcKcos,pcField) {
  kcoFields=jQuery('[name="' + pcField + '"]');
  if (kcoFields.length==1) {
    if(pcKcos.inList(kcoFields.value)) {
      kcoFields.checked=true;
      kcoFields.disabled=false;
    } 
    else {
      kcoFields.checked=false;
      kcoFields.disabled=true;
    }
  }
  else{
   for (var i=0;i<kcoFields.length;i++) {
    if(pcKcos.inList(kcoFields[i].value)) {
      kcoFields[i].checked=true;
      kcoFields[i].disabled=false;
    } 
    else {
      kcoFields[i].checked=false;
      kcoFields[i].disabled=true;
    }
   }
  }
}

function linkMultiUpdate(phField,pcFields) {
  lcFields=pcFields.split(',');
  for (var i=0;i<lcFields.length;i++) {
    lhField=input$('multiupd_' + lcFields[i])
    lhField.checked = phField.checked;
    disableFields('disable',
                  lhField,
                  '',
                  lcFields[i]);
  }
}

function onchangelinkfield(pcField) {
  lhCombo=document.getElementById('sxc_param$H$_' + pcField);
  lhField=document.getElementById('sxc_param$H$' + pcField);
  disableFields('update',
                lhCombo,'',
                lhField);
                
  if(lhCombo.value!='')
    lhField.value=lhCombo.value;

}

function createNewEvent(eventName, params) {
  // IE does not support Event(), so need a createEvent() fallback

  params = params || { bubbles: false, cancelable: false, detail: undefined };
  var event = null;

  if (typeof(Event) === 'function') {
    event = new Event(eventName, params);
  } else {
    event = document.createEvent('HTMLEvents');
    event.initEvent(eventName, params.bubbles, params.cancelable, params.detail);
  }

  return event;
}
