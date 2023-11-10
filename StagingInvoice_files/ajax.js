/*-
     Program: ajax.js
 Description: AJAX Controller Script
-*/

// global request array and XML document objects
var myrequests = new Array;
var myURLs = new Array;
var myParams = new Array;
var thisAjaxRequest;
var thisAjaxURL;
var thisAjaxParams;

  try {
    hMain=hCOINSMain.document.getElementById('mainarea');
    hMessageWindow=hMain.contentDocument.getElementById('getFrame');
    hMessageWindow=hMessageWindow.contentWindow;
  } catch(e) {
    hMessageWindow=window;
  }

function ajaxGet(pcMethod,pcParam) {
  var lcURL  = "wouajax.p"
             + location.search
             + "&ajaxmethod=" + pcMethod;
  if (pcParam!=""&&pcParam!=undefined) {
    lcURL = setParam(lcURL,pcParam);
    /*lcURL = lcURL + "&" + pcParam;*/
  }
  loadXMLDoc(lcURL);
}
function xmlDecode(pcResult) {
  pcResult = pcResult.replace(/&lt;/gi, '<');
  pcResult = pcResult.replace(/&gt;/gi, '>');
  pcResult = pcResult.replace(/&quot;/gi, '"');
  pcResult = pcResult.replace(/&apos;/gi, "'");
  pcResult = pcResult.replace(/&amp;/gi, '&');
  pcResult = pcResult.replace(new RegExp('&#10;',"gi"), '\n');
  return pcResult;
}
function ajaxAlert(pcInput,pcResult) {
  alert(pcResult);
}
function ajaxWarning(pcInput,pcResult) {
  pcResult = replaceAll(pcResult,"\n","<BR>");
  lcURL = thisAjaxURL;
  lcParams = thisAjaxParams;
  hCOINSMain.coinsConfirm(pcResult,function() {
    lcURL = lcURL.setQueryValue('confirmWarning','true');
    if (lcParams==null) {
      loadXMLDoc(lcURL);
    }
    else {
      loadXMLDoc(lcURL,lcParams);
    }
    return true;
  },
  function() {
    if(pcInput) {
      eval(pcInput);
    }
  });
  return false;
}
function ajaxEval(pcInput,pcResult) {
  eval(pcResult);
}
function ajaxSet(pcInput,pcResult) {
  eval(pcInput + '="' + pcResult + '"');
}
function ajaxRefresh(pcInput,pcResult) {
  location.reload();
}
function ajaxLoad(pcInput,pcResult) {
  location.href=pcResult;
}
function ajaxReplace(pcInput,pcResult) {
  location.replace(pcResult);
}
function ajaxSetURL(pcInput,pcResult) {
  var lcHref=location.href;
  lcHref=setParam(lcHref,pcResult);
  location.replace(lcHref);
}
function ajaxInnerHTML(pcInput,pcResult) {
  var lhObject;
  try {
    lhObject = eval(pcInput);
  } catch(e){}
  if (lhObject != undefined)
    lhObject.innerHTML=pcResult;
}
function ajaxDisableField(pcInput, pcResult) {
  var lbDisable = true;
  if (pcInput.substring(0, 1) == '!') {
    lbDisable = false;
    pcInput = pcInput.substring(1);
  }
  disableThisField(pcResult, lbDisable, pcInput);
}
function ajaxLaunch(pcInput,pcResult) {
  if (pcInput=="") {
    pcInput="_blank";
  }
  window.open(pcResult,pcInput);
}
function ajaxSetValue(pcInput,pcResult) {
  if(pcInput.indexOf('.')==-1 && typeof thisForm=="object")
    eval("lhObject=thisForm." + pcInput);
  else
    eval("lhObject=" + pcInput);
    
  if (lhObject.type=="checkbox") {
    if (pcResult.toLowerCase() == "yes" ||
        pcResult.toLowerCase() == "y") {
      lhObject.checked=true;
    }
    else {
      lhObject.checked=false;
    }
  }
  else {
    try {
      if(codeMirrorObjects[pcInput]) {
        codeMirrorObjects[pcInput].setValue(pcResult)
      }
      else {
        lhObject.value=pcResult;
      }
    } catch(e) {
      lhObject.value=pcResult;
    }
  }
}
function ajaxValidateOK(pcInput,pcResult) {
  pcResult = pcResult;
  validateOK(pcInput,pcResult);
}
function ajaxErrorStatus(pcInput,pcResult) {
  try {
  statusWrite('<IMG src="/coins/' + cWebImgs + '/images/'
            + ((bNewUI)?'error.svg':'error.gif')
            + '"'
            + ' title="' + pcInput + '">'
            + valueEncode(pcResult));}
  catch(e) {}
}
function ajaxErrorStatusAlert(pcInput,pcResult) {
  pcResult = replaceAll(valueEncode(pcResult),"\n","<BR>");
  hCOINSMain.coinsError(pcResult);
}
function ajaxErrorStatusPopup(pcInput,pcResult) {

  if(pcInput.substring(0,7)=="SYAVAL-") {
    var lcMsg = valueEncode(pcResult);
    if(lcMsg.indexOf('\n')!=-1) lcMsg=lcMsg.substring(0,lcMsg.indexOf('\n'));
    if(lcMsg.indexOf('[')!=-1) lcMsg=lcMsg.substring(0,lcMsg.indexOf('['));
    $(input$(pcInput.substring(7)))
      .errorMessage(lcMsg);
  }
  
  if (window.hCOINSMain==undefined) {
    ajaxErrorStatusAlert(pcInput,pcResult);
  } else {
    hMessageWindow.dhtmlx.message.hide(pcInput); 
    hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
    + "/images/"
    + ((bNewUI)?'error.svg':'error.gif')
    + "'>" +valueEncode(pcResult),title:"Error",expire:"0",id:pcInput});
  }
}
function ajaxErrorStatusPopupClear(pcInput,pcResult) {
    hMessageWindow.dhtmlx.message.hide(pcInput); 
}

