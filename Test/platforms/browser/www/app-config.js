define(function() {
    //自动模式配置
    var deviceConfig = {};
    deviceConfig.components_key = ['OnOff_Power','OnOff_PTC','Light_Background',
    'WorkMode','Mode_Sleep','Temperature_Now_Indoor','Temperature_Target_Indoor','Temperature_Now_Outdoor','Ventilation_Speed','Ventilation_Direction_UpDown','Ventilation_Direction_LeftRight'];

    deviceConfig.dashboard = {
        attr:[
            {
                key: "OnOff_Power",
                label: "开关",
                type: "xz_master_switch",
                position: ['home', 'device'],
                dtype: 1,
                values: ["1", "0"],
                valueLabels: ["开", "关"]
            },
            {
                key: "Temperature_Target_Indoor",
                label: "设定温度",
                dtype: 1,
                position: ['device'],
                type: "xz_Temperature_Target_Indoor"
            },
            {
                key: "Temperature_Now_Indoor",
                label: "当前室温",
                dtype: 1,
                position: ['home', 'device'],
                type: "xz_Temperature_Now_Indoor"
            },
            {
                key: "WorkMode",
                label: "模式",
                type: "xz_mode",
                dtype: 1,
                position: ['home', 'device'],
                values: ["2", "4", "6", "1", "5"],
                valueLabels: ["制热", "制冷", "除湿", "送风", "自动"]
            },
            {
                key: "Ventilation_Speed",
                label: "风速",
                type: "xz_Ventilation_Speed",
                dtype: 1,
                position: ['device'],
                values: ["0", "2", "3", "5", "7", "1"],
                valueLabels: ["自动", "低速 ", "中速", "高速", "强力", "睡眠"]
            }
        ]
    };
    deviceConfig.components = {
        Mode: [{
            key: 'WorkMode',
            map: ['A', 'B', 'C', 'D', 'E']
        }],
        Switch: ['OnOff_PTC', 'Light_Background'],
        Slider: ['Temperature_Target_Indoor'], //,
        PipsSlider: ['Ventilation_Speed', 'Mode_Sleep', 'Ventilation_Direction_UpDown', 'Ventilation_Direction_LeftRight'],
        Button: ['OnOff_Power']
    };

    //送风模式下
    deviceConfig.AModeConfig = {
        name: "A",
        key: "WorkMode",
        value: "1",
        modeText: "在送风模式下",
        type: "mode",
        sendData: ["Ventilation_Speed","Temperature_Target_Indoor","OnOff_PTC", "Mode_Sleep"],
        state: "off",
        supportSwitches: [
            "Ventilation_Direction_UpDown",      // 上下风向
            "Light_Background"   // 背景灯
        ], //支持的switches
        sendMessage: {
            on: [   // value为on时，要发的消息
                "Switch::OnOff_PTC::disabled",        // 电暖
                "PipsSlider::Mode_Sleep::setValue::4",
                "Slider::Temperature_Target_Indoor::disabled",
                "Slider::Temperature_Target_Indoor::setValue::24",        // 温度条可控制
                "PipsSlider::Ventilation_Speed::enabled",    // 风量可控制
                "PipsSlider::Ventilation_Speed::setValue::2",    // 风量默认设置为较小
                "PipsSlider::Ventilation_Speed::setEnabledPips::0::2::3::5", //风量1,2,3,-1档可用
            ]
        },
        disabled: false
    }

    //制热模式配置
    deviceConfig.BModeConfig = {
        name: "B",
        key: "WorkMode",
        value: "2",
        modeText: "在制热模式下",
        type: "mode",
        sendData: ["Ventilation_Speed","Temperature_Target_Indoor","OnOff_PTC", "Mode_Sleep"],
        state: "off",
        supportSwitches: [
            "Light_Background",  // 背景灯
            "OnOff_PTC"         // 电暖
        ], //支持的switches
        sendMessage:{
            on: [
                "Switch::OnOff_PTC::enabled",        // 电暖
                "PipsSlider::Mode_Sleep::setValue::4",
                "Slider::Temperature_Target_Indoor::enabled",        // 温度条可控制
                "Slider::Temperature_Target_Indoor::setValue::20",
                "PipsSlider::Ventilation_Speed::enabled",
                "PipsSlider::Ventilation_Speed::setValue::2",    // 风量默认设置为较小
                "PipsSlider::Ventilation_Speed::setEnabledPips::0::2::3::5::7"
            ]
        },
        disabled: false
    }

    //制冷模式配置
    deviceConfig.CModeConfig = {
        name: "C",
        key: "WorkMode",
        value: "4",
        modeText: "在制冷模式下",
        type: "mode",
        sendData: ["Ventilation_Speed","Temperature_Target_Indoor","OnOff_PTC", "Mode_Sleep"],
        state: "off",
        supportSwitches: [
            "Light_Background"  // 背景灯
        ], //支持的switches
        sendMessage:{
            on: [
                "Switch::OnOff_PTC::disabled",        // 电暖
                "PipsSlider::Mode_Sleep::setValue::4",
                "Slider::Temperature_Target_Indoor::enabled",        // 温度条可控制
                "Slider::Temperature_Target_Indoor::setValue::26",
                "PipsSlider::Ventilation_Speed::enabled",
                "PipsSlider::Ventilation_Speed::setValue::2",    // 风量默认设置为较小
                "PipsSlider::Ventilation_Speed::setEnabledPips::0::2::3::5::7"
            ]
        },
        disabled: false
    }

    //自动模式配置
    deviceConfig.DModeConfig = {
        name: "D",
        key: "WorkMode",
        value: "5",
        modeText: "在自动模式下",
        type: "mode",
        sendData: ["Ventilation_Speed","Temperature_Target_Indoor","OnOff_PTC", "Mode_Sleep"],
        state: "off",
        supportSwitches: [
            "Light_Background"  // 背景灯
        ], //支持的switches
        sendMessage: {
            on: [
                "Switch::OnOff_PTC::disabled",        // 电暖
                "PipsSlider::Mode_Sleep::setValue::4",
                "Slider::Temperature_Target_Indoor::setValue::24",
                "Slider::Temperature_Target_Indoor::disabled",        // 温度条可控制
                "PipsSlider::Ventilation_Speed::enabled",
                "PipsSlider::Ventilation_Speed::setValue::2",    // 风量默认设置为较小
                "PipsSlider::Ventilation_Speed::setEnabledPips::0::2::3::5"
            ]
        },
        disabled: false
    }

    //除湿模式配置
    deviceConfig.EModeConfig = {
        name: "E",
        key: "WorkMode",
        value: "6",
        modeText: "在除湿模式下",
        type: "mode",
        sendData: ["Ventilation_Speed","Temperature_Target_Indoor","Mode_Sleep","OnOff_PTC"],
        state: "off",
        supportSwitches: [
            "Light_Background"   // 背景灯
        ], //支持的switches
        sendMessage:{
            on: [
                "PipsSlider::Mode_Sleep::setValue::4",
                "Switch::OnOff_PTC::disabled",        // 电暖
                "Slider::Temperature_Target_Indoor::setValue::24",
                "Slider::Temperature_Target_Indoor::disabled",
                "PipsSlider::Ventilation_Speed::enabled",        // 温度条可控制
                "PipsSlider::Ventilation_Speed::setValue::2",
                "PipsSlider::Ventilation_Speed::setEnabledPips::0::2::3::5"
            ]
        },
        disabled: false
    };


    //温度无档滑动条设置
    deviceConfig.Temperature_Target_IndoorSliderConfig = {
        element: ".Temperature_Target_Indoor-slider .slider-item",
        name: "Temperature_Target_Indoor",
        key: "Temperature_Target_Indoor",
        sliderLabel: "设定温度",
        type: "slider",
        sendData: [],
        state: "off",
        min: 16,
        max: 31,
        value: 16,
        step: 1,
        disabled: false,
        unUseWarnText: "" //设置特定的提醒语
    };

    //风量大小有挡滑动条设置
    deviceConfig.Ventilation_SpeedPipsSliderConfig = {
        element: ".Ventilation_Speed-slider .slider-item",
        name: "Ventilation_Speed",
        key: "Ventilation_Speed",
        sliderLabel: "风速",
        type: "pipsSlider",
        sendData: ['Mode_Sleep'],
        state: "off",
        min: 0, //最小挡位的索引
        max: 5, //最大挡位的索引，档位个数-1
        value: 3, //当前挡位的索引
        pipsValue: [0, 2, 3, 5, 7, 1], //传送给远端设备，表示挡位的数据格式
        pipsDesc: ["自动", "低速 ", "中速", "高速", "强力", "睡眠"], //显示给用户看得挡位描述
        unit: "",
        disabled: false,
        unUseWarnText: "", //设置特定的提醒语
        sendMessage:{
            on: [
                "PipsSlider::Mode_Sleep::setValue::4"
            ],
            "~2": [
                "PipsSlider::Mode_Sleep::setValue::4"
            ]
        }
    }
    //上下风角度有挡滑动条设置
    deviceConfig.Ventilation_Direction_UpDownPipsSliderConfig = {
        element: ".Ventilation_Direction_UpDown-slider .slider-item",
        name: "Ventilation_Direction_UpDown",
        key: "Ventilation_Direction_UpDown",
        sliderLabel: "上下摆风",
        type: "pipsSlider",
        sendData: [],
        state: "off",
        min: 0, //最小挡位的索引
        max: 5, //最大挡位的索引，档位个数-1
        value: 0, //当前挡位的索引
        pipsValue: [1, 2, 3, 4, 5, 7], //传送给远端设备，表示挡位的数据格式
        pipsDesc: ["风位1", "风位2", "风位3", "风位4", "风位5", "摇摆"], //显示给用户看得挡位描述
        unit: "",
        disabled: false,
        unUseWarnText: "", //设置特定的提醒语
        mutex: [] //互斥关系
    };
    deviceConfig.Ventilation_Direction_LeftRightPipsSliderConfig = {
        element: ".Ventilation_Direction_LeftRight-slider .slider-item",
        name: "Ventilation_Direction_LeftRight",
        key: "Ventilation_Direction_LeftRight",
        sliderLabel: "左右摆风",
        type: "pipsSlider",
        sendData: [],
        state: "off",
        min: 0, //最小挡位的索引
        max: 5, //最大挡位的索引，档位个数-1
        value: 1, //当前挡位的索引
        pipsValue: [1, 2, 3, 4, 5, 7], //传送给远端设备，表示挡位的数据格式
        pipsDesc: ["风位1", "风位2", "风位3", "风位4", "风位5", "摇摆"], //显示给用户看得挡位描述
        unit: "",
        disabled: false,
        unUseWarnText: "", //设置特定的提醒语
        sendMessage:{}
    };
    //睡眠模式有挡滑动条设置
    deviceConfig.Mode_SleepPipsSliderConfig = {
        element: ".Mode_Sleep-slider .slider-item",
        name: "Mode_Sleep",
        key: "Mode_Sleep",
        sliderLabel: "睡眠模式",
        type: "pipsSlider",
        sendData: ['Ventilation_Speed'],
        min: 0, //最小挡位的索引
        max: 4, //最大挡位的索引，档位个数-1
        value: 0, //当前挡位的索引
        pipsValue: [4, 0, 1, 2, 3], //传送给远端设备，表示挡位的数据格式
        pipsDesc: ["关闭", "普通", "睡眠一", "睡眠二", "睡眠三"], //显示给用户看得挡位描述
        unit: "",
        disabled: false,
        unUseWarnText: "", //设置特定的提醒语
        mutex: [], //互斥关系
        sendMessage:{
            "~4": [
                "PipsSlider::Ventilation_Speed::setValue::1"
            ],
            "4": [
                "PipsSlider::Ventilation_Speed::setValue::2"
            ]

        }
    };

    //电暖功能设置
    deviceConfig.OnOff_PTCSwitchConfig = {
        name: "OnOff_PTC",
        key: "OnOff_PTC",
        type: "switch",
        sendData: [],
        text: "",
        state: "off",
        value: {on: '1', off: '0'},
        onStateText: "已开启",
        offStateText: "已关闭",
        disabled: false,
        unUseWarnText: "电暖功能只能在制热模式下开启" //设置特定的提醒语
    };

    //背景灯功能设置
    deviceConfig.Light_BackgroundSwitchConfig = {
        name: "Light_Background",
        key: "Light_Background",
        type: "switch",
        sendData: [],
        text: "",
        state: "off",
        value: {on: "1", off: "0"},
        onStateText: "已开启",
        offStateText: "已关闭",
        disabled: false,
        unUseWarnText: "" //设置特定的提醒语
    };

    //电源开关 状态按钮设置
    deviceConfig.OnOff_PowerButtonConfig = {
        name: "xz_master_switch",
        key: "OnOff_Power",
        type: "button",
        sendData: [],
        text: "",
        state: "on",
        onStateText: "开机",
        offStateText: "关机",
        value: {on: "1", off: "0"},
        isPower: true,
        disabled: false,
        unUseWarnText: "请先开机", //设置特定的提醒语
    }
    deviceConfig.masterSwitchKey = 'OnOff_Power';
    // 预约
    deviceConfig.ontime_start = {
        name: 'ontime_start',
        key: 'OnOff_Power',
        value: {on : '1', off: "0"}
    }
    return deviceConfig;
});
