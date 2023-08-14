/**
 * 发送构造器
 */
module GreedySnakesController.socketdata {
    export class SendXmlHelper {
        public constructor() {

		}

		//构造登录字符串 DOM构造为 userLogin + root + 信息 共三层
		public static buildUserLoginXml(userName: string, pwl: string): string {
			let res: string = "<UserLogin><root>"
				+ "<userName><![CDATA[" + userName + "]]></userName>"
				+ "<passWord><![CDATA[" + pwl + "]]></passWord>"
				+ "</root></UserLogin></over>";
			return res;
		}

		// 构造传输的角度
		public static buildUserPlay(angle: number): string{
			let res: string = "<UserPlay><root>"
				+ "<angle><![CDATA[" + angle + "]]></angle>"
				+ "</root></UserPlay></over>";
			return res;
		}

		// 改变速度
		public static buildUserSpeed(speed: number): string{
			let res: string = "<UserSpeed><root>"
				+ "<speed><![CDATA[" + speed + "]]></speed>"
				+ "</root></UserSpeed></over>";
			return res;
		}


    }

}