import axios from './config'

// 登录
export function userLogin(data){
	return axios({
		url:'/login',
		method:'post',
		data
	})
}
//主页数据请求
export function homedate(){
	return axios({
		url:'/homedate',
		method:'get',
	
	})
}
export function homedatetwo(){
	return axios({
		url:'/homedatetwo',
		method:'get',
	
	})
}
//查询会员所有信息
export function member(params){
	return axios({
		url:'/member',
		method:'get',
		params
	})
}
//查询所有会员等级的信息
export function membergrade(){
	return axios({
		url:'/membergrade',
		method:'get',

	})
}
//查询所有省钱卡的信息
export function moneycard(){
	return axios({
		url:'/moneycard',
		method:'get',

	})
}
//查询会员输入框的信息
export function selectgrade(params){
	return axios({
		url:'/selectgrade',
		method:'get',
		params
	})
}
//查询会员等级的信息
export function selectmembergrade(params){
	return axios({
		url:'/selectmembergrade',
		method:'get',
		params
	})
}
//查询省钱卡的信息
export function selectcard(params){
	return axios({
		url:'/selectcard',
		method:'get',
		params
	})
}
//查询订单的信息
export function orderselect(params){
	return axios({
		url:'/orderselect',
		method:'get',
		params
	})
}
//查询订单状态的信息
export function selectstatus(params){
	return axios({
		url:'/selectstatus',
		method:'get',
		params
	})
}
//查询订单待付款的信息
export function paymentmoney(params){
	return axios({
		url:'/paymentmoney',
		method:'get',
		params
	})
}
//查询折扣的信息
export function disc(){
	return axios({
		url:'/disc',
		method:'get',

	})
}
//查询店家余额的信息
export function storemoney(){
	return axios({
		url:'/storemoney',
		method:'get',

	})
}
//查询店家充值的信息
export function storerecharge(){
	return axios({
		url:'/storerecharge',
		method:'get',

	})
}
//添加信息
export function addmember(data){
	return axios({
		url:'/addmember',
		method:'post',
		data
	})
}

//删除信息
export function delmember(data){
	return axios({
		url:'/delmember',
		method:'put',
		data
	})
}
//删除省钱卡信息
export function delcard(data){
	return axios({
		url:'/delcard',
		method:'put',
		data
	})
}
//编辑会员查询信息
export function editmember(data){
	return axios({
		url:'/editmember',
		method:'put',
		data
	})
}
//编辑会员等级信息
export function editgrade(data){
	return axios({
		url:'/editgrade',
		method:'put',
		data
	})
}
//编辑省钱卡信息
export function editcard(data){
	return axios({
		url:'/editcard',
		method:'put',
		data
	})
}
//编辑订单信息
export function editorder(data){
	return axios({
		url:'/editorder',
		method:'put',
		data
	})
}
export function upmember(data){
	return axios({
		url:'/upmember',
		method:'put',
		data
	})
}
export function goo(){
	return axios({
		url:'/member',
		method:'get',
	
	})
}