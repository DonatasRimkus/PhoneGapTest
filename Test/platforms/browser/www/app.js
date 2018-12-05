require(["./status/status.js","./main.js"],function(status,main){
	main.init(); 
	var titleName;
	//数字调节器
	var Temperature_Remote = new DA.AlinkUI.NumAdjustment('Temperature_control', {
		    datamodel: {
		        text: '设定温度',
		        key: 'Temperature_Target_Indoor',
		        value: "26",
		        unit:"℃"
		    },
		    max:31,
		    min:16,
		    interval:1,
		    domhook: $('.ui-AL-tem'),
		    clickUp:function(){
		    	this.setDeviceStatus();
		   //自定义下发
		   //  	var num = DA.getUI("Temperature_control").getValue()
		   //  	DA.setDeviceStatus(DA.uuid, {
	       //       	"OnOff_Power": {
		   //     "value": num
		   //    }
	       //  });
		    },
		    clickDown:function(){
		    	this.setDeviceStatus();
		    }
		});
	//模式组件
	var grid = new DA.AlinkUI.Grid('grid2',{
	    domhook : $('.bind_handle_grid2'),
	    datamodel:{
	        key:'WorkMode',
	        gridNum:'3',//列数
	        value:'2',
	        uiTitle:'模式',
	        map:[
	            {
	                icon:'&#xe65d;',
	                txt:'自动',
	                value:'5',
	                dropDown:'.bind_handle_button'
	            },
	            {
	                icon:'&#xe630;',
	                txt:'制冷',
	                value:'4',
	                dropDown:'ui-grid-dropdown'
	            },
	            {
	                icon:'&#xe631;',
	                txt:'制热',
	                value:'2',
	                dropDown:'.bind_handle_button'
	            },
	            {
	                icon:'&#xe63c;',
	                txt:'除湿',
	                value:'6',
	                dropDown:'ui-grid-dropdown'
	            },
	            {
	                icon:'&#xe62f;',
	                txt:'送风',
	                value:'1',
	                dropDown:'ui-grid-dropdown'
	            }

	        ]
	    },
	    //tpl:'<div class="af"></div>',/可自定义模板，如果不写tpl，就默认模板
	    onItemClick:function(item, index, e){
	        console.log(item);
	        return true;
	    },
	    changed:function(){
	        //this.setDeviceStatus();默认下发
	        //自定义下发
	        var a;
          	var num = DA.getUI("grid2").getValue()
            //根据num下发不同的参数
            switch (num){
            	case "1":
            		a = 24;
           			break;
           		case "2":
           			a = 20;
           			break;
           		case "4":
           			a = 26;
           			break;
           		case "5":
           			a = 24;
           			break;
           		case "6":
           			a = 24;
           			break;
            }
	    	DA.setDeviceStatus(DA.uuid, {
	             "WorkMode": {"value": num.toString()},
	             "Temperature_Target_Indoor": {"value": a.toString()},
	             "Ventilation_Speed": {"value": "2"}
	        });
	    }
	});

	//左右摆风滑动条组件渲染
	var Direction = new DA.AlinkUI.PipsSlider('PipsSlider',{
	    name:'Direction',
	    datamodel: {
	        key: 'Ventilation_Direction_UpDown',
	        value: '0',
	        map: ['1','2','3','4','5',"7"],
	    },
	    sliderLabel: '上下摆风',
	    element: '.bind_handle_Direction_UDown',
	    min: 0, //最小挡位的索引
	    max: 5, //最大挡位的索引
	    pipsValue: ['1','2','3','4','5',"7"],//对应下发的值
	    pipsDesc: ['角度1','角度2','角度3','角度4','角度5','摇摆'],
	    changed:function  () {
	        this.setDeviceStatus();
	        return true;
	    }
	});
	//上下摆风滑动条组件渲染
	var Speedb = new DA.AlinkUI.PipsSlider('PipsSlider3',{
	    name:'Speedb',
	    datamodel: {
	        key: 'Ventilation_Direction_LeftRight',
	        value: '0',
	        map: ['1','2','3','4','5',"7"],
	    },
	    sliderLabel: '左右摆风',
	    element: '.bind_handle_Ventilation_Speed',
	    min: 0, //最小挡位的索引
	    max: 5, //最大挡位的索引
	    pipsValue: ['1','2','3','4','5',"7"],//对应下发的值
	    pipsDesc: ['角度1','角度2','角度3','角度4','角度5','摇摆'],
	    changed:function  () {
	        this.setDeviceStatus();
	        // var curModeValue = this.getValue();
	        // if(DA.getUI('power').getValue() == "0"){
	        //     DA.setDeviceStatus(DA.uuid, {
	        //         "OnOff_Power":{
	        //             "value": "1"
	        //         },
	        //         "Ventilation_Speed": {
	        //             "value": curModeValue
	        //         }
	        //     });
	        // } else {
	        //     DA.setDeviceStatus(DA.uuid, {
	        //         "Ventilation_Speed": {
	        //             "value": curModeValue
	        //         }
	        //     })
	        // }
	        return true;
	    }
	});
	//开关组件渲染
	// var powerBtn = new DA.AlinkUI.SwitchButton('powerbtn', {
	//     domhook : $('.bind_handle_switch_btn'),
	//     datamodel: {
	//         key: 'OnOff_Power',
	//         value: "1",
	//         map: {on: "1", off: "0"},
	//     },
	//     //tpl:'switchItem',  //tpl:switchItem表示带label，tpl:switch表示不带label，只有一个开关
	//     onClickBefore: function(){
	//         return true;
	//     },
	//     onClickAfter: function(){
	//         console.log('onClickAfter');
	//         return true;
	//     },
	//     changed: function(){
	//         this.setDeviceStatus();
	//     }
	// });
	//文字模式单选择组件渲染
	var check = new DA.AlinkUI.FunctionRadio('functionRadio',{
	    //clickTocancel:true,
	    domhook : $('.bind_functionRadio_text'),
	    datamodel:{
	        key:'Mode_Sleep',
	        checkNum:'4',//列数
	        value:'',//初始值
	        unCheckedValue:'',
	        uiTitle:"睡眠模式",
	        map:[
	            {
	            	innerText:"普通",
	                //img:"http://gtms03.alicdn.com/tps/i3/TB1iq2GJFXXXXXEXpXXgBrbGpXX-36-36.png",//icon可省略
	                //activeImg:"http://gtms01.alicdn.com/tps/i1/TB1bIHMJFXXXXaAXXXXgBrbGpXX-36-36.png",
	                //txt:'普通',
	                checkedValue:'0',

	            },
	            {
	            	innerText:"成人",
	               // img:"http://gtms03.alicdn.com/tps/i3/TB1iq2GJFXXXXXEXpXXgBrbGpXX-36-36.png",//icon可省略
	                //activeImg:"http://gtms01.alicdn.com/tps/i1/TB1bIHMJFXXXXaAXXXXgBrbGpXX-36-36.png",
	               // txt:'成人',
	                checkedValue:'1',

	            },
	            {
	            	innerText:"宝宝",
	                //img:"http://gtms03.alicdn.com/tps/i3/TB1iq2GJFXXXXXEXpXXgBrbGpXX-36-36.png",//icon可省略
	                //activeImg:"http://gtms01.alicdn.com/tps/i1/TB1bIHMJFXXXXaAXXXXgBrbGpXX-36-36.png",
	                //txt:'宝宝',
	                checkedValue:'2',

	            },
	            {
	            	innerText:"老年",
	                //img:"http://gtms03.alicdn.com/tps/i3/TB1iq2GJFXXXXXEXpXXgBrbGpXX-36-36.png",//icon可省略
	                //activeImg:"http://gtms01.alicdn.com/tps/i1/TB1bIHMJFXXXXaAXXXXgBrbGpXX-36-36.png",
	                //txt:'老年',
	                checkedValue:'3',
	            },

	        ]
	    },
	    changed:function(){
	        //this.setDeviceStatus();
	        var num = DA.getUI("functionRadio").getValue();
	    	DA.setDeviceStatus(DA.uuid, {
	             "Mode_Sleep": {"value": num.toString()},
	             "Ventilation_Speed": {"value": "1"}
	        });
	    }
	    
	})
	//文字模式多选择组件渲染
	var check2 = new DA.AlinkUI.FunctionCheck('functionCheck1',{
	    domhook : $('.bind_functionCheck_text'),
	    datamodel:{
	        key:'other',
	        checkNum:'4',//列数
	        value:'0',//初始值
	        uiTitle:"其他模式",
	        map:[
	            {
	                innerText:'电辅热',
	                key:'OnOff_PTC',
	                checkedValue:'1',
	                uncheckedValue:'0',
	            },
	            {
	                innerText:'背光灯',
	                key:'Light_Background',
	                checkedValue:'1',
	                uncheckedValue:'0',
	            }
	        ]
	    },
        onItemClick:function(item, index, e){
	        console.log(item);
	        return true;
	    },
	    changed:function(){
	        this.setDeviceStatus();
	    }
	    
	});
	//断网组件渲染
	var offNet = new DA.AlinkUI.OffNet('offNet1',{
	    domhook : $('.bind_handle_offnet'),
	    datamodel:{
	        button:[]
	    }
	});
	//数据改变时候处理页面
	DA.bindPushData({
        deviceStatusChange:function(data){
        	main.rendData(data);
        	if(data.onlineState && data.onlineState.value == "off"){ 
               DA.getUI('offNet1').showUI();
            }else{
               DA.getUI('offNet1').hideUI();
            }
            
        },
        'netWorkStatusChange': function(data){
        	if (data == false) {
                DA.getUI('offlineToast').showUI();
            }
        }
    });
    DA.onReady(function(){
          titleName = DA.deviceName;
          //native 导航条
          DA.nativeCmp.topbar.setNavbar({
	          title: titleName,
	          type:'mixed',
	          rightButton:[{
	              iconfont:'&#x3042',
	              name:'iconCode',
	              handler:function(){
	                  console.log('iconCode click');
	              }
	          }]
	      },function(){
	          DA.nativeCmp.topbar.removeRightBtnByName('iconCode',function(){
			          console.log('set success');
			      },function(){
			          console.log('set fail');
			      })
	      },function(){
	          console.log('set fail');
	      });
    });
    //列表渲染
	var alarmClock = new DA.AlinkUI.ItemList('alarmClock', {
        domhook: $('.bind_handle_item_alarmClock'),
        datamodel: {
            //uiTitle:'加热模式',//如果不需要title，可省略
            map: [{
                title: '定时预约',
                subtitle: "",
                after: '',
                rightIcon: "&#xe617;"
            }]
        },
        onClickBefore: function() {
            return true;
        },
        onClickAfter: function() {
            console.log('onClickAfter');
            return true;
        },
        onItemClick: function(targetItem, e) {
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
        	
        },

    });
    var offlineToast = new DA.AlinkUI.Toast('offlineToast', {
        domhook: $('.bind_offlineToast'),
        text: '您的设备已断网,请联网后操作',
        time : 5000
    });
});