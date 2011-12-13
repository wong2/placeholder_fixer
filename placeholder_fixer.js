function PlaceholderFixer(){
    var tmp_input = document.createElement("input");
    this.is_placeholder_supported =  "placeholder" in tmp_input;
    this.is_onpropertychange_supported = "onpropertychange" in tmp_input; 
    this.init();
}
PlaceholderFixer.prototype._addEvent = function(element, type, handler){
    if (element.addEventListener){
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent){
        element.attachEvent("on" + type, handler);
    } else {
        element["on" + type] = handler;
    }
};
PlaceholderFixer.prototype.init = function(){
    var me = this;
    var inputs = document.getElementsByTagName("input");
    for(var i=0, len=inputs.length; i<len; i++){
        var input = inputs[i],
            text  = input.getAttribute("placeholder");    
        if(text && !this.is_placeholder_supported){
            me._fix(input, text);
        }
        me._addChangedProperty(input);
    }
};
PlaceholderFixer.prototype._addChangedProperty = function(input){
    var me = this;
    input.changed = false;
    input.getValue = function(){
        return this.changed ? this.value : "";
    };
    // this could be improved, later
    if(input.addEventListener){
        input.addEventListener("input", function(){
            this.changed = !!this.value;
        }, false);
    } else {
        input.attachEvent("onpropertychange", function(evt) {
            var i = input;
            evt = evt || window.event;
            if (evt.propertyName == "value") {
                i.changed = !!i.value;
                if(i.changed){
                    i.style.color = "black";
                }
            }
        });
    }
};
PlaceholderFixer.prototype._setPlaceholderText = function(input, text){
    input.value = text;
    input.style.color = "#A9A9A9";
    input.changed = false;
};
PlaceholderFixer.prototype._fix = function(input, text){
    var me = this;
    me._setPlaceholderText(input, text);
    me._addEvent(input, "focus", function(){
        if(!input.changed){
            input.value = "";
        }
    });
    me._addEvent(input, "blur", function(){
        if(!input.value){
            me._setPlaceholderText(input, text);
        }
    });
};
var fixer = new PlaceholderFixer();
