(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,a,t){e.exports=t(33)},23:function(e,a,t){},33:function(e,a,t){"use strict";t.r(a);var l=t(1),n=t.n(l),c=t(11),s=t.n(c),i=(t(23),t(3)),r=t(36),o=t(37),m=t(12),d=t.n(m);var u=function(){var e=Object(l.useState)({}),a=Object(i.a)(e,2),t=a[0],c=a[1],s=Object(l.useState)(""),m=Object(i.a)(s,2),u=m[0],E=m[1],p=Object(l.useState)(n.a.createElement("div",{className:"loading-container"},n.a.createElement("div",{className:"loading"}),n.a.createElement("div",{id:"loading-text"},"Waiting..."))),b=Object(i.a)(p,2),h=b[0],v=b[1],N=Object(l.useState)("block"),g=Object(i.a)(N,2),k=g[0],f=g[1],w=Object(l.useState)("hidden"),j=Object(i.a)(w,2),O=j[0],S=j[1],y=Object(l.useState)("hidden"),W=Object(i.a)(y,2),C=W[0],x=W[1],F=Object(l.useState)("hidden"),T=Object(i.a)(F,2),z=T[0],H=T[1],I=Object(l.useState)("block"),M=Object(i.a)(I,2),Y=M[0],B=M[1],R=Object(l.useState)(0),q=Object(i.a)(R,2),A=q[0],D=q[1],J="https://api.openweathermap.org/data/2.5/weather?zip=".concat(u,",us&units=imperial&appid=60e9ee923c45e087f45389019a259b46"),U=n.a.createElement("input",{value:u,onChange:function(e){return E(e.target.value)},placeholder:"Type Zip Code",type:"text"}),_=n.a.createElement(o.a,{className:"button-effects search-button",onClick:function(){return P()}},"Next"),G=n.a.createElement(o.a,{className:"button-effects search-button advice",onClick:function(){return Z()}},"Give Me Advice"),L=n.a.createElement("div",{classname:"emotionSlider"},n.a.createElement("p",null,"Choose How you Feel"),n.a.createElement("p",{className:"emotionRange"},"( 1-Terrible | 3-Neutral | 5-Fantastic )"),n.a.createElement(d.a,{className:"slider",value:A,min:1,max:5,variant:"light",onChange:function(e){return D(e.target.value)}})),P=function(){r.a.get(J).then(function(e){c(e.data),B("hidden"),x("block"),H("hidden")})},Z=function(){var e=t.weather[0].main;f("hidden"),x("hidden"),H("block"),S("block");var a=["Clear"],l=["Fog","Clouds"];["Rain","Snow","Mist","Smoke","Dust","Sand","Ash","Squall","Tornado","Drizzle","Thunderstorm"].includes(e)?v(n.a.createElement("p",null,"Weather looks bad. You should stay inside and rest!")):["Haze"].includes(e)?v(n.a.createElement("p",null,"Weather is questionable. Use your best judgement here!")):a.includes(e)&&5==A?v(n.a.createElement("p",null,"It was mean to be! Bring yo water!")):a.includes(e)&&4==A?v(n.a.createElement("p",null,"Weather looks great! You should be outside skating!")):a.includes(e)&&3==A?v(n.a.createElement("p",null,"Weather looks great! When in doubt, go skate!")):a.includes(e)&&2==A?v(n.a.createElement("p",null,"Weather looks great! You will feel better if you skate!")):a.includes(e)&&1==A?v(n.a.createElement("p",null,"Weather looks good, but maybe get some rest today.")):l.includes(e)&&5==A?v(n.a.createElement("p",null,"It was meant to be! Bring yo water!")):l.includes(e)&&4==A?v(n.a.createElement("p",null,"Weather looks alright. You should be outside skating!")):l.includes(e)&&3==A?v(n.a.createElement("p",null,"When in doubt, go skate!")):l.includes(e)&&2==A?v(n.a.createElement("p",null,"Weather looks alright, but take it easy out there!")):l.includes(e)&&1==A&&v(n.a.createElement("p",null,"Weather looks alright, but you should get some rest today!"))};return n.a.createElement("div",{className:"app"},n.a.createElement("div",{className:k},n.a.createElement("div",{className:"header"},n.a.createElement("p",{className:"header-text"},"Should I Skate Today?"))),n.a.createElement("div",{className:Y},n.a.createElement("div",{className:"location_input"},U,_)),n.a.createElement("div",{className:C},n.a.createElement("div",{className:"emotion"},L),n.a.createElement("div",{classname:"advice"},G)),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:z},n.a.createElement("div",{className:"top"},n.a.createElement("div",{className:"advice"},h),n.a.createElement("div",{className:"location"},n.a.createElement("h2",null,t.name)),n.a.createElement("div",{className:"temp"},t.main?n.a.createElement("h1",null,t.main.temp.toFixed(),"\xb0F"):null),n.a.createElement("div",{className:"description"},t.weather?n.a.createElement("p",{className:"bold"},t.weather[0].description.toUpperCase()):null))),n.a.createElement("div",{className:O},n.a.createElement("div",{className:"bottom"},n.a.createElement("div",{className:"feels"},n.a.createElement("p",{className:"bold"}),t.main?n.a.createElement("p",{className:"bold"},t.main.feels_like.toFixed(),"\xb0F"):null,n.a.createElement("p",null,"Feels Like")),n.a.createElement("div",{className:"humidity"},t.main?n.a.createElement("p",{className:"bold"},t.main.humidity,"%"):null,n.a.createElement("p",null,"Humidity")),n.a.createElement("div",{className:"wind"},t.main?n.a.createElement("p",{className:"bold"},t.wind.speed.toFixed(),"MPH"):null,n.a.createElement("p",null,"Wind Speed"))),n.a.createElement(o.a,{className:"button-effects refresh-button",onClick:function(){window.location.reload()}},"Start Over"))))};t(32);s.a.createRoot(document.getElementById("root")).render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(u,null)))}},[[14,1,2]]]);
//# sourceMappingURL=main.faf00fae.chunk.js.map