function ajaxStatusNew(pcInput,pcResult) {
  try {
  statusNew();
  } catch(e) {}
}
function ajaxStatus(pcInput,pcResult) {
  if (pcInput=="alert") pcInput="info";
  try {
  statusWrite('<IMG src="/coins/' + cWebImgs + '/images/' 
            + pcInput 
            + ((bNewUI)?'.svg':'.gif')
            + '">'
            + pcResult);
  }
  catch(e) {}
}
function ajaxStatusAlert(pcInput,pcResult) {
  if (pcInput=="warning") {
    alert(pcResult);
  }
  if (pcInput=="alert") {
    alert(pcResult);
  }
}
function ajaxStatusPopup(pcInput,pcResult) {
  if (pcInput=="warning") {
  hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
  + "/images/"
  + ((bNewUI)?'warning.svg':'warning.gif')
  + "'>"+ pcResult,title:"Warning"});
  }
  if (pcInput=="alert") {
  hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
  + "/images/"
  + ((bNewUI)?'info.svg':'info.gif')
  + "'>" + pcResult,title:"Alert"});
  }
  if (pcInput=="info") {
  hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
  + "/images/"
  + ((bNewUI)?'info.svg':'info.gif')
  + "'>" + pcResult,title:"Info"});
  }

}

// retrieve XML document (reusable generic function);
// parameter is URL string (relative or complete) to
// an .xml file whose Content-Type is a valid XML
// type, such as text/xml; XML source must be from
// same domain as HTML file
function loadXMLDoc(lcURL,parameters) {
  var req;
  if (parameters==undefined) {
    method="GET";
    parameters=null;
  }
  else {
    method="POST";
  }

  myURLs[myrequests.length]=lcURL;
  myParams[myrequests.length]=parameters;
  
    if(typeof preAjax =="function") {
      if(preAjax()==false) return false;
    }

    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        myrequests[myrequests.length] = req;
        req.onreadystatechange = processReqChange;
        req.open(method, lcURL, true);
            /* force a reload */
            req.setRequestHeader
              ("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
            req.setRequestHeader
              ("Content-Type","application/x-www-form-urlencoded");
              
        req.send(parameters);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
        //isIE = true;
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = processReqChange;
             myrequests[myrequests.length] = req;
            req.open(method, lcURL, true);
            /* force a reload */
            req.setRequestHeader
              ("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
            req.setRequestHeader
              ("Content-Type","application/x-www-form-urlencoded");
            req.send(parameters);
        }
    }
  return req;
}

