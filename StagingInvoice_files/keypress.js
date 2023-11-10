/*-
     Program: keypress.js
 Description: co
-*/

var hThisField;
var hThisObject;

function chooseOption (pcID) {
  var lchref;
    lhButtons=jQuery('.buttonanchor');
    for (var i = 0; i < lhButtons.length; i++) {
      lhObject = lhButtons[i];

      lchref=lhObject.getAttribute('href');
      if ((lhObject.id.substring(0,pcID.length) == pcID ||
          getFileName(lchref,false,"/")==pcID 
          )&& jQuery(lhObject).is(":visible")) {
        
        try {
        hThisField.blur();
        } catch(e) { }
        
        lhObject.focus();
        hThisObject=lhObject;
        setTimeout(clickObject,100);
        return true;
      } 
    }    
    
    /* if we didn't find it then try the parent.parent */
    /*for (var i = 0; i < parent.parent.document.all.length; i++) {
      lhObject = parent.parent.document.all[i];*/
    if(parent.parent && typeof(hCOINSMain)!="undefined" && parent.parent!=hCOINSMain) {  
    lhButtons=parent.parent.jQuery('.buttonanchor');
    
    for (var i = 0; i < lhButtons.length; i++) {
      lhObject = lhButtons[i];


      if (lhObject.id.substring(0,pcID.length) == pcID) {

        try {
        hThisField.blur();
        } catch(e) { }
        
        lhObject.focus();
        hThisObject=lhObject;
        setTimeout(clickObject,100);
        return true;
      } 
    }    
    }
    
  return false;  
    
}
function clickObject() {
  hThisObject.click();
}

function seqSort(a,b) {
  if (a.inputSeq < b.inputSeq)
    return -1;
  if (a.inputSeq > b.inputSeq)
    return 1;
  return 0;
}

function getFieldSeq(piSeq,pbBlock) {
    if (pbBlock==undefined) pbBlock=false;
    lhNextField = "";
    
      var lField = new Array;
      /* copy fields to local array */
      for (field in fieldData) {
        lhField=fieldData[field];
        lhField.field=field;
        if(lhField.inputSeq) 
          lField[lField.length]=lhField;
      }
      jQuery("[data-inputSeq]").each(function(index){
        var liSeq=parseInt(this.getAttribute('data-inputSeq'));
        lField[lField.length]={
          inputSeq:liSeq,
          field:this.name,
          /*readOnly: $(this).prop('readonly'),*/
          readOnly: false,
          hfield:this
        }
      });
      /* sort on inputSeq */
      lField.sort(seqSort);
      
      for (i=0;i<lField.length;i++) {
      if (lField[i].inputSeq >= piSeq) {
        if(lField[i].hfield) 
         lhField=lField[i].hfield;
        else {
         lhField=input$(lField[i].field);
         /* if new UI and advanced filter then use frame form */
         if(piSeq>1000 && bNewUI)
           lhField=eval('advancedFilterForm.' + lField[i].field);
        }
         
        /* if we have an array of checkboxes - select first */
        try {
          if(lhField.type==undefined&&lhField.length!=undefined) 
            lhField=lhField[0];
        } catch(e) { } 

        if ((pbBlock==false
            ||getFieldGroup(lhField)!=getFieldGroup(hThisField))
              &&lhField) {
          lhNextField=lhField;
          break;
        }
      }
      }
      
    return lhNextField;
}

