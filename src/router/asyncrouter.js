export default [
   

       //概况
  {
    path: '/home',
    component: () => import('@/views/home/home.vue'),
    redirect: '/home/content',
    meta: {
        title: '概况',
        icon:'el-icon-menu'
    },
    children: [
        {
            path: 'content',
            component: () => import('@/views/home/ConTent.vue'),
            meta: {
                title: '实时概况',
            },
        },

    ]

},
    //会员管理
    {
        path: '/member',
        component: () => import('@/views/home/home.vue'),
        // redirect:'/member/memberselect',
        meta: {
            title: '会员管理',
            icon:'el-icon-user'
        },
        children: [
            {
                path: 'memberselect',
                component: () => import('@/views/member/Memberselect.vue'),
                meta: {
                    title: '会员查询',
                },
                children:[
                    {
                        path: 'details',
                        component: () => import('@/views/member/secondary/Details.vue'),
                        meta: {
                            title: '会员详情',
                        },
                    },
                ]
            },
            {
                path: 'moneycard',
                component: () => import('@/views/member/MoneyCard.vue'),
                meta: {
                    title: '省钱卡',
                }
            },
            {
                path: 'membergrade',
                component: () => import('@/views/member/Membergrade.vue'),
                meta: {
                    title: '会员等级',
                },
            },
            {
                path: 'vipcard',
                component: () => import('@/views/member/vipcard.vue'),
                meta: {
                    title: '付费会员卡',
                },
            }
        ]


    },
    //订单管理
    {
        path: '/order',
        component: () => import('@/views/home/home.vue'),
        redirect:'/order/orderselect',
        meta: {
            title: '订单管理',
            icon:'el-icon-s-order'
        },
        children: [
            {
                path: 'orderselect',
                component: () => import('@/views/order/orderselect.vue'),
                meta: {
                    title: '订单查询',
                },
            },
            
        ]
    },
     //营销
     {
        path: '/marketing',
        component: () => import('@/views/home/home.vue'),
        redirect:'/marketing/discount',
        meta: {
            title: '营销',
            icon:'el-icon-s-custom'
        },
        children: [
            {
                path: 'discount',
                component: () => import('@/views/marketing/discount.vue'),
                meta: {
                    title: '限时折扣',
                },
            },
            {
                path: 'seckill',
                component: () => import('@/views/marketing/seckill.vue'),
                meta: {
                    title: '秒杀',
                },
            },
            
        ]
    },
     //资产
     {
        path: '/assets',
        component: () => import('@/views/home/home.vue'),
        redirect:'/assets/shopbaance',
        meta: {
            title: '资产',
            icon:'el-icon-s-finance'
        },
        children: [
            {
                path: 'shopbaance',
                component: () => import('@/views/property/shopbalance.vue'),
                meta: {
                    title: '店铺余额',
                },
            },
            {
                path: 'recharge',
                component: () => import('@/views/property/recharge.vue'),
                meta: {
                    title: '充值',
                },
            },
            {
                path: 'wangeditor',
                component: () => import('@/views/property/wangeditor.vue'),
                meta: {
                    title: '富文本编辑器',
                },
            },
          
            
        ]
    },
         //数据分析
 {
    path: '/information',
    component: () => import('@/views/home/home.vue'),
    redirect:'/information/dataoverview',
    meta: {
        title: '数据分析',
        icon:'el-icon-s-data'
    },
    children: [
        {
            path: 'dataoverview',
            component: () => import('@/views/shujufenxi/dataoverview.vue'),
            meta: {
                title: '数据概况',
            },
        },
        {
            path: 'trafficoverview',
            component: () => import('@/views/shujufenxi/trafficoverview.vue'),
            meta: {
                title: '流量分析',
            },
        },
        
    ]
},
 //设置
 {
    path: '/settings',
    component: () => import('@/views/home/home.vue'),
    redirect:'/settings/storemsg',
    meta: {
        title: '设置',
        icon:'el-icon-s-tools'
    },
    children: [
        {
            path: 'storemsg',
            component: () => import('@/views/settings/storemsg.vue'),
            meta: {
                title: '店铺信息',
            },
        },
        {
            path: 'mymsg',
            component: () => import('@/views/settings/mymsg.vue'),
            meta: {
                title: '个人信息',
            },
        },
        
    ]
},
]