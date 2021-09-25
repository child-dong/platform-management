import {formatDate} from '../../../plugins/date.js'
export default {
    components: {
    },
    data() {
        return {
            allPeople: {},
            newPeople: [],
            postData: [],
            postAllData: 0,
            time1: new Date(),
            time2: new Date(),
            color: ['#DB2626', '#4B8EEA', '#21BAC8', '#EC9210', '#F0C50D']
        }
    },
    methods: {
        getInitData() {
            // 总人数
            this.$axios({
                url: '/backstage/api/home/registerTotalNum',
                method: 'get',
            }).then(response => {
                this.allPeople = response.data;
            });
            // 新注册用户
            this.$axios({
                url: '/backstage/api/home/queryNewUser',
                method: 'get',
            }).then(response => {
                this.newPeople = response.data;
            });
            // 发帖占比
            this.$axios({
               url: '/backstage/api/home/releaseNumber',
                method: 'get',
            }).then(response => {
                this.postData = [];
                for (let item of response.data) {
                    if (item.type !== '总数') {
                        this.postData.push({value: item.count, name: item.type})
                    } else {
                        this.postAllData = item.count
                    }
                }
                for (let item of this.postData) {
                    item.percent = (item.value / this.postAllData).toFixed(2) * 100 + "%"
                }
                this.makeChart1(this.postData);
            });
            this.getOnline();
            this.getTimeTrend();
        },
        // 在线人数
        getOnline() {
            this.$axios({
                url: `/backstage/api/home/queryOnlineNumber?dayTime=${formatDate(this.time1, 'YYYY-MM-DD')}`,
                method: 'get',
            }).then(response => {
                let data = [];
                let name = [];
                for (let item of response.data) {
                    data.push({value: item.onlineNum, name: item.time});
                    name.push(item.time)
                }
                this.makeChart2(data, name);
            });
        },
        // 注册、发帖时间
        getTimeTrend() {
            this.$axios({
                url: `/backstage/api/home/monthTotalNumber?monthTime=${formatDate(this.time2, 'YYYY-MM')}-01`,
                method: 'get',
            }).then(response => {
                let data = [];
                let data1 = [];
                let name = [];
                for (let item of response.data) {
                    const time = item.time.substr(item.time.length - 2, 2).replace(0, '');
                    data.push({value: item.userTotal, name: time});
                    item.total = item.careerPostTotal + item.talenRecruitmentTotal + item.waresRepairTotal + item.waresSellTotal + item.waresWanyBuyTotal;
                    data1.push({value: item.total, name: time});
                    name.push(time)
                }
                this.makeChart3(data, data1, name);
            });
        },
        // 占比
        makeChart1(data) {
            //this.$root => app
            let myChart = this.$echarts.init(document.getElementById("myChart"));
            const option = {
                color: this.color,
                tooltip: {
                    trigger: 'item',
                    formatter: (data) => {
                        const element = '<div style="background: #254877;border-radius: 6px;padding: 10px 30px 10px">' +
                                        '<p style="font-size: 24px;color: #fff;line-height: 33px">' + data.name + '</p>' +
                                        '<p style="font-size: 30px;color: #fff;line-height: 42px">' + data.value + '</p>' +
                                    '</div>';
                        return element;
                    },
                    padding: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: 'transparent'
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    top: 'center',
                    right: 82
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        center: ['30%', '50%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderWidth: 10,
                            borderColor: '#fff'
                        },
                        label: {
                            show: false,
                            position: 'center',
                            formatter: ['{one|{c}}', '{two|{b}}'].join('\n'),
                            rich: {
                                one: {
                                    color: 'red',
                                    lineHeight: 10
                                },
                                two: {
                                    backgroundColor: {
                                        image: 'xxx/xxx.jpg'
                                    },
                                    height: 40
                                }
                            }
                        },
                        emphasis: {
                            label: {
                                show: false
                            }
                        },
                        labelLine: {
                            show: false
                        },
                        data
                    }
                ]
            };
            // 绘制图表
            myChart.setOption(option);
        },
        // 在线人数
        makeChart2(data, name) {
            //this.$root => app
            let myChart = this.$echarts.init(document.getElementById("myChart2"));
            const option = {
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(255, 255, 255, 0.5)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(40 ,112, 240, 0.5)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        showContent: false
                    }
                },
                grid: {
                    show: false,
                    top: 30,
                    left: 55,
                    right: 28,
                    bottom: 55
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(120, 134, 153, 0.5)',
                            width: 2
                        }
                    },
                    axisTick: {
                      show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 24,
                        color: '#788699',
                        fontWeight: 400,
                        lineHeight: 33,
                        margin: 5
                    },
                    data: name
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(120, 134, 153, 0.5)',
                            width: 2
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: false,
                        fontSize: 24,
                        color: '#788699',
                        fontWeight: 400,
                        lineHeight: 33
                    },
                    splitLine: {
                        show: false
                    }
                },
                series: [{
                    data,
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    symbolSize: 18,
                    z: 9,
                    itemStyle: {
                    },
                    lineStyle: {
                        width: 3,
                        color: {
                            type: 'linear',
                            x: 0,
                            y: 0,
                            x2: 0,
                            y2: 1,
                            colorStops: [{
                                offset: 0, color: 'rgba(66, 131, 205, 1)' // 0% 处的颜色
                            }, {
                                offset: 1, color: 'rgba(92, 227, 247, 1)' // 100% 处的颜色
                            }],
                            global: false // 缺省为 false
                        },
                        shadowColor: 'rgba(67, 185, 212, 0.79)',
                        shadowOffsetY: 3,
                        shadowBlur: 6
                    },
                    emphasis: {
                        scale: false,
                        label: {
                            show: false,
                            align: 'center',
                            formatter: ['{one|{c}人}', '{two|{b}}'].join('\n'),
                            rich: {
                                one: {
                                    fontSize: 24,
                                    fontWeight: 600,
                                    color: '#fff',
                                    lineHeight: 33
                                },
                                two: {
                                    fontSize: 18,
                                    fontWeight: 400,
                                    color: '#fff',
                                    lineHeight: 25
                                }
                            }
                        }
                    }
                }]
            };
            // 绘制图表
            myChart.setOption(option);
        },
        // 注册、发贴人数
        makeChart3(data, data1, name) {
            //this.$root => app
            let myChart = this.$echarts.init(document.getElementById("myChart3"));
            const option = {
                tooltip: {
                    show: true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'none',
                    },
                    formatter: (data) => {
                        const element = '<div style="background: #254877;border-radius: 6px;padding: 10px 30px 10px">' +
                            '<p style="font-size: 30px;color: #fff;line-height: 42px">' + data[0].value + '</p>' +
                            '<p style="font-size: 30px;color: #fff;line-height: 42px">' + data[1].value + '</p>' +
                            '</div>';
                        return element;
                    },
                    padding: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    backgroundColor: 'transparent'
                },
                grid: {
                    show: false,
                    top: 36,
                    left: 110,
                    right: 44,
                    bottom: 64
                },
                legend: {
                    show: false,
                    data: ['注册', '发帖'],
                    left: 332,
                    itemWidth: 96,
                    itemHeight: 32
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(120, 134, 153, 0.5)',
                            width: 2
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 24,
                        color: '#788699',
                        fontWeight: 400,
                        lineHeight: 33,
                        margin: 14
                    },
                    splitLine: {
                      show: true,
                        lineStyle: {
                            type: 'dashed',
                            dashOffset: 5,
                            width: 2
                        }
                    },
                    data: name
                },
                yAxis: {
                    type: 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: 'rgba(120, 134, 153, 0.5)',
                            width: 2
                        }
                    },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        fontSize: 24,
                        color: '#363636',
                        fontWeight: 400,
                        lineHeight: 33
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            type: 'dashed',
                            dashOffset: 5,
                            width: 2
                        }
                    }
                },
                series: [
                    {
                        name: '注册',
                        data,
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        symbolSize: 18,
                        itemStyle: {
                            color: 'rgba(240, 197, 13, 1)'
                        },
                        lineStyle: {
                            width: 3,
                            color: 'rgba(240, 197, 13, 1)',
                            shadowColor: 'rgba(240, 197, 13, 1)',
                            shadowOffsetY: 3,
                            shadowBlur: 6
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(215, 122, 28, 0.5)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(215, 122, 28, 0)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    },
                    {
                        name: '发帖',
                        data: data1,
                        type: 'line',
                        smooth: true,
                        showSymbol: false,
                        symbolSize: 18,
                        itemStyle: {
                            color: '#5E1DD5'
                        },
                        lineStyle: {
                            width: 3,
                            color: '#5E1DD5',
                            shadowColor: 'rgba(94, 29, 213, 1)',
                            shadowOffsetY: 3,
                            shadowBlur: 6
                        },
                        areaStyle: {
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgba(172, 159, 205, 1)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: 'rgba(172, 159, 205, 0)' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        }
                    }
                ]
            };
            // 绘制图表
            myChart.setOption(option);
        }
    },

    mounted() {
        this.getInitData();
        this.makeChart2();
        this.makeChart3();
    }
}