function elementHidden(lhElement) {
  lhParent=lhElement;
  while (lhParent.tagName.toUpperCase()!="HTML") {
    if (lhParent.style.display=="none") {
      if (lhParent.id.substring(0,8) == "tabFrame") {
        if(hUpdateDialog) {
          /* tabFrameupdateXXX */
          lcTabName=lhParent.id.substring(14);
          $('#updatedialogtabs').tabs('option','active',
            tabData[lcTabName].tab);
        }
        else {
         /* we've found the element on a hidden div
            if the tab is visible then we should click the tab */
         if (eval('tab' + lhParent.id.substring(8).getEntry(1,"_") 
                        + '.style.display=="none"')) {
           return true;
         }
         else {
           clickTab(tabData[lhParent.id.substring(8)].tab,lhParent.id);
           return false;
         }
        }
      }
      else {
        return true;
      }
    }
    else if($(lhParent).hasClass("sectionbar") 
         && !$(lhParent).hasClass('open')) {
      sectionBarToggle.call($(lhParent).find('div.sectionbarheader'), 0);
      return false;
    }
    else 
    lhParent=lhParent.parentElement;
  }
  return false;
}

hNextReturnField=null;
function applyReturn(phEvent,pbNext) {
  var liSeq; 
  
  if (pbNext==undefined) {pbNext=false};
  
  if (isIE) {
    bCtrlKey=window.event.ctrlKey;
    bAltKey=window.event.altKey;
    bShiftKey=window.event.shiftKey;
  }
  else {
    bCtrlKey=phEvent.ctrlKey;
    bAltKey=phEvent.altKey;
    bShiftKey=phEvent.shiftKey;
  }
  
  if(!hThisField) return;
  
  if (pbNext==false) {
      /* apply return in the editor if CTRL pressed */
      if (hThisField.type=="textarea"&&(bCtrlKey||
          fieldData[hThisField.name]&&
          fieldData[hThisField.name].lineEditor==true)&&!bShiftKey) {
                    
         if (isIE && document.documentMode<=8) {
           window.event.keyCode=13;
           return true;
         }
         else {
          
        lcText=hThisField.value;
        liStart=hThisField.selectionStart;
        liEnd=hThisField.selectionEnd;
        lcText=lcText.substring(0,liStart) + '\n' + lcText.substring(liEnd);
        hThisField.value=lcText;
        hThisField.selectionStart=hThisField.selectionEnd=liStart + 1;
        return false;
        
        }
      }

    var liThisFieldSeq = getFieldInputSeq(hThisField);
    if (bShiftKey&&bCtrlKey) {
      /* find next tab or layout */
      liNextSeq = getFieldInputSeq(hThisField) + 1;
      hNextReturnField=getFieldSeq(liNextSeq,true);
    }
    else if (bShiftKey) {
      liNextSeq = getFieldInputSeq(hThisField) - 1;
      hNextReturnField=getFieldSeq(liNextSeq);
      /* stop if we have reached the first field */
      if (liNextSeq == 0||hNextReturnField == hThisField) return false;
    }
    else {
      liNextSeq =getFieldInputSeq(hThisField) + 1;
      hNextReturnField=getFieldSeq(liNextSeq);
    }
  }
  else {
    liNextSeq = getFieldInputSeq(hThisField) + 1;
    hNextReturnField=getFieldSeq(liNextSeq);
  }
  
  /* if moving from form to advanced filter then don't */
  if(hNextReturnField 
    && liThisFieldSeq<1000 
    && getFieldInputSeq(hNextReturnField)>1000)
    hNextReturnField='';

  if (getFieldAutoSave(hThisField)!=true) {
  
  liOld = -1;
  while (hNextReturnField!="" && 
            (elementHidden(hNextReturnField) || 
             hNextReturnField.disabled || 
             $(hNextReturnField).prop('readonly') ||
             ($(hNextReturnField).is('select') && $(hNextReturnField).hasClass('readonly')) )) {
    liSeq=getFieldInputSeq(hNextReturnField);
    /* if we haven't moved then stop */
    if (liSeq == liOld) return false;
    liOld = liSeq;
    
    try{
      if (bShiftKey&&!bCtrlKey) liSeq--;
      else liSeq++;
    }
    catch(e) {liSeq++;}
    
    hNextReturnField=getFieldSeq(liSeq);
    if (hNextReturnField==hThisField) return false;
  }
  }
  
  if(hThisField.id=="jumpto") {
    /* ajax call to convert jumpto.value to ROWID */
    ajaxGet('syasyl.getJumpTo','jumpto=' + hThisField.value
      + '&stn_hquery=' + escape(el$('stn_hquery').value)
      + '&stn_htables=' + el$('stn_htables').value
      + '&stn_hjump=' + el$('stn_hjump').value
    );
    return false;
  }
  
  if (hNextReturnField==""
      ||hNextReturnField==undefined
      ||getFieldAutoSave(hThisField)==true) {
      
    /* force focus out of the field to force blur() to fire */
    window.focus();
    hThisField.blur();

    /* if the field has validation and has changed then don't proceed yet */
    if (isValueChanged(hThisField)) {
      hThisField.focus();
      return false;
    }
    if (liNextSeq > 1000) {
      if(el$('applyFilter')) el$('applyFilter').click();
    }
    else {
      lbOK=chooseOption("action:save");
      /* if no save button then try forward */
      if (lbOK==false) {
        chooseOption("forward");
      }
    }
    return false;
  }
  else {
    /* we delay the focus on the new field by 1 ms to let the browser
       sort out the field value before we assign the select/focus
       seems to be a bug in IE really */
    setTimeout(setNewFieldFocus,1);
    return false;
  }
  
}
function setNewFieldFocus() {
  try {
      hNextReturnField.focus();
      if (hNextReturnField.type!="select-one" && hNextReturnField.type!="select-multiple") {
        if (hNextReturnField.type=="textarea"&&
            hNextReturnField.lineEditor=="true") {
        } else {
          hNextReturnField.select();
        }
      }
  }
  catch(e) {}
}

