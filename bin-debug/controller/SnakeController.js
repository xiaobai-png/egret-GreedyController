/**1.需要创建一个数组记录蛇移动路线轨迹上的坐标。
 * 2.蛇的每一节身体都按照这个路径点数组里的坐标移动。
 * 2.蛇移动的时候是帧事件，每帧更新蛇移动轨迹坐标的数组，更新蛇的每一节身体的坐标在蛇移动轨迹数组里对应的坐标。
 * 3.蛇移动方向是360度的方向都可以移动。
 * 4.移动的时候可以丝滑一点，别看着有断层。
 *
 * 地图左下角创建一个摇杆，根据摇杆来控制蛇移动的方向
 * 地图右下角创建一个按钮图片，点击可以让蛇移动的速度变快
 * 再次点击可以让蛇恢复原来的速度。只控制其中一条蛇即可。
*/
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
// 使用udp通信
var GreedySnakesController;
(function (GreedySnakesController) {
    var engine;
    (function (engine) {
        var Snakecontroller = (function (_super) {
            __extends(Snakecontroller, _super);
            // 开始构建
            function Snakecontroller(gameSocket) {
                var _this = _super.call(this) || this;
                _this.tweenspeed = 200;
                _this.movePoint = new egret.Point();
                _this.touchStatic = false;
                _this.angle = 0;
                _this.gameSocket = null;
                _this.gameSocket = gameSocket;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            // 加载图片
            Snakecontroller.prototype.init = function (event) {
                // 初始方向
                this.direction = new egret.Point();
                this.direction.x = 1;
                this.direction.y = 0;
                // 原点
                var circle = new egret.Point();
                this.circle = circle;
                circle.x = 100;
                circle.y = 1000;
                // 加载遥杆背景图片
                var controllerBackground = new egret.Shape();
                this.controllerBackground = controllerBackground;
                // 锚点就在圆形内心
                var radius = this.radius = 100; // 摇杆半径
                controllerBackground.graphics.lineStyle(1, 0x000000);
                controllerBackground.graphics.beginFill(0xFFFFFF, 0.5);
                controllerBackground.graphics.drawCircle(circle.x, circle.y, radius);
                controllerBackground.graphics.endFill();
                this.addChild(controllerBackground);
                // 加载摇杆移动图片
                var controller = new egret.Shape(); // 摇杆图片
                this.controller = controller;
                controller.graphics.lineStyle(1, 0x000000);
                controller.graphics.beginFill(0x000000, 0.5);
                controller.graphics.drawCircle(0, 0, radius / 3);
                controller.graphics.endFill();
                controller.x = circle.x;
                controller.y = circle.y;
                this.addChild(controller);
                // 获得手指移动位置，此处加到舞台
                this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.clickPlayBtn, this);
                this.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            };
            // 通过滑动的偏移量更改方向，控制移动
            Snakecontroller.prototype.onTouchBegin = function (event) {
                this.touchStatic = true;
                this.movePoint.x = event.stageX;
                this.movePoint.y = event.stageY;
            };
            // 需要判断移动距离
            Snakecontroller.prototype.onTouchMove = function (event) {
                if (this.touchStatic) {
                    var movePoint = this.movePoint;
                    var radius = this.radius;
                    // controller距离圆心
                    var offsetX = event.stageX - movePoint.x;
                    var offsetY = event.stageY - movePoint.y;
                    var circle = this.circle;
                    // 移动位置与圆心的距离
                    var tempPoint = new egret.Point();
                    tempPoint.x = this.controller.x;
                    tempPoint.y = this.controller.y;
                    tempPoint.x += offsetX - circle.x;
                    tempPoint.y += offsetY - circle.y;
                    var distance = Math.sqrt(tempPoint.x * tempPoint.x + tempPoint.y * tempPoint.y);
                    if (distance <= radius) {
                        this.controller.x = tempPoint.x + circle.x;
                        this.controller.y = tempPoint.y + circle.y;
                    }
                    else {
                        var scale = radius / distance;
                        this.controller.x = tempPoint.x * scale + circle.x;
                        this.controller.y = tempPoint.y * scale + circle.y;
                    }
                    // 控制蛇的移动方向
                    this.direction.x = tempPoint.x;
                    this.direction.y = tempPoint.y;
                    this.angle = Math.atan2(tempPoint.y, tempPoint.x);
                    this.movePoint.x = event.stageX;
                    this.movePoint.y = event.stageY;
                }
            };
            Snakecontroller.prototype.onTouchEnd = function (event) {
                this.touchStatic = false;
                this.controller.x = this.circle.x;
                this.controller.y = this.circle.y;
            };
            // 获得摇杆移动的信息，并发送给服务器端
            Snakecontroller.prototype.clickPlayBtn = function (event) {
                var sendXml = GreedySnakesController.socketdata.SendXmlHelper.buildUserPlay(this.angle); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
            };
            //发送数据到服务器端
            Snakecontroller.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null && gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    gameSocket.writeUTF(xmlStr + "\n");
                    gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                }
            };
            return Snakecontroller;
        }(egret.DisplayObjectContainer));
        engine.Snakecontroller = Snakecontroller;
        __reflect(Snakecontroller.prototype, "GreedySnakesController.engine.Snakecontroller");
    })(engine = GreedySnakesController.engine || (GreedySnakesController.engine = {}));
})(GreedySnakesController || (GreedySnakesController = {}));
//# sourceMappingURL=SnakeController.js.map