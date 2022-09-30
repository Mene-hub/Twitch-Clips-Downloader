//svg for download button icon
var downloadSVG = "<div class='Layout-sc-nxg1ff-0 gcwIMz InjectLayout-sc-588ddc-0 tw-drop-down-menu-item-figure'><div class='ScIconLayout-sc-1bgeryd-0 cMFgBQ'><div class='ScAspectRatio-sc-1sw3lwy-1 kPofwJ tw-aspect'><div class='ScAspectSpacer-sc-1sw3lwy-0 dsswUS'></div><svg width='100%' height='100%' version='1.1' viewBox='0 0 20 20' x='0px' y='0px' class='ScIconSVG-sc-1bgeryd-1 ifdSJl'><g><path d='M9 10L6.5 7.5 5 9l5 5 5-5-1.5-1.5L11 10V2H9v8zM2 18v-2h16v2H2z'></path></g></svg></div></div></div>";

//menu enaled
var DownloaderEnabled = true;

//true if the menu id already opened
var injectedmenu = false;

//vhecking current settings
checkSettings();

//observer
var Observer = new MutationObserver(observateForDownload).observe(document.body, {

    childList: true,
    subtree: true

});


//observer method
function observateForDownload(){
    var myMenu = null;

    if(document.getElementsByClassName("FTFzP").length > 0){
      if(document.getElementsByClassName("FTFzP").length > 1){
        for( var i = 0; i<document.getElementsByClassName("FTFzP").length; i++){
          if(document.getElementsByClassName("FTFzP")[i].parentElement.getAttribute("class") == "simplebar-content"){
            myMenu = document.getElementsByClassName("FTFzP")[i];
          }
        }
      }else{
        if(document.getElementsByClassName("FTFzP")[0].parentElement.getAttribute("class") == "simplebar-content"){
            myMenu = document.getElementsByClassName("FTFzP")[0];
        }else{
          myMenu == null;
        }
      }

    }

    if(!injectedmenu && myMenu != null ){
      injectedmenu = true;
      checkSettings();
      injectSettings(myMenu);
    }else{
      if(injectedmenu && myMenu == null){
        injectedmenu = false;
      }
    }


    //checking current url
    if(window.location.href.toString().includes("/clip/")){
        if( document.getElementsByClassName("_DownloadClipToggle").length == 0){

            var downloadBT = document.createElement("Button");
                        
            downloadBT.innerHTML = downloadSVG;

            downloadBT.setAttribute("style", "position: absolute; z-index: 1; right: 5px; top: 5px; float: right;")

            downloadBT.className = "_DownloadClipToggle dDxrgX ffyxRu hCKHKu";
            downloadBT.id = "_DownloadCurrentClipButton";

            document.getElementsByClassName("Layout-sc-nxg1ff-0 video-ref")[0].appendChild(downloadBT);

            downloadBT.addEventListener("click", function (){
                var link = document.getElementsByTagName("video")[0].getAttribute("src");
                window.open(link);
            });
        }
    }
  

    //cheking if enabled to add buttons
    if(DownloaderEnabled){
      if(window.location.href.toString().includes("videos") || window.location.href.toString().includes("/clip") && document.getElementsByClassName("ScTransformWrapper-sc-uo2e2v-1 ghrhyx").length > 0){

          for(i = 0; i<document.getElementsByClassName("ScTransformWrapper-sc-uo2e2v-1 ghrhyx").length; i++){

              if(!document.getElementsByClassName("ScTransformWrapper-sc-uo2e2v-1 ghrhyx")[i].innerHTML.includes("LIVE") && !document.getElementsByClassName("ScTransformWrapper-sc-uo2e2v-1 ghrhyx")[i].innerHTML.includes("_DownloadClip") && document.getElementsByClassName("ScTransformWrapper-sc-uo2e2v-1 ghrhyx")[i].getElementsByTagName("img")[0].getAttribute("src").split("-preview").length > 1){
                  
                  var downloadBT = document.createElement("Button");
                  
                  downloadBT.innerHTML = downloadSVG;

                  downloadBT.setAttribute("style", "position: absolute; z-index: 1; right: 5px; top: 5px;")

                  downloadBT.className = "_DownloadClip dDxrgX ffyxRu hCKHKu";
                  downloadBT.setAttribute("idDownloadButton", i);

                  document.getElementsByClassName("ScTransformWrapper-sc-uo2e2v-1 ghrhyx")[i].prepend(downloadBT);

                  downloadBT.addEventListener("click", function (){
                      var tmp = this.getAttribute("idDownloadButton");
                      var link = document.getElementsByClassName("ScTransformWrapper-sc-uo2e2v-1 ghrhyx")[tmp].getElementsByTagName("img")[0].getAttribute("src").split("-preview")[0] + ".mp4";
                      window.open(link);
                  });
              }
          }
      }
    }else{
      var downloadButtons = document.getElementsByClassName("_DownloadClip");
      if(downloadButtons.length>0){
        for(i = 0; i<downloadButtons.length; i++){
          downloadButtons[i].remove();
        }
    }
  }

    
}

