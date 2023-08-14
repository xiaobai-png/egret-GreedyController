var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GreedySnakesController;
(function (GreedySnakesController) {
    var util;
    (function (util) {
        var ChatUtil = (function () {
            function ChatUtil() {
            }
            //去掉字符串的前后空格
            ChatUtil.trim = function (char) {
                return ChatUtil.rtrim(ChatUtil.ltrim(char));
            };
            ChatUtil.ltrim = function (char) {
                var pattern = /^\s*/;
                return char.replace(pattern, "");
            };
            ChatUtil.rtrim = function (char) {
                var pattern = /\s*$/;
                return char.replace(pattern, "");
            };
            return ChatUtil;
        }());
        util.ChatUtil = ChatUtil;
        __reflect(ChatUtil.prototype, "GreedySnakesController.util.ChatUtil");
    })(util = GreedySnakesController.util || (GreedySnakesController.util = {}));
})(GreedySnakesController || (GreedySnakesController = {}));
//# sourceMappingURL=ChatUtil.js.map