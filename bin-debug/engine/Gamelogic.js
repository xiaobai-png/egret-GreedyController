/**
 * 登录与socket的连接，使用tcp通信
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
var GreedySnakesController;
(function (GreedySnakesController) {
    var engine;
    (function (engine) {
        var Gamelogic = (function (_super) {
            __extends(Gamelogic, _super);
            // 开始页面的加载
            function Gamelogic() {
                var _this = _super.call(this) || this;
                _this.gameSocket = null;
                _this.stringBuffer = ""; //数据缓冲区
                _this.loginUI = null; // 同一个模块里面
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            Gamelogic.prototype.getInstance = function () {
                var instance = this.instance;
                if (!instance) {
                    instance = new Gamelogic;
                    this.instance = instance;
                }
            };
            Gamelogic.prototype.init = function (self) {
                var loginUI = this.loginUI;
                if (loginUI == null) {
                    loginUI = new engine.Login();
                    this.addChild(loginUI);
                    this.loginUI = loginUI;
                    loginUI.addConnectBtnEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickConnectBtn, this);
                    loginUI.addConnectBtnEventListener(egret.TouchEvent.TOUCH_END, this.clickLoginBtn, this);
                }
            };
            // 点击登录，连接方法
            Gamelogic.prototype.clickConnectBtn = function (event) {
                var url = "192.168.1.45";
                var port = 8205;
                // websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null) {
                    this.disposeGameSocket();
                }
                gameSocket = new egret.WebSocket(); //构造socket
                this.gameSocket = gameSocket;
                gameSocket.addEventListener(egret.Event.CLOSE, this.closeHandler, this); //socket关闭
                gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接
                gameSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this); //socket ioError
                gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
                gameSocket.connect(url, port); //链接socket 
            };
            // 获得输入框的信息，并发送给服务器端
            Gamelogic.prototype.clickLoginBtn = function (event) {
                var sendXml = GreedySnakesController.socketdata.SendXmlHelper.buildUserLoginXml(this.loginUI.getusernameInput(), this.loginUI.getpasswordInput()); //构造活跃信息xml
                this.sendXmlToServer(sendXml); //发送xml文档到服务器
            };
            //发送数据到服务器端
            Gamelogic.prototype.sendXmlToServer = function (xmlStr) {
                //websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null && gameSocket.connected == true) {
                    // this.gameSocket.writeUTFBytes(xmlStr + "\n");
                    gameSocket.writeUTF(xmlStr + "\n");
                    gameSocket.flush(); //对套接字输出缓冲区中积累的所有数据进行刷新
                }
            };
            /**
             * 释放Socket连接
             */
            Gamelogic.prototype.disposeGameSocket = function () {
                // 测试：websocket
                var gameSocket = this.gameSocket;
                if (gameSocket != null) {
                    if (gameSocket.hasEventListener(egret.Event.CLOSE)) {
                        gameSocket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.Event.CONNECT)) {
                        gameSocket.removeEventListener(egret.Event.CONNECT, this.connectHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
                        gameSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
                    }
                    if (gameSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
                        gameSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this);
                    }
                    gameSocket.close(); //关闭连接
                    this.gameSocket = null;
                }
            };
            // 服务器发送过来的数据
            Gamelogic.prototype.webSocketDataHandler = function (event) {
                this.socketDataHandler(this.gameSocket.readUTF());
            };
            // 服务器发送过来的数据
            Gamelogic.prototype.socketDataHandler = function (str) {
                str = GreedySnakesController.util.ChatUtil.trim(str);
                if (str != "") {
                    var stringBuffer = this.stringBuffer;
                    stringBuffer += str;
                    var index = stringBuffer.indexOf("</over>"); //查找结束符号
                    // 多个操作语句
                    while (index != -1) {
                        var distr = stringBuffer.substring(0, index);
                        stringBuffer = stringBuffer.substring(index + 7, stringBuffer.length);
                        this.gameDataHelper(distr); //把数据转交个游戏数据分析方法处理
                        index = stringBuffer.indexOf("</over>"); //查找结束符号
                    }
                    this.stringBuffer = stringBuffer;
                }
            };
            /* 游戏数据分析方法
           * 游戏数据处理类,该类中发现如果回来的数据为本类处理的数据
           * 则处理数据,如果是GameLogicEngine类处理的数据,就把数据传送给GameLogicEngine类的gameDataHelper方法
           */
            Gamelogic.prototype.gameDataHelper = function (xmlStr) {
                // egret.log(xmlStr);
                var tempList = GreedySnakesController.socketdata.XmlDataHelper.dateHelper(xmlStr); //解析数据,返回数据组数,如果该数组为null,表示不能解析成功
                if (tempList != null) {
                    if (tempList[0] == "LoginSuccess") {
                        this.checkSuccess(tempList[1]);
                    }
                }
                else {
                    console.log("解析失败");
                }
            };
            /**
            * 检查登陆的信息
            */
            Gamelogic.prototype.checkSuccess = function (success) {
                if (success == "1") {
                    this.parent.removeChildren();
                }
            };
            //连接关闭
            Gamelogic.prototype.closeHandler = function (event) {
                console.log("连接关闭");
            };
            //socket连接成功
            Gamelogic.prototype.connectHandler = function (event) {
                console.log("连接成功");
            };
            //连接失败
            Gamelogic.prototype.ioErrorHandler = function (event) {
                console.log("连接失败");
            };
            return Gamelogic;
        }(egret.DisplayObjectContainer));
        engine.Gamelogic = Gamelogic;
        __reflect(Gamelogic.prototype, "GreedySnakesController.engine.Gamelogic");
    })(engine = GreedySnakesController.engine || (GreedySnakesController.engine = {}));
})(GreedySnakesController || (GreedySnakesController = {}));
//# sourceMappingURL=Gamelogic.js.map