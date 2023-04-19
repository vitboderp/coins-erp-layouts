$(document).ready(function(){
    setupAccordion();
    documentsThumbsScroll();
    showThumbPreview();
    // $( "#resizable" ).hide();
});



// DOC VIEW RESIZE (jQueryUI)
$( function() {
    $( "#resizable" ).resizable({
        minWidth: 410,
        maxWidth: 1000,
        handles: 'w',
    });
} );


// SHOW DOC VIEW
function showDocSidebar() {
    $( "#resizable" ).show();
}
// END SHOW DOC VIEW

      
  
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
function setupAccordion() {
    var docAcc = document.getElementsByClassName("doc-accordion__head");
    var i;

    for (i = 0; i < docAcc.length; i++) {
        docAcc[i].addEventListener("click", function() {
        this.classList.toggle("is-active");
        var panel = this.nextElementSibling;
        panel.classList.toggle("is-active");
        console.log(panel.style.maxHeight);
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
// END ACCORDION



  
  
// FILE INPUT
$(document).ready(function(){
    $('input[name="doc-files"]').change(function(e){
        var fileName = e.target.files[0].name;
        $(".doc-file__success span").text(fileName);
    });
});
// END FILE INPUT
  


  
// DOCUMENT SCROLL
function documentsThumbsScroll() {
    var $item = $('.doc-list__thumbnails'),
    index = 0,
    step = 200,
    itemWidth = $item.width(),
    parentWidth = $('.doc-list').width(),
    maxIndex = Math.ceil(itemWidth/parentWidth),
    lastMove = 0 ;

    $item.css("left", "0px");
    $('.doc-list__scroll-left').hide();
    console.log(maxIndex,lastMove);

    $('.doc-list__scroll-left').click(function(){
        console.log(index);
        if (index > 0) {
        if ((index = 1) && (lastMove != 0)) {
            index--;
            console.log('2', index);
            $item.animate({'left':'+='+lastMove});
            $('.doc-list__scroll-right').show();
        }
        else {
            index--;
            console.log('3', index);
            $item.animate({'left':'+='+step});
            $('.doc-list__scroll-right').show();
        }
        }
    });

    $('.doc-list__scroll-right').click(function(){
        index++;
        console.log(index);
        $('.doc-list__scroll-left').show();
        var lastStep = itemWidth - index*step - parentWidth,
            move = lastStep+step;

        if(lastStep < index) {
        $item.animate({'left':'-='+move});
        lastMove = move;
        $('.doc-list__scroll-right').hide();
        }
        else {
        $item.animate({'left':'-='+step});
        }
    });
}
// END DOCUMENT SCROLL


// SHOW PREVIEW
function showThumbPreview() {
    $('.doc-list__thumb-img').click(function() {
        var dataUrl = $(this).attr('data-url');
        console.log(dataUrl);

        $(this).closest('.doc-preview__item').append('<img src="'+dataUrl+'" alt="">')
    });
}
   

// END SHOW PREVIEW
  
  
    
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
        console.log("DATA", data);
        console.log('adads', data.IR);

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
        console.log(key);
        console.log('requested ID', searchValue);

        function getInvoicesArr(id) {
            const invoices = data.IR.find(ir => ir.ID === id)?.Invoices;
            if (!invoices) return []; // Return an empty array if the ID is not found
            return invoices.map(inv => inv);
        }
        const invoicesArr = getInvoicesArr(searchValue);
        console.log(invoicesArr);
        
        let invoicesTumbnails = '';
        for (let i = 0; i < invoicesArr.length; i++) {
            console.log(invoicesArr[i].thumb);
            invoicesTumbnails += `
            <div class="doc-list__thumb">
                <div class="doc-list__thumb-img" style="background-image: url('${invoicesArr[i].thumb}');" data-url="${invoicesArr[i].url}"></div>
                <div class="doc-list__thumb-name">${invoicesArr[i].name}</div>
            </div>
            `;
        }


        const invoiceAccordion = `
            <div class="doc-accordion">
            <div class="doc-accordion__head">
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
                <button class="doc-list__scroll doc-list__scroll-left"><i class="icn icn-Chevron-Left-Filled"></i></button>
                <button class="doc-list__scroll doc-list__scroll-right"><i class="icn icn-Chevron-Right-Filled"></i></button>

                <div class="doc-list__thumbnails">
                    ${invoicesTumbnails}
                </div>
                </div>
                <div class="doc-preview">
                <div class="doc-preview__item">
                    <img src="./doc-view-files/p4.png" alt="">
                    <div>
                    <!-- <object data="./doc-view-files/Mixed Conditionals + Rules.pdf#toolbar=0" type="application/pdf" width="100%" height="500"></object> -->
                    <!-- <iframe src="./doc-view-files/Mixed Conditionals + Rules.pdf" style="width:100%;height:700px;"></iframe> -->
                    </div>
                </div>
                </div>
            </div>
            </div>
        `;


        thumbnailsContainer.append(invoiceAccordion);
        // showDocSidebar();
        setupAccordion();
        documentsThumbsScroll();
        showThumbPreview();
        });
    })();
}
  
  
  