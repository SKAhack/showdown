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
var Showdown={};Showdown.converter=function(){var e,t,n,r=0;this.makeHtml=function(r){return e=new Array,t=new Array,n=new Array,r=r.replace(/~/g,"~T"),r=r.replace(/\$/g,"~D"),r=r.replace(/\r\n/g,"\n"),r=r.replace(/\r/g,"\n"),r="\n\n"+r+"\n\n",r=_(r),r=r.replace(/^[ \t]+$/mg,""),r=b(r),r=s(r),r=i(r),r=u(r),r=O(r),r=r.replace(/~D/g,"$$"),r=r.replace(/~T/g,"~"),r};var i=function(n){var n=n.replace(/^[ ]{0,3}\[(.+)\]:[ \t]*\n?[ \t]*<?(\S+?)>?[ \t]*\n?[ \t]*(?:(\n*)["(](.+?)[")][ \t]*)?(?:\n+|\Z)/gm,function(n,r,i,s,o){return r=r.toLowerCase(),e[r]=C(i),s?s+o:(o&&(t[r]=o.replace(/"/g,"&quot;")),"")});return n},s=function(e){e=e.replace(/\n/g,"\n\n");var t="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del|style|section|header|footer|nav|article|aside",n="p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside";return e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|ins|del)\b[^\r]*?\n<\/\2>[ \t]*(?=\n+))/gm,o),e=e.replace(/^(<(p|div|h[1-6]|blockquote|pre|table|dl|ol|ul|script|noscript|form|fieldset|iframe|math|style|section|header|footer|nav|article|aside)\b[^\r]*?.*<\/\2>[ \t]*(?=\n+)\n)/gm,o),e=e.replace(/(\n[ ]{0,3}(<(hr)\b([^<>])*?\/?>)[ \t]*(?=\n{2,}))/g,o),e=e.replace(/(\n\n[ ]{0,3}<!(--[^\r]*?--\s*)+>[ \t]*(?=\n{2,}))/g,o),e=e.replace(/(?:\n\n)([ ]{0,3}(?:<([?%])[^\r]*?\2>)[ \t]*(?=\n{2,}))/g,o),e=e.replace(/\n\n/g,"\n"),e},o=function(e,t){var r=t;return r=r.replace(/\n\n/g,"\n"),r=r.replace(/^\n/,""),r=r.replace(/\n+$/g,""),r="\n\n~K"+(n.push(r)-1)+"K\n\n",r},u=function(e){e=d(e);var t=w("<hr />");return e=e.replace(/^[ ]{0,2}([ ]?\*[ ]?){3,}[ \t]*$/gm,t),e=e.replace(/^[ ]{0,2}([ ]?\-[ ]?){3,}[ \t]*$/gm,t),e=e.replace(/^[ ]{0,2}([ ]?\_[ ]?){3,}[ \t]*$/gm,t),e=m(e),e=g(e),e=y(e),e=T(e),e=s(e),e=N(e),e},a=function(e){return e=E(e),e=f(e),e=k(e),e=h(e),e=l(e),e=L(e),e=C(e),e=x(e),e=e.replace(/  +\n/g," <br />\n"),e},f=function(e){var t=/(<[a-z\/!$]("[^"]*"|'[^']*'|[^'">])*>|<!(--.*?--\s*)+>)/gi;return e=e.replace(t,function(e){var t=e.replace(/(.)<\/?code>(?=.)/g,"$1`");return t=D(t,"\\`*_"),t}),e},l=function(e){return e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,c),e=e.replace(/(\[((?:\[[^\]]*\]|[^\[\]])*)\]\([ \t]*()<?(.*?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,c),e=e.replace(/(\[([^\[\]]+)\])()()()()()/g,c),e},c=function(n,r,i,s,o,u,a,f){f==undefined&&(f="");var l=r,c=i,h=s.toLowerCase(),p=o,d=f;if(p==""){h==""&&(h=c.toLowerCase().replace(/ ?\n/g," ")),p="#"+h;if(e[h]!=undefined)p=e[h],t[h]!=undefined&&(d=t[h]);else{if(!(l.search(/\(\s*\)$/m)>-1))return l;p=""}}p=D(p,"*_");var v='<a href="'+p+'"';return d!=""&&(d=d.replace(/"/g,"&quot;"),d=D(d,"*_"),v+=' title="'+d+'"'),v+=">"+c+"</a>",v},h=function(e){return e=e.replace(/(!\[(.*?)\][ ]?(?:\n[ ]*)?\[(.*?)\])()()()()/g,p),e=e.replace(/(!\[(.*?)\]\s?\([ \t]*()<?(\S+?)>?[ \t]*((['"])(.*?)\6[ \t]*)?\))/g,p),e},p=function(n,r,i,s,o,u,a,f){var l=r,c=i,h=s.toLowerCase(),p=o,d=f;d||(d="");if(p==""){h==""&&(h=c.toLowerCase().replace(/ ?\n/g," ")),p="#"+h;if(e[h]==undefined)return l;p=e[h],t[h]!=undefined&&(d=t[h])}c=c.replace(/"/g,"&quot;"),p=D(p,"*_");var v='<img src="'+p+'" alt="'+c+'"';return d=d.replace(/"/g,"&quot;"),d=D(d,"*_"),v+=' title="'+d+'"',v+=" />",v},d=function(e){return e=e.replace(/^(.+)[ \t]*\n=+[ \t]*\n+/gm,function(e,t){return w("<h1>"+a(t)+"</h1>")}),e=e.replace(/^(.+)[ \t]*\n-+[ \t]*\n+/gm,function(e,t){return w("<h2>"+a(t)+"</h2>")}),e=e.replace(/^(\#{1,6})[ \t]*(.+?)[ \t]*\#*\n+/gm,function(e,t,n){var r=t.length;return w("<h"+r+">"+a(n)+"</h"+r+">")}),e},v,m=function(e){e+="~0";var t=/^(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/gm;return r?e=e.replace(t,function(e,t,n){var r=t,i=n.search(/[*+-]/g)>-1?"ul":"ol";r=r.replace(/\n{2,}/g,"\n\n\n");var s=v(r);return s=s.replace(/\s+$/,""),s="<"+i+">"+s+"</"+i+">\n",s}):(t=/(\n\n|^\n?)(([ ]{0,3}([*+-]|\d+[.])[ \t]+)[^\r]+?(~0|\n{2,}(?=\S)(?![ \t]*(?:[*+-]|\d+[.])[ \t]+)))/g,e=e.replace(t,function(e,t,n,r){var i=t,s=n,o=r.search(/[*+-]/g)>-1?"ul":"ol",s=s.replace(/\n{2,}/g,"\n\n\n"),u=v(s);return u=i+"<"+o+">\n"+u+"</"+o+">\n",u})),e=e.replace(/~0/,""),e};v=function(e){return r++,e=e.replace(/\n{2,}$/,"\n"),e+="~0",e=e.replace(/(\n)?(^[ \t]*)([*+-]|\d+[.])[ \t]+([^\r]+?(\n{1,2}))(?=\n*(~0|\2([*+-]|\d+[.])[ \t]+))/gm,function(e,t,n,r,i){var s=i,o=t,f=n;return o||s.search(/\n{2,}/)>-1?s=u(M(s)):(s=m(M(s)),s=s.replace(/\n$/,""),s=a(s)),"<li>"+s+"</li>\n"}),e=e.replace(/~0/g,""),r--,e};var g=function(e){var t=function(e){return function(t,n,r,i){var s=0,o=0;r=r.replace(/[\|]\s*$/,"");var u=r.split("|"),f="";f+="<table>\n",f+="<thead>\n  <tr>\n";if(u.length!==1||u[0]!=="")for(s=0;s<u.length;s++){var l=a(u[s].replace(/(^\s+)|(\s+$)/g,""));f+="    <th>"+l+"</th>\n"}f+="  </tr>\n</thead>\n",f+="<tbody>\n";var c=i.replace(e,function(e,t){return t=t.replace(/[\|]\s*$/,""),t+"\n"}).split("\n");c=c.splice(0,c.length-1);for(s=0;s<c.length;s++){f+="  <tr>\n";var h=c[s].split("|");u.length<h.length&&(h=h.splice(0,u.length-1).concat(h.join("|")));if(h.length!==1||h[0]!=="")for(o=0;o<h.length;o++){var p=a(h[o].replace(/(^\s+)|(\s+$)/g,""));f+="    <td>"+p+"</td>\n"}f+="  </tr>\n"}return f+="</tbody>\n",f+="</table>",w(f)+"\n"}},n;return n=new t(/(?:\n|^)[ \t]*[\|]([^\n]*)/g),e=e.replace(/((?:[ \t]*[\|])([^\n]*)\n(?:[ \t]*[\|][\-\| \t]*)\n((?:[ \t]*[\|][^\n]*\n)*(?:[ \t]*[\|][^\n]*)+))/g,n),n=new t(/(?:\n|^)[ \t]*([^\n]*[\|][^\n]*)/g),e=e.replace(/((?:[ \t]*)([^\n]+[\|][^\n]*)\n(?:[ \t]*[\-]+[ ]*[\|][\-\| ]*)\n((?:[ \t]*[^\n]*[\|][^\n]*\n)*(?:[ \t]*[^\n]*[\|][^\n]*)+))/g,n),e},y=function(e){return e+="~0",e=e.replace(/(?:\n\n|^)((?:(?:[ ]{4}|\t).*\n+)+)(\n*[ ]{0,3}[^ \t\n]|(?=~0))/g,function(e,t,n){var r=t,i=n;return r=S(M(r)),r=_(r),r=r.replace(/^\n+/g,""),r=r.replace(/\n+$/g,""),r="<pre><code>"+r+"\n</code></pre>",w(r)+i}),e=e.replace(/~0/,""),e},b=function(e){return e+="~0",e=e.replace(/(?:^|\n)```(.*)\n([\s\S]*?)\n```/g,function(e,t,n){var r=t,i=n;return i=S(i),i=_(i),i=i.replace(/^\n+/g,""),i=i.replace(/\n+$/g,""),i="<pre><code"+(r?' class="'+r+'"':"")+">"+i+"\n</code></pre>",w(i)}),e=e.replace(/~0/,""),e},w=function(e){return e=e.replace(/(^\n+|\n+$)/g,""),"\n\n~K"+(n.push(e)-1)+"K\n\n"},E=function(e){return e=e.replace(/(^|[^\\])(`+)([^\r]*?[^`])\2(?!`)/gm,function(e,t,n,r,i){var s=r;return s=s.replace(/^([ \t]*)/g,""),s=s.replace(/[ \t]*$/g,""),s=S(s),t+"<code>"+s+"</code>"}),e},S=function(e){return e=e.replace(/&/g,"&amp;"),e=e.replace(/</g,"&lt;"),e=e.replace(/>/g,"&gt;"),e=D(e,"*_{}[]\\",!1),e},x=function(e){return e=e.replace(/(\*\*|__)(?=\S)([^\r]*?\S[*_]*)\1/g,"<strong>$2</strong>"),e=e.replace(/(\*|_)(?=\S)([^\r]*?\S)\1/g,"<em>$2</em>"),e},T=function(e){return e=e.replace(/((^[ \t]*>[ \t]?.+\n(.+\n)*\n*)+)/gm,function(e,t){var n=t;return n=n.replace(/^[ \t]*>[ \t]?/gm,"~0"),n=n.replace(/~0/g,""),n=n.replace(/^[ \t]+$/gm,""),n=u(n),n=n.replace(/(^|\n)/g,"$1  "),n=n.replace(/(\s*<pre>[^\r]+?<\/pre>)/gm,function(e,t){var n=t;return n=n.replace(/^  /mg,"~0"),n=n.replace(/~0/g,""),n}),w("<blockquote>\n"+n+"\n</blockquote>")}),e},N=function(e){e=e.replace(/^\n+/g,""),e=e.replace(/\n+$/g,"");var t=e.split(/\n{2,}/g),r=new Array,i=t.length;for(var s=0;s<i;s++){var o=t[s];o.search(/~K(\d+)K/g)>=0?r.push(o):o.search(/\S/)>=0&&(o=a(o),o=o.replace(/^([ \t]*)/g,"<p>"),o+="</p>",r.push(o))}i=r.length;for(var s=0;s<i;s++)while(r[s].search(/~K(\d+)K/)>=0){var u=n[RegExp.$1];u=u.replace(/\$/g,"$$$$"),r[s]=r[s].replace(/~K\d+K/,u)}return r.join("\n\n")},C=function(e){return e=e.replace(/&(?!#?[xX]?(?:[0-9a-fA-F]+|\w+);)/g,"&amp;"),e=e.replace(/<(?![a-z\/?\$!])/gi,"&lt;"),e},k=function(e){return e=e.replace(/\\(\\)/g,P),e=e.replace(/\\([`*_{}\[\]()>#+-.!])/g,P),e},L=function(e){return e=e.replace(/<((https?|ftp|dict):[^'">\s]+)>/gi,'<a href="$1">$1</a>'),e=e.replace(/<(?:mailto:)?([-.\w]+\@[-a-z0-9]+(\.[-a-z0-9]+)*\.[a-z]+)>/gi,function(e,t){return A(O(t))}),e},A=function(e){function t(e){var t="0123456789ABCDEF",n=e.charCodeAt(0);return t.charAt(n>>4)+t.charAt(n&15)}var n=[function(e){return"&#"+e.charCodeAt(0)+";"},function(e){return"&#x"+t(e)+";"},function(e){return e}];return e="mailto:"+e,e=e.replace(/./g,function(e){if(e=="@")e=n[Math.floor(Math.random()*2)](e);else if(e!=":"){var t=Math.random();e=t>.9?n[2](e):t>.45?n[1](e):n[0](e)}return e}),e='<a href="'+e+'">'+e+"</a>",e=e.replace(/">.+:/g,'">'),e},O=function(e){return e=e.replace(/~E(\d+)E/g,function(e,t){var n=parseInt(t);return String.fromCharCode(n)}),e},M=function(e){return e=e.replace(/^(\t|[ ]{1,4})/gm,"~0"),e=e.replace(/~0/g,""),e},_=function(e){return e=e.replace(/\t(?=\t)/g,"    "),e=e.replace(/\t/g,"~A~B"),e=e.replace(/~B(.+?)~A/g,function(e,t,n){var r=t,i=4-r.length%4;for(var s=0;s<i;s++)r+=" ";return r}),e=e.replace(/~A/g,"    "),e=e.replace(/~B/g,""),e},D=function(e,t,n){var r="(["+t.replace(/([\[\]\\])/g,"\\$1")+"])";n&&(r="\\\\"+r);var i=new RegExp(r,"g");return e=e.replace(i,P),e},P=function(e,t){var n=t.charCodeAt(0);return"~E"+n+"E"}},typeof module!="undefined"&&(module.exports=Showdown);