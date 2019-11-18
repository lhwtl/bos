import Mock from 'mockjs' //引入mockjs，npm已安装
import loginInfo from '@/mock/json/login-mock.js'

//全局设置：设置所有ajax请求的超时时间，模拟网络传输耗时
 Mock.setup({
	// timeout: 400  //延时400s请求到数据
	timeout: 200 - 400 //延时200-400s请求到数据
})

let  url="http://localhost/login"
Mock.mock(url, "post", {loginInfo})
