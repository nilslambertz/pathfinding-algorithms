(this.webpackJsonpmazevisualizer=this.webpackJsonpmazevisualizer||[]).push([[0],[,,,,,,,function(e,t,a){},,function(e,t,a){e.exports=a(19)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),r=a(8),s=a.n(r),o=(a(14),a(1)),l=a(2),h=a(4),c=a(3),m=(a(15),a(16),function(e){Object(h.a)(a,e);var t=Object(c.a)(a);function a(){return Object(o.a)(this,a),t.apply(this,arguments)}return Object(l.a)(a,[{key:"render",value:function(){var e="";return!0===this.props.solved&&(e="solved"),i.a.createElement("div",{id:"mainDiv",className:e},i.a.createElement("div",{id:"mazeGrid"},this.printMaze()),i.a.createElement("div",{id:"footer"},"by ",i.a.createElement("a",{href:"http://www.nilslambertz.de",target:"_blank",rel:"noopener noreferrer"},"nils lambertz")))}},{key:"printMaze",value:function(){return this.props.maze.map((function(e,t,a){return e.map((function(e,a,n){return 0===e?i.a.createElement("div",{className:"mazeElem empty",key:t+a}):1===e?i.a.createElement("div",{className:"mazeElem wall",key:t+a}):2===e?i.a.createElement("div",{className:"mazeElem start",key:t+a}):3===e?i.a.createElement("div",{className:"mazeElem end",key:t+a}):4===e?i.a.createElement("div",{className:"mazeElem searched",key:t+a}):5===e?i.a.createElement("div",{className:"mazeElem correctPath",key:t+a}):i.a.createElement("div",{className:"mazeElem",key:t+a})}))}))}}]),a}(i.a.Component));a(7);var u=function(e){var t=e.title,a=e.algoNumber,n=e.setAlgorithm,r=e.currentAlgorithm,s=e.animationRunning,o="navElem";return parseInt(a)===parseInt(r)&&(o+=" active"),s&&(o+=" disabled"),i.a.createElement("div",{className:o,onClick:function(){s||n(a)}},i.a.createElement("span",null,t))};var d=function(e){var t=e.algorithm,a=e.setAlgorithm,n=e.animationRunning;return i.a.createElement("div",{id:"navbar"},i.a.createElement(u,{title:"Recursive",algoNumber:"0",setAlgorithm:a,currentAlgorithm:t,animationRunning:n}))};a(17);var g,f,v,p,z,E=function(e){e.size;var t=e.solved,a=e.animationRunning,n=e.animationSpeed,r=e.newMazeClick,s=e.animationClick,o=e.changeSpeed;return i.a.createElement("div",{id:"settingsBar"},i.a.createElement("div",{id:"settingsDiv"},i.a.createElement("table",null,i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"settingsButton"+(t?" noClickSetting":""),rowSpan:"2",style:a?{color:"orange"}:{color:"lightgreen"},onClick:s},a?"stop":"start")))),i.a.createElement("table",{className:a?"disabledSetting":""},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",{className:"settingsButton",rowSpan:"2",style:{color:"lightblue"},onClick:r},"new maze")))),i.a.createElement("table",{className:a?"disabledSetting":""},i.a.createElement("tbody",null,i.a.createElement("tr",null,i.a.createElement("td",null,i.a.createElement("input",{type:"range",min:"10",max:"500",value:n,onChange:o}))),i.a.createElement("tr",null,i.a.createElement("td",null,"animation speed"))))))},S=a(5);function M(e,t,a){f=e,g=[],z=a,v=[],p=[];for(var n=0;n<e.length;n++){v[n]=[],p[n]=[];for(var i=0;i<e[n].length;i++)v[n][i]=!1,p[n][i]=!1}return function e(t,a,n){return t===z[0]&&a===z[1]||!0!==v[t][a]&&(void 0===g[n]&&(g[n]=[]),v[t][a]=!0,g[n].push({x:t,y:a}),(0!==t&&1!==f[t-1][a]&&!0===e(t-1,a,n+1)||t!==f.length-1&&1!==f[t+1][a]&&!0===e(t+1,a,n+1)||0!==a&&1!==f[t][a-1]&&!0===e(t,a-1,n+1)||a!==f[0].length-1&&1!==f[t][a+1]&&!0===e(t,a+1,n+1))&&(p[t][a]=!0,!0))}(t[0],t[1],0),g.splice(0,1),{steps:g,path:p}}var y=function(){function e(t){var a=this;Object(o.a)(this,e),this.recursiveStep=function(){var e,t=a.steps.shift(),n=Object(S.a)(t);try{for(n.s();!(e=n.n()).done;){var i=e.value;a.maze[i.x][i.y]=4}}catch(r){n.e(r)}finally{n.f()}a.setState({maze:a.maze})},this.setState=t,this.algorithm=0,this.speed=5,this.steps=[]}return Object(l.a)(e,[{key:"changeAlgorithm",value:function(e){this.algorithm=e,this.steps=[]}},{key:"changeMaze",value:function(e,t,a,n){this.animateMaze(t,a,n),this.maze=e,this.steps=[],this.start=a,this.end=n}},{key:"animateMaze",value:function(e,t,a){var n=this,i=setInterval((function(){if(0===e.length)return clearInterval(i),setTimeout((function(){n.maze[t[0]][t[1]]=2,n.maze[a[0]][a[1]]=3,n.setState({maze:n.maze})}),200),void n.setState({generationRunning:!1});var r,s=e.splice(0,1e3),o=Object(S.a)(s);try{for(o.s();!(r=o.n()).done;){var l=r.value;n.maze[l[0]][l[1]]=0}}catch(h){o.e(h)}finally{o.f()}n.setState({maze:n.maze})}),400)}},{key:"changeSpeed",value:function(e){this.speed=505-e}},{key:"startAnimation",value:function(){switch(this.algorithm){case 0:if(0===this.steps.length){var e=M(this.maze.slice(0),this.start,this.end);this.steps=e.steps,this.path=e.path}return this.animate(this.recursiveStep),!0;default:return alert("error"),!1}}},{key:"endAnimation",value:function(e){if(clearInterval(this.interval),this.setState({animationRunning:!1}),e){for(var t=0;t<this.maze.length;t++)for(var a=0;a<this.maze[t].length;a++)!0===this.path[t][a]&&(this.maze[t][a]=5);this.maze[this.start[0]][this.start[1]]=2,this.maze[this.end[0]][this.end[1]]=3,this.setState({maze:this.maze})}}},{key:"animate",value:function(e){var t=this;this.interval=setInterval((function(){0!==t.steps.length?e():t.endAnimation(!0)}),this.speed)}}]),e}(),k=function(e,t){for(var a=[],n=0;n<e;n++){a[n]=[];for(var i=0;i<t;i++)a[n][i]=1}var r=[];!function(e,t){var a=new Set,n=Math.floor(Math.random()*e.length);n%2===1&&n--;var i=Math.floor(Math.random()*e[0].length);i%2===1&&i--;R(n,i,a,e),e[n][i]=0,t.push([n,i]);for(;a.size>0;){var r=A(a),s=parseInt(r.substring(0,r.indexOf(","))),o=parseInt(r.substring(r.indexOf(",")+1)),l=w(s,o,e),h=l.splice(Math.floor(Math.random()*l.length),1)[0];b(s,o,h[0],h[1],e,t),e[s][o]=0,t.push([s,o]),a.delete(r),R(s,o,a,e)}}(a,r);for(var s=Math.floor(Math.random()*a.length),o=Math.floor(Math.random()*a[0].length);0!==a[s][o];)s=Math.floor(Math.random()*a.length),o=Math.floor(Math.random()*a[0].length);a[s][o]=2;for(var l=Math.floor(Math.random()*a.length),h=Math.floor(Math.random()*a[0].length);0!==a[l][h]||s===l&&o===h;)l=Math.floor(Math.random()*a.length),h=Math.floor(Math.random()*a[0].length);return a[l][h]=3,{steps:r,maze:a,start:[s,o],end:[l,h]}};function b(e,t,a,n,i,r){e===a?t<n?(i[e][t+1]=0,r.push([e,t+1])):(i[e][t-1]=0,r.push([e,t-1])):e<a?(i[e+1][t]=0,r.push([e+1,t])):(i[e-1][t]=0,r.push([e-1,t]))}function w(e,t,a){var n=[];return e-2>=0&&0===a[e-2][t]&&n.push([e-2,t]),e+2<a.length&&0===a[e+2][t]&&n.push([e+2,t]),t-2>=0&&0===a[e][t-2]&&n.push([e,t-2]),t+2<a[0].length&&0===a[e][t+2]&&n.push([e,t+2]),n}function R(e,t,a,n){e-2>=0&&0!==n[e-2][t]&&a.add(e-2+","+t),e+2<n.length&&0!==n[e+2][t]&&a.add(e+2+","+t),t-2>=0&&0!==n[e][t-2]&&a.add(e+","+(t-2)),t+2<n[0].length&&0!==n[e][t+2]&&a.add(e+","+(t+2))}function A(e){var t=Array.from(e);return t[Math.floor(Math.random()*t.length)]}a(18);var N,C=function(e){Object(h.a)(a,e);var t=Object(c.a)(a);function a(){var e;Object(o.a)(this,a);for(var n=arguments.length,i=new Array(n),r=0;r<n;r++)i[r]=arguments[r];return(e=t.call.apply(t,[this].concat(i))).state={algorithm:0,animationRunning:!1,generationRunning:!1,solved:!1,maze:[],start:[],end:[],width:151,height:75,animationSpeed:500},e.setAlgorithm=function(t){t=parseInt(t),e.setState({algorithm:t},(function(){N.changeAlgorithm(t)}))},e.setStart=function(t){e.setState({start:t})},e.setEnd=function(t){e.setState({end:t})},e.changeSpeed=function(t){if(!e.state.animationRunning){var a=parseFloat(t.target.value);e.setState({animationSpeed:a}),N.changeSpeed(a)}},e.createMaze=function(){for(var t=k(e.state.height,e.state.width),a=[],n=0;n<e.state.height;n++){a[n]=[];for(var i=0;i<e.state.width;i++)a[n][i]=1}e.setState({maze:a,start:t.start,end:t.end,generationRunning:!0},(function(){N.changeMaze(a.slice(0),t.steps,t.start,t.end)}))},e.changeState=function(t){e.setState(t)},e.animationClick=function(){e.state.generationRunning||(e.state.animationRunning?(N.endAnimation(),e.setState({animationRunning:!1})):!1===e.state.solved&&e.setState({animationRunning:!0},(function(){N.startAnimation()||e.setState({animationRunning:!1})})))},e.newMazeClick=function(){e.state.animationRunning||e.state.generationRunning||e.createMaze()},e}return Object(l.a)(a,[{key:"componentDidMount",value:function(){N=new y(this.changeState),this.createMaze()}},{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement(d,{algorithm:this.state.algorithm,animationRunning:this.state.animationRunning,setAlgorithm:this.setAlgorithm}),i.a.createElement(E,{size:this.state.width-1,solved:this.state.solved,animationRunning:this.state.animationRunning,animationSpeed:this.state.animationSpeed,changeSize:this.changeSize,newMazeClick:this.newMazeClick,animationClick:this.animationClick,changeSpeed:this.changeSpeed}),i.a.createElement(m,{maze:this.state.maze,algorithm:this.state.algorithm}))}}]),a}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(C,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[9,1,2]]]);
//# sourceMappingURL=main.d69dca7d.chunk.js.map