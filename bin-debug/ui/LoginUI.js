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
        var Login = (function (_super) {
            __extends(Login, _super);
            function Login() {
                var _this = _super.call(this) || this;
                _this.loginBtn = null;
                _this.addEventListener(egret.Event.ADDED_TO_STAGE, _this.init, _this);
                return _this;
            }
            // 需要考虑自动登陆的情况
            Login.prototype.init = function () {
                // 添加背景
                var bg = new egret.Shape();
                bg.graphics.beginFill(0xcce0ff);
                bg.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
                bg.graphics.endFill();
                this.addChild(bg);
                // 账号注释
                var userLabel = new eui.Label();
                userLabel.text = "账号:";
                userLabel.height = 40;
                userLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
                userLabel.x = (this.stage.stageWidth - 300) / 2 - userLabel.width - 10;
                userLabel.y = 200;
                this.addChild(userLabel);
                // 添加账号输入框
                var usernameInput = new egret.TextField();
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
                var passwordLabel = new eui.Label();
                passwordLabel.text = "密码:";
                passwordLabel.height = 40;
                passwordLabel.verticalAlign = egret.VerticalAlign.MIDDLE;
                passwordLabel.x = (this.stage.stageWidth - 300) / 2 - passwordLabel.width - 10;
                passwordLabel.y = 300;
                this.addChild(passwordLabel);
                // 添加密码输入框
                var passwordInput = new egret.TextField();
                ;
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
                var loginBtn = this.loginBtn;
                if (loginBtn == null) {
                    loginBtn = new eui.Button();
                    this.loginBtn = loginBtn;
                    loginBtn.label = "登录";
                    loginBtn.x = this.stage.stageWidth / 2 - loginBtn.width / 2;
                    loginBtn.y = this.stage.stageHeight / 2 - loginBtn.height / 2 + 300;
                    this.addChild(loginBtn);
                }
            };
            Login.prototype.addConnectBtnEventListener = function (eventName, eventFun, eventObject) {
                if (this.loginBtn) {
                    this.loginBtn.addEventListener(eventName, eventFun, eventObject);
                }
            };
            Login.prototype.getusernameInput = function () {
                return this.usernameInput.text;
            };
            Login.prototype.getpasswordInput = function () {
                return this.passwordInput.text;
            };
            return Login;
        }(egret.DisplayObjectContainer));
        engine.Login = Login;
        __reflect(Login.prototype, "GreedySnakesController.engine.Login");
    })(engine = GreedySnakesController.engine || (GreedySnakesController.engine = {}));
})(GreedySnakesController || (GreedySnakesController = {}));
//# sourceMappingURL=LoginUI.js.map