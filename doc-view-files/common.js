/*-
     Program: common.js
 Description: Common Scripts
-*/

var Coins = {Version: '1.0.0'}

function toArray(obj) {
    return Array.prototype.slice.call(obj);
}
function bind(scope, fn) {
    return function() {
        return fn.apply(scope, toArray(arguments));
    };
}

var cDateFormat = "dmy";
var iYearOffset = 1950;

var isLoaded = false;
var actualCaretPositionBookmark;

function coinsinit() {
  isLoaded = true;
}

ua=navigator.userAgent.toLowerCase();
msie = ua.indexOf('msie');
isIE = (msie!=-1);
if (isIE) {
  IEVer=parseInt (ua.substring (msie+5, ua.indexOf (".", msie )))
  if(document.documentMode<8) {
    hCOINSMain.coinsAlert(
      'COINS Requires IE8 or above running in standards mode');
    location.assign(location.protocol + '//' 
                  + location.host);
  }
}

msfirefox = ua.indexOf('firefox');
isFirefox = (msfirefox!=-1);

bCtrlKey=false;
bAltKey=false;
bShiftKey=false;
iButton=0;
hEvent=null;
function handleMouseDown(evt) {
  bCtrlKey=evt.ctrlKey;
  bAltKey=evt.altKey;
  bShiftKey=evt.shiftKey;
  iButton=evt.which;
  hEvent=evt;
}
if (isIE==false) {
  document.onmousedown = handleMouseDown;
}
var iKeyDownCode;
function handleKeyDown(hEvent) {
    iKeyDownCode=hEvent.which;
    if (hEvent.ctrlKey==true||hEvent.shiftKey==true) {
      iKeyDownCode=iKeyDownCode - 64;
    }
}
if (isIE==false) {
  document.onkeydown = handleKeyDown;
}

function getFieldValue(phField) {
  var lcValue='';
  switch (phField.type) {
    case "radio":
      for (var i = 0; i < phField.length; i++) {
        if (phField[i].checked) {
          lcValue = phField[i].value;
          break;    
        }
      }
      break;
    case "checkbox":
      lcValue = ((phField.checked)?phField.value:'');
      break;
    case "textarea":
      lcValue = phField.value;
      break;
    default:
      lcValue=phField.value;
      break;
  }
  return lcValue;
}

function fieldOnFocus(phField) {
   hThisField=phField;
  
  try{ 
    $(input$(phField.name)).errorMessage();
  } catch(e) {}
  
  var lcID=((phField.name)?phField.name:phField.id);
  if(fieldData[lcID]) {
    if (fieldData[lcID].stopFocus==true){    
      fieldData[lcID].stopFocus=false;
    }
    else {
      resetValueChanged(phField);
    }
  }
}

function setInputSeq(phField,piSeq) {
  fieldData[phField.name].inputSeq=piSeq;
}
function setDataType(phField,pcDataType) {
  fieldData[phField.name].dataType=pcDataType;
}
function setHelpFunc(phField,pcFunc) {
  fieldData[phField.name].helpFunc=pcFunc;
}
function setValidContext(phField,pcContext) {
  fieldData[phField.name].validContext=pcContext;
}
function setFieldFormat(phField,pcFormat) {
  fieldData[phField.name].fieldFormat=pcFormat;
}
function setAutoSave(phField,pbAuto) {
  fieldData[phField.name].autoSave=pbAuto;
}

function setHelpParam(phField,pcAttr,pcValue) {
  fieldData[phField.name].helpParam=
    fieldData[phField.name].helpParam.setQueryValue(pcAttr,pcValue);
}


function getFieldID(phObject) {
  if(phObject==undefined) return undefined;
  var lbRadio;
  
  lbRadio=(phObject.type==undefined 
           &&
           phObject.length!=undefined);
  
  if(lbRadio==false && phObject.id.substring(0,12)=='dynamicField') {
    lcID=phObject.id;
  }
  else {
    if(lbRadio==false) {
      lcID=((phObject.name)?phObject.name:phObject.id);
    }
    else {
      lcID=((phObject[0].name)?phObject[0].name:phObject[0].id);
    }
  }
  return lcID;
}
function getFieldFormat(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    return fieldData[lcID].fieldFormat;
}

function getFieldDataType(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    return fieldData[lcID].dataType;
}

function getFieldAutoSave(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    return fieldData[lcID].autoSave;
}
function getFieldMandatory(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    return fieldData[lcID].mandatory;
}

function getFieldInputSeq(phField) {
  lcSeq=phField.getAttribute('data-inputSeq');
  if(lcSeq) return parseInt(lcSeq);
  
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    return fieldData[lcID].inputSeq;
}
function getFieldGroup(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    lcValue = fieldData[lcID].fieldGroup;
  else
    lcValue='';
  if(lcValue==undefined) lcValue = '';
  return lcValue;
}
function getFieldHelpFunc(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    return fieldData[lcID].helpFunc;
}

function getFieldHelpParam(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    return fieldData[lcID].helpParam;
}

function getFieldContextFields(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    lcValue = fieldData[lcID].contextFields;
  else
    lcValue='';
  if(lcValue==undefined) lcValue = '';
  return lcValue;
}

function getFieldValidContext(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    lcValue = fieldData[lcID].validContext;
  else
    lcValue='';
/* validation expects undefined 
  if(lcValue==undefined) lcValue = '';*/
  return lcValue;
}
function getFieldValidFields(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    lcValue = fieldData[lcID].validFields;
  else
    lcValue='';
  if(lcValue==undefined) lcValue = '';
  return lcValue;
}

function getFieldValidParam(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    lcValue = fieldData[lcID].validParam;
  else
    lcValue='';
  if(lcValue==undefined) lcValue = '';
  return lcValue;
}
function getFieldOrigValue(phField) {
  lcID=getFieldID(phField);
  if(fieldData[lcID])
    lcValue = fieldData[lcID].origValue;
  else
    lcValue='';
  if(lcValue==undefined) lcValue = '';
  return lcValue;
}


function setValueChanged(phObject) {
  lcID=getFieldID(phObject);
  fieldData[lcID].valueChanged=true;
}
function resetValueChanged(phObject) {
  lcID=getFieldID(phObject);
  fieldData[lcID].valueChanged=false;
  fieldData[lcID].origValue=phObject.value;
  if(fieldData[lcID].beforeValue==undefined)
    fieldData[lcID].beforeValue=getFieldValue(phObject);
}
function isValueChanged(phObject,pbRaw) {
  lcID=getFieldID(phObject);
  if(!fieldData[lcID]) return false;
  
  if(((fieldData[lcID].valueChanged==true 
       && "checkbox,select-one,select-multi,radio".inList(phObject.type))
      ||fieldData[lcID].origValue!=phObject.value)
     &&(fieldData[lcID].validation==true||pbRaw==true)) return true;
  return false;
}

function setThisDynamicSelector(piSelector) {
  lhSelector=document.getElementById("dynamicSelector" + piSelector)
  lhHelp=cDynamicHelp[lhSelector.value]

  for (var i=0;i<=2;i++) {
  lcType ="GE,LE,MA".getEntry(i);
  lhFieldData=fieldData['dynamicField' + lcType + piSelector];
  lhField=document.getElementById("dynamicField" + lcType + piSelector)
  lhField.name="filter" + lcType + "$$" + lhSelector.value
  lhLookup=document.getElementById("lfielddynamicField" + lcType + piSelector)
  if(lhSelector.value=="") {
    lhField.value=""
    lhFieldData.helpFunc=undefined
    lhFieldData.helpParam=""
    lhFieldData.contextFields=""
    lhLookup.style.display="none"
  } else if(lhHelp==undefined || lhHelp.helpFunc=="") {
    lhFieldData.helpFunc=undefined
    lhFieldData.helpParam=""
    lhFieldData.contextFields=""
    lhLookup.style.display="none"
  } else {
    lhFieldData.helpFunc=lhHelp.helpFunc
    lhFieldData.helpParam=lhHelp.helpParam
    lhFieldData.contextFields=lhHelp.contextFields
    lhLookup.style.display=""
  }
  
  }
   
}

function getObjectAttr(phObject,pcAttr) {
/*  if (isIE==true) {*
    return (phObject.getAttribute(pcAttr));
/*  } else {
    return (phObject.readAttribute(pcAttr));
  }*/
}

function includeJavascript(pcScript) {
  try {
    /* if cWebBase not defined then don't need extra scripts */
    if(cWebBase!="") {
      var script=document.createElement("script");
      script.type = "text/javascript";
      script.src="/coins/" + cWebBase + "/scripts/" + pcScript;
      document.getElementsByTagName("head")[0].appendChild(script);
    }
  }
  catch(e) {
  }
}

function htmlEncode(value) {
  return $('<textarea/>').text(value).html();
}

function el$(pcID) {
  return document.getElementById(pcID);
}
function input$(pcID) {
  return eval("thisForm." + pcID);
}
function setElementHTML(pcID,pcValue) {
  lhObject=document.getElementById(pcID);
  if (lhObject) lhObject.innerHTML=pcValue;
}

function getElementValue(phElement,pcID) {
  for (i=0;i<phElement.children.length;i++) {
    if(phElement.children[i].type=="hidden"
       &&phElement.children[i].id==pcID) {
      return phElement.children[i].value;
    }
  }
  return '';
}

/* function to get the value of an attribute in a query string */
function getQueryValue (pcTag,pcSep,pcDel) {
   lcString = "?" + this.toString();

   if (pcSep==undefined) {

     pcSep="&";

   }
   if (pcDel==undefined) {
     pcDel="=";
   }

   liFrom = lcString.indexOf("?" + pcTag + pcDel);
   if (liFrom == -1) {
      liFrom = lcString.indexOf(pcSep + pcTag + pcDel);
   }

   // if not found then return blank 
   if (liFrom == -1) {
      return "";
   }
   else                                                           
   {
      liTo = lcString.indexOf(pcSep,liFrom + 1);
      if (liTo == -1) {
         liTo = lcString.length;
      }
      return unescape(lcString.substring(liFrom + pcTag.length + 2,liTo));
   }
}
String.prototype.getQueryValue = getQueryValue;
function getThisQueryValue(pcQuery,pcTag,pcSep,pcDel) {
  return pcQuery.getQueryValue(pcTag,pcSep,pcDel);
}

