console.log("正在运行！");
var URL = window.location.href;
console.log(URL);

var filmURLReg = /https:\/\/www.bilibili.com\/bangumi\/play\/ss\d+\/{0}/i;
var tvURLReg = /https:\/\/www.bilibili.com\/bangumi\/play\/ep\d+\/{0}/i;
var videoURLReg = /https:\/\/www.bilibili.com\/video\/av\d+\/{0}/i;
var liveURLReg = /https:\/\/live.bilibili.com\/\d+\/{0}/i;
var UIVersion = null;

console.log("读取配置...");
var SettingData = {};
var defaultSetting = {
    "tv": true,
    "film": true,
    "video": true,
    "live": true
}
chrome.storage.sync.get(defaultSetting, function(items) {
    if (items) {
        Settingdata = items;
        console.log("使用存储的设置");
    } else {
        Settingdata = defaultSetting;
        console.log("使用默认的设置");
    }
    console.log("读取完成...");
    console.log(SettingData);
    next();
})

function next() {
    UIVersion = document.getElementsByClassName("old-btn");
    if (UIVersion.length == 0) {
        UIVersion = "Old";
    } else {
        UIVersion = "New";
    }
    if (filmURLReg.test(URL)) {
        console.log("当前为电影、番剧等页，等待获取UI版本");
        if (Settingdata.film)
            closeUIDM();
    } else if (tvURLReg.test(URL)) {
        console.log("当前为电视剧页，等待获取UI版本");
        if (Settingdata.tv)
            closeUIDM();
    } else if (videoURLReg.test(URL)) {
        console.log("当前为普通视频页，等待获取UI版本");
        if (Settingdata.video)
            closeUIDM();
    } else if (liveURLReg.test(URL)) {
        console.log("当前为直播页，等待获取UI版本");
        if (Settingdata.live)
            closeLiveDM();
    }
}

function closeUIDM() {
    switch (UIVersion) {
        case "New":
            console.log("当前为新UI，将为你关闭弹幕");
            var t = setInterval(function() {
                if (document.querySelector("input.bui-checkbox") != null) {
                    document.querySelector("input.bui-checkbox").click();
                    clearInterval(t);
                }
            }, 300);
            break;
        case "Old":
            console.log("当前为旧UI，将为你关闭弹幕");
            var t = setInterval(function() {
                if (document.querySelector(".icon-24danmuon") != null) {
                    document.querySelector(".icon-24danmuon").click();
                    clearInterval(t);
                }
            }, 300);
            break;
    }

}

function closeLiveDM() {
    var t = setInterval(function() {
        var liveDMswitch = document.getElementsByTagName("button");
        for (var i = 0; i < liveDMswitch.length; i++) {
            if (liveDMswitch[i].getAttribute("data-title") == "隐藏弹幕") {
                liveDMswitch[i].click();
                console.log("当前为旧UI，将为你关闭弹幕");
                clearInterval(t);
                break;
            }
        }
    }, 300);
}