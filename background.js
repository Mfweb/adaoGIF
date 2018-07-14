chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(sender.tab)
		{
			var dt = {text:String(request.counter),tabId:sender.tab.id};
			chrome.browserAction.setBadgeText(dt);
		}
});


chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var rcurl = details.url;
		if(rcurl.match(/(nmbimg|tnmbstatic)\.fastmirror\.org(\/Public\/Upload)*\/thumb\//ig) && rcurl.match(/(\.gif)$/i)) {
			return {redirectUrl: rcurl.replace("/thumb/","/image/")};
		}
	},
	{
		urls: ["*://nmbimg.fastmirror.org/*","*://tnmbstatic.fastmirror.org/*"],
		types:["image"]
	},
	["blocking"]
);
