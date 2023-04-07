var I=Object.defineProperty;var E=(o,e,t)=>e in o?I(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t;var r=(o,e,t)=>(E(o,typeof e!="symbol"?e+"":e,t),t);import{L as g,D as S,c as T,E as y}from"./consts-87a546d8.js";import{S as v,R as k,D as f,a as s,b as a,P as l,M as b,T as R,g as w,c as N,w as D}from"./simplePeer-599b44cc.js";window.LIVEKIT_TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2aWRlbyI6eyJyb29tTGlzdCI6dHJ1ZSwicm9vbUpvaW4iOmZhbHNlLCJjYW5QdWJsaXNoIjpmYWxzZSwiY2FuU3Vic2NyaWJlIjpmYWxzZSwiY2FuUHVibGlzaERhdGEiOmZhbHNlfSwiaWF0IjoxNjc4NzI4ODY1LCJuYmYiOjE2Nzg3Mjg4NjUsImV4cCI6MTExMzk1Mjg4NjUsImlzcyI6IkFQSWtvRTdtM1pxZDVkSiIsInN1YiI6Imx0IiwianRpIjoibHQifQ.6mVaD452mZMSgXKWG7QDkxR__2v76urjJnJ66TjJGjs";let d=null;const p=()=>(d=new v(C,o=>console.log("SIMPLEPEER new conn state:",o),o=>{_(o)}),d.start({initiator:!0,trickle:!1}),d),U=o=>{d&&d.handleSignalingMsg(o)};function C(o){let e=new Uint8Array(o);!e||e.length===0||(console.log("GOT DC DATA:",e),U(e))}async function L(o){return await fetch(o+"/twirp/livekit.RoomService/ListRooms",{method:"POST",cache:"no-cache",mode:"cors",body:JSON.stringify({}),headers:{"Content-Type":"application/json",Authorization:"Bearer "+window.LIVEKIT_TOKEN}}).then(e=>e.json()).then(e=>{const t=e.rooms;if(!t||!Array.isArray(t))throw new Error(`Error getting livekit room list from ${o} - ${JSON.stringify(e)}`);return t.filter(c=>c.num_participants>0)}).catch(e=>(console.warn(`Error getting livekit room list from  - ${o}`,e),[]))}class M{constructor(e,t,c){r(this,"roomId");r(this,"hostUrl");r(this,"accessToken");r(this,"roomConn");r(this,"videoElem");r(this,"onMesssageRecived");r(this,"onConnStateChange");this.hostUrl=e,this.onMesssageRecived=n=>t(n,this.roomId,this.hostUrl),this.onConnStateChange=n=>c(n,this.roomId,this.hostUrl),this.roomConn=new k({reconnectPolicy:new f,adaptiveStream:!0})}async start(e,t){console.log(`Starting conn with ${e} via ${this.hostUrl} token = ${t}`);const c=Date.now();return this.roomId=e,this.roomConn.on(s.SignalConnected,async()=>{const n=Date.now()-c;a(`signal connection established in ${n}ms`)}).on(s.Connected,async()=>{a(`Connected to room: ${this.roomConn.name} via ${this.hostUrl}`)}).on(s.Disconnected,n=>{this.roomConn&&(a("disconnected from room",{reason:n},this.roomConn.localParticipant),this.roomConn.participants.forEach(i=>{}))}).on(s.Reconnecting,()=>{a("Reconnecting to room")}).on(s.Reconnected,async()=>{a("Successfully reconnected. server",await this.roomConn.engine.getConnectedServerAddress())}).on(s.ParticipantConnected,async n=>{a("participant",n.identity,"connected",n.metadata),n.on(l.TrackMuted,i=>{a("track was muted",i.trackSid,n.identity)}).on(l.TrackUnmuted,i=>{a("track was unmuted",i.trackSid,n.identity)}).on(l.IsSpeakingChanged,()=>{a("ParticipantEvent.IsSpeakingChanged",n.isSpeaking)}).on(l.ConnectionQualityChanged,()=>{a("ParticipantEvent.ConnectionQualityChanged",n.connectionQuality)})}).on(s.ParticipantDisconnected,n=>{a("participant",n.sid,"disconnected")}).on(s.MediaDevicesError,n=>{const i=b.getFailure(n);a("media device failure",i)}).on(s.ConnectionQualityChanged,(n,i)=>{a("connection quality changed",i==null?void 0:i.identity,n)}).on(s.TrackSubscribed,(n,i,h)=>{n.kind===R.Kind.Video&&(this.videoElem=n.attach(document.getElementById("cloud_video")),this.videoElem.setAttribute("host",this.hostUrl),document.getElementById("video_container")),console.log(n,this.hostUrl)}).on(s.TrackUnsubscribed,(n,i,h)=>{n.detach()}).on(s.DataReceived,async(n,i)=>{const h=i?i.identity:"SERVER";a(`Got dataReceived from ${h} via ${this.hostUrl}|${this.roomId}`,S(n)),this.onMesssageRecived(n,this.roomId,this.hostUrl)}).on(s.LocalTrackUnpublished,(n,i)=>{console.error("handleLocalTrackUnpublished: _THIS SHOULD NEVER BE HAPPENING_",n,i)}).on(s.RoomMetadataChanged,n=>{a("new metadata for room",n)}).on(s.MediaDevicesChanged,()=>{a("MediaDevicesChanged _THIS SHOULDN'T HAPPEN?_")}).on(s.AudioPlaybackStatusChanged,()=>{a("AudioPlaybackStatusChanged _THIS SHOULDN'T HAPPEN?_",this.roomConn.canPlaybackAudio)}),await this.roomConn.connect(w(this.hostUrl),t,T),console.info("connected to room",this.roomConn.name,this.roomConn),!0}sendMessage(e,t,c=!1){console.log("sendMessage() to rov ",e),this.roomConn.localParticipant.publishData(e,N.RELIABLE)}close(){console.info("Closing Livekit Connection: ",this.roomId,this.hostUrl),this.roomConn&&this.roomConn.disconnect(!0)}}const u=new M(g,(o,e,t)=>{C(o)},(o,e,t)=>{console.log("Cloud Conn State Changed: "+o,e,t)});async function O(o,e){await u.start(o,e)}async function P(){u.sendMessage(y("HI FROM FRONTEND SHOULD BE CLOUD"))}function _(o){u.sendMessage(o)}new URLSearchParams(location.search);const m=document.getElementById("rov_chooser");document.getElementById("video_container");async function H(){console.log("Starting...");const o=document.createElement("button");for(o.innerText="Send test msg",o.disabled=!0,o.onclick=()=>{P()},document.body.appendChild(o);;){const t=await L(g);t.length>0?(m.innerHTML="",t.forEach(c=>{if(!c.metadata)return;const n=document.createElement("button"),{accessToken:i}=JSON.parse(c.metadata);n.innerText="Connect to "+c.name,n.onclick=()=>{O(c.name,i).then(()=>{o.disabled=!1,n.innerText="Connect locally to "+c.name,n.onclick=()=>{p()}})},m.appendChild(n)})):m.innerHTML="Searching...",await D(1e3);break}}H();
//# sourceMappingURL=frontend-71a3b797.js.map