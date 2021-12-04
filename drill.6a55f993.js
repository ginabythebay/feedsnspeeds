parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"hy5o":[function(require,module,exports) {
module.exports={"#80":.0135,"#79":.0145,"#78":.016,"#77":.018,"#76":.02,"#75":.021,"#74":.0225,"#73":.024,"#72":.025,"#71":.026,"#70":.028,"#69":.0292,"#68":.031,"#67":.032,"#66":.033,"#65":.035,"#64":.036,"#63":.037,"#62":.038,"#61":.039,"#60":.04,"#59":.041,"#58":.042,"#56":.0465,"#55":.052,"#54":.055,"#53":.0595,"#52":.0635,"#51":.067,"#50":.07,"#49":.073,"#48":.076,"#47":.0785,"#46":.081,"#45":.082,"#44":.086,"#43":.089,"#42":.0935,"#41":.096,"#40":.098,"#39":.0995,"#38":.1015,"#37":.104,"#36":.1065,"#35":.11,"#34":.111,"#33":.113,"#32":.116,"#31":.12,"#30":.1285,"#29":.136,"#28":.1405,"#27":.144,"#26":.147,"#25":.1495,"#24":.152,"#23":.154,"#22":.157,"#21":.159,"#20":.161,"#19":.166,"#18":.1695,"#17":.173,"#16":.177,"#15":.18,"#14":.182,"#13":.185,"#12":.189,"#11":.191,"#10":.1935,"#9":.196,"#8":.199,"#7":.201,"#6":.204,"#5":.2055,"#4":.209,"#3":.213,"#2":.221,"#1":.228,A:.234,B:.238,C:.242,D:.246,E:.25,F:.257,G:.261,H:.266,I:.272,J:.277,K:.281,L:.29,M:.295,N:.302,O:.316,P:.323,Q:.332,R:.339,S:.348,T:.358,U:.368,V:.377,W:.386,X:.397,Y:.404,Z:.413};
},{}],"WMhB":[function(require,module,exports) {
module.exports={Aluminum:{"6061: Solution Treated and Aged":{fr_offset:5,drill_sfm:350},"6061: Cold Drawn":{fr_offset:5,drill_sfm:400}},"Stainless Steel":{"316: 135-185":{fr_offset:1,drill_sfm:50}}};
},{}],"QWSh":[function(require,module,exports) {
"use strict";var e=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var t=e(require("./data/drill_lookup.json")),r=t.default,n=e(require("./data/material_lookup.json")),i=n.default,a=[{minDiameter:0,maxDiameter:.125,minFr:.001,maxFr:.003},{minDiameter:.125,maxDiameter:.251,minFr:.002,maxFr:.006},{minDiameter:.251,maxDiameter:.501,minFr:.004,maxFr:.01},{minDiameter:.501,maxDiameter:1.01,minFr:.007,maxFr:.015},{minDiameter:1.01,maxDiameter:0,minFr:.01,maxFr:.025}],m=/((\d+)\s+)?(\d+)\/(\d+)/,o=/(\d+(\.\d+)?)\s*mm/,u=new Set(["input","onpropertychange","keyup","change","paste"]);window.onload=function(){var e=document.getElementById("material"),t=document.getElementById("material_type"),r=document.getElementById("drill_diameter"),n=new c(t,r),a=new d(e,t);for(var m in u.forEach(function(e){r.addEventListener(e,function(){n.calc()})}),i){var o=document.createElement("option");o.text=m,e.options.add(o)}e.onchange=function(){a.reloadTypes(),n.calc()},a.reloadTypes(),t.onchange=function(){n.calc()},n.calc()};var d=function(){function e(e,t){this.materialsMenu=e,this.typesMenu=t}return e.prototype.reloadTypes=function(){var e=this;s(this.typesMenu);var t=this.materialsMenu.item(this.materialsMenu.selectedIndex),r=i[t.text];Object.keys(r).forEach(function(t){var n=document.createElement("option"),i=r[t].drill_sfm;n.text=t+" ("+i+")",n.type=r[t],e.typesMenu.options.add(n)})},e}();function s(e){for(var t=e.options.length-1;t>=0;t--)e.remove(t)}var c=function(){function e(e,t){this.typesMenu=e.options,this.diameterElement=t}return e.prototype.calc=function(){var e=this.typesMenu.item(this.typesMenu.selectedIndex).type,t=Number(e.drill_sfm);v("sfm",f(t));var n=this.diameterElement.value,i=0;if(n in r)v("diameter_note",n+" has a diameter of "+(i=r[n]));else if(i=Number(n))v("diameter_note","Diameter "+i+'"');else{var a=n.match(m);if(a){var u=Number(a[2]);u||(u=0);var d=Number(a[3]),s=Number(a[4]);i=u+d/s,v("diameter_note",u?"Diameter "+u+" "+d+"/"+s+"="+i+'"':"Diameter  "+d+"/"+s+"="+i+'"')}else if(a=n.match(o)){var c=Number(a[1]);v("diameter_note","Diameter  "+c+" mm="+(i=c/25.4).toPrecision(4)+'"')}else v("diameter_note","Enter diameter like .25, 1/4, 3mm, A or #23")}v("rpm","--"),v("ipr","--"),v("ipm","--"),v("depth","--");var h=p(t,i,Number(e.fr_offset));v("rpm",f(h.rpm)),v("ipr",l(h.ipr,3)),v("ipm",l(h.ipm,1)),v("depth",l(h.maxDepth,3)+'"')},e}();function f(e){return Number.isNaN(e)||e==1/0||!e?"--":String(e)}function l(e,t){return Number.isNaN(e)||e==1/0||!e?"--":e.toFixed(t)}function p(e,t,r){var n=h(t,r),i=Math.round(3.8197/t*e);return{rpm:i,ipr:n,ipm:n*i,maxDepth:4*t}}function h(e,t){if(t<1||t>5)throw new RangeError("fr_offset must bet between 1 and 5: ${fr_offset} is invalid");for(var r=0,n=a;r<n.length;r++){var i=n[r];if(e>=i.minDiameter&&(0==i.maxDiameter||e<i.maxDiameter)){if(1==t)return i.minFr;if(5==t)return i.maxFr;var m=.25*(t-1),o=i.maxFr-i.minFr;return i.minFr+o*m}}throw new Error("Unable to find range for diameter of "+e)}function v(e,t){document.getElementById(e).innerHTML=String(t)}exports.recommend=p,exports.calcIpr=h;
},{"./data/drill_lookup.json":"hy5o","./data/material_lookup.json":"WMhB"}]},{},["QWSh"], null)
//# sourceMappingURL=drill.6a55f993.js.map