(function(root){'use strict';
function shuffle(items){var a=items.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t;}return a;}
function layout(items){if(items.length<2)throw Error("En az iki eşleşme gerekli");var left=shuffle(items),right;do{right=shuffle(items);}while(left.some(function(w,i){return w.id===right[i].id;}));return {left:left,right:right};}
function content(word){return {id:'match-'+word.id,questions:[{id:word.id,type:'multiple',answer:0}]};}
var api={shuffle:shuffle,layout:layout,content:content};if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.LinguMatchEngine=api;
}(this));
