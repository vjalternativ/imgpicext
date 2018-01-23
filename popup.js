function getImgPicSession() {
	var username = prompt("Username");
	var password = prompt("password");
	//var url = "http://localhost/imgpic/chrome/login";
    var url = "https://imgpic.org/chrome/login";
    var data = {imgpic_chorme_username:username,imgpic_chrome_password:password};
	$.post(url,data,function(res){
	var result = JSON.parse(res);
	if(result.status=="pass") {
		chrome.storage.sync.set({'imgpic_session_id': result.session_id}, function() {
			// Notify that we saved.
			//console.log(result.session_id);
			//console.log('Settings saved');
		  });
		//$("body").append('<hr/><h1>'+result.session_id+'</h1>');
		//$("body").append('<script src="http://localhost/imgpic/webapp/js/chrome.js" ></script>');
	}
});
}

function imgpicShowSave() {
	console.log("test");
}

function validateImgpicSession(sessionId) {
	//var url = "http://localhost/imgpic/chrome/validateSession";
	var url = "https://imgpic.org/chrome/validateSession";
	$.post(url,{imgpic_session_id:sessionId},function(res){
		console.log(res);
		var result = JSON.parse(res);
		if(result.status=="fail") {
			getImgPicSession();
		}
	});

}
chrome.storage.sync.get('imgpic_session_id', function(items) {
	console.log('Settings retrieved');
	console.log( items.imgpic_session_id);
	if(!items.hasOwnProperty("imgpic_session_id") || items.imgpic_session_id=='') {
		getImgPicSession();
	} else {
		validateImgpicSession(items.imgpic_session_id);
	}

});
//var html = load(chrome.extension.getURL("chrome.html"));
  
   //console.log(html);
	$("body").append('<div id="imgpic_ext_chrome"></div>');
	//$("body").append('<script id="imgpic_ext_chrome_script"></script>');
	$.getScript( chrome.extension.getURL("test.js") );	
	$("#imgpic_ext_chrome").load(chrome.extension.getURL("chrome.html"));	
//chromeStoragetest() ;
//$("body").append('<script src="http://localhost/imgpic/webapp/js/chrome.js" ></script>');

/*
$("body").append('<script src="https://imgpic.org/webapp/js/jquery-3.0.0.min.js" ></script>');
$("body").append('<script src="https://imgpic.org/webapp/js/bootstrap.min.js"></script>');
$("body").append('<script>var base_url ="https://imgpic.org/";</script>');
$("body").append('<script src="https://imgpic.org/webapp/js/feeds.js"></script>');
$("body").a)ppend('<div id="imgpicmodal"></div>');
$("body").append('<script type="text/javascript" >'+
'function showboardmodal(src,e){'+
'e.preventDefault();'+
'$.ajaxSetup({ crossDomain: true,xhrFields: { withCredentials: true}});'+
'$("#imgpicsavebtn").remove();var url = "https://imgpic.org/ip_user/ajaxAddToBoardModal";'+
				'$.post(url,{},function(result){'+
				'$("#imgpicmodal").html(result);webtitle = $(location).attr("href"); pinimage(src,webtitle);'+
				'});}</script>');


$("img").hover(function(e){
						//e.preventDefault();
						var src = this.src;
	$(".imgpicsavebtn").remove();
    $(this).parent().attr("href","javascript:");
	var html = '<span id="imgpicsavebtn" class="imgpicsavebtn" style="position:absolute;z-index:8975309;width:auto;padding:10px;color:#fff;border:1px solid rgb(128,128,128);border-radius:4px;margin:6px;background-color:#0084b4;cursor:pointer;" onclick="showboardmodal(\''+src+'\',event);return false;">Save</span>';
	$(this).before(html);
});


$(".imgpicsavebtn").hover(function(){						
	}, function(){
	$(".imgpicsavebtn").remove();
});


*/