//#region inject Menu


//function that inject new settings in profile menu
function injectSettings(myMenu){  

  if(myMenu.childNodes[0].getAttribute("class") != "Layout-sc-nxg1ff-0 gmrDqE"){
    var mySettingsContainer = document.createElement("div");

    checkSettings();

    mySettingsContainer.innerHTML = "<div class='Layout-sc-nxg1ff-0 dwuicp'><div class='Layout-sc-nxg1ff-0 gcwIMz'><div class='Layout-sc-nxg1ff-0 hsTxrV'><div class='Layout-sc-nxg1ff-0 gcwIMz InjectLayout-sc-588ddc-0 tw-drop-down-menu-item-figure'><div class='ScIconLayout-sc-1bgeryd-0 cMFgBQ'><div class='ScAspectRatio-sc-1sw3lwy-1 kPofwJ tw-aspect'><div class='ScAspectSpacer-sc-1sw3lwy-0 dsswUS'></div><svg width='100%' height='100%' version='1.1' viewBox='0 0 20 20' x='0px' y='0px' class='ScIconSVG-sc-1bgeryd-1 ifdSJl'><g><path d='M10 6a4 4 0 014 4h-2a2 2 0 00-2-2V6z'></path><path fill-rule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0a6 6 0 11-12 0 6 6 0 0112 0z' clip-rule='evenodd'></path></g></svg></div></div></div></div><label class='ScDropDownMenuInputItemLabel-sc-p9ci3m-0 jmXxSR InjectLayout-sc-588ddc-0 kikCET tw-drop-down-menu-input-item__label' for='6a306ca0ecfbb87623b03e470dd5c09c'> Downloader Enable</label><div class='ScToggle-sc-796zbf-0 AgPgA tw-toggle' data-a-target='dark-mode-toggle' data-test-selector='user-menu__dark-mode-toggle'><input class='ScToggleInput-sc-796zbf-1 cwUJld tw-toggle__input' id='6a306ca0ecfbb87623b03e470dd5c09d' type='checkbox' data-a-target='tw-toggle'><label id='DownloaderEnabled' for='6a306ca0ecfbb87623b03e470dd5c09d' class='ScToggleButton-sc-796zbf-2 erOoiO tw-toggle__button'></label></div></div></div>";

    myMenu.childNodes[0].appendChild(mySettingsContainer);

    if(DownloaderEnabled)
      document.getElementById("DownloaderEnabled").click(false);

    document.getElementById("DownloaderEnabled").onclick = (function botEnable(save){
      
      if(save!=false){
            DownloaderEnabled = toBoolean(localStorage.getItem("DownloaderEnabled"));
        
        if(DownloaderEnabled == true)
            DownloaderEnabled = false;
        else
            DownloaderEnabled = true;

        localStorage.setItem("DownloaderEnabled", DownloaderEnabled);
      }
    });
  }

}

//check if settings exists
function checkSettings(){

  if(localStorage.getItem("DownloaderEnabled") == null){
    localStorage.setItem("DownloaderEnabled", true);
  }

  DownloaderEnabled = toBoolean(localStorage.getItem("DownloaderEnabled"));

}

//#endregion

//#region convert
function toBoolean(value){
    switch(((value + "").toLowerCase())){
      case "true":
        return true;

        case "false" :
          return false;
  }
}
//#endregion