function focusFirstField() {
  hNextReturnField=getFieldSeq(0);
  liOld = -1;
  while (hNextReturnField!="" && (elementHidden(hNextReturnField) || hNextReturnField.disabled)) {
    liSeq=getFieldInputSeq(hNextReturnField);
    /* if we haven't moved then stop */
    if (liSeq == liOld) break;
    liOld = liSeq;
    
    liSeq++;
    
    hNextReturnField=getFieldSeq(liSeq);
    if (hNextReturnField==hThisField) break;
  }
  
  if(hNextReturnField) {
    hNextReturnField.focus();
    try{
    hNextReturnField.select();
    }catch(e) {}
  }
 
}

var lastKeyEvent;
var heldKeys = {};

/* duplicate from wouhotkeys.i --
   just in case hotKeysConfig from woutext.p is not available,
   also used as default hotkeys config in %WSY1360SMNP */
var hotKeysDefaults = {
  'add': ['CS78', 'CS32'],
  'open': ['CS79'],
  'save': ['CS83'],
  'forward': ['CS88'],
  'undo': ['CS85'],
  'lookup': ['CS54'],
  'togglefilter': ['CS70'],
  'apply': ['CS65'],
  'refresh': ['CS82'],
  'maximize': ['CS77'],
  'desktop': ['CS49'],
  'search': ['CS191'],
  'togglemenu': ['CS188'],
  'togglehelp': ['CS190'],
  'console': ['CAS191'],
  'maint': ['CS90'],
  'info': ['CS67'],
};

var hotKeysDict = (typeof hotKeysConfig !== 'undefined' ? hotKeysConfig : hotKeysDefaults);
var hotKeys = {};

/* reversing {action: [keys]} to {key: action} */
Object.keys(hotKeysDict).forEach(function(pcAction) {
  hotKeysDict[pcAction].forEach(function(pcKey) {
    if (pcKey != '')
      hotKeys[pcKey] = pcAction;
  });
});

$(window).on('blur',function() {
  heldKeys={};
});

