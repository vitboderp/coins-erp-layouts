// if this is the _top frame then we need to build a frameset 

if (window.self==window.top) {
  if (location.href.getQueryValue("lookupField")=="") {
    lcHref="wocoins.p" + document.location.search;
    lcHref=lcHref.setQueryValue('pvFrame','');
    window.top.location.replace(lcHref);
  }
}
