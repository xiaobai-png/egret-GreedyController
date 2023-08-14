module GreedySnakesController.engine{
    export class Login extends egret.DisplayObjectContainer {

        private usernameInput: egret.TextField;
        private passwordInput: egret.TextField;
        private loginBtn: eui.Button = null;
    
        constructor(){
           super();
           this.addEventListener(egret.Event.ADDED_TO_STAGE, this.init, this);
        }
    
        // 需要考虑自动登陆的情况
         private init(): void{
             // 添加背景
            const bg: egret.Shape = new egret.Shape();
            bg.graphics.beginFill(0xcce0ff);
            bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            bg.graphics.endFill();
            this.addChild(bg);

            // 账号注释
            let userLabel = new eui.Label();
            userLabel.text = "账号:";
            userLabel.height = 40;
            userLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
            userLabel.x = (this.stage.stageWidth - 300) / 2 - userLabel.width - 10;
            userLabel.y = 200;
            this.addChild(userLabel);

          // 添加账号输入框
           let usernameInput = new egret.TextField();

           this.usernameInput = usernameInput;
           usernameInput.text = "输入账号";
           usernameInput.size = 20;
           usernameInput.textColor = 0xb3d9ff;
           usernameInput.type = egret.TextFieldType.INPUT;
           usernameInput.background = true;
           usernameInput.width = 300;
           usernameInput.height = 40;
           usernameInput.verticalAlign = egret.VerticalAlign.MIDDLE;
           usernameInput.x = (this.stage.stageWidth - this.usernameInput.width) / 2;
           usernameInput.y = 200;
           this.addChild(this.usernameInput);

           // 密码注释
           let passwordLabel = new eui.Label();
           passwordLabel.text = "密码:";
           passwordLabel.height = 40;
           passwordLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
           passwordLabel.x = (this.stage.stageWidth - 300) / 2 - passwordLabel.width - 10;
           passwordLabel.y = 300;
           this.addChild(passwordLabel);

             // 添加密码输入框
            let passwordInput = new egret.TextField();;
            this.passwordInput = passwordInput;
            
            passwordInput.text = "输入密码";
            passwordInput.size = 20;

            passwordInput.type = egret.TextFieldType.INPUT;
            passwordInput.textColor = 0xb3d9ff;
            passwordInput.displayAsPassword = true;
            passwordInput.background = true;
            passwordInput.backgroundColor = 0xf2f2f2;
            passwordInput.verticalAlign = egret.VerticalAlign.MIDDLE;
            passwordInput.width = 300;
            passwordInput.height = 40;

            passwordInput.x = (this.stage.stageWidth - this.passwordInput.width) / 2;
            passwordInput.y = 300;
            this.addChild(this.passwordInput);

            let loginBtn = this.loginBtn;
            if(loginBtn == null){
                loginBtn = new eui.Button();
                this.loginBtn = loginBtn;
                loginBtn.label = "登录";
        
                loginBtn.x = this.stage.stageWidth / 2 - loginBtn.width / 2;
                loginBtn.y = this.stage.stageHeight / 2 - loginBtn.height / 2 + 300;
            
                this.addChild(loginBtn);
            }
            
     }



     public addConnectBtnEventListener(eventName:string, eventFun: Function, eventObject: any): void{
           if(this.loginBtn){
               this.loginBtn.addEventListener(eventName, eventFun, eventObject);
           }
           
            
    }

    public getusernameInput(): string {
        return this.usernameInput.text;
    }

    public getpasswordInput(): string {
        return this.passwordInput.text;
    }

}
}
