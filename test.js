function imgpicShowSave() {
   var images = document.images;
   for(var i=0;i<images.length;i++) {
       console.log(images[i]);
       images[i].onmouseover = function() {
           showBtn(images[i]);
       };
   }
}

function showBtn(ele) {
    var text = document.createTextNode("my text must be added here.");
    
    ele.parentNode.insertBefore(text, ele.nextSibling);
}