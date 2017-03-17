var images = document.getElementsByTagName("img");

var te = /img6\.nimingban\.com\/thumb\//g;
var ext = /(\.gif)$/;
var counter = 0;
for(let i = 0;i < images.length;i++)
{
	var temp_img_url = images[i].src;
	if(temp_img_url.match(te) && temp_img_url.match(ext))
	{
		counter++;
		images[i].src = temp_img_url.replace("/thumb/","/image/");
		images[i].onload = function(){
			if(!this.src.match(te))return;
			var imgurl = this.src;
			this.src = imgurl.replace("/thumb/","/image/");
		};
		console.log(images[i].src);
	}
}

chrome.runtime.sendMessage({counter: counter});
