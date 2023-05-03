$(document).ready(function(){
    showThumbPreview();
});



// DOC VIEW RESIZE (jQueryUI needed)
function openSidebar() {
    $('#browseContent').width('80%');
    $( "#DocViewResizable" ).show();

    $( "#DocViewResizable" ).resizable({
        minWidth: 410,
        maxWidth: 1000,
        handles: 'w',
        stop: function( event, ui ) {
            // show or hide thumbnails scrolling buttons
            scrollBtnsPreset();
        },
    });
}

function closeSidebar() {
    $('#browseContent').width('100%');
    $( "#DocViewResizable" ).hide();
}
// END DOC VIEW RESIZE (jQueryUI needed)


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

    var openDoc = document.querySelectorAll(".defaultOpenDoc");
    for (i = 0; i < openDoc.length; ++i) {
        openDoc[i].click();
    };
}

// ACCORDION MAX-HEIGHT UPD
function updateMaxHeight(el, height) {
    el.css('max-height', height);
}
// END ACCORDION MAX-HEIGHT UPD
// END ACCORDION

  
// FILE INPUT
function documentsInput() {
    $('input[name="doc-files"]').change(function(e){

        var list = e.target.files;

        if (list.length > 1) {
            $(this).closest('.doc-file-area').find(".doc-file__success").text(list.length + ' files have been selected');
        } else {
            var fileName = e.target.files[0].name;
            $(this).closest('.doc-file-area').find(".doc-file__success").text(fileName + ' has been selected');
        }
        
    });
}
// END FILE INPUT


// doc scroll buttons
function thumbsScrollLeft(btn) {
    event.preventDefault();

    // debounce functionality
    if (btn.disabled) {
        return;
    }
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false;
    }, 1000);

    // action
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
    }
    else {
        animateScroll(step);
    }
}

function thumbsScrollRight(btn) {
    event.preventDefault();

    // debounce functionality
    if (btn.disabled) {
        return;
    }
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false;
    }, 1000);

    // action
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
    }
    else {
        animateScroll(step);
    }  
}

function scrollBtnsPreset() {
    var $item = $('.doc-list__thumbnails');

    $item.each(function() {
        var $docList = $(this).parent('.doc-list'),
            parentW = $docList.width(),
            thumbsW = $(this).width();
        
        if (thumbsW <= parentW) {
            $docList.find('.doc-list__scroll-left').hide();
            $docList.find('.doc-list__scroll-right').hide();
            $(this).animate({ 'left':'0' }, 400);
        } else {
            $docList.find('.doc-list__scroll-left').show();
            $docList.find('.doc-list__scroll-right').show();
        }
    });
}
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
}
// END DOC ACTIONS


// DOWNLOADING DOCUMENTS
function downloadSelectedDocs() {
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
}
// END DOWNLOADING DOCUMENTS


// PRINTING DOCUMENTS
function printSelectedDocs() {
    const checkedCheckboxes = document.querySelectorAll('.doc-list__thumb-checkbox input[type="checkbox"]:checked');

    if (checkedCheckboxes.length > 0) {
        checkedCheckboxes.forEach(checkedCheckbox => {
            const thumbnail = checkedCheckbox.closest('.doc-list__thumb').querySelector('.doc-list__thumb-img');

            const dataUrl = thumbnail.getAttribute('data-url');

            const image = new Image();
            image.crossOrigin = "anonymous";
            image.src = dataUrl;

            image.addEventListener('load', () => {
                const printWindow = window.open('', '_blank');
                printWindow.document.write(`<html><head><style>@media print{img{max-width: 100%; height: auto;}}</style></head><body><img src="${dataUrl}"></body></html>`);
                printWindow.document.close();
                
                printWindow.addEventListener('load', () => {
                printWindow.print();
                });
            });
        });
    }
}
// END PRINTING DOCUMENTS


// EMAIL DOCUMENTS  
  
// END EMAIL DOCUMENTS
  
  
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
                    </div>`;
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
                        <form action="" class="doc-add-form">
                            <input type="file" name="doc-files" required="required" multiple="multiple"/>
                            <button type="button" class="doc-accordion__add">Add File</button>
                        </form>
                    </div>
                </div>
                <div class="doc-accordion__body">
                    <div class="doc-list">
                        <button type="button" class="doc-list__scroll doc-list__scroll-left" onclick="thumbsScrollLeft(this);"><i class="icn icn-Chevron-Left-Filled"></i></button>
                        <button type="button" class="doc-list__scroll doc-list__scroll-right" onclick="thumbsScrollRight(this);"><i class="icn icn-Chevron-Right-Filled"></i></button>
                        <div class="doc-list__thumbnails">
                            ${invoicesTumbnails}
                        </div>
                    </div>
                    <div class="doc-preview">
                        <div class="doc-preview__item">
                            
                        </div>
                    </div>
                </div>
                </div>`;

            const addFilesArea = `
                <div class="doc-accordion">
                    <div class="doc-accordion__head defaultOpenDoc" id=${randomId}>
                        <div class="doc-accordion__type">
                            <i class="icn icn-Chevron-Right-Filled"></i>
                            <span>${searchValue}</span>
                        </div>
                        <div class="doc-accordion__actions">
                            <div class="doc-accordion__counter">${invoicesArr.length} files</div>
                            <form action="" class="doc-add-form">
                                <input type="file" name="doc-files" required="required" multiple="multiple"/>
                                <button type="button" class="doc-accordion__add">Add File</button>
                            </form>
                        </div>
                    </div>
                    <div class="doc-accordion__body">
                        <div class="form-group doc-file-area">
                            <form action="" class="doc-file-area-form">
                                <input type="file" name="doc-files" required="required" multiple="multiple"/>
                            
                                <div class="doc-file__dummy">
                                    <div class="doc-file__success"></div>
                                    <div class="doc-file__default">
                                        <b>No files added.</b><br>
                                        Drag & Drop any files right here or <br>
                                        <span class="doc-file__highlighted">select it from your computer</span>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`


            if (invoicesArr.length > 0) {
                thumbnailsContainer.append(invoiceAccordion);
            } else {
                thumbnailsContainer.append(addFilesArea);
            }

            openSidebar();
            scrollBtnsPreset();
            setupAccordion([document.getElementById(randomId)]);
            showThumbPreview();
            chbxActions();
            documentsInput();
        });
    })();
}
// END SHOW INVOICE DATA
  
  
  