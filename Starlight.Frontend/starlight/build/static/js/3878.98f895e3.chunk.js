(self.webpackChunkstarlight=self.webpackChunkstarlight||[]).push([[3878],{446:function(t){t.exports=function(){"use strict";var t=1e3,e=6e4,r=36e5,n="millisecond",i="second",s="minute",a="hour",u="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",m=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,$=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,_={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],r=t%100;return"["+t+(e[(r-20)%10]||e[r]||e[0])+"]"}},M=function(t,e,r){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(r)+t},v={s:M,z:function(t){var e=-t.utcOffset(),r=Math.abs(e),n=Math.floor(r/60),i=r%60;return(e<=0?"+":"-")+M(n,2,"0")+":"+M(i,2,"0")},m:function t(e,r){if(e.date()<r.date())return-t(r,e);var n=12*(r.year()-e.year())+(r.month()-e.month()),i=e.clone().add(n,c),s=r-i<0,a=e.clone().add(n+(s?-1:1),c);return+(-(n+(r-i)/(s?i-a:a-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:u,D:d,h:a,m:s,s:i,ms:n,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},y="en",D={};D[y]=_;var p="$isDayjsObject",g=function(t){return t instanceof T||!(!t||!t[p])},S=function t(e,r,n){var i;if(!e)return y;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),r&&(D[s]=r,i=s);var a=e.split("-");if(!i&&a.length>1)return t(a[0])}else{var u=e.name;D[u]=e,i=u}return!n&&i&&(y=i),i||!n&&y},w=function(t,e){if(g(t))return t.clone();var r="object"==typeof e?e:{};return r.date=t,r.args=arguments,new T(r)},Y=v;Y.l=S,Y.i=g,Y.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var T=function(){function _(t){this.$L=S(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var M=_.prototype;return M.parse=function(t){this.$d=function(t){var e=t.date,r=t.utc;if(null===e)return new Date(NaN);if(Y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(m);if(n){var i=n[2]-1||0,s=(n[7]||"0").substring(0,3);return r?new Date(Date.UTC(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)):new Date(n[1],i,n[3]||1,n[4]||0,n[5]||0,n[6]||0,s)}}return new Date(e)}(t),this.init()},M.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},M.$utils=function(){return Y},M.isValid=function(){return!(this.$d.toString()===l)},M.isSame=function(t,e){var r=w(t);return this.startOf(e)<=r&&r<=this.endOf(e)},M.isAfter=function(t,e){return w(t)<this.startOf(e)},M.isBefore=function(t,e){return this.endOf(e)<w(t)},M.$g=function(t,e,r){return Y.u(t)?this[e]:this.set(r,t)},M.unix=function(){return Math.floor(this.valueOf()/1e3)},M.valueOf=function(){return this.$d.getTime()},M.startOf=function(t,e){var r=this,n=!!Y.u(e)||e,f=Y.p(t),l=function(t,e){var i=Y.w(r.$u?Date.UTC(r.$y,e,t):new Date(r.$y,e,t),r);return n?i:i.endOf(u)},m=function(t,e){return Y.w(r.toDate()[t].apply(r.toDate("s"),(n?[0,0,0,0]:[23,59,59,999]).slice(e)),r)},$=this.$W,_=this.$M,M=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return n?l(1,0):l(31,11);case c:return n?l(1,_):l(0,_+1);case o:var y=this.$locale().weekStart||0,D=($<y?$+7:$)-y;return l(n?M-D:M+(6-D),_);case u:case d:return m(v+"Hours",0);case a:return m(v+"Minutes",1);case s:return m(v+"Seconds",2);case i:return m(v+"Milliseconds",3);default:return this.clone()}},M.endOf=function(t){return this.startOf(t,!1)},M.$set=function(t,e){var r,o=Y.p(t),f="set"+(this.$u?"UTC":""),l=(r={},r[u]=f+"Date",r[d]=f+"Date",r[c]=f+"Month",r[h]=f+"FullYear",r[a]=f+"Hours",r[s]=f+"Minutes",r[i]=f+"Seconds",r[n]=f+"Milliseconds",r)[o],m=o===u?this.$D+(e-this.$W):e;if(o===c||o===h){var $=this.clone().set(d,1);$.$d[l](m),$.init(),this.$d=$.set(d,Math.min(this.$D,$.daysInMonth())).$d}else l&&this.$d[l](m);return this.init(),this},M.set=function(t,e){return this.clone().$set(t,e)},M.get=function(t){return this[Y.p(t)]()},M.add=function(n,f){var d,l=this;n=Number(n);var m=Y.p(f),$=function(t){var e=w(l);return Y.w(e.date(e.date()+Math.round(t*n)),l)};if(m===c)return this.set(c,this.$M+n);if(m===h)return this.set(h,this.$y+n);if(m===u)return $(1);if(m===o)return $(7);var _=(d={},d[s]=e,d[a]=r,d[i]=t,d)[m]||1,M=this.$d.getTime()+n*_;return Y.w(M,this)},M.subtract=function(t,e){return this.add(-1*t,e)},M.format=function(t){var e=this,r=this.$locale();if(!this.isValid())return r.invalidDate||l;var n=t||"YYYY-MM-DDTHH:mm:ssZ",i=Y.z(this),s=this.$H,a=this.$m,u=this.$M,o=r.weekdays,c=r.months,f=r.meridiem,h=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].slice(0,s)},d=function(t){return Y.s(s%12||12,t,"0")},m=f||function(t,e,r){var n=t<12?"AM":"PM";return r?n.toLowerCase():n};return n.replace($,(function(t,n){return n||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return Y.s(e.$y,4,"0");case"M":return u+1;case"MM":return Y.s(u+1,2,"0");case"MMM":return h(r.monthsShort,u,c,3);case"MMMM":return h(c,u);case"D":return e.$D;case"DD":return Y.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(r.weekdaysMin,e.$W,o,2);case"ddd":return h(r.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return Y.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return m(s,a,!0);case"A":return m(s,a,!1);case"m":return String(a);case"mm":return Y.s(a,2,"0");case"s":return String(e.$s);case"ss":return Y.s(e.$s,2,"0");case"SSS":return Y.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},M.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},M.diff=function(n,d,l){var m,$=this,_=Y.p(d),M=w(n),v=(M.utcOffset()-this.utcOffset())*e,y=this-M,D=function(){return Y.m($,M)};switch(_){case h:m=D()/12;break;case c:m=D();break;case f:m=D()/3;break;case o:m=(y-v)/6048e5;break;case u:m=(y-v)/864e5;break;case a:m=y/r;break;case s:m=y/e;break;case i:m=y/t;break;default:m=y}return l?m:Y.a(m)},M.daysInMonth=function(){return this.endOf(c).$D},M.$locale=function(){return D[this.$L]},M.locale=function(t,e){if(!t)return this.$L;var r=this.clone(),n=S(t,e,!0);return n&&(r.$L=n),r},M.clone=function(){return Y.w(this.$d,this)},M.toDate=function(){return new Date(this.valueOf())},M.toJSON=function(){return this.isValid()?this.toISOString():null},M.toISOString=function(){return this.$d.toISOString()},M.toString=function(){return this.$d.toUTCString()},_}(),O=T.prototype;return w.prototype=O,[["$ms",n],["$s",i],["$m",s],["$H",a],["$W",u],["$M",c],["$y",h],["$D",d]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,T,w),t.$i=!0),w},w.locale=S,w.isDayjs=g,w.unix=function(t){return w(1e3*t)},w.en=D[y],w.Ls=D,w.p={},w}()},3878:function(t,e,r){t.exports=function(t){"use strict";function e(t){return t&&"object"==typeof t&&"default"in t?t:{default:t}}var r=e(t),n={words:{m:["\u0458\u0435\u0434\u0430\u043d \u043c\u0438\u043d\u0443\u0442","\u0458\u0435\u0434\u043d\u043e\u0433 \u043c\u0438\u043d\u0443\u0442\u0430"],mm:["%d \u043c\u0438\u043d\u0443\u0442","%d \u043c\u0438\u043d\u0443\u0442\u0430","%d \u043c\u0438\u043d\u0443\u0442\u0430"],h:["\u0458\u0435\u0434\u0430\u043d \u0441\u0430\u0442","\u0458\u0435\u0434\u043d\u043e\u0433 \u0441\u0430\u0442\u0430"],hh:["%d \u0441\u0430\u0442","%d \u0441\u0430\u0442\u0430","%d \u0441\u0430\u0442\u0438"],d:["\u0458\u0435\u0434\u0430\u043d \u0434\u0430\u043d","\u0458\u0435\u0434\u043d\u043e\u0433 \u0434\u0430\u043d\u0430"],dd:["%d \u0434\u0430\u043d","%d \u0434\u0430\u043d\u0430","%d \u0434\u0430\u043d\u0430"],M:["\u0458\u0435\u0434\u0430\u043d \u043c\u0435\u0441\u0435\u0446","\u0458\u0435\u0434\u043d\u043e\u0433 \u043c\u0435\u0441\u0435\u0446\u0430"],MM:["%d \u043c\u0435\u0441\u0435\u0446","%d \u043c\u0435\u0441\u0435\u0446\u0430","%d \u043c\u0435\u0441\u0435\u0446\u0438"],y:["\u0458\u0435\u0434\u043d\u0443 \u0433\u043e\u0434\u0438\u043d\u0443","\u0458\u0435\u0434\u043d\u0435 \u0433\u043e\u0434\u0438\u043d\u0435"],yy:["%d \u0433\u043e\u0434\u0438\u043d\u0443","%d \u0433\u043e\u0434\u0438\u043d\u0435","%d \u0433\u043e\u0434\u0438\u043d\u0430"]},correctGrammarCase:function(t,e){return t%10>=1&&t%10<=4&&(t%100<10||t%100>=20)?t%10==1?e[0]:e[1]:e[2]},relativeTimeFormatter:function(t,e,r,i){var s=n.words[r];if(1===r.length)return"y"===r&&e?"\u0458\u0435\u0434\u043d\u0430 \u0433\u043e\u0434\u0438\u043d\u0430":i||e?s[0]:s[1];var a=n.correctGrammarCase(t,s);return"yy"===r&&e&&"%d \u0433\u043e\u0434\u0438\u043d\u0443"===a?t+" \u0433\u043e\u0434\u0438\u043d\u0430":a.replace("%d",t)}},i={name:"sr-cyrl",weekdays:"\u041d\u0435\u0434\u0435\u0459\u0430_\u041f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a_\u0423\u0442\u043e\u0440\u0430\u043a_\u0421\u0440\u0435\u0434\u0430_\u0427\u0435\u0442\u0432\u0440\u0442\u0430\u043a_\u041f\u0435\u0442\u0430\u043a_\u0421\u0443\u0431\u043e\u0442\u0430".split("_"),weekdaysShort:"\u041d\u0435\u0434._\u041f\u043e\u043d._\u0423\u0442\u043e._\u0421\u0440\u0435._\u0427\u0435\u0442._\u041f\u0435\u0442._\u0421\u0443\u0431.".split("_"),weekdaysMin:"\u043d\u0435_\u043f\u043e_\u0443\u0442_\u0441\u0440_\u0447\u0435_\u043f\u0435_\u0441\u0443".split("_"),months:"\u0408\u0430\u043d\u0443\u0430\u0440_\u0424\u0435\u0431\u0440\u0443\u0430\u0440_\u041c\u0430\u0440\u0442_\u0410\u043f\u0440\u0438\u043b_\u041c\u0430\u0458_\u0408\u0443\u043d_\u0408\u0443\u043b_\u0410\u0432\u0433\u0443\u0441\u0442_\u0421\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440_\u041e\u043a\u0442\u043e\u0431\u0430\u0440_\u041d\u043e\u0432\u0435\u043c\u0431\u0430\u0440_\u0414\u0435\u0446\u0435\u043c\u0431\u0430\u0440".split("_"),monthsShort:"\u0408\u0430\u043d._\u0424\u0435\u0431._\u041c\u0430\u0440._\u0410\u043f\u0440._\u041c\u0430\u0458_\u0408\u0443\u043d_\u0408\u0443\u043b_\u0410\u0432\u0433._\u0421\u0435\u043f._\u041e\u043a\u0442._\u041d\u043e\u0432._\u0414\u0435\u0446.".split("_"),weekStart:1,relativeTime:{future:"\u0437\u0430 %s",past:"\u043f\u0440\u0435 %s",s:"\u043d\u0435\u043a\u043e\u043b\u0438\u043a\u043e \u0441\u0435\u043a\u0443\u043d\u0434\u0438",m:n.relativeTimeFormatter,mm:n.relativeTimeFormatter,h:n.relativeTimeFormatter,hh:n.relativeTimeFormatter,d:n.relativeTimeFormatter,dd:n.relativeTimeFormatter,M:n.relativeTimeFormatter,MM:n.relativeTimeFormatter,y:n.relativeTimeFormatter,yy:n.relativeTimeFormatter},ordinal:function(t){return t+"."},formats:{LT:"H:mm",LTS:"H:mm:ss",L:"D. M. YYYY.",LL:"D. MMMM YYYY.",LLL:"D. MMMM YYYY. H:mm",LLLL:"dddd, D. MMMM YYYY. H:mm"}};return r.default.locale(i,null,!0),i}(r(446))}}]);
//# sourceMappingURL=3878.98f895e3.chunk.js.map