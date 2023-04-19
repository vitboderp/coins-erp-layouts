/*-
     Program: csbforms.js
 Description: OA JavaScript Processing
-*/

var none="none";
var matrixPopupVisible=false;
var blank="";

var isSubmitted = false; 
var bAllowUnload=false;
var bSaveAllowUnload=false;
var bSuppressUndo=false;
var cSaveButton = "";
var cSaveHTML = "";
var cSaveImage = "";
var fieldsSent = false;
/* this VARIABLE IN conjunction WITH the isTimeout FUNCTION, stops the PAGE being submitted repeatedly IF the USERID holds DOWN the RETURN KEY */
var iPause = 0;
var cChartDiv = "";
var cExtraAction = "";
var bQuickData = true;
var bPageOnChange=false;
var hFilterForm$;

function clickBanner(event) {
  var lcHref;
  var e = event;
  if(e.ctrlKey&&e.shiftKey || e.altKey&&e.shiftKey) {
    lcHref=location.href;
    if (lcHref.getQueryValue("COINSInfo") == "true") {
      lcHref=lcHref.setQueryValue("COINSInfo","");
    }
    else {
      lcHref=lcHref.setQueryValue("COINSInfo","true");
    }
    location.replace(lcHref);
  }
  else {
    lcHref=parent.location.href;
    lcHref=lcHref.setQueryValue('pvFrame',
                                     'W,'
                                   + $(window).width()
                                   + ','
                                   + $(window).height());
    parent.location.replace(lcHref);
  }
  return false;
}

function setSaveButton(hButton,cImageFile) {
  try {
    jQuery(document).tooltip('destroy');
  } catch(e) { }
  cSaveButton = hButton.id;
  cSaveHTML = hButton.outerHTML;
  cSaveImage = cImageFile
  setTooltips();
}

function setExtraAction(pcAttr,pcValue) {
  cExtraAction=cExtraAction.setQueryValue(pcAttr,pcValue);
}

function hideSaveButton() {
  var hSaveButton = null;
  hSaveButton = document.getElementById(cSaveButton);
  if (hSaveButton != null) {
    hSaveButton.outerHTML = '<VAR id="' + cSaveButton + '"'
         + ' class="buttonanchor">'
         + '<IMG src="/coins/' + cWebImgs + '/images/' + cSaveImage + '" '
         + 'alt="submitted" border="0" class="button">'
         + '</VAR>';
  }
}

function showSaveButton() {
  var hSaveButton = null;
  hSaveButton = document.getElementById(cSaveButton);
  if (hSaveButton != null) {
    hSaveButton.outerHTML = cSaveHTML;
  }
}

function resetForm() {
  isSubmitted=false;
  stopValidation(false);
  fieldsSent = false;
  iPause = 0;
  showSaveButton();
}
function resetAction() {
  cExtraAction ='';              
  thisForm.action=thisForm.getAttribute('data-action');
  if(thisForm.getAttribute("action")=="")
    $(thisForm).removeAttr("action");
}

function formFieldEnabled(pcField) {
  var lhField = thisForm[pcField];

  if (!lhField)
    return false;

  if ($(lhField).length > 1) {
    for (var i = 0; i < lhField.length; i++) {
      if (lhField[i].disabled == false)
        return true;
    }
  } else {
    return lhField.disabled == false;
  }

  return false;
}

function setInputFields() {
  var lcInputFields=thisForm.inputFields.value;
  var lcFields=lcInputFields.split(',');
  lcInputFields='';
  $(lcFields).each(function() {
    lcInputFields += ',' + (formFieldEnabled(this) ? this : '');
  });
  return lcInputFields.substring(1);
}

function postForm() {
    /* in case there is more than one postFrame we change the name
       and target to match (and then back again) after submitting
       just in case we need them again */
    if (isSubmitted==false) {
    isSubmitted=true;
    hPostFrame=parent.postFrame;
    hPostFrame.name="thisPost";
    thisForm.target="thisPost";
    
    if (thisForm.inputFields != undefined) {
      /* set inputFields based on enabled fields */
      var lcOrigInputFields=thisForm.inputFields.value;
      thisForm.inputFields.value=setInputFields();
    }
    
    /* wait for 1ms for Chrome */
    setTimeout(function() {
      thisForm.submit();
      hideSaveButton();
    }, 1);
    
    /* wait a little longer before restting name */
    setTimeout(function() {
    thisForm.target="postFrame";
    hPostFrame.name="postFrame";
    
    if (thisForm.inputFields != undefined) {
      /* reset inputFields */
      thisForm.inputFields.value=lcOrigInputFields;
    }

    },100);
    
    }
}

function postUploadForm() {
    /* in case there is more than one postFrame we change the name
       and target to match (and then back again) after submitting
       just in case we need them again */
    hPostFrame=parent.postFrame;
    hPostFrame.name="thisPost";
    uploadForm.target="thisPost";
    
    /* wait for 1ms for Chrome */
    setTimeout(function() {
    uploadForm.submit()},1);
    /* wait a little longer before restting name */
    setTimeout(function() {
    uploadForm.target="postFrame";
    hPostFrame.name="postFrame";
    },100);
    
}

function processErrors(pcErrors) {
  var liRow=0,lcRow='';
  
  /* clear all old errors */
  var $errors=parent.getFrame.$('.error');
  if($errors.length!=0)
    $errors.errorMessage();

  if(pcErrors=="")return;
  var lcErrors=pcErrors.split('|');
  
  try {
   for (var i = 0; i < lcErrors.length; i=i+2) {
     if (!lcErrors[i]) continue;

     if(lcErrors[i]=="SY128") {
      lcRow=lcErrors[i + 1];
      lcRow=lcRow.getEntry(1,'<');
      lcRow=lcRow.getEntry(0,'>');
      liRow=parseInt(lcRow);
    }
    if(liRow==0) {
    parent.getFrame.$("[data-errorcodes*='," + lcErrors[i] + ",']")
      .errorMessage(lcErrors[i + 1]);
    }
    else {
    
    var lcID=parent.getFrame.$('table#browseContent a[href="select"] img')
             [liRow - 1].id;

    lcID=lcID.getEntry(parent.getFrame.cSelectedTables
                       .getLookup(parent.getFrame.cBodyTable),';');
    
    parent.getFrame.$("[data-errorcodes*='," + lcErrors[i] + ",']"
                    + "[name^='C" + lcID + "']")
      .errorMessage(lcErrors[i + 1]);
    }
   }
  } catch(e) {}
}

var cChecked="";
var cCheckbox="";

function checkMandatoryFields(phForm) {
  var lForceCheck = false;
  var lcFieldErrors = "";
  var lbBlank = false;
  
  if(phForm==undefined) phForm=document.thisForm;
  
     /* get a list of radio sets which have value set */
    lcRadios="";
    for (var i = 0; i < phForm.elements.length; i++) {
      lhObject = phForm.elements[i];
      if (lhObject.type=="radio"&&lhObject.disabled==false&&lhObject.checked) {
        lcRadios = lcRadios.addToList(lhObject.name);
      }
    }
    
    /* check that there are no combos that have <Select> selected */
    for (var i = 0; i < phForm.elements.length; i++) {
      lhObject = phForm.elements[i];

      try {
        if (lhObject.type=="select-one"&&lhObject.value=="?"
            &&lhObject.disabled==false) {
            lForceCheck = true;
            if (phForm['multiupd_' + lhObject.name] != undefined) {
               if (!phForm['multiupd_' + lhObject.name].checked)
                  lForceCheck = false;
            }
            if (lForceCheck) {
              lcFieldErrors = lcFieldErrors
                     + cAlertSelectCombo + " [" 
                     + getFieldLabel(lhObject) + "]\n";
              $(lhObject).errorMessage(cAlertSelectCombo);
             }
        }

      if (lhObject.classList.contains("disabledchanged")) {
        lcFieldErrors=lcFieldErrors
                     + cAlertSelectLookup.replace("&1",getFieldLabel(lhObject))
                     + "\n";
                     
              $(lhObject)
      .errorMessage(cAlertSelectLookup.replace("&1",getFieldLabel(lhObject)));
      }

      if (lhObject.type=="radio"&&lhObject.disabled==false) {
        if (lcRadios.inList(lhObject.name)==false&&lhObject.checked==false) {
              lcFieldErrors = lcFieldErrors
                     + cAlertSelectRadio + " [" 
                     + getFieldLabel(lhObject) + "]\n";
              $(lhObject).errorMessage(cAlertSelectRadio);
          /* add to the list so we only warn once */
          lcRadios=lcRadios + "," + lhObject.name;
        }
      }

      lbBlank = false;
      if (getFieldMandatory(lhObject)) {
      try {
        if ($(lhObject).parents('.orderedlist').length
            && /Right$/.test(lhObject.id)) {
            if (el$(lhObject.id.replace('Right', '')).value.trim() == "")
              lbBlank = true;
            } else if (lhObject.value.trim()=="") {                          
              lbBlank=true;                                                  
        }
        if (lhObject.getAttribute('dataType')=='DE'
          ||lhObject.getAttribute('dataType')=='IN') {
          if (parseFloat(lhObject.value)==0) {
            lbBlank=true;
          }
        }
      } catch(e) { } 
      }
        
        if (lbBlank&&lhObject.disabled==false&&lhObject.type!="checkbox") {
            lForceCheck = true;
            if (phForm['multiupd_' + lhObject.name] != undefined) {
               if (!phForm['multiupd_' + lhObject.name].checked)
                  lForceCheck = false;
            }
            if (lForceCheck) {
              lcFieldErrors = lcFieldErrors
                     + cAlertMandatoryField + " [" 
                     + getFieldLabel(lhObject) + "]\n";
              $(lhObject).errorMessage(cAlertMandatoryField);
            }
        }
        
        /* check mandatory checkbox for selected */
        if (getFieldMandatory(lhObject)&&lhObject.type=="checkbox") {
          /* if checked add to checked list */
          if (lhObject.checked) {
            cChecked = cChecked.addToList(lhObject.name);
          }
          else {
            cCheckbox = cCheckbox.addToList(lhObject.name);
          }
        }
        
        /* check file uploads have absolute path names */
        /* only IE gives full path name
        if (lhObject.type=="file"&&lhObject.disabled==false) {
          if (lhObject.value.substring(0,1)!="\\"&&
              lhObject.value.substring(1,3)!=":\\"&&
              lhObject.value!="") {
            lcFieldErrors = lcFieldErrors
                          + cRelativePathName
                          + " [" 
                          + getFieldLabel(lhObject) + "]\n";
          }
        }
        */
        
      }
      catch(e) {
      /* not an options field type */
      }
    }

   if (cCheckbox!="") {
        for (i=0;i<cCheckbox.numEntries();i++) {
          if (cChecked.inList(cCheckbox.getEntry(i))) {
            /* OK */
          }
          else {
            /* in list of checkboxes but not checked */
              lcFieldErrors = lcFieldErrors
                     + cAlertMandatoryField + " [" 
                     + getFieldLabel(cCheckbox.getEntry(i)) + "]\n";
              $(lhObject).errorMessage(cAlertMandatoryField);
          }
        }
    }
    
    lcFieldErrors = replaceAll(lcFieldErrors,'\n','<br>');
    
    return lcFieldErrors;
 
}

function submitForm(piAttempt) {
  removeTooltips();
  $('div.errormessage').remove();

  if (piAttempt==undefined) piAttempt=1;
  if (myrequests.length!=0) {
    if (piAttempt>=10) {
      hCOINSMain.coinsError(cAjaxRequestsActive);
    }
    else {
      setTimeout('submitForm(' + piAttempt + ')',100);
    }
    return false;
  }

  cChecked="";
  cCheckbox="";

  if (isSubmitted==false) {
    /* SAVE changes TO ANY HTML FIELDS */
    try{
      if (thisForm.editorFields.value != ""){
        var cEditors = thisForm.editorFields.value.split(',');
        for (var i = 0; i < cEditors.length; i++) {
          lhField=input$(cEditors[i])
          lhField.value=tinyMCE.get(cEditors[i]).getContent();
          /* if data-textfield is set then assign text */
          var lhText=input$($(lhField).data('textfield'));
          if(lhText) lhText.value=$(lhField.value).text();
        }
      }
    } catch(e) { }

    lcFieldErrors=checkMandatoryFields();
    
    if (lcFieldErrors!="") {
      hCOINSMain.coinsError(lcFieldErrors);
      resetForm();
      return false;
    }

    /* execute precommit */
    if(typeof preSubmitForm =="function") {
      if(preSubmitForm()==false) return false;
    }
    
    /* if form contains checkbox which is not selected
       and URL contains the set the URL */
    for (var i = 0; i < document.thisForm.elements.length; i++) {
      lhObject = document.thisForm.elements[i];
        /* check mandatory checkbox for selected */
        if (lhObject.type=="checkbox") {
          /* if checked add to checked list */
          if (lhObject.checked) {
            cChecked = cChecked.addToList(lhObject.name);
          }
          else {
            cCheckbox = cCheckbox.addToList(lhObject.name);
          }
        }
    }

    if(thisForm.getAttribute('data-action')==null)
      thisForm.setAttribute('data-action',thisForm.action);
    
        lcHref=thisForm.action;
        if (lcHref=="") {
          lcHref=location.href;
        }
        for (i=0;i<cCheckbox.numEntries();i++) {
          if (cChecked.inList(cCheckbox.getEntry(i))) {
            /* OK */
          }
          else {
            /* in list of checkboxes but not checked */
            if (lcHref.inQuery(cCheckbox.getEntry(i))) {
              lcHref=lcHref.setQueryValue(cCheckbox.getEntry(i),"");
            }
          }
        }
        
        if (cExtraAction!=''&&thisForm.enctype!="multipart/form-data") {
          lcHref=setParam(lcHref,cExtraAction);
        }

        thisForm.action=lcHref;
    
    /* if the form contains a bulkform ID then we need to upload that first */
    try {
      if (thisForm.bulkform.id!=""&&fieldsSent==false) {
        /* send bulk form value to server */
        lcHref = location.search;
        lcHref= "wouajax.p"
          + lcHref
          + '&field=bulkform'
          + '&ajaxMethod=syasur.bulkform';
        lcHref=lcHref.setQueryValue("txnID",thisForm.txnID.value);
        loadXMLDoc(lcHref,'<?XML?>' + thisForm.bulkform.value);
      }
      else {
        setTimeout(postForm,iPause);
        hideSaveButton();
        iPause = 100;
      }
    }
    catch(e) {
      setTimeout(postForm,iPause);
      iPause = 100;
    }
  }
}

function postBulk(input,result) {
  fieldsSent=true;
  submitForm();
}

function splitThisField(hField) {
            /* break editor up in to 20 * 20000 chunks 
               to allow for encoding to take it */
            liChunk=20000;

              for (i=1;i<=20;i++) {
                liPos=liChunk;
                if (hField.value.length>liPos) {
                  for (liPos=liChunk;liPos>=0;liPos--) {
                    if(hField.value.charCodeAt(liPos)==13) break;
                  }
                }
                hChunk=eval("thisForm." + hField.id + "__" + i);
                hChunk.value=hField.value.substring(0,liPos);
                hField.value=hField.value.substring(liPos + 1);
              }
}

function getFieldLabel (phObject) {

  try {
    lcObject = phObject.name;
    if (lcObject==undefined) lcObject=phObject;
  }
  catch(e) {
    lcObject = phObject;
  }

    lcName="";
    liEntry=el$('inputFields').value.getLookup(lcObject);
    if (liEntry!=-1) {
      lcName = el$('inputLabels').value.getEntry(liEntry,"|");
    }
    
  if (lcName=="") lcName=lcObject;
  return lcName;
}

// Regional Specific Settings
var cDateSep = "/";
var cThousandSep = ",";

function isValidNumber(cVal) {
  var cNum = cVal.replace(new RegExp(cThousandSep,"gi"),"");
  if (isNaN(cNum))
    return false;
  else
    return true;
}

function isValidDate(a) {
        var err=0  
        if (a.length == 0) {
                return true;
        }
        if (a.length != 10) err=1
  
  var dateArray = a.split(cDateSep);
  
        b = a.substring(0, 2)        // day
        c = a.substring(2, 3)        // '/'
        d = a.substring(3, 5)        // month
        e = a.substring(5, 6)        // '/'
        f = a.substring(6, 10)        // year
  if (isNaN(b)) err = 1
  if (isNaN(d)) err = 1
  if (isNaN(f)) err = 1  
  if (d<1 || d>12) err = 1
        if (c != '/') err = 1
        if (b<1 || b>31) err = 1
        if (e != '/') err = 1
        if (f<1500 || f>2138) err = 1
        if (d==4 || d==6 || d==9 || d==11){
          if (b==31) err=1
        }
        if (d==2){
                var g=parseInt(f/4)
                if (isNaN(g)) {
                  err=1
          }
          if (b>29) err=1
                if (b==29 && ((f/4)!=parseInt(f/4))) err=1
        }
        if (err==1) {
                return false;
        }  
        else {
                return true;
        }
}


cQuerySortOrder = location.href.getQueryValue("QuerySortOrder");
function defaultQuerySortOrder(pcSort) {
  if (cQuerySortOrder == "") {
  cQuerySortOrder = pcSort;
  }
}

function searchButton() {
  /* need to keep it encoded as we might have & in the value which 
     then mess up the replacements below 
    lchref = unescape(location.href);  */
      if (stopLoading()) return false;
      
  lchref = location.href;
  lchref = setMatrixValue(lchref);
  lchref = lchref.setQueryValue("Button","action:first");
  if (setRowidsCookie()==false) return false;
  
/*  if(typeof queryFilterName=="object") 
    lchref = lchref.setQueryValue("queryFilterName",
                                  optionText(queryFilterName),true);
                                  */
  /* remove filter name if you change the filter */
  lchref=lchref.setQueryValue('queryFilterName','',true);
  
  if (thisForm.cQueryFilterType.value != "advanced") {
    lchref = lchref.setQueryValue("queryFilterType","simple");
    try {
    lchref = lchref.setQueryValue("queryColumnFilter",
                                 (thisForm.queryColumnFilter.value),
                                 true);
    lchref = lchref.setQueryValue("queryColumnField",
                                 thisForm.queryColumnField.value,
                                 true);
    }
    catch(e) {
    }
  }
  else {
    /* get all the filter* fields and add to the href */
    lcField = "";
    lcValue = "";
    var lcDynamicField="";
    
    filterForm=thisForm;
    if(typeof advancedFilterForm=="object") filterForm=advancedFilterForm;
    
    if(typeof cDynamicFilters=="string") {
      for (var i = 0; i < cDynamicFilters.numEntries(); i++) {
        lcDynamicField=cDynamicFilters.getEntry(i);
        lchref = lchref.setQueryValue("filterMA$$" + lcDynamicField,"");
        lchref = lchref.setQueryValue("filterMA$$" + lcDynamicField,"",true);
        lchref = lchref.setQueryValue("filterGE$$" + lcDynamicField,"");
        lchref = lchref.setQueryValue("filterGE$$" + lcDynamicField,"",true);
        lchref = lchref.setQueryValue("filterLE$$" + lcDynamicField,"");
        lchref = lchref.setQueryValue("filterLE$$" + lcDynamicField,"",true);
      }
    }
    
    for (var i = 0; i < filterForm.elements.length; i++) {
      lhObject = filterForm.elements[i];
      if(lhObject.id.substring(0,7)=="dynamic") {
        if(lhObject.id.substring(0,15)=="dynamicSelector") {
          lcDynamicField = lhObject.value;
        }
        else {
          if(lcDynamicField){
            /* LE,GE,MA */
            var lcType = lhObject.id.substring(12,14);
            lchref = lchref.setQueryValue(
                       "filter" + lcType + "$$" + lcDynamicField,"");
            lchref = lchref + "&" 
                   + "filter" + lcType + "$$" 
                   + lcDynamicField + "=" + escape(lhObject.value);
          }
        }
      }
      else if (lhObject.name!=undefined&&lhObject.name.substring(0,6) == "filter") {

        if (lhObject.name != lcField && lcField != "") {
          lchref=lchref + "&" + lcField + "=" + lcValue.substring(1);
          lcField = "";
          lcValue = "";
        }


        switch (lhObject.type) {
          case "radio" :
            if (lhObject.checked) lchref = lchref.setQueryValue(lhObject.name,lhObject.value);
            break;
          case "checkbox" :
            /* reset the URL for the ID */
            lchref=lchref.setQueryValue(lhObject.name,"");
            if (lhObject.checked) {
              lcValue=lcValue + "," + lhObject.value; 
            }


            lcField=lhObject.name;
            break;
          default: 
            lchref = lchref.setQueryValue(lhObject.name,"");
            lchref = lchref.setQueryValue(lhObject.name,lhObject.value);
            break;
        }
      } 
    }    

        if (lcField != "") {
          lchref=lchref + "&" + lcField + "=" + lcValue.substring(1);
          lcField = "";
          lcValue = "";
        }

    lchref = lchref.setQueryValue("queryFilterType","advanced");
  }
  
  /* add the named filter value if there is one*/
  try {
    if (thisForm.namedFilter[0][0]==null) {
    lchref = lchref.setQueryValue("NamedFilter", thisForm.namedFilter.value);
    }
    else {
      lcNamedFilter="";
      for (var i = 0; i < thisForm.namedFilter.length; i++) {
        lcNamedFilter = lcNamedFilter + "," + thisForm.namedFilter[i].value;
      }
      lcNamedFilter=lcNamedFilter.substring(1);
      lchref=lchref.setQueryValue("NamedFilter",lcNamedFilter);
    }
  }
  catch(e) {
  }
  
  /* add all select bodyselector fields */
  for (var i = 0; i < document.thisForm.elements.length; i++) {
    lhObject = document.thisForm.elements[i];
    if (lhObject.id.substring(0,6)=="select") {
      lchref = lchref.setQueryValue(lhObject.name,lhObject.value,true);
    }
  }
  
  if (applyFilter.value!="") {
    lchref = setParam(lchref,applyFilter.value);
  }
  
  if (applyFilter.getAttribute('data-prog')!=""
      &&
      applyFilter.getAttribute('data-prog')!=null) {
    lchref = lchref.replace("wou005",applyFilter.getAttribute('data-prog'));
  }
  
  lchref=lchref.setQueryValue("Button","action:first");

  var lcPassRowids = lchref.getQueryValue("passFrameRowids");
  if (lcPassRowids) {
    for (var i = 0; i < lcPassRowids.numEntries(); i++) {
      lchref = lchref.setQueryValue("selectedRowids_" + lcPassRowids.getEntry(i),
                                     getFrameSelectedRowids(lcPassRowids.getEntry(i)));

      lchref = lchref.setQueryValue("selectedTables_" + lcPassRowids.getEntry(i),
                                     getFrameSelectedTables(lcPassRowids.getEntry(i)));
    }
  }

  lchref = lchref.replace(/\+/g, "%2B");
  
  /* set filter view to false */
  document.cookie='CSBFILTER' + cMainArea + '=false;path=/';
  
  /* REPLACE rather than LOAD NEW so that BACK goes BACKGROUND TO previous page
  location.href = lchref;
  */

  location.replace(lchref);

  progressAnimation('generate');

}

function chartLink(pcURL,pcTarget) {
  lchref=pcURL
  try {
    lcTarget=pcTarget;
    if (lcTarget=="_blank") {
      window.open(lchref,'_blank',
             "menubar=yes resizable=yes scrollbars=yes");
    }
    else{
      eval(lcTarget + ".location.href=lchref");
    }
  }
  catch(e) {
    lhmainarea=hCOINSMain.mainarea;
    lhmainarea.location.href=lchref;
  }
}

function selectAnchor(phAnchor,piLevel) {
  if(typeof phAnchor=="string")
    lchref=phAnchor;
  else
    lchref=phAnchor.href;
  // if link contains saveTargetAs then display message and return and
  // do not follow the link 
  if(lchref.getQueryValue('saveTargetAs') == 'Y') {
     hCOINSMain.coinsError(cSaveTargetAsMes);
     return;
  }
  try {
    lcTarget=phAnchor.target;
    if (lcTarget=="_blank") {
      window.open(lchref,'_blank');
      /*"menubar=yes resizable=yes scrollbars=yes");*/
    }
    else{
      try {
        if (lcTarget==undefined||lcTarget=="mainarea"||lcTarget=="") {
          /* if middle button then just select the anchor */
          if(iButton==2) return true;
          lhmainarea=hCOINSMain.mainarea;
          if (lhmainarea==undefined) lhmainarea=hCOINSMain;
          /* set pvframe from existing URL */
          lchref=lchref.setQueryValue('pvFrame',
                   lhmainarea.location.href.getQueryValue('pvFrame'));
          lhmainarea.location.href=lchref;
        }
        else {
          eval(lcTarget + ".location.href=lchref");
        }
      }
      catch(e) {
      window.open(lchref,lcTarget);
      }
    }
  }
  catch(e) {
    lhmainarea=hCOINSMain.mainarea;
    if (lhmainarea==undefined) lhmainarea=window;
    lhmainarea.location.href=lchref;
  }
  return false;
}

// URL Parsing functions
var cURLvalue = null;

/* parses and extracts attributes from current URL string */
function getURLValue(cParam) {
  var cReturn = "";

  // Have we parsed the Query string yet?
  if (cURLvalue == null) {
    cURLvalue = new Array();
   
    // Split the search string into an array
    tokens = document.location.search.split("&");
    for (var i = 0; i < tokens.length; i++){
      // Each token should be a single querystring name/value pair
      if (tokens[i] != "") {
        token = tokens[i].split("=");
        
        // First element has ? prefix
        if (i == 0) {
          token[0] = token[0].substring(1);
        }
        
        if (token.length > 1) {
          if (cURLvalue[token[0]] == null)
            cURLvalue[token[0]] = unescape(token[1]);
          else 
            cURLvalue[token[0]] += "," + unescape(token[1]);
        } else {        
          if (cURLvalue[token[0]] == null)
            cURLvalue[token[0]] = "";
        }
      }
    }
  }  
  //  cReturn = cURLvalue[cParam];
  if (cURLvalue != null) {
    if (cURLvalue[cParam] != null) {
      cReturn = cURLvalue[cParam];
    }  
  }
  return cReturn;
}

// Return a single cookie value, retrieved by name
function getCookieValue (pcCookie) {
  var allcookies = document.cookie;  
  var pos = allcookies.indexOf(pcCookie + "=");
  var value = "";
  
  if (pos != -1) {
    var start = pos + pcCookie.length + 1;
    var end = allcookies.indexOf(";", start);
    if (end == -1) end = allcookies.length;
    value = allcookies.substring(start, end);
    value = unescape(value);    
  }
  
  return value;
}

function openNewWindow(phField) {
  if (phField.openFunc == undefined) return false;

  if (phField.openParam == undefined) lcParam=""; else lcParam="&" + phField.openParam; 

  lcHref=location.search;
  lcHref="?" + buildURL(lcHref,"short","");
  lcHref=lcHref.setQueryValue("iframe","");
  lcHref=lcHref.setQueryValue("Button","");
  lcHref=lcHref.setQueryValue("MainArea",phField.openFunc);
  lcHref="wocoins.p" + lcHref + lcParam;

  open(lcHref,"_blank","",replace=false);
}

function getFieldHandle(pcField) {
  eval("lhField=thisForm." + encodeFieldName(pcField));
  return lhField;
}

function openAuditWindow(pcFile,phField,piKco,pcKey) {

  try {

  lcExtent="";
  lcName=phField.name;

  if (lcName == "" || lcName == undefined)
    lcName = phField.id;

  if (lcName.numEntries("__")>=2) lcExtent=lcName.getEntry(1,"__");   
  lcField = lcName.getEntry(0,"__");
  lcField = decodeFieldName(lcField);

  /* handle the syutz.p fields */
  lcField = lcField.replace(/_DTZ_(DATE|TIME)_/, '');

  if (/Right$/.test(lcField)) {
    /* might be an Ordered List field - need to check */
    lcListField = lcField.substr(0, lcField.length - 5); /* field_nameRight -> field_name */
    if (document.getElementById(lcListField))
      lcField = lcListField;
  }

  lcHref="?MainArea=%WSYBSYU&auditFile=" + encodeURIComponent(pcFile);
  lcHref=lcHref.setQueryValue("kco",location.search.getQueryValue("kco"));
  lcHref=lcHref.setQueryValue("noFrameSet","Y");
  lcHref=lcHref.setQueryValue("auditField",lcField);
  lcHref=lcHref.setQueryValue("auditKco",piKco);
  lcHref=lcHref.setQueryValue("auditKey",unescape(pcKey),true);
  
  if (lcExtent!="") {
        lcHref = lcHref.setQueryValue("auditExt",lcExtent);
        lcHref = lcHref.setQueryValue("auditExtDesc","__" + lcExtent);
  }
  else lcHref = lcHref + "&auditExt=&auditExtDesc=";

  lcHref="wou005.p" + lcHref;
  
  open(lcHref,"_blank","width=640 height=480 toolbar=no status=yes resizable=yes scrollbars=yes",replace=false);
  }
  catch (e) { hCOINSMain.coinsError(cNoAuditField) }
}

function clearLookup(phField) {

/*  if (phField.helpFunc == undefined) return false;*/
  if (getFieldHelpFunc(phField) == undefined) return false;
  
  phField.value="";
  
  try {
    deleteAjaxRequest(phField.hAjaxLookupRequest);
  } catch(e) { }
 
  lcFields=getFieldHelpParam(phField).getQueryValue("lookupCode");
  if (lcFields!="") {
    lcField = lcFields.split(",");
    for (var i = 0; i < lcField.length; i++) {
      try {
        eval("if (thisForm." + lcField[i] + "!=null) {" +
            " thisForm." + lcField[i] + ".value='';} " +
            " else if (" + lcField[i] + "!=null) {" +
            " " + lcField[i] + ".innerHTML='';}");
      }
      catch(e) {}
    }
  }

  phField.dispatchEvent(createNewEvent('change'));

  if (phField.onblur!=null) {
    phField.onblur();
  }
  
  if (phField.classList.contains("disabledchanged")) {
/*    if (phField.mandatoryField=="true") {*/
    if (getFieldMandatory(phField)) {
      phField.className="disabled mandatory";
    }
    else {
      phField.className="disabled-lookup";
    }
  }
   
}

