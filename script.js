var images = document.getElementsByTagName("img");
//http://.fastmirror.org/Public/Upload/thumb/2018-03-31/5abf11a2bca05.gif"
var te = /(nmbimg|tnmbstatic)\.fastmirror\.org(\/Public\/Upload)*\/thumb\//g;
var ext = /(\.gif)$/;
var counter = 0;
for(let i = 0;i < images.length;i++)
{
	var temp_img_url = images[i].src;
	if(temp_img_url.match(te) && temp_img_url.match(ext))
	{
		counter++;
		/*iimages[i].src = temp_img_url.replace("/thumb/","/image/");
		mages[i].onload = function(){
			if(!this.src.match(te))return;
			var imgurl = this.src;
			this.src = imgurl.replace("/thumb/","/image/");
		};*/
		//console.log(images[i].src);
	}
}

chrome.runtime.sendMessage({counter: counter});
