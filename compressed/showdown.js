//
// showdown.js -- A javascript port of Markdown.
//
// Copyright (c) 2007 John Fraser.
//
// Original Markdown Copyright (c) 2004-2005 John Gruber
//   <http://daringfireball.net/projects/markdown/>
//
// Redistributable under a BSD-style open source license.
// See license.txt for more information.
//
// The full source distribution is at:
//
//				A A L
//				T C A
//				T K B
//
//   <http://www.attacklab.net/>
//
//
// Wherever possible, Showdown is a straight, line-by-line port
// of the Perl version of Markdown.
//
// This is not a normal parser design; it's basically just a
// series of string substitutions.  It's hard to read and
// maintain this way,  but keeping Showdown close to the original
// design makes it easier to port new features.
//
// More importantly, Showdown behaves like markdown.pl in most
// edge cases.  So web applications can do client-side preview
// in Javascript, and then build identical HTML on the server.
//
// This port needs the new RegExp functionality of ECMA 262,
// 3rd Edition (i.e. Javascript 1.5).  Most modern web browsers
// should do fine.  Even with the new regular expression features,
// We do a lot of work to emulate Perl's regex functionality.
// The tricky changes in this file mostly have the "attacklab:"
// label.  Major or self-explanatory changes don't.
//
// Smart diff tools like Araxis Merge will be able to match up
// this file with markdown.pl in a useful way.  A little tweaking
// helps: in a copy of markdown.pl, replace "#" with "//" and
// replace "$text" with "text".  Be sure to ignore whitespace
// and line endings.
//
//
// Showdown usage:
//
//   var text = "Markdown *rocks*.";
//
//   var converter = new Showdown.converter();
//   var html = converter.makeHtml(text);
//
//   alert(html);
//
// Note: move the sample code to the bottom of this
// file before uncommenting it.
//
//
// Showdown namespace
//
var Showdown={};Showdown.converter=function(){var e,t,n,r,i=0;this.makeHtml=function(i){return e=new Array,t=new Array,n=new Array,r=new Array,i=i.replace(/~/g,"~T"),i=i.replace(/\$/g,"~D"),i=i.replace(/\r\n/g,"\n"),i=i.replace(/\r/g,"\n"),i="\n\n"+i+"\n\n",i=H(i),i=i.replace(/^[ \t]+$/mg,""),i=E(i),i=o(i,a),i=s(i),i=f(i),i=D(i),i=i.replace(/~D/g,"$$"),i=i.replace(/~T/g,"~"),i};var s=function(t){var t=t.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,function(t,r,i,s,o){return r=r.toLowerCase(),e[r]=L(i),s?s+o:(o&&(n[r]=o.replace(/"/g,"&quot;")),"")});return t},o=function(e,t){e=e.replace(/\n/g,"\n\n"),t=t||u;var n="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del|style|section|header|footer|nav|article|aside",r="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside";return e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,t),e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,t),e=e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,t),e=e.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,t),e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,t),e=e.replace(/\n\n/g,"\n"),e},u=function(e,t){var n=t;return n=n.replace(/\n\n/g,"\n"),n=n.replace(/^\n/,""),n=n.replace(/\n+$/g,""),n="\n\n~K"+(r.push(n)-1)+"K\n\n",n},a=function(e,t){var n=t;return n=n.replace(/\n\n/g,"\n"),n=n.replace(/^\n/,""),n=n.replace(/\n+$/g,""),n="\n\n~J"+(r.push(n)-1)+"J\n\n",n},f=function(e){e=m(e);var t=S("<hr />");return e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,t),e=e.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,t),e=e.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,t),e=y(e),e=b(e),e=w(e),e=C(e),e=o(e),e=k(e),e},l=function(e){return e=x(e),e=c(e),e=A(e),e=d(e),e=h(e),e=O(e),e=L(e),e=N(e),e=M(e),e=e.replace(/  +\n/g," <br />\n"),e},c=function(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");return t=B(t,"\\`*_"),t}),e},h=function(e){return e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,p),e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,p),e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,p),e},p=function(r,i,s,o,u,a,f,l){l==undefined&&(l="");var c=i,h=s,p=o.toLowerCase(),d=u,v=l;if(d==""){p==""&&(p=h.toLowerCase().replace(/ ?\n/g," ")),d="#"+p;if(e[p]!=undefined)d=e[p],n[p]!=undefined&&(v=n[p]);else{if(!(c.search(/\(\s*\)$/m)>-1))return c;d=""}}d=B(d,"*_");var m='<a href="'+d+'"';return v!=""&&(v=v.replace(/"/g,"&quot;"),v=B(v,"*_"),m+=' title="'+v+'"'),m+=">"+h+"</a>","~L"+(t.push(m)-1)+"L"},d=function(e){return e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,v),e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,v),e},v=function(r,i,s,o,u,a,f,l){var c=i,h=s,p=o.toLowerCase(),d=u,v=l;v||(v="");if(d==""){p==""&&(p=h.toLowerCase().replace(/ ?\n/g," ")),d="#"+p;if(e[p]==undefined)return c;d=e[p],n[p]!=undefined&&(v=n[p])}h=h.replace(/"/g,"&quot;"),d=B(d,"*_");var m='<img src="'+d+'" alt="'+h+'"';return v=v.replace(/"/g,"&quot;"),v=B(v,"*_"),m+=' title="'+v+'"',m+=" />","~L"+(t.push(m)-1)+"L"},m=function(e){return e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return S("<h1>"+l(t)+"</h1>")}),e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return S("<h2>"+l(t)+"</h2>")}),e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return S("<h"+r+">"+l(n)+"</h"+r+">")}),e},g,y=function(e){e+="~0";var t=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return i?e=e.replace(t,function(e,t,n){var r=t,i=n.search(/[*+-]/g)>-1?"ul":"ol";r=r.replace(/\n{2,}/g,"\n\n\n");var s=g(r);return s=s.replace(/\s+$/,""),s="<"+i+">"+s+"</"+i+">\n",s}):(t=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,e=e.replace(t,function(e,t,n,r){var i=t,s=n,o=r.search(/[*+-]/g)>-1?"ul":"ol",s=s.replace(/\n{2,}/g,"\n\n\n"),u=g(s);return u=i+"<"+o+">\n"+u+"</"+o+">\n",u})),e=e.replace(/~0/,""),e};g=function(e){return i++,e=e.replace(/\n{2,}$/,"\n"),e+="~0",e=e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(e,t,n,r,i){var s=i,o=t,u=n;return o||s.search(/\n{2,}/)>-1?s=f(P(s)):(s=y(P(s)),s=s.replace(/\n$/,""),s=l(s)),"<li>"+s+"</li>\n"}),e=e.replace(/~0/g,""),i--,e};var b=function(e){var t=function(e){return function(t,n,r,i){var s=0,o=0;r=r.replace(/[\|]\s*$/,"");var u=r.split("|"),a="";a+="<table>\n",a+="<thead>\n  <tr>\n";if(u.length!==1||u[0]!=="")for(s=0;s<u.length;s++){var f=l(u[s].replace(/(^\s+)|(\s+$)/g,""));a+="    <th>"+f+"</th>\n"}a+="  </tr>\n</thead>\n",a+="<tbody>\n";var c=i.replace(e,function(e,t){return t=t.replace(/[\|]\s*$/,""),t+"\n"}).split("\n");c=c.splice(0,c.length-1);for(s=0;s<c.length;s++){a+="  <tr>\n";var h=c[s].split("|");u.length<h.length&&(h=h.splice(0,u.length-1).concat(h.join("|")));if(h.length!==1||h[0]!=="")for(o=0;o<h.length;o++){var p=l(h[o].replace(/(^\s+)|(\s+$)/g,""));a+="    <td>"+p+"</td>\n"}a+="  </tr>\n"}return a+="</tbody>\n",a+="</table>",S(a)+"\n"}},n;return n=new t(/(?:\n|^)[ \t]*[\|]([^\n]*)/g),e=e.replace(/((?:[ \t]*[\|])([^\n]*)\n(?:[ \t]*[\|][\-\| \t]*)\n((?:[ \t]*[\|][^\n]*\n)*(?:[ \t]*[\|][^\n]*)+))/g,n),n=new t(/(?:\n|^)[ \t]*([^\n]*[\|][^\n]*)/g),e=e.replace(/((?:[ \t]*)([^\n]+[\|][^\n]*)\n(?:[ \t]*[\-]+[ ]*[\|][\-\| ]*)\n((?:[ \t]*[^\n]*[\|][^\n]*\n)*(?:[ \t]*[^\n]*[\|][^\n]*)+))/g,n),e},w=function(e){return e+="~0",e=e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t,i=n;return r=T(P(r)),r=H(r),r=r.replace(/^\n+/g,""),r=r.replace(/\n+$/g,""),r="<pre><code>"+r+"\n</code></pre>",S(r)+i}),e=e.replace(/~0/,""),e},E=function(e){return e+="~0",e=e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(e,t,n){var r=t,i=n;return i=T(i),i=H(i),i=i.replace(/^\n+/g,""),i=i.replace(/\n+$/g,""),i="<pre><code"+(r?' class="'+r+'"':"")+">"+i+"\n</code></pre>",S(i)}),e=e.replace(/~0/,""),e},S=function(e){return e=e.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(r.push(e)-1)+"K\n\n"},x=function(e){return e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r,i){var s=r;return s=s.replace(/^([ \t]*)/g,""),s=s.replace(/[ \t]*$/g,""),s=T(s),t+"<code>"+s+"</code>"}),e},T=function(e){return e=e.replace(/&/g,"&amp;"),e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=B(e,"*_{}[]\\",!1),e},N=function(e){return e=e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),e=e.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"),e},C=function(e){return e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;return n=n.replace(/^[ \t]*>[ \t]?/gm,"~0"),n=n.replace(/~0/g,""),n=n.replace(/^[ \t]+$/gm,""),n=f(n),n=n.replace(/(^|\n)/g,"$1  "),n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;return n=n.replace(/^  /mg,"~0"),n=n.replace(/~0/g,""),n}),S("<blockquote>\n"+n+"\n</blockquote>")}),e},k=function(e){e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,"");var t=e.split(/\n{2,}/g),n=new Array,i=t.length;for(var s=0;s<i;s++){var o=t[s];o.search(/~K(\d+)K/g)>=0?n.push(o):o.search(/~J(\d+)J/g)>=0?n.push(o):o.search(/\S/)>=0&&(o=l(o),o=o.replace(/^([ \t]*)/g,"<p>"),o+="</p>",n.push(o))}i=n.length;for(var s=0;s<i;s++){while(n[s].search(/~K(\d+)K/)>=0){var u=r[RegExp.$1];u=u.replace(/\$/g,"$$$$"),n[s]=n[s].replace(/~K\d+K/,u)}while(n[s].search(/~J(\d+)J/)>=0){var u=r[RegExp.$1];u=u.replace(/\$/g,"$$$$"),n[s]=n[s].replace(/~J\d+J/,u),n[s]=n[s].replace(/<(\/?)([^>]+)>/g,"&lt;$1$2&gt;")}}return n.join("\n\n")},L=function(e){return e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;"),e},A=function(e){return e=e.replace(/\\(\\)/g,j),e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,j),e},O=function(e){return e=e.replace(/<(((?:https?|ftp):\/\/?|www[.])(?:[-_.!~*'a-zA-Z0-9;\/?:\@&=+\$,%#]|(?:\([\w\d]+\)))+\/?)>/gi,function(e,n){return"~L"+(t.push('<a href="'+n+'">'+n+"</a>")-1)+"L"}),e=e.replace(/(((?:https?|ftp):\/\/?|www[.])(?:[-_.!~*'a-zA-Z0-9;\/?:\@&=+\$,%#]|(?:\([\w\d]+\)))+\/?)/gi,function(e,n){return"~L"+(t.push('<a href="'+n+'">'+n+"</a>")-1)+"L"}),e=e.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(e,t){return _(D(t))}),e},M=function(e){return e=e.replace(/(~L(\d+)L)/g,function(e,n,r){return t[r]}),e},_=function(e){function t(e){var t="0123456789ABCDEF",n=e.charCodeAt(0);return t.charAt(n>>4)+t.charAt(n&15)}var n=[function(e){return"&#"+e.charCodeAt(0)+";"},function(e){return"&#x"+t(e)+";"},function(e){return e}];return e="mailto:"+e,e=e.replace(/./g,function(e){if(e=="@")e=n[Math.floor(Math.random()*2)](e);else if(e!=":"){var t=Math.random();e=t>.9?n[2](e):t>.45?n[1](e):n[0](e)}return e}),e='<a href="'+e+'">'+e+"</a>",e=e.replace(/">.+:/g,'">'),e},D=function(e){return e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)}),e},P=function(e){return e=e.replace(/^(\t|[ ]{1,4})/gm,"~0"),e=e.replace(/~0/g,""),e},H=function(e){return e=e.replace(/\t(?=\t)/g,"    "),e=e.replace(/\t/g,"~A~B"),e=e.replace(/~B(.+?)~A/g,function(e,t,n){var r=t,i=4-r.length%4;for(var s=0;s<i;s++)r+=" ";return r}),e=e.replace(/~A/g,"    "),e=e.replace(/~B/g,""),e},B=function(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";n&&(r="\\\\"+r);var i=new RegExp(r,"g");return e=e.replace(i,j),e},j=function(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}},typeof module!="undefined"&&(module.exports=Showdown);