window.onkeydown = function(event) {
  var lcHotKey='';
  if (lastKeyEvent && lastKeyEvent.keyCode == event.keyCode) {
    return;
  }
  if (event.keyCode<32 && event.keyCode!=13 && event.keyCode!=10) return;
  lastKeyEvent = event;
  heldKeys[event.keyCode] = true;

  var lcKey='';
  if(event.ctrlKey)lcKey+='C';
  if(event.altKey)lcKey+='A';
  if(event.shiftKey)lcKey+='S';
  
  lcKey=lcKey + event.keyCode;
  
  if(typeof overrideKeyDown == "function") {
    if(overrideKeyDown(event,lcKey)==false) {
      event.preventDefault();
      return;
    }
  }
  
  if (event.keyCode==13||event.keyCode==10) {
    /* do not handle RETURN if codemirror has focus
       or multiselect menu is open */
    if (   $('div.CodeMirror-focused').length > 0
        || $('.ui-multiselect-menu').is(':visible')) return;
    if ($('textarea.tox-textarea').is(':visible')) return;

    if (hThisField&&
        (hThisField.id=="queryColumnFilter"
        ||hThisField.id.substring(0,6)=='select')) {
      searchButton();
      return false;         
    }
    else
      return applyReturn(event);
  }
  
  /* lcKey contains [C][A][S]nnn */
  if(hotKeys[lcKey]){
    lcHotKey=hotKeys[lcKey];
    
  try{
    /* desktop only if destktop */
    if(lcHotKey=='desktop'
      && hCOINSMain.bDesktop
      && hCOINSMain.desktop
      && (hCOINSMain.mainarea.getFrame.dialogForms.length==0)
      && (hCOINSMain.$('a#desktop').length==1)) { 
      hCOINSMain.toggleDesktop();
    }
    if(lcHotKey=='console') {
      hCOINSMain.consoleOpen();
    }
  
    if(lcHotKey=='search') {
      hCOINSMain.globalSearch();
    }
    
    if(lcHotKey=='maint') {
      window.open(cMaintLink);
    }
    
    if(lcHotKey=="maximize") {
      if($('div#maximizeBrowse').length>0)
        maximizeFrame(window);
    }
    
    if(lcHotKey=='togglemenu') {
      getCOINSTop().showMenu();
      if(getCOINSTop().hMainLayout.state.west.isClosed==false) {
        getCOINSTop().functionSearch.focus();
        getCOINSTop().functionSearch.select();
      }
    }
    if(lcHotKey=='togglehelp') {
      hCOINSMain.showHelpFrame();
    }
    
    if(lcHotKey=='undo') {
      stopValidation(true);
      chooseOption("undo");
    }
    if(lcHotKey=='forward') {
      hThisField=null;
      chooseOption("forward");
    }
    if(lcHotKey=='lookup') {
      openLookupWindow(hThisField);
    }
    
    if(lcHotKey=="togglefilter") {
      chooseOption("toggleFilter");
    }
    
    if (lcHotKey=="info") {
      lcHref=location.href;
      if (lcHref.getQueryValue("COINSInfo") == "true") {
        lcHref=lcHref.setQueryValue("COINSInfo","");
      }
      else {
        lcHref=lcHref.setQueryValue("COINSInfo","true");
      }
      location.replace(lcHref);
    }
    if (lcHotKey=="apply") {
      if(el$('applyFilter')) el$('applyFilter').click();
    }
    if (lcHotKey=="add") {
      lhDynTable = $(hThisField).parents('table[id^=dynTable]');

      /* Check if we're inside a dynlines.js table */
      if (lhDynTable.length > 0) {
        var lcDynLabel = lhDynTable.first().attr('id').replace('dynTable', '');
        $('#btn_add_header' + lcDynLabel + '__0').click();
      }
      else
        chooseOption("add");
    }
    if (lcHotKey=="open") {
      chooseOption("open");
    }
    if (lcHotKey=="refresh") {
      chooseOption("reload");
    }
    if (lcHotKey=="save") {
      hThisField=null;
      chooseOption("action:save");
    }
    
    /* don't apply the key */
    return false;
  }
  catch(e) {}
    
  }
  
};
                                
window.onkeyup = function(event) {
  lastKeyEvent = null;
  delete heldKeys[event.keyCode];
};

$(window).on('focus',function() {
  lastKeyEvent=null;
});