/* function to set (add if required) an attribute to a query string */
function setQueryValue (pcTag,pcValue,pbAddBlank,pcSep,pcDel) {

   if (pcSep==undefined) {

     pcSep="&";

   }
   if (pcDel==undefined) {
     pcDel="=";
   }

   lcString = this.toString();
   pcValue = encodeURIComponent(pcValue);

   if (pbAddBlank==undefined) pbAddBlank=false;

   liFrom = lcString.toLowerCase().indexOf("?" + pcTag.toLowerCase() + pcDel);
   if (liFrom == -1) {
      liFrom = lcString.toLowerCase().indexOf(pcSep + pcTag.toLowerCase() + pcDel);
      /* if string does begins with the parameter */
      if (liFrom==-1&&lcString.toLowerCase().indexOf(pcTag.toLowerCase() + pcDel)==0) {
        liFrom=0;
      }
   }
   
   // if not found then add if non blank
   if (liFrom == -1) {
      if (pcValue == "" && pbAddBlank == false) {
         return lcString;
      }
      else {
         if (lcString=="" || lcString=="?") {
            return lcString + pcTag + pcDel + pcValue;
         }
         else {
            return lcString + pcSep + pcTag + pcDel + pcValue;
         }
      }
   }
   else {
      liTo = lcString.toLowerCase().indexOf(pcSep,liFrom + 1);
      if (liTo == -1) {
         liTo = lcString.length;
      }
      if (pcValue == "" && pbAddBlank == false) {
         if (lcString.substring(liFrom,liFrom + 1) == "?" && liTo != lcString.length) {
         lcString = lcString.substring(0,liFrom + 1)
                  + lcString.substring(liTo + 1);
         }
         else
         {
         lcString = lcString.substring(0,liFrom)
                  + lcString.substring(liTo);
         }
      }
      else {
      if (lcString.substring(liFrom,liFrom + 1) == "?"||
          lcString.substring(liFrom,liFrom + 1) == "&") {
        liFrom = liFrom + 1;
      }
      lcString = lcString.substring(0,liFrom) + pcTag + pcDel 
               + pcValue + lcString.substring(liTo);
      }

   }

   /* if we are left with a string starting with & then remove it */
   if (lcString.substring(0,1) == "&") {
     lcString=lcString.substring(1);
   }
   
   return lcString;
}
String.prototype.setQueryValue = setQueryValue;
function setThisQueryValue(pcQuery,pcTag,pcValue,pbAddBlank,pcSep,pcDel) {
  return pcQuery.setQueryValue(pcTag,pcValue,pbAddBlank,pcSep,pcDel);
}

function inQuery (pcTag,pcSep,pcDel) {
   lcString = "?" + this.toString();

   if (pcSep==undefined) {

     pcSep="&";

   }
   if (pcDel==undefined) {
     pcDel="=";
   }

   liFrom = lcString.indexOf("?" + pcTag + pcDel);
   if (liFrom == -1) {
      liFrom = lcString.indexOf(pcSep + pcTag + pcDel);
   }

   // if not found then return false 
   if (liFrom == -1) {
      return false;
   }
   else                                                           
   {
      return true
   }
}
String.prototype.inQuery = inQuery;

function trim(toTrim,pcdir){
  theVAL=this.toString();
  if (theVAL=="") return "";
  if (pcdir==undefined) pcdir=""
  if (toTrim==undefined) toTrim=" "
  pcdir=pcdir.toUpperCase()
  if (pcdir == "" || pcdir=="LEFT") { 
     while (toTrim.indexOf(theVAL.substr(0,1))!=-1&&theVAL!="") {
        theVAL=theVAL.substr(1)
     }
  }
    
  if (pcdir == "" || pcdir=="RIGHT") { 
     while (toTrim.indexOf(theVAL.substr(theVAL.length-1,1))!=-1&&theVAL!="") {
        theVAL=theVAL.substr(0,theVAL.length-1)
     }
  }
        
 return theVAL
}
String.prototype.trim=trim;

/* function to get an entry from a list */
function getEntry (piEntry,pcSep) {
   try {
   if (pcSep == undefined) lcSep=","; else lcSep=pcSep;
   }
   catch(e) {
   lcSep=",";
   }
   lcString = this.toString().split(lcSep);
   return lcString[piEntry];
}
String.prototype.getEntry = getEntry;

/* function to get an entry from a list */
function setEntry (piEntry,pcValue,pcSep) {
   try {
   if (pcSep == undefined) lcSep=","; else lcSep=pcSep;
   }
   catch(e) {
   lcSep=",";
   }
   lcString = this.toString().split(lcSep);
   lcString[piEntry] = pcValue;
   lcReturn="";
   for (i=0;i<lcString.length;i++) {
     if (i==0) {
       lcReturn=lcString[i]
     }
     else {
       lcReturn=lcReturn + lcSep + lcString[i];
     }
   }
   
   return lcReturn;
}
String.prototype.setEntry = setEntry;

function deleteEntry(piEntry,pcSep) {
   if (pcSep == undefined) 
     lcSep = ","; 
   else lcSep = pcSep;
   
   lcString = this.toString().split(lcSep);
   
   lcString.splice(piEntry, 1);

   return lcString.join(lcSep);   
}
String.prototype.deleteEntry = deleteEntry;

function numEntries(pcSep) {
   try {
   if (pcSep == undefined) lcSep=","; else lcSep=pcSep;
   }
   catch(e) {
   lcSep=",";
   }
  lcString = this.toString().split(lcSep);
  return lcString.length;
}
String.prototype.numEntries = numEntries;

function getLookup(pcVal,pcSep) {
   try {
   if (pcSep == undefined) lcSep=","; else lcSep=pcSep;
   }
   catch(e) {
   lcSep=",";
   }
  lcString = this.toString().split(lcSep);
  
  for (i=0;i<lcString.length;i++) {
    if (pcVal==lcString[i]) return i;
  }
  return -1;
}
String.prototype.getLookup=getLookup;
function inList(pcVal,pcSep) {
  var lcString;
   try {
   if (pcSep == undefined) lcSep=","; else lcSep=pcSep;
   }
   catch(e) {
   lcSep=",";
   }
  lcString=lcSep + this.toString() + lcSep;
  liPos = lcString.indexOf(lcSep + pcVal + lcSep);
  return (liPos != -1);
}
String.prototype.inList=inList;

function addToList(pcVal,pcSep) {
  var lcString;
   try {
   if (pcSep == undefined) lcSep=","; else lcSep=pcSep;
   }
   catch(e) {
   lcSep=",";
   }
  lcString=this.toString();
  if (lcString.inList(pcVal,lcSep)) {
  }
  else
  {
    if (lcString=="") {
      lcString=pcVal;
    }
    else {
      lcString=lcString + lcSep + pcVal;
    }
  }
  return lcString;
}
String.prototype.addToList=addToList;

function deleteFromList(pcVal,pcSep) {
  var lcString;
   try {
   if (pcSep == undefined) lcSep=","; else lcSep=pcSep;
   }
   catch(e) {
   lcSep=",";
   }
  lcString=this.toString();
  if (lcString.inList(pcVal,lcSep)) {
    lcString=lcSep + lcString + lcSep;
    liPos = lcString.indexOf(lcSep + pcVal + lcSep);
    lcString=lcString.substring(0,liPos) 
      + lcString.substring(liPos + pcVal.length + 1);
    if (lcString == lcSep) lcString = "";
    lcString=lcString.substring(1,lcString.length - 1);
  }
  else {
  }
  return lcString;
}
String.prototype.deleteFromList=deleteFromList;

function getRadioValue(phField) {
  if(phField) {
    for (var i = 0; i < phField.length; i++) {
      if (phField[i].checked) {
        lcValue = phField[i].value;
        break;    
      }
    }
    return lcValue;
  }
  return "";
}

function loadQueryField(phField) {
  lcHref=window.location.href;
  lcHref=lcHref.setQueryValue(phField.name,phField.value);
  window.location.href=lcHref;
}

function deleteCookie (pcName) {
  var exp = new Date();  
  exp.setTime (exp.getTime() - 1);  
  document.cookie = pcName + "=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/";
}


var cValidNo="1234567890";

function validCHR(ValidLIST) {
   inStr=this.toString();
   var j, theCHR, validated = "";
   
   if (typeof(inStr) != "string") inStr = inStr.toString();
   for (j=0;j<inStr.length; j++) {
      theCHR = inStr.charAt(j);
      if (ValidLIST.indexOf(theCHR) != -1)
         validated = validated + theCHR;
   }
   return validated;
}
String.prototype.validCHR = validCHR;

function replaceAll(pcValue,pcFrom,pcTo) {
  pcValue = pcValue.replace(new RegExp(pcFrom,"gi"),pcTo);
  return pcValue;
}

function calcDate(pcValue,pcDate,pcFieldFormat) {
   
   if (pcDate==undefined) {
     var ndate = new Date();
   } else {
     var ndate = validDate(pcDate);
   }

   var retDATE = "", j,theCHR,theSign = "", theCnt = "";
   pcValue = pcValue.toUpperCase();
   pcValue = pcValue.validCHR("0123456789-+DMY");
   for (j=0;j<pcValue.length; j++) {
      theCHR = pcValue.charAt(j);
      if ((theCHR == "+") || (theCHR == "-"))
         theSign = theCHR;
      else
      if ((theCHR == "D") || (theCHR == "M") || (theCHR == "Y")) {
         if (theCHR == "D") {
            if (theSign == "+")
               ndate.setDate(ndate.getDate() + parseInt(theCnt));
            else
               ndate.setDate(ndate.getDate() - parseInt(theCnt));
         }
         if (theCHR == "M") {
            liDate=ndate.getDate();
            if (theSign == "+")
               ndate.setMonth(ndate.getMonth() + parseInt(theCnt));
            else
               ndate.setMonth(ndate.getMonth() - parseInt(theCnt));
            if (ndate.getDate()!=liDate) {
              ndate.setDate(0);
            }
         }
         if (theCHR == "Y") {
            liDate=ndate.getDate();
            if (theSign == "+")
               ndate.setFullYear(ndate.getFullYear() + parseInt(theCnt));
            else
               ndate.setFullYear(ndate.getFullYear() - parseInt(theCnt));
            if (ndate.getDate()!=liDate) {
              ndate.setDate(0);
            }
         }
         theCnt = "";
      }
      else
         theCnt = theCnt + theCHR;
   }
   return ndate;
}

