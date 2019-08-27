var defaultSetting = {
    "tv": true,
    "film": true,
    "video": true,
    "live": true
}
var Settingdata = {};
console.log("正在执行");


chrome.storage.sync.get(defaultSetting, function(items) {
    console.log(JSON.stringify(items));
    if (items) {
        Settingdata = items;
        console.log("使用存储的设置");
    } else {
        Settingdata = defaultSetting;
        console.log("使用默认的设置");
    }
    console.log("获取到配置：" + JSON.stringify(Settingdata));
    init();
});

function saveSettingData(e) {
    switch (e) {
        case "tv":
            if (Settingdata.tv)
                Settingdata.tv = false;
            else
                Settingdata.tv = true;
            chrome.storage.sync.set(Settingdata, function() {
                console.log("存储配置：" + JSON.stringify(Settingdata));
            });
            break;
        case "film":
            if (Settingdata.film)
                Settingdata.film = false;
            else
                Settingdata.film = true;
            chrome.storage.sync.set(Settingdata, function() {
                console.log("存储配置：" + JSON.stringify(Settingdata));
            });
            break;
        case "live":
            if (Settingdata.live)
                Settingdata.live = false;
            else
                Settingdata.live = true;
            chrome.storage.sync.set(Settingdata, function() {
                console.log("存储配置：" + JSON.stringify(Settingdata));
            });
            break;
        case "video":
            if (Settingdata.video)
                Settingdata.video = false;
            else
                Settingdata.video = true;
            chrome.storage.sync.set(Settingdata, function() {
                console.log("存储配置：" + JSON.stringify(Settingdata));
            });
            break;
    }
}

function init() {
    var tvCheckbox = document.getElementById("tv");
    tvCheckbox.checked = Settingdata.tv;
    console.log(JSON.stringify(Settingdata));
    console.log("应用设置tv");
    tvCheckbox.onclick = function() {
        saveSettingData("tv");
    }

    var videoCheckbox = document.getElementById("video");
    videoCheckbox.checked = Settingdata.video;
    console.log("应用设置video");
    videoCheckbox.onclick = function() {
        saveSettingData("video");
    }

    var filmCheckbox = document.getElementById("film");
    filmCheckbox.checked = Settingdata.film;
    console.log("应用设置film");
    filmCheckbox.onclick = function() {
        saveSettingData("film");
    }

    var liveCheckbox = document.getElementById("live");
    liveCheckbox.checked = Settingdata.live;
    console.log("应用设置live");
    liveCheckbox.onclick = function() {
        saveSettingData("live");
    }
}