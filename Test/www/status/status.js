define(['text!status/statusYtpl.html', 'text!status/statusXtpl.html'], function(YTpl, XTpl) {

    var statusBar = function(config, data) {
        var map = [];
        var lableData;
        var iconData;
        var valueLablesData;
        var unitData;
        var tplData;
        var statusData;
        statusBar.prototype.setTemplate = function(config, data) {
            for (key in config.attr) {
                var hiddenData=false;//隐藏数据是否匹配
                var newConfig = config.attr[key];
                var newKey = newConfig.key;
                if (newConfig.valueHidden) {
                    for(var i=0;i<newConfig.valueHidden.length;i++){
                        if(newConfig.valueHidden[i]==data[newKey].value){
                            hiddenData=true;
                            break;
                        }
                    }
                }
                if (newConfig.values) {
                    var index = _.indexOf(newConfig.values, data[newKey].value);
                    iconData = newConfig.icons ? newConfig.icons[index] : '';
                    valueLablesData = newConfig.valueLables ? newConfig.valueLables[index] : '';

                } else {
                    valueLablesData = data[newKey].value;
                }
                unitData = newConfig.unit ? newConfig.unit : '';
                lableData = newConfig.lable ? newConfig.lable : '';
                tplData = newConfig.tpl;

                var upCount = config.up ? config.up : 0;
                statusData = key<=upCount ? 'up' : 'down';
                // if(config.up == 0){
                //     $('.statusX-label-up').css({'float':'none'})
                // }
                if(!hiddenData){
                    map.push({
                        lable: lableData,
                        icon: iconData,
                        valueLables: valueLablesData,
                        unit: unitData,
                        tpl: tplData,
                        status: statusData
                    })
                }
                //竖版超出5个隐藏
                if(config.hook == '.statusY' && key=='4'){
                    break;
                }

            }
        };
        statusBar.prototype.init = function(config) {
            if (config.hook == '.statusY') {
                var html = _.template(YTpl)(renderData);
                $(config.hook).html(html);
            } else {
                var html = _.template(XTpl)(renderData);
                $(config.hook).html(html);
            }
        };
        this.setTemplate(config, data);
        var renderData = {
            data: map
        };

        this.init(config);
        if(config.up == 0){
            $('.statusX-label-up').css({'float':'none'});
        }
    }
    DA.statusBar = statusBar;
    return DA.statusBar;
})