function formatDate(pjDate,pcFormat) {

            if (pcFormat==undefined) pcFormat="99/99/99";
            cd = pjDate.getDate();
            cm = pjDate.getMonth() + 1;
            cy = pjDate.getFullYear();
            cd = cd.toString();
            cm = cm.toString();
            cy = cy.toString();
            if ((pcFormat.length == 8) && (cy.length == 4)) cy = cy.slice(2);
            if (cd.length == 1) cd = "0" + cd;
            if (cm.length == 1) cm = "0" + cm;

            if (cDateFormat == "dmy")
               lcValue = cd + "/" + cm + "/" + cy;
            else
               lcValue = cm + "/" + cd + "/" + cy;         
   return lcValue;
}

function validDate(pcValue) {
    var tstDate = new Date;
    if (pcValue.indexOf("/") == -1) {
      if (cDateFormat == "dmy") {
        cd = pcValue.substr(0,2);
        cm = pcValue.substr(2,2);
        cy = pcValue.substr(4);
      }
      else {
        cm = pcValue.substr(0,2);
        cd = pcValue.substr(2,2);
        cy = pcValue.substr(4);
      }
    }
    else {
    pcValue=pcValue + "//";
                if (cDateFormat == "dmy") {
                   cd = pcValue.getEntry(0,"/");
                   cm = pcValue.getEntry(1,"/");
                   cy = pcValue.getEntry(2,"/");
                 } else {
                     cm = pcValue.getEntry(0,"/");
                     cd = pcValue.getEntry(1,"/");
                     cy = pcValue.getEntry(2,"/");
                }
     }
                /*
                m = m.toUpperCase();
                DateNo = Lookup(m.slice(0,3),date,",");
                if (DateNo > 0) m = DateNo;
                */
                cd = cd.validCHR(cValidNo);
                cm = cm.validCHR(cValidNo);
                cy = cy.validCHR(cValidNo);
                if (cm=="") {
                  cm=tstDate.getMonth() + 1;
                }
                else {
                  cm = parseInt(cm,10);
                }                
                if (cy=="") {
                  cy=tstDate.getFullYear().toString();
                }
                
                if (cy.length < 3) {
                   //cy=cy.trim("0","left");
                   if ((parseInt(cy,10) + 1900) > iYearOffset)
                      cy = parseInt(cy,10) + 1900;
                   else
                      cy = parseInt(cy,10) + 2000;
                }
                else {
                  cy = parseInt(cy.trim("0","left"));
                }
                
                //cd = parseInt(cd.trim("0","left"));
                
                if (cm<1||cm>12||cd<1||cd>31) {
                    return NaN;
                }
                tstDate = new Date(cy,cm - 1,cd);
                
                // if month of the result is more than the requested
                // then we've entered too many days for the month
                if (tstDate.getMonth()!=(parseInt(cm) - 1)) {
                    return NaN;
                }
              return tstDate;
}

function formatField (pFieldValue,pcType,pcFormat){
    if (pcFormat==undefined) {
    return pFieldValue.toString();
    }
    switch (pcType) {
    case "CH":
        lcFormatValue="";
        lcValue=pFieldValue.toString();
        // string to long for format
        if (lcValue.length>pcFormat.length) {
            hCOINSMain.coinsAlert(cFormatLength.replace("&1",pcFormat));
            return lcValue;
        }
        j = 0;
        for (i=0;i<pcFormat.length;i++) {
            switch(pcFormat.charAt(i)) {
            case "X": case "x": case "!":
                if (j<lcValue.length) {
                    lcFormatValue=lcFormatValue + lcValue.charAt(j);
                    j = j + 1;
                }
                else {
                  lcFormatValue = lcFormatValue + " ";
                }
                break;
            case "9":
                if (j<lcValue.length) {
                    // if character is not a number then error
                    if (lcValue.charAt(j).validCHR(cValidNo)=="") {
                      return null;
                    }
                    lcFormatValue=lcFormatValue + lcValue.charAt(j);
                    j = j + 1;
                }
                else {
                  return null;
                  //lcFormatValue = lcFormatValue + "0";
                }
                break;
            default:
                lcFormatValue=lcFormatValue + pcFormat.charAt(i);
                if (pcFormat.charAt(i)==lcValue.charAt(j)) {
                    j = j + 1;
                }
                break;
            }
        }
        return lcFormatValue.trim();
        break;
    case "DE":
        liInt=parseInt(pFieldValue.toString().getEntry(0,"."));
        
        /* need to cope with e.g. -0.2 */
        lcNeg="";
        if (parseFloat(pFieldValue.toString())<0&&liInt==0) lcNeg="-";
        
        if (pcFormat.indexOf("-")>0){
          lcInt=formatField(liInt,"IN","-" + pcFormat.getEntry(0,"."));
         }
        else {
          lcInt=formatField(liInt,"IN",pcFormat.getEntry(0,"."));
        } 
        
        pcFormat=pcFormat.getEntry(1,".");
        if (pcFormat!=undefined) {
          lcIDec = (pFieldValue.toString() + ".").getEntry(1,".");
          lcDec="";
          j = 0;
          for (i=0;i<=pcFormat.length;i++) {
              switch(pcFormat.charAt(i)) {
              case "9":
                  if (j<lcIDec.length) {
                    lcDec=lcDec + lcIDec.charAt(j);
                    j = j + 1;
                  }
                  else {
                    lcDec=lcDec + "0";
                  }
                  break;
              case "<":
                  if (j<lcIDec.length) {
                    lcDec=lcDec + lcIDec.charAt(j);
                    j = j + 1;
                  }
                  else {
                    lcDec=lcDec + "";
                  }
                  break;
              case ",":
                  if (j<lcIDec.length) {
                    lcDec=lcDec + ",";
                  }
                  else {
                    lcDec=lcDec + "";
                  }
                  break;
              }
           }
          if (j<lcIDec.length) {
              return lcNeg + lcInt + "." + lcIDec;
          }
          else {
          return lcNeg + lcInt + "." + lcDec;
          }
        }
        else {
          return lcInt;
        }
        break;
    case "IN":
        lbNegative=(parseInt(pFieldValue)<0);
        // if negative number and no negative format
        if (lbNegative&&pcFormat.indexOf("-")==-1) {
            return pFieldValue;
        }
        
        if (pcFormat.substring(pcFormat.length)=="-"){
          pcFormat = "-" + pcFormat.substring(0,pcFormat.length - 1);
         }
        
        lcValue=replaceAll(pFieldValue.toString(),"-","");
        j = lcValue.length - 1;
        lcFormatValue="";
        for (i=pcFormat.length - 1;i>=0;i--) {
          switch(pcFormat.charAt(i)) {
           case "9":
              if (j>=0) {
              lcFormatValue=lcValue.charAt(j) + lcFormatValue;
              j = j - 1;
              }
              else {
                lcFormatValue="0" + lcFormatValue;
              }
              break;          
          case ">": case "Z": case "z":
              if (j>=0) {
              lcFormatValue=lcValue.charAt(j) + lcFormatValue;
              j = j - 1;
              }
              break;
          case ",":
              if (j>=0) {
              lcFormatValue="," + lcFormatValue;
              }
              break;
          case "-":
              if (lbNegative) {
                  lcFormatValue="-" + lcFormatValue;
              }
              break;
          }
       
        } 
        if (j==-1) {
          return lcFormatValue;
        }
        else if (lbNegative) { 
          return "-" + lcValue;
        }
        else {
          return lcValue;
        }
    break;
    }
    return pFieldValue.toString();
}
function validDType(phObject,pcType) {  
  if(isValueChanged(phObject,true)&&phObject.onchange) {
   // onchange ends up firing twice in matrix screens 
      if (typeof matrixData == "undefined"               
         || Object.keys(matrixData).length==0) {      
          phObject.onchange();                             
      }                                                  
  }                                                    

  lcValue=phObject.value;
  lcFieldFormat=getFieldFormat(phObject);
  pcType=getFieldDataType(phObject);
  if (pcType!=undefined) pcType=pcType.toUpperCase();
  switch (pcType) {
  case "CH":
      if(lcValue!="")
        lcValue=formatField(lcValue,"CH",lcFieldFormat);
      if (phObject.autocaps=="true") lcValue=lcValue.toUpperCase();
      if (lcValue==null) {
        hCOINSMain.coinsAlert(cInvalidText.replace("&1",lcFieldFormat));
        return false;
      }
      break;
  case "IN":
    if (lcValue=="") return true;
    lcValue=lcValue.getEntry(0,".");
    lcValue=lcValue.validCHR(cValidNo + "-");
    liValue=parseFloat(lcValue);
    if (isNaN(liValue)) {
        hCOINSMain.coinsAlert(cInvalidNumber.replace("&1",lcFieldFormat));
        return false;
    }
    else {
      if (lcFieldFormat==undefined) return true;
      lcValue=formatField(liValue,"IN",lcFieldFormat);
    }
    break;
  case "DE":
    if (lcValue=="") return true;
    lcValue=lcValue.validCHR(cValidNo + "-.");
    ldValue=parseFloat(lcValue);
    if (isNaN(ldValue)) {
        hCOINSMain.coinsAlert(cInvalidNumber.replace("&1",lcFieldFormat));
        return false;
    }
    else {
      if (lcFieldFormat==undefined) return true;

      if (ldValue.toString().indexOf('e') >= 0)
        ldValue = lcValue; /* If JS shrunk 0.0000002 to 2e-7, then pass it as a string */

      lcValue=formatField(ldValue,"DE",lcFieldFormat);
    }
    break;
  case "DA":
    if (lcFieldFormat==undefined) lcFieldFormat="99/99/99";
    
        if (cDateFormat=="dmy") {
          lcDateFormat="DD/MM/";
        } else {
          lcDateFormat="MM/DD/";
        }
        if (lcFieldFormat.length==8) {
          lcDateFormat=lcDateFormat + "YY";
        } else {
          lcDateFormat=lcDateFormat + "YYYY";
        }
    
    if (lcValue.charAt(0)=="$") {
        ljDate=calcDate(lcValue);
    }
    else {
        ljDate=validDate(lcValue);
    }
    if (isNaN(ljDate)) {
      if (lcValue!="") {
        hCOINSMain.coinsAlert(cInvalidDate.replace("&1",lcDateFormat));
        return false;
      }
    }
    else {
            cd = ljDate.getDate();
            cm = ljDate.getMonth() + 1;
            cy = ljDate.getFullYear();
            cd = cd.toString();
            cm = cm.toString();
            cy = cy.toString();
            if ((lcFieldFormat.length == 8) && (cy.length == 4)) cy = cy.slice(2);
            if (cd.length == 1) cd = "0" + cd;
            if (cm.length == 1) cm = "0" + cm;

            if (cDateFormat == "dmy")
               lcValue = cd + "/" + cm + "/" + cy;
            else
               lcValue = cm + "/" + cd + "/" + cy;         
               
      if (lcValue!=""&&lcValue.length!=lcFieldFormat.length) {
        hCOINSMain.coinsAlert(cInvalidDate.replace("&1",lcDateFormat));
        return false;
      }
               
    }
    break;
    
    default:
    break;
  }
  phObject.value=lcValue;
  return true;
}

