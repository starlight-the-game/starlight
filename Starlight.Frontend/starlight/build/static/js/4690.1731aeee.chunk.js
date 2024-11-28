"use strict";(self.webpackChunkstarlight=self.webpackChunkstarlight||[]).push([[4690,2309],{4690:(A,s,e)=>{e.r(s),e.d(s,{default:()=>p});var a=e(5043),n=e(6213),t=(e(4166),e(3216)),i=e(5475),l=e(4320),r=e(6494),c=e(9883),o=e(653),g=e(1832),d=e(8440),h=e(4797),u=e(9895),m=e(3900),j=e(3204),C=e(579);const N="https://cluster1.swyrin.id.vn";const p=function(){var A,s;const e=(0,t.zy)(),p=(null===(A=e.state)||void 0===A?void 0:A.currentSong)||null,v=(null===(s=e.state)||void 0===s?void 0:s.currentSongIndex)||0,[U,x]=(0,a.useState)(p),[S,B]=(0,a.useState)(v);let E;const[R,I]=(0,a.useState)(!1),[w,y]=(0,a.useState)(!1),[Q,k]=(0,a.useState)([]),[b,K]=(0,a.useState)(""),V=new m.A(Q,{keys:["title"],threshold:.3}),M=b?V.search(b).map((A=>A.item)):Q;(0,a.useEffect)((()=>{x(p),B(v)}),[p,v]),(0,a.useEffect)((()=>{x(p)}),[p]),(0,a.useEffect)((()=>{(async()=>{try{const A=(await n.A.get(`${N}/api/track/all`,{headers:{"Content-Type":"application/json"}})).data;k(A),A.length>0&&B(0)}catch(A){console.error("Error fetching data:",A)}})()}),[]),(0,a.useEffect)((()=>{S>=Q.length&&B(0)}),[S,Q.length]),(0,a.useEffect)((()=>{const A=A=>{27===A.keyCode&&(A.preventDefault(),W())};return window.addEventListener("keydown",A),()=>{window.removeEventListener("keydown",A)}}),[]);const W=()=>{y(!0)};return(0,C.jsxs)("div",{className:"storepage",children:[(0,C.jsxs)("header",{className:"navbar",children:[(0,C.jsxs)("div",{id:"nav-icon1",className:R?"open":"",onClick:()=>{I(!R)},children:[(0,C.jsx)("span",{}),(0,C.jsx)("span",{}),(0,C.jsx)("span",{})]}),(0,C.jsxs)("nav",{className:"nav-links left",children:[(0,C.jsxs)(i.N_,{to:"/songpage",children:[(0,C.jsx)("img",{src:c,alt:"Songs",className:"nav-icon"}),(0,C.jsx)("span",{children:"Songs"})]}),(0,C.jsxs)(i.N_,{to:"/historypage",children:[(0,C.jsx)("img",{src:o,alt:"History",className:"nav-icon"}),(0,C.jsx)("span",{children:"History"})]})]}),(0,C.jsx)("div",{className:"logo-container",children:(0,C.jsx)(i.N_,{to:"/songpage",className:"logo",children:(0,C.jsxs)("span",{className:"star-light",children:[(0,C.jsx)("span",{children:"STAR"}),(0,C.jsx)("img",{src:l,alt:"Logo",className:"logo-icon",style:{verticalAlign:"middle"}}),(0,C.jsx)("span",{className:"light",children:"LIGHT"})]})})}),(0,C.jsxs)("nav",{className:"nav-links right",children:[(0,C.jsxs)(i.N_,{to:"/eventpage",state:{currentSong:U,currentSongIndex:S},children:[(0,C.jsx)("img",{src:g,alt:"Events",className:"nav-icon"}),(0,C.jsx)("span",{children:"Events"})]}),(0,C.jsxs)(i.N_,{to:"/storepage",state:{currentSong:U,currentSongIndex:S},children:[(0,C.jsx)("img",{src:d,alt:"Store",className:"nav-icon"}),(0,C.jsx)("span",{children:"Store"})]})]}),(0,C.jsx)("div",{className:"leave-button",children:(0,C.jsx)("img",{src:r,alt:"Leave",className:"leave-icon",style:{width:"26px",height:"26px"},onClick:W})})]}),(0,C.jsxs)("div",{className:"content-layer",children:[(0,C.jsx)("div",{className:"background-image",children:(0,C.jsx)("img",{src:U&&U.backgroundUrl?`${U.backgroundUrl}`:"",alt:"Background"})}),(0,C.jsx)("div",{className:"overlay-layer",style:{height:"1000px"}}),(0,C.jsx)("div",{className:"coming-soon-text",children:"Coming soon..."})]}),(0,C.jsxs)("div",{className:"sidebar "+(R?"open":""),style:{backgroundImage:`url(${h})`},children:[(0,C.jsx)("div",{className:"search-bar-container",children:(0,C.jsxs)("form",{className:"search-form",onSubmit:A=>{A.preventDefault()},children:[(0,C.jsx)("label",{htmlFor:"search",className:"screen-reader-text",children:"Search"}),(0,C.jsx)("input",{type:"search",id:"search",placeholder:"Search songs...",value:b,onChange:A=>{K(A.target.value)},className:"search-field"}),(0,C.jsx)("button",{type:"submit",className:"search-submit",children:(0,C.jsx)(j.KSO,{className:"search-bar-icon"})})]})}),(0,C.jsx)("ul",{children:M.map(((A,s)=>(0,C.jsxs)("li",{className:"song-item",onClick:()=>x(A),children:[(0,C.jsxs)("div",{className:"song-info-sidebar",children:[(0,C.jsx)("img",{src:u,alt:"Song Sidebar Icon",className:"song-sidebar-icon"}),(0,C.jsx)("span",{className:"sidebar-song",children:A.title})]}),(0,C.jsx)("div",{className:"song-bg",style:{backgroundImage:`url(${N}${A.backgroundFileLocation})`}}),(0,C.jsx)("span",{className:"sidebar-song-title",children:A.title})]},s)))})]}),w&&(0,C.jsx)("div",{className:"popup-overlay",children:(0,C.jsxs)("div",{className:"popup-content",children:[(0,C.jsx)("h2",{children:"Confirm Leave"}),(0,C.jsx)("p",{children:"Are you sure you want to leave the game?"}),(0,C.jsx)("button",{className:"stay-button",onClick:()=>{y(!1)},children:"Stay"}),(0,C.jsx)("button",{className:"leave-button",onClick:()=>{E&&(E.pause(),E=null),window.location.href="/"},children:"Leave"})]})})]})}},9895:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADoSURBVHgB7ZTtDYJAEEQ3VkAH2gmlWAIlUIIlWAolWAIloBWMSzwSzpj7MB63mHnJ8odlstxtnkgmADqtCZ8Ztc5iBR2mQZxJCnKQ33MXS+gJ9oGVmEytBNkCWiITWsLUSpAtKGmJyLrN2W1uYDFLzMMkZI+WLPFI6MnPRkFLuGwEsvNWgnyDHvNJawhcxfyuWfXXtYQ+LojTucDdWKKRdMpaAq+VuAX+atA6Ll+Alvh3UNASiK/b9S27R01LuIFSs9uEXhOWWPrrW8Jlj6Hs9TSgJSwAWoKW8HtBSxAf0BK0hN+LnVniCUo/N/xWt6mbAAAAAElFTkSuQmCC"},4797:(A,s,e)=>{A.exports=e.p+"static/media/sidebar-bg.a7c5ee82e7623af34cc5.png"},6494:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAlCAYAAADIgFBEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAKZSURBVHgB7VjbcZtAFL0g9JrRB6kgpAIrFZhUYKUCOxXYJbiDRBUkriBKBSEVWKlAuILwoRm9pZzDgLOyeSyCAX3kzCAtsMuevffufaxIQWw2m8v1ev15uVzOcB1w/cH1/XA4vJWSMPI6YBJ7u91e7Pf7G7RHeGRndL/r9XpjORFGGoHVanWNJicf5hA4QqvVctvt9i+2sYir3W43SpzYMAL8TTudzsMrMiQA8d/i38WtK6djAul8XCwWDiacafT3u92ui75PFu9A4gKSmKDpSHm4/IGEbKhWp7+DuT0I4b0RreBnRURCQDKhxGnoIDRKI6HegMO9AVZfwepGKkRMJgsJQvDNyEZqR7/f903TnCiPHFMqVE9RQBCBem/KGaFRMlCTF7dhP98MunSpGDoGHIOGDMdoDwaDaeNkVDSiJnr7pOe1k6Fa4NtmuB5fkqqdDFTI7RyAyJAeWkqQ4Yc8KQFGaxD5gKZPz88I8PyugAH7WNU7NphgYQd4aR1jA6ZKsH2vU7o5cRjitkbk/mSJJjggbjNfwSJyx5AIJrzP60dS8/l8rE0GGGHQmGIGkVudAUicxrALSSHApC2M6FzoKX7Gj3Q+zOqU52eiiP2Iph2riM+LSIagnqUMlNThiAjR1NZ+RYQoKpnSiBLxN0nv/qcQKuizWNKwXbuaVLAqiZ0ndrXXqGSiCjWGe3Y248uZwFRjTp2g4b6o16ZGVOTTNTtSEeJwULBAvDPV/EKqQVgLJaw8Cyz+H0IDZnXHXAUhn4M9KQEsLqwSLcv6rTnEi04hgtTzGazsiqWvxgHREfBhBsIntvPOZ/DuBwThPT8TDSDSulGi5EqGbVGy6uFPURSub5CRDaGCS/l3qhVglR6uLyCiq5pE/AW/12fhwIqgVwAAAABJRU5ErkJggg=="},1832:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAAnCAYAAACSamGGAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAALgSURBVHgB7ZhNUtswFMffe7LpMHXcdNdOC01vQE+AOUHpDeAECbtO+TIEuk5PQDhB0xOQnoBwAkxop8sE2pkuiP0qwYSJFZPIIYZmJr9NZH1Ef0tPf8lCMOByfpMhAxDYzzX3dobVI5gApiLHBXYTv19vLjLBCjAX+muhp+VUkfgQUsIRHsWeAQJkDvq6A25YHajM/to/u3mWXMytHyDSChhiGvA6aRagegERwrLzs3xCF/MbxTQCHwo5eoVQQK2VL+VlTGIJ/lOUUNt9+t5SiVgJcx0R6rEsQB+ywKAv+Vyw9HaqkR5vMpZ8yADTvibGJ9uxHOY8PBKtgp/YNzHEfUrGwAI8EiKMFvU8YmoQAdZjudK4lbHDY0Dc5zRkzTRITnhNL4gIqsqf4AGRfr0tp9HrzZO7UX32dOOMckH5O2g2oGyJ3Nzx35frb+ABUAIxweZQRGvq99qCQhSrgsNjmcz3Cr2yKbicW69CRrAcucu5DU/25ullyFHFCT43VPragp4HfnDnzpPllqkOLpggUB4wcuf7a93nW590m7uHwLgMuiUlwFrsmNB69cnMNRBqHbKWerNiZu6e734LSbyTyergP8KFtAtLEBaHVGkTcMk9K3+QMxsbKLyrhTTWgojCbZn0QN/f4SZmeqdkEK0XHwtixj5NKGrLrbGBjLUrokNd3FCRCYJjC0vBEfvPfgw+VyqBNGMf6QcZNWpOc+8LGGAkUvFnfqsYAVf6Cjiq2h3wu6foW3HqHOg4RSAsofZyksBtlt+CIcYiFdKODu5a7XJ7ldMGgYzXtvoEYRm3CeIUbVs8WVAmDVmIHCbUgDYJ23NOt07SNEp9VHPP91fVNw6kRHmfGsG0Am/ajkjP6l8BGCwOgSqO8uERGVlkF3UGFNDxIMKv2j/XCMWOE/gNuCf3FtlF/1wd9bM3iek1y7iYihwXk3WrNojpTa8BU5HjwjKpJG91lyADOmAFJvX+AZBIC/Auj9xPAAAAAElFTkSuQmCC"},653:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAzCAYAAADRlospAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAOJSURBVHgB7ZldVtpAFIDvTADrkdD41gfBuAO6gtIV2K5AXUHpW88RJS3aV3EHuAO6AnUFtSsgoj19JOCDPdXk9g4R+Un4KTMpek6+cyAkmRnvnZn7M1eAmJiYyGgZRUN8IEI4REQ7VyprGb0lPu21UhkigkEEtF59MrVUsjH4zO3crK46VQcUE8kKaEktMOOJdPoDRIDyFWiZlsE99zsNbI68cmgVNlSvgjIFbjcO1u/ub/MIvMAYFB8e2w9Xs/uNWKevGve4nf5Z+QEKkFagnd07olG2aaCAt+HAtulieIDVsL4Mvap+dfgRJJCygU5ud0vMdpjwhJ1ufjm54/wE+isxBDJe7GR3N0ECKQU4aEOCM8ALUqYK6O64XHstnq3alkO/39JqCEWros1QH8byIIHUFiKDNTUyWHhYAaSZTt15heVfh5eh7cm98lTydMDAnaS2lF9ulC5hTqRWgGbX5lqyIAQR90KwP0lWD4u+4tmI8CD6ygjfHQMkSTf2yZuwntchJVg+oa8E40BGLw8JTwbu95VDSSDLkLF29/6MiLbCwEEByiIxIpq932SYtrh2svubwlP5793H2cZwrzUX6lIJzh6FQg+MTrZ0So6eAhevtXN7DXKZL3vvyRNJeZ5BEqAKhEehkDNr8JW/91m135SZoAglKyDyHwjfFuPynqe1hUSwGg1QNO114eMpiG3QXW2kiw2KULaF7nniPQW1MqUWBu39Y90+OBt4vUOrdJxA94gh2Jq2ZEGMj5J0up3bp8MKWmzGvS1SDgaelWkeSscCaQXCjo8z/3EPCvp15RwkkDbiRCqxBfPCsQCSqIsD0A1Qlt48+DypzQ1VKygOWKCIyMoq/4tYgUUTagPdw0cmvSVye5gCHdjzkVTHZiSggC+8HlbXCYXBIsUPUUDLrIgqgQnPhIACNKMm9m/q4LnfJo7AtU0Kre9gQUyMAwzxQr/6WpvUhvz6Ovn1uRRAOkP0TmzjG4HDkDvjIrbSQPbPMKH4FOWZKIDRRGV3Q6t4z8aNiirezdrem9HnC10Bv5LHLia1QXLT2HPnfu40tJUWu4UA6ulmZWruRJex8ShOJRbNs1cgkAcM5uvol0Wm/UvIYP3qdKTtw84bQSPm7IwyNPA7wLh6TyhRtye5AsEssIV0u3IuNIWnhcMBi/r1UKmmy9hUUlTbXiisoMnwmxQQxTOIiYkJ8BfYAB3XyPvLZQAAAABJRU5ErkJggg=="},9883:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAmCAYAAABOFCLqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUBSURBVHgBrVddUttIEO4e2eymsB3nbas2gHyCsCeIbxDvCXBOAHnbKmARGPY15gSBE8ScAHMDboAwVO0j4qfyZzSdbsljRrJlW8Hfi2fGrZlv+n8QcuKmulFVldIaAgWV3sExzBEKcqJQKe8gYJs/Pbp/vf0W5ojcZDRQ/Wlmj5+PXGRu/vjHZa2smjkh1GGOyEXGWXCSZkGsP/y5/QbmhFxkCJQ3sobUgDlhZjK3S9sfEcAdTAOzTgq92+WtdZgDcJqARAzf3hOTmDUFtKERG6yq4RqQPio+gvfi/4NL+EVgHhLm0MrVwfsb13MdHZ7Ck7ZykxJ/c7QOjOxYMg+1vTc67J+nlgPWiFfq7R+ahQGhHR42E3wA/Je9Vi29ryRMp7z4FlA1WKbBh1dj/uS9vN7fLYwjQ9SvjqwxGc4xQZJeEFC5HGDqSvb0a21/5Uf4rYEEDVvLtgyy37Eluplmelj+d40P9yBlBnOLQVk4tfNOtDFCF1Vxo//1y61aKHxO/58FBbo51YHHkSJ2YCRa5Ss1bRKAtFv297syv1/e2iFAL71fJEfU5dPPSOMaDEw8ExkB+0bVCfsf7cMTB7C2yqytxCViv+vwsBppi7DbV+r4le8NTX23vP0pN5khIR1ewMDpLBxVeq338Au4W9r6DJIiBmQKs34oN2LVt9OqD1V4CDkQVXrUDR05c9KfEmQipyyV1lGRP65XeVSFY9aOZ+bc05y/8v87n3R4FM6VxXd897qEM0WaVWNzSoKM9CosvCHH3C1tBpzcTuz/WTs+29kH48ziiGMgt5dWA6WqZ4QzTCNDlj8oHPENs2EnJiwf4IlNIFa/aso+mH10wP8cgaITIlwHyT82GSl0XDGrfJtVs4kmbLCPuBzGCZM9Kme3oEMxkV+6jsNYvmcC7Sz1m3BGVTgp+d7QrKzlNVuucLe8yQvIjplSI3u52FhW+dZ++bp1JsuD0PyQ1NZIYuPSAR1N4VnoLHTscJ6EggJHWskpYjTR3GGsLT6QywUnM5P40hjWJgYX0/N+6v/oEMmyBNrVUfEa3JKow+o9z9pcWlBO9+8W+tSZVqFF1ikWPqU7AIr9J/LNYZ4p9fYin2AbuvwTkVFIndKEp4haKJ5Ks/WjiOLMtUlERBbSrQZEmkgEiUr+Sf5wTM5EO5uuD8ccYsMpOju2TFQaxKHHIBHanNQOi1r7Ml682juBZ0K0YtczjrVm6TK2wr3LzZtOkkqQGXj9WNNIX/LY/+7K2ETWNBR+L67wgRG4yndLV63h3mW/dXa3st21W9eptUlaQ62o3Q+/141Rb+MsPBUUhjVAJx4jjn6jOfqszkxNIxI60qcko2CanxiEGuy61ZDQNhMxIRN8ehBqvJyYP1gDF/bzBPl2RCQburYctxCZ+3CEXhh56Y2VhiahrjIRz0qWnOVbNZW9yeaaRcQvOr+tli/3/pKP5AUAs4JwwwxlP1KiadWxs7YatCWZZBCUJUztFxdbw8QWOsUPMCMqHJUYt61jIW8wk+cyyVAiISVfBbPWGoNyb3+XS0aNNdM2eUbGrG3XfvpkRhMLB6Zi6Tj8hmE5yBEGPswA6YUgVWDTyA5tBR2uoLG9OXHdvt7yHcIOl8yq1nBkeWwX5oSJ0cRJ6TTxnh6FOHbd9qfnYGKeCdH5m5urrB43UE6xMS8igpmeKlGLgdQkApdzTcCh3ZE6lteRp+Eny2o5Mi+Lj9cAAAAASUVORK5CYII="},8440:A=>{A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAMCSURBVHgB7ZhPctowFMbfk2Ey6QAlu3YmUB+hPUHJCUJPkPQEIbvOQIIbyB5OUHKCkhvQG/QGcQh7CLTTaQCrT+C2tiz/Iybuor9FyDzZ4tOHpPcknJbPOChAbnXyd5enkDLMr4EjOx4Xa0VIGRbQVszkcieQMkECgTOspe0iygGakzf0oUOK0KKY0F/j+bDd9TjIAA1IGXKtiKRD/HoegXPGrmE1gtRZTS2PwD3TmCDwDqRPb2/SmWRULQuW6WrWsgb2KARoQSU/an2BLTAt14/Iq54zltV2DPGpXMUqFzlyA7YEB2ZIod7uTeNW/OO7zQgXwTkXESuz/bO3kDD35UYT3buG+du9QIFrF6HnjCXt4vjFB51GfuyMocX/uBcoULBgWtcVSNhFls2eyO7lR+2PrmeCOiAXTdqUBs5YUi4K9xCh5hbj3YNZWEfUiSEFKj9e1l/BI9GyWlMKmbnhxZX8XKjAvElbi+TiPCOJjslq7lG1BC4h6gwWKlDgdZFVH1NEyO4h5wOVexBVoMLFjUuxmU6LTHIPNcu3MEaIyLfy+ZEFvAfJ0ysMW+/9GiM5KJg/PGwlzTk3ZRUZiIi2k/0EHBKFNmVjd/h3U1YRSeC0dH4InFcgOUxGuT43anfDHowkkDbnjjRZA+dNkoQKXJdC7iNA2LxJktBFElQKPQWBAse6oQeVQk9B5FVso8+XP006+cE2oFV9QNXMwBkLrWaosv4KKRK+UdPhHVIkWjXDsYqIqTr5n02JVM2Ic8iq1KdqWtyb0N1hfzn7fioO1rAB9/uNppjb4oqD0yIUR9zC8PJqI4HTUv2Q6re+HBcd0+XOG4jJtNT4TAOtKvqricsiOR6eSZApr0Hocue1nQZjiKOiQyHO7s9QVelxM4n8egVigBhYERWh+Ez3fAP8Q2QWLJ6Dq3Mx5V+/djqJDSAODPoBraac5tavhMHVmUSkQL+TmB/24Uspkvlc+YUKLNxdXEuZRNx8GXS5dAAbULhtvRPvg/3LiIFq1H9uqK6ufwG/ZwjMWmzfSwAAAABJRU5ErkJggg=="},4320:(A,s,e)=>{A.exports=e.p+"static/media/Starlight-logo.7a8c5d569161b85cd841.png"}}]);
//# sourceMappingURL=4690.1731aeee.chunk.js.map