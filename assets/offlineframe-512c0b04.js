import"./proxy-9225cf57.js";import{r as n,s as t}from"./proxyReciever-e68a371e.js";const e=document.createElement("iframe"),a=window.location.protocol.replace(":","")+"://"+window.location.host;e.src=a+"/frontend/index.html";e.sandbox="allow-scripts";e.onload=()=>{console.info("iframe loaded")};document.body.appendChild(e);t(o=>{e.contentWindow.postMessage(o,a)});window.addEventListener("message",o=>{o.origin===a&&(console.log("Got message",o.data),n(o.data))});
//# sourceMappingURL=offlineframe-512c0b04.js.map