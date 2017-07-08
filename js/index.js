//定义工具方法
var Util = {
	//获取模板内容
	tpl:function(id){
		return document.getElementById(id).innerHTML;
	},

	//获取一部数据方法
	ajax:function(url,fn){
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			//监听readystatechange
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					fn && fn(JSON.parse(xhr.responseText))
				}
			}
		}
		xhr.open('GET',url,true);
		xhr.send(null);
	}
}
// //测试
// Util.ajax('data/home.json',function(res){
// 	console.log(res,123)
// })
Vue.filter('itemPrice',function(str){
	return '¥' + str;
})
Vue.filter('itemOrigin',function(str){
	return str + '.00'
})



//首页组件
var home = Vue.component('home',{
	template: Util.tpl('tpl_home'),
	//绑定数据
	data:function(){
		return {
				
				img_top_line:{"img":"04.jpg"},
				img:           [
								{"id":1, "img":"05.jpg"},
								{"id":1, "img":"06.jpg"},
								{"id":1, "img":"07.jpg"},
								{"id":1, "img":"08.jpg"},	
				],
				img_new:         {"img":"09.jpg"},
				img_new_list:  [
								{"id":1, "img":"10.jpg"},
								{"id":1, "img":"11.jpg"},
								{"id":1, "img":"12.jpg"},
								{"id":1, "img":"13.jpg"}
				],
				img_hot:        {"img":"14.jpg"},

				img_hot_list:  [
								{"id":1, "img":"15.jpg"},
								{"id":1, "img":"16.jpg"},
								{"id":1, "img":"17.jpg"},
								{"id":1, "img":"18.jpg"},
								{"id":1, "img":"19.jpg"},
								{"id":1, "img":"20.jpg"}
				],
				img_iphone:     {"img":"21.jpg"},
				img_iphone_list:  [
								{"id":22, "img":"15.jpg"},
								{"id":23, "img":"16.jpg"},
								{"id":24, "img":"17.jpg"},
								{"id":25, "img":"18.jpg"},
								{"id":26, "img":"19.jpg"},
								{"id":27, "img":"20.jpg"}
				],
				ad:[],
				liat:[]
		}
	},
	methods:{
		active:function(){
			alert(this.data)
			
		}
	}

	});

//列表页组件
var list = Vue.component('list',{
	template:Util.tpl('tpl_list'),
	data:function(){
		return {
			data:[]
		}
	},
	//异步请求写在声明周期created方法中
	created:function(){
			var that = this;
			Util.ajax('data/list.json',function(res){
				if(res && res.data){
					that.data = res.data;
					
					// that.$set('list,res.data.list')
				}
			})
		}
	
});
var list2 = Vue.component('list2',{
	template:Util.tpl('tpl_list2'),
	data:function(){
		return {
			data:[]
		}
	},
	created:function(){
		var that = this;
		Util.ajax('data/list2.json',function(res){
				if(res && res.data){
					that.data = res.data;
					
					// that.$set('list,res.data.list')
				}
			})
	}
});
//详情页组件
var detail = Vue.component('detail',{
	template:Util.tpl('tpl_detail'),
	data:function(){
		return {
				title:[],
				img:[],
				 "top":"小米电动滑板车 成人/学生",
				 "price":"1999",
				 "msg":"【京东自营品质保证】小米( MI )米家 电动滑板车 代步车 折叠车",
				 "msg1":"小米滑板车新品上市 青春版性价比更高",
				 "white":"白条 【白条支付】首单立减5元",
				 "sales":"促销",
				 "salesspan":"限制",
				 "salesspan1":"此价格不与套餐优惠同时享受",
				 "discount":"优惠套装",
				 "discount1":"最高省70.0元",
				 show0:false,
				 show1:true,
				 show2:true
		}
	},
	methods:{
			clickchange:function(index){
			this.title.forEach(function(item,index){
				item.clickswitch = false;						
			});
			this.title[index].clickswitch = true;

			//显示隐藏详情页组件
					if(index === 0){
                        
                        this.show0 = false;
                        this.show1 = true;
                        this.show2 = true;
                    }else if(index === 1){
                        
                        this.show0 = true;
                        this.show1 = false;
                        this.show2 = true;
                    }else if(index === 2){

                        this.show0 = true;
                        this.show1 = true;
                        this.show2 = false;
                    }
                
            


		}
			
	},
	
	created:function(){
		var that = this;
		Util.ajax('data/product.json',function(res){
				if(res && res.title && res.img){
					that.title = res.title;
					that.img = res.img;
					// that.$set('list,res.data.list')

				}
			})
	},
	mounted:function(){
			var swiper = new Swiper('.swiper-container', {
	        pagination: '.swiper-pagination',
	        paginationClickable: true
    });
	}
});

//数据
var data = {
	title:[
			{"img":"home.jpg","name":"店铺首页","clickswitch":true,"link":"#/home/type/"},
			{"msg":"405","name":"全部商品","clickswitch":false,"link":"#/list/type/"},
			{"msg":"15","name":"上新","clickswitch":false,"link":"#/list2/type/"}
	],
	view:'home',
	changeshow:true
	
	//路由参数
};

//实例化对象
var vm = new Vue({
	el:'#app',
	data:data,
	methods:{
		clickchange:function(index){
			this.title.forEach(function(item,index){
				item.clickswitch = false;
			});
			this.title[index].clickswitch = true;
			

		}
	}

	
});



//定义路由方法
function route(){
	//获取hash
	var hash = location.hash;
	//删除#
	hash = hash.slice(1);
	hash= hash.replace(/^\//,''); //
	//切割hash字段
	hash = hash.split('/');
	if(hash[0] === 'detail'){
		
		vm.changeshow = false;

	}else{
		vm.changeshow = true;
	}
	var map = {
		home:true,
		list:true,
		detail:true,
		list2:true

	};

	//判断hash[0]是否可以切换
	if(map[hash[0]]){
		vm.view = hash[0];
	}else{
		//实现默认路由
		vm.view = 'home'
	}
	//路由参数保存参数中
	vm.query = hash.slice(1);
	// console.log(hash)
	
}
//绑定hashchange事件
window.addEventListener('hashchange',route)
//页面加载会触发load事件，此时要检测路由
window.addEventListener('load',route)

//滚动条
window.onload = function(){

var div_scroll = document.getElementById('scroll');
//判断滚动条是否超过屏幕高度的一般，超过的时候出现返回顶部导航
window.onscroll = function(){
	
	var t = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
	var h = document.documentElement.offsetHeight;
	if(t >= h/2){
		div_scroll.style.display = 'block';
	}else{
		div_scroll.style.display = 'none';
	}
}
//设置底部导航
div_scroll.onclick = function(){
	var t = window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop;
	var timer = setInterval(function(){
		t -= 160;
		if(t <= 0){
			t = 0;
			clearInterval(timer);
		}
		window.scrollTo(0, t);
	},16)





}
}
