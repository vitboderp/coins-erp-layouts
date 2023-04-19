/*
 *      Coins Calculation syntax highlighter
 *
 *      based on
 *      Pig Latin Mode for CodeMirror 2
 *      @author Prasanth Jayachandran
 *      @link   https://github.com/prasanthj/pig-codemirror-2
 *  This implementation is adapted from PL/SQL mode in CodeMirror 2.
 */
CodeMirror.defineMode("coinscalc", function(_config, parserConfig) {
    var keywords = parserConfig.keywords,
        builtins = parserConfig.builtins,
        types = parserConfig.types,
        multiLineStrings = parserConfig.multiLineStrings;

    var isOperatorChar = /[*+\-%<>^,;=&?:\/!|]/;

    function chain(stream, state, f) {
        state.tokenize = f;
        return f(stream, state);
    }

    var type;
    function ret(tp, style) {
        type = tp;
        return style;
    }

    function tokenComment(stream, state) {
        var isEnd = false;
        var ch;
        while(ch = stream.next()) {
            if(ch == "/" && isEnd) {
                state.tokenize = tokenBase;
                break;
            }
            isEnd = (ch == "*");
        }
        return ret("comment", "comment");
    }

    function tokenString(quote) {
        return function(stream, state) {
            var escaped = false, next, end = false;
            while((next = stream.next()) != null) {
                if (next == quote && !escaped) {
                    end = true; break;
                }
                escaped = !escaped && next == "\\";
            }
            if (end || !(escaped || multiLineStrings))
                state.tokenize = tokenBase;
            return ret("string", "error");
        };
    }

    function tokenBase(stream, state) {
        var ch = stream.next();

        // is a start of string?
        if (ch == '"' || ch == "'")
            return chain(stream, state, tokenString(ch));
        // is it one of the special chars
        else if(/[\[\]{}\(\),;\.]/.test(ch))
            return ret(ch);
        // is it a number?
        else if(/\d/.test(ch)) {
            stream.eatWhile(/[\w\.]/);
            return ret("number", "number");
        }
        // multi line comment or operator
        else if (ch == "/") {
            if (stream.eat("*")) {
                return chain(stream, state, tokenComment);
            }
            else {
                stream.eatWhile(isOperatorChar);
                return ret("operator", "operator");
            }
        }
        // single line comment or operator
        else if (ch=="-") {
            if(stream.eat("-")){
                stream.skipToEnd();
                return ret("comment", "comment");
            }
            else {
                stream.eatWhile(isOperatorChar);
                return ret("operator", "operator");
            }
        }
        // is it an operator
        else if (isOperatorChar.test(ch)) {
            stream.eatWhile(isOperatorChar);
            return ret("operator", "operator");
        }
        else {
            // get the while word
            stream.eatWhile(/[\w\$_]/);
            // is it one of the listed keywords?
            if (keywords && keywords.propertyIsEnumerable(stream.current().toUpperCase())) {
                if (stream.eat(")") || stream.eat(".")) {
                    //keywords can be used as variables like flatten(group), group.$0 etc..
                }
                else {
                    return ("keyword", "keyword");
                }
            }
            // is it one of the builtin functions?
            if (builtins && builtins.propertyIsEnumerable(stream.current().toUpperCase()))
            {
                return ("keyword", "variable-2");
            }
            // is it one of the listed types?
            if (types && types.propertyIsEnumerable(stream.current().toUpperCase()))
                return ("keyword", "variable-3");
            // default is a 'variable'
            return ret("variable", "pig-word");
        }
    }

    // Interface
    return {
        startState: function() {
            return {
                tokenize: tokenBase,
                startOfLine: true
            };
        },

        token: function(stream, state) {
            if(stream.eatSpace()) return null;
            var style = state.tokenize(stream, state);
            return style;
        }
    };
});

(function() {
    function keywords(str) {
        var obj = {}, words = str.split(" ");
        for (var i = 0; i < words.length; ++i) obj[words[i]] = true;
        return obj;
    }

    var pBuiltins = "";
    
    // taken from QueryLexer.g
    var pKeywords = "";
    
    // data types
    var pTypes = "EVALUATE EVALUATE$ NAME NUMBER STRING INPUT END-EVAL PI UNKNOWN TODAY LT "
            + "LE EQ GE GT NE TIME SUM ENTRY BAND IF FACT MAX MIN NONZERO DATE DATESTRING "
            + "WEEKDAY DAY MONTH YEAR WEEKDAYS SET GET SET$ GET$ INLIST EQUAL LOOKUP CAN-DO "
            + "MASK INDEX R-INDEX NUM-ENTRIES METHOD IFMETHOD DEBUG LENGTH LIMIT RANGE TRUNCATE ABSOLUTE "
            + "ROUND ROUNDUP DECIMAL INTEGER "
        + "VARTOTAL VARCOUNT VARMAX VARMIN VARAVERAGE "
        + "ENTRY$ RIGHT$ LEFT$ SUBSTRING$ FILL$ REPLACE$ STRIP$ FORMAT$ TRIM$ RIGHT-TRIM$ "
            + "CAPS$ LENGTH$ TIME$ DATE$ STRING$ METHOD$ IFMETHOD$ IF$ CHR$ IFEXEC IFEXEC$ "
            + "GETATTR$ SETATTR$ RUN RUN$ EACH CAPFIRST$ ERRORMSG ERROR WARNING "
            + "IFUNDEFINED IFUNDEFINED$ UNDEFINE";
    //var pTypes = "BOOLEAN INT LONG FLOAT DOUBLE CHARARRAY BYTEARRAY BAG TUPLE MAP ";

    CodeMirror.defineMIME("coinscalc", {
        name: "coinscalc",
        builtins: keywords(pBuiltins),
        keywords: keywords(pKeywords),
        types: keywords(pTypes)
    });
    
    CodeMirror.extendMode("coinscalc", {
            commentStart: "",
            commentEnd: "",
            newlineAfterToken: function(_type, content, textAfter, state) {
              return false;
            }
      });
      
  
}());
