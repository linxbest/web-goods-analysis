/** 
 * 注：本模块目前暂时针对 
 * 	   https://www.fashionnova.com/collections/new 
 *     进行测试数据采集，暂时不支持其他网站后续会慢慢补充和加强通用能力
 */
(function() {
	console.log('content script start!');
	createOnRequest();// 创建监听消息事件
})();

function getGoods() {
	let nodeList = document.querySelectorAll('.collection-list__product-tile');
	let goods = [];
	for (let nodeItem of nodeList) {
		goods.push({
			cover: getItemCover(nodeItem),
			title: getItemTitle(nodeItem),
			price: getItemPriceNum(nodeItem),
		})
	}
	return goods.sort((prev, next) => prev.price > next.price);
}

function getItemTitle(nodeItem) {
	const $item = nodeItem.querySelector('.product-tile__product-title')
	return $item? $item.innerText : '';
}

function getItemCover(nodeItem) {
	const $img = nodeItem.querySelector('.product-tile__image')
	return $img? $img.getAttribute('src') : '';
}

function getItemPriceNum(nodeItem) {
	const $money = nodeItem.querySelector('.money');
	const money = $money? $money.innerText : '';
	return window.parseFloat(money.replace('$', '')) || 0
}

function createOnRequest() {
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			// 收到消息目前暂时不做分析处理，统一执行获取商品信息
			let goodsList = getGoods();
			sendResponse(goodsList)
	  });	  
}