function positionInfo(object) {

  var p_elm = object;

  this.getElementLeft = getElementLeft;
  function getElementLeft() {
    var x = 0;
    var elm;
    if(typeof(p_elm) == "object"){
      elm = p_elm;
    } else {
      elm = document.getElementById(p_elm);
    }
    while (elm != null) {
      x+= elm.offsetLeft;
      elm = elm.offsetParent;
    }
    return parseInt(x);
  }

  this.getElementWidth = getElementWidth;
  function getElementWidth(){
    var elm;
    if(typeof(p_elm) == "object"){
      elm = p_elm;
    } else {
      elm = document.getElementById(p_elm);
    }
    return parseInt(elm.offsetWidth);
  }

  this.getElementRight = getElementRight;
  function getElementRight(){
    return getElementLeft(p_elm) + getElementWidth(p_elm);
  }

  this.getElementTop = getElementTop;
  function getElementTop() {
    var y = 0;
    var elm;
    if(typeof(p_elm) == "object"){
      elm = p_elm;
    } else {
      elm = document.getElementById(p_elm);
    }
    while (elm != null) {
      y+= elm.offsetTop;
      elm = elm.offsetParent;
    }
    return parseInt(y);
  }

  this.getElementHeight = getElementHeight;
  function getElementHeight(){
    var elm;
    if(typeof(p_elm) == "object"){
      elm = p_elm;
    } else {
      elm = document.getElementById(p_elm);
    }
    return parseInt(elm.offsetHeight);
  }

  this.getElementBottom = getElementBottom;
  function getElementBottom(){
    return getElementTop(p_elm) + getElementHeight(p_elm);
  }
}

/* calendar lookup */
function CalendarControl() {

  var calendarId = 'CalendarControl';
  var currentYear = 0;
  var currentMonth = 0;
  var currentDay = 0;

  var selectedYear = 0;
  var selectedMonth = 0;
  var selectedDay = 0;

  var dateField = null;

  function getDaysInMonth(year, month) {
    return [31,((!(year % 4 ) && ( (year % 100 ) || !( year % 400 ) ))?29:28),31,30,31,30,31,31,30,31,30,31][month-1];
  }

  function getDayOfWeek(year, month, day) {
    var date = new Date(year,month-1,day)
    return date.getDay();
  }

  this.clearDate = clearDate;
  function clearDate() {
    applyDate('');
  }

  this.setDate = setDate;
  function setDate(year, month, day) {
    if (dateField) {
      if (month < 10) {month = "0" + month;}
      if (day < 10) {day = "0" + day;}

      if(getFieldFormat(dateField)=="99/99/99") {
        year=year.toString().substring(2);
      }

      if (cDateFormat=="dmy") {
        var dateString = day+"/"+month+"/"+year;
      }
      else {
        var dateString = month+"/"+day+"/"+year;
      }

      applyDate(dateString);
    }
    return;
  }

  this.applyDate = applyDate;
  function applyDate(pcDate) {
    try {
      dateField.focus();
    } catch(e) {}
    dateField.value = pcDate;
    dateField.select();
    
    dateField.dispatchEvent(createNewEvent('change'));

    if (dateField.onblur!=null) {
      dateField.onblur();
    }
    hide();
  }

  this.changeMonth = changeMonth;
  function changeMonth(change) {
    currentMonth += change;
    currentDay = 0;
    if(currentMonth > 12) {
      currentMonth = 1;
      currentYear++;
    } else if(currentMonth < 1) {
      currentMonth = 12;
      currentYear--;
    }

    calendar = document.getElementById(calendarId);
    calendar.innerHTML = calendarDrawTable();
  }

  this.changeYear = changeYear;
  function changeYear(change) {
    currentYear += change;
    currentDay = 0;
    calendar = document.getElementById(calendarId);
    calendar.innerHTML = calendarDrawTable();
  }

  function getCurrentYear() {
    var year = new Date().getYear();
    if(year < 1900) year += 1900;
    return year;
  }

  function getCurrentMonth() {
    return new Date().getMonth() + 1;
  } 

  function getCurrentDay() {
    return new Date().getDate();
  }

  function calendarDrawTable() {

    removeTooltips();
    
    var dayOfMonth = 1;
    var validDay = 0;
    var startDayOfWeek = getDayOfWeek(currentYear, currentMonth, dayOfMonth);
    var daysInMonth = getDaysInMonth(currentYear, currentMonth);
    var css_class = null; //CSS class for each day

    var table = "<table cellspacing='0' cellpadding='0' border='0'>";
    table = table + "<tr class='header'>";
    table = table + "  <td colspan='2' class='previous'>"
          + "<a href='null'" 
          + " onclick='changeCalendarControlMonth(-1);return false;'"
          + " title='" + cPrevMonth + "'>"
          + "&lt;</a> <a href='null'"
          + " onclick='changeCalendarControlYear(-1);return false;'"
          + " title='" + cPrevYear + "'>"
          + "&laquo;</a></td>";
    table = table + "  <td colspan='3' class='title'>" 
          + cMonths[currentMonth-1] + " " + currentYear + "</td>";
    table = table + "  <td colspan='2' class='next'>"
          + "<a href='null'"
          + " onclick='changeCalendarControlYear(1);return false;'"
          + " title='" + cNextYear + "'>"
          + "&raquo;</a> <a href='null'"
          + " onclick='changeCalendarControlMonth(1);return false;'"
          + " title='" + cNextMonth + "'>"
          + "&gt;</a></td>";
    table = table + "</tr>";
    table = table + "<tr>"
          + "<th>" + cDay[0] + "</th>"
          + "<th>" + cDay[1] + "</th>"
          + "<th>" + cDay[2] + "</th>"
          + "<th>" + cDay[3] + "</th>"
          + "<th>" + cDay[4] + "</th>"
          + "<th>" + cDay[5] + "</th>"
          + "<th>" + cDay[6] + "</th>"
          + "</TR>";

    for(var week=0; week < 6; week++) {
      table = table + "<tr>";
      for(var dayOfWeek=0; dayOfWeek < 7; dayOfWeek++) {
        if(week == 0 && startDayOfWeek == dayOfWeek) {
          validDay = 1;
        } else if (validDay == 1 && dayOfMonth > daysInMonth) {
          validDay = 0;
        }

        if(validDay) {
          if (dayOfMonth == selectedDay && currentYear == selectedYear && currentMonth == selectedMonth) {
            css_class = 'current';
          } else if (dayOfWeek == 0 || dayOfWeek == 6) {
            css_class = 'weekend';
          } else {
            css_class = 'weekday';
          }

          table = table + "<td><a class='"+css_class
                +"' href=\"null\" onClick=\"setCalendarControlDate("
    +currentYear+","+currentMonth+","
    +dayOfMonth+");return false;\">"+dayOfMonth+"</a></td>";
          dayOfMonth++;
        } else {
          table = table + "<td class='empty'>&nbsp;</td>";
        }
      }
      table = table + "</tr>";
    }

    table = table + "<tr class='header'>"
          + "<th colspan='7' style='padding: 3px;'>"
          + '<a href="null"'
          + ' onclick="clearCalendarControl();return false;"'
          + ">"
          + cClear 
          + "</a> | "
          + '<a href="null"'
          + ' onclick="hideCalendarControl();return false;"'
          + ">"
          + cClose
          + "</a></td></tr>";
    table = table + "</table>";

    return table;
  }

  this.position = position;
  function position() {
    // Assuming the control is already visible and can be measured
    if (!visible())
      return;

    $('#CalendarControl').position({
      my: "left top",
      at: "left bottom",
      of: $(dateField),
      collision: "flip"
    });
  }

  this.show = show;
  function show(field) {
    can_hide = 0;
  
    // If the calendar is visible and associated with
    // this field do not do anything.
    if (dateField == field) {
      return;
    } else {
      dateField = field;
    }
    
    if(dateField) {
      var container$=$(dateField).closest('div.formcontainer');

      /* insert the control in the right part of the dom */
      if(container$.length==0) {
        $('body').prepend($('#CalendarControlWrapper'));
      }
      else {
        container$.prepend($('#CalendarControlWrapper'));
      }

      $('#CalendarControlWrapper').show();

      try {
        var dateString = new String(dateField.value);
        var dateParts = dateString.split("/");
        
        if (cDateFormat=="dmy") {
        selectedDay = parseInt(dateParts[0],10);
        selectedMonth = parseInt(dateParts[1],10);
        } else {
        selectedMonth = parseInt(dateParts[0],10);
        selectedDay = parseInt(dateParts[1],10);
        }
        selectedYear = parseInt(dateParts[2],10);
        if (dateParts[2].length<=2) {
          selectedYear=selectedYear + 1900;
          if (selectedYear<iYearOffset) {
            selectedYear=selectedYear + 100;
          }
        }
      } catch(e) {}
    }

    if (!(selectedYear && selectedMonth && selectedDay)) {
      selectedMonth = getCurrentMonth();
      selectedDay = getCurrentDay();
      selectedYear = getCurrentYear();
    }

    currentMonth = selectedMonth;
    currentDay = selectedDay;
    currentYear = selectedYear;

    calendar = document.getElementById(calendarId);
    calendar.innerHTML = calendarDrawTable(currentYear, currentMonth);

    $('#CalendarControl').css('display', 'inline-block');

    position();
  }

  this.hide = hide;
  function hide() {
    if(dateField) {
      $('#CalendarControl').css('display', 'none');
      dateField = null;
    }
  }

  this.visible = visible;
  function visible() {
    return dateField
  }

  this.can_hide = can_hide;
  var can_hide = 0;
}

var calendarControl = new CalendarControl();

function showCalendarControl(textField) {
  if (calendarControl.visible() == textField)
    hideCalendarControl();
  else
    calendarControl.show(textField);
}

function positionCalendarControl() {
  calendarControl.position();
}

function clearCalendarControl() {
  calendarControl.clearDate();
}

function hideCalendarControl() {
  stopValidation(false);
  if (calendarControl.visible()) {
    calendarControl.hide();
  }
}

