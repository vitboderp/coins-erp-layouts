$(document).ready(function(){
    setupAccordion(document.getElementsByClassName("doc-accordion__head"));
    showThumbPreview();
    $( "#DocViewResizable" ).hide();
});







// DOC VIEW RESIZE (jQueryUI)
function openSidebar() {
    $('#browseContent').width('80%');
    $( "#DocViewResizable" ).show();

    $( "#DocViewResizable" ).resizable({
        minWidth: 410,
        maxWidth: 1000,
        handles: 'w',
        stop: function( event, ui ) {
            // console.log(event, ui);
            // documentsThumbsScroll();
            // console.log('documentsThumbsScroll()');
        },
    });
}

function closeSidebar() {
    $('#browseContent').width('100%');
    $( "#DocViewResizable" ).hide();
}






      
  
// TABS
function openTab(evt, tabName) {
    evt.preventDefault();
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("cds-tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("cds-tabs__btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" is-active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " is-active";
}
// END TABS



  



  
// ACCORDION
function setupAccordion(el) {
    var docAcc = el;
    var i;

    for (i = 0; i < docAcc.length; i++) {
        docAcc[i].addEventListener("click", function() {
            this.classList.remove("defaultOpenDoc");
            this.classList.toggle("is-active");
            var panel = this.nextElementSibling;
            panel.classList.toggle("is-active");

            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            } 
        });
    }

    // var openDoc = document.querySelectorAll(".defaultOpenDoc");
    // for (i = 0; i < openDoc.length; ++i) {
    //     openDoc[i].click();
    // };
}

// ACCORDION MAX-HEIGHT UPD
function updateMaxHeight(el, height) {
    el.css('max-height', height);
}
// END ACCORDION MAX-HEIGHT UPD
// END ACCORDION

  
  
// FILE INPUT
$(document).ready(function(){
    $('input[name="doc-files"]').change(function(e){
        var fileName = e.target.files[0].name;
        $(".doc-file__success span").text(fileName);
    });
});
// END FILE INPUT
  







// doc scroll buttons
function thumbsScrollLeft(btn) {
    event.preventDefault();
    var $item = $(btn).siblings('.doc-list__thumbnails'),
        $docList = $(btn).parent('.doc-list'),
        step = 200;

    var parentX = $docList.offset().left,
        thumbsX = $item.offset().left,
        parentW = $docList.width(),
        thumbsW = $item.width(),
        offset = thumbsX-parentX;

    parentW = $docList.width(),
    thumbsW = $item.width();

    function animateScroll(val) {
        $item.animate({
            'left':'+='+val
        }, 400, function() {
            parentX = $docList.offset().left;
            thumbsX = $item.offset().left;
            offset = thumbsX-parentX;
        });
    }

    if (Math.abs(step) > parentX-thumbsX) {
        animateScroll(parentX-thumbsX);
        console.log('last step left done');
    }
    else {
        animateScroll(step);
        console.log('step left');
    }
}

function thumbsScrollRight(btn) {
    event.preventDefault();
    var $item = $(btn).siblings('.doc-list__thumbnails'),
        $docList = $(btn).parent('.doc-list'),
        step = 200;

    var parentX = $docList.offset().left,
        thumbsX = $item.offset().left,
        parentW = $docList.width(),
        thumbsW = $item.width(),
        offset = thumbsX-parentX;

    var lastStep = thumbsW-parentW+offset;

    parentW = $('.doc-list').width(),
    thumbsW = $item.width();

    function animateScroll(val) {
        $item.animate({
            'left':'-='+val
        }, 400, function() {
            parentX = $('.doc-list').offset().left;
            thumbsX = $item.offset().left;
            offset = thumbsX-parentX;
        });
    }

    if (Math.abs(offset) > lastStep) {
        animateScroll(lastStep);
        console.log('last step right done');
    }
    else {
        animateScroll(step);
        console.log('step right');
    }  
}

