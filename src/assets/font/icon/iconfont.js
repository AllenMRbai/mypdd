(function(window){var svgSprite='<svg><symbol id="icon-xihuan" viewBox="0 0 1024 1024"><path d="M512 51.2C257.5 51.2 51.2 257.5 51.2 512S257.5 972.8 512 972.8 972.8 766.5 972.8 512 766.5 51.2 512 51.2zM512 921.6c-226.3 0-409.6-183.3-409.6-409.6S285.7 102.4 512 102.4 921.6 285.7 921.6 512 738.3 921.6 512 921.6zM734 358.1c-28.2-27.9-65.6-43.2-105.4-43.2-37.4 0-73.3 13.8-101 38.8L510.5 369l-17-15.3c-27.8-25-63.7-38.8-101.1-38.8-39.8 0-77.2 15.4-105.4 43.2-28.3 28.1-43.9 65.4-43.9 105.2 0 39.8 15.6 77.1 44 105.2l202.2 195.7c5.7 5.6 13.2 8.7 21.2 8.7 8 0 15.6-3.1 21.1-8.6L734 568.5c28.3-28 43.9-65.4 43.9-105.2C778 423.6 762.4 386.2 734 358.1zM317.7 474.2c-0.1 0-0.1 0-0.2 0-6.4-0.1-11.6-5.4-11.4-11.8 0.3-22.4 9.9-45.1 25.6-60.8 19.5-19.5 45.9-24.3 59-22.8 6.4 0.7 10.9 6.5 10.2 12.9-0.7 6.4-6.6 10.9-12.9 10.2-6.7-0.8-25.9 2.2-39.8 16.1-11.5 11.5-18.6 28.2-18.8 44.7C329.2 469.1 324 474.2 317.7 474.2z"  ></path></symbol><symbol id="icon-jiantouxiaxi" viewBox="0 0 1024 1024"><path d="M511.862 750.76l-431.297-431.297 34.419-34.419 431.297 431.297-34.419 34.419zM942.267 319.461l-431.298 431.298-34.419-34.419 431.298-431.298 34.419 34.419z"  ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)