function setCalendarControlDate(year, month, day) {
  stopValidation(false);
  calendarControl.setDate(year, month, day);
}

function changeCalendarControlYear(change) {
  calendarControl.changeYear(change);
}

function changeCalendarControlMonth(change) {
  calendarControl.changeMonth(change);
}

function initialiseCalendarControl() {
document.write(
  '<div id="CalendarControlWrapper" style="display:block;width:0px'
  + ';position:relative">');
document.write("<div id='CalendarControl' style='z-index:9999'></div>");
document.write('</div>');
}

/* end calendar lookup */

function initialiseTinymce(pcElements,pcViewAs) {
   
   arrayElements = pcElements.split(",");
   arrayViewAs = pcViewAs.split(",");
   
   for (var i=0;i<arrayElements.length;i++){
     if (arrayViewAs[i] == "html") 
     {
       tinyMCE.init({
           // General options
           browser_spellcheck : true,
           selector : "#" + arrayElements[i],
           relative_urls: false,
           remove_script_host: false,
           convert_urls: true,
           
           menubar : false,
           resize : "both",
           width: "100%",
           
           plugins: [
                 'advlist','autolink','lists','image','charmap','preview','anchor','pagebreak',
                 'searchreplace','visualblocks','code','fullscreen',
                 'insertdatetime','media','table','help','wordcount'
                  ],
           toolbar: 'tokens tables | ' // emailTemplate.js-specific
                   + 'undo redo | bold italic underline | align | '
                   + 'cut copy paste pastetext | searchreplace | bullist numlist | '
                   + 'outdent indent | anchor link unlink | image table | '
                   + ' strikethrough superscript subscript charmap removeformat | '
                   + 'forecolor backcolor | '
                   + ' styles | fontfamily fontsize | '
                   + 'hr fullscreen code help',
           toolbar_mode: 'floating',
         
           // Example content CSS (should be your site CSS)
           content_css : CoinsStyle_coins.href.replaceAll(',','%2c') + ","
           + ((typeof CoinsStyle_coinsv2=='object')?CoinsStyle_coinsv2.href.replaceAll(',','%2c') + ",":"")
           + "/coins/" + cWebStyle.getEntry(0,'/') + "/style/fonts.css,"
           + "/coins/" + cWebStyle + "/style/user.css,"
           + "/coins/" + cWebStyle + "/style/editor.css",
   
           style_formats : tinyStyles,

           setup: function (editor) {
             if (typeof initialiseTinymceSetup == 'function')
               initialiseTinymceSetup(editor, pcViewAs);
           }
     });
   }
   else {
       tinyMCE.init({
              // General options
              mode : "exact",
              selector : "#" + arrayElements[i],

           menubar : false,
           resize : "both",
           width: "100%",
           
           plugins: [
            'advlist','autolink','lists','image','charmap','preview','anchor','pagebreak',
            'searchreplace','visualblocks','code','fullscreen',
            'insertdatetime','media','table','help','wordcount'
                  ],
  
           toolbar: "bold italic underline",
      
           // Example content CSS (should be your site CSS)
           content_css : CoinsStyle_coins.href.replaceAll(',','%2c') + ","
           + ((typeof CoinsStyle_coinsv2=='object')?CoinsStyle_coinsv2.href.replaceAll(',','%2c') + ",":"")
           + "/coins/" + cWebStyle.getEntry(0,'/') + "/style/fonts.css,"
           + "/coins/" + cWebStyle + "/style/user.css,"
           + "/coins/" + cWebStyle + "/style/editor.css",
      
           style_formats : tinyStyles,

           setup: function (editor) {
             if (typeof initialiseTinymceSetup == 'function')
               initialiseTinymceSetup(editor, pcViewAs);
           }

       });
   }
   }
   
}

function initialiseMultiSelect(pcID) {
  var lhSelect = el$(pcID);

  $(lhSelect).multiselect({
    menuHeight: 400,
    noneSelectedText: ' ',
    selectedList: 5,
    buttonWidth: (lhSelect.dataset.minwidth ? lhSelect.dataset.minwidth + 'px' : 225)
  })
  .multiselectfilter()
  .multiselect('getButton').on('focus', function() {
    fieldOnFocus(this);
    $(this).errorMessage();
  });

  if ('selectvd,selectdv'.inList(lhSelect.dataset.viewas)) {
    /* show only values instead of full option descriptions in selected options list */
    $(lhSelect).multiselect('option',
      'selectedText',
      function(checked, total, els) {
        if (/\d/.test(this.options.selectedList)
            && this.options.selectedList > 0
            && checked > this.options.selectedList)
          return '# of # selected'.replace('#', checked).replace('#', total);
        else
          return els.map(function(el) {
            return el.value;
          }).join(', ');
    });
  }
}

 function setImage(hObject,pcExt) {
 /*
   lcID = getObjectAttr(hObject,'imageID');
   if (lcID==null) lcID=hObject.imageID;
   if(lcID==undefined) {
     lcID=hObject.id + 'Img';
   }
   h = document.getElementById(lcID);*/
   h=hObject.children[0];
   var hover_img=h.src;
   var hover_ext=hover_img.substring(hover_img.length - 3);
   hover_img=hover_img.substring(0,hover_img.length - 4);
   hover_img=hover_img.getEntry(0,"_");
   hover_img=hover_img + pcExt + '.' + hover_ext;
   return hover_img;
 }
 function hover(hObject)
 {
 /*
   lcID = getObjectAttr(hObject,'imageID');
   if (lcID==null) lcID=hObject.imageID;
   if(lcID==undefined) {
     lcID = hObject.id + 'Img';
   }
   hImg=document.getElementById(lcID);
   */
   hImg=hObject.children[0];

   cImg=hImg.src;
   cImg=cImg.substr(cImg.length - 6);
   if (cImg!="_i.gif") {
     hImg.src = setImage(hObject,"_h");
   }
 }

 function restore(hObject)
 {
 /*
   lcID = getObjectAttr(hObject,'imageID');
   if (lcID==null) lcID=hObject.imageID;
   if(lcID==undefined) {
     lcID = hObject.id + 'Img';
   }
   hImg=document.getElementById(lcID);*/
   hImg=hObject.children[0];
   cImg=hImg.src;
   cImg=cImg.substr(cImg.length - 6);
   if (cImg!="_i.gif") {
     hImg.src = setImage(hObject,"");
   }
 }

 function press(hObject)
 {
 /*
   lcID = getObjectAttr(hObject,'imageID');
   if (lcID==null) lcID=hObject.imageID;
   if(lcID==undefined) {
     lcID = hObject.id + 'Img';
   }
   hImg=document.getElementById(lcID);*/
   hImg=hObject.children[0];
   cImg=hImg.src;
   cImg=cImg.substr(cImg.length - 6);
   if (cImg!="_i.gif") {
     hImg.src = setImage(hObject,"_d");
   }
 }



function onReturn(pcAction) {
  if (window.event.keyCode==13) {
    eval(pcAction);
    return false;
  }
  return true;
}


function openLookupWindow(phField) {
  stopValidation(true);
  try {
    phField.focus();
  }
  catch (e) { }
  
  if (getFieldHelpFunc(phField) == undefined) {
    hCOINSMain.coinsAlert(cAlertNoLookup);
    if (phField.disabled==false) phField.focus();
    return false;
  }
  
  if (phField.helpFunc=="CALENDAR") {
    eval("lfield" + phField.name + ".onclick();");
    return false;
  }

  if (getFieldHelpParam(phField) == undefined) lcParam=""; 
  else lcParam="&" + getFieldHelpParam(phField); 

  lcHref=location.search;
  lcHref="?" + buildURL(lcHref,"short","");
  lcHref=lcHref.setQueryValue("iframe","");
  lcHref=lcHref.setQueryValue("Button","");
  lcHref=lcHref.setQueryValue("MainArea",getFieldHelpFunc(phField));
  
  
  if (phField.id.substring(0,12)=='dynamicField') {
  lcHref=lcHref.setQueryValue("lookupField",phField.form.name + "." + phField.id);
  }
  else {
  lcHref=lcHref.setQueryValue("lookupField",phField.form.name + "." + phField.name);
  }
  
  if ((phField.dataType!='IN'||parseInt(phField.value)!=0)&&
    phField.value.length<1000) {
    lcHref=lcHref.setQueryValue("lookupFieldValue",(phField.value));
  }
  
  lcFields=getFieldContextFields(phField);
  
  lcHref = lcHref + lcParam;
  lcHref = setParam(lcHref,
             getInputFields(lcFields,lcParam.getQueryValue("contextNames")));

  /* overwrite valid params in lookup */
    if (getFieldValidParam(phField)!=undefined) {
      lcHref = setParam(lcHref,getFieldValidParam(phField));      
    }
  
  lcHref="wocoins.p" + lcHref;
  /* don't want wou005.p as this will prevent shift-select 
  if (lcParam.getQueryValue("maintLookup")=="yes") {
    lcHref="wocoins.p" + lcHref;
  }
  else {
    lcHref=lcHref.setQueryValue("NoMenu","yes");
    lcHref=lcHref.setQueryValue("NoFrameSet","yes");
    lcHref="wou005.p" + lcHref;
  }
  */
  
  open(lcHref,"_blank","toolbar=no status=yes resizable=yes scrollbars=yes location=yes",replace=false);
}

function buildURL(pcURL,pcType,pcDiscard) {
  lcURL="";
  if (pcType=="short") {
    lcURL="kco=" + pcURL.getQueryValue("kco") 
         + "&TopMenu=" + encodeURIComponent(pcURL.getQueryValue("TopMenu"));
    if (pcURL.getQueryValue("coinsinfo") != "") {
      lcURL=lcURL
           + "&coinsinfo=" + pcURL.getQueryValue("coinsinfo");
    }
    if (pcURL.getQueryValue("hs_actionRowid") != "") {
      lcURL=lcURL
           + "&hs_actionRowid=" + pcURL.getQueryValue("hs_actionRowid");
    }
    if (pcURL.getQueryValue("permUser") != "") {
      lcURL=lcURL
           + "&permUser=" + escape(pcURL.getQueryValue("permUser"));
    }    
    if (pcURL.getQueryValue("helpmode") != "") {
      lcURL=lcURL
           + "&helpmode=" + pcURL.getQueryValue("helpmode");
    }
    if (pcURL.getQueryValue("helpMode") != "") {
      lcURL=lcURL
           + "&helpmode=" + pcURL.getQueryValue("helpMode");
    }
    if (pcURL.getQueryValue("pvjob") != "") {
      lcURL = lcURL + 
              "&pvjob=" +
              pcURL.getQueryValue("pvjob") +
              "&pvphase=" +
              pcURL.getQueryValue("pvphase") +
              "&pvhidemenu=" +
              pcURL.getQueryValue("pvhidemenu");
    }
    if (pcURL.getQueryValue("pvCILevel") != "") {
      lcURL=lcURL
           + "&pvCILevel=" + pcURL.getQueryValue("pvCILevel");
    }
    if (pcURL.getQueryValue("rtbtask") != "") {
      lcURL=lcURL
           + "&rtbtask=" + pcURL.getQueryValue("rtbtask");
    }
  }

  return lcURL;
}

