var cdn_sta = false;
window.onload=function(){
    chrome.storage.sync.get(['cdnsta'], function(result) {
        var now_cdn = result.cdnsta;
        if(now_cdn == undefined  || now_cdn == null || now_cdn == 'off'){
            document.getElementById("cdnstatus").innerHTML="关";
            cdn_sta = false;
        }
        else{
            document.getElementById("cdnstatus").innerHTML="开";
            cdn_sta = true;
        }
        chrome.runtime.sendMessage({cdn: cdn_sta});
      });
    

    document.getElementById("setimgcdn").addEventListener("click", function(e){
        if(cdn_sta == false){
            chrome.storage.sync.set({"cdnsta": "on"}, function() {
                document.getElementById("cdnstatus").innerHTML="开";
              });
              cdn_sta = true;
        }
        else{
            chrome.storage.sync.set({"cdnsta": "off"}, function() {
                document.getElementById("cdnstatus").innerHTML="关";
              });
              cdn_sta = false;
        }
        chrome.runtime.sendMessage({cdn: cdn_sta});
    });
}
