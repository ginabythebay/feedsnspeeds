parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"KXdT":[function(require,module,exports) {
module.exports={"#80":.0135,"#79":.0145,"#78":.016,"#77":.018,"#76":.02,"#75":.021,"#74":.0225,"#73":.024,"#72":.025,"#71":.026,"#70":.028,"#69":.0292,"#68":.031,"#67":.032,"#66":.033,"#65":.035,"#64":.036,"#63":.037,"#62":.038,"#61":.039,"#60":.04,"#59":.041,"#58":.042,"#56":.0465,"#55":.052,"#54":.055,"#53":.0595,"#52":.0635,"#51":.067,"#50":.07,"#49":.073,"#48":.076,"#47":.0785,"#46":.081,"#45":.082,"#44":.086,"#43":.089,"#42":.0935,"#41":.096,"#40":.098,"#39":.0995,"#38":.1015,"#37":.104,"#36":.1065,"#35":.11,"#34":.111,"#33":.113,"#32":.116,"#31":.12,"#30":.1285,"#29":.136,"#28":.1405,"#27":.144,"#26":.147,"#25":.1495,"#24":.152,"#23":.154,"#22":.157,"#21":.159,"#20":.161,"#19":.166,"#18":.1695,"#17":.173,"#16":.177,"#15":.18,"#14":.182,"#13":.185,"#12":.189,"#11":.191,"#10":.1935,"#9":.196,"#8":.199,"#7":.201,"#6":.204,"#5":.2055,"#4":.209,"#3":.213,"#2":.221,"#1":.228,A:.234,B:.238,C:.242,D:.246,E:.25,F:.257,G:.261,H:.266,I:.272,J:.277,K:.281,L:.29,M:.295,N:.302,O:.316,P:.323,Q:.332,R:.339,S:.348,T:.358,U:.368,V:.377,W:.386,X:.397,Y:.404,Z:.413};
},{}],"QWSh":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./drill_lookup.json")),r=t.default,n=/((\d+)\s+)?(\d+)\/(\d+)/,i=/(\d+(\.\d+)?)\s*mm/,a=new Set(["input","onpropertychange","keyup","change","paste"]);window.onload=function(){var e=document.getElementById("material"),t=document.getElementById("drill_diameter"),r=new m(e,t);a.forEach(function(e){t.addEventListener(e,function(){r.calc()})}),e.onchange=function(){r.calc()},r.calc()};var m=function(){function e(e,t){this.materialsMenu=e.options,this.diameterElement=t}return e.prototype.calc=function(){var e=this.materialsMenu.item(this.materialsMenu.selectedIndex).value,t=Number(e),a=this.diameterElement.value,m=0;if(a in r)d("diameter_note",a+" has a diameter of "+(m=r[a]));else if(m=Number(a))d("diameter_note","Diameter "+m);else{var u=a.match(n);if(u){var l=Number(u[2]);l||(l=0);var c=Number(u[3]),s=Number(u[4]);m=l+c/s,d("diameter_note",l?"Diameter "+l+" "+c+"/"+s+"="+m:"Diameter  "+c+"/"+s+"="+m)}else if(u=a.match(i)){var p=Number(u[1]);d("diameter_note","Diameter  "+p+" mm="+(m=p/25.4).toPrecision(4)+'"')}else d("diameter_note","Enter diameter like .25, 1/4, 3mm, A or #23")}var f=o(t,m);d("sfm",t),d("rpm",f.rpm),d("ipm",f.ipm.toFixed(1)),d("depth",f.maxDepth.toFixed(3))},e}();function o(e,t){var r=Math.min(.25,t/.0625*.001),n=Math.round(3.8197/t*e);return{rpm:n,ipm:r*n,maxDepth:4*t}}function d(e,t){document.getElementById(e).innerHTML=String(t)}exports.recommend=o;
},{"./drill_lookup.json":"KXdT"}]},{},["QWSh"], null)
//# sourceMappingURL=drill.3672be6d.js.map