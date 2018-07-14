var cdn_now = false;

chrome.storage.sync.get(['cdnsta'], function(result) {
	var now_cdn = result.cdnsta;
	if(now_cdn == undefined  || now_cdn == null || now_cdn == 'off'){
		cdn_now = false;
	}
	else{
		cdn_now = true;
	}
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(sender.tab)
		{
			var dt = {text:String(request.counter),tabId:sender.tab.id};
			chrome.browserAction.setBadgeText(dt);
		}
		else{
			cdn_now = request.cdn;
			console.log(cdn_now);
		}	
});


chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var rcurl = details.url;
		if(rcurl.match(/(nmbimg|tnmbstatic)\.fastmirror\.org(\/Public\/Upload)*\/thumb\//ig)) {
			if(cdn_now){
				rcurl = rcurl.replace("nmbimg.fastmirror.org", encodeURI("a岛.加藤惠.我爱你/adimg/?img="));
				rcurl = rcurl.replace("http:", "https:");
			}

			if(rcurl.match(/(\.gif)$/i)) {
				return {redirectUrl: rcurl.replace("/thumb/","/image/")};
			}
			else{
				return {redirectUrl: rcurl};
			}
		}
	},
	{
		urls: ["*://nmbimg.fastmirror.org/*","*://tnmbstatic.fastmirror.org/*"],
		types:["image"]
	},
	["blocking"]
);