function returnLookupField(phAnchor) {

  lcSaveSep="";
  lcHref=location.href;
  // lookupCode/Field can contain , separated values for multiple return values
  /* <A><IMG/></A><INPUT value="Value"><INPUT value="lookupCode"> */
  if(phAnchor.lookupCode) {
    lcValues = phAnchor.lookupCode.split("|");
    lcValue = phAnchor.value;
  }
  else {
    lcValue = phAnchor.nextSibling.value;
    lcValues = phAnchor.nextSibling.nextSibling.value.split('|');
  }

  lcFields = lcHref.getQueryValue("lookupCode").split(",");
  lhOpener=hCOINSMain.opener;
  
  lcName=lcHref.getQueryValue("lookupField");
  if(lcName.substring(0,9)=="thisForm.") lcName=lcName.substring(9);
  if(lcName.substring(0,19)=="advancedFilterForm.") lcName=lcName.substring(19);
  if(lcName.indexOf("form.")!=-1) 
    lcName = lcName.substring(lcName.indexOf("form.") + 5);
  
  // set the value of the lookup field
  try {
  if(lcName.substring(0,12)=="dynamicField") {
    lhField=lhOpener.el$(lcName);
  } else {
    eval("lhField=lhOpener." +  lcHref.getQueryValue("lookupField"));
  }
  
    lhLookupField=lhField;
    lcID = getFieldID(lhField);
    
        /*lcSep=lhField.helpParam.getQueryValue("multiLookup");*/
        lcSep=lhOpener.fieldData[lcID].helpParam;
        if (lcSep) lcSep=lcSep.getQueryValue("multiLookup");
        
        if(lcSep==null||lcSep==undefined) lcSep='';
        lcSaveSep=lcSep;
        
        if (lcSep!="" && lhField.value != "*") {
          if (lhField.value=="") {
            lhField.value=lcValue;
          }
          else {
            /* don't add the separator if the value already ends with it */
            if (lhField.value.substring(lhField.value.length - 1)==lcSep) {
              lhField.value=lhField.value + lcValue;
            } else {
              lhField.value=lhField.value + lcSep + lcValue;
            }
          }
        }
        /*
        else if (lhField.type=="textarea") {
          lhField.value=lhField.value + lcValue;
        }
        */
        else {
          lhField.value=lcValue;
        }
        
        
  if (lhField.className.substring(0,8) == 'disabled') {
    lhField.setAttribute('data-lookup-orig', lhField.value);
  }

  if (lhField.className=="disabledchanged") {
    if (getFieldMandatory(lhField)) {
      lhField.className="disabled mandatory";
    }
    else {
      lhField.className="disabled-lookup";
    }
  }
  
/*
  eval("lhOpener." + lcHref.getQueryValue("lookupField") + '.value="' + phAnchor.value + '"');*/

  }
  catch(e) {
  }

  // now set the values of return field(s) 
  for (var i = 0; i < lcFields.length; i++) {
    if (lcFields[i] != "" && lcValues[i]!=undefined) {
      // try a form field 
      try {
      
        eval("lhField=lhOpener."
          + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
          + lcFields[i] );

        if(lhField.length!=undefined&&lhField[0].type=="radio") {

          liRadio=lhField.length;
          for (j=0;j<liRadio;j++) {
            lhRadio=lhField[j];
            if (lhRadio.value==lcValues[i]) {
              lhRadio.checked=true;
            }
          }
        
        }
        else if (lhField.type=="checkbox") {
          
           // if (lcValues[i]=="yes") {
           if (lcValues[i].toLowerCase() == "yes" || 
               lcValues[i].toLowerCase() == "y") {
              lbChecked=true;
           }
           else {
              lbChecked=false;
           }
        
           lhField.checked=lbChecked;
             
        }
        
        /*
        if (eval("lhOpener."
          + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
          + lcFields[i] + '.length')!=undefined && eval("lhOpener."   
          + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
          + lcFields[i] + '[0].type')=="radio") {
          
          liRadio=eval("lhOpener."   
          + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
          + lcFields[i] + ".length");
          for (j=0;j<liRadio;j++) {
            lhRadio=eval("lhOpener."
          + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
          + lcFields[i] + '[' + j + "]")
            if (lhRadio.value==lcValues[i]) {
              lhRadio.checked=true;
            }
          }
          
        }
        */
        /*
        else if (eval('lhOpener.'
          + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
          + lcFields[i] + '.type')=="checkbox") {
          
           // if (lcValues[i]=="yes") {
           if (lcValues[i].toLowerCase() == "yes" || 
               lcValues[i].toLowerCase() == "y") {
              lcChecked="true";
           }
           else {
              lcChecked="false";
           }
        
           eval("lhOpener."   
             + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
             + lcFields[i] + '.checked=' + lcChecked);
             
        }
        */
        else {

          /*
          eval("lhField=lhOpener."   
            + lcHref.getQueryValue("lookupField").getEntry(0,".") + "."
            + lcFields[i]);
            */

          lcSep=lcSaveSep;  

          /* we use "?" to mean leave the existing value so do not set */
          if (lcValues[i] != "?") {
            if (lcSep!="") {
              if (lhField.value=="") {
                lhField.value=unescape(lcValues[i]);
              }
              else {
                lhField.value=lhField.value + lcSep + lcValues[i];
              }
            }
            else {
              lhField.value=unescape(lcValues[i]);
            }
          }
          
        }
        lbField=true;
      }
      catch (e) {
        lbField=false;
      }
      if(lbField==false) 
      try {
      // try an id field 
        eval("lhOpener."   
          + lcFields[i] + '.innerHTML=unescape("' + lcValues[i] + '")');
      }
      catch (e) {
      }
    }
  }
  

/*
  if (lhLookupField.helpParam.toLowerCase().getQueryValue("novalidation")=='y')  {
    lhLookupField.lookupUsed='Y';       // can be used in onchange()
  }
  */
  
  if (lhOpener.fieldData[lcName].noValidation==true) {
    lhOpener.fieldData[lcName].lookupUsed=true;
  }

  lhLookupField.dispatchEvent(lhOpener.createNewEvent('change'));

  /* switch on validation again */
  lhOpener.stopValidation(false);

  /*
  TPA 10/10/11 - amended BY DAS 30/11/11

  This CODE has been changed quite a lot because OF problems
    WITH validation ON FIELDS WITH lookups
  Previously IF the LOOKUP opened IN a NEW WINDOW - the validation    
    was fired twice.
  Tim fixed this BY NOT firing onBlur.
  
  However, this meant that IF the LOOKUP opens IN a NEW tab the validation
    does NOT fire AT ALL.
    
  So we have changed the CODE TO DO onblur. 
  But we DO NOT SET FOCUS BACK to the field
  
  This IS NOT entirely perfect AS the FOCUS stays ON the LOOKUP button
  but IS certainly better than the validation NOT firing
  potentially longer TERM we will re-work lookups TO USE an inline FRAME.
  */
  
  /* ensure the validate is not blocked by last button pressed */
  lhOpener.hEvent=null;
 
  if (lhLookupField.onblur!=null) {
    lhOpener.lookupFieldBlur(lhLookupField);
  }
  lhOpener.closeLookup(hCOINSMain,lhField);
  
}

function lookupFieldBlur(phField) {
    fieldData[getFieldID(phField)].origValue = null;
    phField.onblur();
}

function orderedList(phList,pcSide) {

        lcID = phList.id;
        lcID = lcID.substring(lcID.length - 6);
        lhRight=undefined;
        if (lcID=="Source") {
          lcID = phList.id;
          lcID = lcID.substring(0,lcID.length - 6) + pcSide;
          eval('lhRight=parent.getFrame.thisForm.' + lcID);
        }
        return lhRight;

}

function setSelectionListValue(phField,pcValue) {
  phField.value = pcValue;
  /* clear right list */
  lhLeft=el$(phField.id + 'Left');
  lhRight=el$(phField.id + 'Right');
  lhRight.innerHTML='';
  
  if(pcValue=="") return;
  
  lcValues = pcValue.split(',');
  for (var i = 0; i < lcValues.length; i++) {
    lhOption=$(lhLeft).find("[value='" + lcValues[i] + "']")[0];
    if(lhOption) {
    lhRight[lhRight.length] 
      = new Option(lhOption.text, 
                   lhOption.value, true, true );
    lhOption.outerHTML='';
    }
  }
}

function buildSelectionList(phList,pcList,pcData) {

        var lcData=pcData.split('|');
        
        // remember existing value
        lcValue=phList.value;

        // if ordered list then get value of right list 
        lhRight=orderedList(phList,"Right");
        lbOrderedList=(lhRight!=undefined);
        if (lbOrderedList) {
          // store the value of the right list then clear it 
          lcValue=getListValue(lhRight);
          lhRight.options.length=0;
          lcOrderedList = new Array();
        }
        
        /* see if value is in the new list */
        liPos = ("&" + pcList).indexOf("&" + lcValue + "=");
        /* if value is not in new list then set the value to "?" for <select> */
        if (liPos==-1&&lbOrderedList==false) {
          lcValue = "?";
          lcSelect = "&lt;" + cSelectText + "&gt;";
        }
        else if (lcValue=="?") {
          lcSelect = phList.options[0].text;
        }
        
        var lcList='';
        if (lcValue=="?") {
          lcList=lcList
                + '<option value="?">'
                + lcSelect
                + '</option>';
        }

        if (pcList == null) {
        }
        else
        {
            lcChoices = pcList.split("&");
            for (var i = 0; i < lcChoices.length; i++){
            
              // Each choice should be a single querystring name/value pair
              if (lcChoices[i] != "") {
                 lcChoice = lcChoices[i].split("=");

                 // if this is an orderedlist and the value is selected
                 // then add to right list
                 if (lbOrderedList&&lcValue.inList(unescape(lcChoice[0]))) {
                   lcOrderedList[unescape(lcChoice[0])] 
                     = unescape(lcChoice[1]);
                 }
                 else {
                   lcList = lcList
                          + '<option value="'
                          + unescape(lcChoice[0])
                          + '"'
                          + ((pcData)?' data-data="' + lcData[i] + '"':'')
                          + '>'
                          + unescape(lcChoice[1])
                          + '</option>';
                 }
              }  
            }                
        }

        phList.innerHTML='';
        lcList =           phList.outerHTML.substring(0,
                                     phList.outerHTML.indexOf('</select>'))
               + lcList + '</select>';
        phList.outerHTML=lcList;
        
        if (lbOrderedList) {
            lcChoices = lcValue.split(",");
            for (var i = 0; i < lcChoices.length; i++) {
              if (lcOrderedList[lcChoices[i]]!=undefined) {
                 lhRight.options.add(new Option
                     (lcOrderedList[lcChoices[i]],
                      lcChoices[i]));
              }
            }
          // set the value in to the posting value field 
          parent.getFrame.listFieldValue(lhRight);
          // refresh the filtered list   
          parent.getFrame.refreshList(
            phList.id.substring(0,phList.id.length - 6));
        }
        else {
          phList.value = lcValue;
        }
        
}

function fillFields(pcForm,pcFieldList,pcValues) {

   // fill fields in pcFieldList in the form pcForm with values from pcValure
   // e.g. fillFields("top.opener.InputForm","a,b,c","a=1&b=2&c=3")

   lcValues = "?" + pcValues;
        lcField = pcFieldList.split(",");
        if (pcForm == "") {
                lcForm = "";
        }
        else {
                lcForm = pcForm + ".";
        }
    for (var i = 0; i < lcField.length; i++) {
                // Each choice should be a single querystring name/value pair
                if (lcField[i] != "") {
                        if (eval(lcForm + lcField[i]) != null) {
            eval(lcForm + lcField[i] 
                 + '.innerText=unescape(lcValues.getQueryValue("' 
                 + lcField[i] + '"))');
         }
      }  
        }        
}

function fillForm(pcForm,pcFieldList,pcValues) {

   // fill fields in pcFieldList in the form pcForm with values from pcValue
   // e.g. fillFields("top.opener.InputForm","a,b,c","a=1&b=2&c=3")

        lcValues = "?" + pcValues;
        lcField = pcFieldList.split(",");
        lcForm = pcForm + ".";
        for (var i = 0; i < lcField.length; i++) {
                // Each choice should be a single querystring name/value pair
                if (lcField[i] != "") {
                        if (eval(lcForm + lcField[i]) != null) {
                                eval(lcForm + lcField[i] 
                                               + '.value=unescape(lcValues.getQueryValue("' 
                                               + lcField[i] + '"))');
                         }
                         else if(eval(lcField[i]) != null) {
                                        eval(lcField[i] 
                                                 + '.innerHTML=unescape(lcValues.getQueryValue("' 
                                                 + lcField[i] + '"))');                                 
                         }
                      }  
        }        
}

function openWebsite(pcURL) {
        if (pcURL == "") {
                hCOINSMain.coinsError(cAlertNoWebsite);
        }
        else
        {
                open("http://" + pcURL,"_blank","",replace=false);
        }
}


// enable and disable fields 
cEnableForm="";
cEnableFieldList="";
bFieldEnabled = new Array();
function setFieldList(pcForm,pcFields) {
        cEnableFieldList=pcFields;
        if (pcForm == "") {
                cEnableForm = "";
        }
        else
        {
                cEnableForm = pcForm + ".";
        }
}
function setDefaultEnabled() {
        lcField=cEnableFieldList.split(",");
        for (var i=0;i<lcField.length;i++) {
                try{ /* davsch: it is neccesary for this function not to error: if the field has already been hidden then 
                                                 eval(cEnableForm + lcField[i] + ".disabled") is not an object*/
                        bFieldEnabled[i]=(eval(cEnableForm + lcField[i] + ".disabled")==false);
                }
                catch(e){}
        }
}
function enableFields() {
        lcField=cEnableFieldList.split(",");
        for (var i=0;i<lcField.length;i++) {
                if (bFieldEnabled[i]==true) {
                        eval(cEnableForm + lcField[i] + ".disabled=false");
                }
        }
}
function disableFields(pcForm,pcFields) {
        lcField=cEnableFieldList.split(",");
        for (var i=0;i<lcField.length;i++) {
                if (bFieldEnabled[i]==true) {
                        eval(cEnableForm + lcField[i] + ".disabled=true");
                }
        }
}

function checkWarning(cMessage){
        return confirm(cMessage + "\n" + cContinueQuestion);
}

cSelectedRowids="";

function showSelectedRows(pcRowids) {

  setFreezeOverflow();

    cSelectedRowids=pcRowids;
    for (var i=0;i<document.images.length;i++) {
      lhImg=document.images[i];
      if (lhImg.parentNode.tagName=="A"
          &&lhImg.parentNode.parentNode.className.substring(0,6)=="select") {
        if (document.images[i].name==""||
            document.images[i].name.substring(0,1)==";") {
          document.images[i].src="/coins/" + cWebImgs + "/images/"
                                + ((bNewUI)?'blank.svg':'blank.gif');
          rowImageSelect(lhImg,false);
        }
        else if (cSelectedRowids.inList(document.images[i].name)) {
          lhImg.src="/coins/" + cWebImgs + "/images/"
                   + ((bNewUI)?'selected.svg':'selected.gif');
          rowImageSelect(lhImg,true);
        }
        else {
          document.images[i].src="/coins/" + cWebImgs + "/images/"
                   + ((bNewUI)?'unselected.svg':'unselected.gif');
          rowImageSelect(lhImg,false);
        }
      }
    }
    if(cSelectedRowids.length>=7500) {
      hCOINSMain.consError(cTooManyRowids);
    }

}
function showFilterSelected(pcRowids) {

  if (bNewUI) {
    var liRows=((pcRowids=="")?0:pcRowids.numEntries(','));
    $('#numberselected').html(liRows);
  }
  try {
  hButton=$('#filterSelected');
  lcValue=hButton[0].title;
  if(lcValue=='') lcValue=hButton.data('data-title');
  hButton.data('data-title',lcValue);
  
  lcValue=lcValue.split('/');
  if (pcRowids=="") {
  lcValue[0]=lcValue[0] + " (0)";
  }
  else {     
  lcValue[0]=lcValue[0] + " (" + pcRowids.numEntries(",") + ")";
  }
  
  lcValue[1]=lcValue[1] + ' (' + hButton.data('colsets') + ')';
  
  hButton.tooltip({content:lcValue[0] 
                + ((parseInt(hButton.data('colsets'))==0)?
                    '':'<BR>' + lcValue[1] + ' ' 
                        + el$('currentcolset').innerText
                  )});
  }
  catch(e) {
  }
  
  try {
    if (cSelectedRowids=="") {
      el$('selectAction').disabled=true;
    }
    else
    {
      el$('selectAction').disabled=false;
    }
  }
  catch(e) {
  }
  
}

function rowImageSelect(phImage,pbSelect) {
  /* image is within <A> and <TD> */
  lhTD=phImage.parentNode.parentNode;
  lhTR=lhTD.parentNode;

  if(lhTR.parentNode.parentNode.id!="browseContent") {
    /* freeze columns - find/highlight right table */
    lhRightTR
      = $('#rightScrollTable').find('tr')[lhTR.rowIndex];

    if (pbSelect) {
    
      if(bNewUI) {
        $(lhRightTR).addClass('selected');
      }
      else {
        lhTD.className="selected";
        lcClass=lhRightTR.className;
        if(lcClass.substring(lcClass.length - 8)!='selected') {
          lhRightTR.className=lcClass + "selected";
        }
      }
    }
    else {
      if(bNewUI) {
        $(lhRightTR).removeClass('selected');
      }
      else {
        lhTD.className="select";
        lcClass=lhRightTR.className;
        if(lcClass.substring(lcClass.length - 8)=='selected') {
          lhRightTR.className=lcClass.substring(0,lcClass.length - 8);
        }
      }
    }
      
  }

  if (pbSelect) {
    lhTD.className="selected";
    if(bNewUI) {
      $(lhTR).addClass('selected');
    }
    else {
      lcClass=lhTR.className;
      if(lcClass.substring(lcClass.length - 8)!='selected') {
        lhTR.className=lcClass + "selected";
      }
    }
  }
  else {
    lhTD.className="select";
    if(bNewUI) {
      $(lhTR).removeClass('selected');
    }
    else {
      lcClass=lhTR.className;
      if(lcClass.substring(lcClass.length - 8)=='selected') {
        lhTR.className=lcClass.substring(0,lcClass.length - 8);
      }
    }
  }
}

function selectRow(phObject) {
  if (phObject.name=="") return;
  if (phObject.name.substring(0,1)==";") return;
  
  if (isIE) {
    bCtrlKey=window.event.ctrlKey;
    bAltKey=window.event.altKey;
    bShiftKey=window.event.shiftKey;
  }
  
  if (bCtrlKey||bAltKey) {
    if (cSelectedRowids.inList(phObject.name)) {
      cSelectedRowids=cSelectedRowids.deleteFromList(phObject.name);
    }
    else {
      cSelectedRowids=cSelectedRowids.addToList(phObject.name);
    }
    if (phObject.src.indexOf("/coins/" + cWebImgs + "/images/selected.")!=-1) {
      phObject.src="/coins/" + cWebImgs + "/images/"
                  + ((bNewUI)?'unselected.svg':'unselected.gif');
      rowImageSelect(phObject,false);
    }
    else {
      phObject.src="/coins/" + cWebImgs + "/images/"
                  + ((bNewUI)?'selected.svg':'selected.gif');
      rowImageSelect(phObject,true);
    }
  }
  else if (bShiftKey) {
    /* do a query to the ctrlframe */
    lcHref=location.href;
    if (setRowidsCookie()==false) return false;
    /*lcHref=lcHref.setQueryValue("selectedRowids",cSelectedRowids);*/
    lcHref=lcHref.setQueryValue("selectedTables",cSelectedTables);
    lcHref=lcHref.setQueryValue("selectToRowid",phObject.name);
    lcHref=lcHref.setQueryValue("Button","");
    parent.postFrame.location.replace(lcHref);
  }
  else {

    lcOld=cSelectedRowids;
    /* unselect the old row(s) */
    for (var i=0;i<document.images.length;i++) {
      if (document.images[i].src.indexOf("/coins/" + cWebImgs + "/images/selected.") != -1) {
        lhImg=document.images[i];
        lhImg.src="/coins/" + cWebImgs + "/images/"
                 + ((bNewUI)?'unselected.svg':'unselected.gif');
        rowImageSelect(lhImg,false);
      }
    }
    
    /* select the new row */
    cSelectedRowids=phObject.name;
    /* if we just selected the same record then unselect it */
    if (cSelectedRowids == lcOld) {
      cSelectedRowids="";
      try {                                    
        eval('deselectRowHook(phObject)');     
      } catch(e) {                             
      }                                        
    }
    else {
      phObject.src="/coins/" + cWebImgs + "/images/"
                  + ((bNewUI)?'selected.svg':'selected.gif');
      rowImageSelect(phObject,true);
      try {                              
        eval('selectRowHook(phObject)'); 
      } catch(e) {                       
      }                                  
    }
  }
  showFilterSelected(cSelectedRowids);

  if (!bShiftKey && typeof afterRowsSelected == "function")
    afterRowsSelected(cSelectedTables, cSelectedRowids);
}
function dblSelectRow(phObject) {
    if (phObject.name=="") return;
    /* unselect the old row(s) */
    for (var i=0;i<document.images.length;i++) {
      if (document.images[i].src.indexOf("/coins/" + cWebImgs + "/images/selected.") != -1) 
        document.images[i].src="/coins/" + cWebImgs + "/images/"
                              +((bNewUI)?'unselected.svg':'unselected.gif');
    }


    /* select the new row */
    cSelectedRowids=phObject.name;
    phObject.src="/coins/" + cWebImgs + "/images/"
                + ((bNewUI)?'selected.svg':'selected.gif');

    if (window.event.ctrlKey||window.event.altKey) {
      lcHref = location.href.setQueryValue("Button","action:prev");
      if (setRowidsCookie()==false) return false;
      /*lcHref = lcHref.setQueryValue("selectedRowids",cSelectedRowids);*/
      lcHref = lcHref.setQueryValue("selectedAll",'false');
      lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
      lcHref = lcHref.setQueryValue("lastRowid",cSelectedRowids);
    }
    else {
      lcHref = location.href.setQueryValue("Button","action:next");
      if (setRowidsCookie()==false) return false;
      /*lcHref = lcHref.setQueryValue("selectedRowids",cSelectedRowids);*/
      lcHref = lcHref.setQueryValue("selectedAll",'false');
      lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
      lcHref = lcHref.setQueryValue("firstRowid",cSelectedRowids);
    }
    if (bQuickData) {
      lcHref=lcHref.setQueryValue('getAjaxData','Y');
      setAjaxDataBusy();
      progressAnimation('generate');
      loadXMLDoc(lcHref);
    }
    else {
      location.replace(lcHref);
    }

}

function undoPage() {
  if(bSuppressUndo==true) {
    bSuppressUndo=false;
    return;
  }
  
  if(bAllowUnload==true 
    || $('button[href="save"]').is(':visible') == false
    || confirm(cSureUndo)) {
    bAllowUnload=true;
    if(location.href.getQueryValue("returnPage")!="") {
      lcHref=location.href.getQueryValue("returnPage");
      location.href=lcHref;
    }    
    else if(location.href.getQueryValue("docPage")!="") {
      lcHref=location.href.getQueryValue("docPage");
      location.href=lcHref;
    }
    else if (location.href.getQueryValue("dialog") == "Y" &&
             location.href.getQueryValue("standardUndo") !== "yes") {
      getCOINSTop().desktopDialogClose();
    }
    else if (history.length==0) {
      location.reload();
    }
    else if(location.href.getQueryValue("returnBack")=="Y") {
      history.back();
    }
    else if(location.href.getQueryValue("Button")!="") {
      lcHref=location.href.setQueryValue("returnPage","");
      lcHref=lcHref.setQueryValue("preAdd","");
      var lcPreAddFields = lcHref.getQueryValue("preAddFields");
      for (var i = 0; i < lcPreAddFields.numEntries(); i++) {
        lcHref = lcHref.setQueryValue(lcPreAddFields.getEntry(i), "");
      }
      lcHref=lcHref.setQueryValue("preAddFields","");
      lcHref=lcHref.setQueryValue("Button","");
      lcHref=lcHref.setQueryValue("bulkmaint","");
      location.replace(lcHref);
    }
    else {
      history.back();
    }
  }
  return false;
}

function selectThisMerge(phObject) {
  if (phObject.disabled||phObject.value=="") {
    return true;
  }
// if no selected rowids then do all 
//  if (cSelectedRowids=="") {
//    return true;
//  }
  lcHref=location.href;  
  /* don't need to set selectedRowids as this is already set and stored
     by using the cookie */
  /*lcHref=lcHref.setQueryValue("selectedRowids",cSelectedRowids);*/
  lcHref=lcHref.setQueryValue("selectedTables",cSelectedTables);
  lcHref=lcHref.setQueryValue("selectMerge",phObject.value);
  /* open new window containing the merged file */
  window.open(lcHref,"_blank","");
  lcHref=location.href;
  /*lcHref=lcHref.setQueryValue("selectedRowids",cSelectedRowids);*/
  lcHref=lcHref.setQueryValue("selectedTables",cSelectedTables);
  lcHref=lcHref.setQueryValue("selectedFilter","false");
  lcHref=lcHref.setQueryValue("Button","");
  /* refresh the list in the current window */
  location.replace(lcHref);
}

var cNextActionTarget="";
var cNextActionHref="";
var cNextActionLabel="";
var bNextActionLoad=true;

/* function to check that selectedRowids are in the current query */
function checkRowids(pcTarget,pcHref,pbLoad,pcPostCheck) {

    /* prime loadSelectNextActionPage for confirmation 
       that the selected ROWIDs are all correct */
    cNextActionTarget=pcTarget;
    cNextActionHref=pcHref;
    bNextActionLoad=pbLoad;
    
    /* call the selectRowids check */
    lcHref=location.href;
    lcHref=lcHref.setQueryValue("Button","action:checkRowids");
    if (pcPostCheck==undefined) {
      lcHref = lcHref.setQueryValue("postCheckRowids","");
    }
    else {
      lcHref = lcHref.setQueryValue("postCheckRowids",pcPostCheck);
    }
    parent.validateFrame.location.href=lcHref;

}

function selectNextAction(phObject,pcMsg) {

  cNextActionTarget="";
  cNextActionHref="";
  cNextActionLabel="";

  if (phObject.disabled||phObject.value=="") {
    return true;
  }
  if (typeof phObject.selectedIndex != "undefined" &&
      phObject.selectedIndex != null) {
     if (phObject[phObject.selectedIndex].text.substr(0, 5) == "-----") {
       return true;
     } else {
       cNextActionLabel = phObject[phObject.selectedIndex].text;
     }
  }
  lcType=phObject.value.getEntry(0,":");  
  lcMainArea=phObject.value.getEntry(1,":");  
  lcParam=(phObject.value + "::").getEntry(2,":");
  lcMsg = pcMsg;
  if (lcMsg==undefined) lcMsg="";
  
  lcTarget=lcParam.getQueryValue("target");
  if (lcParam==undefined) lcParam="";
  
  liSelected=cSelectedRowids.numEntries();
  
  if (lcParam.getQueryValue("singleRow")=="Y"&&liSelected!=1) {
    hCOINSMain.coinsError(cAlertSelectOneRow);
    return false;
  }

  var lcPassRowids = lcParam.getQueryValue("passFrameRowids");
  if (lcPassRowids) {
    for (var i = 0; i < lcPassRowids.numEntries(); i++) {
      lcParam = lcParam.setQueryValue("selectedRowids_" + lcPassRowids.getEntry(i),
                                      getFrameSelectedRowids(lcPassRowids.getEntry(i)));

      lcParam = lcParam.setQueryValue("selectedTables_" + lcPassRowids.getEntry(i),
                                      getFrameSelectedTables(lcPassRowids.getEntry(i)));
    }
  }

  cNextActionTarget="";
  cNextActionHref="";
  
  if (lcType=="post") {
  
    /* set a field containing selectedRowids */
    lcButton = phObject.value;
    lcButton = lcButton.setEntry(2,'',':');
    lcButton = lcButton.substring(0,lcButton.length - 1);

    if (setRowidsCookie()==false) return false;
    lcHref = location.href;
    lcHref = lcHref.setQueryValue("stn_code","");
    lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
    lcHref = lcHref.setQueryValue("Button",lcButton);
    lcHref = lcHref.setQueryValue("defaultAction",lcMainArea);
    if (lcParam!="") {
      lcHref = setParam(lcHref,lcParam);
      /* lcHref=lcHref + "&" + unescape(lcParam);*/
    }
    
    lcHref = lcHref.setQueryValue("selectedRowids","");

    if (lcMsg=="") {
     thisForm.action=lcHref;
     /* and submit the form */
     postForm();
    }
    else {
     hCOINSMain.coinsConfirm(lcMsg,function(){
      thisForm.action=lcHref;
      /* and submit the form */
      postForm();
     });
    }
  }
  else {
    if (setRowidsCookie()==false) return false;
    
    lcCOINSMainArea = hCOINSMain.mainarea.getFrame.location.href;
    lcCOINSMainArea = lcCOINSMainArea.getQueryValue('MainArea');
    
    lcHref = location.href;
    lcHref = lcHref.setQueryValue("button","");
    lcHref = lcHref.setQueryValue("stn_code","");
    lcHref = lcHref.setQueryValue("initContainer","");
    lcHref = lcHref.setQueryValue("initFunction","");
    lcHref = lcHref.setQueryValue("initTab","");
    lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
    /* set the selectRowids for this current page */
    lcHref = lcHref.setQueryValue("RowidsMainArea",cMainArea);
    lcHref = lcHref.setQueryValue("MainArea",lcMainArea);
    lcHref = lcHref.setQueryValue("defaultAction",lcMainArea);
    lcHref = lcHref.setQueryValue("COINSMainArea",lcCOINSMainArea);
    lcHref = lcHref.replace("wou005","woframe");
    if (lcParam!="") {
      lcHref = setParam(lcHref,lcParam);
      /*lcHref=lcHref + "&" + unescape(lcParam);*/
    }
    lcHref=lcHref.setQueryValue("iframe","");
    lcHref = lcHref.setQueryValue("selectedRowids","");
    lcHref = lcHref.setQueryValue("pvFrame","");
    lcHref = lcHref + hCOINSMain.addFrameURL();
    
    /* prime loadSelectNextActionPage for confirmation 
       that the selected ROWIDs are all correct */
    cNextActionTarget=lcTarget;
    cNextActionHref=lcHref;
    
    hideSaveButton();

    /* call the selectRowids check */
    lcHref=location.href;
    lcHref=lcHref.setQueryValue("Button","action:checkRowids");
    parent.validateFrame.location.href=lcHref;
    /*
    if (lcTarget=="") {
    hCOINSMain.mainarea.location.href=lcHref;
    }
    else {
    window.open(lcHref,lcTarget,"menubar=yes resizable=yes scrollbars=yes");
    }
    */
  }
}

function loadDeletePage() {
  cSelectedRowids=getDeleteRowids(cSelectedRowids);
  if (setRowidsCookie()==false) return false;
  replacePage(cNextActionTarget,cNextActionHref,bNextActionLoad);
}
function loadReplacePage() {
  if (setRowidsCookie()==false) return false;
  replacePage(cNextActionTarget,cNextActionHref,bNextActionLoad);
}
function loadLocationPage() {
  if (setRowidsCookie()==false) return false;
  locationPage(cNextActionTarget,cNextActionHref,bNextActionLoad);
}
function loadAjaxDetail() {
  if (setRowidsCookie()==false) return false;
          lcHref=cNextActionHref;
          lcHref=lcHref.setQueryValue('getAjaxData','Y');
          setAjaxDataBusy();
          loadXMLDoc(lcHref);
}
function loadAjaxOpen() {
  if (setRowidsCookie()==false) return false;
          lcHref=cNextActionHref;
          lcHref=lcHref.setQueryValue('getAjaxData','Y');
          lcHref=lcHref.setQueryValue('bBodyUpdateAdd',bBodyUpdateAdd);
          setAjaxDataBusy();
          loadXMLDoc(lcHref);
}

function locationPage(pcTarget,lcHref,pbLoad) {
          /* try to replace the target if fails then use current */
          try {
            /* if target not defined then throw error now before 
               we change the lcHref */
            eval("hCOINSMain." + pcTarget + ".location.href");
            if (pcTarget=="mainarea"||pcTarget=="") {
              lcHref = lcHref.replace("wou005","woframe");
            }
            if (pbLoad) {
              lcHref=lcHref.setQueryValue("iframe","");
              lcHref=lcHref.setQueryValue("target",pcTarget);
              eval("hCOINSMain." + pcTarget 
                 + ".location.href=lcHref");
            }
            else {
              lcHref=lcHref.setQueryValue("iframe","");
              lcHref=lcHref.setQueryValue("target",pcTarget);
              eval("hCOINSMain." + pcTarget 
                 + ".location.replace(lcHref)");
            }
          }
          catch(e) {
            /* if we are going to be inline then we don't want a 
               return page */
            /*lcHref=lcHref.setQueryValue("returnPage","");*/
            if (pbLoad) {               
              location.href=lcHref;
            }
            else {
              location.replace(lcHref);
            }
          }
 
}