function utfescape(pcString) {
  pcString = pcString.replace(/%/g,"%25");
  pcString = pcString.replace(/\+/g,"%2B");
  pcString = pcString.replace(/&/g,"%26");
  pcString = pcString.replace(/=/g,"%3D");
  return pcString;
}

function getInputFields(pcContextFields,pcContextNames,pbBlank) {
  return getThisInputFields(thisForm,pcContextFields,pcContextNames,pbBlank);
}
function getThisInputFields(phForm,pcContextFields,pcContextNames,pbBlank) {
  var lcField;
  var lcFieldList='';
  var lcCheckboxes='';      

  if (pbBlank==undefined) pbBlank=true;
  if (pcContextNames==undefined) pcContextNames="";
    lcFields = "";
    lcInForm = "";

    for (var i=0;i<phForm.elements.length;i++) {
    
      if(pcContextFields != undefined  
         && pcContextFields.inList(phForm.elements[i].name)==false)
         continue;
    
      lcValue = phForm.elements[i].value;
      if (phForm.elements[i].type=="checkbox"&&phForm.elements[i].checked==false) {
        lcValue = "";
      }
      
      if (phForm.elements[i].type == "radio") {
         if (!phForm.elements[i].checked)
            continue;
      }
      
      if (phForm.elements[i].name=='') continue;
      if (pbBlank==false&&lcValue=="") continue;
      if (phForm.elements[i].name.toLowerCase()=='inputfields') continue;
      if (phForm.elements[i].name.toLowerCase()=='inputdtypes') continue;
      if (phForm.elements[i].name.toLowerCase()=='inputlabels') continue;
      if (phForm.elements[i].name.toLowerCase()=='returnpage') continue;
      
      if(phForm.elements[i].type=="checkbox"){
        lcCheckboxes=lcCheckboxes.addToList(phForm.elements[i].name);
      }

      if (lcValue=="" 
         && (lcFieldList.inList(phForm.elements[i].name)
             || phForm.elements[i].type=="checkbox")
      ) continue;
      lcFieldList = lcFieldList + ',' + phForm.elements[i].name;
      
      if (phForm.elements[i].name!="" /*&& lcValue!=""*/) {  
        if (pcContextFields == undefined) {
          if (phForm.elements[i].name!="inputFields"&&phForm.elements[i].disabled==false) {
            lcFields = lcFields + "&" + phForm.elements[i].name + "=" + utfescape(lcValue);
          }
        }
        else {

          if (phForm.elements[i].name!="inputFields" && 
          (pcContextFields.inList(decodeFieldName(phForm.elements[i].name))
           ||
           pcContextFields.inList(phForm.elements[i].name)
          )
             ) {

            /* if context names is used then use this name */
            if (pcContextNames!="") {
              lcField = pcContextNames.getEntry(pcContextFields.getLookup(decodeFieldName(phForm.elements[i].name)));
            }
            else {
              lcField = phForm.elements[i].name;
            }
 
             lcFields = lcFields + "&" 
                     + lcField + "=" + utfescape(lcValue);
            lcInForm = lcInForm + "," 
                     + lcField;
          }
        }
      }
    }
    
    if(lcCheckboxes!="") {
      if(pcContextFields==undefined) {
        pcContextFields=lcCheckboxes;
      } else {
        pcContextFields=pcContextFields + ',' + lcCheckboxes;
        if(pcContextNames!="") 
          pcContextNames=pcContextNames + ',' + lcCheckboxes;
      }
    }
    
    /* now loop through the context fields and fill in any missing ones
       from the URL */
    var lcHref = getCurrentLocation().href;
    if (pcContextFields != undefined) {
      for (var i=0;i<pcContextFields.numEntries();i++) {

            /* if context names is used then use this name */
            if (pcContextNames!="") {
              lcField = pcContextNames.getEntry(i);
            }
            else {
              lcField=pcContextFields.getEntry(i);
            }

        if (lcInForm.inList(lcField)==false
            &&
            lcInForm.inList(decodeFieldName(lcField))==false
            &&
            lcFieldList.inList(lcField)==false
           ) {
          lcFields = lcFields + "&" + lcField + "="
                   + lcHref.getQueryValue(lcField);
        }
      }
    }
    return lcFields;
}

function valueEncode(pcString) {
  var lcField=pcString;
  lcField = lcField.replace(new RegExp("&","g"),"&amp;");
  lcField = lcField.replace(new RegExp('"',"g"),"&quot;");
  lcField = lcField.replace(new RegExp("<","g"),"&lt;");
  lcField = lcField.replace(new RegExp(">","g"),"&gt;");
  return lcField;
}
function valueDecode(pcString) {
  var lcField=pcString;
  lcField = lcField.replace(new RegExp("&amp;","g"),"&");
  lcField = lcField.replace(new RegExp("&quot;","g"),'"');
  lcField = lcField.replace(new RegExp("&lt;","g"),"<");
  lcField = lcField.replace(new RegExp("&gt;","g"),">");
  return lcField;
}