function loadJSON(lcURL,parameters,pcContType) {
  var req;
  if (parameters==undefined) {
    method="GET";
    parameters=null;
  }
  else {
    method="POST";
  }
  
  if (pcContType==undefined) {
     pcContType="application/x-www-form-urlencoded";
  }

  myURLs[myrequests.length]=lcURL;
  myParams[myrequests.length]=parameters;
  
    if(typeof preAjax =="function") {
      if(preAjax()==false) return false;
    }

    // branch for native XMLHttpRequest object
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        myrequests[myrequests.length] = req;
        req.onreadystatechange = processReqChange;
        req.open(method, lcURL, true);
            /* force a reload */
            req.setRequestHeader
              ("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
            req.setRequestHeader
              ("Content-Type",pcContType);
        req.send(parameters);
    // branch for IE/Windows ActiveX version
    } else if (window.ActiveXObject) {
        //isIE = true;
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = processReqChange;
             myrequests[myrequests.length] = req;
            req.open(method, lcURL, true);
            /* force a reload */
            req.setRequestHeader
              ("If-Modified-Since","Sat, 1 Jan 2000 00:00:00 GMT");
            req.setRequestHeader
              ("Content-Type",pcContType);
            req.send(parameters);
        }
    }
    
  return req;
}

function deleteAjaxRequest(phReq) {
  var j;
  for (j=0;j<myrequests.length;j++) {
    req=myrequests[j];
    if (req==phReq) {
      myrequests.splice(j,1);
      myURLs.splice(j,1);
      myParams.splice(j,1);
    }
  }
  delete phReq;
}

// handle onreadystatechange event of req object
function processReqChange () {
  var i;
  var j;
  var k;
  var req;
  // only if req shows "complete"

  for (j=0;j<myrequests.length;j++) {

  req=myrequests[j];
  thisAjaxRequest=j;
  thisAjaxURL=myURLs[j];
  thisAjaxParams=myParams[j];

  if (req.readyState == 4) {

    // only if "OK"
    if (req.status == 200) {

    // delete the request
    myrequests.splice(j,1);
    myURLs.splice(j,1);
    myParams.splice(j,1);

    //alert(req.responseText);
    //alert(req.responseText.substring(req.responseText.indexOf('<div>')))

    // ...processing statements go here...
    if (req.responseXML!=null)
      response  = req.responseXML.documentElement;
      
    if(typeof postAjax =="function") {
      if(postAjax()==false) return false;
    }
    
    ajaxResponse(req.responseXML);

    /* destroy the request */
    delete req;

    }  /* req.status == 200 */
    else {
    /*
      alert("There was a problem retrieving the XML data:\n"
          + req.status + ' ' + req.statusText);
          */
    }  /* else */
  } /* req.readystate == 4*/

  } /* j = */

}

function ajaxResponse(phData) {

    var i;
    if(phData==null) return;
    
    var response  = phData.documentElement;
    
    for (i=0;i<response.getElementsByTagName('method').length;i++) {
      var method='';
      var input='';
      var result='';
      var lhResult;
      method = response.getElementsByTagName('method')[i].firstChild.data;
      if (response.getElementsByTagName('input')[i].firstChild!=null) {
        input  = response.getElementsByTagName('input')[i].firstChild.data;
      }
      else {
        input="";
      }
      /* catch error if no result in XML */
      try {
        lhResult=response.getElementsByTagName('result')[i];
        if (lhResult.firstChild!=null) result = lhResult.firstChild.data;
        if (result==undefined) result = '';

        for (k=0;k<lhResult.childNodes.length;k++) {
          if(lhResult.childNodes[k].firstChild!=null) {
            result = result + lhResult.childNodes[k].firstChild.data;
          }
        }
        result = xmlDecode(result);
      } catch(e) {result=""}

      /* if JSON response then create the object */
      try {
      if (input.substring(0,1)=="{") {
        eval("input=" + input);
      }
      } catch(e) { }

      try {
      if (result.substring(0,1)=="{") {
        eval("result=" + result);
      }
      } catch(e) { }

      eval(method + '(input, result)');

    } /* for (i */

}

