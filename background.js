/*var dt = 'details:{"text":"' + counter + '"}';
chrome.browserAction.setBadgeText(dt);*/

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(sender.tab)
		{
			console.log(request);
			console.log(sender);
			console.log(sendResponse);
			var dt = {text:String(request.counter),tabId:sender.tab.id};
			console.log(dt);
			chrome.browserAction.setBadgeText(dt);
		}
});