function loadSelectNextActionPage () {
  if (cNextActionHref!="") {
    if (setRowidsCookie()==false) return false;
    if (cNextActionTarget=="") {
    hCOINSMain.mainarea.location.href=cNextActionHref;
    }
    else if (cNextActionTarget == '_dialog') {
      hCOINSMain.desktopDialog(cNextActionLabel, cNextActionHref, executeReload);
    }
    else {
    window.open(cNextActionHref,cNextActionTarget,
                "menubar=yes resizable=yes scrollbars=yes");
    }
    showSaveButton();
  }
}

bSelectedAll=false;
function selectedAll() {
  if (stopLoading()) return false;
  lcHref = location.href;
  lcHref=setMatrixValue(lcHref);
  lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
  lcHref = lcHref.setQueryValue("Button","");
  
  if (bSelectedAll) {
    setButtonBusy('showAll',oPalette.text);
    lcHref = lcHref.setQueryValue("selectedAll","false");
    location.replace(lcHref);
  }
  else {
      setButtonBusy('showAll');
      lcHref = lcHref.setQueryValue("selectedAll","true");
      location.replace(lcHref);
  }
}

bSelectedSum=false;
function selectedSum() {
  if (stopLoading()) return false;
  lcHref = location.href;
  lcHref=setMatrixValue(lcHref);
  lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
  lcHref = lcHref.setQueryValue("Button","");
  if (bSelectedSum) {
    setButtonBusy('total',oPalette.text);
    lcHref = lcHref.setQueryValue("selectedSum","false");
  }
  else {
    setButtonBusy('total');
    lcHref = lcHref.setQueryValue("selectedSum","true");
  }
  location.replace(lcHref);
}

function browseSelectedTotals(pcTables, pcRowids, pcTotalField, pcField, pcFormat, phCallback) {
  $('#' + pcTotalField).text('...');

  var lcURL = 'wouajax.p?ajaxMethod=syaseltotal.calcTotal'
    + '&selectedTables=' + pcTables
    + '&selectedRowids=' + pcRowids
    + '&totalField=' + pcTotalField
    + '&field=' + pcField;

  if (pcFormat)
    lcURL = lcURL.setQueryValue('format', pcFormat);

  $.ajax({
    type: "get",
    url: lcURL,
    error: function(pcText) {
      console.log('AJAX Failure - browseSelectedTotals',pcText);
    },
    success: function(pcText) {
      ajaxResponse(pcText);
      if (typeof phCallback == 'function')
        phCallback();
    }
  });
}

function browseSettings() {
  if(el$('leftScrollTable')) {
    lhRows = el$('leftScrollTable').children[0].children;
  } else {
    lhRows=el$('browseContent').children[0].children;
  }
  var i=0;
  var liRows=0;
  for(i=0;i<lhRows.length;i++) {
    if(lhRows[i].className.substring(0,3)=="odd" 
       || 
       lhRows[i].className.substring(0,4)=="even") {
      liRows = liRows + 1;
    }
  }

  var lcLink,lhLink;
  lhLink=el$('queryEditor');
  if(lhLink)lcLink=lhLink.innerHTML;
  
  lcHTML='<div title="' + cPreferences + '"><br>'
        + cRows + ':'
        + '<input type="text" id="browseRows" size="4"'
        + ' value="' + liRows + '"'
        + ' onFocus="hThisField=this"'
        + '>'
        + lcLink
        + '</div>';
  $(lcHTML).dialog({modal:true,
  open: function () {
    el$('browseRows').select();
    el$('browseRows').focus();
  },
  close: function () {
    $(this).remove();//have do destroy dynamic element
  },
  buttons:[
   {text:cReset,
    click:function(){ 
     lcURL='MainArea=' + cMainArea;
     ajaxPost('syasur.resetRows',lcURL);
        jQuery(this).dialog("close");
    }
   },
   {text:cOK,
    id: "action:save",
    class: "buttonanchor",
    click:function(){ 
     lcURL='MainArea=' + cMainArea
          + '&browseRows=' + el$('browseRows').value;
     ajaxPost('syasur.setRows',lcURL);
        jQuery(this).dialog("close");
    }
   },
   {text:cCancel,
    click:function(){ 
        jQuery(this).dialog("close");
    }
   }
  ]
  });
 
}

bSelectedFilter=false;
function selectedFilter() {
 
  if ((bShiftKey && bCtrlKey
      ||
      bShiftKey && bAltKey) && bNewUI==false) {
    browseSettings();
  }
  else if (bShiftKey) {
    /* do a query to the ctrlframe */
    lcHref=location.href;
    lcHref=lcHref.setQueryValue("selectedTables",cSelectedTables);
    lcHref=lcHref.setQueryValue("selectToRowid","*");
    lcHref=lcHref.setQueryValue("selectedRowids","");
    lcHref=lcHref.setQueryValue("Button","");
    lcHref=lcHref + "&selectedRowids=";
    parent.postFrame.location.replace(lcHref);
  } 
  else if (cSelectedRowids==""&&bSelectedFilter==false) {
    hCOINSMain.coinsError(cAlertSelectRow);
  }
  else {
  if (setRowidsCookie()==false) return false;
  /*lcHref = location.href.setQueryValue("selectedRowids",cSelectedRowids,true);
  */
  lcHref = location.href;
  lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
  lcHref = lcHref.setQueryValue("Button","");
  if (bSelectedFilter) {
    lcHref = lcHref.setQueryValue("selectedFilter","false");
  }
  else {
    lcHref = lcHref.setQueryValue("selectedFilter","true");
  }
  location.replace(lcHref);
  }
}

function replacePage(pcTarget,lcHref,pbLoad) {

          /* try to replace the target if fails then use current */
          try {
            /* if target not defined then throw error now before 
               we change the lcHref */
            eval("hCOINSMain." + pcTarget + ".location.href");
            if (pcTarget=="mainarea") {
              lcHref = lcHref.replace("wou005","woframe");
              var lcFrame
                = hCOINSMain.mainarea.location.href.getQueryValue('pvFrame');
              lcHref = lcHref.setQueryValue('pvFrame',lcFrame);
            }
            if (pbLoad) {
              lcHref=lcHref.setQueryValue("iframe","");
              lcHref=lcHref.setQueryValue("target",pcTarget);
              eval("hCOINSMain." + pcTarget 
                 + ".location.href=lcHref");
            }
            else {
              lcHref=lcHref.setQueryValue("iframe","");
              lcHref=lcHref.setQueryValue("target",pcTarget);
              eval("hCOINSMain." + pcTarget 
                 + ".location.replace(lcHref)");
            }
          }
          catch(e) {
            /* if we are going to be inline then we don't want a 
               return page */
            lcHref=lcHref.setQueryValue("returnPage","");
            if (pbLoad) {
              location.href=lcHref;
            }
            else {
              location.replace(lcHref);
            }
          }
          
}

function selectActionRow(phObject) {
  if (stopLoading()) return false;
  
  lcHref = location.href.setQueryValue("Button",phObject.id);
  
    if (location.href.getQueryValue("Button")=="action:all") {
      lcHref = lcHref.setQueryValue("firstRowid",phObject.id.getEntry(2,":"));
    }
    else if (phObject.parentNode.dataset.ajaxAppended == 'true') {
      /* This row was appended at the end by AJAX Add ignoring the sort,
         so need to reposition the browse before open / detail */
      lcHref = lcHref.setQueryValue("firstRowid",phObject.id.getEntry(2,":"));
    }
    else {
      lcHref = lcHref.setQueryValue("firstRowid",eval("firstRowid_thisBrowse"));
    }

/*  try {
*
*     lcReturnPage = hCOINSMain.mainarea.location.href;
*      lcHeaderRowids = location.href.getQueryValue('headerRowids');
*      if (lcHeaderRowids!='') {
*        lcReturnPage 
*          = lcReturnPage.setQueryValue("headerRowids",lcHeaderRowids);
*      }
*
*  } catch(e) {
*      lcReturnPage = location.href;
*  }
*  lcReturnPage = lcReturnPage.setQueryValue("stn_code",'');
*  lcReturnPage = lcReturnPage.setQueryValue("returnPage",'');
*  lcReturnPage = lcReturnPage.setQueryValue('button','');
*  
*      lcHref = lcHref.setQueryValue("returnPage",lcReturnPage);*/
  
      if (phObject.id.getEntry(1,":") == "delete") {
       hCOINSMain.coinsConfirm(cDeleteConfirmation,function() {
        if (setRowidsCookie()==false) return false;
        lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
        parent.postFrame.location.replace(lcHref);
       });
      }
      else {
      
        if (phObject.id.getEntry(1,":") == "open") {
          /* set the opened record as current */
          cSelectedRowids=phObject.id.getEntry(2,":");
          if (setRowidsCookie()==false) return false;
        }
      
        if (phObject.id.getEntry(3,":") == "ajax") {
          lcHref = lcHref.setQueryValue("returnPage",'');
          lcHref=lcHref.setQueryValue('getAjaxData','Y');
          lcHref=lcHref.setQueryValue('bBodyUpdateAdd',bBodyUpdateAdd);
          setAjaxDataBusy();
          loadXMLDoc(lcHref);
        }
        else if (phObject.id.getEntry(3,":") == "load") {
          replacePage(phObject.value,lcHref,true);
        }
        else {
          replacePage(phObject.value,lcHref);
        }
      }
}

function stripFilters(pcURL) {
  pcURL=pcURL.setQueryValue('queryFilterType','');
  pcURL=pcURL.setQueryValue('queryColumnFilter','');
  pcURL=pcURL.setQueryValue('queryColumnField','');
  return pcURL;
}

function stripCVRParams(pcURL) {
  pcURL=pcURL.setQueryValue('cv_mviewRowid','');
  pcURL=pcURL.setQueryValue('cmv_view','');
  return pcURL;
}
function actionToggleBulk(phButton) {
  var lcText=oPalette.text;
  thisForm.bulkmaint.click();
  if(thisForm.bulkmaint.checked) {
    if(phButton.children.length>0) 
      phButton.children[0].src=getSVGURL('bulk$',lcText);
    $(phButton).addClass('selected');
  }
  else {
    if(phButton.children.length>0) 
      phButton.children[0].src=getSVGURL('bulk','');
    $(phButton).removeClass('selected');
  }
}

function actionRow(phObject) {

  try {
    lbBulkMaint=thisForm.bulkmaint.checked;
  }
  catch(e) {
    lbBulkMaint=false;
  }
  
  try {
    lcAction=phObject.id.getEntry(1,':');
    if (cSelectedRowids == ""&&lbBulkMaint==false&&lcAction!="concurrent") {
      hCOINSMain.coinsError(cAlertSelectRow);
    }
    else {
      if (lbBulkMaint==true) {
      if('insert,multi'.inList(phObject.id.getEntry(1,':'))) {
        hCOINSMain.coinsError(cBulkMaintOnly);
        return false;
      }
      lcHref = location.href.setQueryValue("Button","action:" + phObject.id.getEntry(1,":") + ":");
      }
      else if (phObject.id.getEntry(1,":")=="delete") {
      lcHref = location.href.setQueryValue("Button","action:" + phObject.id.getEntry(1,":"));
      lcHref=lcHref.setQueryValue('selectedRowids','');
      }
      else if (lcAction=="concurrent") {
      lcHref = location.href.setQueryValue("Button","action:concurrent"); 
      }
      else {

    if (isIE==false||IEVer>=8) {
      liLimit=4048;
    }
    else {
      liLimit = 2000;
    }
      
      if (cSelectedRowids.length>liLimit) {
        hCOINSMain.coinsError(cTooManyRowids);
        return false;
      }
      lcHref = location.href.setQueryValue("Button","action:" + phObject.id.getEntry(1,":") + ":" + cSelectedRowids);
      }

      if (location.href.getQueryValue("Button")=="action:all") {
       lcHref = lcHref.setQueryValue("firstRowid",
                         eval("cSelectedRowids.getEntry(0)")); 
      }
      else {
      lcHref = lcHref.setQueryValue("firstRowid",eval("firstRowid_thisBrowse"));
      }
      
      try {
      if (setRowidsCookie()==false) return false;
      /*
      lcHref = lcHref.setQueryValue("selectedRowids",cSelectedRowids);
      */
      lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
      lcReturnPage = hCOINSMain.mainarea.location.href;
      lcReturnPage=lcReturnPage.setQueryValue("stn_code","");
      lcReturnPage=stripFilters(lcReturnPage);
      lcReturnPage=stripCVRParams(lcReturnPage);
      lcReturnPage=lcReturnPage('Button','');
      lcHeaderRowids = location.href.getQueryValue('headerRowids');
      if (lcHeaderRowids!='') {
        lcReturnPage 
          = lcReturnPage.setQueryValue("headerRowids",lcHeaderRowids);
      }
      lcHref = lcHref.setQueryValue("returnPage",lcReturnPage);
      }
      catch(e) {
      }

      liSelected=cSelectedRowids.numEntries();
      
     if (phObject.id.getEntry(1,":")=="detail"&&bSingleDetail) {
        if (liSelected != 1) {
          hCOINSMain.coinsError(cAlertSelectOneRow);
          return;
        }
      }
      
      if (phObject.id.getEntry(1,":") == "delete") {
        liSelected=cSelectedRowids.numEntries();
        if (setRowidsCookie()==false) return false;
        /*
        lcHref=lcHref.setQueryValue("selectedRowids",cSelectedRowids);
        */
        lcHref=lcHref.setQueryValue("selectedTables",cSelectedTables);

        if (liSelected == 1) {
          hCOINSMain.coinsConfirm(cDeleteConfirmation,function() {
            /* check rowids first
            parent.postFrame.location.replace(lcHref);*/
            checkRowids("postFrame",lcHref,true,"loadDeletePage");
          });
        }
        else {
          hCOINSMain.coinsConfirm(
            cMultiDeleteConfirmation.replace("&1",liSelected),
            function() {
            /* check rowids first 
            parent.postFrame.location.replace(lcHref);*/
            checkRowids("postFrame",lcHref,true,"loadDeletePage");
          });
        }
      }
      else if ("open,copy,multi,insert".inList(phObject.id.getEntry(1,":"))&&lbBulkMaint) {
        try {
          lcHref = lcHref.setQueryValue("bulkmaint",thisForm.bulkmaint.checked);
        }
        catch(e) {
        }
        
          if (phObject.id.getEntry(3,":") == "load") {
            /* check rowids first 
            location.href=lcHref;*/
            checkRowids("",lcHref,true,"loadLocationPage");
          }
          else {
            /* check rowids first 
            replacePage(phObject.target,lcHref);*/
            checkRowids(phObject.target,lcHref,false,"loadReplacePage");
          }
      }
      else if ("moveup,movedown".inList(phObject.id.getEntry(1,":"))) {
            location.replace(lcHref);
      }
      else if ("open,copy,insert".inList(phObject.id.getEntry(1,":"))) {
        if (phObject.id.getEntry(1,":")=="copy") {
          try {
            if (phObject.preCopy=="N") {
                lcHref=lcHref.setQueryValue("preAdd","true");
            }
          } catch(e) { } 
        }
        if (liSelected != 1) {
          hCOINSMain.coinsError(cAlertSelectOneRow );
        }
        else {
          if (phObject.id.getEntry(3,":") == "load") {
            /* if this is an inline frame then we don't want a return page */
            if (lcHref.getQueryValue("iframe")=="true") {
              lcHref=lcHref.setQueryValue("returnPage","");
            }
            if ("copy,insert".inList(phObject.id.getEntry(1,":"))) {
              /* don't want returnPage for copy or insert */
              lcHref=lcHref.setQueryValue("returnPage","");
            }
            /* use checkrowids first
            location.href=lcHref;
            */
            lcTarget=phObject.value;
            if (lcTarget==undefined) lcTarget = "";
            checkRowids(lcTarget,lcHref,true,"loadLocationPage");
          }
          else if (phObject.id.getEntry(3,":") == "ajax") {
            checkRowids("",lcHref,true,"loadAjaxOpen");
          }
          else {
            if ("copy,insert".inList(phObject.id.getEntry(1,":"))) {
              /* don't want returnPage for copy or insert */
              lcHref=lcHref.setQueryValue("returnPage","");
            
    /*
    add all the addtype fields to the URL
    e.g.
    lcHref = lcHref.setQueryValue("addtypeXXX",thisForm.addtypeXXX.value);
    */
    /*for (var i = 0; i < document.all.length; i++) {
      lhObject = document.all[i];*/
    for (var i = 0; i < thisForm.elements.length; i++) {
      lhObject = thisForm.elements[i];
      try {
        if (lhObject.name.substring(0,7) == "addtype") {
          lcHref=lcHref.setQueryValue(lhObject.name,lhObject.value);
      }
      } catch(e) { }
    }
            
              /* check rowids first 
              replacePage(phObject.target,lcHref,true);*/
              checkRowids("",lcHref,true,"loadReplacePage");
            }
            else {
              /* check rowids first 
              replacePage(phObject.target,lcHref);*/
              checkRowids("",lcHref,false,"loadReplacePage");
            }
          }
        }
      }
      else {

          if (phObject.id.getEntry(3,":") == "ajax") {
            checkRowids("",lcHref,true,"loadAjaxDetail");
          }
          
          else if (phObject.id.getEntry(3,":") == "load") {
            /* if this is an inline frame then we don't want a return page */
            if (lcHref.getQueryValue("iframe")=="true") {
              lcHref=lcHref.setQueryValue("returnPage","");
            }
            /* check rowids first
            location.href=lcHref;*/
            checkRowids("",lcHref,true,"loadLocationPage");
          }
          else {
            /* check rowids first 
            replacePage(phObject.target,lcHref);*/
            checkRowids("",lcHref,false,"loadReplacePage");
          }
      }
    }
  }
  catch (e) {
  }
  
}

function setRowidsCookie() {
  lcSelectedRowids = cSelectedRowids.replace(RegExp(";","g"),"/");
  if (lcSelectedRowids.length > 16000) {
    hCOINSMain.coinsError(cTooManyRowids);
    return false;
  }
  else {
  /* split in to 4K chunks to send in a cookie */
  if (lcSelectedRowids.length <= 4000) {
    document.cookie = "selectedRowids=" + lcSelectedRowids + ";path=/";
  }
  else {
    document.cookie = "selectedRowids=;path=/";
    for (var i = 0; i < lcSelectedRowids.length; i=i+4000) {
      var lcChunk=lcSelectedRowids.substring(i,i + 4000);
      var lcName='selectedRowidsChunk' + (i / 4000);
      document.cookie = lcName
                     + "=" + lcChunk + ";path=/";
    }
  }
  }  
}
                                               
function stopLoading() {
  if (window.document.readyState=="loading") {
    if (confirm(cDocumentStillLoading)) {
      return false;
    }
    else {return true};
  }
  return false;
}

function setMatrixValue(lcHref) {
  /* add on the matrix selection - if not used then will catch error */
  try {
    lcHref = lcHref.setQueryValue("matrixSelect",thisForm.matrixSelect.value);
    lcHref = lcHref.setQueryValue("matrixValue",thisForm.matrixValue.value);
  }
  catch(e) {
  }
  return lcHref;
}

function actionPage(phObject,pbIgnoreLoadWarning) {

  if(pbIgnoreLoadWarning==undefined) pbIgnoreLoadWarning = false;

  if(phObject.value) {
    lcValue = phObject.value;
  }
  else {
    lcValue = getElementValue(phObject,'value');
  }

  /* if image is insensitive then don't action */
  try {
    cImg=phObject.children[0].src;
    if (cImg.substring(cImg.length - 6).substring(0,3)=="_i.") return;
  } catch(e) { } 
  
  if (pbIgnoreLoadWarning==false && stopLoading()) return false;
  
  if (phObject.id=='formsave') {
    if (thisForm.formDefaultName.value=="") {
      hCOINSMain.coinsError(cFormDefaultName);
    } else {
      cExtraAction=cExtraAction.setQueryValue('Button','action:formsave');
      this.submitForm();
    }
    return false;
  }
  
  if (phObject.id=='reload') {
    lcHref = location.href;
    lcHref=setMatrixValue(lcHref);
    lcHref = lcHref.setQueryValue("elementAction","");
    lcHref = lcHref.setQueryValue("matrixAction","");
    lcAction=lcHref.getQueryValue("Button") + ":";
    lcAction=lcAction.getEntry(1,":");
    if("moveup,movedown,delete,add,insert,copy".inList(lcAction)) {
      lcHref = lcHref.setQueryValue("Button","");
    }
    
    if(bQuickData) {
    
    lcFirst=document.getElementById('first').children[0].src;
    if (lcFirst.substring(lcFirst.length - 6)=="_i.svg") {
    lcHref = lcHref.setQueryValue("firstRowid","");
    lcHref = lcHref.setQueryValue("Button","action:first");
    }
    else {
    lcHref = lcHref.setQueryValue("firstRowid",eval("firstRowid_thisBrowse"));
    lcHref = lcHref.setQueryValue("Button","action:next");
    }
    lcHref=lcHref.setQueryValue('getAjaxData','Y');
    setAjaxDataBusy();
    progressAnimation('generate');
    loadXMLDoc(lcHref);
    }
    else {
    location.replace(lcHref);
    }
    return;
  }

  lcHref = location.href.setQueryValue("Button","action:" + phObject.id);
  lcHref = lcHref.setQueryValue("selectedRowids","");
  lcHref = lcHref.setQueryValue("elementAction","");
  lcHref = lcHref.setQueryValue("matrixAction","");
  lcHref = lcHref.setQueryValue("viewAs","");
  
  if (phObject.id=="matrixAction") {
    lcHref = lcHref.setQueryValue("matrixActions","");
  }

  /* selectedRowids can be very long which breaks the 2K limit on the URL
     so put it in a cookie which is deleted as soon as it is read server
     side */
  if (setRowidsCookie()==false) return false;
  
  lcHref = lcHref.setQueryValue("selectedTables",cSelectedTables);
  lcHref=setMatrixValue(lcHref);
  
  try {
    if (phObject.id == "next") {
      lcHref = lcHref.setQueryValue("firstRowid",eval("lastRowid_thisBrowse"));
    }
    else if (phObject.id == "prev") {
      lcHref = lcHref.setQueryValue("lastRowid",eval("firstRowid_thisBrowse"));
    }
    else if (phObject.id == "first") {
      lcHref = lcHref.setQueryValue("firstRowid","");
      lcHref = lcHref.setQueryValue("lastRowid","");
    }
    else if (phObject.id == "last") {
      lcHref = lcHref.setQueryValue("firstRowid","");
      lcHref = lcHref.setQueryValue("lastRowid","");
    }
    else if (phObject.id == "undo") {
    
      if(bAllowUnload==false 
        && $('button[href="save"]').is(':visible') == true
        && confirm(cSureUndo)==false) return false;
      
      bAllowUnload=true;
      lcHref = lcHref.setQueryValue("selectedFilter","false");
      lcHref = lcHref.setQueryValue("returnPage","");

      if ("add,copy,insert".inList(cCommand)) {
        lcHref = lcHref.setQueryValue("Button","action:prev");
        /*
        lcHref = lcHref.setQueryValue("returnPage",
                                      hCOINSMain.mainarea.location.href);*/
      }
      else {
        lcHref = lcHref.setQueryValue("Button","");
      }
      
      lcHref = lcHref.setQueryValue("bulkmaint","");
    }
    else if (phObject.id == "left") {
      lcHref = lcHref.setQueryValue("gridoffset",eval("cLeftOffset"));
      lcHref = lcHref.setQueryValue("firstRowid",firstRowid_thisBrowse);
    }
    else if (phObject.id == "right") {
      lcHref = lcHref.setQueryValue("gridoffset",eval("cRightOffset"));
      lcHref = lcHref.setQueryValue("firstRowid",firstRowid_thisBrowse);
    }
    else if (phObject.id == "goto") {
      lcHref = lcHref.setQueryValue("gridoffset",lcValue);
      lcHref = lcHref.setQueryValue("firstRowid",firstRowid_thisBrowse);
    }
    else if (phObject.id == "gridSort") {
      lcHref = lcHref.setQueryValue("gridSort",lcValue);
    }
    else if (phObject.id == "viewAs") {
      lcHref = lcHref + "&viewAs=" + lcValue;
    }
    else if ("add,copy,insert".inList(phObject.id)) {
      lcReturnPage=hCOINSMain.mainarea.location.href;
      /* remove init container and tab from the return Page */
      lcReturnPage=lcReturnPage.setQueryValue("initContainer","");
      lcReturnPage=lcReturnPage.setQueryValue("initTab","");
      lcReturnPage=lcReturnPage.setQueryValue("stn_code","");
      lcReturnPage=lcReturnPage.setQueryValue("returnPage","");
       
        if (location.href.getQueryValue("iframe")=="true") {
          lcHref = lcHref.setQueryValue("returnPage",lcReturnPage);
        }
        else {
          lcHref = lcHref.setQueryValue("returnPage","");
        }
        
    }
    
  }
  catch(e) {
  }
  finally {
  }

  if (phObject.id == "choose") {
    liSelected=cSelectedRowids.numEntries();
    if(cSelectedRowids=="") {
      hCOINSMain.coinsError(cAlertSelectRow);
      return false;
    }
    location.replace(lcHref);
  }
  else if (phObject.id == "export") {
  
       setButtonBusy('export');
       
          $.ajax({
            type:"get",
            url:lcHref,
            error: function() {
              resetButtonBusy('export');
              alert('Export Failure');
            },
            success: function(pcText) {
              resetButtonBusy('export');
              eval(pcText);
            }
            
          });
   
  
    /* try to open in the processFrame so we don't get an empty window */
    /*try {
       parent.processFrame.location=lcHref;
    }
    catch(e) { 
      window.open(lcHref,"_blank","menubar=yes resizable=yes scrollbars=yes");
    }*/
    
  }
  else if (phObject.id == "print") {
    lcHref=lcHref.setQueryValue('appheight','600');
    lcHref=lcHref.setQueryValue('appwidth','800');
    lcHref=lcHref.setQueryValue('ReportWriter','');
    lcHref=lcHref.replace("wou005.p","woframe.p");
    hCOINSMain.desktopDialog(cPrint,lcHref);
  }
  else if (phObject.id == "matrixAction" || phObject.id == "elementAction") {
    /* if a function then put the function in the popup */
    if (lcValue.substring(0,1)=="%") {
      lcFunction=lcValue.getEntry(0,"&");
      lcParam=lcValue.substring(lcFunction.length + 1);
      lcHref = lcHref.setQueryValue("matrixFunction",
               lcHref.getQueryValue("MainArea"));
      lcHref = lcHref.setQueryValue("actionType",phObject.id);         
      lcHref = lcHref.setQueryValue("MainArea",lcFunction);
      lcHref = lcHref.setQueryValue("iframe","true");
      lcHref = lcHref.setQueryValue("ipopup","true");
      /* need TopMenu for module specific lookups
      lcHref = lcHref.setQueryValue("TopMenu","");*/
      lcHref=lcHref.replace("wou005.p","woframe.p");
      if (lcParam!="") {
        lcHref=setParam(lcHref,lcParam);
      }
      matrixPopupVisible=false;
      el$('matrixPopup').contentDocument.location.href=lcHref;
      matrixPopupDiv.style.display="";
    }
    /* otherwise we want to call the function in the GSP */
    else {
      lcHref = lcHref.setQueryValue("matrixFunction",
               lcHref.getQueryValue("MainArea"));
      lcHref = lcHref.setQueryValue("actionType",phObject.id);         
      if (phObject.id == "matrixAction") {
        lcHref = lcHref.setQueryValue("matrixAction",lcValue);
        lcHref = lcHref.setQueryValue("defaultMatrixAction",lcValue);
        }
      else {
        lcHref = lcHref.setQueryValue("defaultElementAction",lcValue);
        lcHref = lcHref.setQueryValue("elementAction",lcValue);
      }
      if (phObject.id == "matrixAction" ) {
        setThisImage('actiongomatrix','_i');
      } else {
        setThisImage('actiongoelement','_i');
      }
      location.replace(lcHref);
    }
  }
  else if (phObject.id == "rowAction") {
    /* if a function then put the function in the popup */
    if (lcValue.substring(0,1)=="%") {
      lcFunction=lcValue.getEntry(0,"&");
      lcParam=lcValue.substring(lcFunction.length + 1);
      lcHref = lcHref.setQueryValue("matrixFunction",
               lcHref.getQueryValue("MainArea"));
      lcHref = lcHref.setQueryValue("actionType",'rowAction');         
      lcHref = lcHref.setQueryValue("MainArea",lcFunction);
      lcHref = lcHref.setQueryValue("iframe","true");
      lcHref = lcHref.setQueryValue("ipopup","true");
      lcHref = lcHref.setQueryValue("rowAction","");
      /* need TopMenu for module specific lookups
      lcHref = lcHref.setQueryValue("TopMenu","");*/
      lcHref=lcHref.replace("wou005.p","woframe.p");
      if (lcParam!="") {
        lcHref=setParam(lcHref,lcParam);
      }
      matrixPopupVisible=false;
      el$('matrixPopup').contentDocument.location.href=lcHref;
      matrixPopupDiv.style.display="";
    }
    /* otherwise we want to call the function in the GSP */
    else {
      lcHref = lcHref.setQueryValue("matrixFunction",
               lcHref.getQueryValue("MainArea"));
      lcHref = lcHref.setQueryValue("actionType",phObject.id);         
      lcHref = lcHref.setQueryValue("defaultRowAction",lcValue);
      lcHref = lcHref.setQueryValue("rowAction",lcValue);
      setThisImage('actiongorow','_i');
      location.replace(lcHref);
    }
  }
  else if (phObject.id == "elementAction") {
    /* if a function then put the function in the popup */
    if (lcValue.substring(0,1)=="%") {
      lcHref = lcHref.setQueryValue("matrixFunction",
               lcHref.getQueryValue("MainArea"));
      lcHref = lcHref.setQueryValue("actionType",'elementAction');         
      lcHref = lcHref.setQueryValue("MainArea",lcValue);
      lcHref = lcHref.setQueryValue("iframe","true");
      lcHref = lcHref.setQueryValue("ipopup","true");
      lcHref = lcHref.setQueryValue("TopMenu","");
      lcHref=lcHref.replace("wou005.p","woframe.p");
      matrixPopupVisible=false;
      el$('matrixPopup').contentDocument.location.href=lcHref;
      matrixPopupDiv.style.display="";
    }
    /* otherwise we want to call the function in the GSP */
    else {
      lcHref = lcHref.setQueryValue("matrixFunction",
               lcHref.getQueryValue("MainArea"));
      lcHref = lcHref.setQueryValue("actionType",phObject.id);         
      lcHref = lcHref.setQueryValue("defaultElementAction",lcValue);
      lcHref = lcHref.setQueryValue("elementAction",lcValue);
      setThisImage('actiongoelement','_i');
      location.replace(lcHref);
    }
  }
  else if ("add,copy,insert".inList(phObject.id)) {
    try {
      lcHref = lcHref.setQueryValue("bulkmaint",thisForm.bulkmaint.checked);
    }
    catch(e) {
    }
    /*
    add all the addtype fields to the URL
    e.g.
    lcHref = lcHref.setQueryValue("addtypeXXX",thisForm.addtypeXXX.value);
    */
    lbAddType=false;
    /*
    for (var i = 0; i < document.all.length; i++) {
      lhObject = document.all[i];*/
    for (var i = 0; i < thisForm.elements.length; i++) {
      lhObject = thisForm.elements[i];
      try {
        if (lhObject.name.substring(0,7) == "addtype") {
          lcHref=lcHref.setQueryValue(lhObject.name,lhObject.value);
          lbAddType=true;
        }
      } catch(e) { }
    }
    /* if using addtype then we don't want a return page because
       this stops the correct postupd to bring back the addtype again */
    /* TPA 05/11/14 - not required now as back button removes button
       rather than using back button which does not refresh
    if (lbAddType) {
      lcHref=lcHref.setQueryValue("returnPage","");
      lcHref=lcHref.setQueryValue("returnBack","Y");
    }
    */
    
    if(typeof updatedialog == "object") 
      location.replace(lcHref);
    else
      replacePage(phObject.value,lcHref,true);
  }
  else if (phObject.id=="mnt") {
    lcHref=location.href;
    lcHref=lcHref.setQueryValue("NoMenu","");
    lcHref=lcHref.setQueryValue("NoFrameSet","");
    lcHref=lcHref.replace("wou005.p","wocoins.p");
    location.replace(lcHref);
  }
  else {
    if(bQuickData&&
       ("next,prev,first,last,reload".inList(phObject.id))) {
    lcHref=lcHref.setQueryValue('getAjaxData','Y');
    setAjaxDataBusy();
    progressAnimation('generate');
    loadXMLDoc(lcHref);
    }
    else {
    location.replace(lcHref);
    }
  }

}
function actionThis(phObject) {
  lcHref = location.href.setQueryValue("Button","");
    if (phObject.value==undefined) {
      lcButton = phObject.href;
      lcButton = lcButton.getEntry(lcButton.numEntries('/') - 1,'/');
      if (lcButton=='afilter') {
        lcHref = lcHref.setQueryValue(phObject.id,"advanced",true);
      }
      else if (lcButton=='sfilter'||lcButton=='close') {
        lcHref = lcHref.setQueryValue(phObject.id,"simple",true);
      }
      else if (lcButton=='rfilter') {
        lcHref = lcHref.setQueryValue('queryFilterType',"reset",true);
      }
      else {
        lcValue = getElementValue(phObject,'value');
        lcHref = lcHref.setQueryValue(phObject.id,lcValue,true);
      }
    }
    else {
      if(phObject.id=="resetFilter") {
        /* hide filter */
        document.cookie='CSBFILTER' + cMainArea + '=false;path=/';
        lcHref = lcHref.setQueryValue('queryFilterType',"reset",true);
      }
      else if(phObject.id=="headerRowids") {
        lcHref = lcHref.setQueryValue(phObject.id,phObject.value,true);
        /* header navigation with generate so add G to function */
        if($('button#refresh').length) { 
          lcHref = lcHref.setQueryValue('initContainer',cMainArea + 'G');
          lcHref = lcHref.setQueryValue('smp_txn',
                     parseInt(location.href.getQueryValue('smp_txn')) + 1);
        }
      }
      else
        lcHref = lcHref.setQueryValue(phObject.id,phObject.value,true);
    }
  if (setRowidsCookie()==false) return false;
  location.replace(lcHref);
}
/*
function actionReturn(phObject) {

  hEvent=phObject;
  if (isIE) {
    liKeyCode=window.event.keyCode;
  }
  else {
    liKeyCode=iKeyDownCode;
  }
  
  if (liKeyCode==13) {
    searchButton();
    return false;
  }
  return true;
}
*/