/* special function that can be result of an AJAX request to force a relogin */
function forceLogin() {
  lhCOINSMain=window;
    while (lhCOINSMain.COINSMainFrame!=true&&lhCOINSMain!=top) {
      lhCOINSMain=lhCOINSMain.parent;
  }
  try {
    lhCOINSMain.mainarea.location.reload();
  } catch(e) {
    lhCOINSMain.location.reload();
  }
}

function ajaxPost(pcMethod,pcParam,piAttempt) {

  if (piAttempt==undefined) piAttempt=1;
  if (myrequests.length!=0) {
    if (piAttempt>=10) {
      alert(cAjaxRequestsActive);
    }
    else {
      setTimeout('ajaxPost("' + pcMethod + '","' + pcParam
                            + '",' + piAttempt + ')',100);
    }
    return false;
  }

  lcSearch=location.search;
  if (lcSearch=="") {
    lcSearch="?";
  } else {
    lcSearch=lcSearch + "&";
  }
  var lcURL  = "wouajax.p"
           + lcSearch
           + "ajaxmethod="
           + pcMethod;

  if (pcParam!=""&&pcParam!=undefined) {
    var lcPassRowids = pcParam.getQueryValue("passFrameRowids");
    if (lcPassRowids) {
      for (var i = 0; i < lcPassRowids.numEntries(); i++) {
        pcParam = pcParam.setQueryValue("selectedRowids_" + lcPassRowids.getEntry(i),
                                        getFrameSelectedRowids(lcPassRowids.getEntry(i)));

        pcParam = pcParam.setQueryValue("selectedTables_" + lcPassRowids.getEntry(i),
                                        getFrameSelectedTables(lcPassRowids.getEntry(i)));
      }
    }

    lcURL = setParam(lcURL,pcParam);
    /*url = url + "&" + pcParam;*/
  }

  lcFields = "";

  if(typeof thisForm!="undefined") {
    for (var i=0;i<thisForm.elements.length;i++) {

      lcValue = thisForm.elements[i].value;
      if (thisForm.elements[i].type=="checkbox"&&thisForm.elements[i].checked==false) {
        lcValue = "";
      }

      if (thisForm.elements[i].type != "radio"||thisForm.elements[i].checked) {

      if (thisForm.elements[i].name!="" /*&& lcValue!=""*/) {
          if (thisForm.elements[i].disabled==false) {
            lcFields = lcFields + "&" + thisForm.elements[i].name + "="
                     + encodeURIComponent(lcValue);
          }
      }

      }
    }
  }
  lcFields = lcFields.substring(1);
                //alert(lcURL)
                loadXMLDoc(lcURL,lcFields);
}

function getFormValues(phForm) {
  var lcData = '';
  var lcFields='';
  var lcValue='';
  for (var i = 0; i < phForm.elements.length; i++) {
    lhField=phForm.elements[i];
    if(lhField.name=='') continue;
    switch(lhField.type) {
      case "checkbox":
        lcValue = ((lhField.checked)?encodeURIComponent(lhField.value):'');
        break;
      case "radio":
        if(lhField.checked==false) continue;
        lcValue = encodeURIComponent(lhField.value);
        break;
      case "select-multiple":
        for(var j=0;j<lhField.options.length;j++) {
          if(lhField.options[j].selected)
            lcValue=lcValue + ',' + lhField.options[j].value;
        }
        lcValue=lcValue.substring(1);
        break;
      default:
        lcValue = encodeURIComponent(lhField.value);
      break;
    }

    lcFields = lcFields + ',' + lhField.name;
    if(lhField.disabled==true)
      lcValue = '';
      
    lcData = lcData + '&' + lhField.name
           + '='
           + lcValue;
    
  }
  lcFields = lcFields.substring(1);
  if(lcData.indexOf('&inputFields=')==-1)
    lcData = 'inputFields=' + lcFields
         + lcData;
  else
    lcData=lcData.substring(1);
  
  return lcData;
}

function multiupdCheck(phCheckbox) {
  lcID=phCheckbox.id.substring(9);
  lhField=$(phCheckbox).parents('form').find('#' + lcID)[0];
  lhField.disabled=(phCheckbox.checked==false) 
}
