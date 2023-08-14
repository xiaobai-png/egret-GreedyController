var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 发送构造器
 */
var GreedySnakesController;
(function (GreedySnakesController) {
    var socketdata;
    (function (socketdata) {
        var SendXmlHelper = (function () {
            function SendXmlHelper() {
            }
            //构造登录字符串 DOM构造为 userLogin + root + 信息 共三层
            SendXmlHelper.buildUserLoginXml = function (userName, pwl) {
                var res = "<UserLogin><root>"
                    + "<userName><![CDATA[" + userName + "]]></userName>"
                    + "<passWord><![CDATA[" + pwl + "]]></passWord>"
                    + "</root></UserLogin></over>";
                return res;
            };
            // 构造传输的角度
            SendXmlHelper.buildUserPlay = function (angle) {
                var res = "<UserPlay><root>"
                    + "<angle><![CDATA[" + angle + "]]></angle>"
                    + "</root></UserPlay></over>";
                return res;
            };
            // 改变速度
            SendXmlHelper.buildUserSpeed = function (speed) {
                var res = "<UserSpeed><root>"
                    + "<speed><![CDATA[" + speed + "]]></speed>"
                    + "</root></UserSpeed></over>";
                return res;
            };
            return SendXmlHelper;
        }());
        socketdata.SendXmlHelper = SendXmlHelper;
        __reflect(SendXmlHelper.prototype, "GreedySnakesController.socketdata.SendXmlHelper");
    })(socketdata = GreedySnakesController.socketdata || (GreedySnakesController.socketdata = {}));
})(GreedySnakesController || (GreedySnakesController = {}));
//# sourceMappingURL=SendXmlHelper.js.map