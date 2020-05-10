!function(e,t){for(var n in t)e[n]=t[n]}(window,function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t),n.d(t,"List",(function(){return i}));n(1);var r=document.querySelector.bind(document);function i(e,t){var n=this;this.item_map={};var i=r(t),o=0;function a(e){return`row${e}`}function u(t){Object.keys(e).forEach((function(e){var i=r(`#${e}${t}`);i.addEventListener("change",function(){this.item_map[t][e]=i.value}.bind(n))})),r(`#save${t}`).addEventListener("click",function(){this.set_editable(t,!1)}.bind(n)),r(`#remove${t}`).addEventListener("click",function(){this.remove(t)}.bind(n))}function c(t){return`\n            <tr id="${a(t.__META__.id)}">`+Object.keys(e).map((function(n){return`\n                            <td>\n                                ${r=t.__META__.id,i=n,o=t[n],a=t.__META__.editable,a?`<input id="${i}${r}" type="${e[i]}" value="${void 0===o?"":o}">`:`${o}`}\n                            </td>`;var r,i,o,a})).join("")+`<td>${n=t.__META__.id,r=t.__META__.editable,i="",i=r?`<button id="save${n}">Save</button>`:`<button id="edit${n}">Edit</button>`,i+=`<button id="remove${n}">Remove</button>`}</td>\n            </tr>`;var n,r,i}function l(e){return t=c(e),n=document.createElement("template"),t=t.trim(),n.innerHTML=t,n.content.firstChild;var t,n}this.remove=function(e){i.removeChild(r("#"+a(e))),delete this.item_map[e]},this.alloc=function(){var t=o++;this.item_map[t]={...e},Object.assign(this.item_map[t],{__META__:{editable:!0,id:t}});var n=l(this.item_map[t]);i.insertAdjacentElement("beforeend",n),u(t)},this.set_editable=function(e,t){this.item_map[e].__META__.editable=t;var o=l(this.item_map[e]);i.replaceChild(o,r("#"+a(e))),t?u(e):function(e){r(`#edit${e}`).addEventListener("click",function(){this.set_editable(e,!0)}.bind(n)),r(`#remove${e}`).addEventListener("click",function(){this.remove(e)}.bind(n))}(e)}}},function(e,t,n){var r=n(2),i=n(3);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var o={insert:"head",singleton:!1},a=(r(i,o),i.locals?i.locals:{});e.exports=a},function(e,t,n){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),a=[];function u(e){for(var t=-1,n=0;n<a.length;n++)if(a[n].identifier===e){t=n;break}return t}function c(e,t){for(var n={},r=[],i=0;i<e.length;i++){var o=e[i],c=t.base?o[0]+t.base:o[0],l=n[c]||0,d="".concat(c," ").concat(l);n[c]=l+1;var s=u(d),f={css:o[1],media:o[2],sourceMap:o[3]};-1!==s?(a[s].references++,a[s].updater(f)):a.push({identifier:d,updater:v(f,t),references:1}),r.push(d)}return r}function l(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var a=o(e.insert||"head");if(!a)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");a.appendChild(t)}return t}var d,s=(d=[],function(e,t){return d[e]=t,d.filter(Boolean).join("\n")});function f(e,t,n,r){var i=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=s(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function b(e,t,n){var r=n.css,i=n.media,o=n.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,m=0;function v(e,t){var n,r,i;if(t.singleton){var o=m++;n=p||(p=l(t)),r=f.bind(null,n,o,!1),i=f.bind(null,n,o,!0)}else n=l(t),r=b.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=i());var n=c(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var i=u(n[r]);a[i].references--}for(var o=c(e,t),l=0;l<n.length;l++){var d=u(n[l]);0===a[d].references&&(a[d].updater(),a.splice(d,1))}n=o}}}},function(e,t,n){(e.exports=n(4)(!1)).push([e.i,".container{display:flex;flex-direction:column;align-items:center;justify-content:center}.addButton{min-width:10em;padding:0.25em;margin:1em auto}.buttonPanel{width:100%}table.blueTable{border:1px solid #2CABFF;background-color:#FEFEFE;width:100%;text-align:left;border-collapse:collapse;table-layout:fixed}table.blueTable td,table.blueTable th{border:1px solid #AAAAAA;padding:3px 2px}table.blueTable tbody td{font-size:13px}table.blueTable tr:nth-child(even){background:#D0E4F5}table.blueTable thead{background:#1C6EA4;background:-moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);background:-webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);background:linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);border-bottom:2px solid #444444}table.blueTable thead th{font-size:15px;font-weight:bold;color:#FFFFFF;border-left:0px solid #D0E4F5}table.blueTable thead th:first-child{border-left:none}table.blueTable button{width:50%}\n",""])},function(e,t){e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var i=(a=r,"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),o=r.sources.map((function(e){return"/*# sourceURL="+r.sourceRoot+e+" */"}));return[n].concat(o).concat([i]).join("\n")}var a;return[n].join("\n")}(t,e);return t[2]?"@media "+t[2]+"{"+n+"}":n})).join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var r={},i=0;i<this.length;i++){var o=this[i][0];"number"==typeof o&&(r[o]=!0)}for(i=0;i<e.length;i++){var a=e[i];"number"==typeof a[0]&&r[a[0]]||(n&&!a[2]?a[2]=n:n&&(a[2]="("+a[2]+") and ("+n+")"),t.push(a))}},t}}]));