function selectFilter(phObject) {
  lcHref = parent.mainarea.getFrame.location.href;
  lcHref = lcHref.setQueryValue("NamedFilter",phObject.id);
  parent.mainarea.getFrame.location.replace(lcHref);
  lcHref = location.href;
  lcHref = lcHref.setQueryValue("NamedFilter",phObject.id);
  location.replace(lcHref);
}

bStopValidation=false;
function stopValidation(pbStop) {
/*
  parent.validateFrame.location.href='about:blank';
  */
  if (pbStop==false) {
    bStopValidation=false;
  }
  else {
    bStopValidation=true;
  }
}
function validateField(phField,lcProg) {

  /* if form has just been submitted then don't bother doing the validation */
  if (isSubmitted==true) return;

  if (bStopValidation) {
    bStopValidation=false;
    return;
  }

  /* if lookup button pressed then don't validate */
  try {
  if (isIE) {
  if (document.elementFromPoint(event.x,event.y).parentElement.id=="lfield" + event.srcElement.name) return;
  }
  else {
  if (document.elementFromPoint(hEvent.clientX,hEvent.clientY).parentElement.id=="lfield" + phField.name) {
    hEvent=null;
    return;
    }
  }
  } catch(e) {}
  
  /* if undo button pressed then don't validate */
  try {
  if (isIE) {
  if (document.elementFromPoint(event.x,event.y).parentElement.id=="undo") return;
  }
  else {
  if (document.elementFromPoint(hEvent.clientX,hEvent.clientY).parentElement.id=="undo") {
    hEvent=null;
    return;
    }
  }
  } catch(e) {}

  /* if complex lookup (e. g. Analysis) is used then don't validate
     when we are back from lookup */
     /*
  if (phField.lookupUsed=='Y') {
    return;
  }
  */
  if (fieldData[phField.name].lookupUsed) return;

  if (isValueChanged(phField)) {
  
    lcFields = getInputFields(getFieldValidContext(phField),"");
   
    lcHref=getCurrentLocation().search;
    lcHref=lcHref.setQueryValue("returnPage","");
    
    for (i=0;i<lcFields.numEntries("&");i++) {
      lcField=lcFields.getEntry(i,"&");
      if (lcField!="" && lcField != "COINSToken") {
        lcValue=unescape(lcField.substring(lcField.indexOf("=") + 1));
        lcValue=lcValue.replace(/\+/g,"%2B");
        lcField=lcField.substring(0,lcField.indexOf("="));
        lcHref=lcHref.setQueryValue(lcField,lcValue,true);
      }
    }
    
    lcHref=lcHref.setQueryValue("validateHeaderTables",cHeaderTables);
    lcHref=lcHref.setQueryValue("validateBodyTable",cBodyTable);
    try {
      lcHref=lcHref.setQueryValue("validateFSP",thisForm.FSP.value);
    }
    catch(e) {}
    
    lcHref=lcHref.setQueryValue("validateContext",
                                getFieldValidContext(phField));
    if (fieldData[phField.name].validFields!=undefined) {
      lcHref=lcHref.setQueryValue("validateFields",
                                  getFieldValidFields(phField));
    }
    
    lcHref=lcHref
          + "&validateField=" + encodeURIComponent(phField.name)
          + "&validateProg=" + encodeURIComponent(lcProg);
    
    /* overwrite valid params in URL */
    if (getFieldValidParam(phField)!="") {
      lcHref = setParam(lcHref,getFieldValidParam(phField));      
    }

    /*parent.validateFrame.location.replace(lcHref);*/
    lcHref= "wouajax.p"
          + lcHref
          + '&ajaxMethod=syaval.validateField';
     
    /* limit the URL to 2000 bytes IE 6, 4048 IE8+ */
    /*
    if (lcHref.length>2000) lcHref=lcHref.substring(0,2000);*/
    
    if (isIE==false||IEVer>=8) {
      liLimit=4048;
    }
    else {
      liLimit = 2000;
    }
    
    if (lcHref.length>liLimit) {
      hCOINSMain.coinsError(cURLTooLarge + '\n'
           + lcHref);
      return false;
    }
    loadXMLDoc(lcHref);
  }
  /*
    return;
  }
  
  if (isValueChanged(phField)) {
    lcFields = getInputFields(getFieldValidContext(phField),"");
   
    lcHref=location.href;
    
    for (i=0;i<lcFields.numEntries("&");i++) {
      lcField=lcFields.getEntry(i,"&");
      if (lcField!="") {
        lcValue=unescape(lcField.substring(lcField.indexOf("=") + 1));
        lcValue=lcValue.replace(/\+/g,"%2B");
        lcField=lcField.substring(0,lcField.indexOf("="));
        lcHref=lcHref.setQueryValue(lcField,lcValue,true);
      }
    }
    
    lcHref=lcHref
          + "&validateField=" + phField.name
          + "&validateProg=" + lcProg;
    parent.validateFrame.location.replace(lcHref);
  }
  */
}

function coinsLink(phAnchor) {
//  parent.parent.parent.location.href = phAnchor.href;
  parent.location.href = phAnchor.href;
}

function selectOption (phObject) {
  lcFunction = phObject.value;
  lcHref = location.href;
//  lcURL=buildURL(lcHref,"short",""); - NO! BUILD short in wou005
  lcURL = "woframe.p?" 
        + "program=" + lcHref.getQueryValue("program")
        + "&MainArea=" + lcFunction;
  parent.location.href=lcURL;
}
function selectFilterOption (phObject) {
  lcURL = location.href;
  lcURL = lcURL.setQueryValue("Button","");
  lcURL = lcURL.setQueryValue("NamedFilter",phObject.value);
  location.replace(lcURL);
}


function roundInput(hField) {
        if(roundInput.arguments.length==2) {
                iPrecision = roundInput.arguments[1];
        }
        else {
                iPrecision = -2;
        }
        hField.value = roundValue(hField.value,iPrecision);
        formatValue(hField.name,iPrecision);
}

function roundValue(cValue) {
        var bNegative = false;

        if(roundValue.arguments.length==2) {
                iPrecision = roundValue.arguments[1];
        }
        else {
                iPrecision = -2;
        }

        cValue = cValue.trim();
        cValue = cValue.replace(RegExp(",","g"),"");
        if(cValue.substr(cValue.length - 1,1)=="-") {
                cValue = "-" + cValue.substr(0,cValue.length - 1);
        }
        dTmp = parseFloat(cValue);
        
        if(dTmp<0) {
                dTmp = - dTmp;
                bNegative = true;
                cValue = dTmp.toString();
        }
        
        if(cValue.indexOf(".") == -1) {cValue = cValue + ".";}
        cValue = "000000000000" + cValue + "0000000000000";
        iDecPos = cValue.indexOf(".");
        cValue = cValue.replace(".","");
        cValue = cValue.substring(0,iDecPos - iPrecision) + "." + cValue.substr(iDecPos - iPrecision);
        dValue = Math.round(parseFloat(cValue));
        
        cValue = "000000000000" + dValue + ".0000000000000";
        iDecPos = cValue.indexOf(".");
        cValue = cValue.replace(".","");
        
        cValue = cValue.substring(0,iDecPos + iPrecision) + "." + cValue.substr(iDecPos + iPrecision);
        
        dValue = parseFloat(cValue);
        if(bNegative==true) {
          dValue = - dValue;
        }
        return dValue;
}

function formatValue(cField) {
        var bNegative = false;
        var dTmp = 0.0;
        
        if(formatValue.arguments.length==2) {
                iPrecision = formatValue.arguments[1];
        }
        else {
                iPrecision = -2;
        }
        iDecimals = - iPrecision;
        if(iDecimals<0) {iDecimals = 0;}
        
        if(eval("thisForm." + cField)!=null) {
                dTmp = parseFloat(eval("thisForm." + cField).value);
        }
        else {
                dTmp = parseFloat(eval(cField).innerHTML);
        }
        if(dTmp<0) {        
                dTmp = - dTmp;
                bNegative = true;
                cValue = dTmp.toString().split(".");
        }
        else {
                if(eval("thisForm." + cField)!=null) {
                        cValue = eval("thisForm." + cField).value.split(".");
                } 
                else {
                        cValue = dTmp.toString().split(".");
                                           // cValue = eval(cField).innerHTML.split(".");
                }
        }

        if(cValue.length==1) {cValue[1] = ""}

        var cDecimal = "";
        for (var i = 0; i <= iDecimals - 1; i++) {
                cTmp = cValue[1].substr(i,1);
            if(cTmp=="") { cTmp = "0";}
                cDecimal = cDecimal + cTmp;
        }

        var j = 0;
        var cNumber = "";

        for (var i = cValue[0].length - 1; i >= 0; i--) {        
                if(j >= 3) {
                  cSep = ",";
                  j = 1;
                }
                else {
                  cSep = "";
                  j = j + 1;
                }
                cNumber = cValue[0].substr(i,1) + cSep + cNumber;
        }
        
        if(iDecimals >= 1) {
                  cNumber = cNumber + "." + cDecimal;
        }
        
        if(bNegative==true) {
                  cNumber = "-" + cNumber;
        }
        
        if(eval("thisForm." + cField)!=null) {
                eval("thisForm." + cField).value = cNumber;
        }
        else {
                eval(cField).innerHTML = cNumber;
        }
}

function calculateField(cCalcField,cCalcStr,cCondField,cCondValue,
                                            cPrecFlag,cPrecValue) {
                                      
        cTmp = cCalcStr.split(",");
        dValue = 0.0;
        dField = 0.0;
        
        lbCalculate = true;
        if(cCondField != undefined) {
            if(cCondField == 'precise') {
                    lcPrecision = cCondValue;
            }
            else {            
                lcCondValue = cCondValue.split(",");
                lbCalculate = false;
                for (var i = 0; i < lcCondValue.length; i++) {                
                    lcThisValue=eval("thisForm." + cCondField).value;
                    if(eval("thisForm." + cCondField).type=="checkbox"&&val("thisForm." + cCondField).checked==false) {
                      lcThisValue="";
                    }
                    if(lcCondValue[i] == lcThisValue) {
                          lbCalculate = true;
                    }
                  }
            }
          }
        if(lbCalculate==false) {return;}        
        
        if((cPrecFlag != undefined) && (cPrecFlag == 'precise')) {
          lcPrecision = cPrecValue;
        }

        for(var i = 0; i < cTmp.length; i++) {
                cOperand = cTmp[i].substr(0,1);
                if(cTmp[i].substr(1,1)=="!") {
                        dField = parseFloat(cTmp[i].substr(2).replace(RegExp(",","g"),""));
                }
                else {
                    try {
                        if(eval("thisForm." + cTmp[i].substr(1))!=null) {
                                dField = parseFloat(eval("thisForm." + cTmp[i].substr(1)).value.replace(RegExp(",","g"),""));
                        }
                        else if(eval(cTmp[i].substr(1))!=null) {
                                dField = parseFloat(eval(cTmp[i].substr(1)).innerHTML.replace(RegExp(",","g"),""));
                        
                        }
                    }
                    catch (ex) {
                        dField = 0.0;
                        console.log('CalculateField: ' + ex.message);
                    }
                }                
     
                if (isNaN(dField)) {
                dField = 0.0;}
                
                switch(cOperand) {
                        case "+": 
                                dValue = dValue + dField;
                                break;
                        case "-": 
                                dValue = dValue - dField;
                                break;
                        case "*": 
                                if (dValue.toString().indexOf(".")==-1) {
                                  dDiv1=0;
                                } else {
                                dDiv1 = dValue.toString().length
                                      - dValue.toString().indexOf(".") - 1;
                                }
                                if (dField.toString().indexOf(".")==-1) {
                                  dDiv2=0;
                                } else {
                                dDiv2 = dField.toString().length
                                      - dField.toString().indexOf(".") - 1;
                                }
                                dDiv1 = Math.pow(10,dDiv1);
                                dDiv2 = Math.pow(10,dDiv2);
                                dValue = dValue * dDiv1;
                                dField = dField * dDiv2;
                                dValue = dValue * dField;                      
                                dValue = dValue / (dDiv1 * dDiv2);
                                break;
                        case "/": 
                                dValue = dValue / dField;
                                break;
                }
        }
        
        if (lcPrecision == undefined) 
        {
          var lcPrecision;
          lcPrecision = -2;
        }
        try{
          if(eval("thisForm." + cCalcField)!=null) {
                  eval("thisForm." + cCalcField).value
                               = roundValue(dValue.toString(), lcPrecision);
          }
          else if(jQuery('#' + cCalcField).length) {
                  eval(cCalcField).innerHTML
                               = roundValue(dValue.toString(), lcPrecision);
          }
          
          formatValue(cCalcField,lcPrecision);
        }
        catch(ex) {
          console.log('CalculateField: ' + ex.message);
        }
}

var cValueArray = new Array;

function addValues(pcField,pcCode,pcValues) {
        cValueArray[pcField + pcCode] = pcValues;
}

function setValues(pcField,pcList) {
        lhField = eval(pcField);
        try {
          if (lhField.type!=undefined) {
            lcCode = cValueArray[lhField.name + lhField.value];
            if (lcCode != null) {
                    fillForm("thisForm",pcList,lcCode);
            }
          }  
          else {
            for (i=0;i<lhField.length;i++) {
              if (lhField[i].checked==true) {
                lcCode = cValueArray[lhField[i].name + lhField[i].value];
                if (lcCode != null) {
                        fillForm("thisForm",pcList,lcCode);
                }
              }
            }
          }
        }
        catch(e) {
            lcCode = cValueArray[lhField.name + lhField.value];
            if (lcCode != null) {
                    fillForm("thisForm",pcList,lcCode);
            }
        }
}

function getValues(pcField,pcCode) {
  var lcProperty = pcField + pcCode;
  return (lcProperty in cValueArray) ? cValueArray[lcProperty] : "";
}

iButtonCount = 0;
function writeButtonValue(pcGif,pcID,pcDesc,pcOnclick,pcValue,pcStyle) {

  if (pcStyle==undefined) {
    pcStyle="";
  }
  if (pcValue==undefined) {


    pcValue="";


  }

  iButtonCount = iButtonCount + 1;

  lcButton = '<A href="' + pcGif + '"'
           + ' id="' + pcID + '"'
           /*+ ' imageID="jsbutton' + iButtonCount + '"'*/

           + pcStyle

           + ' onClick="' + pcOnclick + '"'
           + ' onMouseover="hover(this);"'
           + ' onMouseOut="restore(this);"'
           + ' onMouseDown="press(this);"'
           + ' onMouseup="restore(this);"';

  if (pcValue!="") {
  lcButton = lcButton
           + ' value="' + pcValue + '"';
  }

  lcButton = lcButton
           + '><IMG src="/coins/' + cWebImgs + '/images/' + pcGif + '.gif"'
           + ' name="jsbutton' + iButtonCount + '"'
           + ' alt="' + pcDesc + '"'
           + ' border="0">'
           + '</A>';
  return lcButton;

}


iMatrixInputSeq = 0;
function undoElement (phButton) {
  lcName=phButton.id.substring(4);
  eval("thisForm.matrix_" + lcName + '.value=thisForm.matrix_' + lcName + ".ovalue");
  eval('setmatrixclass(thisForm.matrix_' + lcName + ')');
}
function addElement (phButton) {
  lcName=phButton.id.substring(3);
  eval("lcValue=thisForm.matrix_" + lcName + ".ovalue");
  if (lcValue=="DELETE") {
    lcValue="0.00";
  }
  eval("thisForm.matrix_" + lcName + '.value=lcValue');
  eval('setmatrixclass(thisForm.matrix_' + lcName + ')');
}
function deleteElement (phButton) {
  lcName=phButton.id.substring(6);
  eval("thisForm.matrix_" + lcName + '.value="DELETE"');
  eval('setmatrixclass(thisForm.matrix_' + lcName + ')');
}

function tickElement (phButton) {
  lcName=phButton.id.substring(4);
  if (eval("thisForm.matrix_" + lcName + '.value')==eval("thisForm.matrix_" + lcName + ".mtvalue")) {
             lcValue=eval("thisForm.matrix_" + lcName + ".ovalue"); 
    }
    else {
            lcValue=eval("thisForm.matrix_" + lcName + ".mtvalue");
  }
  eval("thisForm.matrix_" + lcName + '.value=lcValue');
  eval('setmatrixclass(thisForm.matrix_' + lcName + ')');
}

function saveMatrix () {
  // remove the leading ?
  thisForm.matrixvalue.value=window.parent.processFrame.matrixvalue.substring(1);
}

function matrixKey (phObject) {
  lcName=phObject.name.substring(7);
  // undo
  if (isIE) {
    liKeyCode=window.event.keyCode;
  }
  else {
    liKeyCode=hEvent.which;
    if (hEvent.ctrlKey==true||hEvent.shiftKey==true) {
      liKeyCode=liKeyCode - 64;
    }
  }

  if (liKeyCode==18) {
  eval("thisForm.matrix_" + lcName + '.value=thisForm.matrix_' + lcName + ".ovalue");
  eval('setmatrixclass(thisForm.matrix_' + lcName + ')');
  return false;
  }
  return true;
}

function matrixelement (piC,piR,piWidth,pcInit,pcValue,pbCheckedInit,pbCheckedValue,pcEnqValue,pcOptions) {

  lcName='c' + piC + 'r' + piR;
  lcChecked="";
  lcType="";

  if (window.parent.processFrame.matrixvalue==undefined) {
    window.parent.processFrame.matrixvalue="";
  }

  lcValue = window.parent.processFrame.matrixvalue.getQueryValue("matrix_" + lcName,"|","=");
  if(lcValue!="") {
    pcInit=lcValue;
  }

  lcStyle="";
  lcTickStyle="";
  lcCheckBoxStyle="";
  lcAddStyle=' style="display:none"';
  if (lcValue=="DELETE") {
    lcStyle=' style="display:none"';
    lcAddStyle='';
  }
  lcDelStyle=lcStyle;
  
  if (pcOptions.inList("T")) {
    lcStyle=' disabled=true';
  }
  if (pcOptions.inList("E")) {
    lcType=' type="hidden"';
  }
    
  document.write('<TABLE cellpadding="0" cellspacing="0"><TR><TD>');
  iMatrixInputSeq = iMatrixInputSeq + 1;
  document.write('<INPUT' + lcType + ' name="matrix_' + lcName + '" class="dec" size="' + piWidth + '"'
      + ' value="' + pcInit + '"'
      + ' ovalue="' + pcValue + '"'
      + ' cOptions="' + pcOptions + '"'
      + ' onkeypress="return matrixKey(this);"'
      + ' onBlur="return setmatrixclass(this);"'
      + ' onFocus="hThisField=this;"'
      + ' inputSeq="' + iMatrixInputSeq + '"'
      + lcStyle + '>');
          
  if (pcOptions.inList("E")) {
    document.write('<DIV align="right" class="dec" size="' + piWidth + '">'                                           
      + pcEnqValue 
      + '</DIV>');                            
  }

  if (!(pcOptions.inList("A"))) {
    lcAddStyle=' style="display:none"';
  }
  if (!(pcOptions.inList("D"))) {
    lcDelStyle=' style="display:none"';
  }
  if (!(pcOptions.inList("T")) & !(pcOptions.inList("X"))) {
    lcTickStyle=' style="display:none"';
  }
  
  document.write('</TD><TD width="24">');
  document.write(writeButtonValue("add","add" + lcName,"Add","addElement(this);return false;","",lcAddStyle))
  document.write(writeButtonValue("delete","delete" + lcName,"Delete","deleteElement(this);return false;","",lcDelStyle))
  document.write(writeButtonValue("tickval","tick" + lcName,"Tick","tickElement(this);return false;","",lcTickStyle))
  
  if (pcOptions.inList("C")) {
    lcValue = window.parent.processFrame.matrixvalue.getQueryValue("checkbox_" + lcName,"|","=");
    if(lcValue!="") {
      pbCheckedInit=(lcValue=="true");
    }
        if(pbCheckedInit==true) {lcChecked=" checked";}
    document.write('</TD><TD width="24">');
    document.write('<INPUT type="checkbox" name="checkbox_' + lcName + '"'
            + lcChecked
                        + ' ochecked=' + pbCheckedValue
            + ' onClick="return setmatrixclass(this);"'
            + ' onFocus="hThisField=this;"'
            + '">')
  }
  
  document.write('</TD></TR></TABLE>');
  eval('setmatrixclass(thisForm.matrix_' + lcName + ')');
}

function setmatrixclass(phObject) {
  var lhCheckBox;
  lbCheckBoxChanged=false;
    
  if (phObject.type=="checkbox") {
    lhCheckBox=phObject;
        window.parent.processFrame.matrixvalue
      =window.parent.processFrame.matrixvalue.setQueryValue(phObject.name,phObject.checked,false,"|","="); 
        lcName=phObject.name.substring(9);
        phObject = eval("thisForm.matrix_" + lcName);
  }
  else {
    try {
      lhCheckBox=eval("thisForm.checkbox_" + phObject.name.substring(7));
    }
    catch(e) {
    }
  }

  if(lhCheckBox!=undefined) {
      lbCheckBoxChanged=(lhCheckBox.checked!=(lhCheckBox.ochecked=="true"));
  }
  
  // store value in processframe
  if (phObject.value != phObject.ovalue) {
    window.parent.processFrame.matrixvalue
      =window.parent.processFrame.matrixvalue.setQueryValue(phObject.name,phObject.value,false,"|","="); 
  }
  else {
    window.parent.processFrame.matrixvalue
      =window.parent.processFrame.matrixvalue.setQueryValue(phObject.name,"",false,"|","="); 
  }

  // phObject is the input element, 
  // contained in its own table, then parent is <NOBR> and its parent the containing TD
  // with the class to be changed
  lhTD=phObject.parentElement.parentElement.parentElement.parentElement.parentElement;
  if (lhTD.tagName!="TD") {
    // NOBR may or may not be present
    lhTD=lhTD.parentElement;
  }
  
  lcClass=lhTD.className;
  // class=matrixeven or matrixodd + -INP if input
  lcClass=lcClass.getEntry(0,"-");
  if (phObject.value==phObject.ovalue & lbCheckBoxChanged==false) {
    lhTD.className=lcClass;
  }
  else
  {
    lhTD.className=lcClass + "-INP";
  }

  lcStyle="";
  lcAddStyle="none";
  if (phObject.value=="DELETE") {
    lcStyle="none";
    lcAddStyle="";
  }

  lcName=phObject.name;
  lcName=lcName.substring(7);

  phObject.style.display=lcStyle;
  if (phObject.cOptions.inList("D")) {
    eval("delete" + lcName + ".style.display=lcStyle");
  }
  if (phObject.cOptions.inList("A")) {
    eval("add" + lcName + ".style.display=lcAddStyle");
  }

  if (phObject.value!=phObject.ovalue) {

    if (phObject.maxe!=undefined) {
      if (roundValue(phObject.value)>roundValue(phObject.maxe)) {
        hCOINSMain.coinsError(phObject.maxem);
        phObject.focus();
        phObject.select();
        return false;
      }
    }    
    if (phObject.maxw!=undefined) {
      if (roundValue(phObject.value)>roundValue(phObject.maxw)) {
        hCOINSMain.coinsError(phObject.maxwm);
      }
    }
    if (phObject.mine!=undefined) {
      if (roundValue(phObject.value)<roundValue(phObject.mine)) {
        hCOINSMain.coinsError(phObject.minem);
        phObject.focus();
        phObject.select();
        return false;
      }
    }    
    if (phObject.minw!=undefined) {
      if (roundValue(phObject.value)>roundValue(phObject.minw)) {
        hCOINSMain.coinsError(phObject.minwm);
      }
    }
  }

  return true;
}

function getDeleteRowids (pcRowids) {
  if (pcRowids=="") return "";
  lcRowids=pcRowids.split(",");
  pcRowids = "";
  for (i=0;i<lcRowids.length;i++) {
    if (lcRowids[i].numEntries(";")>=buffer_thisBrowse) {
      pcRowids=pcRowids + "," + lcRowids[i].getEntry(buffer_thisBrowse - 1,";");
        }
  }
  pcRowids=pcRowids.substring(1);
  return pcRowids;
}

// ordered lists functions
function getListValue(phList) {
   lcValue="";
   for( var i = 0; i < phList.options.length; i++ )  { 
     try {
       lcValue=lcValue + "," 
              + replaceAll(phList.options[i].value,',','$comma$');
     } catch(e) {}
   }
   lcValue=lcValue.substr(1);
   return lcValue;
}
function listFieldValue(phList) {
   lcValue=getListValue(phList);
   lhField=el$(phList.id.substr(0,phList.id.length - 5));
   if(lhField==null)
     lhField=input$(phList.id.substr(0,phList.id.length - 5));
   lhField.value=lcValue;
}

// buttons named same as lists (+ Left/Right) and field but with
// ad=add,de=delete,up-move up,do=move down,aa=add all,da=delete all
function addToRightList(phButton,pbLog) {
   lhFrom = el$(phButton.id.substr(0,phButton.id.length - 2) + "Left");
   lhTo = el$(phButton.id.substr(0,phButton.id.length - 2) + "Right");
   moveList(lhFrom,lhTo,pbLog);   
}
function addToLeftList(phButton,pbLog) {
   lhSrc=el$(phButton.id.substr(0,phButton.id.length - 2) + "Source");
   lhFrom=el$(phButton.id.substr(0,phButton.id.length - 2) + "Right");
   lhTo=el$(phButton.id.substr(0,phButton.id.length - 2) + "Left");
   lhFilter=el$(phButton.id.substr(0,phButton.id.length - 2) + "Filter");
   lhValue=el$(phButton.id.substr(0,phButton.id.length - 2));
   moveList(lhFrom,lhTo,pbLog);
   filterList(lhSrc,lhTo,lhFilter.value,lhValue.value);
}

function moveList(phFrom,phTo,pbLog) {

   // deselect all options in the to list
   for( var i = 0; i < phTo.options.length; i++ )  { 
     phTo.options[i].selected=false;
   }

   // add to the to list
   for( var i = 0; i < phFrom.options.length; i++ )  { 
     if ( phFrom.options[i] != null && ( phFrom.options[i].selected == true || pbLog ) ) {
       phTo[phTo.length] = new Option( phFrom.options[i].text, phFrom.options[i].value, true, true );
     }
   }

   // delete from the from list
   for( var i = phFrom.options.length; i >= 0; i-- )  { 
     if ( phFrom.options[i] != null && ( phFrom.options[i].selected == true || pbLog ) ) {
           phFrom.options[i]=null;
     }
   }
  if (phTo.id.substr(phTo.id.length - 5) == "Right") {
    listFieldValue(phTo);
  }
  else {
    listFieldValue(phFrom);
  }
}

function buttonListUp (phButton) {
   lhList=el$(phButton.id.substr(0,phButton.id.length - 2) + "Right");
   moveListUp(lhList);   
}        
function buttonListDown (phButton) {
   lhList=el$(phButton.id.substr(0,phButton.id.length - 2) + "Right");
   moveListDown(lhList);   
}
function moveListUp (phFrom) {
   // if first option selected then can't move up
   if (phFrom.options[0].selected) return;
  moveListSelected(phFrom, true);
  listFieldValue(phFrom);
}
function moveListDown (phFrom) {
  moveListSelected(phFrom, false);
  listFieldValue(phFrom);
}

function moveListSelected(phSelect, pbUp) {
  // if not option selected then do nothing
  if (phSelect.selectedIndex == -1)
    return;

  // if first/last option selected then can't move
  var liEnd = (pbUp ? 0 : phSelect.options.length - 1);
  if (phSelect.options[liEnd].selected)
    return;

  var $selected = $(phSelect).find(':selected');
  if (!pbUp) {
    $selected = $($selected.get().reverse());
  }

  $selected.each(function () {
    var $this = $(this);
    if (pbUp) {
      var $before = $this.prev();
      if ($before.length > 0 && !$before.is(':selected')) {
        $this.insertBefore($before);
      }
    } else {
      var $after = $this.next();
      if ($after.length > 0 && !$after.is(':selected')) {
        $this.insertAfter($after);
      }
    }
  });
}

function sortList(phList) {
  lcSortedList = new Array;
  lcValue=phList.value;
  for(var i = 0; i < phList.options.length; i++) {
    lcSortedList[i] = phList.options[i].text + "|" + phList.options[i].value;
  }
  lcSortedList.sort();
  phList.options.length=0;
  for(var i = 0; i < lcSortedList.length; i++) {
    phList[phList.length] = new Option(lcSortedList[i].split("|")[0],lcSortedList[i].split("|")[1],false,false);
  }
  phList.value=lcValue;
}

function refreshList(pcName) {
   lhSrc=el$(pcName + "Source");
   lhFrom=el$(pcName + "Right");
   lhTo=el$(pcName + "Left");
   lhFilter=el$(pcName + "Filter");
   lhValue=el$(pcName);
   filterList(lhSrc,lhTo,lhFilter.value,lhValue.value);
}

