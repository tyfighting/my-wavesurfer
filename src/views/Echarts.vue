<template>
	<div class="echarts">
		<div ref="main" class="main"></div>
		<div class="content" v-if="selectText !== ''">
			选中的区域是{{ selectText }}
		</div>
	</div>
</template>

<script>
const echarts = require('echarts');
import usaJson from '../config/echartsMapIndia';
export default {
	data() {
		return {
			selectText: '',
			myChart: null
		};
	},
	mounted() {
		this.initMap();
	},
	methods: {
		init() {
			// 基于准备好的dom，初始化echarts实例
			const myChart = echarts.init(this.$refs['main']);
			// 绘制图表
			myChart.setOption({
				title: {
					text: 'ECharts 入门示例'
				},
				tooltip: {},
				xAxis: {
					data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
				},
				yAxis: {},
				series: [
					{
						name: '销量',
						type: 'bar',
						data: [5, 20, 36, 10, 10, 20]
					}
				]
			});
			myChart.on('click', function(params) {
				// 控制台打印数据的名称
				console.log(params.name);
			});
		},
		initMap() {
			this.myChart = echarts.init(this.$refs['main']);
			console.log(usaJson.features.length);
			usaJson.features.map((item, index) => {
				item.id = index + 1 + '';
				item.geometry.coordinates.map(arr => {
					arr.map((geo, number) => {
						if (typeof geo === 'object') {
							geo.map((geo1, number1) => {
								geo[number1] = geo1 / 1000;
							});
						} else {
							arr[number] = geo / 1000;
						}
					});
				});
			});
			console.log(usaJson);
			echarts.registerMap('USA', usaJson, {
				Alaska: {
					// 把阿拉斯加移到美国主大陆左下方
					left: -131,
					top: 25,
					width: 15
				},
				Hawaii: {
					left: -110, // 夏威夷
					top: 28,
					width: 5
				},
				'Puerto Rico': {
					// 波多黎各
					left: -76,
					top: 26,
					width: 2
				}
			});
			const option = {
				//右上角title
				title: {
					text: 'USA Population Estimates (2012)',
					// subtext: "Data from www.census.gov",
					// sublink: "http://www.census.gov/popest/data/datasets.html",
					left: 'right'
				},
				tooltip: {
					trigger: 'item',
					showDelay: 0,
					transitionDuration: 0.2,
					formatter: function(params) {
						var value = (params.value + '').split('.');
						value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
						return params.seriesName + '<br/>' + params.name + ': ' + value;
					}
				},
				visualMap: {
					left: 'right',
					min: 500000,
					max: 38000000,
					inRange: {
						color: [
							'#313695',
							'#4575b4',
							'#74add1',
							'#abd9e9',
							'#e0f3f8',
							'#ffffbf',
							'#fee090',
							'#fdae61',
							'#f46d43',
							'#d73027',
							'#a50026'
						]
					},
					text: ['High', 'Low'], // 文本，默认为数值文本
					calculable: true
				},
				//左上角保存图片等
				// toolbox: {
				// 	show: true,
				// 	//orient: 'vertical',
				// 	left: "left",
				// 	top: "top",
				// 	feature: {
				// 		dataView: { readOnly: false },
				// 		restore: {},
				// 		saveAsImage: {}
				// 	}
				// },
				series: [
					{
						name: 'USA PopEstimates',
						type: 'map',
						roam: true,
						map: 'USA',
						emphasis: {
							label: {
								show: true
							}
						},
						// 文本位置修正
						textFixed: {
							Alaska: [20, -20]
						},
						data: [
							{ name: 'Alabama', value: 4822023 },
							{ name: 'Alaska', value: 731449 },
							{ name: 'Arizona', value: 6553255 },
							{ name: 'Arkansas', value: 2949131 },
							{ name: 'California', value: 38041430 },
							{ name: 'Colorado', value: 5187582 },
							{ name: 'Connecticut', value: 3590347 },
							{ name: 'Delaware', value: 917092 },
							{ name: 'District of Columbia', value: 632323 },
							{ name: 'Florida', value: 19317568 },
							{ name: 'Georgia', value: 9919945 },
							{ name: 'Hawaii', value: 1392313 },
							{ name: 'Idaho', value: 1595728 },
							{ name: 'Illinois', value: 12875255 },
							{ name: 'Indiana', value: 6537334 },
							{ name: 'Iowa', value: 3074186 },
							{ name: 'Kansas', value: 2885905 },
							{ name: 'Kentucky', value: 4380415 },
							{ name: 'Louisiana', value: 4601893 },
							{ name: 'Maine', value: 1329192 },
							{ name: 'Maryland', value: 5884563 },
							{ name: 'Massachusetts', value: 6646144 },
							{ name: 'Michigan', value: 9883360 },
							{ name: 'Minnesota', value: 5379139 },
							{ name: 'Mississippi', value: 2984926 },
							{ name: 'Missouri', value: 6021988 },
							{ name: 'Montana', value: 1005141 },
							{ name: 'Nebraska', value: 1855525 },
							{ name: 'Nevada', value: 2758931 },
							{ name: 'New Hampshire', value: 1320718 },
							{ name: 'New Jersey', value: 8864590 },
							{ name: 'New Mexico', value: 2085538 },
							{ name: 'New York', value: 19570261 },
							{ name: 'North Carolina', value: 9752073 },
							{ name: 'North Dakota', value: 699628 },
							{ name: 'Ohio', value: 11544225 },
							{ name: 'Oklahoma', value: 3814820 },
							{ name: 'Oregon', value: 3899353 },
							{ name: 'Pennsylvania', value: 12763536 },
							{ name: 'Rhode Island', value: 1050292 },
							{ name: 'South Carolina', value: 4723723 },
							{ name: 'South Dakota', value: 833354 },
							{ name: 'Tennessee', value: 6456243 },
							{ name: 'Texas', value: 26059203 },
							{ name: 'Utah', value: 2855287 },
							{ name: 'Vermont', value: 626011 },
							{ name: 'Virginia', value: 8185867 },
							{ name: 'Washington', value: 6897012 },
							{ name: 'West Virginia', value: 1855413 },
							{ name: 'Wisconsin', value: 5726398 },
							{ name: 'Wyoming', value: 576412 },
							{ name: 'Puerto Rico', value: 3667084 }
						]
					}
				]
			};
			this.myChart.setOption(option);
			this.myChart.on('click', params => {
				// 控制台打印数据的名称
				console.log(params);
				this.$nextTick(() => {
					this.selectText = params.name;
					console.log(this.selectText);
				});
				// this.$set("selectText", params.name);
			});
		}
	}
};
</script>
<style scoped>
.main {
	height: 300px;
	width: 100%;
}
</style>
