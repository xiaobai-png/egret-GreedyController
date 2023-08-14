/**
 * 登录与socket的连接，使用tcp通信
 */

module GreedySnakesController.engine{
    export class Gamelogic extends egret.DisplayObjectContainer{
         public gameSocket: egret.WebSocket = null;

         private stringBuffer: string = "";//数据缓冲区

         private loginUI: Login = null; // 同一个模块里面

         public instance: Gamelogic;

         
        // 开始页面的加载
        public constructor(){
            super();
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);

            this.setInterface();
           
        }

        // 对Android进行注册方法
        private setInterface(){
            
           egret.ExternalInterface.addCallback('tcpSocketDataHandler', function(message) {
                // 在这里处理服务器收到信息方法调用
                this.socketDataHandler(message);
            });

            egret.ExternalInterface.addCallback('tcpSocketClose',function(message) {
                // 在这里处理关闭方法调用
                console.log("TCP连接断开");
            });
            
            egret.ExternalInterface.addCallback('tcpSocketConnectSuccess',function(message) {
                // 在这里处理方法调用
                console.log("TCP连接成功");
            });

            egret.ExternalInterface.addCallback('tcpSocketConnectError',function(message) {
                // 在这里处理方法调用
                console.log("TCP连接失败");
            });

        }

        public getInstance(){
            let instance = this.instance;
            if(!instance){
                instance = new Gamelogic;
                this.instance = instance;
            }
        }

        private init(self){
            let loginUI = this.loginUI;
            if(loginUI == null) {
                loginUI = new Login();
                this.addChild(loginUI);
                this.loginUI = loginUI;

                loginUI.addConnectBtnEventListener(egret.TouchEvent.TOUCH_BEGIN, this.clickConnectBtn, this);
                loginUI.addConnectBtnEventListener(egret.TouchEvent.TOUCH_END, this.clickLoginBtn, this);
                
            }
        }

        // 点击登录，连接方法
        private clickConnectBtn(event: egret.Event): void {
            let url = "192.168.1.45";
            let port = 8205;

            // // websocket
            // let gameSocket = this.gameSocket;
            // if (gameSocket != null) {// 如果已经打开了Socket 则先关闭
            //     this.disposeGameSocket();
            // }
            // gameSocket = new egret.WebSocket(); //构造socket
            // this.gameSocket = gameSocket;
            // gameSocket.addEventListener(egret.Event.CLOSE, this.closeHandler, this); //socket关闭
            // gameSocket.addEventListener(egret.Event.CONNECT, this.connectHandler, this); //socket连接
            // gameSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);//socket ioError
            // gameSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this); //接收数据
            // gameSocket.connect(url, port);//链接socket 

            let address = "192.168.1.45_8025";
            egret.ExternalInterface.call("startTCPSocket", address); 

            egret.ExternalInterface.call("startSocketUdp", "192.168.1.45_8026");
        }

        // 获得输入框的信息，并发送给服务器端
        private clickLoginBtn(event: egret.Event): void {
            let sendXml: string = socketdata.SendXmlHelper.buildUserLoginXml(this.loginUI.getusernameInput(), this.loginUI.getpasswordInput());//构造活跃信息xml
            this.sendXmlToServer(sendXml);//发送xml文档到服务器
        }

        //发送数据到服务器端
        private sendXmlToServer(xmlStr: string): void {
            // //websocket
            // let gameSocket = this.gameSocket;
            // if (gameSocket != null && gameSocket.connected == true) {
            //     // this.gameSocket.writeUTFBytes(xmlStr + "\n");
            //     gameSocket.writeUTF(xmlStr + "\n");
            //     gameSocket.flush();//对套接字输出缓冲区中积累的所有数据进行刷新
            // }

            egret.ExternalInterface.call("tcpSocketSendMessage", xmlStr);
        }

        /**
         * 释放Socket连接
         */
        // private disposeGameSocket(): void {
        //     // 测试：websocket
        //     let gameSocket = this.gameSocket;
        //     if (gameSocket != null) {
        //         if (gameSocket.hasEventListener(egret.Event.CLOSE)) {
        //             gameSocket.removeEventListener(egret.Event.CLOSE, this.closeHandler, this);
        //         }
        //         if (gameSocket.hasEventListener(egret.Event.CONNECT)) {
        //             gameSocket.removeEventListener(egret.Event.CONNECT, this.connectHandler, this);
        //         }
        //         if (gameSocket.hasEventListener(egret.IOErrorEvent.IO_ERROR)) {
        //             gameSocket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.ioErrorHandler, this);
        //         }
        //         if (gameSocket.hasEventListener(egret.ProgressEvent.SOCKET_DATA)) {
        //             gameSocket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.webSocketDataHandler, this);
        //         }
        //         gameSocket.close();//关闭连接
        //         this.gameSocket = null;
        //     }
        // }

        // // 服务器发送过来的数据
        // private webSocketDataHandler(event: egret.ProgressEvent): void {
        //     this.socketDataHandler(this.gameSocket.readUTF());


        // }

        // 服务器发送过来的数据
        private socketDataHandler(str: string): void {
            str = util.ChatUtil.trim(str);
            if (str != "") {
                let stringBuffer = this.stringBuffer;
                stringBuffer += str;
                let index: number = stringBuffer.indexOf("</over>");//查找结束符号
                // 多个操作语句
                while (index != -1) {
                    let distr: string = stringBuffer.substring(0, index);
                    stringBuffer = stringBuffer.substring(index + 7, stringBuffer.length);
                    this.gameDataHelper(distr);//把数据转交个游戏数据分析方法处理
                    index = stringBuffer.indexOf("</over>");//查找结束符号
                }
                this.stringBuffer = stringBuffer;
            }
        }

         /* 游戏数据分析方法
		* 游戏数据处理类,该类中发现如果回来的数据为本类处理的数据
		* 则处理数据,如果是GameLogicEngine类处理的数据,就把数据传送给GameLogicEngine类的gameDataHelper方法
		*/
        private gameDataHelper(xmlStr: string): void {
            // egret.log(xmlStr);
            let tempList: Array<any> = socketdata.XmlDataHelper.dateHelper(xmlStr);//解析数据,返回数据组数,如果该数组为null,表示不能解析成功
            if (tempList != null) {
                if (tempList[0] == "LoginSuccess") {//如果是登录信息
                    this.checkSuccess(tempList[1]);
                }
            }else{
                console.log("解析失败");
            }
        }

         /**
		 * 检查登陆的信息
		 */
        private checkSuccess(success: string): void {
            if(success == "1"){
                this.parent.removeChildren();
            }
        }

         //连接关闭
        private closeHandler(event: egret.Event): void {
            console.log("连接关闭");
        }

        //socket连接成功
        private connectHandler(event: egret.Event): void {
            console.log("连接成功");
        }

        //连接失败
        private ioErrorHandler(event: egret.IOErrorEvent): void {
            console.log("连接失败");
        }
    }
}