function filterList(phSource,phTarget,lcFilter,lcExclude) {
  phTarget.length=0;
  lcFilters=lcFilter.split(" ");
  for(var i = 0; i < phSource.options.length; i++) {
    filters: {
      for(var j = 0; j < lcFilters.length; j++) {
        try {
          lhFilter=new RegExp(lcFilters[j],"gi");
        } catch(e) {lhFilter=new RegExp("","gi")}
        
        if (!phSource.options[i].text.match(lhFilter)) {
          break filters;
        }
      }
      
      if (!lcExclude.inList(phSource.options[i].value)) {
       phTarget[phTarget.length] = new Option(phSource.options[i].text,phSource.options[i].value,false,false);
      }
      
    } /* filters */
  }
}

function isDirtyForm() {
  var lbError=false;
  for(f in fieldData) {
    if(f != ""){
      lhInput=input$(f);
      if (lhInput != undefined && fieldData[f].beforeValue!=undefined) {
        if(fieldData[f].beforeValue != getFieldValue(lhInput)) {
          $(lhInput).addClass('error');
          lbError=true;
        }
      }
    }
  }
  return lbError;
}

function nextPageForward () {
  lcHref=location.href;
  lcHref=lcHref.setQueryValue("Button","action:forward");
  if(window.parent.name=="listframe") {
    lcHref=lcHref.setQueryValue("pvFrame",
             parent.parent.parent.location.href.getQueryValue('pvFrame'));
    lcHref=lcHref.setQueryValue("nextActionFrame","mainarea");
  }

  if(isDirtyForm()) 
  hCOINSMain.coinsConfirm(
    cDirtyForm,
    function() {
      hCOINSMain.bNextButton=true;
      parent.postFrame.location.replace(lcHref);
    }
  )
  else {
      hCOINSMain.bNextButton=true;
      parent.postFrame.location.replace(lcHref);
  }
}

function nextPageBack(phButton) {
  var lcHref=phButton.getAttribute('data-back');

  if(isDirtyForm()) 
  hCOINSMain.coinsConfirm(
    cDirtyForm,
    function() {
      location.href=lcHref;
    }
  )
  else {
      location.href=lcHref;
  }
  
  
}

function refreshMatrix() {
  lcHref=parent.parent.location.href;
  lcHref=lcHref.setQueryValue("matrixAction","");
  lcHref=lcHref.setQueryValue("elementAction","");
  lcHref=lcHref.setQueryValue("rowAction","");
  parent.parent.location.replace(lcHref);
}

function populateOptions(pcField,pcPopulate,pcParam,pcViewAs,pcExtra) {

  lcHref=location.search;
  lcHref="?" + buildURL(lcHref,"short","");
  lcHref=lcHref.setQueryValue("iframe","");
  lcHref=lcHref.setQueryValue("Button","");
  lcHref = lcHref.setQueryValue("populateField",pcField);
  lcHref = lcHref.setQueryValue("populateMethod",pcPopulate);
  lcHref = lcHref.setQueryValue("populateParam",pcParam);
  if (pcViewAs!=undefined) {
    lcHref = lcHref.setQueryValue("populateViewAs",pcViewAs);
  }
  if (pcExtra!=undefined) {
    lcHref=lcHref + "&" + pcExtra;
  }

  lcHref = lcHref.setQueryValue("MainArea","%WSYPOP");
  lcHref="wourun.p" + lcHref;

  parent.postFrame.location.replace(lcHref);
}

function copyOptions(phFrom,phTo) {
  lcValue=phTo.value;
  phTo.options.length = 0;
  for (var i = 0; i < phFrom.options.length; i++){
    phTo.options.add(new Option
      (phFrom.options[i].text,
       phFrom.options[i].value));
    if (lcValue.toUpperCase()==phFrom.options[i].value.toUpperCase()) {
      lcValue=phFrom.options[i].value;
    }
  }  
  phTo.value = lcValue;
}

function optionText(phOptions,pcValue) {
  // TODO: pcValue is not used?
  for (var i = 0; i < phOptions.options.length; i++){
    if (phOptions.options[i].selected) {
      return phOptions.options[i].text;
    }
  }  
  return "";
}
function optionData(phOptions,pcValue,pcAttr) {
  // TODO: pcValue is not used?
  for (var i = 0; i < phOptions.options.length; i++){
    if (phOptions.options[i].selected) {
      var lcData = phOptions.options[i].getAttribute('data-data');
      if (lcData)
        return lcData.getQueryValue(pcAttr);
      else
        return "";
    }
  }  
  return "";
}

function deleteDefCombo(phCombo) {
  try {
    if (phCombo.options[0].value=="?") {
      phCombo.options[0]=null;
    }
  } catch(e) {}
}

function setBrowseScrollHeight() {
  var liSpace=$(window).height() - $('body').height();
  var liHeight;
  liHeight=$('#leftBody').height();
  $('#leftBody').height(liHeight + liSpace);
  liHeight=$('#rightBody').height();
  $('#rightBody').height(liHeight + liSpace);
}

function browseScrollResize() {

    rightHeader.style.width="0px";
    rightBody.style.width="0px";

      leftBody.style.height=rightBody.offsetHeight + 'px';

      /*liWidth=rightHeader.offsetParent.clientWidth;*/
      liWidth=browseBody.clientWidth;
      rightBody.style.width= liWidth
              - ((isIE)?leftHeader.scrollWidth:bodyHeadleft.clientWidth)
                           - 10 + 'px';
      leftBody.style.width=leftBody.scrollWidth + 'px';
      rightHeader.style.width=rightBody.clientWidth + 'px'; 
                       

}

function handleRightHeaderScroll() {
  $.resetSliderPositions($('#rightScrollTable'));
}
function saveColWidths() {
  lcURL='MainArea=' + cMainArea
       + '&ColumnSet=' + encodeURIComponent(thisForm.columnSet.value);
  var lcNames='';
  var lcWidths='';
  lhTHs=$('#leftScrollTable').find('TR.bodyhead').children();
  for(i=0;i<lhTHs.length;i++) {
    if(lhTHs[i].children[0].className=="freezethdiv") {
    if(lhTHs[i].children[0].children[0].id.substring(0,3)=="th_"){
      lcNames = lcNames + ','
              + lhTHs[i].children[0].children[0].id.substring(3);
      lcWidths=lcWidths + ','
              + lhTHs[i].children[0].children[0].offsetWidth;
    }
    }
  }
  lhTHs=$('#rightScrollTable').find('TR.bodyhead').children();
  for(i=0;i<lhTHs.length;i++) {
    if(lhTHs[i].children[0].className=="freezethdiv") {
    if(lhTHs[i].children[0].children[0].id.substring(0,3)=="th_"){
      lcNames = lcNames + ','
              + lhTHs[i].children[0].children[0].id.substring(3);
      lcWidths=lcWidths + ','
              + lhTHs[i].children[0].children[0].offsetWidth;
    }
    }
  }
  
  lcNames=lcNames.substring(1);
  lcWidths=lcWidths.substring(1);
  
  lcURL=lcURL + '&names=' + encodeURIComponent(lcNames)
              + '&widths=' + lcWidths;

  ajaxPost('syasur.saveColWidths',lcURL);
}
function resetColWidths() {
  lcURL='MainArea=' + cMainArea
       + '&ColumnSet=' + encodeURIComponent(thisForm.columnSet.value);
  ajaxPost('syasur.resetColWidths',lcURL);
}

function browseFreezeColumns() {
  jQuery('#leftScrollTable').simpleResizableTable();
  jQuery('#rightScrollTable').simpleResizableTable();
  
  jQuery('#rightScrollTable tr').hover(
    function(){
      if($(this).hasClass('activerow')) {
        $(this).addClass('hover');
        lhLeftTR=$('#leftScrollTable').find('tr')[this.rowIndex];
        jQuery(lhLeftTR).addClass('hover');
      }
    },
    function() {
      if($(this).hasClass('activerow')) {
        $(this).removeClass('hover');
        lhLeftTR=$('#leftScrollTable').find('tr')[this.rowIndex];
        jQuery(lhLeftTR).removeClass('hover');
      }
    })
    .on('click',function(event) {
      if($(event.target).parent('[href="select"]').length==0
         && $(event.target).closest('tr').hasClass('activerow')) {
          lhLeftTR=$('#leftScrollTable').find('tr')[this.rowIndex];
          $(lhLeftTR).find('td a[href="select"] img').click();
      }
    })
    .on('dblclick',function(event) {
      if($(event.target).parent('[href="select"]').length==0
         && $(event.target).closest('tr').hasClass('activerow')) {
          lhLeftTR=leftScrollTable.children[0].children[this.rowIndex];
          $(lhLeftTR).find('td a[href="select"] img').dblclick();
      }
    });
  
  
  jQuery('#leftScrollTable tr').hover(
    function(){
      if($(this).hasClass('activerow')) {
        $(this).addClass('hover');
        lhRightTR=$('#rightScrollTable').find('tr')[this.rowIndex];
        jQuery(lhRightTR).addClass('hover');
      }
    },
    function() {
      if($(this).hasClass('activerow')) {
        $(this).removeClass('hover');
        lhRightTR=$('#rightScrollTable').find('tr')[this.rowIndex];
        jQuery(lhRightTR).removeClass('hover');
      }
    })
    .on('click',function(event) {
      if($(event.target).parent('[href="select"]').length==0
         && $(event.target).closest('tr').hasClass('activerow')) {
          $(event.currentTarget).find('td a[href="select"] img').click();
      }
    })
    .on('dblclick',function(event) {
      if($(event.target).parent('[href="select"]').length==0
         && $(event.target).closest('tr').hasClass('activerow')) {
          $(event.currentTarget).find('td a[href="select"] img').dblclick();
      }
    });
    
    jQuery('#browseContent>tbody>tr.odd,#browseContent>tbody>tr.even')
    .on('click',function(event) {
      if(event.target.tagName=="TD") {
        $(event.currentTarget).find('td a[href="select"] img').click();
      }
    })
    .on('dblclick',function(event) {
      if(event.target.tagName=="TD") {
        $(event.currentTarget).find('td a[href="select"] img').dblclick();
      }
    })

}
function browseFreezeButtons(piSave,piReset) {
  if(piSave==0)
    $("#savewidths").prop("disabled",true).css("opacity",0.5);
  else
    $("#savewidths").prop("disabled",false).css("opacity",1.0);

  if(piReset==0)
    $("#resetwidths").prop("disabled",true).css("opacity",0.5);
  else
    $("#resetwidths").prop("disabled",false).css("opacity",1.0);
  removeTooltips();
}
function browseFreezeResize() {
    rightHeader.style.width='0px';
    $('div#browseDiv').css('width',document.body.clientWidth);
    leftHeader.style.width='';
    liWidth=browseContent.clientWidth;
    rightHeader.style.width=liWidth + 'px';
    liLeft = leftHeader.clientWidth;
    liRight = liWidth - liLeft;
    leftHeader.style.width=liLeft + 'px';
    rightHeader.style.width=liWidth - liLeft - 5 + 'px';

    // Make body spans equal in height
    $('#rightScrollTable tr.bodyspan').each(function(idx, rightSpan) {
      var leftSpan = $('#leftScrollTable tr.bodyspan').get(idx);
      if (leftSpan) {
        $([leftSpan, rightSpan]).css('height', 'auto');
        var liHeight = Math.max($(leftSpan).height(), $(rightSpan).height());
        $([leftSpan, rightSpan]).height(liHeight);
      }
    });

    setFreezeOverflow();
    
}

function browseFreezeResizeRows() {
  lhLeft=el$('leftScrollTable').children[0].children;
  lhRight=el$('rightScrollTable').children[0].children;

  for (var i = 0;i < lhLeft.length;i++) {
    setFreezeRowHeight(lhLeft,lhRight,i);
  }

}

function setFreezeRowHeight(phLeftRows,phRightRows,liRow) {

  $(phLeftRows[liRow]).css('height','');
  $(phRightRows[liRow]).css('height','');
  
  lhTR=jQuery(phLeftRows[liRow]);
  lhTR.find("div.freezetd").each(function() {
      if (this.children[0] 
          && this.children[0].tagName.toLowerCase()=="textarea") {
        $(this).css('max-height',this.children[0].offsetHeight + 'px');
      }
      else if (this.children[0] && this.children[0].children[0]
        && this.children[0].children[0].tagName.toLowerCase()=="textarea") {
        $(this).css('max-height',
          this.children[0].children[0].offsetHeight + 'px');
      }
      else {
        $(this).css('max-height','');
      }
  });
  lhTR=jQuery(phRightRows[liRow]);
  lhTR.find("div.freezetd").each(function() {
     if (this.children[0] 
          && this.children[0].tagName.toLowerCase()=="textarea") {
        $(this).css('max-height',this.children[0].offsetHeight + 'px');
      }
      else if (this.children[0] && this.children[0].children[0]
        && this.children[0].children[0].tagName.toLowerCase()=="textarea") {
        $(this).css('max-height',
          this.children[0].children[0].offsetHeight + 'px');
      }
      else {
        $(this).css('max-height','');
      }
  });
 
  liRowHeight=Math.max(phLeftRows[liRow].offsetHeight,
                       phRightRows[liRow].offsetHeight);
                       
  if(liRowHeight>phLeftRows[liRow].offsetHeight) {
    $(phLeftRows[liRow]).css('height',liRowHeight + 'px');
  }                                    
  else {
    $(phLeftRows[liRow]).css('height','');
  }
  
  if(liRowHeight>phRightRows[liRow].offsetHeight) {
    $(phRightRows[liRow]).css('height',liRowHeight + 'px');
  }                                    
  else {
    $(phRightRows[liRow]).css('height','');
  }
  
}

function setFreezeOverflow(){
    $('div.freezeth').each(function() {
      if((this.scrollHeight > this.clientHeight  + 2 && this.clientHeight!=0)
         || (this.scrollWidth > this.clientWidth + 2 && this.clientWidth!=0))
      {
         $(this).parent().parent().addClass('overflowed');
      }
      else {
         $(this).parent().parent().removeClass('overflowed');
      }
    });
    
    $('div.freezetd').each(function() {
      if((this.scrollHeight > this.clientHeight  + 2 && this.clientHeight!=0)
         || (this.scrollWidth > this.clientWidth + 2 && this.clientWidth!=0))
      {
         $(this).parent().addClass('overflowed');
      }
      else {
         $(this).parent().removeClass('overflowed');
      }
    });
}

function doTinyInsertHTML(pcID,pcHTML)
{    
    if (tinymce.isIE) {
        tinyMCE.activeEditor.selection.moveToBookmark(actualCaretPositionBookmark);
        tinyMCE.execCommand('mceInsertContent',false, pcHTML); 
    }else {
        tinyMCE.execCommand('insertHTML',false, pcHTML); 
    }
}
/*
function doEdInsertHTML(pcID,pcHTML)
{    
    var hHoldEd = eval("hold" + pcID);
    var hEditor = eval(pcID);
    if (pcHTML != ""){
    hHoldEd.document.body.innerHTML = pcHTML;
    Copied = hHoldEd.document.body.createTextRange();
    Copied.execCommand("Copy");
    //alert("check clipboard now: " + pcHTML);
    hEditor.focus();
    hEditor.document.execCommand('paste', false, null);
    }
}
function doEdTable(pcID)
{
  var hEditor = eval(pcID);
  var iColumns = prompt('Enter the number of columns','');
  var iRows = prompt('Enter the number of rows','');
  var cHTML = hEditor.document.body.innerHTML;
  var cExtraHTML = "<table><tr>";
  for (var i = 0;i < iColumns;i++) cExtraHTML += "<TH></TH>";
  cExtraHTML += "</tr>";
  for (var j = 0;j <  iRows; j++){
    cExtraHTML += "<tr>";
    for (var i = 0;i < iColumns;i++) cExtraHTML += "<TD></TD>";
    cExtraHTML += "</tr>";
  }
  cExtraHTML += "</table>";
  doEdInsertHTML(pcID,cExtraHTML);
}
function doEdPara(pcID)
{
  var hEditor = eval(pcID);
  hEditor.focus();
  hEditor.document.execCommand('InsertParagraph');
}
function doEdImage(pcID)
{
  var hEditor = eval(pcID);
  var imgSrc = prompt('Enter image location', '');
  if(imgSrc != null) 
  {
    hEditor.focus();
    hEditor.document.execCommand('insertimage', false, imgSrc);
  }
}
function doEdForeCol(pcID)
{
  var hEditor = eval(pcID);
  var fCol = prompt('Enter foreground color', '');
          
  if(fCol != null) hEditor.document.execCommand('forecolor', false, fCol);
}
                      
function doEdBackCol(pcID)
{
  var hEditor = eval(pcID);
  var bCol = prompt('Enter background color', '');
                                  
  if(bCol != null)
    hEditor.document.execCommand('backcolor', false, bCol);
}
  
function doEdLink(pcID)
{
  var hEditor = eval(pcID);
  hEditor.focus();
  hEditor.document.execCommand('createlink');
}
function doEdRule(pcID)
{
  var hEditor = eval(pcID);
  hEditor.focus();
  hEditor.document.execCommand('inserthorizontalrule', false, null);
}
function doEdFont(pcID,fName)
{
  var hEditor = eval(pcID);
  if(fName != '') hEditor.document.execCommand('fontname', false, fName);
}
function doEdSize(pcID,fSize)
{
  var hEditor = eval(pcID);
  if(fSize != '') hEditor.document.execCommand('fontsize', false, fSize);
}
function doEdHead(pcID,hType)
{
  var hEditor = eval(pcID);
  if(hType != '')
  {
    hEditor.document.execCommand('formatblock', false, hType);  
  }
}
*/

hRefresh='';
iRefresh=0;
function setRefresh(lims) {
  iRefresh=lims;
  hRefresh=setTimeout('executeReload()',iRefresh);
}
function resetRefresh(e) {
  if (iRefresh!=0) {
    clearTimeout(hRefresh);
    hRefresh = setTimeout('executeReload()',iRefresh);
  }
  resetTimedPageRefresh();
}
function executeReload() {
  location.reload();
}
function executeSetURL(pcSet) {
  var lcHref=location.href;
  lcHref=setParam(lcHref,pcSet);
  if(lcHref==location.href)
    location.reload();
  else
   location.replace(lcHref);
}

function executeParentReload() {
  hCOINSMain.parent.mainarea.location.reload();
}

function getSubFrame (pcName) {
  for (i=0;i<frames.length;i++) {
    if (frames[i].name==pcName) return frames[i];
  }
  return null;
}

function getMultiSelectValue (phMultiSelect) {
  lcValue="";
  for (i=0;i<phMultiSelect.length;i++) {
    if (phMultiSelect[i].checked) {
      lcValue = lcValue + "," + phMultiSelect[i].value;
    }
  }
  lcValue=lcValue.substring(1);
  return lcValue;
}

function initGraph(pcDiv, pcHTML)
{
  lhDiv = eval(pcDiv);
  lhDiv.innerHTML = pcHTML;
}

/*
function selectTabMenuFunction(pcFunction) {
  lcHref = location.href;
  lcHref = lcHref.setQueryValue("initFunction",pcFunction);
  location.replace(lcHref);
}
function selectContainerMenuFunction(pcFunction) {
  lcHref = location.href;
  lcHref = lcHref.setQueryValue("initContainer",pcFunction);
  location.replace(lcHref);
}
*/
function mouseOverMenuTab(phTab) {
  phTab.className="hover-" + phTab.className;
}
function mouseOutMenuTab(phTab) {
  if (phTab.className.substring(0,6)=="hover-") {
    phTab.className=phTab.className.substring(6);
  }
}

function resizeIframe(phIframe) {

  var lbResize = (bNewUI==false 
                  || location.href.getQueryValue('ipopup')=="true");
  
  if(phIframe.contentDocument==undefined) {
    var the_height=phIframe.contentWindow.getFrame.document.body.scrollHeight;
  }
  else {
  lhGetFrame
    =phIframe.contentDocument.getElementById('getFrame');
    
  //find the height of the internal page which is in a woframe frameset
  if (isIE) {
    var the_height=lhGetFrame.contentDocument.body.scrollHeight;
  } else {
    var the_height=lhGetFrame.contentDocument.body.offsetHeight;
  }
  }
  
  //change the height of the iframe
  // allow room for horizontal scrollbar + 30
  // we can only resize IFRAMEs
  if (phIframe.tagName=="IFRAME") {
    /* store original height of iframe and don't reduce from this */
    if(iframeData[phIframe.name]) { 
    }
    else {
      iframeData[phIframe.name]={origHeight:phIframe.height}
    }
    liOrig=iframeData[phIframe.name].origHeight;
    if (the_height<liOrig && lbResize) the_height=liOrig;
    the_height=parseInt(the_height);
    if(lbResize)
      phIframe.height=the_height + 6;
    else
      phIframe.height=the_height + 6;
  }
  else {
    while (phIframe.COINSMainFrame!=true&&phIframe!=top) {
      phIframe=phIframe.offsetParent;
      if (phIframe.tagName=="IFRAME") {

    /* store original height of iframe and don't reduce from this */
    if(iframeData[phIframe.name]) { 
    }
    else {
      iframeData[phIframe.name]={origHeight:phIframe.height}
    }
    liOrig=iframeData[phIframe.name].origHeight;
    
    /* allow 5px - sometimes we need a little more room */
    the_height = the_height + 5;
    
    if (the_height<liOrig && lbResize) the_height=liOrig;
    the_height=parseInt(the_height);
    
    /* if new height is only 32 pixels less then don't bother */ 
    if (the_height<phIframe.height                               
        && phIframe.height - the_height<=32)                     
          the_height=phIframe.height;                                
    
      iframeData[phIframe.name].origHeight=phIframe.height;
      }
    }
  }
  
  if($(document.body).hasClass('frameset')) {
    lhMenu=parent.document.getElementById('iframemenu');
    lhMenu.height=phIframe.height;
    hFrameset.resizeAll();
  };
  
  // hide/resize dropdown menu if present 
  try {
    hideAllBut(0);
  } catch(e) { }
    
}

/* called when a body resizes */
var hResize;
var bSkipStdResize = false;
function resizeBody() {

  if (bSkipStdResize)
    return;

  /* resize dropdown menus if present */
  try {
    setMenu();
    hideAllBut(0);
  } catch(e) { }
  
  /* resize tabs if present */
  try {
    resizeSubMenu();
  } catch(e) {}
  
  /* resize the iframe */
  if (document.body.className=="iframe" || document.body.className=="ipopup") {
    /* resize the iframe */
    lcIframe=parent.name;
    try {
      lhIframe=parent.parent.document.getElementById(lcIframe);

      lhIframes=parent.parent.jQuery('.inlineframe');
      for (var i = 0; i < lhIframes.length; i++) {
        if(lhIframes[i].name==lcIframe) {
          lhIframe=lhIframes[i];

      /*
      for (var i = 0; i < parent.parent.document.all.length; i++) {
        if(parent.parent.document.all[i].name==lcIframe) {
          lhIframe=parent.parent.document.all[i];
          */
          if (lhIframe!=null) {
            parent.parent.resizeIframe(lhIframe);
          }
        }
      }
    } catch(e) {}
  }
  
    jQuery('div.sectionbar.open div.sectionbarheader').each(function(){
        setSectionBarHeight.call(this);
    });

  if (location.href.getQueryValue("iframe")=="true") {
    try {
      window.parent.parent.resizeBody();
    } catch(e) {}
  }
  
  if (location.href.getQueryValue("ipopup")=="true") {
    try {
    
      liWidth=document.body.scrollWidth;
      liWidth=thisForm.children[0].scrollWidth;
      lcMinWidth=location.href.getQueryValue("ipopminwidth");

      if (liWidth<=500) liWidth=500;

      if (lcMinWidth!="") liWidth=parseInt(lcMinWidth); 
      parent.parent.matrixPopupDiv.style.width=liWidth + 'px';

      liHeight=document.body.scrollHeight;
      if (liHeight<=200) liHeight=200;
      parent.parent.matrixPopupDiv.style.height=liHeight + 'px';
    } catch(e) {}
  }
  
  /* only look for parents if not COINSMainFrame */
  if(typeof COINSMainFrame != "boolean" || COINSMainFrame != true) {
  /* if this page inside formcontainer (width/height) then full width */
  var containerIframe=getContainerIframe();
  var formcontainer$=parent.parent.$(containerIframe)
    .closest('div.formcontainer');
  if(formcontainer$.length==0) {
    $('div#browseDiv').css('width',document.body.clientWidth);
  }
  else {
    /* only resize if one iframe */
    var lhParentInlines=parent.parent.$('iframe.inlineframe:visible');
    if(lhParentInlines.length==1) {
      /* don't resize in layout */
      if($(lhParentInlines[0]).closest('tr.layoutrow')) {
      }
      else {
       var liHeight=formcontainer$.css('height');
       parent.parent.$(containerIframe).css('height',liHeight);
       parent.$('iframe').css('height',liHeight);
      }
    }
  }
  }
  
  var liWidth=document.body.clientWidth - 8;
 
  $formcontainer=$('div.formcontainer')
     .css('width',liWidth);

  positionCalendarControl();

  if (typeof resizeBodyExtra == 'function') {
    resizeBodyExtra();
  }
}

function getOffsetX(phObject) {
  x=0;
  while (phObject.offsetParent!=null) {
    x = x + phObject.offsetLeft;
    phObject = phObject.offsetParent;
  }
  return x;
}
function getOffsetY(phObject) {
  y=0;
  while (phObject.offsetParent!=null) {
    y = y + phObject.offsetTop;
    phObject = phObject.offsetParent;
  }
  return y;
}

function showWorkflow (phButton) {
  y=getOffsetY(phButton) + phButton.offsetHeight;
  x=getOffsetX(phButton) + phButton.offsetWidth - workflowdiv.offsetWidth;
  workflowdiv.style.left=x;
  workflowdiv.style.right=y;
  workflowdiv.style.visibility='visible';
}
 
function getCheckboxValue(pcName) {
  phObject = eval("thisForm." + pcName);
  lcVal="";
  for (i=0;i<phObject.length;i++) {
    if (phObject[i].checked) {
      lcVal = lcVal + "," + phObject[i].value;
    }
  }
  lcVal=lcVal.substring(1);
  return lcVal;
}

/* get a file name with/without extension */
function getFileName(pcName,pbExt,pcSep) {
  if (pcName==undefined) {
    return null;
  }
  if (pcSep==undefined) pcSep="\\";
  lcValue=pcName.getEntry(pcName.numEntries(pcSep) - 1,pcSep);
  if (pbExt==undefined) pbExt=true;
  if (pbExt) {
  }
  else {
    lcValue=lcValue.getEntry(0,".");
  }
  return lcValue;
}

function setDefaultValue(phObject,lcDefault) {
  for (i=0;i<phObject.options.length;i++) {
    if (phObject.options[i].value==lcDefault) {
      phObject.options[i].selected=true;
    }
  }
}

function showHideCOINSInfo(divID){
    divSign = el$(divID.id + 'sign');
    if (divID.style.display == 'none') {
      divID.style.display = '';
      divSign.src = '/coins/' + cWebImgs + '/images/minus.gif';
    }
    else {
      divID.style.display = 'none';
      divSign.src = '/coins/' + cWebImgs + '/images/plus.gif';
    }
    resizeBody();
}
             
function showHideAllCOINSInfo(mode){
  lhDivs=jQuery('.infoblock');

  count = lhDivs.length;
  for (i = 0;i< count ;i++ ) {
    lhDiv=lhDivs[i];
    if (lhDiv.className == 'infoblock') {
      divSign = eval(lhDiv.id + 'sign');
      if (mode == 'show') {
        lhDiv.style.display = ''
        divSign.src = '/coins/' + cWebImgs + '/images/minus.gif';
      }
      else {
        lhDiv.style.display = 'none';
        divSign.src = '/coins/' + cWebImgs + '/images/plus.gif';
      }
    }
  }
  resizeBody();
  
}

cParent='';
function postFunction() {
  var lcURL  = "wouajax.p?"
             + "ajaxmethod=syamsf01.setFunction";
  var lcFuncs='';
  var lcParent='';
  var lcAccess='';
  var lcRole='';
  parentOptions=document.getElementsByName('parentTick');
  accessOptions=document.getElementsByName('accessType');
  roleOptions=document.getElementsByName('roleType');
  parentFunctions=document.getElementsByName('parentFunction');
  for (i = 0;i< parentOptions.length ;i++ ) {
    lcFuncs=lcFuncs + ',' + escape(parentFunctions[i].innerText);
    if(parentOptions[i].checked) {
      lcParent = lcParent + ',Y';
    }
    else {
      lcParent = lcParent + ',N';
    }
    lcAccess = lcAccess + ',' + accessOptions[i].value;
    lcRole = lcRole + ',' + roleOptions[i].value;
  }
  lcFuncs=lcFuncs.substring(1);
  lcParent=lcParent.substring(1);
  lcAccess=lcAccess.substring(1);
  lcRole = lcRole.substring(1);
  loadXMLDoc(lcURL,'parentFunctions=' + lcFuncs
                 + '&parentTick=' + lcParent
                 + '&accessType=' + lcAccess
                 + '&roleType=' + lcRole
                 + '&parent=' + escape(cParent));
}

function setFunction(pcFunction) {
  cParent = pcFunction;
  parentOptions=document.getElementsByName('parentTick');
  parentParents=document.getElementsByName('parentParent');
  for (i = 0;i< parentOptions.length ;i++ ) {
    if(parentParents[i].innerText==pcFunction) {
      parentOptions[i].checked=true;
    }
  }
}

var hBodyUpdateTableRows;
var hBodyUpdateRightRows;
var hBodyUpdateTR=null;
var bBodyUpdateFreeze;
var cBodyUpdateActionUndo='';
var cBodyUpdateUndo = new Array();
var cBodyUpdateColClassUndo = new Array();
var cBodyAddValues='';
var cBodyExtraUndo='';
var bBodyUpdateAdd = false;
var hBodyUpdateThisForm;
var hUpdateDialog=null;
var hDetailDialog=null;
var hUpdateDialogTabs=null;
var hDetailDialogTabs=null;

function getBodyUpdateTR() {
    /* find the row with no id or the last row */
    for (i=0;i<hBodyUpdateTableRows.length;i++) {
      lhTR=hBodyUpdateTableRows[i];
      /* if column sets then ignore the <TR><TH> row */
      if (lhTR.id=="bodyTitle") continue;
      if (lhTR.className=="bodyspan") continue;
      if (replaceAll(lhTR.children[0].children[0].children[0].id,';','')
        =="") break;
    }
  return lhTR;
}
function getBodyInsertTR() {
    /* find the row with no id or the last row */
    for (i=0;i<hBodyUpdateTableRows.length;i++) {
      lhTR=hBodyUpdateTableRows[i];
      if (lhTR.id=="bodyTitle") continue;
      if (lhTR.children[0].className=="selected") break;
    }
  return lhTR;
}

function setTRClass(phTo,phFrom,pbSelect) {
  
  if(phFrom==null)
    lcFrom='';
  else {
    lcFrom=phFrom.className;
    lcFrom=((lcFrom.substring(0,3)=="odd")
            ?lcFrom.substring(3):lcFrom.substring(4));
  }
    
  lcTo=phTo.className;
  lcTo=((lcTo.substring(0,3)=="odd")?"odd":"even");
  phTo.className=lcTo + lcFrom;
  
  if(pbSelect) {
    if(phFrom==null) {
      phTo.children[0].className="select";
      lcSrc =
      phTo.children[0].children[0].children[0].src.replace('/selected.',
                                                           '/unselected.')
      phTo.children[0].children[0].children[0].src=lcSrc;
    }
    else
      phTo.children[0].className=phFrom.children[0].className;
  }
}

