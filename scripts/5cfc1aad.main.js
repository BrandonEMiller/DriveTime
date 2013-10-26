!function(a){"function"==typeof define&&define.amd?define("picker",["jquery"],a):this.Picker=a(jQuery)}(function(a){function b(d,e,f,g){function h(){return b._.node("div",b._.node("div",b._.node("div",b._.node("div",o.component.nodes(j.open),l.box),l.wrap),l.frame),l.holder)}function i(a){a.stopPropagation(),"focus"==a.type&&o.$root.addClass(l.focused),o.open()}if(!d)return b;var j={id:Math.abs(~~(1e9*Math.random()))},k=f?a.extend(!0,{},f.defaults,g):g||{},l=a.extend({},b.klasses(),k.klass),m=a(d),n=function(){return this.start()},o=n.prototype={constructor:n,$node:m,start:function(){return j&&j.start?o:(j.methods={},j.start=!0,j.open=!1,j.type=d.type,d.autofocus=d==document.activeElement,d.type="text",d.readOnly=!0,o.component=new f(o,k),o.$root=a(b._.node("div",h(),l.picker)).on({focusin:function(a){o.$root.removeClass(l.focused),a.stopPropagation()},"mousedown click":function(a){a.target!=o.$root.children()[0]&&a.stopPropagation()}}).on("click","[data-pick], [data-nav], [data-clear]",function(){var c=a(this),e=c.data(),f=c.hasClass(l.navDisabled)||c.hasClass(l.disabled),g=document.activeElement;g=g&&(g.type||g.href),(f||!a.contains(o.$root[0],g))&&d.focus(),e.nav&&!f?o.set("highlight",o.component.item.highlight,{nav:e.nav}):b._.isInteger(e.pick)&&!f?o.set("select",e.pick).close(!0):e.clear&&o.clear().close(!0)}),k.formatSubmit&&(o._hidden=a('<input type=hidden name="'+("string"==typeof k.hiddenPrefix?k.hiddenPrefix:"")+d.name+("string"==typeof k.hiddenSuffix?k.hiddenSuffix:"_submit")+'"'+(m.data("value")?' value="'+b._.trigger(o.component.formats.toString,o.component,[k.formatSubmit,o.component.item.select])+'"':"")+">")[0]),m.addClass(l.input).on("focus.P"+j.id+" click.P"+j.id,i).on("change.P"+j.id,function(){o._hidden&&(o._hidden.value=d.value?b._.trigger(o.component.formats.toString,o.component,[k.formatSubmit,o.component.item.select]):"")}).on("keydown.P"+j.id,function(a){var b=a.keyCode,c=/^(8|46)$/.test(b);return 27==b?(o.close(),!1):((32==b||c||!j.open&&o.component.key[b])&&(a.preventDefault(),a.stopPropagation(),c?o.clear().close():o.open()),void 0)}).val(m.data("value")?b._.trigger(o.component.formats.toString,o.component,[k.format,o.component.item.select]):d.value).after(o._hidden).data(e,o),k.container?a(k.container).append(o.$root):m.after(o.$root),o.on({start:o.component.onStart,render:o.component.onRender,stop:o.component.onStop,open:o.component.onOpen,close:o.component.onClose,set:o.component.onSet}).on({start:k.onStart,render:k.onRender,stop:k.onStop,open:k.onOpen,close:k.onClose,set:k.onSet}),d.autofocus&&o.open(),o.trigger("start").trigger("render"))},render:function(a){return a?o.$root.html(h()):o.$root.find("."+l.box).html(o.component.nodes(j.open)),o.trigger("render")},stop:function(){return j.start?(o.close(),o._hidden&&o._hidden.parentNode.removeChild(o._hidden),o.$root.remove(),m.removeClass(l.input).off(".P"+j.id).removeData(e),d.type=j.type,d.readOnly=!1,o.trigger("stop"),j.methods={},j.start=!1,o):o},open:function(e){return j.open?o:(m.addClass(l.active),o.$root.addClass(l.opened),e!==!1&&(j.open=!0,m.trigger("focus"),c.on("click.P"+j.id+" focusin.P"+j.id,function(a){a.target!=d&&a.target!=document&&o.close()}).on("keydown.P"+j.id,function(c){var e=c.keyCode,f=o.component.key[e],g=c.target;27==e?o.close(!0):g!=d||!f&&13!=e?a.contains(o.$root[0],g)&&13==e&&(c.preventDefault(),g.click()):(c.preventDefault(),f?b._.trigger(o.component.key.go,o,[b._.trigger(f)]):o.$root.find("."+l.highlighted).hasClass(l.disabled)||o.set("select",o.component.item.highlight).close())})),o.trigger("open"))},close:function(a){return a&&(m.off("focus.P"+j.id).trigger("focus"),setTimeout(function(){m.on("focus.P"+j.id,i)},0)),m.removeClass(l.active),o.$root.removeClass(l.opened+" "+l.focused),j.open&&(j.open=!1,c.off(".P"+j.id)),o.trigger("close")},clear:function(){return o.set("clear")},set:function(a,c,d){var e,f,g=b._.isObject(a),h=g?a:{};if(a){g||(h[a]=c);for(e in h)f=h[e],o.component.item[e]&&o.component.set(e,f,d||{}),("select"==e||"clear"==e)&&m.val("clear"==e?"":b._.trigger(o.component.formats.toString,o.component,[k.format,o.component.get(e)])).trigger("change");o.render()}return o.trigger("set",h)},get:function(a,c){return a=a||"value",null!=j[a]?j[a]:"value"==a?d.value:o.component.item[a]?"string"==typeof c?b._.trigger(o.component.formats.toString,o.component,[c,o.component.get(a)]):o.component.get(a):void 0},on:function(a,c){var d,e,f=b._.isObject(a),g=f?a:{};if(a){f||(g[a]=c);for(d in g)e=g[d],j.methods[d]=j.methods[d]||[],j.methods[d].push(e)}return o},trigger:function(a,c){var d=j.methods[a];return d&&d.map(function(a){b._.trigger(a,o,[c])}),o}};return new n}var c=a(document);return b.klasses=function(a){return a=a||"picker",{picker:a,opened:a+"--opened",focused:a+"--focused",input:a+"__input",active:a+"__input--active",holder:a+"__holder",frame:a+"__frame",wrap:a+"__wrap",box:a+"__box"}},b._={group:function(a){for(var c,d="",e=b._.trigger(a.min,a);e<=b._.trigger(a.max,a,[e]);e+=a.i)c=b._.trigger(a.item,a,[e]),d+=b._.node(a.node,c[0],c[1],c[2]);return d},node:function(b,c,d,e){return c?(c=a.isArray(c)?c.join(""):c,d=d?' class="'+d+'"':"",e=e?" "+e:"","<"+b+d+e+">"+c+"</"+b+">"):""},lead:function(a){return(10>a?"0":"")+a},trigger:function(a,b,c){return"function"==typeof a?a.apply(b,c||[]):a},digits:function(a){return/\d/.test(a[1])?2:1},isObject:function(a){return{}.toString.call(a).indexOf("Object")>-1},isDate:function(a){return{}.toString.call(a).indexOf("Date")>-1&&this.isInteger(a.getDate())},isInteger:function(a){return{}.toString.call(a).indexOf("Number")>-1&&0===a%1}},b.extend=function(c,d){a.fn[c]=function(e,f){var g=this.data(c);return"picker"==e?g:g&&"string"==typeof e?(b._.trigger(g[e],g,[f]),this):this.each(function(){var f=a(this);f.data(c)||new b(this,c,d,e)})},a.fn[c].defaults=d.defaults},b}),!function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node[0].value,e=a.$node.data("value"),f=e||d,g=e?b.formatSubmit:b.format,h=function(){return"rtl"===getComputedStyle(a.$root[0]).direction};c.settings=b,c.queue={min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"navigate create validate",view:"create validate viewset",disable:"flipItem",enable:"flipItem"},c.item={},c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now").set("select",f||c.item.now,{format:g,data:function(a){return f&&(a.indexOf("mm")>-1||a.indexOf("m")>-1)}(c.formats.toArray(g))}),c.key={40:7,38:-7,39:function(){return h()?-1:1},37:function(){return h()?1:-1},go:function(a){c.set("highlight",[c.item.highlight.year,c.item.highlight.month,c.item.highlight.date+a],{interval:a}),this.render()}},a.on("render",function(){a.$root.find("."+b.klass.selectMonth).on("change",function(){a.set("highlight",[a.get("view").year,this.value,a.get("highlight").date]),a.$root.find("."+b.klass.selectMonth).trigger("focus")}),a.$root.find("."+b.klass.selectYear).on("change",function(){a.set("highlight",[this.value,a.get("view").month,a.get("highlight").date]),a.$root.find("."+b.klass.selectYear).trigger("focus")})}).on("open",function(){a.$root.find("button, select").attr("disabled",!1)}).on("close",function(){a.$root.find("button, select").attr("disabled",!0)})}var d=7,e=6;c.prototype.set=function(a,b,c){var d=this;return d.item["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",d.item.select,c):"highlight"==a?d.set("view",d.item.highlight,c):("flip"==a||"min"==a||"max"==a||"disable"==a||"enable"==a)&&d.item.select&&d.item.highlight&&d.set("select",d.item.select,c).set("highlight",d.item.highlight,c),d},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(c,d,e){var f,g=this;return d=void 0===d?c:d,d==-1/0||1/0==d?f=d:a._.isObject(d)&&a._.isInteger(d.pick)?d=d.obj:b.isArray(d)?(d=new Date(d[0],d[1],d[2]),d=a._.isDate(d)?d:g.create().obj):d=a._.isInteger(d)||a._.isDate(d)?g.normalize(new Date(d),e):g.now(c,d,e),{year:f||d.getFullYear(),month:f||d.getMonth(),date:f||d.getDate(),day:f||d.getDay(),obj:f||d,pick:f||d.getTime()}},c.prototype.now=function(a,b,c){return b=new Date,c&&c.rel&&b.setDate(b.getDate()+c.rel),this.normalize(b,c)},c.prototype.navigate=function(b,c,d){if(a._.isObject(c)){for(var e=new Date(c.year,c.month+(d&&d.nav?d.nav:0),1),f=e.getFullYear(),g=e.getMonth(),h=c.date;a._.isDate(e)&&new Date(f,g,h).getMonth()!==g;)h-=1;c=[f,g,h]}return c},c.prototype.normalize=function(a){return a.setHours(0,0,0,0),a},c.prototype.measure=function(b,c){var d=this;return c?a._.isInteger(c)&&(c=d.now(b,c,{rel:c})):c="min"==b?-1/0:1/0,c},c.prototype.viewset=function(a,b){return this.create([b.year,b.month,1])},c.prototype.validate=function(c,d,e){var f,g,h,i,j=this,k=d,l=e&&e.interval?e.interval:1,m=-1===j.item.enable,n=j.item.min,o=j.item.max,p=m&&j.item.disable.filter(function(c){if(b.isArray(c)){var e=j.create(c).pick;e<d.pick?f=!0:e>d.pick&&(g=!0)}return a._.isInteger(c)}).length;if(!e.nav&&(!m&&j.disabled(d)||m&&j.disabled(d)&&(p||f||g)||d.pick<=n.pick||d.pick>=o.pick))for(m&&!p&&(!g&&l>0||!f&&0>l)&&(l*=-1);j.disabled(d)&&(Math.abs(l)>1&&(d.month<k.month||d.month>k.month)&&(d=k,l=Math.abs(l)/l),d.pick<=n.pick?(h=!0,l=1):d.pick>=o.pick&&(i=!0,l=-1),!h||!i);)d=j.create([d.year,d.month,d.date+l]);return d},c.prototype.disabled=function(c){var d=this,e=!!d.item.disable.filter(function(e){return a._.isInteger(e)?c.day===(d.settings.firstDay?e:e-1)%7:b.isArray(e)||a._.isDate(e)?c.pick===d.create(e).pick:void 0}).length;return-1===d.item.enable?!e:e||c.pick<d.item.min.pick||c.pick>d.item.max.pick},c.prototype.parse=function(c,d,e){var f=this,g={};if(!d||a._.isInteger(d)||b.isArray(d)||a._.isDate(d)||a._.isObject(d)&&a._.isInteger(d.pick))return d;if(!e||!e.format)throw"Need a formatting option to parse this..";return f.formats.toArray(e.format).map(function(b){var c=f.formats[b],e=c?a._.trigger(c,f,[d,g]):b.replace(/^!/,"").length;c&&(g[b]=d.substr(0,e)),d=d.substr(e)}),[g.yyyy||g.yy,+(g.mm||g.m)-(e.data?1:0),g.dd||g.d]},c.prototype.formats=function(){function b(a,b,c){var d=a.match(/\w+/)[0];return c.mm||c.m||(c.m=b.indexOf(d)),d.length}function c(a){return a.match(/\w+/)[0].length}return{d:function(b,c){return b?a._.digits(b):c.date},dd:function(b,c){return b?2:a._.lead(c.date)},ddd:function(a,b){return a?c(a):this.settings.weekdaysShort[b.day]},dddd:function(a,b){return a?c(a):this.settings.weekdaysFull[b.day]},m:function(b,c){return b?a._.digits(b):c.month+1},mm:function(b,c){return b?2:a._.lead(c.month+1)},mmm:function(a,c){var d=this.settings.monthsShort;return a?b(a,d,c):d[c.month]},mmmm:function(a,c){var d=this.settings.monthsFull;return a?b(a,d,c):d[c.month]},yy:function(a,b){return a?2:(""+b.year).slice(2)},yyyy:function(a,b){return a?4:b.year},toArray:function(a){return a.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g)},toString:function(b,c){var d=this;return d.formats.toArray(b).map(function(b){return a._.trigger(d.formats[b],d,[0,c])||b.replace(/^!/,"")}).join("")}}}(),c.prototype.flipItem=function(a,c){var d=this,e=d.item.disable,f=-1===d.item.enable;return"flip"==c?d.item.enable=f?1:-1:"enable"==a&&c===!0||"disable"==a&&c===!1?(d.item.enable=1,e=[]):"enable"==a&&c===!1||"disable"==a&&c===!0?(d.item.enable=-1,e=[]):b.isArray(c)&&(!f&&"enable"==a||f&&"disable"==a?e=d.removeDisabled(e,c):(!f&&"disable"==a||f&&"enable"==a)&&(e=d.addDisabled(e,c))),e},c.prototype.addDisabled=function(a,b){var c=this;return b.map(function(b){c.filterDisabled(a,b).length||a.push(b)}),a},c.prototype.removeDisabled=function(a,b){var c=this;return b.map(function(b){a=c.filterDisabled(a,b,1)}),a},c.prototype.filterDisabled=function(c,d,e){var f=this,g=b.isArray(d)||a._.isDate(d),h=g&&f.create(d).pick;return c.filter(function(c){var i=g&&(b.isArray(c)||a._.isDate(c))?h===f.create(c).pick:d===c;return e?!i:i})},c.prototype.nodes=function(b){var c=this,f=c.settings,g=c.item.now,h=c.item.select,i=c.item.highlight,j=c.item.view,k=c.item.disable,l=c.item.min,m=c.item.max,n=function(b){return f.firstDay&&b.push(b.shift()),a._.node("thead",a._.group({min:0,max:d-1,i:1,node:"th",item:function(a){return[b[a],f.klass.weekdays]}}))}((f.showWeekdaysFull?f.weekdaysFull:f.weekdaysShort).slice(0)),o=function(b){return a._.node("div"," ",f.klass["nav"+(b?"Next":"Prev")]+(b&&j.year>=m.year&&j.month>=m.month||!b&&j.year<=l.year&&j.month<=l.month?" "+f.klass.navDisabled:""),"data-nav="+(b||-1))},p=function(c){return f.selectMonths?a._.node("select",a._.group({min:0,max:11,i:1,node:"option",item:function(a){return[c[a],0,"value="+a+(j.month==a?" selected":"")+(j.year==l.year&&a<l.month||j.year==m.year&&a>m.month?" disabled":"")]}}),f.klass.selectMonth,b?"":"disabled"):a._.node("div",c[j.month],f.klass.month)},q=function(){var c=j.year,d=f.selectYears===!0?5:~~(f.selectYears/2);if(d){var e=l.year,g=m.year,h=c-d,i=c+d;if(e>h&&(i+=e-h,h=e),i>g){var k=h-e,n=i-g;h-=k>n?n:k,i=g}return a._.node("select",a._.group({min:h,max:i,i:1,node:"option",item:function(a){return[a,0,"value="+a+(c==a?" selected":"")]}}),f.klass.selectYear,b?"":"disabled")}return a._.node("div",c,f.klass.year)};return a._.node("div",o()+o(1)+p(f.showMonthsShort?f.monthsShort:f.monthsFull)+q(),f.klass.header)+a._.node("table",n+a._.node("tbody",a._.group({min:0,max:e-1,i:1,node:"tr",item:function(b){var e=f.firstDay&&0===c.create([j.year,j.month,1]).day?-7:0;return[a._.group({min:d*b-j.day+e+1,max:function(){return this.min+d-1},i:1,node:"td",item:function(b){return b=c.create([j.year,j.month,b+(f.firstDay?1:0)]),[a._.node("div",b.date,function(a){return a.push(j.month==b.month?f.klass.infocus:f.klass.outfocus),g.pick==b.pick&&a.push(f.klass.now),h&&h.pick==b.pick&&a.push(f.klass.selected),i&&i.pick==b.pick&&a.push(f.klass.highlighted),(k&&c.disabled(b)||b.pick<l.pick||b.pick>m.pick)&&a.push(f.klass.disabled),a.join(" ")}([f.klass.day]),"data-pick="+b.pick)]}})]}})),f.klass.table)+a._.node("div",a._.node("button",f.today,f.klass.buttonToday,"type=button data-pick="+g.pick+(b?"":" disabled"))+a._.node("button",f.clear,f.klass.buttonClear,"type=button data-clear=1"+(b?"":" disabled")),f.klass.footer)},c.defaults=function(a){return{monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],monthsShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],weekdaysFull:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],today:"Today",clear:"Clear",format:"d mmmm, yyyy",klass:{table:a+"table",header:a+"header",navPrev:a+"nav--prev",navNext:a+"nav--next",navDisabled:a+"nav--disabled",month:a+"month",year:a+"year",selectMonth:a+"select--month",selectYear:a+"select--year",weekdays:a+"weekday",day:a+"day",disabled:a+"day--disabled",selected:a+"day--selected",highlighted:a+"day--highlighted",now:a+"day--today",infocus:a+"day--infocus",outfocus:a+"day--outfocus",footer:a+"footer",buttonClear:a+"button--clear",buttonToday:a+"button--today"}}}(a.klasses().picker+"__"),a.extend("pickadate",c)}),!function(a){"function"==typeof define&&define.amd?define(["picker","jquery"],a):a(Picker,jQuery)}(function(a,b){function c(a,b){var c=this,d=a.$node.data("value");c.settings=b,c.queue={interval:"i",min:"measure create",max:"measure create",now:"now create",select:"parse create validate",highlight:"create validate",view:"create validate",disable:"flipItem",enable:"flipItem"},c.item={},c.item.interval=b.interval||30,c.item.disable=(b.disable||[]).slice(0),c.item.enable=-function(a){return a[0]===!0?a.shift():-1}(c.item.disable),c.set("min",b.min).set("max",b.max).set("now").set("select",d||a.$node[0].value||c.item.min,{format:d?b.formatSubmit:b.format}),c.key={40:1,38:-1,39:1,37:-1,go:function(a){c.set("highlight",c.item.highlight.pick+a*c.item.interval,{interval:a*c.item.interval}),this.render()}},a.on("render",function(){var c=a.$root.children(),d=c.find("."+b.klass.viewset);d.length&&(c[0].scrollTop+=d.position().top-2*d[0].clientHeight)}).on("open",function(){a.$root.find("button").attr("disable",!1)}).on("close",function(){a.$root.find("button").attr("disable",!0)})}var d=24,e=60,f=12,g=d*e;c.prototype.set=function(a,b,c){var d=this;return d.item["enable"==a?"disable":"flip"==a?"enable":a]=d.queue[a].split(" ").map(function(e){return b=d[e](a,b,c)}).pop(),"select"==a?d.set("highlight",d.item.select,c):"highlight"==a?d.set("view",d.item.highlight,c):"interval"==a?d.set("min",d.item.min,c).set("max",d.item.max,c):("flip"==a||"min"==a||"max"==a||"disable"==a||"enable"==a)&&d.item.select&&d.item.highlight&&("min"==a&&d.set("max",d.item.max,c),d.set("select",d.item.select,c).set("highlight",d.item.highlight,c)),d},c.prototype.get=function(a){return this.item[a]},c.prototype.create=function(c,f,h){var i=this;return f=void 0===f?c:f,a._.isObject(f)&&a._.isInteger(f.pick)?f=f.pick:b.isArray(f)?f=+f[0]*e+ +f[1]:a._.isInteger(f)||(f=i.now(c,f,h)),"max"==c&&f<i.item.min.pick&&(f+=g),f=i.normalize(c,f,h),{hour:~~(d+f/e)%d,mins:(e+f%e)%e,time:(g+f)%g,pick:f}},c.prototype.now=function(b,c){var d=new Date,f=d.getHours()*e+d.getMinutes();return a._.isInteger(c)?c+="min"==b&&0>c&&0===f?2:1:c=1,c*this.item.interval+f},c.prototype.normalize=function(a,b){var c=this.item.min,d=this.item.interval,e="min"!=a||c?(b-c.pick)%d:0;return b-(e+(0>b?d:0))},c.prototype.measure=function(b,c,f){var g=this;return c?c===!0||a._.isInteger(c)?c=g.now(b,c,f):a._.isObject(c)&&a._.isInteger(c.pick)&&(c=g.normalize(b,c.pick,f)):c="min"==b?[0,0]:[d-1,e-1],c},c.prototype.validate=function(a,b,c){var d=this,e=c&&c.interval?c.interval:d.item.interval;return d.disabled(b)&&(b=d.shift(b,e)),b=d.scope(b),d.disabled(b)&&(b=d.shift(b,-1*e)),b},c.prototype.disabled=function(c){var d=this,e=d.item.disable.filter(function(e){return a._.isInteger(e)?c.hour==e:b.isArray(e)?c.pick==d.create(e).pick:void 0}).length;return-1===d.item.enable?!e:e},c.prototype.shift=function(a,b){var c=this,d=c.item.min.pick,e=c.item.max.pick;for(b=b||c.item.interval;c.disabled(a)&&(a=c.create(a.pick+=b),!(a.pick<=d||a.pick>=e)););return a},c.prototype.scope=function(a){var b=this.item.min.pick,c=this.item.max.pick;return this.create(a.pick>c?c:a.pick<b?b:a)},c.prototype.parse=function(c,d,f){var g=this,h={};if(!d||a._.isInteger(d)||b.isArray(d)||a._.isDate(d)||a._.isObject(d)&&a._.isInteger(d.pick))return d;if(!f||!f.format)throw"Need a formatting option to parse this..";return g.formats.toArray(f.format).map(function(b){var c=g.formats[b],e=c?a._.trigger(c,g,[d,h]):b.replace(/^!/,"").length;c&&(h[b]=d.substr(0,e)),d=d.substr(e)}),+h.i+e*(+(h.H||h.HH)||+(h.h||h.hh)%12+(/^p/i.test(h.A||h.a)?12:0))},c.prototype.formats={h:function(b,c){return b?a._.digits(b):c.hour%f||f},hh:function(b,c){return b?2:a._.lead(c.hour%f||f)},H:function(b,c){return b?a._.digits(b):""+c.hour%24},HH:function(b,c){return b?a._.digits(b):a._.lead(c.hour%24)},i:function(b,c){return b?2:a._.lead(c.mins)},a:function(a,b){return a?4:g/2>b.time%g?"a.m.":"p.m."},A:function(a,b){return a?2:g/2>b.time%g?"AM":"PM"},toArray:function(a){return a.split(/(h{1,2}|H{1,2}|i|a|A|!.)/g)},toString:function(b,c){var d=this;return d.formats.toArray(b).map(function(b){return a._.trigger(d.formats[b],d,[0,c])||b.replace(/^!/,"")}).join("")}},c.prototype.flipItem=function(a,c){var d=this,e=d.item.disable,f=-1===d.item.enable;return"flip"==c?d.item.enable=f?1:-1:"enable"==a&&c===!0||"disable"==a&&c===!1?(d.item.enable=1,e=[]):"enable"==a&&c===!1||"disable"==a&&c===!0?(d.item.enable=-1,e=[]):b.isArray(c)&&(!f&&"enable"==a||f&&"disable"==a?e=d.removeDisabled(e,c):(!f&&"disable"==a||f&&"enable"==a)&&(e=d.addDisabled(e,c))),e},c.prototype.addDisabled=function(a,b){var c=this;return b===!1?a=[]:b.map(function(b){c.filterDisabled(a,b).length||a.push(b)}),a},c.prototype.removeDisabled=function(a,b){var c=this;return b.map(function(b){a=c.filterDisabled(a,b,1)}),a},c.prototype.filterDisabled=function(a,c,d){var e=b.isArray(c);return a.filter(function(a){var f=!e&&c===a||e&&b.isArray(a)&&c.toString()===a.toString();return d?!f:f})},c.prototype.i=function(b,c){return a._.isInteger(c)&&c>0?c:this.item.interval},c.prototype.nodes=function(b){var c=this,d=c.settings,e=c.item.select,f=c.item.highlight,g=c.item.view,h=c.item.disable;return a._.node("ul",a._.group({min:c.item.min.pick,max:c.item.max.pick,i:c.item.interval,node:"li",item:function(b){return b=c.create(b),[a._.trigger(c.formats.toString,c,[a._.trigger(d.formatLabel,c,[b])||d.format,b]),function(a,i){return e&&e.pick==i&&a.push(d.klass.selected),f&&f.pick==i&&a.push(d.klass.highlighted),g&&g.pick==i&&a.push(d.klass.viewset),h&&c.disabled(b)&&a.push(d.klass.disabled),a.join(" ")}([d.klass.listItem],b.pick),"data-pick="+b.pick]}})+a._.node("li",a._.node("button",d.clear,d.klass.buttonClear,"type=button data-clear=1"+(b?"":" disable"))),d.klass.list)},c.defaults=function(a){return{clear:"Clear",format:"h:i A",interval:30,klass:{picker:a+" "+a+"--time",holder:a+"__holder",list:a+"__list",listItem:a+"__list-item",disabled:a+"__list-item--disabled",selected:a+"__list-item--selected",highlighted:a+"__list-item--highlighted",viewset:a+"__list-item--viewset",now:a+"__list-item--now",buttonClear:a+"__button--clear"}}}(a.klasses().picker),a.extend("pickatime",c)}),Parse.initialize("jsdvcxCy07th6YIZeB2MWk3WFkppIGtMqlP24cnR","j1gckPR0G2XGBrDuoXnqQS60sSSJVkRFI3gbAjMr");var Event=Parse.Object.extend("Event"),EventCollection=Parse.Collection.extend({model:Event}),calendar=new EventCollection;MainView=Backbone.View.extend({template:_.template($("#main-template").text()),events:{"click .new_event":"new"},initialize:function(){$(".container").append(this.el),this.render()},render:function(){this.$el.append(this.template()),this.daily(),$(".calendar").fullCalendar({header:{left:"today prev,next",center:"title",right:"agendaDay agendaWeek month"},events:function(a,b,c){calendar.fetch({success:function(a){var b=[];a.each(function(a){b.push({title:a.get("eventName"),start:a.get("eventStartYear")+"-"+(a.get("eventStartMonth")+1)+"-"+a.get("eventStartDate")+" "+a.get("eventStartHour")+":"+a.get("eventStartMin"),end:a.get("eventEndYear")+"-"+(a.get("eventEndMonth")+1)+"-"+a.get("eventEndDate")+" "+a.get("eventEndHour")+":"+a.get("eventEndMin"),allDay:!1,id:a.id}),b.push({title:"Leave For "+a.get("eventName"),start:a.get("eventStartYear")+"-"+(a.get("eventStartMonth")+1)+"-"+a.get("eventLeaveDate")+" "+a.get("eventLeaveHour")+":"+a.get("eventLeaveMinute"),end:a.get("eventStartYear")+"-"+(a.get("eventStartMonth")+1)+"-"+a.get("eventStartDate")+" "+a.get("eventStartHour")+":"+a.get("eventStartMin"),allDay:!1,color:"green",id:a.id})}),console.log(b),c(b)},error:function(){}})},eventClick:function(a){router.navigate("events/"+a.id,{trigger:!0})},dayClick:function(){console.log("a day has been clicked!")}})},daily:function(){var a=new Parse.Query(Event),b=new Date;a.equalTo("eventStartMonth",b.getMonth()),a.find({success:function(a){for(var c=0,d=0;d<a.length;d++){var e=a[d];e.get("eventStartDate")==b.getDate()&&(c+=1,$(".daily_container").append("<h3>"+e.get("eventName")+":</h3><h5>Need to leave by "+e.get("eventLeaveHourAdjusted")+":"+e.get("eventLeaveMinute")+" "+e.get("timePeriod")+"</h5><h5>Event is located at "+e.get("endingAddress")+" in "+e.get("endingCity")+", "+e.get("endingState")+"</h5><div class=underline_border></div>"))}0==c&&$(".daily_container").append("<h3> No Events Scheduled Today </h3>")},error:function(a){alert("Error: "+a.code+" "+a.message)}})},"new":function(){router.navigate("newEvent",{trigger:!0})}}),AboutView=Backbone.View.extend({template:_.template($("#about-template").text()),initialize:function(){$(".container").append(this.el),this.render()},render:function(){this.$el.append(this.template())}}),EditEventView=Backbone.View.extend({template:_.template($("#edit-event-template").text()),initialize:function(){$(".container").append(this.el),this.render(),console.log(this.model.get("eventName"))},render:function(){this.$el.append(this.template({calendarEvent:this.model})),this.checkRoute()},checkRoute:function(){var a=new google.maps.DirectionsService,b=new google.maps.DirectionsRenderer,c=new google.maps.Map(document.getElementById("map"),{zoom:7,mapTypeId:google.maps.MapTypeId.ROADMAP});b.setMap(c),b.setPanel(document.getElementById("panel"));var d={origin:$(".origin-street").val()+", "+$(".origin-city").val()+", "+$(".origin-state").val(),destination:$(".destination-street").val()+", "+$(".destination-city").val()+", "+$(".destination-state").val(),travelMode:google.maps.DirectionsTravelMode.DRIVING};a.route(d,function(a,c){if(c==google.maps.DirectionsStatus.OK){var d=a.routes[0];route_time=Math.round(d.legs[0].duration.value/60),b.setDirections(a),$(".container").append(route_time+" minutes <br>")}else console.log("Error")})}}),CreateEventView=Backbone.View.extend({template:_.template($("#new-event-template").text()),events:{"click .time":"checkRoute","click .submit_dates":"save","click .cancel_event":"cancel"},className:"create-new-event",initialize:function(){$(".container").append(this.el),this.render();var a=$(".start_date").pickadate();a.pickadate("picker");var b=$(".start_time").pickatime();b.pickatime("picker");var c=$(".end_date").pickadate();c.pickadate("picker");var d=$(".end_time").pickatime();d.pickatime("picker")},render:function(){this.$el.append(this.template())},destroy:function(){this.remove()},checkRoute:function(){var a=new google.maps.DirectionsService,b=new google.maps.DirectionsRenderer,c=new google.maps.Map(document.getElementById("map"),{zoom:7,mapTypeId:google.maps.MapTypeId.ROADMAP});b.setMap(c),b.setPanel(document.getElementById("panel"));var d={origin:$(".origin-street").val()+", "+$(".origin-city").val()+", "+$(".origin-state").val(),destination:$(".destination-street").val()+", "+$(".destination-city").val()+", "+$(".destination-state").val(),travelMode:google.maps.DirectionsTravelMode.DRIVING};a.route(d,function(a,c){if(c==google.maps.DirectionsStatus.OK){var d=a.routes[0];route_time=Math.round(d.legs[0].duration.value/60),b.setDirections(a),$(".container").append(route_time+" minutes <br>")}else console.log("Error")})},save:function(){var a=new Event,b=$(".start_date").pickadate(),c=b.pickadate("picker"),d=$(".start_time").pickatime(),e=d.pickatime("picker"),f=$(".end_date").pickadate(),g=f.pickadate("picker"),h=$(".end_time").pickatime(),i=h.pickatime("picker"),j=e.get("select").pick-route_time,k=Math.floor(j/60);console.log(k);var l=j-60*k;console.log(l);var m="AM",n="AM",o=k,p=e.get("select").hour;if(p>=12&&(n="PM",p-=12,0==p&&(p=12)),0==e.get("select").mins)var q=""+p+":"+e.get("select").mins+"0 "+n;else var q=""+p+":"+e.get("select").mins+" "+n;var r="AM",s=i.get("select").hour;if(s>=12&&(r="PM",s-=12,0==s&&(s=12)),0==i.get("select").mins)var t=""+s+":"+i.get("select").mins+"0 "+r;else var t=""+s+":"+i.get("select").mins+" "+r;var u=c.get("select").date;0>k&&(k+=24,u-=1),j/60>=12&&(m="PM",o-=12,0==o&&(o=12));var v=""+o+":"+l;$(".save_event").click(function(){a.set("eventName",$(".event_name").val()),a.set("eventStartYear",c.get("select").year),a.set("eventStartMonth",c.get("select").month),a.set("eventStartDate",c.get("select").date),a.set("eventStartHour",e.get("select").hour),a.set("eventStartHourAdjusted",p),a.set("eventStartTimeString",q),a.set("eventStartMin",e.get("select").mins),a.set("eventEndYear",g.get("select").year),a.set("eventEndMonth",g.get("select").month),a.set("eventEndDate",g.get("select").date),a.set("eventEndHour",i.get("select").hour),a.set("eventEndHourAdjusted",s),a.set("eventEndTimeString",t),a.set("eventEndMin",i.get("select").mins),a.set("eventLeaveTime",v),a.set("eventLeaveDate",u),a.set("eventLeaveHour",k),a.set("eventLeaveMinute",l),a.set("eventLeaveHourAdjusted",o),a.set("timePeriod",m),a.set("startingAddress",$(".origin-street").val()),a.set("startingCity",$(".origin-city").val()),a.set("startingState",$(".origin-state").val()),a.set("endingAddress",$(".destination-street").val()),a.set("endingCity",$(".destination-city").val()),a.set("endingState",$(".destination-state").val()),a.save(null,{success:function(){console.log("Save success"),router.navigate("home",{trigger:!0})},error:function(){}})}),$(".container").append("You need to leave at "+v+" "+m)},cancel:function(){router.navigate("home",{trigger:!0})}}),DriveTimeRouter=Backbone.Router.extend({routes:{home:"home","events/:_id":"showEvent",newEvent:"createNew",about:"about","":"home"},home:function(){$(".container").html(""),new MainView},about:function(){$(".container").html(""),new AboutView},createNew:function(){$(".container").html(""),new CreateEventView},showEvent:function(a){var b=Parse.Object.extend("Event"),c=new Parse.Query(b);c.get(a,{success:function(a){console.log("Retrieved"),$(".container").html(""),new EditEventView({model:a})},error:function(){}})}});var router=new DriveTimeRouter;Backbone.history.start();