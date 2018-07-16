/**
 * 这个脚本将注入到主岛和备胎岛的页面里
 * 现在只用来统计当前页面GIF图片数量并发送到前台显示
 */

var images = document.getElementsByTagName("img");
var counter = 0;
for(let i = 0;i < images.length;i++)
{
	var temp_img_url = images[i].src;
	if(temp_img_url.match(/(nmbimg|tnmbstatic)\.fastmirror\.org(\/Public\/Upload)*\/thumb\//ig) && 
		temp_img_url.match(/(\.gif)$/ig)) {
		counter++;
	}
}

chrome.runtime.sendMessage({counter: counter});
