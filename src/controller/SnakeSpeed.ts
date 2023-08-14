module GreedySnakesController.engine{
    export class SnakeSpeed extends egret.DisplayObjectContainer {

        private speedController: egret.Shape;
        public speed: number;
        // public gameSocket: egret.WebSocket = null;

        constructor(){
            super();
            // this.gameSocket = gameSocket;
            this.speed = 1;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }

        private init() {
            let speedController = new egret.Shape(); // 加速按钮
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
        }

        private changeSpeed(){
            let sendXml: string = socketdata.SendXmlHelper.buildUserSpeed(this.speed);
            this.speed == 0? 1 : 0;
            this.sendXmlToServer(sendXml);//发送xml.文档到服务器
        }
         
         //发送数据到服务器端
        private sendXmlToServer(xmlStr: string): void {
            //websocket
            // let gameSocket = this.gameSocket;
            // if (gameSocket != null && gameSocket.connected == true) {
            //     // this.gameSocket.writeUTFBytes(xmlStr + "\n");
            //     gameSocket.writeUTF(xmlStr + "\n");
            //     gameSocket.flush();//对套接字输出缓冲区中积累的所有数据进行刷新
            // }

            egret.ExternalInterface.call("sendXmlToUdpServer", xmlStr);

        }
        

    }
}