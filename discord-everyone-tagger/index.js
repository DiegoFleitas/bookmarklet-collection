javascript:(function(){var messagebox;var usernames=[];var divmembers=document.getElementsByClassName('content-3YMskv')[0];if(divmembers!=null){tagEveryone();}else{alert('This script is broken.');}async function tagEveryone(){loadingBox();divmembers.scrollTop=0;var lastpos=0;var currentpos=0;var scroll=true;while(scroll){getUsernames();divmembers.scrollTop+=500;await sleep(2000);currentpos=divmembers.scrollTop;if(lastpos==currentpos)scroll=false;lastpos=currentpos;}messagebox.innerHTML='Processing...';var message=usernames.join(' ');var outputString=regexSplitter(message);for(var i=0;i<outputString.length;i++){var remember='Copy this. Discord limits messages to 2000 characters\n';alert(remember+outputString[i]);}followUpBox();}function sleep(ms){return new Promise(resolve=>setTimeout(resolve,ms));}function getUsernames(){var x=document.getElementsByClassName('roleColor-rz2vM0');for(var i=0;i<x.length;i++){var tag='@'+x[i].innerHTML;if(!usernames.includes(tag))usernames.push(tag);}}function regexSplitter(str){regex=/[\w\W]{0,1995}.(?= )/;return str.match(regex);}function filterTags(){var usernames=[];var alltags=document.querySelectorAll('.markup');var markup=alltags[alltags.length-2];var y=[];for(var i=0;i<markup.childNodes.length;i++){if(markup.childNodes[i].className=='mention'){y.push(markup.childNodes[i]);}}for(var h=0;h<y.length;h++){var tag=y[h].innerHTML;if(!usernames.includes(tag))usernames.push(tag);}var message=usernames.join(' ');var outputString=regexSplitter(message);for(var j=0;j<outputString.length;j++){alert(outputString[j]);}}function loadingBox(){var y=document.createElement('div');y.setAttribute('id','everyonetagger');y.setAttribute('style','background:white;width:150px;height:120px;position:absolute;top:520px;');y.innerHTML='Getting usernames...';document.body.appendChild(y);y.style.zIndex='99999';messagebox=y;}function followUpBox(){messagebox.innerHTML='Now tagg everyone! If any message fails, send them all anyways and then click failed';var b1=document.createElement('button');b1.setAttribute('onclick','this.parentNode.parentNode.removeChild(this.parentNode)');b1.innerHTML='IT\'S DONE';messagebox.appendChild(b1);var b2=document.createElement('button');b2.setAttribute('onclick','filterTags();');b2.innerHTML='FAILED!';messagebox.appendChild(b2);}})()