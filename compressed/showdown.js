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
var Showdown={};Showdown.converter=function(){var e,t,n,r=0;this.makeHtml=function(r){return e=new Array,t=new Array,n=new Array,r=r.replace(/~/g,"~T"),r=r.replace(/\$/g,"~D"),r=r.replace(/\r\n/g,"\n"),r=r.replace(/\r/g,"\n"),r="\n\n"+r+"\n\n",r=D(r),r=r.replace(/^[ \t]+$/mg,""),r=w(r),r=s(r,u),r=i(r),r=a(r),r=M(r),r=r.replace(/~D/g,"$$"),r=r.replace(/~T/g,"~"),r};var i=function(n){var n=n.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,function(n,r,i,s,o){return r=r.toLowerCase(),e[r]=k(i),s?s+o:(o&&(t[r]=o.replace(/"/g,"&quot;")),"")});return n},s=function(e,t){e=e.replace(/\n/g,"\n\n"),t=t||o;var n="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del|style|section|header|footer|nav|article|aside",r="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside";return e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,t),e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,t),e=e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,t),e=e.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,t),e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,t),e=e.replace(/\n\n/g,"\n"),e},o=function(e,t){var r=t;return r=r.replace(/\n\n/g,"\n"),r=r.replace(/^\n/,""),r=r.replace(/\n+$/g,""),r="\n\n~K"+(n.push(r)-1)+"K\n\n",r},u=function(e,t){var r=t;return r=r.replace(/\n\n/g,"\n"),r=r.replace(/^\n/,""),r=r.replace(/\n+$/g,""),r="\n\n~J"+(n.push(r)-1)+"J\n\n",r},a=function(e){e=v(e);var t=E("<hr />");return e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,t),e=e.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,t),e=e.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,t),e=g(e),e=y(e),e=b(e),e=N(e),e=s(e),e=C(e),e},f=function(e){return e=S(e),e=l(e),e=L(e),e=p(e),e=c(e),e=A(e),e=k(e),e=T(e),e=e.replace(/  +\n/g," <br />\n"),e},l=function(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");return t=P(t,"\\`*_"),t}),e},c=function(e){return e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,h),e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,h),e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,h),e},h=function(n,r,i,s,o,u,a,f){f==undefined&&(f="");var l=r,c=i,h=s.toLowerCase(),p=o,d=f;if(p==""){h==""&&(h=c.toLowerCase().replace(/ ?\n/g," ")),p="#"+h;if(e[h]!=undefined)p=e[h],t[h]!=undefined&&(d=t[h]);else{if(!(l.search(/\(\s*\)$/m)>-1))return l;p=""}}p=P(p,"*_");var v='<a href="'+p+'"';return d!=""&&(d=d.replace(/"/g,"&quot;"),d=P(d,"*_"),v+=' title="'+d+'"'),v+=">"+c+"</a>",v},p=function(e){return e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,d),e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,d),e},d=function(n,r,i,s,o,u,a,f){var l=r,c=i,h=s.toLowerCase(),p=o,d=f;d||(d="");if(p==""){h==""&&(h=c.toLowerCase().replace(/ ?\n/g," ")),p="#"+h;if(e[h]==undefined)return l;p=e[h],t[h]!=undefined&&(d=t[h])}c=c.replace(/"/g,"&quot;"),p=P(p,"*_");var v='<img src="'+p+'" alt="'+c+'"';return d=d.replace(/"/g,"&quot;"),d=P(d,"*_"),v+=' title="'+d+'"',v+=" />",v},v=function(e){return e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return E("<h1>"+f(t)+"</h1>")}),e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return E("<h2>"+f(t)+"</h2>")}),e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return E("<h"+r+">"+f(n)+"</h"+r+">")}),e},m,g=function(e){e+="~0";var t=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return r?e=e.replace(t,function(e,t,n){var r=t,i=n.search(/[*+-]/g)>-1?"ul":"ol";r=r.replace(/\n{2,}/g,"\n\n\n");var s=m(r);return s=s.replace(/\s+$/,""),s="<"+i+">"+s+"</"+i+">\n",s}):(t=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,e=e.replace(t,function(e,t,n,r){var i=t,s=n,o=r.search(/[*+-]/g)>-1?"ul":"ol",s=s.replace(/\n{2,}/g,"\n\n\n"),u=m(s);return u=i+"<"+o+">\n"+u+"</"+o+">\n",u})),e=e.replace(/~0/,""),e};m=function(e){return r++,e=e.replace(/\n{2,}$/,"\n"),e+="~0",e=e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(e,t,n,r,i){var s=i,o=t,u=n;return o||s.search(/\n{2,}/)>-1?s=a(_(s)):(s=g(_(s)),s=s.replace(/\n$/,""),s=f(s)),"<li>"+s+"</li>\n"}),e=e.replace(/~0/g,""),r--,e};var y=function(e){var t=function(e){return function(t,n,r,i){var s=0,o=0;r=r.replace(/[\|]\s*$/,"");var u=r.split("|"),a="";a+="<table>\n",a+="<thead>\n  <tr>\n";if(u.length!==1||u[0]!=="")for(s=0;s<u.length;s++){var l=f(u[s].replace(/(^\s+)|(\s+$)/g,""));a+="    <th>"+l+"</th>\n"}a+="  </tr>\n</thead>\n",a+="<tbody>\n";var c=i.replace(e,function(e,t){return t=t.replace(/[\|]\s*$/,""),t+"\n"}).split("\n");c=c.splice(0,c.length-1);for(s=0;s<c.length;s++){a+="  <tr>\n";var h=c[s].split("|");u.length<h.length&&(h=h.splice(0,u.length-1).concat(h.join("|")));if(h.length!==1||h[0]!=="")for(o=0;o<h.length;o++){var p=f(h[o].replace(/(^\s+)|(\s+$)/g,""));a+="    <td>"+p+"</td>\n"}a+="  </tr>\n"}return a+="</tbody>\n",a+="</table>",E(a)+"\n"}},n;return n=new t(/(?:\n|^)[ \t]*[\|]([^\n]*)/g),e=e.replace(/((?:[ \t]*[\|])([^\n]*)\n(?:[ \t]*[\|][\-\| \t]*)\n((?:[ \t]*[\|][^\n]*\n)*(?:[ \t]*[\|][^\n]*)+))/g,n),n=new t(/(?:\n|^)[ \t]*([^\n]*[\|][^\n]*)/g),e=e.replace(/((?:[ \t]*)([^\n]+[\|][^\n]*)\n(?:[ \t]*[\-]+[ ]*[\|][\-\| ]*)\n((?:[ \t]*[^\n]*[\|][^\n]*\n)*(?:[ \t]*[^\n]*[\|][^\n]*)+))/g,n),e},b=function(e){return e+="~0",e=e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t,i=n;return r=x(_(r)),r=D(r),r=r.replace(/^\n+/g,""),r=r.replace(/\n+$/g,""),r="<pre><code>"+r+"\n</code></pre>",E(r)+i}),e=e.replace(/~0/,""),e},w=function(e){return e+="~0",e=e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(e,t,n){var r=t,i=n;return i=x(i),i=D(i),i=i.replace(/^\n+/g,""),i=i.replace(/\n+$/g,""),i="<pre><code"+(r?' class="'+r+'"':"")+">"+i+"\n</code></pre>",E(i)}),e=e.replace(/~0/,""),e},E=function(e){return e=e.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(n.push(e)-1)+"K\n\n"},S=function(e){return e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r,i){var s=r;return s=s.replace(/^([ \t]*)/g,""),s=s.replace(/[ \t]*$/g,""),s=x(s),t+"<code>"+s+"</code>"}),e},x=function(e){return e=e.replace(/&/g,"&amp;"),e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=P(e,"*_{}[]\\",!1),e},T=function(e){return e=e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),e=e.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"),e},N=function(e){return e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;return n=n.replace(/^[ \t]*>[ \t]?/gm,"~0"),n=n.replace(/~0/g,""),n=n.replace(/^[ \t]+$/gm,""),n=a(n),n=n.replace(/(^|\n)/g,"$1  "),n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;return n=n.replace(/^  /mg,"~0"),n=n.replace(/~0/g,""),n}),E("<blockquote>\n"+n+"\n</blockquote>")}),e},C=function(e){e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,"");var t=e.split(/\n{2,}/g),r=new Array,i=t.length;for(var s=0;s<i;s++){var o=t[s];o.search(/~K(\d+)K/g)>=0?r.push(o):o.search(/~J(\d+)J/g)>=0?r.push(o):o.search(/\S/)>=0&&(o=f(o),o=o.replace(/^([ \t]*)/g,"<p>"),o+="</p>",r.push(o))}i=r.length;for(var s=0;s<i;s++){while(r[s].search(/~K(\d+)K/)>=0){var u=n[RegExp.$1];u=u.replace(/\$/g,"$$$$"),r[s]=r[s].replace(/~K\d+K/,u)}while(r[s].search(/~J(\d+)J/)>=0){var u=n[RegExp.$1];u=u.replace(/\$/g,"$$$$"),r[s]=r[s].replace(/~J\d+J/,u),r[s]=r[s].replace(/<(\/?)([^>]+)>/g,"&lt;$1$2&gt;")}}return r.join("\n\n")},k=function(e){return e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;"),e},L=function(e){return e=e.replace(/\\(\\)/g,H),e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,H),e},A=function(e){return e=e.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>'),e=e.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(e,t){return O(M(t))}),e},O=function(e){function t(e){var t="0123456789ABCDEF",n=e.charCodeAt(0);return t.charAt(n>>4)+t.charAt(n&15)}var n=[function(e){return"&#"+e.charCodeAt(0)+";"},function(e){return"&#x"+t(e)+";"},function(e){return e}];return e="mailto:"+e,e=e.replace(/./g,function(e){if(e=="@")e=n[Math.floor(Math.random()*2)](e);else if(e!=":"){var t=Math.random();e=t>.9?n[2](e):t>.45?n[1](e):n[0](e)}return e}),e='<a href="'+e+'">'+e+"</a>",e=e.replace(/">.+:/g,'">'),e},M=function(e){return e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)}),e},_=function(e){return e=e.replace(/^(\t|[ ]{1,4})/gm,"~0"),e=e.replace(/~0/g,""),e},D=function(e){return e=e.replace(/\t(?=\t)/g,"    "),e=e.replace(/\t/g,"~A~B"),e=e.replace(/~B(.+?)~A/g,function(e,t,n){var r=t,i=4-r.length%4;for(var s=0;s<i;s++)r+=" ";return r}),e=e.replace(/~A/g,"    "),e=e.replace(/~B/g,""),e},P=function(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";n&&(r="\\\\"+r);var i=new RegExp(r,"g");return e=e.replace(i,H),e},H=function(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}},typeof module!="undefined"&&(module.exports=Showdown);