function encodeFieldName(pcField) {
  var lcField = pcField;
  lcField = lcField.replace(/\$/g,"$J$"); // always replace "$"" first
  lcField = lcField.replace(/\^/g,"$H$"); 
  lcField = lcField.replace(/%/g, "$A$");
  lcField = lcField.replace(/=/g, "$B$");
  lcField = lcField.replace(/\|/g,"$C$");
  lcField = lcField.replace(/\//g,"$D$");
  lcField = lcField.replace(/:/g, "$E$");
  lcField = lcField.replace(/\+/g,"$F$");
  lcField = lcField.replace(/&/g, "$G$");
  lcField = lcField.replace(/-/g, "$$$$"); // 4$s will equate to $$
  return lcField;
}

function decodeFieldName(pcField) {
  let lcField = pcField;
  let liPos = lcField.indexOf("$");
  let lcToken;

  // work left to right, replacing tokens as found
  while (liPos >= 0) {
    // "$$"" = "-"
    lcToken = lcField.substr(liPos, 2);
    if (lcToken && lcToken == "$$"){
      lcField = lcField.substr(0,liPos) + "-" + lcField.substr(liPos + 2);
    } else {
      // all other tokens are 3 characters
      lcToken = lcField.substr(liPos, 3);
    
      switch(lcToken) {
        case "$A$":
          lcField = lcField.substr(0,liPos) + "%" + lcField.substr(liPos + 3);
          break;
        case "$B$":
          lcField = lcField.substr(0,liPos) + "=" + lcField.substr(liPos + 3);
          break;        
        case "$C$":
          lcField = lcField.substr(0,liPos) + "|" + lcField.substr(liPos + 3);
          break;
        case "$D$":
          lcField = lcField.substr(0,liPos) + "/" + lcField.substr(liPos + 3);
          break;
        case "$E$":
          lcField = lcField.substr(0,liPos) + ":" + lcField.substr(liPos + 3);
          break;
        case "$F$":
          lcField = lcField.substr(0,liPos) + "+" + lcField.substr(liPos + 3);
          break;
        case "$G$":
          lcField = lcField.substr(0,liPos) + "&" + lcField.substr(liPos + 3);
          break;
        case "$H$":
          lcField = lcField.substr(0,liPos) + "^" + lcField.substr(liPos + 3);
          break;
        case "$J$":
          lcField = lcField.substr(0,liPos) + "$" + lcField.substr(liPos + 3);
          break;          
        }
    }
    liPos = lcField.indexOf("$", liPos + 1);
  }

  return lcField;
}

function setParam(pcQuery,pcParam) {
  /* go through the entries in pcParam and replace/add to pcQuery */
  lcParams="";
  if (pcParam==undefined) return pcQuery;
  tokens = pcParam.split("&");
  for (var i = 0; i < tokens.length; i++){
    attrs = tokens[i].split("=");
    /* if we have two parts to the token then assign them */
    if (attrs.length==2) {
      if (lcParams.getLookup(attrs[0])==-1) {
        lcParams = lcParams + ',' + attrs[0];
        /* add if blank */
        pcQuery=pcQuery.setQueryValue(attrs[0],unescape(attrs[1]),true);
      }
      else {
        pcQuery=pcQuery.setQueryValue(attrs[0],
                  pcQuery.getQueryValue(attrs[0])
                  + ',' + unescape(attrs[1]));
      }
    }
  }
  return pcQuery;
}



function setValidateFieldValue (phField,pcValue) {
  if (phField.type=="checkbox") {
    if (",n,N,false".getLookup(pcValue)!=-1) {
      phField.checked=false;
    }
    else {
      phField.checked=true;
    }
  }
  else {
    phField.value = pcValue;
  }
}

cReturnData = "";
function validateOK(pcField,pcData) {
  cReturnData=pcData;
  try {
  
  if (pcField.substring(0,9)=="thisForm.") pcField=pcField.substring(9);
  lcOK = fieldData[pcField].onOK;
  if (lcOK==undefined) lcOK = '';
  if (lcOK) eval(lcOK);
  
  /*
  lcOK = eval(pcField + ".onOK");
  if (lcOK && lcOK != "") {
    eval(lcOK);
  }
  else {
    lcOK = eval(pcField + "1.onOK"); // radio sets
    if (lcOK && lcOK != "") {
      eval(lcOK);
    }
  } 
  */
  
  }
  catch(e) { console.error('Error in %s.onOK, %s', pcField, e); }
}

function getReturn(pcField) {
/*  lcValue = cReturnData.replace(/'/g,"\\'");*/
  lcValue = cReturnData;
  lcValue = lcValue.getQueryValue(pcField);
  lcValue = lcValue.replace(/%26/g, "&");
  lcValue = lcValue.replace(/%7C/g, "|");
  return lcValue;
}
function inReturn(pcField) {
  return cReturnData.inQuery(pcField);
}

function setReturnData(pcField, pcSource, pcTag) {
  if (pcSource==undefined) pcSource=pcField;
  if (pcTag==undefined) pcTag="";

  var lcValue = "";
  lcValue = getReturn(pcSource);
  
  if (pcTag!="") {
    lcValue = "<" + pcTag + ">" + lcValue + "</" + pcTag + ">";
  }
  
  try {
    eval('hVar=' + pcField);
    
    if (hVar.tagName==undefined) return;
    if (hVar.tagName.toLowerCase()!='var') return;
     
    if ( hVar.childNodes.length==0 ||
        (hVar.childNodes[0].tagName==undefined) ||
        (hVar.childNodes[0].tagName.toLowerCase()!='select-one' && 
         hVar.childNodes[0].tagName.toLowerCase()!='select' && 
         hVar.childNodes[0].tagName.toLowerCase()!='input'))
    {
      if (pcTag=="" &&
          hVar.innerHTML.toLowerCase().startsWith("<img ") &&
          hVar.innerHTML.toLowerCase().endsWith('tick.gif">'))
       setReturnCheckboxData(pcField,pcSource);
      else hVar.innerHTML = lcValue;
    }    
  } 
  catch(e){
  }
}

function setReturnField(pcField, pcSource) {
  if (pcSource==undefined) pcSource=pcField;
  
  try {
    lhField = eval("thisForm." + pcField);
    
    // if field not there then ignore
    if (lhField==undefined) {
      return;
    }

    var lcValue = getReturn(pcSource);
    
    // Checkbox. Unlike other field types setting the checkbox value, even when
    // it does not actually change, causes csbforms.validateField to run when a
    // validate method is defined so we disable it once here (validateField
    // resets bStopValidation).
    if (lhField.type=="checkbox") {
      stopValidation(true);
      setCheckBox(lhField,lcValue==lhField.value);
      stopValidation(false);
    }
    else if (lhField.type=="select-one") {
      // find option with value = value - ignore case
      for(var i = 0; i < lhField.options.length; i++ )  { 
        if (lhField.options[i].value.toUpperCase() == lcValue.toUpperCase()) {
          lcValue = lhField.options[i].value;
        }
      }
      eval("lhField.value='" + lcValue + "'");
    }
    else if (lhField.length > 0 && lhField[0].type=="radio") {
      for (var li = 0; li < lhField.length; li++) {
        if (lhField[li].value.toUpperCase()==lcValue.toUpperCase()) {
          lhField[li].checked = true;
          break;
        }
      }
    }
    // Multi-select.
    else if (lhField.length > 0 && lhField[0].type=="checkbox") {
      lcValue = lcValue.toUpperCase();
      var lcMultiValue = lcValue.split(",");

      for (var li = 0; li < lhField.length; li++) {
        lcValue = lhField[li].value.toUpperCase();
        var lbTick = false;
        
        for (var li2 = 0; li2 < lcMultiValue.length; li2++) {
          if (lcMultiValue[li2]==lcValue) {
            lbTick = true;
            break;
          }
        }
        
        stopValidation(true);
        setCheckBox(lhField[li],lbTick);
        stopValidation(false);
      }
    }
    // otherwise the value
    else {
      lhField.value = lcValue;
      if (lhField.value!="") validDType(lhField);
      if (hThisField==lhField) {
        hThisField.select();
      }
    }
  }
  catch(e) {
  }
}

/* Sets all the fields returned which are present, by default where the page
   field name matches the return field name. You can optionally have a
   parameter defining mappings between returned fields and page fields. So in
   general:
   
   setAllReturnFields
    (['returned field A','page field A'
     [,'returned field B','page field B']...]);
*/
function setAllReturnFields() {
  try {
    var lcData = cReturnData.split("&");

    for (var li = 0; li < lcData.length; li++) {
      if (lcData[li]!="") {
        var lcSource = lcData[li].split("=")[0];
        var lcField = lcSource;
        var lbCombo = false;
        var lbEnableOrDisable = false;
        var lbShowOrHide = false;
        
        /* Special options are available as:
        
           <field>ComboOptions - to populate a combo for <field>;
           disable<field> - to enable/disable <field> (only for form fields);
           hide<field> - to show/hide <field>.
        */
        if (lcField.substr(lcField.length - 12)=="ComboOptions") {
          lcField = lcField.substr(0,lcField.length - 12);
          lbCombo = true;
        }
        else if (lcField.substr(0,7)=="disable") {
          lcField = lcField.substr(7);
          lbEnableOrDisable = true;
        }
        else if (lcField.substr(0,4)=="hide") {
          lcField = lcField.substr(4);
          lbShowOrHide = true;
        }

        for (var li2 = 0; li2 < setAllReturnFields.arguments.length; li2 += 2)
        {
          if (setAllReturnFields.arguments[li2]==lcField) {
            lcField = setAllReturnFields.arguments[li2 + 1];
            break;
          }
        }

        if (lbCombo) setReturnCombo(lcField,lcSource);
        /* thisForm not included on hide/show so we can cover non-updateable
           fields, rows, etc.. disableThisField tries appending thisForm when
           not found without anyway. */
        else if (lbShowOrHide)
         disableThisField(lcField,getReturn(lcSource)=="yes","hide");
        else if (eval("thisForm." + lcField)!=undefined) {
          if (lbEnableOrDisable) disableThisField
           ("thisForm." + lcField,getReturn(lcSource)=="yes","disable");
          else setReturnField(lcField,lcSource);
        }
        else if (!lbEnableOrDisable) setReturnData(lcField,lcSource);
      }
    }
    
    return true;
  }
  catch(e) {
    return false;
  }
}

function setCheckBox(phField,pbTick) {
  try {
    var lbDisabled = phField.disabled;
    if (lbDisabled) phField.disabled = false;

    if (isFirefox) {
      /* FF works weirdly with triggering .click() on checkboxes - 
         https://github.com/jquery/jquery/issues/2245. */
      var lbChg = (pbTick!=phField.checked); 
      phField.checked = pbTick;
      if (lbChg && phField.onclick!=null) phField.onclick();
    }
    else {
      /* Reverse set the checkbox and then click it to fire the trigger. */
      phField.checked = !pbTick;
      var lhCurrentField = hThisField;
      phField.click();
      hThisField = lhCurrentField;
    }
    
    if (lbDisabled) phField.disabled = true;

    return true;
  }
  catch(e) {
    return false;
  }
}

function setReturnCheckboxData (pcField, pcSource)
{
  try {
    if (pcSource == undefined) pcSource=pcField;
    var lcValue = getReturn(pcSource);

    var lcSrc = '/coins/' + cWebImgs + '/images/';
    if ("y,yes,1,true".getLookup(lcValue)!=-1) {lcSrc = lcSrc + 'tick.gif';}
    else {lcSrc = lcSrc + 'notick.gif';}

    $('#' + pcField).find('img').prop('src', lcSrc);
  }
  catch(e){
  }
}

function populateCombo(phCombo,pcSource,pcValue) {
  var lhCombo = phCombo;
  
  // populate with the list
  // lcChoices=A,Option A,B,Option B,C,Option C
  lcChoices=pcSource.split(",");

  // reset the combo 
  lhCombo.options.length=0;
  
  for (var i = 0; i < lcChoices.length; i=i+2) {
    lhCombo.options.add(new Option
        (unescape(lcChoices[i+1]),
         unescape(lcChoices[i])));
 
  }
  
  if(pcValue!=undefined)
    lhCombo.value = pcValue;

}

function setReturnCombo(pcField, pcSource, pcValue, pcSep) {
  if (pcSource==undefined) pcSource=pcField;

  // if field not there then ignore
  if (eval("thisForm." + pcField + "==undefined")) return;

  // get the combo handle
  eval("lhCombo=thisForm." + pcField);

  if (!$(lhCombo).is('select')) return;

  // populate with the list
  // lcChoices=A,Option A,B,Option B,C,Option C
  if (pcSep==undefined) pcSep=",";

  lcChoices=getReturn(pcSource).split(pcSep);

  // reset the combo 
  lhCombo.options.length=0;
  
  for (var i = 0; i < lcChoices.length; i=i+2) {
    lhCombo.options.add(new Option
        (unescape(lcChoices[i+1]),
         unescape(lcChoices[i])));
 
  }

  if (pcValue != undefined)
    lhCombo.value = pcValue;
}

function pausecomp(millis) 
{
var date = new Date();
var curDate = null;

do { curDate = new Date(); } 
while(curDate-date < millis);
}

/* ajax Notes */
var hAjaxNotesRequest;

function getNotes(pcIdent,pcName,pcTable) {

                lcSearch=location.search;
                if (lcSearch=="") {
                  lcSearch="?";
                } else {
                  lcSearch=lcSearch + "&";
                }
    lcSearch=lcSearch.setQueryValue("returnPage","");
    lcSearch=lcSearch.setQueryValue("ajaxmethod","syanotes.quickNotes");

    url="wouajax.p" + lcSearch;      

                hAjaxNotesRequest=loadXMLDoc(url);
};

initialiseNotesControl();

function initialiseNotesControl() {
document.write('<div id="notesControl" class="notesControl"'
             + ' style="display:none"'
             + '></div>');
}


function notesFill(pcInput,pcResult) {

  pcResult = 'Hello World';
  notesControl.style.top=y;
  notesControl.style.left=x;
  notesControl.innerHTML=pcResult;
  
  showNotes();
}

function showNotes() {
  notesControl.style.display="";
}
function hideNotes() {
  notesControl.style.display="none";
}

function closeLookup(phWindow,phField) {

  phWindow.close();

  try {
    if (phField.disabled==false) {
      /*if (phField.lookupUsed=='Y') {
        phField.lookupUsed = '';
        phField.stopFocus = 'Y';
      }*/
      if(fieldData[phField.name].lookupUsed) {
        fieldData[phField.name].lookupUsed=false;
        fieldData[phField.name].stopFocus=true;
      }
      else {
        if (phField.type!="textarea") {
          phField.select();
        }
        phField.focus();
      }
      setValueChanged(phField);
    }
  } 
  catch(e) {
  }
}

/* DHTMLX message.js */
if(!window.dhtmlx)
        window.dhtmlx = {};

(function(){
        var _dhx_msg_cfg = null;
        function callback(config, result){
                        var usercall = config.callback;
                        modality(false);
                        if(config.box) {
                          config.box.parentNode.removeChild(config.box);
                          _dhx_msg_cfg = config.box = null;
                        }
                        if (usercall)
                                usercall(result);
        }
        function modal_key(e){
                if (_dhx_msg_cfg){
                        e = e||event;
                        var code = e.which||event.keyCode;
                        if (dhtmlx.message.keyboard){
                                if (code == 13 || code == 32)
                                        callback(_dhx_msg_cfg, true);
                                if (code == 27)
                                        callback(_dhx_msg_cfg, false);
                        }
                        if (e.preventDefault)
                                e.preventDefault();
                        return !(e.cancelBubble = true);
                }
        }
        if (document.attachEvent)
                document.attachEvent("onkeydown", modal_key);
        else
                document.addEventListener("keydown", modal_key, true);
                
        function modality(mode){
                if(!modality.cover){
                        modality.cover = document.createElement("DIV");
                        //necessary for IE only
                        modality.cover.onkeydown = modal_key;
                        modality.cover.className = "dhx_modal_cover";
                        document.body.appendChild(modality.cover);
                }
                var height =  document.body.scrollHeight;
                modality.cover.style.display = mode?"inline-block":"none";
        }

        function button(text, result){
                return "<div class='dhtmlx_popup_button' result='"+result+"' ><div>"+text+"</div></div>";
        }

        function info(text){
                if (!t.area){
                        t.area = document.createElement("DIV");
                        t.area.className = "dhtmlx_message_area";
                        t.area.style[t.position] = t.offset;
                        document.body.appendChild(t.area);
                }

                t.hide(text.id);
                var message = document.createElement("DIV");
                message.innerHTML = "<div>"+text.text+"</div>";
                message.className = "dhtmlx-info dhtmlx-" + text.type;
                message.onclick = function(){
                        callback(text,true);
                        t.hide(text.id);
                        text = null;
                };

                if (t.position == "bottom" && t.area.firstChild)
                        t.area.insertBefore(message,t.area.firstChild);
                else
                        t.area.appendChild(message);
                
                if (text.expire > 0)
                        t.timers[text.id]=window.setTimeout(function(){
                                t.hide(text.id);
                        }, text.expire);

                t.pull[text.id] = message;
                message = null;

                return text.id;
        }
        function _boxStructure(config, ok, cancel){
                var box = document.createElement("DIV");
                box.className = " dhtmlx_modal_box dhtmlx-"+config.type;
                box.setAttribute("dhxbox", 1);
                        
                var inner = '';

                if (config.width)
                        box.style.width = config.width;
                if (config.height)
                        box.style.height = config.height;
                if (config.title)
                        inner+='<div class="dhtmlx_popup_title">'+config.title+'</div>';
                inner+='<div class="dhtmlx_popup_text"><span>'+(config.content?'':config.text)+'</span></div><div  class="dhtmlx_popup_controls">';
                if (ok)
                        inner += button(config.ok || "OK", true);
                if (cancel)
                        inner += button(config.cancel || "Cancel", false);
                if (config.buttons){
                        for (var i=0; i<config.buttons.length; i++)
                                inner += button(config.buttons[i],i);
                }
                inner += '</div>';
                box.innerHTML = inner;

                if (config.content){
                        var node = config.content;
                        if (typeof node == "string") 
                                node = document.getElementById(node);
                        box.childNodes[config.title?1:0].appendChild(node);
                }

                box.onclick = function(e){
                        e = e ||event;
                        var source = e.target || e.srcElement;
                        if (!source.className) source = source.parentNode;
                        if (source.className == "dhtmlx_popup_button"){
                                result = source.getAttribute("result");
                                result = (result == "true")||(result == "false"?false:result);
                                callback(config, result);
                        }
                };
                config.box = box;
                if (ok||cancel)
                        _dhx_msg_cfg = config;

                return box;
        }
        function _createBox(config, ok, cancel){
                var box = config.tagName ? config : _boxStructure(config, ok, cancel);
                
                if (!config.hidden)
                        modality(true);
                document.body.appendChild(box);
                var x = Math.abs(Math.floor(((window.innerWidth||document.documentElement.offsetWidth) - box.offsetWidth)/2));
                var y = Math.abs(Math.floor(((window.innerHeight||document.documentElement.offsetHeight) - box.offsetHeight)/2));
                if (config.position == "top")
                        box.style.top = "-3px";
                else
                        box.style.top = y+'px';
                box.style.left = x+'px';
                //necessary for IE only
                box.onkeydown = modal_key;

                box.focus();
                if (config.hidden)
                        dhtmlx.modalbox.hide(box);

                return box;
        }

        function alertPopup(config){
                return _createBox(config, true, false);
        }
        function confirmPopup(config){
                return _createBox(config, true, true);
        }
        function boxPopup(config){
                return _createBox(config);
        }
        function box_params(text, type, callback){
                if (typeof text != "object"){
                        if (typeof type == "function"){
                                callback = type;
                                type = "";
                        }
                        text = {text:text, type:type, callback:callback };
                }
                return text;
        }
        function params(text, type, expire, id){
                if (typeof text != "object")
                        text = {text:text, type:type, expire:expire, id:id};
                text.id = text.id||t.uid();
                text.expire = text.expire||t.expire;
                return text;
        }
        dhtmlx.alert = function(){
                text = box_params.apply(this, arguments);
                text.type = text.type || "confirm";
                return alertPopup(text);
        };
        dhtmlx.confirm = function(){
                text = box_params.apply(this, arguments);
                text.type = text.type || "alert";
                return confirmPopup(text);
        };
        dhtmlx.modalbox = function(){
                text = box_params.apply(this, arguments);
                text.type = text.type || "alert";
                return boxPopup(text);
        };
        dhtmlx.modalbox.hide = function(node){
                while (node && node.getAttribute && !node.getAttribute("dhxbox"))
                        node = node.parentNode;
                if (node){
                        node.parentNode.removeChild(node);
                        modality(false);
                }
        };
        var t = dhtmlx.message = function(text, type, expire, id){
                text = params.apply(this, arguments);
                text.type = text.type||"info";

                var subtype = text.type.split("-")[0];
                switch (subtype){
                        case "alert":
                                return alertPopup(text);
                        case "confirm":
                                return confirmPopup(text);
                        case "modalbox":
                                return boxPopup(text);
                        default:
                                return info(text);
                        break;
                }
        };

        t.seed = (new Date()).valueOf();
        t.uid = function(){return t.seed++;};
        t.expire = 4000;
        t.keyboard = true;

        t.position = (typeof cSYINFOPOS !== 'undefined') ? cSYINFOPOS.getEntry(0) : "bottom";
        t.offset = (typeof cSYINFOPOS !== 'undefined') ? cSYINFOPOS.getEntry(1) : "5px";

        t.pull = {};
        t.timers = {};

        t.hideAll = function(){
                for (var key in t.pull)
                        t.hide(key);
        };
        t.hide = function(id){
                var obj = t.pull[id];
                if (obj && obj.parentNode){
                        window.setTimeout(function(){
                                obj.parentNode.removeChild(obj);
                                obj = null;
                        },2000);
                        obj.className+=" hidden";
                        
                        if(t.timers[id])
                                window.clearTimeout(t.timers[id]);
                        delete t.pull[id];
                }
        };
})();

/* window view/hide */
var bDocumentVisible=true;
var bDocumentRefresh=false;

  (function() {
    var hidden = "hidden";

    // Standards:
    if (hidden in document)
        document.addEventListener("visibilitychange", onchange);
    else if ((hidden = "mozHidden") in document)
        document.addEventListener("mozvisibilitychange", onchange);
    else if ((hidden = "webkitHidden") in document)
        document.addEventListener("webkitvisibilitychange", onchange);
    else if ((hidden = "msHidden") in document)
        document.addEventListener("msvisibilitychange", onchange);
    // IE 9 and lower:
    else if ('onfocusin' in document)
        document.onfocusin = document.onfocusout = onchange;
    // All others:
    else
        window.onpageshow = window.onpagehide 
            = window.onfocus = window.onblur = onchange;

    function onchange (evt) {
        var v = 'visible', h = 'hidden',
            evtMap = { 
                focus:v, focusin:v, pageshow:v, blur:h, focusout:h, pagehide:h 
            };

        evt = evt || window.event;
        if (evt.type in evtMap)
          lcVisible = evtMap[evt.type];
        else        
          lcVisible = this[hidden] ? "hidden" : "visible";

      bDocumentVisible=((lcVisible=="visible")?true:false);
      
      if(bDocumentVisible&&bDocumentRefresh) {
        location.replace(location.href);
      }

    }
})();


hTimedPageRefresh='';
iTimedPageRefresh=0;

function timedPageRefresh(piSecs) {
  iTimedPageRefresh=piSecs;
  hTimedPageRefresh=window.setTimeout(timedDocumentRefresh,piSecs * 1000);
}
function resetTimedPageRefresh(e) {
  if (iTimedPageRefresh!=0) {
    clearTimeout(hTimedPageRefresh);
    hTimedPageRefresh=window.setTimeout(timedDocumentRefresh,
                                        iTimedPageRefresh * 1000);
  }
}

function timedDocumentRefresh() {
  /* if tab visible then refresh otherwise prime for when it is visble */
  if(bDocumentVisible && hCOINSMain.cFrameState!='minimized') {
    location.replace(location.href);
  } 
  else {
    bDocumentRefresh=true;
  }
}

function toggleReadonly(pcObject) {
  var lhObject=$('input.RO#' + pcObject);
  if(lhObject.length!=0) {
    lhObject.remove();
    lhObject=el$(pcObject);
    lhObject.disabled=false;
  }
  else {
    lhObject=el$(pcObject);
    $(thisForm).append('<INPUT type="hidden" value="' 
                  + lhObject.value + '"'
                  + ' class="RO"'
                  + ' name="' + lhObject.name + '"'
                  + ' id="' + lhObject.name + '"'
                  + '>');
    lhObject.disabled=true;
  }
}

function toggleRow(pcRow) {
  $('#row' + pcRow).toggle();
}

function getTextColour(bgColour) {
  if(bgColour==null)return null;
  var colour = (bgColour.charAt(0) === '#') ? bgColour.substring(1, 7) : bgColour;
  if (colour == 'e54d42' || colour == 'fbac09' || colour == '40b915') return '#ffffff';
  var r = parseInt(colour.substring(0, 2), 16); // hexToR
  var g = parseInt(colour.substring(2, 4), 16); // hexToG
  var b = parseInt(colour.substring(4, 6), 16); // hexToB
  var uicolours = [r / 255, g / 255, b / 255];
  var c = uicolours.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);

  return (L > 0.179) ? '#000000' : '#ffffff';
}