$(document).ready(function() {
    var canClick = true;
    $('.doc-list__scroll-left').click(function() {
        event.preventDefault();
        if(canClick) {
            canClick = false;
            setTimeout(function() {
                canClick = true;
            }, 500);
            thumbsScrollLeft(this);
        }
    });
    $('.doc-list__scroll-right').click(function() {
        event.preventDefault();
        if(canClick) {
            canClick = false;
            setTimeout(function() {
                canClick = true;
            }, 500);
            thumbsScrollRight(this);
        }
    });
});
// end doc scroll buttons



// SHOW PREVIEW
function showThumbPreview() {
    $('.doc-list__thumb-img').click(function() {
        $(this).closest('.doc-list__thumbnails').find('.doc-list__thumb-img').removeClass('is-selected');
        $(this).addClass('is-selected');

        var dataUrl = $(this).attr('data-url'),
            docBody = $(this).closest('.doc-accordion__body'),
            preview = $(this).closest('.doc-accordion__body').find('.doc-preview__item'),
            list = $(this).closest('.doc-accordion__body').find('.doc-list');

        preview.empty();
        preview.append('<img src="'+dataUrl+'" alt="">');

        updateMaxHeight(docBody, preview.height()+list.height());
    });
}
// END SHOW PREVIEW




// DOC ACTIONS
function chbxActions() {
    let chbx = $('.doc-list__checkbox');
    let counter = 0;
    let docActionsTemplate = $('#documentActions');

    chbx.change(function() {
        chbx.each(function() {
            let checked = $('.doc-list__checkbox:checked');
            counter = checked.length;
        });

        docActionsTemplate.show();
        if (counter == 0) {
            $('#documentActions').hide();
        }
        if (counter == 1) {
            $('#checkedDocumentsCounter').text(counter + ' file selected');    
        } else {
            $('#checkedDocumentsCounter').text(counter + ' files selected');
        }
    });

    $('#uncheckAllDocs').click(function(event){
        event.preventDefault();
        chbx.each(function() {
            this.checked = false;
        });
        $('#documentActions').hide();
    });

    $('.doc-actions__btn').click(function(){
        console.log('action');
    });



    // Get the download button
    const downloadBtn = document.getElementById('downloadDocs');

    downloadBtn.addEventListener('click', () => {
        const checkedCheckboxes = document.querySelectorAll('.doc-list__thumb-checkbox input[type="checkbox"]:checked');

        if (checkedCheckboxes.length > 0) {
            checkedCheckboxes.forEach(checkedCheckbox => {
            const thumbnail = checkedCheckbox.closest('.doc-list__thumb').querySelector('.doc-list__thumb-img');

            const dataUrl = thumbnail.getAttribute('data-url');

            fetch(dataUrl)
                .then(response => response.blob())
                .then(blob => {
                    const blobUrl = URL.createObjectURL(blob);

                    const downloadLink = document.createElement('a');
                    downloadLink.setAttribute('href', blobUrl);
                    downloadLink.setAttribute('download', '');
                    downloadLink.style.display = 'none';

                    document.body.appendChild(downloadLink);

                    downloadLink.click();

                    document.body.removeChild(downloadLink);
                    URL.revokeObjectURL(blobUrl);
                })
                .catch(error => {
                    console.error(error);
                });
            });
        }
    });


// Get the print button
const printBtn = document.getElementById('printBtn');

// Add a click event listener to the print button
printBtn.addEventListener('click', () => {
  // Get all checked checkboxes
  const checkedCheckboxes = document.querySelectorAll('.doc-list__thumb-checkbox input[type="checkbox"]:checked');

  if (checkedCheckboxes.length > 0) {
    // Loop through all checked checkboxes
    checkedCheckboxes.forEach(checkedCheckbox => {
      // Get the closest thumbnail image
      const thumbnail = checkedCheckbox.closest('.doc-list__thumb').querySelector('.doc-list__thumb-img');

      // Get the data-url attribute
      const dataUrl = thumbnail.getAttribute('data-url');

      // Create a new image element with the data-url as the source
      const image = new Image();
      image.crossOrigin = "anonymous"; // allow images to be loaded from different domains
      image.src = dataUrl;

      // Wait for the image to load and then trigger the print dialog
      image.addEventListener('load', () => {
        // Create a new window with the image
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<html><head><style>@media print{img{max-width: 100%; height: auto;}}</style></head><body><img src="${dataUrl}"></body></html>`);
        printWindow.document.close();
        
        // Wait for the print window to load and then trigger the print dialog
        printWindow.addEventListener('load', () => {
          printWindow.print();
        });
      });
    });
  }
});






}


$(document).ready(function() {
    chbxActions();
});
// END DOC ACTIONS
  
  

// GENERATE RANDOM ID
function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  
    return result;
}
// END GENERATE RANDOM ID





// SHOW INVOICE DATA
function showInvoiceData(el) {
    event.preventDefault();
    
    (function() {
    var dmAPI = "https://api.npoint.io/9b02206c5b4360da8aff";
    var thumbnailsContainer = $('#invoicesTab');

    $.getJSON( dmAPI, {
        tags: "documents",
        tagmode: "any",
        format: "json"
    })
        .done(function( data ) {
            // console.log("DATA", data);
            // console.log("DATA IR", data.IR);

            function findKeyByValue(obj, value) {
                for (let key in obj) {
                if (typeof obj[key] === "object") {
                    const result = findKeyByValue(obj[key], value);
                    if (result !== null) {
                    return result;
                    }
                } else if (obj[key] === value) {
                    return key;
                }
                }
                return null;
            }

            const searchValue = el.innerHTML;
            const key = findKeyByValue(data, searchValue);
            // console.log(key);
            // console.log('requested ID', searchValue);

            function getInvoicesArr(id) {
                const invoices = data.IR.find(ir => ir.ID === id)?.Invoices;
                if (!invoices) return []; // Return an empty array if the ID is not found
                return invoices.map(inv => inv);
            }
            const invoicesArr = getInvoicesArr(searchValue);
            // console.log(invoicesArr);
            
            let invoicesTumbnails = '';
            for (let i = 0; i < invoicesArr.length; i++) {
                // console.log(invoicesArr[i].thumb);
                invoicesTumbnails += `
                <div class="doc-list__thumb">
                    <div class="doc-list__thumb-checkbox">
                        <input type="checkbox" name="thumb_selector" class="doc-list__checkbox">
                    </div>
                    <div class="doc-list__thumb-img" style="background-image: url('${invoicesArr[i].thumb}');" data-url="${invoicesArr[i].url}"></div>
                    <div class="doc-list__thumb-name">${invoicesArr[i].name}</div>
                </div>
                `;
            }

            const randomId = generateRandomId(8);

            const invoiceAccordion = `
                <div class="doc-accordion">
                <div class="doc-accordion__head defaultOpenDoc" id=${randomId}>
                    <div class="doc-accordion__type">
                    <i class="icn icn-Chevron-Right-Filled"></i>
                    <span>${searchValue}</span>
                    </div>
                    <div class="doc-accordion__actions">
                    <div class="doc-accordion__counter">${invoicesArr.length} files</div>
                    <button type="button" class="doc-accordion__add">Add File</button>
                    </div>
                </div>
                <div class="doc-accordion__body">
                    <div class="doc-list">
                    <button type="button" class="doc-list__scroll doc-list__scroll-left"><i class="icn icn-Chevron-Left-Filled"></i></button>
                    <button type="button" class="doc-list__scroll doc-list__scroll-right"><i class="icn icn-Chevron-Right-Filled"></i></button>

                    <div class="doc-list__thumbnails">
                        ${invoicesTumbnails}
                    </div>
                    </div>
                    <div class="doc-preview">
                    <div class="doc-preview__item">
                        
                        
                    </div>
                    </div>
                </div>
                </div>
            `;


            thumbnailsContainer.append(invoiceAccordion);

            openSidebar();
            setupAccordion([document.getElementById(randomId)]);
            showThumbPreview();
            chbxActions();
            $('.doc-list__scroll-left').click(function() {
                thumbsScrollLeft(this);
            });
            $('.doc-list__scroll-right').click(function() {
                thumbsScrollRight(this);
            });
            
        });
    })();
}
// END SHOW INVOICE DATA
  
  
  