var offlineConfig = {  // 设备离线时的内容
    "bgColor": "#AEAEAE"
    , "panel": {
        "p1": {
            "vUnit": ""
            , "vTitle": ""
            , "vContent": ""
        }
        , "p2": {
            "vUnit": ""
            , "vTitle": ""
            , "vContent": ""
        }
        , "p3": {
            "vUnit": ""
            , "vTitle": ""
            , "vContent": "设备离线"
        }
        , "connection": {
            "vUnit": ""
            , "vTitle": ""
            , "vContent": ""
        }
    }
};

var config = {  // 设备在线时的内容
    "bgColor": "#00C7B2"
    , "panel": {
        "p1": {
            "vUnit": ""   // 单位
            , "vTitle": "当前室温" // 标题根据需求替换
            , "vContent": getP1Content()   // 主体内容
        }
        , "p2": {
            "vUnit": ""
            , "vTitle": ""
            , "vContent": getP2Content()
        }
        , "p3": {
            "vUnit": ""
            , "vTitle": ""
            , "vContent": getP3Content()
        }
        , "connection": {
            "vUnit": ""
            , "vTitle": ""
            , "vContent": "<iconfont face='alink_iconfont'>&#x3011;</iconfont>"
        }
    }
};

function main() {
    if (model.data.onlineState.value == "on") {
        return JSON.stringify(config);
    } else {
        return JSON.stringify(offlineConfig);
    }
}
//按照不同的需求显示主体内容
function getP1Content() {
    var ret = "";
    var value = 0;
    if (model.data.Temperature_Now_Indoor.value) {
        value = model.data.Temperature_Now_Indoor.value;
    } else {
        value = 0;
    }
    ret = value;
    return ret;
}
//开关状态显示
function getP2Content() {
    //var ret = "";
    var value = 0;
    if (model.data.OnOff_Power.value) {
        value = parseInt(model.data.OnOff_Power.value);
    } else {
        value = model.data.OnOff_Power;
    }
    var valueLabels = ["关闭", "开启"];
    return valueLabels[value];
}

//按照不同的需求显示内容
function getP3Content() {
    var ret = "";
    var value = 0;
    if (model.data.WorkMode.value) {
        value = model.data.WorkMode.value;
    } else {
        value =  0;
    }

    var values = ["2","4","6","1","5"];
    var valueLabels = ["制热","制冷","除湿","送风","自动"];

    for (var i = 0; i < 3; ++i) {
        if (value == values[i]) {
            ret = "模式: " + valueLabels[i];
            break;
        }
    }
    return ret;
}