function ajaxBodyScrollUp(piRow) {

  /* get the TR of the main browse */
  hTable=jQuery("#browseContent")[0]
  hTableRows=hTable.children[0].children;
  hRightRows=null;
  
  lbFreeze=false;
  if (hTableRows[1].id=="freezeColumns") {
    hRightRows=el$('rightScrollTable').children[0].children;
    hTableRows=el$('leftScrollTable').children[0].children;
    lbFreeze=true;
    for (i=0;i<=10;i++) {
      if($(hRightRows[i]).hasClass("odd")) break;
    }
    liTitleRow=i - 1;
  }
  else {
    for (i=0;i<=10;i++) {
      if($(hTableRows[i]).hasClass("odd")) break;
    }
    liTitleRow=i - 1;
  }
  
  for (i=0;i<getTableRows(hTableRows);i++) {
    if(hTableRows[i].rowIndex>(liTitleRow + 1)
    && hTableRows[i].rowIndex<=piRow) {
      $(hTableRows[i]).children().each(function(col) {
        hPrevTR.children()[this.cellIndex].innerHTML= this.innerHTML;
      });
      setTRClass(hPrevTR[0],hTableRows[i],true);
    }
    hPrevTR=$(hTableRows[i]);
  }
  setTRClass(hTableRows[piRow],null,true);
  
  if(hRightRows) {
  for (i=0;i<getTableRows(hRightRows);i++) {
    if(hRightRows[i].rowIndex>(liTitleRow + 1)
    && hRightRows[i].rowIndex<=piRow) {
      $(hRightRows[i]).children().each(function(col) {
        hPrevTR.children()[this.cellIndex].innerHTML= this.innerHTML;
      });
      setTRClass(hPrevTR[0],hRightRows[i],false);
    }
    hPrevTR=$(hRightRows[i]);
  }
  setTRClass(hRightRows[piRow],null,false);
  
  }
  
}

function ajaxBodyScrollDown(piRow) {

  /* get the TR of the main browse */
  hTable=jQuery("#browseContent")[0]
  hTableRows=hTable.children[0].children;
  hRightRows=null;
  
  lbFreeze=false;
  if (hTableRows[1].id=="freezeColumns") {
    hRightRows=el$('rightScrollTable').children[0].children;
    hTableRows=el$('leftScrollTable').children[0].children;
    lbFreeze=true;
    for (i=0;i<=10;i++) {
      if($(hRightRows[i]).hasClass("odd")) break;
    }
    liTitleRow=i - 1;
  }
  else {
    for (i=0;i<=10;i++) {
      if($(hTableRows[i]).hasClass("odd")) break;
    }
    liTitleRow=i - 1;
  }

  for (i=getTableRows(hTableRows) - 1;i>piRow;i--) {
    if(hTableRows[i].rowIndex<(getTableRows(hTableRows) - 1)
    && hTableRows[i].rowIndex>=piRow) {
      $(hTableRows[i]).children().each(function(col) {
        hPrevTR.children()[this.cellIndex].innerHTML= this.innerHTML;
      });
      setTRClass(hPrevTR[0],hTableRows[i],true);
    }
    hPrevTR=$(hTableRows[i]);
  }
  setTRClass(hTableRows[piRow + 1],null,true);
  hTableRows[piRow + 1].children[0].children[0].children[0].id='';
  hTableRows[piRow + 1].children[0].children[0].children[0].name='';
  
  if(hRightRows) {
  for (i=getTableRows(hRightRows) - 1;i>piRow;i--) {
    if(hRightRows[i].rowIndex<(getTableRows(hRightRows) - 1)
    && hRightRows[i].rowIndex>=piRow) {
      $(hRightRows[i]).children().each(function(col) {
        hPrevTR.children()[this.cellIndex].innerHTML= this.innerHTML;
      });
      setTRClass(hPrevTR[0],hRightRows[i],true);
    }
    hPrevTR=$(hRightRows[i]);
  }
  setTRClass(hRightRows[piRow + 1],null,false);
  
  }

}

function ajaxBodyUpdateSave(phSave,pcButton,piAttempt) {

  /* wait for ajax validation to complete */
  if (piAttempt==undefined) piAttempt=1;
  if (myrequests.length!=0) {
    if (piAttempt>=10) {
      hCOINSMain.coinsError(cAjaxRequestsActive);
    }
    else {
      setTimeout(function(){ajaxBodyUpdateSave(phSave,pcButton,piAttempt)},100);
    }
    return false;
  }

  /* check mandatory fields */
    lcFieldErrors=checkMandatoryFields();
    
    if (lcFieldErrors!="") {
      hCOINSMain.coinsError(lcFieldErrors);
      return false;
    }
    
  lcValues=getInputFields().substring(1);
  lcHref=location.href;
  lcHref=lcHref.setQueryValue('getAjaxData','Y');
  lcHref=lcHref.setQueryValue('Button',pcButton);
  setAjaxDataBusy();
  /* set save button */
  setSaveButton(phSave,"save_i.gif");
  hideSaveButton();
  loadXMLDoc(lcHref,lcValues);
}

function ajaxBodyUpdateWarning(input,result) {
  if(ajaxWarning(input,result)==false) ajaxBodyUpdateReset();
}

function ajaxBodyUpdateUndo() {
   ajaxBodyUpdateUndo(true);
}
function ajaxBodyAddUndo() {
  ajaxBodyUpdateUndo(false);
}
function ajaxBodyAddCancel() {
  /* now replace the contents of the action column
     with a normal update button */
  liRow=hBodyUpdateTR.rowIndex;
  if(liRow<(hBodyUpdateTableRows.length - 1)) 
    liFrom=(hBodyUpdateTableRows.length - 1)
  else
    liFrom=liRow - 1;
    
  hBodyUpdateTableRows[liRow].children[1].innerHTML
    = hBodyUpdateTableRows[liFrom].children[1].innerHTML;

   hBodyUpdateTR=null;
   cBodyUpdateUndo.length=0;
   cBodyUpdateColClassUndo.length=0;
   bBodyUpdateAdd=false;

}

function ajaxBodyUpdateUndo(pbReset,pbShowExtra) {

  if(bAllowUnload==true 
    || $('button[href="save"]').is(':visible') == false
    || confirm(cSureUndo)) {

   clearPageTimeout();

   bAllowUnload=bSaveAllowUnload; //set back to original setting. ajaxAfterInlineUpdate sets to true.

   hCOINSMain.showAjaxFields(cMainArea + "_AJAXBODYUPD",false);
   hCOINSMain.showAjaxFields(cMainArea + "_AJAXBODYDET",false);

    if(hBodyUpdateTR && hBodyUpdateTR.children[0].rowSpan==2) {
      hBodyUpdateTR.children[0].rowSpan=1;
      $(hBodyUpdateTR).next().remove();
    }
    
    ajaxDeleteLookups();

  if(hBodyUpdateTR && cBodyUpdateUndo.length>0) {
  liCol =showBodyData(null,hBodyUpdateTableRows,
                      hBodyUpdateTR.rowIndex,0,bBodyUpdateFreeze,false);
  
  if(bBodyUpdateFreeze) {
    showBodyData(null,hBodyUpdateRightRows,
                 hBodyUpdateTR.rowIndex,liCol,bBodyUpdateFreeze,false);
    setFreezeRowHeight(hBodyUpdateTableRows,hBodyUpdateRightRows,
                       hBodyUpdateTR.rowIndex);
    setFreezeOverflow();
  } 

  if(pbReset==false && pbShowExtra && cBodyExtraUndo) {
  hBodyUpdateTR.children[0].rowSpan=2;
  $(hBodyUpdateTR).after(cBodyExtraUndo);
  }
  
  }
  
  if(pbReset==true) {
   hBodyUpdateTR=null;
   cBodyUpdateUndo.length=0;
   cBodyUpdateColClassUndo.length=0;
  }
   
  ajaxStatusNew();
  
  }
   
}

function ajaxBodyAdd(input,result) {
  ajaxBodyUpdate(input,result,false,'A');
}
function ajaxBodyInsert(input,result) {
  ajaxBodyUpdate(input,result,false,'I');
}
function ajaxBodyShow(input,result) {
  ajaxBodyUpdate(input,result,false,'');
}
function ajaxBodyOpen(input,result) {
  /* switch off tooltips to allow innerHTML to contain titles */
  try {
    jQuery(document).tooltip('destroy');
  } catch(e) { }
  showSelectedRows(input);
  ajaxBodyUpdate(input,result,true,'');
  setTooltips();
  setColourPickers();
}
function ajaxBodyUpdateReset() {
  hCOINSMain.mainarea.getFrame.setDialogOverlay(false);
  resetAjaxDataBusy();
  showSaveButton();
}
function setDialogOverlay(pbShow) {
  if (pbShow)
    $('.dialog_overlay').css('display', 'flex');
  else
    $('.dialog_overlay').css('display', 'none');
}
function ajaxBeforeInlineDetail(input,result) {
  if(typeof beforeInlineDetail=="function") beforeInlineDetail();
}
function ajaxBeforeInlineUpdate(input,result) {
  if(typeof beforeInlineUpdate=="function") beforeInlineUpdate('U');
}
function ajaxAfterInlineUpdate(input,result) {
  if(typeof afterInlineUpdate=="function") {
     bAllowUnload=true;  //to ensure unload page warning does not display after record committed.
     afterInlineUpdate('U');
  }
}

function getTableRows(phTableRows) {
  var i;
  for (i=phTableRows.length;i>0;i--) {
    if(phTableRows[i - 1].className!='total'
       &&
       phTableRows[i - 1].className!='') return i;
  }
  return 0;
}

function ajaxBodyUpdate(input,result,pbOpen,pcAction) {
  /* {row:{rowids:"0x00",buttons:"",col:["A","B"],colClass:["",""]}} */
 
  /* get the TR of the main browse */
  hTable=jQuery("#browseContent")[0]
  hTableRows=hTable.rows;

  for (i=0;i<=2;i++) {
    if(hTableRows[i].id!="bodyTitle") break;
  }
  
  hBodyUpdateTableRows=hTableRows;

  lbFreeze=false;
  if (hTableRows[i].id=="freezeColumns") {
    hRightRows=el$('rightScrollTable').rows;
    hTableRows=el$('leftScrollTable').rows;
    lbFreeze=true;
    hBodyUpdateTableRows=hTableRows;
    hBodyUpdateRightRows=hRightRows;
  }

  if(result=="!") {
    bBodyUpdateAdd=true;
    hBodyUpdateTR=getBodyUpdateTR();
  }

  if(pbOpen==false && (pcAction=="A" || pcAction=="I")) {
    if(typeof afterInlineUpdate=="function") afterInlineUpdate(pcAction);
  }
  
  if(pcAction=='') {

    /* undo any previous */
    ajaxBodyUpdateUndo(true);
    /* if in add mode then cancel add */
    if(bBodyUpdateAdd) {
      bBodyUpdateAdd=false;
      ajaxBodyUpdate('','',true,'A');
    }
  }

  /* reset the cursor */
  ajaxBodyUpdateReset();
 
  if(result=="!") {
    hBodyUpdateTR=getBodyUpdateTR();
    if(hBodyUpdateTR && hBodyUpdateTR.children[0].rowSpan==2) {
      cBodyExtraUndo=hTableRows[hBodyUpdateTR.rowIndex + 1].outerHTML;
    }
  }
  else {
    if(hBodyUpdateTR && hBodyUpdateTR.children[0].rowSpan==2) {
      hBodyUpdateTR.children[0].rowSpan=1;
      $(hBodyUpdateTR).next().remove();
    }
  }
  
  if(result=="!") {
    if(typeof beforeInlineUpdate=="function") beforeInlineUpdate(pcAction);
  }
  
  if(pcAction=="A") {
    if(bSingleAdd && bSingleAdd==true) {
      var lchref=location.href;
      lchref=lchref.setQueryValue("Button","action:prev");
      lchref=lchref.setQueryValue("lastRowid",result.row.rowids);

      if (hUpdateDialog)
        ajaxUpdateClose();

      location.replace(lchref);

      return;
    }
    else {
     lhTR=getBodyUpdateTR();
     
     if(pbOpen==false) {
      if(lhTR.rowIndex==getTableRows(hTableRows) - 1) {
        ajaxBodyScrollUp(lhTR.rowIndex - 1);
        lhAddTR=lhTR;
        lhTR=hTableRows[lhTR.rowIndex - 1];
      }
      else {
        lhAddTR=hTableRows[lhTR.rowIndex + 1]
      }
     }
    }
  }
  else if(pcAction=="I") {
    if(hUpdateDialog)
      lhTR=getBodyInsertTR();
    else
      lhTR=getBodyUpdateTR();
    if(pbOpen==false) {
      if(lhTR.rowIndex==getTableRows(hTableRows) - 1) {
        ajaxBodyScrollUp(lhTR.rowIndex - 1);
        lhAddTR=lhTR;
        lhTR=hTableRows[lhTR.rowIndex - 1];
      } 
      else {
       if(hUpdateDialog) {
        ajaxBodyScrollDown(lhTR.rowIndex - 1);
       }
       else {
        ajaxBodyScrollDown(lhTR.rowIndex);
        lhAddTR=hTableRows[lhTR.rowIndex + 1];
       }
      }
    }
  }
  else {
    lhImage=jQuery(el$(input))[0];
    if(lhImage!=undefined)
      lhTR=lhImage.parentNode.parentNode.parentNode;
  }
  
  bBodyUpdateFreeze=lbFreeze;
  hBodyUpdateTR=lhTR;
  
  liCol
   =showBodyData(result,hBodyUpdateTableRows,lhTR.rowIndex,0,lbFreeze,pbOpen,pcAction);
   
  if(lbFreeze) {
  showBodyData(result,hBodyUpdateRightRows,lhTR.rowIndex,liCol,lbFreeze,pbOpen,pcAction);
  setFreezeRowHeight(hBodyUpdateTableRows,hBodyUpdateRightRows,lhTR.rowIndex);
  }
  
  if(hUpdateDialog) {
  }
  else {
    if((pcAction=="A" || pcAction=="I") && result!="") {
      if(thisForm.returnLookup) {
        thisForm.returnLookup.click();
        return;
      }
      else {
        if(bSingleAdd==false && typeof lhAddTR != 'undefined') {
          hBodyUpdateTR=lhAddTR;
          if(bAllowUnload)
            ajaxBodyUpdateUndo(false,true);
          else {
            bAllowUnload=true;
            ajaxBodyUpdateUndo(false,true);
            bAllowUnload=false;
          }
            
        }
      }
    }
  }
  
  setFreezeOverflow();
  
  if(pbOpen==false && (pcAction=="A" || pcAction=="I") && bSingleAdd==false) {
    ajaxCreateLookups();
    if(typeof beforeInlineUpdate=="function") beforeInlineUpdate(pcAction);
  }
  
  setTimeout(function() {
    focusFirstField();
  },1);
    
}

/* phData is object of HTML to insert in to columns
   OR
   null  to replace with UNDO
   blank to replace with blanks (stop adding)
   !     to store current values for add reset */
function showBodyData(phData,phRows,piIndex,iStartCol,pbFreeze,pbOpen,pcAction) {
  lbSet=((phData=="!" || phData==null)?false:true);
  
  removeTooltips();
  
  var liCol=0;
  var liActionColumn;
  
  hTableRows=jQuery(phRows);

  if (iStartCol == 0 && jQuery('#bodyHead, #bodyHeadleft').find('th#action').length > 0)
    liActionColumn = 1;

      hTR=jQuery(phRows[piIndex]);
      liCol = iStartCol;

      hTR.children().each(function(col) {
        /* this is the TD */
        
         /* col==0 is the select column */
         if (col==0 && iStartCol==0 ) {
           /* set the name on the selected/unselected image */
           if(lbSet){
             lcSrc=this.children[0].children[0].src;
             if(phData.row){
             this.children[0].children[0].name=phData.row.rowids;
             this.children[0].children[0].id=phData.row.rowids;
             this.children[0].children[0].src
               =lcSrc.replace('blank.','unselected.');
             }
             else {
             this.children[0].children[0].name='';
             this.children[0].children[0].id='';
             }
           }
         }
         /* col==1 is the open/detail column unless suppressed */
         else if (col==liActionColumn) {
           /* this is TD cell */
           if(phData==null) {
             this.innerHTML=cBodyUpdateActionUndo;
           } 
           else {
             if(pbOpen)cBodyUpdateActionUndo=this.innerHTML;
             if(lbSet){
               if(phData=="") {
                 this.innerHTML='';
               }
               else if(phData.row.buttons!=undefined) {
                 this.innerHTML=phData.row.buttons
                               + phData.row.essFields;
               } else {
                 this.children[0].id="action:open:"
                                    + phData.row.rowids
                                    + ":ajax";
               }

               if (pcAction == 'A') {
                 /* If it's a newly added row, then mark it */
                 this.dataset.ajaxAppended = 'true';
               }
             }
           }
         }
         else {
           liCol = liCol + 1;
           if(pbFreeze) {
             /* frozen columns inside a DIV */
             if(phData==null) {
               this.children[0].innerHTML=cBodyUpdateUndo[liCol-1];
             }
             else {
               if(pbOpen)cBodyUpdateUndo[liCol-1]=this.children[0].innerHTML;
               if(lbSet){
                 if(phData=="") {
                   this.children[0].innerHTML='';
                 }
                 else {
                   this.children[0].innerHTML=phData.row.col[liCol-1];
                 }
               }
             }
           }
           else {
             if(phData==null) {
               this.innerHTML=cBodyUpdateUndo[liCol-1];
             } 
             else {
               if(pbOpen)cBodyUpdateUndo[liCol-1]=this.innerHTML;
               if(lbSet) {
                 if(phData=="") {
                   this.innerHTML='';
                 }
                 else {
                   this.innerHTML=phData.row.col[liCol-1];
                 }
               }
             }
           }

           if(phData==null) {
             lcClass=cBodyUpdateColClassUndo[liCol-1];
           }
           else {
             if(pbOpen)
               cBodyUpdateColClassUndo[liCol-1]=this.className.substring(4);
             if(lbSet){
               if(phData==""){
                 lcClass='';
               } else {
                 lcClass=phData.row.colClass[liCol-1];
               }
             }
           }
                
           if(lbSet) {     
            if (this.className.substring(0,3)=="odd") {
              this.className="odd" + lcClass;
            }
            else {
              this.className="even" + lcClass;
            }
           }
           
         }
      })

  return liCol;
}

function ajaxRecheadDialog(input,result) {
  /* {row:{rowids:"0x00",col:["A","B"],colClass:["",""]}} */

  lcCols=result.row.col;
  for (i=0;i<lcCols.length;i++){
    lhField=el$('rec' + input + 'dialog' + (i + 1));
    if(lhField)lhField.innerHTML=lcCols[i];
  }

}
  
function ajaxUpdateDialog(input,result) {
  /* {row:{rowids:"0x00",col:["A","B"],colClass:["",""]}} */

   hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDHEAD",true);
   hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDATE",true);

  lcCols=result.row.col;
  for (i=0;i<lcCols.length;i++){
    lhField=el$(input + 'dialog' + (i + 1));
    if(lhField)lhField.innerHTML=lcCols[i];
  }
  
  ajaxBodyUpdateReset();
  if(input=='detail') {
    if(typeof beforeDetailDialog=="function") beforeDetailDialog();
    buildDetailDialog();
  }
  else {
    hBodyUpdateThisForm=thisForm;
    thisForm=updatedialogform;
    updatedialogform.coinsbutton.value
      ="action:open:" + result.row.rowids + ":ajax"
    if(typeof beforeUpdateDialog=="function") beforeUpdateDialog('U');
    buildUpdateDialog();
    if(window==hCOINSMain.mainarea.getFrame)
      ajaxCreateLookups();
    else
      ajaxUpdateCreateLookups();
    hUpdateDialog.dialog('option','title',
      el$('updatedialogtitle').innerHTML.getEntry(2,'/'));
    hCOINSMain.mainarea.getFrame.focusFirstField();
    hCOINSMain.mainarea.getFrame.resetValueChanged(hCOINSMain.mainarea.getFrame.hThisField)
  }
}

function ajaxAddDialog() {

   hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDHEAD",true);
   hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDATE",true);

    hBodyUpdateThisForm=thisForm;
    thisForm=updatedialogform;
    updatedialogform.coinsbutton.value
      ="action:add::ajax";
    if(typeof beforeUpdateDialog=="function") beforeUpdateDialog('A');
    buildUpdateDialog();
    if(window==hCOINSMain.mainarea.getFrame)
      ajaxCreateLookups();
    else
      ajaxUpdateCreateLookups();
    hUpdateDialog.dialog('option','title',
      el$('updatedialogtitle').innerHTML.getEntry(0,'/'));
    hCOINSMain.mainarea.getFrame.focusFirstField();
    hCOINSMain.mainarea.getFrame.resetValueChanged(hCOINSMain.mainarea.getFrame.hThisField)
}

function ajaxInsertDialog() {

   hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDHEAD",true);
   hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDATE",true);

    hBodyUpdateThisForm=thisForm;
    thisForm=updatedialogform;
    updatedialogform.coinsbutton.value
      ="action:insert:" + cSelectedRowids + ":ajax";
    if(typeof beforeUpdateDialog=="function") beforeUpdateDialog('I');
    buildUpdateDialog();
    if(window==hCOINSMain.mainarea.getFrame)
      ajaxCreateLookups();
    else
      ajaxUpdateCreateLookups();
    hUpdateDialog.dialog('option','title',
      el$('updatedialogtitle').innerHTML.getEntry(1,'/'));
    hCOINSMain.mainarea.getFrame.focusFirstField();
    hCOINSMain.mainarea.getFrame.resetValueChanged(hCOINSMain.mainarea.getFrame.hThisField)
}

function ajaxUpdateSetValue(input,result) {
  var lhField=hCOINSMain.mainarea.getFrame.updatedialogform[input];
  if(lhField)lhField.value=result;
}

function ajaxUpdateReset() {
  resetAjaxDataBusy();
} 
function ajaxUpdateClose() {
  ajaxUpdateReset();
  hCOINSMain.mainarea.getFrame.updatedialogform.setAttribute('data-formok','true');
  thisForm=hBodyUpdateThisForm;
  if(typeof afterUpdateDialog=="function") afterUpdateDialog('U');
  hUpdateDialog.dialog('close'); 
}

function ajaxAddReset(input,result) {
  if(typeof afterUpdateDialog=="function") afterUpdateDialog(input);

  lcValues=cBodyAddValues.split('&');
  for (i=0;i<lcValues.length;i++) {
    lcName=lcValues[i].getEntry(0,'=')
    if(lcName=="coinsbutton") continue;
    lcValue=lcValues[i].substring(lcName.length + 1);
    lhField=hCOINSMain.mainarea.getFrame.updatedialogform[lcName];
    lhField.value=lcValue;
  }
  
  if(typeof afterUpdateDialog=="function") beforeUpdateDialog(input);

  resetUpdateDialog(hCOINSMain.mainarea.getFrame.updatedialogform);
  hCOINSMain.mainarea.getFrame.focusFirstField();  
}

function ajaxBodyExtraDetail(input,result) {
  hCOINSMain.showAjaxFields(cMainArea + "_AJAXBODYDET",true);
  ajaxBodyExtra('Detail',input,result);
}
function ajaxBodyExtraUpdate(input,result) {
  hCOINSMain.showAjaxFields(cMainArea + "_AJAXBODYUPD",true);
  ajaxBodyExtra('Update',input,result);
}

function ajaxBodyExtra(pcType,input,result) {
  /* {row:{rowids:"0x00",col:["A","B"],colClass:["",""]}} */
 
  lcForm=el$('body' + pcType + 'Form').value;
  
  lcCols=result.row.col;
  for (i=0;i<lcCols.length;i++){
    lcForm=lcForm.replace('&' + (i + 1) + '&',lcCols[i].replace("$","$$$$"));
  }
  
  /* detail already showing */
  if(hBodyUpdateTR && hBodyUpdateTR.children[0].rowSpan==2) {
    $(hBodyUpdateTR).next().remove();
  }
  
  hBodyUpdateTR.children[0].rowSpan=2;
  $(hBodyUpdateTR).after(lcForm);
   
}

function ajaxData(input,result) {
  var lbFreeze=false;

  /* undo any update */
  ajaxBodyUpdateUndo(true);
  
  removeTooltips();
  
  /* reset the cursor */
  resetAjaxDataBusy();
  
  /* result.data is an array of rows 
     each has an object with fields and arrays of fields and classes 
   e.g.
   {data:[{row:{rowids:"0x00",keyValue:""..,col:["A","B"],colClass:["",""]}},
          {row:{rowids:"0x00",keyValue:""..,col:["A","B"],colClass:["",""]}}
         ]}
  */
  hData=result.data;
  /* get the TRs of the main browse */
  hTable=jQuery("#browseContent")[0]
  hTableRows=jQuery(hTable.children[0]).children("TR");
  
  for (i=0;i<=2;i++) {
    if(hTableRows[i].id!="bodyTitle") break;
  }
  
  if (hTableRows[i].id=="freezeColumns") {
    hRightRows=el$('rightScrollTable').children[0].children;
    hTableRows=el$('leftScrollTable').children[0].children;
    lbFreeze=true;
  }
  
  liCol = showRowData(hTableRows,0,lbFreeze);
  
  if(lbFreeze) {
    showRowData(hRightRows,liCol,lbFreeze);
  } /* lbFreeze */
  
  showSelectedRows(cSelectedRowids);
  
  setTooltips();
  
  if(typeof afterAjaxData=="function") afterAjaxData();
  
}

function showRowData(phRows,iStartCol,pbFreeze) {

  var liRow=0;
  var liCol=0;
  var liActionColumn;
  
  hTableRows=jQuery(phRows);
  hTableRows.each(function(row) {
    /* ignore header row(s) */
    if(this.id=="bodyTitle") {
      /* ignore bodyTitle line */
    }
    else if(this.children[0].tagName=="TH") {
      if(this.children[1] && this.children[1].id=="action") liActionColumn=1;
    }
    else if($(this).hasClass('total')) {
      /* ignore total line */
    }
    else {
      /* this is the <TR> object */
      hTR=jQuery(this);
      
      liRow = liRow + 1;
      liCol = iStartCol;
      
      if(bNewUI) {
        if(liRow>hData.length)
          hTR.removeClass('activerow');
        else
          hTR.addClass('activerow');
      }

      hTR.children().each(function(col) {
        /* this is the TD */
        
        if (liRow>hData.length) {
         /* col==0 is the select column */
         if (col==0 && iStartCol==0) {
           /* set the name on the selected/unselected image */
           this.children[0].children[0].name='';
           this.children[0].children[0].id='';
         }
         else if (col==liActionColumn && iStartCol==0) {
           setRowButtons(this,'none','','','','');
         }
         else {
           liCol = liCol + 1;
           
           if(pbFreeze) {
             /* frozen columns inside a DIV */
             if(this.children[0].tagName.toLowerCase()=="nobr")
             this.children[0].children[0].innerHTML='';
             else
             this.children[0].innerHTML='';
           }
           else {
             this.innerHTML='';
           }
           
           /* add default classes */
           try {
             lcDefClass=cDefaultClass[liCol - 1];
           } catch(e) {
             lcDefClass='';
           }
             
           if (this.className.substring(0,3)=="odd") {
             this.className="odd" + lcDefClass;
           }
           else {
             this.className="even" + lcDefClass;
           }
         }
        }
        else {
         /* col==0 is the select column */
         if (col==0 && iStartCol==0 ) {
           /* set the name on the selected/unselected image */
           this.children[0].children[0].name=hData[liRow-1].row.rowids;
           this.children[0].children[0].id=hData[liRow-1].row.rowids;
         }
         /* col==1 is the open/detail column unless suppressed */
         else if (col==liActionColumn) {
           setRowButtons(this,'',hData[liRow-1].row.rowids,
                                 hData[liRow-1].row.keyValue,
                                 hData[liRow-1].row.lookupValue,
                                 hData[liRow-1].row.lookupHref);
         }
         else {
           liCol = liCol + 1;
           if(pbFreeze) {
             /* frozen columns inside a DIV */
             if(this.children[0].tagName.toLowerCase()=="nobr")
             this.children[0].children[0].innerHTML
               =hData[liRow-1].row.col[liCol-1];
             else
             this.children[0].innerHTML=hData[liRow-1].row.col[liCol-1];
           }
           else {
             this.innerHTML=hData[liRow-1].row.col[liCol-1];
           }

           if(bNewUI) {
              this.className=hData[liRow-1].row.colClass[liCol-1];
           }
           else {
            if (this.className.substring(0,3)=="odd") {
              this.className="odd" + hData[liRow-1].row.colClass[liCol-1];
            }
            else {
              this.className="even" + hData[liRow-1].row.colClass[liCol-1];
            }
           }
            
         }
        }
      })
    }
  })
  return liCol;
}


function setRowButtons(phTD,pcStyle,pcRowid,pcCode,pcLookup,pcHref) {
  phTD=jQuery(phTD);
  phTD.children().each(function() {
    /* this is the contents of the TD */
    /* we're looking for <A><IMG> for open and detail */
    lcAction=this.id.getEntry(0,':');
    if (lcAction=="action"){
      this.style.display=pcStyle;
      this.id=this.id.setEntry(2,pcRowid,':');
    }
    else if(lcAction=="choose") {
      this.style.display=pcStyle;
      this.value=pcCode;
      this.lookupCode=pcLookup
      /* next two sibliings contain hidden INPUT with values */
      this.nextSibling.value=pcCode;
      this.nextSibling.nextSibling.value=pcLookup;
    }
    else if(lcAction="forward") {
      if (pcHref=="") pcStyle="none";
      this.style.display=pcStyle;
      this.onclick=function()
        {location.href=eval("'" + pcHref + "'");return false;}
    }
  });
}

function setThisImage(pcObject,pcType) {
  phObject = document.getElementById(pcObject);
  /*
  lcID=phObject.imageID;
  //lcID = getObjectAttr(phObject,'imageID');
  hImg=document.getElementById(lcID);*/
  hImg=phObject.children[0];
  lcSrc=setImage(phObject,pcType);
  hImg.src=lcSrc;
}
function ajaxSetNavigation(pcInput,pcResult) {
  /* pcresult = <before>,<after> where <before> and <after> are logicals */
  if (pcResult.getEntry(0)=="yes") {
    setThisImage('first','');
    setThisImage('prev','');
  } else {
    setThisImage('first','_i');
    setThisImage('prev','_i');
  }
  if (pcResult.getEntry(1)=="yes") {
    setThisImage('next','');
    setThisImage('last','');
  } else {
    setThisImage('next','_i');
    setThisImage('last','_i');
  }
}

function setButtonBusy(phButton,pcColour) {
  var lhButton = (typeof phButton == 'string' ? $('button#' + phButton) : $(phButton));
  lhButton.disable(true);

  var lhImg = lhButton.find('img')[0];
  if(lhImg) {
   lhImg.setAttribute('data-src',lhImg.src);
   if(bNewUI) {
     if(pcColour==undefined)
       lhImg.src='/coins/' + cWebImgs + '/images/busy.svg';
     else
       lhImg.src=getSVGURL('busy$',pcColour);
     $(lhImg).addClass('fa-spin');
   }
   else
     lhImg.src='/coins/' + cWebImgs + '/images/busy.gif'
  }
}
var hProgressAnimation;
/* handle to the showing of the overlay - to cancel if too short */
var hOverlay;
var jtOverlayStart;
function progressAnimation(pcAnimation) {

  if(pcAnimation) {
  
      if (typeof lottie == "object") {
        if(hProgressAnimation) hProgressAnimation.destroy();
        hProgressAnimation 
           = lottie.loadAnimation({
          container: $('table.progress div#animation')[0],
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: '/coins/' + cWebImgs + '/images/' + pcAnimation + '.json'
        });
      }

    if($('#overlay').is(':hidden')) {
    
      clearProgress();
      
      $('div.progressbar').css({width:0,transition:""});
      hOverlay=setTimeout(function() {
      
          document.getElementById("overlay").style.display = "flex";
          jtOverlayStart=new Date();
 
          setTimeout(function() {
            $('div.progressbar').css({width:"95%",transition:iDataTimer + 's'})
          },100);

      },iOvDelay);
    }
    
  }
  else {
    if(hProgressAnimation) hProgressAnimation.destroy();
    hProgressAnimation=undefined;
  }
}
function resetButtonBusy(phButton) {
  var lhButton = (typeof phButton == 'string' ? $('button#' + phButton) : $(phButton));
  lhButton.disable(false);

  var lhImg = lhButton.find('img')[0];
  if (lhImg!=undefined){
    if(lhImg.getAttribute('data-src')!=null)
      lhImg.src=lhImg.getAttribute('data-src',lhImg.src);
    $(lhImg).removeClass('fa-spin');
  }
  progressAnimation();
}

