var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GreedySnakesController;
(function (GreedySnakesController) {
    var engine;
    (function (engine) {
        var SnakeSpeed = (function (_super) {
            __extends(SnakeSpeed, _super);
            function SnakeSpeed(gameSocket) {
                var _this = _super.call(this) || this;
                _this.gameSocket = null;
                _this.gameSocket = gameSocket;
                _this.speed = 1;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            SnakeSpeed.prototype.init = function () {
                var speedController = new egret.Shape(); // 加速按钮
                speedController.graphics.lineStyle(1, 0x000000);
                speedController.graphics.beginFill(0xff80ff, 0.5);
                speedController.graphics.drawCircle(0, 0, 100);
                speedController.graphics.endFill();
                speedController.x = 530;
                speedController.y = 1000;
                this.addChild(speedController);
                this.speedController = speedController;
                speedController.touchEnabled = true;
                this.speedController.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeSpeed, this);
            };
            SnakeSpeed.prototype.changeSpeed = function () {
                var sendXml = GreedySnakesController.socketdata.SendXmlHelper.buildUserSpeed(this.speed);
                this.speed == 0 ? 1 : 0;
                this.sendXmlToServer(sendXml); //发送xml.文档到服务器
            };
            //发送数据到服务器端
            SnakeSpeed.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null && gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    gameSocket.writeUTF(xmlStr + "\n");
                    gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                }
            };
            return SnakeSpeed;
        }(egret.DisplayObjectContainer));
        engine.SnakeSpeed = SnakeSpeed;
        __reflect(SnakeSpeed.prototype, "GreedySnakesController.engine.SnakeSpeed");
    })(engine = GreedySnakesController.engine || (GreedySnakesController.engine = {}));
})(GreedySnakesController || (GreedySnakesController = {}));
//# sourceMappingURL=SnakeSpeed.js.map