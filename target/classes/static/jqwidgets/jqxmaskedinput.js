/*
jQWidgets v8.2.0 (2019-Sep)
Copyright (c) 2011-2019 jQWidgets.
License: https://jqwidgets.com/license/
*/
/* eslint-disable */

(function(a){a.jqx.jqxWidget("jqxMaskedInput","",{});a.extend(a.jqx._jqxMaskedInput.prototype,{defineInstance:function(){var b={value:null,mask:"99999",width:200,height:25,textAlign:"left",readOnly:false,cookies:false,promptChar:"_",placeHolder:"",template:"",rtl:false,disabled:false,hint:true,events:["valueChanged","textchanged","mousedown","mouseup","keydown","keyup","keypress","change"],aria:{"aria-valuenow":{name:"value",type:"string"},"aria-disabled":{name:"disabled",type:"boolean"}}};if(this===a.jqx._jqxMaskedInput.prototype){return b}a.extend(true,this,b);return b},createInstance:function(){this.render()},render:function(){var e=this;e.element.setAttribute("role","textbox");e.element.setAttribute("data-role","input");e.host.addClass(e.toThemeProperty("jqx-maskedinput"));var f=e.element.getAttribute("value");if(f!==undefined&&f!==""&&f!==null){e.value=f}a.jqx.aria(this);a.jqx.aria(this,"aria-multiline",false);a.jqx.aria(this,"aria-readonly",e.readOnly);e._helpers=[];e._helpers.element=new jqxHelper(e.element);e._helpers.element.addClass(e.toThemeProperty("jqx-input jqx-input-widget jqx-rc-all jqx-widget jqx-widget-content"));var b=e.element.getAttribute("name");if(e.element.nodeName.toLowerCase()==="div"){e.element.innerHTML="";var d=document.createElement("input");d.setAttribute("type","textarea");d.setAttribute("autocomplete","off");d.setAttribute("autocorrect","off");d.setAttribute("autocapitalize","off");d.setAttribute("spellcheck",false);d.setAttribute("name",b);e.element.appendChild(d);e.maskbox=a(d);if(e.disabled){e._helpers.element.addClass(e.toThemeProperty("jqx-input-disabled jqx-fill-state-disabled"));d.setAttribute("disabled",true)}}else{e.maskbox=e.host;e.element.setAttribute("autocomplete","off");e.element.setAttribute("autocorrect","off");e.element.setAttribute("autocapitalize","off");e.element.setAttribute("spellcheck",false);e.element.setAttribute("name",b);if(e.disabled){e._helpers.element.addClass(e.toThemeProperty("jqx-input-disabled jqx-fill-state-disabled"));e.element.setAttribute("disabled",true)}}e._helpers.maskbox=new jqxHelper(e.maskbox[0]);e._helpers.maskbox.addClass(e.toThemeProperty("jqx-reset jqx-input-content jqx-widget-content"));if(e.rtl){e._helpers.maskbox.addClass(e.toThemeProperty("jqx-rtl"))}e.propertyChangeMap.disabled=function(g,i,h,j){if(j){g._helpers.maskbox.addClass(e.toThemeProperty("jqx-input-disabled"))}else{g._helpers.maskbox.removeClass(e.toThemeProperty("jqx-input-disabled"))}};e.selectedText="";e.self=this;e.oldValue=e._value();e.items=[];e._initializeLiterals();e._render();if(e.value!=null){e.inputValue(e.value.toString())}if(e.host.parents("form").length>0){e.host.parents("form").on("reset",function(){setTimeout(function(){e.clearValue()},10)})}e.addHandlers();if(e.cookies){var c=a.jqx.cookie.cookie("maskedInput."+e.element.id);if(c){e.val(c)}}},addHandlers:function(){var c=this;var b="";this.addHandler(this.maskbox,"blur",function(){if(c.rtl){c.maskbox.css("direction","ltr")}c._helpers.maskbox.removeClass(c.toThemeProperty("jqx-fill-state-focus"));if(c.maskbox.val()!==b){c._raiseEvent(7,{type:"keyboard"});if(c.cookies){a.jqx.cookie.cookie("maskedInput."+c.element.id,c.maskbox.val())}}});this.addHandler(this.maskbox,"focus",function(){b=c.maskbox[0].value;if(c.rtl){c.maskbox[0].style.direction="rtl"}c._helpers.element.addClass(c.toThemeProperty("jqx-fill-state-focus"))});this.addHandler(this.host,"keydown",function(f){var g=c.readOnly;var e=f.charCode?f.charCode:f.keyCode?f.keyCode:0;if(g||c.disabled){return false}var d=c._handleKeyDown(f,e);if(!d){if(f.preventDefault){f.preventDefault()}if(f.stopPropagation){f.stopPropagation()}}return d});this.addHandler(this.host,"keyup",function(d){var e=c.readOnly;if(e||c.disabled){return true}if(d.preventDefault){d.preventDefault()}if(d.stopPropagation){d.stopPropagation()}return false});this.addHandler(this.host,"keypress",function(f){var g=c.readOnly;var e=f.charCode?f.charCode:f.keyCode?f.keyCode:0;if(g||c.disabled){return true}var d=c._handleKeyPress(f,e);if(!d){if(f.preventDefault){f.preventDefault()}if(f.stopPropagation){f.stopPropagation()}}return d})},focus:function(){try{var c=this;c.maskbox.focus();setTimeout(function(){c.maskbox.focus()})}catch(b){}},_getString:function(){var c="";for(var b=0;b<this.items.length;b++){var d=this.items[b].character;if((this.items[b].character===this.promptChar)&&(this.promptChar!==this.items[b].defaultCharacter)){c+=this.items[b].defaultCharacter}else{c+=d}}return c},_initializeLiterals:function(){if(this.mask===undefined||this.mask===null){this.items=[];return}var h=this;var l=function(o,n,i){var j={};j.character=o;j.regex=n;j.canEdit=i;j.defaultCharacter=h.promptChar;return j};this.mask=this.mask.toString();var c=this.mask.length;for(var f=0;f<c;f++){var g=this.mask.substring(f,f+1);var k="";var b=false;if(g==="["){for(var d=f;d<c;d++){var e=this.mask.substring(d,d+1);if(e==="]"){break}}k="("+this.mask.substring(f,d+1)+")";f=d;b=true}if(g==="#"){k="(\\d|[+]|[-])";b=true}else{if(g==="9"||g==="0"){k="\\d";b=true}else{if(g==="$"){b=false}else{if(g==="/"||g===":"){b=false}else{if(g==="A"||g==="a"){k="\\w";b=true}else{if(g==="c"||g==="C"){k=".";b=true}else{if(g==="L"||g==="l"){k="([a-zA-Z])";b=true}}}}}}}var m={};if(b){m=l(this.promptChar,k,b)}else{m=l(g,k,b)}this.items.push(m)}},setRegex:function(d,e,b,c){if((d===null||d===undefined)||(e===null||e===undefined)){return}if(d<this.items.length){this.items[d].regex=e;if(b!==null&&b!==undefined){this.items[d].canEdit=b}if(c!==null&&c!==undefined){this.items[d].defaultCharacter=c}}},_match:function(c,b){var d=new RegExp(b,"i");return d.test(c)},_raiseEvent:function(g,c){var d=this.events[g];var e={};e.owner=this;var b=true;var f=new a.Event(d);f.owner=this;e.value=this.inputValue();e.text=this.maskedValue();if(g===7){e.type=c.type;if(e.type===undefined){e.type=null}}f.args=e;if(g<2||g>6){b=this.host.trigger(f)}return b},_handleKeyPress:function(d,b){var c=this._isSpecialKey(b,d);return c},_insertKey:function(l,h){var k=this._selection();var b=this;var m;if(k.start>=0&&k.start<this.items.length){var c=String.fromCharCode(l);if(l>=65&&l<=90){if(!h.shiftKey){c=c.toLowerCase()}}var g=false;for(var f=0;f<this.items.length;f++){if(f<k.start){continue}var n=b.items[f];if(!n.canEdit){continue}if(b._match(c,n.regex)){if(!g&&k.length>0){for(var d=k.start;d<k.end;d++){if(b.items[d].canEdit){b.items[d].character=b.promptChar}}m=b._getString();b.maskedValue(m);g=true}n.character=c;m=b._getString();b.maskedValue(m);if(k.start<b.items.length){b._setSelectionStart(f+1)}break}else{break}}}},_deleteSelectedText:function(){var d=this._selection();var b=false;if(d.start>0||d.length>0){for(var c=d.start;c<d.end;c++){if(c<this.items.length&&this.items[c].canEdit&&this.items[c].character!==this.promptChar){this.items[c].character=this.promptChar;b=true}}var e=this._getString();this.maskedValue(e);return b}},_saveSelectedText:function(){var c=this._selection();var e="";if(c.start>0||c.length>0){for(var b=c.start;b<c.end;b++){if(this.items[b].canEdit){e+=this.items[b].character}}}if(window.clipboardData){window.clipboardData.setData("Text",e)}else{var d=a("<textarea style='position: absolute; left: -1000px; top: -1000px;'/>");d.val(e);a("body").append(d);d.select();setTimeout(function(){document.designMode="off";d.select();d.remove()},100)}return e},_pasteSelectedText:function(){var e=this._selection();var i="";var d=0;var b=e.start;var c="";var f=this;var h=function(j){if(j!==f.selectedText&&j.length>0){f.selectedText=j;if(f.selectedText===null||f.selectedText===undefined){return}}if(e.start>=0||e.length>0){for(var k=e.start;k<f.items.length;k++){if(f.items[k].canEdit){if(d<f.selectedText.length){f.items[k].character=f.selectedText[d];d++;b=1+k}}}}i=f._getString();f.maskedValue(i);if(b<f.items.length){f._setSelectionStart(b)}else{f._setSelectionStart(f.items.length)}};if(window.clipboardData){c=window.clipboardData.getData("Text");h(c)}else{var g=a("<textarea style='position: absolute; left: -1000px; top: -1000px;'/>");a("body").append(g);g.select();setTimeout(function(){var j=g.val();h(j);g.remove()},100)}},_handleKeyDown:function(h,l){var k=this._selection();var c,g;if(l>=96&&l<=105){l=l-48}var d=h.ctrlKey||h.metaKey;if((d&&l===97)||(d&&l===65)){return true}if((d&&l===120)||(d&&l===88)){this.selectedText=this._saveSelectedText(h);this._deleteSelectedText(h);if(a.jqx.browser.msie){return false}return true}if((d&&l===99)||(d&&l===67)){this.selectedText=this._saveSelectedText(h);if(a.jqx.browser.msie){return false}return true}if((d&&l===122)||(d&&l===90)){return false}if((d&&l===118)||(d&&l===86)||(h.shiftKey&&l===45)){this._pasteSelectedText();if(a.jqx.browser.msie){return false}return true}if(l===8){if(k.length===0){for(g=this.items.length-1;g>=0;g--){if(this.items[g].canEdit&&g<k.end&&this.items[g].character!==this.promptChar){this._setSelection(g,g+1);break}}}k=this._selection();var f=this._deleteSelectedText();if(k.start>0||k.length>0){if(k.start<=this.items.length){if(f){this._setSelectionStart(k.start)}else{this._setSelectionStart(k.start-1)}}}return false}if(l===190){c=k.start;for(g=c;g<this.items.length;g++){if(this.items[g].character==="."){this._setSelectionStart(g+1);break}}}if(l===191){c=k.start;for(g=c;g<this.items.length;g++){if(this.items[g].character==="/"){this._setSelectionStart(g+1);break}}}if(l===189){c=k.start;for(g=c;g<this.items.length;g++){if(this.items[g].character==="-"){this._setSelectionStart(g+1);break}}}if(l===46){if(k.length===0){for(g=0;g<this.items.length;g++){if(this.items[g].canEdit&&g>=k.start&&this.items[g].character!==this.promptChar){this._setSelection(g,g+1);break}}}var b=k;k=this._selection();if(k.start>=0||k.length>=0){if(k.start<this.items.length){if(k.length<=1){if(b.end!==k.end){this._setSelectionStart(k.end)}else{this._setSelectionStart(k.end+1)}}else{this._setSelectionStart(k.start)}}}return false}this._insertKey(l,h);var j=this._isSpecialKey(l,h);return j},_isSpecialKey:function(b,c){if(b===189||b===9||b===13||b===35||b===36||b===37||b===39||b===46){return true}if((b===16&&c.shiftKey)||c.ctrlKey||c.metaKey){return true}return false},_selection:function(){var g;var f=this.maskbox[0];if("selectionStart" in this.maskbox[0]){g=f.selectionEnd-f.selectionStart;return{start:f.selectionStart,end:f.selectionEnd,length:g,text:f.value}}else{var c=document.selection.createRange();if(c==null){return{start:0,end:f.value.length,length:0}}var b=this.maskbox[0].createTextRange();var d=b.duplicate();b.moveToBookmark(c.getBookmark());d.setEndPoint("EndToStart",b);g=c.text.length;return{start:d.text.length,end:d.text.length+c.text.length,length:g,text:c.text}}},_setSelection:function(d,b){if("selectionStart" in this.maskbox[0]){this.maskbox[0].focus();this.maskbox[0].setSelectionRange(d,b)}else{var c=this.maskbox[0].createTextRange();c.collapse(true);c.moveEnd("character",b);c.moveStart("character",d);c.select()}},_setSelectionStart:function(b){this._setSelection(b,b)},refresh:function(b){if(!b){this._render()}},resize:function(c,b){this.width=c;this.height=b;this.refresh()},_render:function(){var c=parseInt(this.host.css("border-left-width"),10);var d=parseInt(this.host.css("border-left-width"),10);var h=parseInt(this.host.css("border-left-width"),10);var i=parseInt(this.host.css("border-left-width"),10);var b=parseInt(this.host.css("height"),10)-h-i;var e=parseInt(this.host.css("width"),10)-c-d;if(this.width!=null&&this.width.toString().indexOf("px")!==-1){e=this.width}else{if(this.width!==undefined&&!isNaN(this.width)){e=this.width}}if(this.height!=null&&this.height.toString().indexOf("px")!==-1){b=this.height}else{if(this.height!==undefined&&!isNaN(this.height)){b=this.height}}e=parseInt(e,10);b=parseInt(b,10);if(this.maskbox[0]!==this.element){this.maskbox.css({"border-left-width":0,"border-right-width":0,"border-bottom-width":0,"border-top-width":0})}this.maskbox.css("text-align",this.textAlign);var f=this.maskbox.css("font-size");if(!isNaN(b)){this.maskbox.css("height",parseInt(f,10)+4+"px")}if(!isNaN(e)){this.maskbox.css("width",e)}var g=parseInt(b,10)-2*parseInt(h,10)-2*parseInt(i,10)-parseInt(f,10);if(isNaN(g)){g=0}if(this.width!=null&&this.width.toString().indexOf("px")!=-1){this.element.style.width=this.width}else{if(this.width!=undefined&&!isNaN(this.width)){this.element.style.width=this.width+"px"}}if(this.height!=null&&this.height.toString().indexOf("px")!=-1){this.element.style.height=this.height}else{if(this.height!=undefined&&!isNaN(this.height)){this.element.style.height=this.height+"px"}}if(this.maskbox[0]!==this.element){this.maskbox[0].style.height="100%"}this.maskbox[0].value=this._getString();if(this.width){if(this.width.toString().indexOf("%")>=0){this.element.style.width=this.width}if(this.height.toString().indexOf("%")>=0){this.element.style.height=this.height}}this._addBarAndLabel(this.maskbox);this._updateHint()},_addBarAndLabel:function(f){var e=this;if(e.label){return}if(!e.isMaterialized()){return}if(this.element instanceof HTMLInputElement){var h=a("<div></div>");h.addClass(e.toThemeProperty("jqx-input-group jqx-maskedinput"));this.host.after(h);var b=this.element;var g=this.host.data();h.append(b);var c=a("<label></label");if(this.hint){c[0].innerHTML=this.placeHolder}c.addClass(e.toThemeProperty("jqx-input-label"));h.append(c);var d=a("<span></span>");h.append(d);d.addClass(e.toThemeProperty("jqx-input-bar"));h[0].id=this.element.id;this.element.removeAttribute("id");this.element.setAttribute("hint",true);h[0].style=this.element.style;e.input=e.element;if(!(this.input instanceof HTMLInputElement)){this.input=this.host.find("input");if(this.input.length>0){this.input=this.input[0]}a(this.input).addClass(this.toThemeProperty("jqx-input-widget"))}h[0].style.width=this.input.style.width;h[0].style.height=this.input.style.height;this.label=c;this.bar=d;this.element.style="";this.host=h;this.element=h[0];this.host.data(g);this.input.style.width="100%";this.input.style.height="100%"}else{var c=a("<label></label");if(this.hint){c[0].innerHTML=this.placeHolder}c.addClass(e.toThemeProperty("jqx-input-label"));f.after(c);e.label=c;var d=a("<span></span>");f.after(d);d.addClass(e.toThemeProperty("jqx-input-bar"));e.bar=d;var e=this}if(e.template){e.bar.addClass(e.toThemeProperty("jqx-"+e.template));e.label.addClass(e.toThemeProperty("jqx-"+e.template))}},_updateHint:function(){var b=this;if(!b.hint){return}if(b.isMaterialized()){setTimeout(function(){if(b.maskbox[0].value.length===0){b.element.removeAttribute("hint");b.label[0].innerHTML=b.placeHolder}else{b.element.setAttribute("hint",true)}})}},destroy:function(){var b=this;a.jqx.utilities.resize(this.host,null,true);b.host.remove();b._helpers=[]},maskedValue:function(b){if(b===undefined){return this._value()}this.value=b;this._refreshValue();if(this.oldValue!==b){this._raiseEvent(1,b);this.oldValue=b;this._raiseEvent(0,b)}return this},propertyChangedHandler:function(c,e,b,f){if(this.isInitialized===undefined||this.isInitialized===false){return}if(e==="rtl"){if(c.rtl){c._helpers.maskbox.addClass(c.toThemeProperty("jqx-rtl"))}else{c._helpers.maskbox.removeClass(c.toThemeProperty("jqx-rtl"))}}if(e==="value"){if(f===undefined||f===null){f=""}if(f===""){this.clear()}else{f=f.toString();this.inputValue(f)}c._raiseEvent(7,f)}if(e==="theme"){a.jqx.utilities.setTheme(b,f,this.host)}if(e==="disabled"){if(f){c._helpers.maskbox.addClass(c.toThemeProperty("jqx-input-disabled"));c._helpers.element.addClass(c.toThemeProperty("jqx-fill-state-disabled"));c._helpers.maskbox.attr("disabled",true)}else{c._helpers.maskbox.removeClass(this.toThemeProperty("jqx-input-disabled"));c._helpers.element.removeClass(this.toThemeProperty("jqx-fill-state-disabled"));c._helpers.maskbox.attr("disabled",false)}a.jqx.aria(c,"aria-disabled",f)}if(e==="readOnly"){this.readOnly=f}if(e==="promptChar"){for(var d=0;d<c.items.length;d++){if(c.items[d].character===c.promptChar){c.items[d].character=f;c.items[d].defaultCharacter=f}}c.promptChar=f}if(e==="textAlign"){c.maskbox.css("text-align",f);c.textAlign=f}if(e==="mask"){c.mask=f;c.items=[];c._initializeLiterals();c.value=c._getString();c._refreshValue()}if(e==="width"){c.width=f;c._render()}else{if(e==="height"){c.height=f;c._render()}}},_value:function(){var b=this.value;return b},_getEditStringLength:function(){var c="";for(var b=0;b<this.items.length;b++){if(this.items[b].canEdit){c+=this.items[b].character}}return c.length},_getEditValue:function(){var c="";for(var b=0;b<this.items.length;b++){if(this.items[b].canEdit&&this.items[b].character!==this.promptChar){c+=this.items[b].character}}return c},parseValue:function(g){if(g===undefined||g===null){return null}var d=g.toString();var h="";var c=0;for(var b=0;b<d.length;b++){var f=d.substring(b,b+1);for(var e=c;e<this.items.length;e++){if(this.items[e].canEdit&&this._match(f,this.items[e].regex)){h+=f;c=e;break}}}return h},clear:function(){this.clearValue()},clearValue:function(){this.inputValue("",true)},val:function(b){if(b!==undefined&&typeof b!=="object"){if(typeof b==="number"&&isFinite(b)){b=b.toString()}this.maskedValue(b)}return this.maskbox[0].value},inputValue:function(g,c){var e;if(g===undefined||g===null){var f="";for(e=0;e<this.items.length;e++){if(this.items[e].canEdit){f+=this.items[e].character}}return f}else{var b=0;g=g.toString();for(e=0;e<this.items.length;e++){if(this.items[e].canEdit){if(this._match(g.substring(b,b+1),this.items[e].regex)){this.items[e].character=g.substring(b,b+1);b++}else{if(c){this.items[e].character=this.promptChar;b++}}}}var d=this._getString();this.maskedValue(d);return this.inputValue()}},_refreshValue:function(){var d=this.maskedValue();var b=0;for(var c=0;c<this.items.length;c++){if(d.length>b){if(this.items[c].canEdit&&this.items[c].character!==d[b]){if((this._match(d[b],this.items[c].regex)||d[b]===this.promptChar)&&d[b].length===1){this.items[c].character=d[b]}}b++}}this.value=this._getString();d=this.value;this.maskbox[0].value=d;a.jqx.aria(this,"aria-valuenow",d)}})})(jqxBaseFramework);

