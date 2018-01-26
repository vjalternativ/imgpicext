HTMLCollection.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.forEach = Array.prototype.forEach;
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}
function imgpicShowSave() {
    var buttons = document.getElementsByClassName("imgpic_save_btn_container");
    buttons.remove();
    var images = document.images;
    images.forEach(function(element, i){
        showImgPicSaveBtn(element);
    });    
}

function showImgPicSaveBtn(ele) {
    var container = document.createElement("span");
    container.id = "imgpic_save_btn_container";
    container.classList.add("imgpic_save_btn_container");
    var btn = document.createElement("button");        
    btn.id="imgpic_save_btn";
    btn.class = "imgpic_save_btn";
    btn.innerHTML = "Save";
    btn.onclick = function() { showImgpicExtModal(event,ele); };
    container.appendChild(btn);
    ele.parentNode.insertBefore(container, ele.nextSibling);
    if(typeof ele.parentNode.href !="undefined") {
        //ele.parentNode.href="javascript:";
        //ele.parentNode.removeAttribute("jsaction");
    }
    ele.removeAttribute("jsaction");
}

function resizeDcsModal(id) {
    var modalele = document.getElementById(id);
    var windowwidth = window.innerWidth;
    var modalwidth = windowwidth*0.6;
    var left  = (windowwidth / 2) - (modalwidth / 2);
    modalele.style.left = left+"px";
}

function imgpicAddClass(id,className) {
    element = document.getElementById(id);
    element.classList.add(className);
}
function imgpicRemoveClass(id,className) {
    element = document.getElementById(id);
    element.classList.remove(className);
}
function initDcsModal(id) {
    resizeDcsModal(id);
    imgpicRemoveClass(id,"hide");
    
}

var imgpicExtBoards = '';

function  imgpicGenerateFormData(object) {
    object.imgpic_user_name = imgpic_ext_username;
    object.imgpic_password = imgpic_ext_password;
    
    data = new FormData();
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            // do stuff
            data.append( property, object[property] );
        }
    }
    return data;
}


var imgpicExtBoardList ='';
function showImgpicExtModal(e,ele) {
    e.preventDefault();
    src = ele.src;
    var website = document.URL;
    var parentNode = ele.parentNode;
    href = parentNode.href;
    if(typeof href !='undefined') {
        var strArray = href.split("imgurl=");
        src = ele.src;
        if(strArray.length>=1) {
            var str = strArray[1];
            if(typeof str!="undefined") {
                strArray = str.split("&imgrefurl=");
                if(strArray.length >=1) {
                    src = strArray[0];
                    src = unescape(src);
                        str = strArray[1];
                        strArray = str.split("&docid");
                        if(strArray.length>=1) {
                            website = strArray[0];
                            website = unescape(website);
                        }
                }
            }
        }
    }
    document.getElementById("imgpicExtWebsite").value=website;
    document.getElementById("imgpicExtModalImage").src=src;
    var url = imgpicExtBaseUrl+"chrome/getUserBoards";
    var data = imgpicGenerateFormData({imgpic_session_id:imgpic_session_id});
    if(imgpicExtBoardList!="") {
        initDcsModal('imgpicExtSaveModal');
        return;
    }
    imgpicAjaxCall(url,data,function(res){
        var result = JSON.parse(res);
        if(result.status=="fail") {
            imgpicExtReload();
        } else {
            imgpicExtBoardList =result.html;
             document.getElementById("imgpicExtBoards").innerHTML= result.html;   
             initDcsModal('imgpicExtSaveModal');
        }
        
    });
    
}

function imgpicExtReload() {
    var x = confirm("ImgPic Session Expired. Do you want to reload the page?");
            if(x) {
                  window.location.reload();
                  return false;  
            }
}

function imgpicAjaxCall(url,data,callback) {
    //document.cookie = "PHPSESSID="+imgpic_session_id;
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
         callback(this.responseText);
        }
      };
    xmlhttp.open("POST", url);
    xmlhttp.send(data);
}


function imgpicExtSaveBoard(btn,bid) {
        btn.disabled=true;
		var url = imgpicExtBaseUrl+"chrome/saveImageToBoard";
		var data = {};
		data.imgsrc =  document.getElementById("imgpicExtModalImage").src;
		data.website = document.getElementById("imgpicExtWebsite").value;
		data.boardid = bid;
        data.description = document.getElementById("imgpicExtModalDesc").value;
        
        var formdata = imgpicGenerateFormData(data);
        imgpicAjaxCall(url,formdata,function(res){
                var result = JSON.parse(res);
                if(status=='fail') {
                    imgpicExtReload();
                } else {
                    imgpicAddClass("imgpicExtSaveModal","hide");
                    btn.disabled=false;
		        }
        });
        
        
}