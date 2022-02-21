/** 
 *	本模块尚未完成功能：
 *	1.全屏显示
 *	2.页面截图
 *	3.popup.html样式及内容填充
 */

$(function() {
	console.log('popupjs start!')
	fetchGoodsInfo(); // 向content script发送请求获取商品信息
	getScreenshot(); // 获取页面截图（暂未完成）
});

function getScreenshot() {
	// alert('执行截图')
	// chrome.desktopCapture.chooseDesktopMedia(
	//     "screen",
	//     '',
	//     function (res) {
	//         console.log(res)
		
	//     },
	//   )
	chrome.tabs.captureVisibleTab({
        format: "png"
    }, function(capture) {
		console.log("截图结果",capture)
        // alert('截图数据'+capture)
        
    })
}

function fetchGoodsInfo() {
	chrome.tabs.query(
		{active: true, currentWindow: true}, 
		function(tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id, 
			    { name: "getGoods" }, 
			    function(response) {
					let list = response;
					let total = list.length;
					console.log('商品总数', total)
					console.log('最高价格商品', list[0])
					console.log('最低价格商品', list[total-1])
				});
		});
}