function clearProgress() {
  $('td#progresstimer').text('');
  $('td#progressinfo').text('');
  $('td#progresscount').text('');
}
function setAjaxDataBusy() {
  document.body.style.cursor='progress'
  hA=jQuery('#filterSelected')[0];
  hA.style.display="none";
  jQuery('#browseBusy').show();
}
function resetAjaxDataBusy() {
  var liOverlay;
  document.body.style.cursor=''
  hA=jQuery('#filterSelected')[0];
  hA.style.display="";
  
  if(hOverlay) clearTimeout(hOverlay);
  
  if($('#overlay').is(':visible')) {
  
    liOverlay = new Date() - jtOverlayStart;
    liOverlay = iOvMin - liOverlay;
   
    setTimeout(function() {
        progressAnimation();
        document.getElementById("overlay").style.display = "";
      },liOverlay
     );
  }

  jQuery('#browseBusy').hide();
}
function cancelOverlay() {
  progressAnimation();
  document.getElementById("overlay").style.display = "";
  if(hOverlay) clearTimeout(hOverlay);
  generateCancel();
}

var hGenerate;
var jGenerateStart;
var hGenerateTimer;
var iGenerateTimer = 5;
var iGenerateCount;
var hGenerateCount;
var cGenerateCount;
var bGenerateCount;
var iDataTimer = 2;

function startGenerateTimer() {

  progressAnimation('generate');        
  jGenerateStart = new Date();
  document.getElementById("progresscount").innerHTML='0';
  showGenerateTimer();
  hGenerateTimer=setInterval(showGenerateTimer,1000);
  iGenerateCount = 0;
  bGenerateCount = false;
  hGenerateCount=setInterval(getGenerateCount,1000);
}
function showGenerateTimer() {
  var iElapsed=Math.floor((new Date() - jGenerateStart) / 1000);
  var iMins=Math.floor(iElapsed / 60);
  var iSec =iElapsed%60;
  var cSec = iSec.toString();
  if (cSec.length<2) cSec="0" + cSec;
//  document.getElementById("progresstimer").innerHTML=iMins + ":" + cSec;
}
function getGenerateCount() {
  iGenerateCount++;
  if(bGenerateCount==false) {
    bGenerateCount=true;
    hGenerate=ajaxGet("syagen.genCount",
                      setQueryValue('MainArea',cMainArea + 'G'));
  }
  if (iGenerateCount>5) {
    clearInterval(hGenerateCount);
    hGenerateCount=setInterval(getGenerateCount,2000);
  }
}
function stopGenerateTimer() {
  clearInterval(hGenerateTimer);
  clearInterval(hGenerateCount);
}
function generateCancel() {
  stopGenerateTimer();
  deleteAjaxRequest(hGenerate);
  ajaxGet("syagen.genCancel",setQueryValue('MainArea',cMainArea + 'G'));
}

/* Function to call ActiveX help */
features = "toolbar=no,left=100,top=100,scrollbars=yes,resizable=yes,width=750,height=500,menubar=no,location=no";
winname="helpmain";

function openHelp(topic){
  var w = window.open(topic,winname,features);
  w.focus();
}

function buttonAction()
{
  var lcButton = location.href.getQueryValue("Button").split(":");

  if (lcButton[0] != "action")
    return "";

  return lcButton[1];
}

function bulkMode()
{
  return location.href.getQueryValue("bulkmaint").toLowerCase() == "form";
}

function singleEdit()
{
  if ( bulkMode() )
    return false;

  var lcButtonAction = buttonAction();
  if (lcButtonAction != "open" && lcButtonAction != "add"
      && lcButtonAction != "insert" && lcButtonAction != "copy")
    return false;
  
  return true;
}

function showInfo(pcText) {
  try {hMessageWindow} catch(e) {hMessageWindow=window}
  hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
  + "/images/"
  + ((bNewUI)?'info.svg':'info.gif') 
  + "'>" + pcText,title:"Info"});
}

function showError(pcText) {
  try {hMessageWindow} catch(e) {hMessageWindow=window}
  hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
  + "/images/"
  + ((bNewUI)?'error.svg':'error.gif') 
  + "'>" + pcText,title:"Error"});
}

function showWarning(pcText) {
  try {hMessageWindow} catch(e) {hMessageWindow=window}
  hMessageWindow.dhtmlx.message({text:"<img src='/coins/" + cWebImgs 
  + "/images/"
  + ((bNewUI)?'warning.svg':'warning.gif') 
  + "'>" + pcText,title:"Warning"});
}

function activateTab(pcID,piIndex) {
  if(piIndex==-1) {
    if(pcID=='detaildialog')
      piIndex=hDetailDialogTabs.tabs('option','active');
    else
      piIndex=hUpdateDialogTabs.tabs('option','active');
  }
  lhTab=el$(pcID + 'tabs');
  if(lhTab) {
   lhPane=lhTab.children[piIndex + 1];
   $('iframe.inlineframe',lhPane).each(function(piIndex,phIframe){
     if(phIframe.contentWindow.location.href=='about:blank') {
       lcHref=phIframe.name;
       lcHref=lcHref.substring(lcHref.indexOf('|') + 1);
       lcHref=lcHref.setQueryValue('getAjaxData','');
       if(bNewUI)
         lcHref=lcHref.setQueryValue('pvFrame',
                                     'F,'
                                   + phIframe.offsetWidth
                                   + ','
                                   + phIframe.offsetHeight);
       phIframe.contentWindow.location.href=lcHref;
     }
   });
  }
}

var $filter;
function buildAdvancedFilter() {

  var liWidth=0,lcTitle="",liHeight=0,liMaxHeight;
  var $div=$("div#advancedFilterDiv");
  var lbOpen=($div[0].style.display!="none");
  liWidth=document.body.clientWidth - 40;
  /* height + 120 for header and buttons */
  liHeight=$("div#advancedFilterContainer").height() + 120;
  liHeight=realHeight(advancedFilterDiv) + 115;
  
  /* max 90% height */
  liMaxHeight=(0.9*document.body.clientHeight);
  if(liHeight>liMaxHeight) 
    liHeight=liMaxHeight;
    
  var lcForm=$div[0].innerHTML;
  $div[0].innerHTML='';
  lcForm=lcForm.replace(new RegExp('thisForm.','g'),
                        'advancedFilterForm.')
                        
  lcTitle=$div[0].title;
  $filter=$('<div title="' + lcTitle + '" id="advancedFilterFrame">'
    + '<form name="advancedFilterForm">'
    + lcForm
    + '</form></div>').dialog({
    width:liWidth,
    autoOpen: lbOpen,
    dialogClass: "advanced-filter",
    close: function() {
      openFilter(false);
    },
    height: liHeight,
    hide: {effect:"scale",easing:"easeInSine",duration:200},
    buttons: [
     {text:cApply,
       "class":"buttonanchor text-image-button",
       id:"filter",
       click:function() {
         searchButton();
       }
     },
     {text:cClear,
       "class":"buttonanchor text-image-button",
       id:"rfilter",
       disabled: (typeof thisForm.resetFilter!="object"),
       click:function() {
         thisForm.resetFilter.click();
       }
     },
     {text:cSimple,
       "class":"buttonanchor text-image-button",
       id:"sfilter",
       click:function() {
         el$('queryFilterType').click()
       }
     }
    ]
  }).dialogExtend({"closable" : true });

  // Re-bind quick lookups
  $('div#advancedFilterFrame form input').each(function (){
    if (fieldData[this.name].hasOwnProperty('hInline') 
        ||
        this.name.substr(0,12)=="dynamicField") {
      fieldData[this.name].hInline = new Coins.lookup(this);
    };
  });

  lhDialog=$filter.parent();
  lhDialog.find(".ui-dialog-titlebar-buttonpane")
          .css("top","40%");
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });
  
  $filter.parent().removeClass('ui-widget');
  
  addDialogButtonIcons($filter);
  
/*  $filter.dialogExtend({"closable" : true,
    "buttonbar": {
      "minus": {
        title: "Minimise",
        action: function(phA) {
          openFilter(false);
        }
      }
    }
  });*/
  
  $('button#toggleFilter').hover(
    function() {
      this.setAttribute('data-title',this.title);
      var $table=$('div#advancedFilterFrame')
              .find('table#advancedFilter');
      var lcTitle='';
      $table.find('tr.filterrow').each(function() {
        if(filterValue(this.children[1])!=''
           || filterValue(this.children[2])!=''
           || filterValue(this.children[3])!='')
        lcTitle+='<tr>'
               + '<td align="right">' 
               + (($(this.children[0]).hasClass('dynamicfilter'))
                   ?optionText(this.children[0].children[0].children[0],
                               this.children[0].children[0].children[0].value)
                   :filterLabel(this.children[0]))
               + '</td>'
               + '<td>' + filterValue(this.children[1]) + '</td>'
               + '<td>' + filterValue(this.children[2]) + '</td>'
               + '<td>' + filterValue(this.children[3]) + '</td>'
               + '</tr>';
      });
      if(lcTitle!='') 
        lcTitle='<table>' 
               + '<tr>' + $table.find('tr:first').html() + '</tr>'
               + lcTitle + '</table>';
      else
        lcTitle=this.getAttribute('data-title');
      this.title=lcTitle;
    },
    function() {
      this.title='';
    }
  );
  
}

function getSVG(pcSVG) {
   return  '<IMG src="'
      + 'wousvg.p?style=' + cStyleVar + '&icon=' + pcSVG + '.svg'
      + '" border="0" class="button"/>';
}

function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
   ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
   ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
function getSVGURL(pcSVG,pcColour) {
   var lcColour;
   if(pcColour.substring(0,4)=="rgb(")
     lcColour=rgb2hex(pcColour);
   else
     lcColour=pcColour;
   lcColour=encodeURIComponent(lcColour);
   
   var lcURL='wousvg.p?style=' + cStyleVar 
     + '&icon=' + pcSVG + '.svg'
     + '&colour=' + lcColour;
  return lcURL;
}

         
function addDialogButtonIcons($dialog) {
  $dialog.parent().find('div.ui-dialog-buttonset button.ui-button')
  .each(function(){
    var $button=$(this);
    var lcLabel=$button.text();
    var lcID=this.id;
    if(lcID.numEntries(':')>1) 
      lcID = lcID.getEntry(lcID.numEntries(':') - 1,':');
    $(this).html(getSVG(lcID) + ' ' + lcLabel);
  });
}

function filterLabel(phTD) {
  return phTD.innerText;
}
function filterValue(phTD) {
  var lcValue='';
  $(phTD).find('input,select').each(function() {
    if(this.type=="checkbox") {
      if(this.checked) 
        lcValue = lcValue + ', ' + this.nextSibling.nodeValue;
    }
    else 
      lcValue = lcValue + ', ' + this.value;
  });
  lcValue = lcValue.substring(2);
  if(lcValue==undefined) lcValue='';
  return lcValue;
}


function openFilter(pbOpen) {
 
  if($filter) {
  if(pbOpen==undefined) pbOpen=!$filter.dialog('isOpen');
  
  if(pbOpen) 
    $filter.dialog('open')
  else
    $filter.dialog('close')
  }
  
  document.cookie='CSBFILTER' + cMainArea + '=' 
                 + pbOpen
                 + ';path=/';
}

var iUpdateDialogWidth;
var iDetailDialogWidth;
function buildAjaxDialogTabs() {
  hUpdateDialogTabs=$('#updatedialogtabs').tabs({
    activate:function(event,ui) {
      activateTab('updatedialog',ui.newTab.index());
    }
  });
  iUpdateDialogWidth =$('#updatedialog').width();
  
  hDetailDialogTabs=$('#detaildialogtabs').tabs({
    activate:function(event,ui) {
      activateTab('detaildialog',ui.newTab.index());
    }
  });
  iDetailDialogWidth =$('#updatedialog').width();

  /* default values for add */
  cBodyAddValues
  =getThisInputFields(updatedialogform).substring(1) ;

}

function checkUpdateDialog(phForm) {
  var lbClean=true;
  var lhMain=hCOINSMain.mainarea.getFrame;
  for (var i=0; i<phForm.elements.length; i++) {
    var lcName=(phForm.elements[i].name);
    var lcBefore=phForm.elements[i].getAttribute('data-beforeupdate');
    if(lcBefore && lcBefore!=phForm.elements[i].value){
      lbClean=false;
    }
  }
  return lbClean;
}

function resetUpdateDialog(phForm){
  for (var i=0; i<phForm.elements.length; i++) {
    var lhField=phForm.elements[i];
    if(lhField.type!='hidden') {
      lhField.setAttribute('data-beforeupdate',lhField.value);
    }
  } 
}

function buildUpdateDialog() {
  var lcDialogConfig=
    {modal:true,autoOpen:true,width:iUpdateDialogWidth,
      beforeClose: function(event,ui) {
        if(hCOINSMain.mainarea.getFrame.updatedialogform.getAttribute('data-formok')=='true'
          || checkUpdateDialog(hCOINSMain.mainarea.getFrame.updatedialogform)
        ) return true;
        
        hCOINSMain.coinsConfirm(
          cDirtyForm,
          function(){
            hCOINSMain.mainarea.getFrame.updatedialogform.setAttribute('data-formok','true');
            hUpdateDialog.dialog('close');
          }
        );
        return false;
      },
      close: function(event,ui) {
        thisForm=hBodyUpdateThisForm;
        /* help */
        hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDHEAD",false);
        hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDATE",false);
        if(window==hCOINSMain.mainarea.getFrame)
          ajaxDeleteLookups();
        else
          ajaxUpdateDeleteLookups();
        hCOINSMain.mainarea.getFrame.popDialogForm();
        clearPageTimeout();
        if(window!=hCOINSMain.mainarea.getFrame)
          hUpdateDialog.dialog('destroy').remove();
      },
      buttons:[
      {text:cUndo,
        click:function(){
        thisForm=hBodyUpdateThisForm;
        hUpdateDialog.dialog("close")
        },
        "class":"buttonanchor text-image-button",
        id:"undo"},
      {text:cSave,
      click:function(){ajaxUpdateSave("",updatedialogform.coinsbutton.value)},
         "class":"buttonanchor text-image-button",
         id:"action:save"}
      ]
  };
  
  if(window==hCOINSMain.mainarea.getFrame) {
    hUpdateDialog=$(updatedialog).dialog(
      lcDialogConfig
    ).dialogExtend({"closable" : true});
  }
  else {
    var lcDialog=updatedialog.outerHTML;
    hUpdateDialog=hCOINSMain.mainarea.getFrame.$(lcDialog).dialog(
      lcDialogConfig
    ).dialogExtend({"closable" : true});
  }

  lhDialog=hUpdateDialog.parent();
  lhDialog.find(".ui-dialog-titlebar-buttonpane")
          .css("top","40%");
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });
    
  $('button.ui-button#undo').html
    ('<IMG src="/coins/' + cWebImgs + '/images/'
   + ((bNewUI)?'undo.svg':'undo.gif')
   + '"'
   + ' border="0" class="button"/>'
   + 'Undo');
  $('button.ui-button#action\\:save').html
    ('<IMG src="/coins/' + cWebImgs + '/images/'
   + ((bNewUI)?'save.svg':'save.gif')
   + '"'
   + ' border="0" class="button"/>'
   + 'Save');

  /* dialog overlay */
  lhDialog.append(
    '<div class="dialog_overlay">'
    + '<img src="' + getSVGURL('busy$',oPalette.theme)
      + '" class="fa-spin" style="height:48px">'
    + '</div>'
  );
   resetUpdateDialog(hCOINSMain.mainarea.getFrame.updatedialogform);

   hCOINSMain.mainarea.getFrame.thisForm=hCOINSMain.mainarea.getFrame.updatedialogform;
   hCOINSMain.mainarea.getFrame.pushDialogForm(window);
}

var dialogForms = new Array();
function pushDialogForm(phOpener) {
  thisForm=updatedialogform;
  dialogForms.push({"opener":phOpener,"form":thisForm});
}
function popDialogForm() {
  dialogForms.pop();
  if(dialogForms.length!=0)
    thisForm=dialogForms[dialogForms.length.form];
}
function getCurrentLocation() {
  // if we are in a dialog, then relevant .location might be in a different window
  if (dialogForms.length == 0)
    return location;
  else
    return dialogForms[dialogForms.length - 1].opener.location;
}

function buildDetailDialog() {
  var lcDialog=detaildialog.outerHTML;
  hDetailDialog=hCOINSMain.mainarea.getFrame.$(lcDialog).dialog(
    {modal:true,autoOpen:true,width:iDetailDialogWidth,
      open:function(event,ui){
        activateTab('detaildialog',-1);
      },
      close: function(event,ui) {
        /* show help */
        hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDHEAD",false);
        hCOINSMain.showAjaxFields(cMainArea + "_AJAXUPDATE",false);
        hDetailDialog.dialog('destroy').remove();
       },
      buttons:[
      {text:cClose,
      click:function(){
        thisForm=hBodyUpdateThisForm;
        hDetailDialog.dialog("close");
         },
        "class":"buttonanchor text-image-button",
        id:"close"}
        ]
  }).dialogExtend({"closable" : true});

  lhDialog=hDetailDialog.parent();
  lhDialog.find(".ui-dialog-titlebar-buttonpane")
          .css("top","40%");
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });

  $('button.ui-button#close').html
    ('<IMG src="/coins/' + cWebImgs + '/images/'
   + ((bNewUI)?'close.svg':'close.gif')
   + '"'
   + ' border="0" class="button"/>'
   + 'Close');
   
 
}

function ajaxUpdateSave(phSave,pcButton) {
    var lhMain=hCOINSMain.mainarea.getFrame;
    lcFieldErrors=lhMain.checkMandatoryFields(lhMain.updatedialogform);
    
    if (lcFieldErrors!="") {
      hCOINSMain.coinsError(lcFieldErrors);
      return false;
    }

  lcValues=lhMain.getThisInputFields(lhMain.updatedialogform).substring(1);
  lcHref=location.href;
  lcHref=lcHref.setQueryValue('getAjaxData','Y');
  lcHref=lcHref.setQueryValue('Button',pcButton);
  setAjaxDataBusy();
  /* set save button */
  setSaveButton(phSave,"save_i.gif");
  hideSaveButton();
  lhMain.setDialogOverlay(true);
  loadXMLDoc(lcHref,lcValues);
}

function filterDialogClose(input,response) {
  hFilterForm$.dialog('close');
}

function filterNameChange() {
  filterName.value = (filterNameSelect.value == "" ? "" : optionText(filterNameSelect));
  $('#filterControls').toggle(filterName.value == "");
}

function deleteBrowseFilter() {
  hCOINSMain.coinsConfirm(
    cDeleteBrowseFilter,
    function() {
      var lcURL = "wouajax.p"
             + "?MainArea=" + encodeURIComponent(cMainArea)
             + "&kco=" + location.search.getQueryValue("kco")
             + "&ajaxmethod=syasur.deleteFilter";
      lcURL=lcURL.setQueryValue('filterRowid',
                                optionData(thisForm.queryFilterName, '', 'rowid'),true);
      $.ajax({
        type: "post",
        url: lcURL,
        data: {},
        error: function(pcText) {
          console.log(pcText);
          alert('AJAX Failure');
        },
        success: function(pcText) {
          ajaxResponse(pcText);
        }
      });
    }
  );

}

function openBrowseFilter() {
  filterNameSelect.onchange();
  hFilterForm$.dialog('open');
}
function loadBrowseFilter() {
  var lcFilter=thisForm.queryFilterName.value;
  var lcFilterName = optionData(thisForm.queryFilterName, '', 'rowid');

  var lcHref='';
  var lcParams = location.search.substring(1).split('&');
  /* remove filter* from URL */
  for (i=0;i<lcParams.length;i++) {
    if(lcParams[i].substring(0,6)!="filter")
    lcHref=lcHref + '&'
          + lcParams[i];
  }
  lcHref=lcHref.substring(1);
  lcHref=lcHref.setQueryValue('queryFilterName',lcFilterName,true);
  /* need to retain queryFilterType so that filter* is taken from URL */
  //  lcHref=lcHref.setQueryValue('queryFilterType','');
  lcHref=lcHref.setQueryValue('queryColumnFilter','');
  lcHref=lcHref.setQueryValue('queryColumnField','');
  lcHref=lcHref.setQueryValue('namedFilter','');
  lcHref = setParam(lcHref,lcFilter);
  lcHref = location.pathname + '?' + lcHref;
  
  $('#filterSave').hide();
  $('#filterDelete').hide();
  
  location.replace(lcHref);
}

function setFormHeight() { 

  if ($('div#filterForm').length > 0) {

  hFilterForm$=$('div#filterForm').dialog({modal:true,
  autoOpen:false,
  open: function () {
    /*el$('browseRows').select();
    el$('browseRows').focus();*/
  },
  buttons:[
   {text:cOK,
    id: "action:save",
    class: "buttonanchor",
    click:function(){ 
      var lcURL = "wouajax.p?MainArea=" + encodeURIComponent(cMainArea)
             + "&kco=" + location.search.getQueryValue("kco")
             + "&ajaxmethod=syasur.saveFilter";
      lcURL = lcURL.setQueryValue('filterName',filterName.value,true);
      lcURL = lcURL.setQueryValue('filterRowid', optionData(filterNameSelect, '', 'rowid'), true);
      if (typeof globalFilter != 'undefined' && globalFilter.checked)
        lcURL = lcURL.setQueryValue('globalFilter','Y',true);
      if (kcoSpecificFilter.checked)
        lcURL = lcURL.setQueryValue('kcoSpecificFilter','Y',true);

      var loData={};
      loData.queryFilterType=thisForm.cQueryFilterType.value;
      if(typeof thisForm.queryColumnField=="object") {
        loData.queryColumnFilter=thisForm.queryColumnFilter.value
        loData.queryColumnField=thisForm.queryColumnField.value
      }
      if(typeof thisForm.cSortOrder=="object")
        loData.querySortOrder=thisForm.cSortOrder.value
      if(typeof thisForm.cNamedFilter=="object")
        loData.namedFilter=thisForm.cNamedFilter.value
      var lcFilters='';
      if(typeof oAdvancedFilter=='object') {
        for(var lcField in oAdvancedFilter) {
          eval('var lcAdvFilterValue=oAdvancedFilter.' + lcField);
          if (typeof lcAdvFilterValue !== 'string' || lcAdvFilterValue.length === 0) continue;
          eval('loData.' + lcField + '=lcAdvFilterValue');
          lcFilters+=',' + lcField;
        }
      }
      $("table.bodysel [id^='select']").each(function() {
        eval('loData.' + this.name + '=this.value');
        lcFilters+=',' + this.name;
      });
      
      loData.filters=lcFilters.substring(1);
     
          $.ajax({
            type:"post",
            url:lcURL,
            data: loData,
            error: function(pcText) {
              console.log(pcText);
              alert('AJAX Failure');
            },
            success: function(pcText) {
              ajaxResponse(pcText);
            }
          });
    }
   },
   {text:cCancel,
    id: "undo",
    click:function(){ 
        jQuery(this).dialog("close");
    }
   }
  ]
  }).dialogExtend({"closable" : true});
  
  addDialogButtonIcons(hFilterForm$);
  
  lhDialog=hFilterForm$.parent();
  lhDialog.find(".ui-dialog-titlebar-buttonpane")
          .css("top","40%");
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });

  }

 var $formbegin=$('#formbegin');
 if(bNewUI && $formbegin.length!=0 
   && location.href.getQueryValue('ipopup')!='true'
   && location.href.getQueryValue('setFormHeight') != 'N') {
   var $footer=$('#footerrow');
   var liGap = (b1202 ? 10 : 6);

   /* subtract liGap because inlines can be a bit too big */
   var liHeight=document.documentElement.clientHeight
               - (($footer.length)?$footer.height():0)
               - $formbegin.offset().top
               - liGap;

   var liWindow=parseInt(location.href.getQueryValue('pvFrame').getEntry(2));
   if(liHeight<=1)
       liHeight=liWindow
               - (($footer.length)?$footer.height():0)
               - $formbegin.offset().top
               - liGap;

   if(liHeight>0)
     $formcontainer=$('div.formcontainer')
     .css({height:liHeight,overflow:"auto"});
     
   if($formcontainer.find('.sectionbar').length==0)
    $formcontainer.each(function() {
     var liFrameHeight=0;
     
     $(this).find('iframe.inlineframe').each(function() {
       liFrameHeight+=parseFloat(this.height);
     });
     $(this).find('iframe.inlineframe').each(function() {
       var liGap = Number(location.href.getQueryValue('simpleInlinesHeightGap'));
       if (liGap != 0)
         this.height = liHeight - liGap;
       else {
         var lhLayout=$(this).closest('tr.layoutrow');
         var liLayout=0;
         if(lhLayout.length) 
           liLayout = realHeight(lhLayout) - this.height;

         this.height = Math.floor((liHeight - liLayout) * parseFloat(this.height) 
                                  / liFrameHeight) - 2;
       }
     });
   });
 }
}

