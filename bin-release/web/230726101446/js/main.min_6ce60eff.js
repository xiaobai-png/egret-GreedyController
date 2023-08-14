var __reflect=this&&this.__reflect||function(e,t,n){e.__class__=t,n?n.push(t):n=[t],e.__types__=e.__types__?n.concat(e.__types__):n},__extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);n.prototype=t.prototype,e.prototype=new n},__awaiter=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))(function(i,o){function a(e){try{s(r.next(e))}catch(t){o(t)}}function l(e){try{s(r["throw"](e))}catch(t){o(t)}}function s(e){e.done?i(e.value):new n(function(t){t(e.value)}).then(a,l)}s((r=r.apply(e,t||[])).next())})},__generator=this&&this.__generator||function(e,t){function n(e){return function(t){return r([e,t])}}function r(n){if(i)throw new TypeError("Generator is already executing.");for(;s;)try{if(i=1,o&&(a=o[2&n[0]?"return":n[0]?"throw":"next"])&&!(a=a.call(o,n[1])).done)return a;switch(o=0,a&&(n=[0,a.value]),n[0]){case 0:case 1:a=n;break;case 4:return s.label++,{value:n[1],done:!1};case 5:s.label++,o=n[1],n=[0];continue;case 7:n=s.ops.pop(),s.trys.pop();continue;default:if(a=s.trys,!(a=a.length>0&&a[a.length-1])&&(6===n[0]||2===n[0])){s=0;continue}if(3===n[0]&&(!a||n[1]>a[0]&&n[1]<a[3])){s.label=n[1];break}if(6===n[0]&&s.label<a[1]){s.label=a[1],a=n;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(n);break}a[2]&&s.ops.pop(),s.trys.pop();continue}n=t.call(e,s)}catch(r){n=[6,r],o=0}finally{i=a=0}if(5&n[0])throw n[1];return{value:n[0]?n[1]:void 0,done:!0}}var i,o,a,l,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return l={next:n(0),"throw":n(1),"return":n(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l},GreedySnakesController;!function(e){var t;!function(t){var n=function(t){function n(){var e=t.call(this)||this;return e.speed=1,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.init,e),e}return __extends(n,t),n.prototype.init=function(){var e=new egret.Shape;e.graphics.lineStyle(1,0),e.graphics.beginFill(16744703,.5),e.graphics.drawCircle(0,0,100),e.graphics.endFill(),e.x=530,e.y=1e3,this.addChild(e),this.speedController=e,e.touchEnabled=!0,this.speedController.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeSpeed,this)},n.prototype.changeSpeed=function(){var t=e.socketdata.SendXmlHelper.buildUserSpeed(this.speed);0==this.speed?1:0,this.sendXmlToServer(t)},n.prototype.sendXmlToServer=function(e){egret.ExternalInterface.call("sendXmlToUdpServer",e)},n}(egret.DisplayObjectContainer);t.SnakeSpeed=n,__reflect(n.prototype,"GreedySnakesController.engine.SnakeSpeed")}(t=e.engine||(e.engine={}))}(GreedySnakesController||(GreedySnakesController={}));var AssetAdapter=function(){function e(){}return e.prototype.getAsset=function(e,t,n){function r(r){t.call(n,r,e)}if(RES.hasRes(e)){var i=RES.getRes(e);i?r(i):RES.getResAsync(e,r,this)}else RES.getResByUrl(e,r,this,RES.ResourceItem.TYPE_IMAGE)},e}();__reflect(AssetAdapter.prototype,"AssetAdapter",["eui.IAssetAdapter"]);var Main=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.gamelogic=null,t}return __extends(t,e),t.prototype.createChildren=function(){e.prototype.createChildren.call(this),egret.lifecycle.addLifecycleListener(function(e){}),egret.lifecycle.onPause=function(){egret.ticker.pause()},egret.lifecycle.onResume=function(){egret.ticker.resume()};var t=new AssetAdapter;egret.registerImplementation("eui.IAssetAdapter",t),egret.registerImplementation("eui.IThemeAdapter",new ThemeAdapter),this.runGame()["catch"](function(e){console.log(e)})},t.prototype.runGame=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return[4,this.loadResource()];case 1:return n.sent(),this.createGameScene(),[4,RES.getResAsync("description_json")];case 2:return e=n.sent(),[4,platform.login()];case 3:return n.sent(),[4,platform.getUserInfo()];case 4:return t=n.sent(),console.log(t),[2]}})})},t.prototype.loadResource=function(){return __awaiter(this,void 0,void 0,function(){var e,t;return __generator(this,function(n){switch(n.label){case 0:return n.trys.push([0,4,,5]),e=new LoadingUI,this.stage.addChild(e),[4,RES.loadConfig("resource/default.res.json","resource/")];case 1:return n.sent(),[4,this.loadTheme()];case 2:return n.sent(),[4,RES.loadGroup("preload",0,e)];case 3:return n.sent(),this.stage.removeChild(e),[3,5];case 4:return t=n.sent(),console.error(t),[3,5];case 5:return[2]}})})},t.prototype.loadTheme=function(){var e=this;return new Promise(function(t,n){var r=new eui.Theme("resource/default.thm.json",e.stage);r.addEventListener(eui.UIEvent.COMPLETE,function(){t()},e)})},t.prototype.createGameScene=function(){var e=this.gamelogic;null==e&&(e=new GreedySnakesController.engine.Gamelogic,this.addChild(e),this.gamelogic=e),this.gamelogic.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.putGame,this)},t.prototype.createBitmapByName=function(e){var t=new egret.Bitmap,n=RES.getRes(e);return t.texture=n,t},t.prototype.putGame=function(){var e=new GreedySnakesController.engine.Snakecontroller;this.addChild(e);var t=new GreedySnakesController.engine.SnakeSpeed;this.addChild(t)},t}(eui.UILayer);__reflect(Main.prototype,"Main");var DebugPlatform=function(){function e(){}return e.prototype.getUserInfo=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2,{nickName:"username"}]})})},e.prototype.login=function(){return __awaiter(this,void 0,void 0,function(){return __generator(this,function(e){return[2]})})},e}();__reflect(DebugPlatform.prototype,"DebugPlatform",["Platform"]),window.platform||(window.platform=new DebugPlatform);var ThemeAdapter=function(){function e(){}return e.prototype.getTheme=function(e,t,n,r){function i(e){t.call(r,e)}function o(t){t.resItem.url==e&&(RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),n.call(r))}var a=this;if("undefined"!=typeof generateEUI)egret.callLater(function(){t.call(r,generateEUI)},this);else if("undefined"!=typeof generateEUI2)RES.getResByUrl("resource/gameEui.json",function(e,n){window.JSONParseClass.setData(e),egret.callLater(function(){t.call(r,generateEUI2)},a)},this,RES.ResourceItem.TYPE_JSON);else if("undefined"!=typeof generateJSON)if(e.indexOf(".exml")>-1){var l=e.split("/");l.pop();var s=l.join("/")+"_EUI.json";generateJSON.paths[e]?egret.callLater(function(){t.call(r,generateJSON.paths[e])},this):RES.getResByUrl(s,function(n){window.JSONParseClass.setData(n),egret.callLater(function(){t.call(r,generateJSON.paths[e])},a)},this,RES.ResourceItem.TYPE_JSON)}else egret.callLater(function(){t.call(r,generateJSON)},this);else RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR,o,null),RES.getResByUrl(e,i,this,RES.ResourceItem.TYPE_TEXT)},e}();__reflect(ThemeAdapter.prototype,"ThemeAdapter",["eui.IThemeAdapter"]);var GreedySnakesController;!function(e){var t;!function(t){var n=function(t){function n(){var e=t.call(this)||this;return e.tweenspeed=200,e.movePoint=new egret.Point,e.touchStatic=!1,e.angle=0,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.init,e),e}return __extends(n,t),n.prototype.init=function(e){this.direction=new egret.Point,this.direction.x=1,this.direction.y=0;var t=new egret.Point;this.circle=t,t.x=100,t.y=1e3;var n=new egret.Shape;this.controllerBackground=n;var r=this.radius=100;n.graphics.lineStyle(1,0),n.graphics.beginFill(16777215,.5),n.graphics.drawCircle(t.x,t.y,r),n.graphics.endFill(),this.addChild(n);var i=new egret.Shape;this.controller=i,i.graphics.lineStyle(1,0),i.graphics.beginFill(0,.5),i.graphics.drawCircle(0,0,r/3),i.graphics.endFill(),i.x=t.x,i.y=t.y,this.addChild(i),this.stage.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.onTouchMove,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE,this.clickPlayBtn,this),this.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this)},n.prototype.onTouchBegin=function(e){this.touchStatic=!0,this.movePoint.x=e.stageX,this.movePoint.y=e.stageY},n.prototype.onTouchMove=function(e){if(this.touchStatic){var t=this.movePoint,n=this.radius,r=e.stageX-t.x,i=e.stageY-t.y,o=this.circle,a=new egret.Point;a.x=this.controller.x,a.y=this.controller.y,a.x+=r-o.x,a.y+=i-o.y;var l=Math.sqrt(a.x*a.x+a.y*a.y);if(n>=l)this.controller.x=a.x+o.x,this.controller.y=a.y+o.y;else{var s=n/l;this.controller.x=a.x*s+o.x,this.controller.y=a.y*s+o.y}this.direction.x=a.x,this.direction.y=a.y,this.angle=Math.atan2(a.y,a.x),this.movePoint.x=e.stageX,this.movePoint.y=e.stageY}},n.prototype.onTouchEnd=function(e){this.touchStatic=!1,this.controller.x=this.circle.x,this.controller.y=this.circle.y},n.prototype.clickPlayBtn=function(t){var n=e.socketdata.SendXmlHelper.buildUserPlay(this.angle);this.sendXmlToServer(n)},n.prototype.sendXmlToServer=function(e){egret.ExternalInterface.call("sendXmlToUdpServer",e)},n}(egret.DisplayObjectContainer);t.Snakecontroller=n,__reflect(n.prototype,"GreedySnakesController.engine.Snakecontroller")}(t=e.engine||(e.engine={}))}(GreedySnakesController||(GreedySnakesController={}));var LoadingUI=function(e){function t(){var t=e.call(this)||this;return t.createView(),t}return __extends(t,e),t.prototype.createView=function(){this.textField=new egret.TextField,this.addChild(this.textField),this.textField.y=300,this.textField.width=480,this.textField.height=100,this.textField.textAlign="center"},t.prototype.onProgress=function(e,t){this.textField.text="Loading..."+e+"/"+t},t}(egret.Sprite);__reflect(LoadingUI.prototype,"LoadingUI",["RES.PromiseTaskReporter"]);var GreedySnakesController;!function(e){var t;!function(t){var n=function(n){function r(){var e=n.call(this)||this;return e.gameSocket=null,e.stringBuffer="",e.loginUI=null,e.addEventListener(egret.Event.ADDED_TO_STAGE,e.init,e),e.setInterface(),e}return __extends(r,n),r.prototype.setInterface=function(){egret.ExternalInterface.addCallback("tcpSocketDataHandler",function(e){this.socketDataHandler(e)}),egret.ExternalInterface.addCallback("tcpSocketClose",function(e){console.log("TCP连接断开")}),egret.ExternalInterface.addCallback("tcpSocketConnectSuccess",function(e){console.log("TCP连接成功")}),egret.ExternalInterface.addCallback("tcpSocketConnectError",function(e){console.log("TCP连接失败")})},r.prototype.getInstance=function(){var e=this.instance;e||(e=new r,this.instance=e)},r.prototype.init=function(e){var n=this.loginUI;null==n&&(n=new t.Login,this.addChild(n),this.loginUI=n,n.addConnectBtnEventListener(egret.TouchEvent.TOUCH_BEGIN,this.clickConnectBtn,this),n.addConnectBtnEventListener(egret.TouchEvent.TOUCH_END,this.clickLoginBtn,this))},r.prototype.clickConnectBtn=function(e){var t="192.168.1.45_8025";egret.ExternalInterface.call("startTCPSocket",t),egret.ExternalInterface.call("startSocketUdp","192.168.1.45_8026")},r.prototype.clickLoginBtn=function(t){var n=e.socketdata.SendXmlHelper.buildUserLoginXml(this.loginUI.getusernameInput(),this.loginUI.getpasswordInput());this.sendXmlToServer(n)},r.prototype.sendXmlToServer=function(e){egret.ExternalInterface.call("tcpSocketSendMessage",e)},r.prototype.socketDataHandler=function(t){if(t=e.util.ChatUtil.trim(t),""!=t){var n=this.stringBuffer;n+=t;for(var r=n.indexOf("</over>");-1!=r;){var i=n.substring(0,r);n=n.substring(r+7,n.length),this.gameDataHelper(i),r=n.indexOf("</over>")}this.stringBuffer=n}},r.prototype.gameDataHelper=function(t){var n=e.socketdata.XmlDataHelper.dateHelper(t);null!=n?"LoginSuccess"==n[0]&&this.checkSuccess(n[1]):console.log("解析失败")},r.prototype.checkSuccess=function(e){"1"==e&&this.parent.removeChildren()},r.prototype.closeHandler=function(e){console.log("连接关闭")},r.prototype.connectHandler=function(e){console.log("连接成功")},r.prototype.ioErrorHandler=function(e){console.log("连接失败")},r}(egret.DisplayObjectContainer);t.Gamelogic=n,__reflect(n.prototype,"GreedySnakesController.engine.Gamelogic")}(t=e.engine||(e.engine={}))}(GreedySnakesController||(GreedySnakesController={}));var GreedySnakesController;!function(e){var t;!function(e){var t=function(){function e(){}return e.buildUserLoginXml=function(e,t){var n="<UserLogin><root><userName><![CDATA["+e+"]]></userName><passWord><![CDATA["+t+"]]></passWord></root></UserLogin></over>";return n},e.buildUserPlay=function(e){var t="<UserPlay><root><angle><![CDATA["+e+"]]></angle></root></UserPlay></over>";return t},e.buildUserSpeed=function(e){var t="<UserSpeed><root><speed><![CDATA["+e+"]]></speed></root></UserSpeed></over>";return t},e}();e.SendXmlHelper=t,__reflect(t.prototype,"GreedySnakesController.socketdata.SendXmlHelper")}(t=e.socketdata||(e.socketdata={}))}(GreedySnakesController||(GreedySnakesController={}));var GreedySnakesController;!function(e){var t;!function(e){var t=function(){function e(){}return e.getNodeValue=function(e){var t="",n=e.children[0];return null!=n&&void 0!=n&&(t=n.text),t},e.isLoginInfoXml=function(e){var t=new Array,n="";t.push("LoginSuccess");for(var r=e.children,i=null,o=null,a=null,l=0;l<r.length;l++)if(o=r[l],null!=o&&void 0!=o&&(i=o.children,i.length>0))for(var s=0;s<i.length;s++)a=i[s],null!=a&&void 0!=a&&1==a.nodeType?"success"==a.name&&(n=this.getNodeValue(a),t.push(n)):console.log("xml解析失败");return t},e.isPlayInfoXml=function(e){var t=new Array,n="";t.push("PlayAngle");for(var r=e.children,i=null,o=null,a=null,l=0;l<r.length;l++)if(o=r[l],null!=o&&void 0!=o&&(i=o.children,i.length>0))for(var s=0;s<i.length;s++)a=i[s],null!=a&&void 0!=a&&1==a.nodeType?"angle"==a.name&&(n=this.getNodeValue(a),t.push(n)):console.log("xml解析失败");return t},e.dateHelper=function(e){var t=null,n=egret.XML.parse(e);if(null!=n&&void 0!=n){var r=n.name,i=n.children.length>0?!0:!1;i&&("LoginSuccess"==r?t=this.isLoginInfoXml(n):"PlayAngle"==r&&(t=this.isPlayInfoXml(n)))}return t},e}();e.XmlDataHelper=t,__reflect(t.prototype,"GreedySnakesController.socketdata.XmlDataHelper")}(t=e.socketdata||(e.socketdata={}))}(GreedySnakesController||(GreedySnakesController={}));var GreedySnakesController;!function(e){var t;!function(e){var t=function(e){function t(){var t=e.call(this)||this;return t.loginBtn=null,t.addEventListener(egret.Event.ADDED_TO_STAGE,t.init,t),t}return __extends(t,e),t.prototype.init=function(){var e=new egret.Shape;e.graphics.beginFill(13426943),e.graphics.drawRect(0,0,this.stage.stageWidth,this.stage.stageHeight),e.graphics.endFill(),this.addChild(e);var t=new eui.Label;t.text="账号:",t.height=40,t.verticalAlign=egret.VerticalAlign.MIDDLE,t.x=(this.stage.stageWidth-300)/2-t.width-10,t.y=200,this.addChild(t);var n=new egret.TextField;this.usernameInput=n,n.text="输入账号",n.size=20,n.textColor=11786751,n.type=egret.TextFieldType.INPUT,n.background=!0,n.width=300,n.height=40,n.verticalAlign=egret.VerticalAlign.MIDDLE,n.x=(this.stage.stageWidth-this.usernameInput.width)/2,n.y=200,this.addChild(this.usernameInput);var r=new eui.Label;r.text="密码:",r.height=40,r.verticalAlign=egret.VerticalAlign.MIDDLE,r.x=(this.stage.stageWidth-300)/2-r.width-10,r.y=300,this.addChild(r);var i=new egret.TextField;this.passwordInput=i,i.text="输入密码",i.size=20,i.type=egret.TextFieldType.INPUT,i.textColor=11786751,i.displayAsPassword=!0,i.background=!0,i.backgroundColor=15921906,i.verticalAlign=egret.VerticalAlign.MIDDLE,i.width=300,i.height=40,i.x=(this.stage.stageWidth-this.passwordInput.width)/2,i.y=300,this.addChild(this.passwordInput);var o=this.loginBtn;null==o&&(o=new eui.Button,this.loginBtn=o,o.label="登录",o.x=this.stage.stageWidth/2-o.width/2,o.y=this.stage.stageHeight/2-o.height/2+300,this.addChild(o))},t.prototype.addConnectBtnEventListener=function(e,t,n){this.loginBtn&&this.loginBtn.addEventListener(e,t,n)},t.prototype.getusernameInput=function(){return this.usernameInput.text},t.prototype.getpasswordInput=function(){return this.passwordInput.text},t}(egret.DisplayObjectContainer);e.Login=t,__reflect(t.prototype,"GreedySnakesController.engine.Login")}(t=e.engine||(e.engine={}))}(GreedySnakesController||(GreedySnakesController={}));var GreedySnakesController;!function(e){var t;!function(e){var t=function(){function e(){}return e.trim=function(t){return e.rtrim(e.ltrim(t))},e.ltrim=function(e){var t=/^\s*/;return e.replace(t,"")},e.rtrim=function(e){var t=/\s*$/;return e.replace(t,"")},e}();e.ChatUtil=t,__reflect(t.prototype,"GreedySnakesController.util.ChatUtil")}(t=e.util||(e.util={}))}(GreedySnakesController||(GreedySnakesController={}));