var cdn_now = false;

/**
 * 初始化读取CDN设置
 */
chrome.storage.sync.get(['cdnsta'], function(result) {
	var now_cdn = result.cdnsta;
	if(now_cdn == undefined  || now_cdn == null || now_cdn == 'off'){
		cdn_now = false;
	}
	else{
		cdn_now = true;
	}
});

/**
 * 与前台脚本通讯
 * 显示岛上当前页面GIF数量
 * 接收CDN重定向设置
 */
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

/**
 * Chrome发出网络请求之前调用
 * 将GIF图片重定向到原图（岛上有些图虽然是GIF，但是后缀不是GIF，这些图无法被统计和替换）
 * 如果启用则将所有图片重定向到《a岛.加藤惠.我爱你》
 */
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		var rcurl = details.url;
		if(rcurl.match(/(nmbimg|tnmbstatic)\.fastmirror\.org(\/Public\/Upload)*\/(thumb)|(image)\//ig)) {
			/*if(cdn_now){
				rcurl = rcurl.replace("nmbimg.fastmirror.org", "a岛.加藤惠.我爱你/adimg/?img=");
				rcurl = rcurl.replace("http:", "https:");
			}*/
			if(rcurl.match(/(\.gif)$/i)) {
				rcurl = rcurl.replace("/thumb/","/image/");
			}
			console.log(rcurl);
			return {redirectUrl: rcurl};
		}
	},
	{
		//过滤出主岛图片CDN和备胎岛图片CDN
		urls: ["*://nmbimg.fastmirror.org/*","*://tnmbstatic.fastmirror.org/*"],
		types:["image"]
	},
	["blocking"]
);
