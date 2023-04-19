/*-
     Program: ajaxtree.js
 Description: AJAX Treeview
-*/
    
var current_el = null;
var hLoading;
var began = false      
var cTreeRoot;
var hTreeID;
var ajaxObject;

function styleTree (phTree,pcStyle) {

  phTree.style.display = pcStyle;
  phTree.parentNode.parentNode.parentNode.style.display=pcStyle;

}

function getItems(input, response, item){

        if (response != ''){                 
            // Response mode        
            //alert(response)    
          if (input!="") {
            current_el = document.getElementById("C" + input);
          }
          current_el.innerHTML = response;
          if(response=="<DIV></DIV>"){
            $(current_el).parents('table').addClass('is-empty');
          }
                                        
        //loading.style.display = 'none'
        }else{
                // Input mode                        
                //var url  = "process_request.asp?p=" + input + "&hash=" + Math.random();
                lcSearch=location.search;
                if (lcSearch=="") {
                  lcSearch="?";
                } else {
                  lcSearch=lcSearch + "&";
                }
                lcSearch=lcSearch.setQueryValue('COINSHash','');
                var url  = "wouajax.p"
                           + lcSearch
                           + "ajaxmethod="
                           + ajaxObject + ".getTreeItems&loadTree=" 
                           + encodeURIComponent(input)
                           + "&treeRoot=" 
                           + encodeURIComponent(cTreeRoot)
                           + "&defaultItem=" + encodeURIComponent(item);
                /* wocoins.p/js to add pvFrame */
                if(typeof addFrameURL=="function") {
                  url=url.setQueryValue('pvFrame','');
                  url = url + addFrameURL();
                }
                
                //alert(url)
                loadXMLDoc(url);                
        }
}

function setDetail(input, response, item){

        if (response != ''){                 
            // Response mode        
            //alert(response)    
          response=response.replace(/&amp;nbsp;/g,"&nbsp;");
          if (input=="") {
            detail_el = document.getElementById("TreeDetail");
          }
          else {
            detail_el = document.getElementById("D" + input);
          }
          detail_el.innerHTML = response;
//        detail_el.style.display="";
          detail_el.parentNode.parentNode.parentNode.style.display="";
        }
}

function setItems(id,response) {

        var img = null;
        c = "C" + id;
        img = document.getElementById("I"+id);
        //alert(c)
        //alert(response);
        current_el = document.getElementById(c);
        if(current_el.style.display == 'none'){
          styleTree(current_el,'');
          if(img){
            if(b1202) {
              $(img).attr('class','icn icn-Chevron-Down');
              $(img).parents('table').removeClass('treeitems-collapsed').addClass('treeitems-expanded');
            }
            else
            img.src = "/coins/" + cWebImgs + "/images/menu_open.svg";
          }
        }
        /*else{
          styleTree(current_el,'none');
          if(img)img.src = "/coins/" + cWebImgs + "/images/plus.gif";
        }
        */
        if(current_el.innerHTML ==''||current_el.innerHTML==hLoading.innerHTML){
                //loading.style.display = ''
                getItems(id,response);
        }

}
function loadItems(id,c,item){ 
        var img = null;
        if(arguments.length<2){
                c = "C" + id;
                img = document.getElementById("I"+id);
        }
        //alert(c)
        current_el = document.getElementById(c);
        if(current_el.style.display == 'none'){
          styleTree(current_el,'');
          
          try {
            h=document.getElementById("D" + id);
            if(h)h.style.display="";
          } 
          catch(e) {} 

          if(img){
            if(b1202) {
              $(img).attr('class','icn icn-Chevron-Down');
              $(img).parents('table').removeClass('treeitems-collapsed').addClass('treeitems-expanded');
            }
            else
            if(img)img.src = "/coins/" + cWebImgs + "/images/menu_open.svg";
          }
          
        }else{
          styleTree(current_el,'none');
          
          try {document.getElementById("D" + id).style.display="none";} 
          catch(e) {} 

          if(img){
            if(b1202) {
              $(img).attr('class','icn icn-Chevron-Right');
              $(img).parents('table').removeClass('treeitems-expanded').addClass('treeitems-collapsed');
            }
            else          
            if(img)img.src = "/coins/" + cWebImgs + "/images/menu_closed.svg";
          }
        }
        if(current_el.innerHTML==''||current_el.innerHTML==hLoading.innerHTML){
                //loading.style.display = ''
                current_el.innerHTML=hLoading.innerHTML;
                getItems(id,'',item);
        }
}

function refreshItems(id,c){ 
        img = document.getElementById("I"+id);
        current_el = document.getElementById("C" + id);
        /* if the plus button is showing then reset the contents */
        if(current_el.style.display == 'none'){
          current_el.innerHTML = '';
          try {document.getElementById("D" + id).innerHTML="";} 
          catch(e) {} 
        }
        /* otherwise refresh */
        else {
                //loading.style.display = ''
                current_el.innerHTML=hLoading.innerHTML;
                try {document.getElementById("D" + id).innerHTML="";} 
                catch(e) {} 
                getItems(id,'','');
        }
        
}

