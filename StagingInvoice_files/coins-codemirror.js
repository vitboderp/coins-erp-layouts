/*-
     Program: coins-codemirror.js
 Description: Code Mirror main
-*/
/* (function() { */
    function isFullScreen( cm ) {
        return /\bCodeMirror-fullscreen\b/.test( cm.getWrapperElement().className );
    }

    function winHeight() {
        return window.innerHeight || (document.documentElement || document.body).clientHeight;
    }
    function winWidth(){
            return window.innerWidth || (document.documentElement || document.body).clientWidth;
    }
    var savedScrollTop;
    function setFullScreen( cm, full ) {
        var wrap = cm.getWrapperElement();
        if ( full ) {
            wrap.className += " CodeMirror-fullscreen";
            wrap.style.height = winHeight() + "px";
            wrap.style.width = winWidth() + "px";
            document.documentElement.style.overflow = "hidden";
            savedScrollTop = document.documentElement.scrollTop;
            scrollTo(0,0);
        } else {
            wrap.className = wrap.className.replace( " CodeMirror-fullscreen", "" );
            wrap.style.height = "";
            wrap.style.width = "";
            document.documentElement.style.overflow = "";
            cm.getTextArea().focus();
            scrollTo(0, savedScrollTop);
        }
        cm.refresh();
    }

    CodeMirror.on( window, "resize", function() {
        //var showing = document.body.getElementsByClassName( "CodeMirror-fullscreen" )[0];
        var showing = jQuery( " .CodeMirror-fullscreen " )[0];
        if ( !showing ) return;
        showing.CodeMirror.getWrapperElement().style.height = winHeight() + "px";
        showing.CodeMirror.getWrapperElement().style.width  = winWidth() + "px";
    } );
    function _getRange( codeMirrorEditor ) {
        var range = {
            from: codeMirrorEditor.getCursor( 'start' ),
            to: codeMirrorEditor.getCursor( 'end' )
        };
        var startLineContent = codeMirrorEditor.getLine( range.from.line );
        var firstNonWhitespaceIndex = startLineContent.search( /[^\s]/ );
        range.from.ch = ( firstNonWhitespaceIndex > -1 ) ? firstNonWhitespaceIndex : 0;

        var endLineContent = codeMirrorEditor.getLine( range.to.line );
        range.to.ch = endLineContent.length;

        return range;
    }

    window.CoinsCodeMirror = {
        defaults: {
            autoCloseBrackets: true,
            extraKeys: {
                'Tab': 'indentMore',
                'Shift-Tab': 'indentLess',
                /* We can disable default kill line and add comment here
                 'Ctrl-K': function() {
                 },
                 */
                'Shift-Ctrl-/': function( codeMirrorEditor ) {
                    var range = _getRange( codeMirrorEditor );
                    codeMirrorEditor.commentRange( true, range.from, range.to );
                },
                'Shift-Ctrl-Alt-/': function( codeMirrorEditor ) {
                    var range = _getRange( codeMirrorEditor );
                    codeMirrorEditor.commentRange( false, range.from, range.to );
                },
                // fullscreen support
                "F11": function( cm ) {
                    setFullScreen( cm, !isFullScreen( cm ) );
                },
                "Esc": function( cm ) {
                    if ( isFullScreen( cm ) ) setFullScreen( cm, false );
                }
            },
            readOnly: false,
            styleActiveLine: true,
            lineNumbers: true,
            lineWrapping: true,
            highlightSelectionMatches: true,
            matchBrackets: true,
            indentUnit: 2,
            viewportMargin: Infinity
        },
        fromTextArea: function( textarea, options ) {
            return CodeMirror.fromTextArea( textarea, jQuery.extend( {}, this.defaults, options || {} ) );
        }
    };
    function startCodeMirror(sizeOptions,pbAutoClose){
    
        jQuery( 'codemirror-controls' ).find( 'input' ).prop( 'disabled', true );

        if(pbAutoClose!=undefined)
          CoinsCodeMirror.defaults.autoCloseBrackets = pbAutoClose;

            jQuery( '.codemirror-controls' ).find( 'input' ).prop( 'disabled', false );

            var $htmlWrapper = jQuery( '.codemirror-html' );
            for (var i = 0; i < $htmlWrapper.length; ++i){
              var htmlTextarea = jQuery( 'textarea', $htmlWrapper[i] )[0];
              if (htmlTextarea) {
                var htmlFoldFunc = CodeMirror.newFoldFunction( CodeMirror.tagRangeFinder );
                codeMirrorObjects[htmlTextarea.id] = CoinsCodeMirror.fromTextArea( htmlTextarea, {
                  mode: 'text/html'  //, readonly: true - when viewing...
                } );
                codeMirrorObjects[htmlTextarea.id].on( 'gutterClick', htmlFoldFunc );
                codeMirrorObjects[htmlTextarea.id].setSize(sizeOptions[htmlTextarea.id].width, sizeOptions[htmlTextarea.id].height);
              }
            }
            
            var $htmlWrapper = jQuery( '.codemirror-htmlro' );
            for (var i = 0; i < $htmlWrapper.length; ++i){
              var htmlTextarea = jQuery( 'textarea', $htmlWrapper[i] )[0];
              if (htmlTextarea) {
                var htmlFoldFunc = CodeMirror.newFoldFunction( CodeMirror.tagRangeFinder );
                codeMirrorObjects[htmlTextarea.id] = CoinsCodeMirror.fromTextArea( htmlTextarea, {
                  mode: 'text/html',
                  readOnly: true 
                } );
                codeMirrorObjects[htmlTextarea.id].on( 'gutterClick', htmlFoldFunc );
                codeMirrorObjects[htmlTextarea.id].setSize(sizeOptions[htmlTextarea.id].width, sizeOptions[htmlTextarea.id].height);
              }
            }
            
            //var jsCodeMirror = new Array;
            var $jsWrapper = jQuery( '.codemirror-js' );
            for (var i = 0; i < $jsWrapper.length; ++i){
              var jsTextarea = jQuery( 'textarea', $jsWrapper[i])[0];
              if (jsTextarea) {
                var jsFoldFunc = CodeMirror.newFoldFunction( CodeMirror.braceRangeFinder );
                codeMirrorObjects[jsTextarea.id] = CoinsCodeMirror.fromTextArea( jsTextarea, {
                  mode: 'text/javascript'
                } );
                codeMirrorObjects[jsTextarea.id].on( 'gutterClick', jsFoldFunc );
                codeMirrorObjects[jsTextarea.id].setSize(sizeOptions[jsTextarea.id].width, sizeOptions[jsTextarea.id].height);
              }
            }
            
            var $jsWrapper = jQuery( '.codemirror-jsro' );
            for (var i = 0; i < $jsWrapper.length; ++i){
              var jsTextarea = jQuery( 'textarea', $jsWrapper[i])[0];
              if (jsTextarea){
                
                var jsFoldFunc = CodeMirror.newFoldFunction( CodeMirror.braceRangeFinder );
                codeMirrorObjects[jsTextarea.id] = CoinsCodeMirror.fromTextArea( jsTextarea, {
                  mode: 'text/javascript',
                  readOnly: true
                } );
                codeMirrorObjects[jsTextarea.id].on( 'gutterClick', jsFoldFunc );
                codeMirrorObjects[jsTextarea.id].setSize(sizeOptions[jsTextarea.id].width, sizeOptions[jsTextarea.id].height);
              }            
            } 
            
            var $xmlWrapper = jQuery( '.codemirror-xml' );
            for (var i = 0; i < $xmlWrapper.length; ++i){
              var xmlTextarea = jQuery( 'textarea', $xmlWrapper[i] )[0];
              if (xmlTextarea) {
                var xmlFoldFunc = CodeMirror.newFoldFunction( CodeMirror.tagRangeFinder );
                codeMirrorObjects[xmlTextarea.id] = CoinsCodeMirror.fromTextArea( xmlTextarea, {
                  mode: 'text/xml'  //, readonly: true - when viewing...
                } );
                codeMirrorObjects[xmlTextarea.id].on( 'gutterClick', xmlFoldFunc );
                codeMirrorObjects[xmlTextarea.id].setSize(sizeOptions[xmlTextarea.id].width, sizeOptions[xmlTextarea.id].height);
              }
            }
                        
            var $xmlWrapper = jQuery( '.codemirror-xmlro' );
            for (var i = 0; i < $xmlWrapper.length; ++i){
              var xmlTextarea = jQuery( 'textarea', $xmlWrapper[i] )[0];
              if (xmlTextarea) {
                var xmlFoldFunc = CodeMirror.newFoldFunction( CodeMirror.tagRangeFinder );
                    codeMirrorObjects[xmlTextarea.id] = CoinsCodeMirror.fromTextArea( xmlTextarea, {
                      mode: 'text/xml',
                      readOnly: true 
                } );
                codeMirrorObjects[xmlTextarea.id].on( 'gutterClick', xmlFoldFunc );
                codeMirrorObjects[xmlTextarea.id].setSize(sizeOptions[xmlTextarea.id].width, sizeOptions[xmlTextarea.id].height);
              }
            }
            
            var $cssWrapper = jQuery( '.codemirror-css' );
            for (var i = 0; i < $cssWrapper.length; ++i){
              var cssTextarea = jQuery( 'textarea', $cssWrapper[i] )[0];
              if (cssTextarea) {
                var cssFoldFunc = CodeMirror.newFoldFunction( CodeMirror.tagRangeFinder );
                codeMirrorObjects[cssTextarea.id] = CoinsCodeMirror.fromTextArea( cssTextarea, {
                  mode: 'text/css'  //, readonly: true - when viewing...
                } );
                codeMirrorObjects[cssTextarea.id].on( 'gutterClick', cssFoldFunc );
                codeMirrorObjects[cssTextarea.id].setSize(sizeOptions[cssTextarea.id].width, sizeOptions[cssTextarea.id].height);
              }
            }
             
            var $cssWrapper = jQuery( '.codemirror-cssro' );
            for (var i = 0; i < $cssWrapper.length; ++i){
              var cssTextarea = jQuery( 'textarea', $cssWrapper[i] )[0];
              if (cssTextarea) {
                var cssFoldFunc = CodeMirror.newFoldFunction( CodeMirror.tagRangeFinder );
                codeMirrorObjects[cssTextarea.id] = CoinsCodeMirror.fromTextArea( cssTextarea, {
                  mode: 'text/css',
                  readOnly: true
                } );
                codeMirrorObjects[cssTextarea.id].on( 'gutterClick', cssFoldFunc );
                codeMirrorObjects[cssTextarea.id].setSize(sizeOptions[cssTextarea.id].width, sizeOptions[cssTextarea.id].height);
              }
            }            
            
            var $progressWrapper = jQuery( '.codemirror-progress' );
            for (var i = 0; i < $progressWrapper.length; ++i){
              var progressTextarea = jQuery( 'textarea', $progressWrapper[i])[0];
              if (progressTextarea){
                var progressFoldFunc = CodeMirror.newFoldFunction( CodeMirror.indentRangeFinder );
                codeMirrorObjects[progressTextarea.id] = CoinsCodeMirror.fromTextArea( progressTextarea, {
                  mode: 'progress'
                } );
                codeMirrorObjects[progressTextarea.id].on( 'gutterClick', progressFoldFunc );
                codeMirrorObjects[progressTextarea.id].setSize(sizeOptions[progressTextarea.id].width, sizeOptions[progressTextarea.id].height);
              }
            }
            
            var $progressWrapper = jQuery( '.codemirror-progressro' );
            for (var i = 0; i < $progressWrapper.length; ++i){
              var progressTextarea = jQuery( 'textarea', $progressWrapper[i])[0];
              if (progressTextarea){
                var progressFoldFunc = CodeMirror.newFoldFunction( CodeMirror.indentRangeFinder );
                codeMirrorObjects[progressTextarea.id] = CoinsCodeMirror.fromTextArea( progressTextarea, {
                  mode: 'progress',
                  readOnly: true
                } );
                codeMirrorObjects[progressTextarea.id].on( 'gutterClick', progressFoldFunc );
                codeMirrorObjects[progressTextarea.id].setSize(sizeOptions[progressTextarea.id].width, sizeOptions[progressTextarea.id].height);
              }
            }
            
            
            var $coinscalcWrapper = jQuery( '.codemirror-coinscalc' );
            for (var i = 0; i < $coinscalcWrapper.length; ++i){
              var coinscalcTextarea = jQuery( 'textarea', $coinscalcWrapper[i])[0];
              if (coinscalcTextarea){
                var coinscalcFoldFunc = CodeMirror.newFoldFunction( CodeMirror.indentRangeFinder );
                codeMirrorObjects[coinscalcTextarea.id] = CoinsCodeMirror.fromTextArea( coinscalcTextarea, {
                  mode: 'coinscalc'
                } );
                codeMirrorObjects[coinscalcTextarea.id].on( 'gutterClick', coinscalcFoldFunc );
                codeMirrorObjects[coinscalcTextarea.id].setSize(sizeOptions[coinscalcTextarea.id].width, sizeOptions[coinscalcTextarea.id].height);
              }
            }
            
            var $coinscalcWrapper = jQuery( '.codemirror-coinscalcro' );
            for (var i = 0; i < $coinscalcWrapper.length; ++i){
              var coinscalcTextarea = jQuery( 'textarea', $coinscalcWrapper[i])[0];
              if (coinscalcTextarea){
                var coinscalcFoldFunc = CodeMirror.newFoldFunction( CodeMirror.indentRangeFinder );
                codeMirrorObjects[coinscalcTextarea.id] = CoinsCodeMirror.fromTextArea( coinscalcTextarea, {
                  mode: 'coinscalc',
                  readOnly: true
                } );
                codeMirrorObjects[coinscalcTextarea.id].on( 'gutterClick', coinscalcFoldFunc );
                codeMirrorObjects[coinscalcTextarea.id].setSize(sizeOptions[coinscalcTextarea.id].width, sizeOptions[coinscalcTextarea.id].height);
              }
            }
            
            this.disabled = true;
        //} );
        //}
    //} );
    }
/* }()); */
