var imgpicExtBaseUrl = "https://imgpic.org/";
var imgpicExtUsername  = "";
var imgpicExtPassword = "";

function getImgPicSession() {
	var username = prompt("Username");
	var password = prompt("password");
    var url = imgpicExtBaseUrl+"chrome/login";
    var data = {imgpic_chorme_username:username,imgpic_chrome_password:password};
	$.post(url,data,function(res){
	var result = JSON.parse(res);
	if(result.status=="pass") {
		imgpicExtUsername = result.username;
		imgpicExtPassword = result.password;
		chrome.storage.sync.set({'imgpic_session_id': result.session_id,'imgpic_ext_username':result.username,'imgpic_ext_password':result.password}, function() {
			
			initImgPicExt(result.session_id);
			
		  });
	}
});
}


function initImgPicExt(session_id) {
	$("body").append('<script>var imgpicExtBaseUrl="'+imgpicExtBaseUrl+'";</script>');
	$("body").append('<script>var imgpic_session_id="'+session_id+'";</script>');
	$("body").append('<script>var imgpic_ext_username="'+imgpicExtUsername+'";</script>');
	$("body").append('<script>var imgpic_ext_password="'+imgpicExtPassword+'";</script>');
	$("body").append('<div id="imgpic_ext_chrome"></div>');
	//$("body").append('<script id="imgpic_ext_chrome_script"></script>');
	$.getScript( chrome.extension.getURL("test.js") );	
	$("#imgpic_ext_chrome").load(chrome.extension.getURL("chrome.html"));
	
}


function validateImgpicSession(sessionId) {
	var url = imgpicExtBaseUrl+"chrome/validateSession";
	$.post(url,{imgpic_session_id:sessionId},function(res){
		console.log("Validating imgpic sesison");
		console.log(res);
		var result = JSON.parse(res);
		if(result.status=="fail") {
			getImgPicSession();
		} else {
			initImgPicExt(sessionId);
		}
	});

}
chrome.storage.sync.get(['imgpic_session_id','imgpic_ext_username','imgpic_ext_password'], function(items) {

	imgpicExtUsername = items.imgpic_ext_username;
	imgpicExtPassword = items.imgpic_ext_password;


	if(!items.hasOwnProperty("imgpic_session_id") || items.imgpic_session_id=='') {
		getImgPicSession();
	} else {
		validateImgpicSession(items.imgpic_session_id);
	}

});