function buildTree(id,tree,item){
        if (!began){
                hLoading = document.getElementById("loading")
                document.getElementById(id).style.display = 'none';
                began = true;
        }
        hTreeID=document.getElementById(id);
        /*eval("hTreeID=" + id);*/
        cTreeRoot=tree;
        loadItems(tree,id,item)
}

var hLastNode;
function selectAnchor(phAnchor) {
  var lhNode;
  try{
  if (hLastNode!=undefined) {
    hLastNode.className="treelink";
    $(hLastNode).parents('table').removeClass('treelinkhi');
  }
  lhNode=phAnchor.parentNode;
  lhNode.className="treelinkhi";
  $(lhNode).parents('table').addClass('treelinkhi');
  hLastNode=lhNode;
  if (phAnchor.href.getQueryValue("hidesidemenu")=="Y") {
    showMenu("hide")
  }

  lcMainArea=phAnchor.href.getQueryValue("MainArea");
  lbDocModule=(location.href.getQueryValue('DocModule')=="Y");
  if(COINSMainFrame && lcMainArea && lbDocModule == false) {
    document.cookie = "lastFunction=" + lcMainArea + ";path=/";
    hideDesktop();
  }
  
  var lchref=phAnchor.href;
  lchref=lchref.setQueryValue('pvFrame','');
  lchref = lchref + addFrameURL();
  
  if(hCOINSMain.mainarea.getFrame.dialogForms.length!=0){
    window.open(lchref,'_blank');
    return false;
  }
  else
    phAnchor.href=lchref;
  
  }
  catch(e){}
  return true;
}

function setLastNode(pcInput,pcID) {
  try{
    if (hLastNode!=undefined) {
      hLastNode.className="treelink";
    }
    hLastNode=document.getElementById("A" + pcID).parentNode;
    scrollTreeTo(hLastNode);
  }
  catch(e){}
}

function highlightThisFunction(pcCode) {
  var lbFound=false;
  var i;
  
  /*
  for (i=0;i<document.anchors.length;i++) {
    lhAnchor=document.anchors[i];
    */
  hLinks=jQuery('.treelink');
  for (i=0;i<hLinks.length;i++) {
    lhAnchor=hLinks[i];
    lhHidden=lhAnchor.children[0];
    lcTreeCode=((lhHidden)?lhHidden.value:'');
    if (lcTreeCode==pcCode) {
      selectAnchor(lhAnchor);
      /* make sure all the branches are open */
      lhDiv=lhAnchor.parentNode.parentNode.parentNode;
      lhDiv=lhDiv.parentNode.parentNode;
      lbFound=true;
      openBranches(lhDiv);
      scrollTreeTo(lhAnchor);
      break;;
    }
  }
  return lbFound;
}
function highlightFunction(pcCode) {
  if (highlightThisFunction(pcCode)==false) {
                var url  = "wouajax.p"
                           + location.search
                           + "&ajaxmethod="
                           + ajaxObject + ".findTreeItem&treeRoot=" 
                           + encodeURIComponent(cTreeRoot)
                           + "&defaultItem=" + encodeURIComponent(pcCode);
                //alert(url)
                loadXMLDoc(url);                
  }
}

function openBranches(phDiv) {
  if (phDiv.parentNode.id.substring(0,1)=="C") {
    lcID=phDiv.parentNode.id.substring(1);
    /* view the tree */
    styleTree(phDiv.parentNode,'');
        var img = null;
        img = document.getElementById("I"+lcID);
    /* change the image */
    if(img){
      if(b1202) {
        $(img).attr('class','icn icn-Chevron-Down');
        $(img).parents('table').removeClass('treeitems-collapsed').addClass('treeitems-expanded');
      }
      else
      if(img)img.src = "/coins/" + cWebImgs + "/images/menu_open.svg";
    }
      phDiv=phDiv.parentNode.parentNode.parentNode;
      phDiv=phDiv.parentNode.parentNode;
      openBranches(phDiv);
  }
}

function scrollTreeTo(phTo){

  var lhScroll = hTreeID.parentNode;
  var lhScroll$=$(lhScroll);
  
  /* The height of the menu frame */
  menuFHeight = lhScroll$.height(); 
  /* The position of the top of the menu relative to the frame*/
  menuAbove = lhScroll$.position().top; 
  /* How far down the menu the target is */
  targetOffset = lhScroll.scrollTop + $(phTo).offset().top;
  
  itemHeight = phTo.offsetHeight;  
  
  /* allow 30 for scroll bars */
  if ((targetOffset + itemHeight + 30 - menuAbove - lhScroll.scrollTop
         >= menuFHeight)
    ||(targetOffset - menuAbove - lhScroll.scrollTop
         <= 0)) {
    offScreen = true;
  } 
  else 
  {
    offScreen = false;
  }
  
  if (offScreen){
    if(targetOffset<=menuAbove) 
      liScrollTo = (menuFHeight / 3);
    else
      liScrollTo=targetOffset - menuAbove - (menuFHeight / 3)
    
    lhScroll.scrollTop=liScrollTo;
    lhScroll.scrollLeft=0;
  }
}

function treeCloseAll() {
  /* find all menu-opener cells that have open image and click to close */
  if(b1202)
  $('td.menu-opener i.icn-Chevron-Down').click()
  else
  $('td.menu-opener img[src*="menu_open"]').click()
  treeView.scrollTop=0;
}
