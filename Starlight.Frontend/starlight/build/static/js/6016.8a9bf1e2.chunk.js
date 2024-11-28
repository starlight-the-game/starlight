(self.webpackChunkstarlight=self.webpackChunkstarlight||[]).push([[6016],{446:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",s="second",i="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},M=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:M,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),s=n%60;return(e<=0?"+":"-")+M(r,2,"0")+":"+M(s,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),s=e.clone().add(r,c),i=n-s<0,u=e.clone().add(r+(i?-1:1),c);return+(-(r+(n-s)/(i?s-u:u-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:i,s:s,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",D={};D[y]=_;var p="$isDayjsObject",g=function(t){return t instanceof b||!(!t||!t[p])},S=function t(e,n,r){var s;if(!e)return y;if("string"==typeof e){var i=e.toLowerCase();D[i]&&(s=i),n&&(D[i]=n,s=i);var u=e.split("-");if(!s&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,s=a}return!r&&s&&(y=s),s||!r&&y},w=function(t,e){if(g(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new b(n)},Y=v;Y.l=S,Y.i=g,Y.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var b=function(){function _(t){this.$L=S(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var M=_.prototype;return M.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(Y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var s=r[2]-1||0,i=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],s,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(e)}(t),this.init()},M.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},M.$utils=function(){return Y},M.isValid=function(){return!(this.$d.toString()===l)},M.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},M.isAfter=function(t,e){return w(t)<this.startOf(e)},M.isBefore=function(t,e){return this.endOf(e)<w(t)},M.$g=function(t,e,n){return Y.u(t)?this[e]:this.set(n,t)},M.unix=function(){return Math.floor(this.valueOf()/1e3)},M.valueOf=function(){return this.$d.getTime()},M.startOf=function(t,e){var n=this,r=!!Y.u(e)||e,f=Y.p(t),l=function(t,e){var s=Y.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?s:s.endOf(a)},$=function(t,e){return Y.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,_=this.$M,M=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,_):l(0,_+1);case o:var y=this.$locale().weekStart||0,D=(m<y?m+7:m)-y;return l(r?M-D:M+(6-D),_);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case i:return $(v+"Seconds",2);case s:return $(v+"Milliseconds",3);default:return this.clone()}},M.endOf=function(t){return this.startOf(t,!1)},M.$set=function(t,e){var n,o=Y.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[i]=f+"Minutes",n[s]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var m=this.clone().set(d,1);m.$d[l]($),m.init(),this.$d=m.set(d,Math.min(this.$D,m.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},M.set=function(t,e){return this.clone().$set(t,e)},M.get=function(t){return this[Y.p(t)]()},M.add=function(r,f){var d,l=this;r=Number(r);var $=Y.p(f),m=function(t){var e=w(l);return Y.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return m(1);if($===o)return m(7);var _=(d={},d[i]=e,d[u]=n,d[s]=t,d)[$]||1,M=this.$d.getTime()+r*_;return Y.w(M,this)},M.subtract=function(t,e){return this.add(-1*t,e)},M.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",s=Y.z(this),i=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,s,i){return t&&(t[n]||t(e,r))||s[n].slice(0,i)},d=function(t){return Y.s(i%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(m,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return Y.s(e.$y,4,"0");case"M":return a+1;case"MM":return Y.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return Y.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(i);case"HH":return Y.s(i,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(i,u,!0);case"A":return $(i,u,!1);case"m":return String(u);case"mm":return Y.s(u,2,"0");case"s":return String(e.$s);case"ss":return Y.s(e.$s,2,"0");case"SSS":return Y.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")}))},M.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},M.diff=function(r,d,l){var $,m=this,_=Y.p(d),M=w(r),v=(M.utcOffset()-this.utcOffset())*e,y=this-M,D=function(){return Y.m(m,M)};switch(_){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(y-v)/6048e5;break;case a:$=(y-v)/864e5;break;case u:$=y/n;break;case i:$=y/e;break;case s:$=y/t;break;default:$=y}return l?$:Y.a($)},M.daysInMonth=function(){return this.endOf(c).$D},M.$locale=function(){return D[this.$L]},M.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},M.clone=function(){return Y.w(this.$d,this)},M.toDate=function(){return new Date(this.valueOf())},M.toJSON=function(){return this.isValid()?this.toISOString():null},M.toISOString=function(){return this.$d.toISOString()},M.toString=function(){return this.$d.toUTCString()},_}(),O=b.prototype;return w.prototype=O,[["$ms",r],["$s",s],["$m",i],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,b,w),t.$i=!0),w},w.locale=S,w.isDayjs=g,w.unix=function(t){return w(1e3*t)},w.en=D[y],w.Ls=D,w.p={},w}()},6016:function(t,e,n){t.exports=function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var n=e(t),r={name:"fr-ch",weekdays:"dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi".split("_"),months:"janvier_f\xe9vrier_mars_avril_mai_juin_juillet_ao\xfbt_septembre_octobre_novembre_d\xe9cembre".split("_"),weekStart:1,weekdaysShort:"dim._lun._mar._mer._jeu._ven._sam.".split("_"),monthsShort:"janv._f\xe9vr._mars_avr._mai_juin_juil._ao\xfbt_sept._oct._nov._d\xe9c.".split("_"),weekdaysMin:"di_lu_ma_me_je_ve_sa".split("_"),ordinal:function(t){return t},formats:{LT:"HH:mm",LTS:"HH:mm:ss",L:"DD.MM.YYYY",LL:"D MMMM YYYY",LLL:"D MMMM YYYY HH:mm",LLLL:"dddd D MMMM YYYY HH:mm"},relativeTime:{future:"dans %s",past:"il y a %s",s:"quelques secondes",m:"une minute",mm:"%d minutes",h:"une heure",hh:"%d heures",d:"un jour",dd:"%d jours",M:"un mois",MM:"%d mois",y:"un an",yy:"%d ans"}};return n.default.locale(r,null,!0),r}(n(446))}}]);
//# sourceMappingURL=6016.8a9bf1e2.chunk.js.map