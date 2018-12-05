define(["./status/status.js"],function(status) {
    return {
        init:function(){ 
            var self=this;
            self.bindEvent();
            self.getDeviceStatus();
            //页面跳转后触发事件
            var isAndroid = self.androidVersion();
            var webviewChangeMethod;
            webviewChangeMethod = isAndroid == -1 ? 'visibilitychange' : 'webviewvisibilitychange';
            document.addEventListener(webviewChangeMethod, function(){
              self.getDeviceStatus();
            });

        },
        //渲染页面数据
        rendData:function(data){ 
            var self = this;
            self.statusConfig(data);
            self.nowStatus();
            //根据数据渲染组件
            var num1,num2,num3,num4,num5,num6,num7,num8,num9,min,max;
            var pipsValue = [],pipsDesc = [];
            num1 = data.Temperature_Target_Indoor.value;
            num2 = data.WorkMode.value;
            num3 = data.Ventilation_Speed.value;
            num4 = data.Ventilation_Direction_UpDown.value;
            num5 = data.Ventilation_Direction_LeftRight.value;
            num6 = data.OnOff_Power.value;
            num7 = data.Mode_Sleep.value;
            num8 = data.OnOff_PTC.value;
            num9 = data.Light_Background.value;
            //业务逻辑
            if( num7 == 4 ){
                if( num2 == 2 || num2 == 4){
                    min=0;
                    max=4;
                    pipsValue=['0','2','3','5','7'];
                    pipsDesc=['自动','低速','中速','高速','强力'];
                }else{
                    min=0;
                    max=3;
                    pipsValue=['0','2','3','5'];
                    pipsDesc=['自动','低速','中速','高速'];
                }
                
            }else{
                min=0;
                max=5;
                pipsValue=['0','1','2','3','5','7'];
                pipsDesc=['自动','睡眠','低速','中速','高速','强力'];
            }
            self.Ventilation_Speed(min,max,pipsValue,pipsDesc);
            DA.getUI("Temperature_control").setValue(num1);
            DA.getUI("grid2").setValue(num2);
            DA.getUI("Ventilation_volume").setValue(num3);
            DA.getUI("Direction").setValue(num4);
            DA.getUI("Speedb").setValue(num5);
            //DA.getUI("powerbtn").setValue(num6);
            if(num7 == 4){
                DA.getUI("functionRadio").setValue("");
            }else{
                DA.getUI("functionRadio").setValue(num7); 
            }
            
            DA.getUI("functionCheck1").setValue({Index:0,Value:num8});
            DA.getUI("functionCheck1").setValue({Index:1,Value:num9});
            if( num2 == 2){
                DA.getUI("Temperature_control").enabled();
                DA.getUI("functionRadio").enabled();
                DA.getUI('functionCheck1').enabled([0]);
            }else if(num2 == 4){
                DA.getUI("Temperature_control").enabled();
                DA.getUI("functionRadio").enabled()
                DA.getUI('functionCheck1').disabled([0]);
            }else{
                DA.getUI("Temperature_control").disabled();
                DA.getUI("functionRadio").disabled()
                DA.getUI('functionCheck1').disabled([0]);
            };
             var st = $(window).height();
             var head_h = $(".ui-aq-head").height();
             var cpnt_h = $(".all-content").height();
             var h_all =cpnt_h+head_h;
             console.log(st,head_h,cpnt_h)
            if(num6 == 0){
                $(".ui-important-orange-btn").removeClass('hidden');
                $(".ui-important-green-btn").addClass('hidden');
                scrollTo(0,0);
                $('.s-load2').removeClass('hidden');
                $('body').addClass('over_hiden');
                $('html').addClass('over_hiden');
            }else{
                $(".ui-important-orange-btn").addClass('hidden');
                $(".ui-important-green-btn").removeClass('hidden');
                $('.s-load2').addClass('hidden');
                $('body').removeClass('over_hiden');
                $('html').removeClass('over_hiden');
            }
            // $('body').bind('touchstart', function(event) {    
             
            //   console.log(1);
            //  }).bind('touchmove', function(event) {
            //      if(num6 == 0){
            //     event.preventDefault();
            //      }else{
            //         event.returnValue = true;
            //      }
            //      console.log(2);
            //  }).bind('touchend', function(event) {
            //     console.log(3);
            //  });
            // $("body").bind('touchstart', function (event) {
            //     var st = $(window).scrollTop(); 
            //     console.log(st);
            //          if(num6 == 0){
            //             event.preventDefault();
            //          }else{
            //             event.returnValue = true;
            //          }
                    
            //  }, false);
            $('.s-load').addClass('hiden');
        },
        //绑定点击事件
        bindEvent:function(){
            var self =this, doc = $(document);
            doc.on("click",".submit-btn",function(){
                    DA.setDeviceStatus(DA.uuid, {
                         "OnOff_Power": {"value": "1"},
                    });
            })
            doc.on("click",".submit-close",function(){
                DA.setDeviceStatus(DA.uuid, {
                     "OnOff_Power": {"value": "0"},
                });
            });
            doc.on("click",".booking-btn",function(){
                DA.nativeCmp.makeTimer({
                    uuid: DA.uuid,
                    sceneGroup: "OnOff_Power_A",
                    type: ["on", "off"],
                    actions: {
                        on: { // 关闭指令
                            OnOff_Power: {value: "1"}
                        },
                        off: { // 开启指令
                            OnOff_Power: {value: "0"}
                        }
                    }
                    }, function(d){
                        // 可省略
                        // success done;
                    }, function(){
                        // 可省略
                        // failure done;
                });
            });

        },
        //状态配置
        statusConfig:function(data){
            var statusConfig = new DA.statusBar({
                hook: '.statusY',
                attr: [{
                    key: 'Temperature_Now_Indoor',
                    lable: '室内温度',
                    tpl: 'value-lable',
                    unit: '℃'
                    
                }, {
                    key: 'WorkMode',
                    lable: '工作模式',
                    values: [ "1", "2", "4", "5", "6"],
                    valueLables: ["送风", "制热", "制冷", "自动", "除湿"],
                    tpl: 'icon-value',
                    icons: ['&#xe62f;', '&#xe631;', '&#xe630;', '&#xe65d;', '&#xe63c;']
                }]
            },
            data);

        },
        androidVersion: function() {
            var userAgent = navigator.userAgent;
            var index = userAgent.indexOf("Android");
            return index;
        },
        //获取设备信息，处理页面
        getDeviceStatus:function(){ 
            var self=this;
             DA.getDeviceStatus(DA.uuid, function(data){
                    self.rendData(data);
                    if(data.onlineState && data.onlineState.value == "off"){ 
                       DA.getUI('offNet1').showUI();
                    }else{
                       DA.getUI('offNet1').hideUI();
                    }
             });
        },
        //分量滑动条组件渲染
        Ventilation_Speed: function(min,max,pipsValue,pipsDesc){
            if($(".bind_handle_Ventilation_volume .ui-slider-label").length>0){
                // DA.Popup.popCode.open();
                    $(".bind_handle_Ventilation_volume .ui-pipslider-label").remove();
                    $(".bind_handle_Ventilation_volume .ui-slider-cont").remove();
            }
            var self = this;
            var Ventilation_volume = new DA.AlinkUI.PipsSlider('PipsSlider',{
                name:'Ventilation_volume',
                datamodel: {
                    key: 'Ventilation_Speed',
                    value: '0',
                    map: ['0','1','2','3','5','7'],
                },
                sliderLabel: '风量',
                element: '.bind_handle_Ventilation_volume',
                min: min, //最小挡位的索引
                max: max, //最大挡位的索引
                pipsValue: pipsValue,//['0','1','2','3','5','7']对应下发的值
                pipsDesc: pipsDesc,//['自动','睡眠','低速','中速','高速','强力'],
                sendMessage:[],
                changed:function  () {
                    this.setDeviceStatus();
                    return true;
                }
            });
        },
        timeformat:function(time){
        var self=this;
         var timeNum = parseInt(time);
         if(time<10){
                    timeNum='0'+timeNum
            }else{
                timeNum=timeNum;
            }
            return timeNum;
        },
        //获取预约时间
        nowStatus:function(){
            var self = this;
            DA.case_queryCaseSnapshot({
                condition: {
                    deviceId: DA.uuid
                }
            }, function(d) {
                if (d.result.msg === "success") {
                    if(d.result.data.actionParams){
                        var title =  parseInt(d.result.data.actionParams.OnOff_Power.value)  ? '开机：' : '关机：';
                    }else{
                        var title = "";
                    };
                    if(d.result.data.nextTriggerTime){
                        var date = new Date(d.result.data.nextTriggerTime);
                        var newDate =  date.getMonth()+1+"月"+date.getDate()+"日 "+self.timeformat(date.getHours())+":"+self.timeformat(date.getMinutes())+":00"
                        //console.log(date.toLocaleString(),newDate)
                        }else{
                            newDate = "";
                        }
                        var massage = title + newDate;
                        massage == 0 ? $(".ui-item-subtitle").html("") :
                        DA.getUI('alarmClock').updateUI({
                            Index: 0,
                            subtitle: massage
                        });
                } else {
                    // 可省略
                    // failure done;
                }
            });
        }
      

    };
});