function coinsDocumentReady() {

if(typeof cUIMode && cUIMode!='')
  $('body').addClass('mode-' + cUIMode);

if (buttonAction()=="forward") return;

if(typeof pageFocus=="function") pageFocus();

$('#headerSearch').on('keydown',function(event){
  if(event.keyCode==13) {
    hCOINSMain.$('#globalSearch').val(headerSearch.value);
    hCOINSMain.globalSearch(true);
    hCOINSMain.globalSearchKeyUp.call(hCOINSMain.$('#globalSearch')[0],event);
    return false;
  }
});

hCOINSMain.bNextButton=false;
/*if(hCOINSMain.bDesktopFrame
  && hCOINSMain.bFrameBanner==false)
    $('table.headertitle').hide();*/
    
$('table.headertitle li:has("a")')
  .addClass("link")
  .on('click',function(){
    this.children[0].children[0].click();
  });

$('a.columnsort').each(function() {
  $(this).closest('th').attr('title',this.title);
  $(this).closest('th').on('click',function() {
    actionThis($(this).find('a')[0]);
  });
});
  
resizeBody();
resizeSelects();
$('#drop-navigator button')
  .on('mousedown',tabNavigateDown)
  .on('mouseup',tabNavigateUp)
  .on('click',function(){return false});
$('#sub-navigator button')
  .on('mousedown',subNavigateDown)
  .on('mouseup',subNavigateUp)
  .on('click',function(){return false});

  $("#imagelink.dmpopup")
  .on('mouseover',function(){
    hCOINSMain.showPopupListOver('showPaperclip',this,
      '&DocTable=' + this.value.getEntry(0,'|')
      + '&' + this.value.getEntry(0,'|') + 'Rowid=' + this.value.getEntry(1,'|'));
  })
  .on('mouseout',function(){
    hCOINSMain.showPopupListOut();
  });
  
$('input').keydown(function(event) {
  if(event.key=='F11' && event.target.type=="text") {
    event.preventDefault();
    hCOINSMain.desktopDialogUpdate(
      cUpdateValue,
      '<textarea id="f11text" style="width:566px;height:242px">'
    + $('<div/>').text(event.target.value).html()
    + '</textarea><script>f11text.select();f11text.focus()</script>',
      function() {
      },
      function() {
        event.target.value=getCOINSTop().f11text.value;
        getCOINSTop().desktopDialogClose();
        event.target.select();
        event.target.focus();
      },
      600,
      350
     );
  } 
});
   
(function( $ ) {

  window.onbeforeunload =function() {
    if($('button#undo').is(':visible')
      && $('button[href="save"]').is(':visible')
      && bAllowUnload==false) {  
      return cUnsaved;
    }
  }; 

  $.resetSliderPositions=function(table) {
    var tableId = table.attr('id'); 
    //put all sliders on the correct position
    table.find('TR.bodyhead TH').each(function(index) { 
      var td = $(this);
      if(td.hasClass("noresize")==false) {
      var newSliderPosition = td.offset().left+td.outerWidth();

      lcDisplay="";
      if(table.attr('id')=='rightScrollTable') {
        lhDiv=$('#rightHeader');
        liFrom=lhDiv.offset().left;
        liTo=liFrom + lhDiv.width();
        if(newSliderPosition < liFrom || newSliderPosition > liTo)
          lcDisplay="none";
      }
      
      $("#"+tableId+"_id"+(index+1)).css(
          {left: newSliderPosition, 
           height: table.height() + 'px',
           display: lcDisplay}  
      );
      }
    });
  }
  
  $.fn.errorMessage = function(pcMessage) {
   var tab$;
   if(bNewUI) {
   
   $(this).each(function () {
    var lhField = this;

    if (
      lhField.dataset.viewas &&
      lhField.dataset.viewas.substring(0, 6) == 'select' &&
      el$(lhField.id + '_ms') !== undefined
    ) {
      /* Fields with 'select*' viewas are hidden,
         so redirect all errors to the visible multiselect widget button */
      lhField = el$(lhField.id + '_ms');
    }

    if(pcMessage==undefined) {
      $(lhField)
      .removeClass('error')
      .off('mouseover.error')
      .next('div.errormessage')
      .remove();
        
      /* remove error class from the tab that contains the field */
      tab$=$(lhField).parents('div[id^=tabFrame]');
      if(tab$.length!=0) {
        var lcTab=tab$[0].id.getEntry(1,'_');
        var lcTab$=$(el$('tab' + lcTab));
        if(lcTab$.hasClass('on')==false)
          lcTab$.removeClass('error');
      }
    }
    else {
      if($(lhField).hasClass('error') && $(lhField).next('div.errormessage').length!=0) {
        $(lhField).next('div.errormessage')[0]
          .innerHTML+='<BR>' + pcMessage;
      }
      else {
        var liLeft;
        if($(window).width() - $(lhField).position().left - $(lhField).width()<300)
          liLeft= - $(lhField).position().left;
        else
          liLeft = realWidth(lhField) + 25
                 + ((lhField.type=="radio")?50:0);

        $(lhField).on('mouseover.error',
          function(){
            /* set the position relative to the field */
            $(lhField).next('div.errormessage').offset(
              {top:$(lhField).offset().top}
            );
          }
        );

        $(lhField).addClass('error')
        .after('<div class="errormessage '
         + ((liLeft<0)?'left':'right')
         + '"'
         + ' style="margin-left: '
         + liLeft
         + 'px">'
         + pcMessage
         + '</div>');
        if(liLeft<0) {
          liLeft = - $(lhField).next().width() - 50;
          $(lhField).next()
          .css({
             marginLeft: liLeft
          });
          
          
       }
      }
      tab$=$(lhField).parents('div[id^=tabFrame]');
      if(tab$.length!=0) {
        var lcTab=tab$[0].id.getEntry(1,'_');
        var lcTab$=$(el$('tab' + lcTab));
        if(lcTab$.hasClass('on')==false)
          lcTab$.addClass('error');
      }
    }
   });
   }
   return this;
  }

  $.fn.simpleResizableTable = function() { 
  /**
  * Author: Rob Audenaerde
  * Version: plugin version 0.5
  */
  $("<style type='text/css'> .srt-draghandle.dragged{border-left: 1px solid #333;}</style>").appendTo("head");
  $("<style type='text/css'> .srt-draghandle{ position: absolute; z-index:5; margin-left:-5px; width:5px; cursor:e-resize;}</style>").appendTo("head");

  function resetTableSizes (table, change, columnIndex) {
    //calculate new width;
    var tableId = table.attr('id'); 
    var myWidth = $('#'+tableId+' TR.bodyhead TH').get(columnIndex).offsetWidth;
    var newWidth = (myWidth+change)+'px';
                                
    liWidth=$('#'+tableId).get()[0].offsetWidth;
    $('#'+tableId).css('width',liWidth + change + 'px');

    $('#'+tableId+' TR').each(function() {
      $(this).find('TD').eq(columnIndex).find('DIV').css('width',newWidth);
      $(this).find('TD').eq(columnIndex).css('width',newWidth);
      $(this).find('TH').eq(columnIndex).css('width',newWidth);
    });
    
    browseFreezeResize();
    $.resetSliderPositions(table);
    if(table.attr('id')=='leftScrollTable')
      $.resetSliderPositions($('#rightScrollTable'));
    
  };

  function makeResizable(table) {                
    //get number of columns
    var numberOfColumns = table.find('TR.bodyhead TH').length;

    //id is needed to create id's for the draghandles
    var tableId = table.attr('id'); 
    var iOriginalDragLeft;
                                
    for (var i=0; i<=numberOfColumns; i++) {
      //enjoy this nice chain :)
      $('<div class="srt-draghandle" id="'+tableId+'_id'+i+'"></div>').insertBefore(table).data('tableid', tableId).data('myindex',i).draggable(
      { axis: "x",
        start: function ()  {
         var tableId = ($(this).data('tableid'));
         iOriginalDragLeft=$(this).position().left;
         $(this).toggleClass( "dragged" );
         //set the height of the draghandle to the current height of the table, to get the vertical ruler
         $(this).css({ height: $('#'+tableId).height() + 'px'} );
        },
        stop: function (event, ui) {
          var tableId = ($(this).data('tableid'));
          $( this ).toggleClass( "dragged" ); 
//          var oldPos  = ($( this ).data("draggable").originalPosition.left);
          var oldPos = iOriginalDragLeft;
          var newPos = ui.position.left;
          var index =  $(this).data("myindex");

          if(tableId=='rightScrollTable')
            liScroll=el$('rightHeader').scrollLeft;
          resetTableSizes($('#'+tableId), newPos-oldPos, index-1);
          if(tableId=='rightScrollTable')
            el$('rightHeader').scrollLeft=liScroll;
          
          browseFreezeButtons(1,1);
        }                  
      });
    }
    
    $.resetSliderPositions(table);
    return table;
  };

  return this.each(function() {
    makeResizable($(this));
  });
  }; /* $.fn */
  })( jQuery );

  browseFreezeColumns();
  
  setTooltips();
  /* remove tooltips on mousedown/up */
  $('body')
  .on('mousedown',removeTooltips)
  .on('mouseup',removeTooltips);

  setColourPickers();
  enableDragDrop();
  
  if(bNewUI) {
    $('div#browsepopup')
      .append($('tr#bodyTitle td.buttonbar').html());
    $('tr#bodyTitle td.buttonbar').remove();
    var lcColSetButtons=$('span#colsetbuttons').html()
    if(lcColSetButtons==undefined) lcColSetButtons='';
    
    var liColSets=$('div#columnset').length;
    $('#filterSelected')
      .data('colsets',liColSets);
    if(liColSets==0)
      $('#filterSelected')
      .removeClass("colsets");
    else
      $('#filterSelected')
      .addClass("colsets");

    $('span#colsetbuttons').remove();
    var lcCurrentColSet=$('div#browsepopup div.columnset.selected').html()
    $('div#currentcolset')
      .html(lcCurrentColSet + lcColSetButtons);
  }
  
  var hBrowsePopupTimer;
  $('div#browsepopup div.option.action').on('click',function() {
    var lcHref = location.href.setQueryValue("Button","");
    lcHref=lcHref.setQueryValue(this.id,this.getAttribute('value'),true);
    document.body.style.cursor='progress';
    setRowidsCookie();
    location.href=lcHref;
  });

  if(bNewUI) $('button#filterSelected,div#browsepopup').click(
    function(event) {
    if (bShiftKey) {
    /* do a query to the ctrlframe */
    lcHref=location.href;
    lcHref=lcHref.setQueryValue("selectedTables",cSelectedTables);
    lcHref=lcHref.setQueryValue("selectToRowid","*");
    lcHref=lcHref.setQueryValue("selectedRowids","");
    lcHref=lcHref.setQueryValue("Button","");
    lcHref=lcHref + "&selectedRowids=";
    parent.postFrame.location.replace(lcHref);
    } 
    else {
      if(hBrowsePopupTimer) clearTimeout(hBrowsePopupTimer);
      var lhButton=$("#filterSelected");
      var lhPos=lhButton.parent().position();
      $('div#browsepopup')
        .css({
          top: lhPos.top + lhButton.parent().height() + 2,
          left: lhPos.left
        })
        .show()
    }
    
    }
  );

  if(bNewUI) $('button#filterSelected,div#browsepopup').hover(
    function(event){
      if(hBrowsePopupTimer) clearTimeout(hBrowsePopupTimer);
      showFilterSelected(cSelectedRowids);
    },
    function(event){
      hBrowsePopupTimer=setTimeout(function() {
        $('div#browsepopup').hide();
      },500)
    }
  );
  
  var $browsecontainer=$('.browsecontainer');
  if($.floatThead && $browsecontainer.length > 0) {
    var lcHeight=$browsecontainer[0].style.height;
    $browsecontainer[0].style.height='';
    if($browsecontainer.height()>parseInt(lcHeight)) {
    $browsecontainer[0].style.height=lcHeight;
  
  $('table.showall').floatThead({
    headerCellSelector: "tr:first>th",
    zIndex:0,
    scrollContainer: function(table){
      return table.closest('.browsecontainer');
    }
  });  
  
  $('div.fixed.browsecontainer').on('scroll',function(){
    var liTop=this.scrollTop;
    $('div.fixed.browsecontainer')[0].scrollTop=liTop;
    $('div.fixed.browsecontainer')[1].scrollTop=liTop;
  });

   if($('div.browsecontainer').length!=0) {
    try {
    var liHeight=$('table.showall tr.odd:first').position().top
                +$('div.browsecontainer').height();
    $('div.browsecontainer').css({height:liHeight});
    } catch(e) {}
    resizeBody();
   }
   }

   if(hThisField) hThisField.focus();
  }
                
  if (cChartDiv != ""){
    drawGraph();
  }
  
  /* work out how much spare room on the page */
  var lhTable=$('table#browseContent');
  if(lhTable.length!=0 
    && lhTable.find('tr').length!=0
    && bSelectedAll == false
    && location.href.inQuery('genhelp') == false
    && $("button:visible[id^='action:save']").length==0) {
    var lhFirst=lhTable.find('tr.odd,tr.matrixodd').first();
    var lhLast=lhTable.find('tr').last();
    var liHeader=lhFirst.offset().top;
    
    /* add on banner bar */
    if(hCOINSMain.bDesktopFrame
      && hCOINSMain.bFrameBanner==false
      && el$('headerTitle'))
      liHeader+=$(el$('headerTitle')).height();
    
    $('tr.footerrow').each(function(){
      liHeader+=$(this).height();
    });
    liHeader=parseInt(liHeader);
    document.cookie='CSBHead' + cMainArea + '=' 
                   + liHeader 
                 /*  + ',' + lhFirst.height()*/
                   + ';path=/';
    if(bSYAUTOROWS 
      && !location.href.getQueryValue('helpMode').inList('clearDefault')
      && liHeader!=iHeaderHeight) {
      console.log('Height Changed:',liHeader);
      location.replace(location.href);
    }
  }
  
  if(location.href.getQueryValue('helpMode').inList('layout')){
    $('table tr td').css({border:"1px solid grey",padding:"1px"});
  }

  document.dispatchEvent(new Event('coinsDocumentReady'));
}

  function realWidth(obj){
    var clone = $(obj).clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var width = clone.outerWidth();
    clone.remove();
    return width;
  }
  function realHeight(obj){
    var clone = $(obj).clone();
    clone.css("visibility","hidden");
    $('body').append(clone);
    var height = clone.outerHeight();
    clone.remove();
    return height;
  }

if(window.jQuery) {
  jQuery.fn.extend({
    disable: function(state) {
      return this.each(function() {
        this.disabled = state;
      });
    }
  });
}

function setColourPickers() {
  try {
    
    if(jQuery().colorpicker) {
      setTimeout(function() {
       lcStrings = cThemeColours
        + ',' + cStandardColours
        + ',' + cMoreColours
        + ',' + cFewerColours
        + ',' + cBackToPalette
        + ',' + cHistory
        + ',' + cNoHistoryYet
      jQuery('input.colourpicker').colorpicker({
        strings: lcStrings
      }
      );
      },100);
    }
    
  } catch(e) {}
}

function removeTooltips() {
  setTimeout(function() {
    jQuery('.ui-tooltip').remove();
  },500);
}
function setTooltips() {
  var lcTooltipSelector = '[title]:not(iframe, a.treeclass)';

  // Rendering thousands of tooltips is slow on Show All pages,
  // so reducing only to the essential HTML ones
  if ($(lcTooltipSelector).length > 1000)
    lcTooltipSelector = '[data-htmltooltip]';

  jQuery('.ui-tooltip').remove();
  jQuery(lcTooltipSelector).tooltip().off("focusin focusout");

  /* don't use show.delay as it slows massively with many tooltips e.g. C3
  *    show: {
  *    delay:500
  *    }
  */

  /* most tooltips bottom right accept for menu items */
  jQuery(lcTooltipSelector).tooltip({
    content: function() {
     if(this.disabled || this.title=='') return null;
     element=jQuery(this);
     text='<iframe style="position:absolute; height:100%; width:100%;'
         +' top:0px; left:0px; z-index:-9999"'
         +' frameborder="0">'
         +'</iframe>';
     text=text+element.attr('title');
     if(text.numEntries('\n')==1 && text.length < 80)
       text='<nobr>' + text + '</nobr>';
     text=text.trim(' ');
     text=replaceAll(text,'\n','<BR>');
     return text;
    },
    position:{ 
      my: "left+5 top+5", 
      at: "right bottom", 
      collision: "flipfit"
    }
  });
  
}

function getCOINSTop() {
  if(hCOINSMain.bDesktopFrame) {
    return hCOINSMain.parent;
  }
  return hCOINSMain;
}

Coins.getHTML = function(pcID,pcURL,pcData) {
  jQuery.get(pcURL,pcData,function(data) {
    el$(pcID).innerHTML=data;
  });
}
Coins.postHTML = function(pcID,pcURL,pcData) {
  jQuery.post(pcURL,pcData,function(data) {
    el$(pcID).innerHTML=data;
  });
}

function maxZ(pSelect) {
  var topZ = 0;
  $(pSelect).each(function(){
  var thisZ = parseInt($(this).css('zIndex'), 10);
    if (thisZ > topZ){
      topZ = thisZ;
    }
  });
  return topZ;
}

function resizeImage(phImg) {
  var liWidth=phImg.naturalWidth;
  var liHeight=phImg.naturalHeight;
  var liNew=0;
  var lhImg=$(phImg);
//  var lhDiv=$(phImg).parents('div.ui-tooltip');
  
  if(liWidth>liHeight) {
    liOffset = lhImg.height();
    liNew=liOffset * liHeight / liWidth;
    lhImg.height(liNew);
  }
  else {
    liOffset = lhImg.width();
    liNew=liOffset * liWidth / liHeight;
//    liOffset = lhDiv.position().left + liOffset - liNew;
//    lhDiv.offset({left:liOffset});
    lhImg.width(liNew);
  }
}

function resizeSelect(phSelect,pbBand) {
  if (phSelect == undefined)
    return;

  if(pbBand==undefined) pbBand=false;
  
  //if(pbBand && phSelect.style.width!="")return;
  
  /* remove any retired codes that are not used */
  for (var i=phSelect.options.length - 1; i>=0; i--) {
    if(phSelect.options[i].getAttribute('data-invalid'))
      phSelect.options[i].innerHTML+=
        ' (' + phSelect.options[i].getAttribute('data-invalid') + ')';

    if (i!=phSelect.options.selectedIndex
        &&
        phSelect.options[i].getAttribute('data-invalid'))
      phSelect.remove(i);
  }
  
  phSelect.style.width='';
  if(pbBand==false) {
   for (var i=0; i<phSelect.options.length; i++) {
     phSelect.options[i].title=phSelect.options[i].innerHTML;
     if (i!=phSelect.options.selectedIndex)
       phSelect.options[i].innerHTML='';
   }
  }
  
  var liWidth=realWidth(phSelect);
  if(pbBand) liWidth=Math.floor(liWidth / 120) * 120 + 120 + 4;
  
  var liMin=parseInt(phSelect.getAttribute('data-minwidth'));
  if(isNaN(liMin)==false && liWidth<liMin)
    liWidth=liMin;
 
  var liMax=parseInt(phSelect.getAttribute('data-maxwidth'));
  if(isNaN(liMax)==false && liWidth>liMax)
    liWidth=liMax;
   
  phSelect.style.width=liWidth + 'px';
  
  if(pbBand==false) {
    for (var i=0; i<phSelect.options.length; i++) {
       phSelect.options[i].innerHTML=phSelect.options[i].title;
    }  
  }
}

function resizeSelects() {
  $('div.styled-select select').each(function(){
    /* don't resize selects in browses */
    if($(this).parents("table#browseContent").length==0
       &&
       $(this).parents("table#headerTitle").length==0
       &&
       $(this).parents("div#sub-header").length==0
       &&
       $(this).parents("td.dynamicfilter").length==0
       &&
       $(this).parents("td.buttonbar").length==0
       &&
       $(this).parents("td.noresize").length==0
       &&
       $(this).parents("[id^=rowDynLine]").length==0
       )
      resizeSelect(this,true);
  });
}

function completeWorkflow(pcHSARowid) {

  var lcNext, lcNextDesc;
  if (typeof el$('actionwf') == 'object') {
    $('#actionwf').removeClass('error');

    lcNext = $('#actionwf').val();

    if (lcNext == '') {
      $('#actionwf').addClass('error');
      return;
    }

    lcNextDesc = lcNext ? $('#actionwf option:selected').text() : '';
  }
  else {
    lcNext = '';
  }

  var lcNextHeaderRowids = $('#headerRowids[href=fwdone]').val();

  setButtonBusy('actiongowf');

  var lcHTML =
    '<div>'
    + '<textarea style="width: 470px; height: 200px" id="hsa_progress" placeholder="Notes"></textarea>'
  + '</div>';

  var lcTitle = cCompleteTask;
  if (lcNextDesc)
    lcTitle += ': ' + lcNextDesc;

  hCOINSMain.desktopDialogUpdate(
    lcTitle,
    lcHTML,
    function() {
      var lcProgress = $('#actionwf_progress').val();

      if (lcProgress)
        lcProgress = lcProgress + '\r\n';

      getCOINSTop().hsa_progress.value = lcProgress;

      resetButtonBusy('actiongowf');
    },
    function() {
      getCOINSTop().setDialogOverlay(true);

      var lcURL = 'wouajax.p'
        + location.search
        + '&ajaxmethod=syasur.completeWorkflow'
        + '&hsa_progress=' + encodeURIComponent(getCOINSTop().hsa_progress.value)
        + (lcNext ? '&wft_next=' + encodeURIComponent(lcNext) : '');

      if (pcHSARowid)
        lcURL = lcURL.setQueryValue('hs_actionRowid', pcHSARowid);

      if (lcNextHeaderRowids)
        lcURL += '&nextHeaderRowids=' + lcNextHeaderRowids;
      
      thisAjaxURL = lcURL; /* for ajaxWarning */
      thisAjaxParams = "";

      $.ajax({
        type: "post",
        url: lcURL,
        error: function(pcText) {
          getCOINSTop().setDialogOverlay(false);
          console.log(pcText);
          alert('AJAX Failure');
        },
        success: function(pcText) {
          getCOINSTop().setDialogOverlay(false);
          ajaxResponse(pcText);
        }

      });
    },
    500,
    300
  );

}

function generateRecords(phButton) {

  startGenerateTimer();
  $('div.progressbar').css({width:0,transition:""});
  document.getElementById("overlay").style.display = "flex";
  setTimeout(function() {
    $('div.progressbar').css({width:"95%",transition:iGenerateTimer + iDataTimer + "s"})
    },10);

  setButtonBusy('refresh');
          $.ajax({
            type:"get",
            url:phButton.value,
            error: function(pcText) {
              resetButtonBusy('refresh');
              console.log(pcText);
              alert('AJAX Failure');
            },
            success: function(pcText) {
              resetButtonBusy('refresh');
              ajaxResponse(pcText);
            }
            
          });
 
}

function reloadMax(phButton) {
  var lhDialog=phButton.closest('.ui-dialog');
  var lhFrame=$(lhDialog).find('iframe')[0]
  var lhLoc=lhFrame.contentDocument.location;
  lcHref=lhLoc.href;
  
    lcHref=lcHref.setQueryValue("autorows",'');
    lcHref=lcHref.setQueryValue("pvFrame",
                                'F,' + $(lhFrame).width() 
                              + ',' + $(lhFrame).height());
  lhLoc.replace(lcHref);
}

function maximizeFrame(phIframe) {
  var lcHref,liWidth,liHeight;
  if(phIframe.location.href.getQueryValue('iframe')=='true') {
    lcHref='woframe.p' + phIframe.location.search;
    liHeight=hCOINSMain.document.body.clientHeight - 100;
    liWidth=hCOINSMain.document.body.clientWidth - 100;
    
    lcHref=lcHref.setQueryValue("autorows",'');
    lcHref=lcHref.setQueryValue("pvFrame",
                                'F,' + liWidth + ',' + (liHeight - 50));
    
    var lhMax=hCOINSMain.$('<div title="' + phIframe.document.title + '">'
               + '<iframe src="' + lcHref + '"'
               + ' width="100%" height="100%"'
               + '>'
               + '</iframe>'
               + '</div>').dialog({
                 width: liWidth,
                 height: liHeight,
                 modal: true,
                 close: function() {
                   phIframe.location.reload();
                 }
               }).dialogExtend({
                 "closable" : true,
                 "maximizable" : true,
                 maximize: function() {
                   reloadMax(this);
                 },
                 restore: function(evt) {
                   reloadMax(this);
                 }
               });

  lhDialog=lhMax.parent();
  lhDialog.find(".ui-dialog-titlebar-buttonpane")
          .css("top","40%");
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });
  lhDialog=lhMax.parent();
  lhDialog.find('.ui-icon-extlink')
  .css({
    "background-image":
      'url(' + getSVGURL('maximize_popup$',oPalette.text) + ')',
    "background-position": 0
    });
  lhDialog=lhMax.parent();
  lhDialog.find('.ui-icon-newwin')
  .css({
    "background-image":
      'url(' + getSVGURL('restore_popup$',oPalette.text) + ')',
    "background-position": 0
    });

  }
}

var hPageTimeout=null;

function clearPageTimeout() {
  if(hPageTimeout) clearTimeout(hPageTimeout);
  hPageTimeout=null;
  dhtmlx.message.hide('pageTimeout');
}
function pageTimeout(piSecs) {

  clearPageTimeout();
  hPageTimeout=setTimeout(function() {

    dhtmlx.message({
      text:"<img src='/coins/" + cWebImgs 
         + "/images/"
         + ((bNewUI)?'info.svg':'info.gif')
         + "'>" + cPageTimeout,
      callback:function(){location.reload()},
      type:'info',
      expire:"0",
      id:'pageTimeout'
    });
      
             },piSecs * 1000);
}

function clickNotesButton(phButton) {

  var lcHref;
  lcHref=phButton.previousSibling.href;
  
  setButtonBusy(phButton);
  
          $.ajax({
            type:"get",
            url:lcHref,
            error: function(pcText) {
              resetButtonBusy(phButton);
              console.log(pcText);
              alert('AJAX Failure');
            },
            success: function(pcText) {
              resetButtonBusy(phButton);
            
              hCOINSMain.desktopDialogUpdate(
                cNotes,
         '<DIV>'
         + '<INPUT type="hidden" id="syn_lastrev">'
         + '<TEXTAREA style="width:570px;height:290px"'
         + ' id="syn_text"'
         + '>'
         + '</TEXTAREA></DIV>',
              function(event,ui) {
                getCOINSTop().ajaxResponse(pcText);
              },
              function() {
            if(getCOINSTop().syn_text.value.length>32000){
              getCOINSTop().coinsError(cTooLong);
            }
            else {
          $.ajax({
            type:"post",
            url:lcHref,
            data: {
              syn_text: getCOINSTop().syn_text.value,
              syn_lastrev: getCOINSTop().syn_lastrev.value
            },
            error: function(pcText) {
              console.log(pcText);
              alert('AJAX Failure');
            },
            success: function(pcText) {
                getCOINSTop().ajaxResponse(pcText);
                var lcText = getCOINSTop().syn_text.value;
                lcText = lcText.length > 4000 ? lcText.substring(0, 4000) + '...' : lcText;
                phButton.title = valueEncode(lcText);
               phButton.children[0].src
                 ='/coins/' + cWebImgs + '/images/noteslink'
                 + ((getCOINSTop().syn_text.value=="")?"0":"")
                 + ((bNewUI)?'.svg':'.gif');

            }
          });
            } /* else */

              }
              );
              
            }
            
          });

}

function setBanner(){
  var logo=el$('desktopLogo');
  if(logo) {
    logo.href=parent.location.href;
    logo.onclick=clickBanner;
  }
}

function loadIFrame(phIframe,pcSrc) {
         var lcHref=pcSrc;
         var lhIframe=getParentIframe(phIframe);
         var liHeight=$(phIframe.parent).height()
                     - $(lhIframe).offset().top
                     - 30;
         var liWidth = 700;
         lhIframe.height=liHeight;
         
         try {
           liHeight = $(phIframe).height();
         } catch (e) {}
         
         try {
           liWidth = $(phIframe).width();
         } catch (e) {}
           
         lcHref=lcHref.setQueryValue('pvFrame',
                                     'F,'
                                   + liWidth
                                   + ','     
                                   + liHeight);
  phIframe.location.href=lcHref;
}

var tabNavigate;
function tabNavigateDown(event) {
  bind(this,tabNavigateMove)();
  tabNavigator=setInterval(bind(this,tabNavigateMove),100);
}

function tabNavigateMove() {
  var liSign=((this.id=="right")?+1:-1);
  var lhTab=el$('tab-header')
  var liLeft = lhTab.scrollLeft + (100 * liSign);
  //lhTab.scrollLeft=liLeft;
  $(lhTab).animate({scrollLeft: liLeft},100,'linear');
  
}

function tabNavigateUp(event) {
  clearInterval(tabNavigator);
}

var subNavigate;
function subNavigateDown(event) {
  bind(this,subNavigateMove)();
  subNavigator=setInterval(bind(this,subNavigateMove),100);
}

function subNavigateMove() {
  var liSign=((this.id=="right")?+1:-1);
  var lhTab=el$('sub-header')
  var liLeft = lhTab.scrollLeft + (100 * liSign);
  //lhTab.scrollLeft=liLeft;
  $(lhTab).animate({scrollLeft: liLeft},100,'linear');
}

function subNavigateUp(event) {
  clearInterval(subNavigator);
}


function statusNew() {
  try {
    if(hCOINSMain.statusframe)
      hCOINSMain.statusframe.statusLine.innerHTML="";
    else if(hCOINSMain.statusLine) 
      hCOINSMain.statusLine.innerHTML="";
  } catch(e) { }
}
function statusWrite(pcString) {
  try {
  if(bNewUI) {
    var now=new Date();
    var lhTop=getCOINSTop();
    lhTop.$('div#coinslog')
      .append('<div class="coinsalert">' 
            + '<div class="table-row">' 
            + '<div class="table-cell" style="white-space:nowrap">' 
            + now.toLocaleTimeString()
            + '</div>'
            + '<div class="table-cell">'
            + pcString + '</div>'
            + '</div>'
            + '</div>');
    lhTop.coinslog.scrollTop=lhTop.coinslog.scrollHeight;
  }
  else {
  if(hCOINSMain.statusframe) {
    pcString=hCOINSMain.statusframe.statusLine.innerHTML + pcString;
    hCOINSMain.statusframe.statusLine.innerHTML=pcString;
  } else if (hCOINSMain.statusLine) {
    pcString=hCOINSMain.statusLine.innerHTML + pcString;
    hCOINSMain.statusLine.innerHTML=pcString;
  }
  }
  } catch(e) { }
}

function getContainerIframe(phWindow) {
  if(phWindow==undefined)phWindow=window;
  var lhTargetDocument=phWindow.parent.document;
  var lhIframe=null;
  phWindow.parent.parent.$('iframe').each(function() {
    if(this.contentDocument==lhTargetDocument) {
      lhIframe=this;
    }
  });
  return lhIframe;
}
function getParentIframe(phWindow) {
  if(phWindow==undefined)phWindow=window;
  var lhTargetDocument=phWindow.document;
  var lhIframe=null;
  phWindow.parent.$('iframe').each(function() {
    if(this.contentDocument==lhTargetDocument) {
      lhIframe=this;
    }
  });
  return lhIframe;
}

var printDialog, bPrintDialogCloseSilently, iPrintDialogIntervalID;
function foregroundPrint(pcTitle,pcRowid,phOnClose,pcMessage,pcParam) {
  bPrintDialogCloseSilently = false;
  printDialog=parent.getFrame.$(
    '<div title="' + pcTitle 
  + '" class="font">'
  + '<div class="row foreground-print-container">'
  + '<div class="cell foreground-print-spinner">'
  + '<img src="/coins/' + cWebImgs 
  + '/images/busy.svg" class="fa fa-spin"'
  + ' style="height:48px;height:48px">'
  + '<p><span id="rs_stat">' + cWaiting + '</span>...</p>'
  + '<p><span id="elapsed">0</span>&nbsp;' + cSeconds + '</p>'
  + '</div>'
  + (pcMessage ? '<div class="cell foreground-print-msg">'
                 + replaceAll(pcMessage, "\n", "<br>") + '</div>' 
               : "")
  + '</div>'
  ).dialog({
    modal:true,
    close:function() {
      if (bPrintDialogCloseSilently)
        return;

      if (typeof phOnClose == "string")
        parent.location.replace(phOnClose);
      else if (typeof phOnClose == "function")
        phOnClose();
    }
  }).dialogExtend({"closable" : true });
  
  var lhDialog=printDialog.parent();
  lhDialog.find(".ui-dialog-titlebar-buttonpane")
          .css("top","40%");
  lhDialog.find('.ui-icon-close')
  .css({
    "background-image":
      'url(' + getSVGURL('close_popup$',oPalette.text) + ')',
    "background-position": 0
    });

  var liTime=0;
  iPrintDialogIntervalID = setInterval(function(){
    liTime+=1;
    printDialog.find('span#elapsed').html(liTime);
    if(liTime<=10 && (liTime % 2)==0
      ||
       liTime>10 && (liTime % 5)==0) {

  var lcHref = location.search;
  lcHref="?" + buildURL(lcHref,"short","pvFrame");
  lcHref= "wouajax.p"
          + lcHref
          + '&ajaxMethod=syasur.reportstatus'
          + '&co_rptstatusRowid=' + pcRowid;
  lcHref = setParam(lcHref, pcParam);

          $.ajax({
            type:"get",
            url:lcHref,
            error: function(pcText) {
              console.log('AJAX Failure', pcText);
            },
            success: function(pcText) {
              ajaxResponse(pcText);
            }
          });

    }   
  },1000);
  
}
function printDialogClose() {
  printDialog.dialog('close');
}
function printDialogCloseSilently() {
  bPrintDialogCloseSilently = true;
  clearInterval(iPrintDialogIntervalID);
  printDialog.dialog('close');
}
function printView(input,result) {
  if (input == '_dialog')
    hCOINSMain.desktopDialog (cBulkResults,
                              result + "&appwidth=800&appheight=600");
  else
    window.open(result,'_blank');
}

function genRefresh(input,result) {
  if(bQuickData && typeof reload == 'object') {
    stopGenerateTimer();
    actionPage(reload);
  }
  else
    location.replace(result);
}

function clearLayout(phButton) {
  var lhLayout=$(phButton).parents('td.layoutbody');
  lhLayout.find('input,select').not('input[type=button]').val('');
}

function enableDragDrop() {
  /* don't add to normal file upload page */
  if(typeof bEnableDragDrop == "boolean" && bEnableDragDrop == true) {

   $(document).on('dragover', function (e) {
     /* can't access dataTransfer.files from dragover event,
        so checking .types to see if a file is being dragged */
     var dt_types = e.originalEvent.dataTransfer.types;
     if (dt_types && (dt_types.indexOf ? dt_types.indexOf('Files') != -1 : dt_types.contains('Files'))) {
       e.originalEvent.dataTransfer.dropEffect = 'copy';
       e.stopPropagation();
       e.preventDefault();
     }
   });

   $(document).on('drop', function (e) {
     if (e.target.type == 'file')
       return; // dropped on a standard 'file upload' input

     if ( !(window.File && window.FormData && window.FileList) )
       return;

     /* ignore if dropped on dialog overlay */
     if ($(e.target).hasClass('ui-widget-overlay')) return;

     var files = e.originalEvent.dataTransfer.files;
     if (files == null || files.length == 0)
       return;

     e.preventDefault();

     /* we now have files containing the files dropped */
     getCOINSTop().uploadFiles(files,
                               hCOINSMain.mainarea.getFrame.$('[id=imagelink]'));

   });
  }
}

function addToValue(phInput,pcText) {
  if(pcText==undefined) pcText='';
  if(phInput.getAttribute('data-orig')==null)
    phInput.setAttribute('data-orig',phInput.value);
    
  phInput.value=phInput.getAttribute('data-orig')
               + (pcText==""?"":' (' + pcText + ')');  
}

function baseURL() {
  try {
    var lcURL = location.href;
    
    lcURL = lcURL.slice(lcURL.indexOf(":") + 1,
                                lcURL.lastIndexOf("/",lcURL.indexOf("?")) + 1);
    
    while (lcURL.charAt(0)=="/") {
      lcURL = lcURL.substr(1);
    }
    
    return lcURL;
  }
  catch(e) {
    return "";
  }
}

function setLiveURL() {
  try {
    /* In case we have not been able to retrieve any LIVEURL values we will
       first check the sysparam rowid is available. */
    if (getValues("LIVEURL","rowid")=="") return false;
  
    if (getValues("LIVEURL","value")=="" && getValues("LIVEURL","ignore")=="")
     hCOINSMain.desktopDialog
      ("Set SY Parameter LIVEURL",
       "woframe.p?MainArea=%25WSY0001SSYP&appheight=295&appwidth=600&syspara" +
       "mRowid=" + getValues("LIVEURL","rowid") + "&Button=action:open");
    
    return true;
  }
  catch(e) {
    return false;
  }
}

function getUNIQID() {
  try {
     url_string = window.location.href;
     urlparam = "GUID";
     urlparam = urlparam.replace(/[\[\]]/g, '\\$&');
     var regex = new RegExp('[?&]' + urlparam + '(=([^&#]*)|&|#|$)'),
     lcguid = regex.exec(url_string);
     lcguid = decodeURIComponent(lcguid[2].replace(/\+/g, ' '));
     return lcguid;
  }
  catch(e) {
    return "";
  }
}

function setUNIQID() {
  try {
    if (getValues("UNIQID","value") == "")
     hCOINSMain.desktopDialog
      ("Set SY Parameter UNIQID",
       "woframe.p?MainArea=%25WSY0002SSYP&appheight=295&appwidth=600&syspara" +
       "mRowid=" + getValues("UNIQID","rowid") +
       "&GUID=" + getValues("GUID","value") +
       "&Button=action:open");
    
    return true;
  }
  catch(e) {
    return false;
  }
}
