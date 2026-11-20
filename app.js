var APP_VERSION="1.0.0";
var $=function(i){return document.getElementById(i)},C=window.CFG||{};
var BR={apple:["آبل","🍎"],samsung:["سامسونج"],honor:["هونر"],xiaomi:["شاومي"],oppo:["أوبو"],vivo:["فيفو","V"],realme:["ريلمي"],tecno:["تكنو"],infinix:["إنفينكس"],nokia:["نوكيا"],itel:["آي تل","i"],zte:["ZTE","Z"],lenovo:["لينوفو"],other:["أخرى","📱"]};
var LB={samsung:1,honor:1,xiaomi:1,oppo:1,realme:1,tecno:1,infinix:1,nokia:1,lenovo:1};
var SP=[["screen","الشاشة"],["cpu","المعالج"],["cam","الكاميرا الخلفية"],["selfie","الكاميرا الأمامية"],["battery","البطارية"],["os","النظام"],["extra","إضافي"]];
var HEAD=["code","type","group","name","price","keywords","desc"].concat(SP.map(function(s){return s[0]}),["approx","tag"]);
var ITEMS=[],IDX={},VER="",FV=[],ST={th:"auto",name:"",pin:"",adm:0},V={v:"home",pt:"p",b:"*",q:"",max:"",sort:"pa",g:"",k:""};
try{FV=JSON.parse(localStorage.getItem("pp_fv")||"[]");ST=Object.assign(ST,JSON.parse(localStorage.getItem("pp_st")||"{}"))}catch(e){}
function sv(){try{localStorage.setItem("pp_fv",JSON.stringify(FV));localStorage.setItem("pp_st",JSON.stringify(ST))}catch(e){}}
function E(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function nz(s){return String(s||"").toLowerCase().replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/ئ/g,"ي")}
function theme(){var t=ST.th=="auto"?(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"):ST.th;document.documentElement.setAttribute("data-t",t)}
function pr(n){return n?Number(n).toLocaleString("en")+' <small>ر.س</small>':'<small>اسأل</small>'}
function bn(k){return BR[k]?BR[k][0]:k}
function lg(k){return LB[k]?'<img src="'+C.logoDir+k+'.svg" alt="">':'<span>'+(BR[k]&&BR[k][1]||bn(k))+'</span>'}
/* ===== البيانات ===== */
function setData(rows,ver){ITEMS=rows.filter(function(r){return r.code!==""&&r.name}).map(function(r){r.code=String(r.code);r.price=+r.price||0;r.keywords=String(r.keywords||"");return r});IDX={};ITEMS.forEach(function(r){IDX[r.code]=r});VER=ver||VER;
try{localStorage.setItem("pp_items",JSON.stringify({v:VER,rows:rows}))}catch(e){}}
function boot(){var c=null;try{c=JSON.parse(localStorage.getItem("pp_items")||"null")}catch(e){}
if(c&&c.rows){setData(c.rows,c.v);render();syncNow()}else fetch(C.dataUrl).then(function(r){return r.json()}).then(function(d){setData(d.rows,d.version);render();syncNow()}).catch(function(){render()})}
function api(q){return fetch(C.apiUrl+(C.apiUrl.indexOf("?")>-1?"&":"?")+q,{cache:"no-store"}).then(function(r){return r.json()})}
function syncNow(manual){if(!C.apiUrl){if(manual)alert("لم يُربط الشيت بعد. ضع رابط Apps Script في config.js (apiUrl).");return}
api("action=version").then(function(d){if(d.ok&&(manual||d.version!=VER))return api("action=items").then(function(x){if(x.ok){setData(x.rows,x.version);render(1);if(manual)toast("تم التحديث ✅")}})}).catch(function(){if(manual)toast("لا يوجد اتصال")})}
function toast(t){var d=document.createElement("div");d.style.cssText="position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#000c;color:#fff;padding:9px 16px;border-radius:20px;font-size:13px;z-index:20";d.textContent=t;document.body.appendChild(d);setTimeout(function(){d.remove()},1800)}
setInterval(function(){if(!document.hidden&&navigator.onLine&&!document.querySelector(".md"))syncNow()},(C.pollSec||30)*1000);
document.addEventListener("visibilitychange",function(){if(!document.hidden)syncNow()});
/* ===== باركود Code128-B ===== */
var T="212222 222122 222221 121223 121322 131222 122213 122312 132212 221213 221312 231212 112232 122132 122231 113222 123122 123221 223211 221132 221231 213212 223112 312131 311222 321122 321221 312212 322112 322211 212123 212321 232121 111323 131123 131321 112313 132113 132311 211313 231113 231311 112133 112331 132131 113123 113321 133121 313121 211331 231131 213113 213311 213131 311123 311321 331121 312113 312311 332111 314111 221411 431111 111224 111422 121124 121421 141122 141221 112214 112412 122114 122411 142112 142211 241211 221114 413111 241112 134111 111242 121142 121241 114212 124112 124211 411212 421112 421211 212141 214121 412121 111143 111341 131141 114113 114311 411113 411311 113141 114131 311141 411131 211412 211214 211232".split(" ");
function bc(txt){var v=[104],s=104;for(var i=0;i<txt.length;i++){var x=txt.charCodeAt(i)-32;if(x<0||x>95)x=0;v.push(x);s+=x*(i+1)}v.push(s%103);var p=v.map(function(i){return T[i]}).join("")+"2331112",x=10,r="",bar=true;for(var j=0;j<p.length;j++){var w=+p[j];if(bar)r+='<rect x="'+x+'" y="0" width="'+w+'" height="60" fill="#000"/>';x+=w;bar=!bar}
return '<svg viewBox="0 0 '+(x+10)+' 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">'+r+'</svg>'}
/* ===== القوائم ===== */
function isAdm(){return ST.adm&&ST.pin}
function hay(r){return nz(r.code+" "+r.name+" "+r.keywords+" "+r.group+" "+(r.type=="a"?"":bn(r.group))+" "+r.tag)}
function pass(r){if(V.max&&r.price>+V.max)return 0;if(V.q){var h=hay(r),w=nz(V.q).split(/\s+/);for(var i=0;i<w.length;i++)if(w[i]&&h.indexOf(w[i])<0)return 0}return 1}
function sortf(a,b){return V.sort=="pa"?a.price-b.price:V.sort=="pd"?b.price-a.price:(+a.code)-(+b.code)}
function rowH(r){var f=FV.indexOf(r.code)>-1;return '<tr class="r" onclick="det(\''+r.code+'\')"><td class="cd">'+E(r.code)+'</td><td>'+E(r.name)+(r.tag?'<span class="tag">'+E(r.tag)+'</span>':'')+'</td><td class="pc">'+pr(r.price)+'</td><td><button class="st" onclick="event.stopPropagation();fav(\''+r.code+'\')">'+(f?'★':'☆')+'</button></td></tr>'}
function tbl(a,msg){return a.length?'<table><tr><th>الكود</th><th>الصنف</th><th>السعر</th><th></th></tr>'+a.map(rowH).join("")+'</table>':'<div class="card">'+(msg||"لا توجد نتائج")+'</div>'}
function fav(c){var x=FV.indexOf(c);x>-1?FV.splice(x,1):FV.push(c);sv();render(1);var m=document.querySelector(".md");if(m){m.remove();det(c)}}
function bar(){return '<div class="srch"><input placeholder="🔍 كود أو اسم أو كلمة..." value="'+E(V.q)+'" oninput="V.q=this.value;rl()"><input type="number" inputmode="numeric" style="width:84px" placeholder="أقصى سعر" value="'+V.max+'" oninput="V.max=this.value;rl()"><select style="width:88px" onchange="V.sort=this.value;rl()"><option value="pa"'+(V.sort=="pa"?" selected":"")+'>الأرخص</option><option value="pd"'+(V.sort=="pd"?" selected":"")+'>الأغلى</option><option value="cd"'+(V.sort=="cd"?" selected":"")+'>الكود</option></select></div>'}
function rl(){var r=$("res");if(r)r.innerHTML=body()}
function body(){var a=ITEMS.filter(function(r){if(V.v=="acc"){if(r.type!="a")return 0;if(V.g&&r.group!=V.g)return 0;if(V.k&&(","+r.keywords.replace(/،/g,",")+",").indexOf(","+V.k+",")<0)return 0}
else if(V.v=="list"){if(r.type=="a")return 0;if(r.type!=V.pt)return 0;if(V.b!="*"&&r.group!=V.b)return 0}
return pass(r)}).sort(sortf);return tbl(a)}
function chipsH(list,cur,fn,all){return '<div class="chips"><button class="chip'+(cur===""?" on":"")+'" onclick="'+fn+'(\'\')">'+all+'</button>'+list.map(function(x){return '<button class="chip'+(cur===x[0]?" on":"")+'" onclick="'+fn+'(this.dataset.v)" data-v="'+E(x[0])+'">'+E(x[0])+(x[1]?' ('+x[1]+')':'')+'</button>'}).join("")+'</div>'}
function cnt(arr){var m={};arr.forEach(function(x){m[x]=(m[x]||0)+1});return Object.keys(m).map(function(k){return[k,m[k]]}).sort(function(a,b){return b[1]-a[1]})}
function setG(g){V.g=g;V.k="";render()}function setK(k){V.k=k;render()}
function go(v,x){V.v=v;if(v=="search"){V.q="";V.max=""}if(v=="phones")V.pt=x||V.pt;if(v=="acc"){V.g="";V.k="";V.q="";V.max=""}render();$("app").scrollTop=0}
function brand(k){V.b=k;V.q="";V.max="";V.v="list";render();$("app").scrollTop=0}
function nav(){var t=[["home","🏠","الرئيسية"],["phones","📱","الجوالات"],["acc","🎧","الاكسسوارات"],["settings","⚙️","الإعدادات"]],a=V.v=="list"?"phones":V.v=="search"?"home":V.v=="page"?"settings":V.v;$("nav").innerHTML=t.map(function(x){return '<button class="'+(a==x[0]?"on":"")+'" onclick="go(\''+x[0]+'\')"><b>'+x[1]+'</b>'+x[2]+'</button>'}).join("")}
function render(k){var h="",m=$("app"),s=m.scrollTop;nav();
if(V.v=="home"){var np=ITEMS.filter(function(r){return r.type!="a"}).length,na=ITEMS.length-np,fl=FV.map(function(c){return IDX[c]}).filter(Boolean);
h='<div class="srch"><input placeholder="🔍 ابحث بالكود أو الاسم..." onfocus="go(\'search\')"></div><div class="big"><button onclick="go(\'phones\')"><b>📱</b>الجوالات<small>'+np+' صنف</small></button><button onclick="go(\'acc\')"><b>🎧</b>الاكسسوارات<small>'+na+' صنف</small></button></div><h2>⭐ المفضلة</h2>'+tbl(fl,"لا توجد أصناف مفضلة بعد — اضغط ☆ بجانب أي صنف ليظهر هنا بكوده.")+'<div class="wm">الأسعار بالريال السعودي · قابلة للتغيير</div>'}
else if(V.v=="phones"){var ts=ITEMS.filter(function(r){return r.type==V.pt}),bs=cnt(ts.map(function(r){return r.group}));
h='<div class="chips"><button class="chip'+(V.pt=="p"?" on":"")+'" onclick="go(\'phones\',\'p\')">📱 الجوالات</button><button class="chip'+(V.pt=="t"?" on":"")+'" onclick="go(\'phones\',\'t\')">📲 التابلت</button></div><div class="grid"><button class="br" onclick="brand(\'*\')"><div class="lg">📋</div>الكل<small style="color:var(--mu)">'+ts.length+' صنف</small></button>'+bs.map(function(x){return '<button class="br" onclick="brand(\''+x[0]+'\')"><div class="lg">'+lg(x[0])+'</div>'+E(bn(x[0]))+'<small style="color:var(--mu)">'+x[1]+' صنف</small></button>'}).join("")+'</div>'}
else if(V.v=="list")h='<h2><button class="chip" onclick="go(\'phones\')">‹ رجوع</button> '+(V.b=="*"?"الكل":E(bn(V.b)))+' — '+(V.pt=="t"?"التابلت":"الجوالات")+'</h2>'+bar()+'<div id="res">'+body()+'</div>';
else if(V.v=="search")h='<h2>🔍 بحث في كل الأصناف</h2>'+bar()+'<div id="res">'+tbl(V.q||V.max?ITEMS.filter(pass).sort(sortf):[],"اكتب كوداً أو اسماً أو كلمة للبحث")+'</div>';
else if(V.v=="acc"){var ac=ITEMS.filter(function(r){return r.type=="a"}),gs=cnt(ac.map(function(r){return r.group})),kk=[];ac.filter(function(r){return!V.g||r.group==V.g}).forEach(function(r){r.keywords.split(/[,،]/).forEach(function(w){w=w.trim();if(w)kk.push(w)})});
h='<h2>🎧 الاكسسوارات</h2><div class="fl">القسم</div>'+chipsH(gs,V.g,"setG","الكل")+'<div class="fl">كلمات دلالية</div>'+chipsH(cnt(kk).filter(function(x){return x[1]>1}).slice(0,40),V.k,"setK","الكل")+bar()+'<div id="res">'+body()+'</div>';if(isAdm())h+='<button class="fab" onclick="edit(\'\',\'a\')">＋</button>'}
else if(V.v=="settings")h=setH();else if(V.v=="page")h=pgH();
if(V.v=="list"&&isAdm())h+='<button class="fab" onclick="edit(\'\',\''+V.pt+'\')">＋</button>';
if(V.v=="search"&&$("res")&&k){rl();return}
m.innerHTML=h;m.scrollTop=k?s:0}
/* ===== تفاصيل الصنف ===== */
function det(c){var r=IDX[c];if(!r)return;var rows="";
if(r.type!="a"){SP.forEach(function(s){if(r[s[0]])rows+='<div class="sp"><b>'+s[1]+'</b><span>'+(r.approx&&String(r.approx)!="0"?"≈ ":"")+E(r[s[0]])+'</span></div>'})}
if(r.desc)rows+='<div class="sp"><b>الوصف</b><span>'+E(r.desc)+'</span></div>';
if(r.type=="a"){rows+='<div class="sp"><b>القسم</b><span>'+E(r.group)+'</span></div>';if(r.keywords)rows+='<div class="sp"><b>كلمات دلالية</b><span>'+E(r.keywords)+'</span></div>'}
var ap=r.type!="a"&&r.approx&&String(r.approx)!="0",f=FV.indexOf(r.code)>-1;
var h='<div class="md" onclick="if(event.target==this)this.remove()"><div class="bx"><div class="cd" style="font-size:20px">'+E(r.code)+'</div><h3>'+E(r.name)+(r.tag?'<span class="tag">'+E(r.tag)+'</span>':'')+'</h3><div class="pc" style="font-size:20px;margin:4px 0">'+pr(r.price)+'</div>'+rows+(ap?'<div class="note">⚠️ بعض المواصفات تقريبية (≈) — راجع الموقع الرسمي للمصنّع قبل الاعتماد عليها.</div>':'')+'<div class="bc">'+bc(r.code)+'<div>'+E(r.code)+'</div></div><div style="margin-top:8px"><button class="btn" onclick="shareI(\''+r.code+'\')">📤 واتساب</button><button class="btn g" onclick="fav(\''+r.code+'\')">'+(f?'★ مفضل':'☆ للمفضلة')+'</button><button class="btn g" onclick="cp(\''+r.code+'\')">📋 نسخ الكود</button>'+(r.type!="a"?'<button class="btn g" onclick="window.open(\'https://www.google.com/search?q=\'+encodeURIComponent(IDX[\''+r.code+'\'].name.replace(/[^\\w\\s\\u0600-\\u06FF]/g,\' \')+\' specs\'))">🌐 مواصفات كاملة</button>':'')+(isAdm()?'<button class="btn g" onclick="edit(\''+r.code+'\')">✏️ تعديل</button><button class="btn r" onclick="del(\''+r.code+'\')">🗑 حذف</button>':'')+'<button class="btn g" onclick="this.closest(\'.md\').remove()">إغلاق</button></div></div></div>';
var d=document.createElement("div");d.innerHTML=h;document.body.appendChild(d.firstChild)}
function cp(c){if(navigator.clipboard)navigator.clipboard.writeText(c).then(function(){toast("تم نسخ الكود")});else toast(c)}
function shareI(c){var r=IDX[c],t="🔖 كود: "+r.code+"\n📦 "+r.name+"\n💰 "+r.price+" ر.س";if(r.type!="a")SP.forEach(function(s){if(r[s[0]]&&s[0]!="extra"&&s[0]!="os")t+="\n• "+s[1]+": "+r[s[0]]});window.open("https://wa.me/?text="+encodeURIComponent(t+"\n\n"+location.href.split("#")[0].split("?")[0]))}
function shareApp(){var d={title:"أسعار الجوالات والاكسسوارات",text:"تطبيق أسعار الجوالات والاكسسوارات بالأكواد والمواصفات",url:location.href.split("#")[0].split("?")[0]};if(navigator.share)navigator.share(d).catch(function(){});else window.open("https://wa.me/?text="+encodeURIComponent(d.text+"\n"+d.url))}
/* ===== الإدارة (تعديل / إضافة / حذف) ===== */
function post(o){o.pin=ST.pin;o.user=ST.name;return fetch(C.apiUrl,{method:"POST",headers:{"Content-Type":"text/plain;charset=utf-8"},body:JSON.stringify(o)}).then(function(r){return r.json()})}
function F(k,l,v,t){return '<div class="fl">'+l+'</div><'+(t=="area"?'textarea rows="2"':'input')+' id="f_'+k+'" '+(t=="area"?'>'+E(v)+'</textarea>':'value="'+E(v)+'">')}
function edit(c,type){var r=c?IDX[c]:{type:type||"p",group:V.b&&V.b!="*"?V.b:(V.g||""),approx:0},d=document.querySelector(".md");if(d)d.remove();
var h='<div class="md"><div class="bx"><h3>'+(c?'تعديل صنف':'إضافة صنف')+'</h3>'+F("code","الكود",r.code||"")+'<div class="fl">النوع</div><select id="f_type"><option value="p"'+(r.type=="p"?" selected":"")+'>جوال</option><option value="t"'+(r.type=="t"?" selected":"")+'>تابلت</option><option value="a"'+(r.type=="a"?" selected":"")+'>إكسسوار</option></select>'+F("group","الماركة (مثل samsung) أو قسم الإكسسوار",r.group||"")+F("name","الاسم",r.name||"")+F("price","السعر",r.price||"")+F("keywords","كلمات دلالية (بفاصلة)",r.keywords||"")+F("desc","وصف",r.desc||"","area");
SP.forEach(function(s){h+=F(s[0],s[1],r[s[0]]||"")});
h+='<div class="fl"><label><input type="checkbox" id="f_approx" style="width:auto"'+(r.approx&&String(r.approx)!="0"?" checked":"")+'> مواصفات تقريبية</label></div>'+F("tag","وسم (مثل: مستخدم)",r.tag||"")+'<div style="margin-top:10px"><button class="btn" onclick="saveI(\''+(c||"")+'\')">💾 حفظ</button><button class="btn g" onclick="this.closest(\'.md\').remove()">إلغاء</button></div></div></div>';
var x=document.createElement("div");x.innerHTML=h;document.body.appendChild(x.firstChild)}
function saveI(old){var r={};HEAD.forEach(function(k){var e=$("f_"+k);if(e)r[k]=e.type=="checkbox"?(e.checked?1:0):e.value.trim()});r.price=+r.price||0;if(!r.code||!r.name){alert("الكود والاسم مطلوبان");return}
if(!old&&IDX[r.code]){alert("هذا الكود موجود بالفعل");return}
post({action:old?"edit":"add",oldCode:old,row:r}).then(function(d){if(d.ok){document.querySelector(".md").remove();toast("تم الحفظ ✅");syncNow(1)}else alert(d.error=="pin"?"الرقم السري غير صحيح":"تعذر الحفظ: "+d.error)}).catch(function(){alert("تعذر الاتصال بالشيت")})}
function del(c){if(!confirm("حذف الصنف "+c+" نهائياً؟"))return;post({action:"delete",row:{code:c}}).then(function(d){if(d.ok){var m=document.querySelector(".md");if(m)m.remove();toast("تم الحذف");syncNow(1)}else alert("تعذر الحذف: "+d.error)}).catch(function(){alert("تعذر الاتصال")})}
var tap=0;function vTap(){var n=Date.now();if(n-tap<500){tap=0;toggleAdm()}else tap=n}
function toggleAdm(){if(isAdm()){ST.adm=0;sv();toast("وضع العميل");render();return}
if(!C.apiUrl){alert("اربط apiUrl أولاً في config.js لتفعيل وضع الإدارة");return}
var p=prompt("الرقم السري للإدارة");if(!p)return;api("action=checkedit&pin="+encodeURIComponent(p)).then(function(d){if(!d.ok){alert("الرقم غير صحيح");return}
var n=prompt("اكتب اسمك (يظهر في سجل التعديلات)",ST.name||"");if(!n)return;ST.pin=p;ST.name=n;ST.adm=1;sv();toast("وضع الإدارة");render()}).catch(function(){alert("تعذر الاتصال")})}
/* ===== الإعدادات والصفحات ===== */
function setH(){return '<h2>⚙️ الإعدادات</h2><div class="card"><div class="li" onclick="vTap()">إصدار التطبيق<b>v'+APP_VERSION+(isAdm()?' · إدارة — '+E(ST.name):'')+'</b></div><div class="li">المظهر<select style="width:130px" onchange="ST.th=this.value;sv();theme()"><option value="auto"'+(ST.th=="auto"?" selected":"")+'>تلقائي</option><option value="light"'+(ST.th=="light"?" selected":"")+'>فاتح</option><option value="dark"'+(ST.th=="dark"?" selected":"")+'>داكن</option></select></div><div class="li" style="border:0">آخر تحديث للبيانات<span style="font-size:12px;color:var(--mu)">'+E(String(VER).slice(0,19).replace("T"," "))+'</span></div></div><div class="card"><button class="btn" onclick="chk(1)">🔄 التحقق من تحديث التطبيق</button><button class="btn g" onclick="syncNow(1)">📥 تحديث الأسعار الآن</button><button class="btn g" onclick="shareApp()">📤 مشاركة التطبيق</button><button class="btn g" onclick="inst()">⬇ تثبيت</button><div id="um" style="font-size:12px;margin-top:4px"></div></div><div class="card"><b>نسخة احتياطية</b> (المفضلة والإعدادات)<br><button class="btn" onclick="bk()">⬆ تصدير</button><button class="btn g" onclick="$(\'rf\').click()">⬇ استيراد</button><input type="file" id="rf" accept=".json" style="display:none" onchange="rs(this)"></div><div class="card"><div class="li" onclick="pg(\'terms\')">📄 شروط الاستخدام<span>›</span></div><div class="li" onclick="pg(\'priv\')">🔒 سياسة الخصوصية<span>›</span></div><div class="li" onclick="pg(\'about\')">ℹ️ من نحن<span>›</span></div><div class="li" onclick="pg(\'contact\')" style="border:0">📞 اتصل بنا<span>›</span></div></div>'}
var PG={terms:["شروط الاستخدام","الأسعار والمواصفات المعروضة للاسترشاد وقابلة للتغيير دون إشعار، والسعر النهائي يُؤكَّد عند الشراء. بعض المواصفات تقريبية وتُراجَع من الموقع الرسمي للمصنّع."],priv:["سياسة الخصوصية","لا يجمع التطبيق أي بيانات شخصية. المفضلة والإعدادات تُحفظ على جهازك فقط ويمكنك تصديرها واستيرادها."],about:["من نحن","تطبيق لعرض أسعار الجوالات والتابلت والاكسسوارات بأكوادها ومواصفاتها وباركود لكل صنف."],contact:["اتصل بنا","للاستفسار أو الطلب تواصل معنا عبر واتساب."]};
function pg(k){V.pg=k;go("page")}
function pgH(){var p=PG[V.pg],w=(C.contact||{}).whatsapp;return '<h2><button class="chip" onclick="go(\'settings\')">‹ رجوع</button> '+p[0]+'</h2><div class="card">'+p[1]+(V.pg=="contact"?'<br>'+(w?'<button class="btn" onclick="window.open(\'https://wa.me/'+w+'\')">💬 واتساب</button>':'<i>أضف رقم واتساب في config.js</i>'):'')+'</div>'}
function bk(){var b=new Blob([JSON.stringify({app:"phone-prices",v:APP_VERSION,fv:FV,st:{th:ST.th}})],{type:"application/json"}),a=document.createElement("a");a.href=URL.createObjectURL(b);a.download="phone-prices-backup.json";a.click()}
function rs(i){var f=i.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var d=JSON.parse(r.result);if(d.app!="phone-prices")throw 0;FV=d.fv||[];if(d.st&&d.st.th)ST.th=d.st.th;sv();theme();toast("تمت الاستعادة ✅");render()}catch(e){alert("ملف غير صالح")}};r.readAsText(f)}
/* ===== التثبيت والتحديث ===== */
var DP=null;function stand(){return matchMedia("(display-mode:standalone)").matches||navigator.standalone}
window.addEventListener("beforeinstallprompt",function(e){e.preventDefault();DP=e;if(!stand())$("bi").style.display=""});
window.addEventListener("appinstalled",function(){$("bi").style.display="none";DP=null});
if(!stand()&&/iphone|ipad|ipod/i.test(navigator.userAgent))$("bi").style.display="";
function inst(){if(DP){DP.prompt();DP=null}else if(stand())alert("التطبيق مثبّت بالفعل ✅");else alert("للتثبيت: في آيفون من سفاري اضغط زر المشاركة ثم «إضافة إلى الشاشة الرئيسية». وفي أندرويد من قائمة المتصفح اختر «تثبيت التطبيق».")}
function chk(m){var u=$("um");if(m&&u)u.textContent="جارٍ التحقق...";fetch("index.html?_="+Date.now(),{cache:"no-store"}).then(function(r){return r.text()}).then(function(t){var x=t.match(/app\.js\?v=([\d.]+)/);if(x&&x[1]!=APP_VERSION)$("upd").style.display="flex";else if(m&&u)u.textContent="أنت على أحدث نسخة ✅"}).catch(function(){if(m&&u)u.textContent="تعذّر التحقق (لا يوجد اتصال)"})}
function doUpdate(){var d=function(){location.replace(location.href.split("#")[0].split("?")[0]+"?v="+Date.now())},go2=function(){if(window.caches)caches.keys().then(function(k){return Promise.all(k.map(function(x){return caches.delete(x)}))}).then(d,d);else d()};if(navigator.serviceWorker)navigator.serviceWorker.getRegistrations().then(function(rs){return Promise.all(rs.map(function(r){return r.unregister()}))}).then(go2,go2);else go2()}
theme();boot();setTimeout(function(){if(navigator.onLine)chk(0)},3000);
