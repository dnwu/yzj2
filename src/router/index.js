import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import AirCargoServices from '@/views/Product/AirCargoServices/AirCargoServices'
import Haihang from '@/views/Product/AirCargoServices/Haihang'
import Spa_truck from '@/views/Product/AirCargoServices/Spa_truck'
import Make_up from '@/views/Product/AirCargoServices/Make_up'
import Class from '@/views/Product/AirCargoServices/Class'
import Goods_server from '@/views/Product/AirCargoServices/Goods_server'
import Contract from '@/views/Product/AirCargoServices/Contract'
import EntrepotServices from '@/views/Product/EntrepotServices/EntrepotServices'
import ManagerServices from '@/views/Product/ManagerServices/ManagerServices'
import FinanceServices from '@/views/Product/FinanceServices/FinanceServices'
import SmartServices from '@/views/Product/SmartServices/SmartServices'
import AirCompany from '@/views/Resource/AirCompany'
import AirwayResource from '@/views/Resource/AirwayResource'
import AirModelResource from '@/views/Resource/AirModelResource'
import EntrepotResource from '@/views/Resource/EntrepotResource'
import CooperativePartner from '@/views/Resource/CooperativePartner'
import TCElectronics from '@/views/Success/3CElectronics'
import HealthCare from '@/views/Success/HealthCare'
import FreshProduce from '@/views/Success/FreshProduce'
import FMCG from '@/views/Success/FMCG'
import Deliver from '@/views/Service/Deliver'
import Order from '@/views/Service/Order'
import Price from '@/views/Service/Price'
import Range from '@/views/Service/Range'
import Standard from '@/views/Service/Standard/Standard'
import More from '@/views/Service/More'
import Company from '@/views/About/Company'
import News from '@/views/About/News/News'
import Promotion from '@/views/About/Promotion'
import Member from '@/views/About/Member'
import Join from '@/views/About/Join'

import store from '@/store'
import PIndex from '@/views/Center/Online_product/product_index'
import productWrite from '@/views/Center/Online_product/product_write'
import productComplete from '@/views/Center/Online_product/product_complete'
import * as types from '@/store/mutation-type'

const LoginIndex = () => import ('@/views/Login/Login')
const Login = () => import ('@/views/Login/Login/Login')
const Register = () => import ('@/views/Login/register/register')
const Error = () => import ('@/views/Login/Error/Error')
const Success = () => import ('@/views/Login/Success/Success')

const Index = () => import ('@/views/Index/Index')
const Order_track_home = () => import ('@/views/Index/Order_track_home/Order_track_home')
const Service = () => import ('@/views/Service/Service')
const About = () => import ('@/views/About/About')
const NewsDetail = () => import ('@/views/About/NewsDetail/NewsDetail')
const Center = () => import ('@/views/Center/Center')
const Account = () => import ('@/views/Center/Account/Account')
const Personal = () => import ('@/views/Center/Personal/Personal')
const Company_info = () => import ('@/views/Center/Company_info/Company_info')
const Doings = () => import ('@/views/Center/Doings/Doings')
const Experience = () => import ('@/views/Center/Experience/Experience')
const Integral = () => import ('@/views/Center/Integral/Integral')
const Address = () => import ('@/views/Center/Address/Address')
const Son_account = () => import ('@/views/Center/Son_account/Son_account')
const Online_product = () => import ('@/views/Center/Online_product/Online_product')
const Online_write = () => import ('@/views/Center/Online_write/Online_write')
const Online_check = () => import ('@/views/Center/Online_check/Online_check')
const Online_order_s = () => import ('@/views/Center/Online_order_s/Online_order_s')
const Online_pay_s = () => import ('@/views/Center/Online_pay_s/Online_pay_s')
const Client_product = () => import ('@/views/Center/Client_product/Client_product')
const Jinpeng_client = () => import ('@/views/Center/Jinpeng_Client/Jinpeng_client')
const Order_search = () => import ('@/views/Center/Order_search/Order_search')
const Order_detail = () => import ('@/views/Center/Order_detail/Order_detail')
const Order_track = () => import ('@/views/Center/Order_track/Order_track')
const Order_track_index = () => import ('@/views/Center/Order_track_index/Order_track_index')
const Ticket_info_egis = () => import ('@/views/Center/Ticket_info_egis/Ticket_info_egis')
const Bill_look = () => import ('@/views/Center/Bill_look/Bill_look')
const My_finance = () => import ('@/views/Center/My_finance/My_finance')
const Change_password = () => import ('@/views/Center/Change_password/Change_password')

// 供应商组件
const SupplierIndex = () => import('@/views/Supplier/Supplier')
const Supplier_Account = () => import('@/views/Supplier/Account/Account')
const Supplier_Company_info = () => import('@/views/Supplier/Company_info/Company_info')
const Supplier_Server_info = () => import('@/views/Supplier/Server_info/Server_info')
const Supplier_Son_account = () => import('@/views/Supplier/Son_account/Son_account')
const Supplier_Order_taking = () => import('@/views/Supplier/Order_taking/Order_taking')
const Supplier_Order_deal = () => import('@/views/Supplier/Order_deal/Order_deal')
const Supplier_Order_track = () => import('@/views/Supplier/Order_track/Order_track')
const Supplier_Booking_space = () => import('@/views/Supplier/Booking_space/Booking_space')
const Supplier_Making_bill = () => import('@/views/Supplier/Making_bill/Making_bill')
const Supplier_Airlift = () => import('@/views/Supplier/Airlift/Airlift')
const Supplier_Land_transport = () => import('@/views/Supplier/Land_transport/Land_transport')
const Supplier_Airport_operation = () => import('@/views/Supplier/Airport_operation/Airport_operation')
const Supplier_Value_add = () => import('@/views/Supplier/Value_add/Value_add')

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/home/order_track_home',
          name: 'order_track_home',
          component: Order_track_home
        },
        {
          path: '/product/airCargoServices',
          name: 'product/airCargoServices',
          component: AirCargoServices,
          redirect: '/product/airCargoServices/haihang'
        }, {
          // path: '/product/airCargoServices/domestic', name:
          // 'product/airCargoServices/domestic',
          path: '/product/airCargoServices/haihang',
          name: 'product/airCargoServices/haihang',
          component: Haihang
        }, {
          // path: '/product/airCargoServices/international', name:
          // 'product/airCargoServices/international',
          path: '/product/airCargoServices/spa_truck',
          name: 'product/airCargoServices/spa_truck',
          component: Spa_truck
        }, {
          // path: '/product/airCargoServices/normal', name:
          // 'product/airCargoServices/normal',
          path: '/product/airCargoServices/make_up',
          name: 'product/airCargoServices/make_up',
          component: Make_up
        }, {
          // path: '/product/airCargoServices/heavy', name:
          // 'product/airCargoServices/heavy',
          path: '/product/airCargoServices/class',
          name: 'product/airCargoServices/class',
          component: Class
        }, {
          // path: '/product/airCargoServices/codeChain', name:
          // 'product/airCargoServices/codeChain',
          path: '/product/airCargoServices/goods_server',
          name: 'product/airCargoServices/goods_server',
          component: Goods_server
        }, {
          // path: '/product/airCargoServices/danger', name:
          // 'product/airCargoServices/danger',
          path: '/product/airCargoServices/contract',
          name: 'product/airCargoServices/contract',
          component: Contract
        }, {
          path: '/product/entrepotServices',
          name: 'product/entrepotServices',
          component: EntrepotServices
        }, {
          path: '/product/managerServices',
          name: 'product/managerServices',
          component: ManagerServices
        }, {
          path: '/product/financeServices',
          name: 'product/financeServices',
          component: FinanceServices
        }, {
          path: '/product/smartServices',
          name: 'product/smartServices',
          component: SmartServices
        }, {
          path: '/resource/airCompany',
          name: 'resource/airCompany',
          component: AirCompany
        }, {
          path: '/resource/airwayResource',
          name: 'resource/airwayResource',
          component: AirwayResource
        }, {
          path: '/resource/airModelResource',
          name: 'resource/airModelResource',
          component: AirModelResource
        }, {
          path: '/resource/entrepotResource',
          name: 'resource/entrepotResource',
          component: EntrepotResource
        }, {
          path: '/resource/cooperativePartner',
          name: 'resource/cooperativePartner',
          component: CooperativePartner
        }, {
          path: '/success/3CElectronics',
          name: 'success/3CElectronics',
          component: TCElectronics
        }, {
          path: '/success/healthCare',
          name: 'success/healthCare',
          component: HealthCare
        }, {
          path: '/success/freshProduce',
          name: 'success/freshProduce',
          component: FreshProduce
        }, {
          path: '/success/FMCG',
          name: 'success/FMCG',
          component: FMCG
        }, {
          path: '/service',
          name: 'service',
          component: Service,
          redirect: '/service/standard',
          children: [
            {
              path: '/service/deliver',
              name: 'service/deliver',
              component: Deliver
            }, {
              path: '/service/order',
              name: 'service/order',
              component: Order
            }, {
              path: '/service/price',
              name: 'service/price',
              component: Price
            }, {
              path: '/service/range',
              name: 'service/range',
              component: Range
            }, {
              path: '/service/standard',
              name: 'service/standard',
              component: Standard
            }, {
              path: '/service/more',
              name: 'service/more',
              component: More
            }
          ]
        }, {
          path: '/about',
          name: 'about',
          component: About,
          children: [
            {
              path: '/about/company',
              name: 'about/company',
              component: Company,
              redirect: '/about/news'
            }, {
              path: '/about/news',
              name: 'about/news',
              component: News
            }, {
              path: '/about/news/:id',
              name: 'about/news/id',
              component: NewsDetail
            }, {
              path: '/about/member',
              name: 'about/member',
              component: Member,
              // redirect: '/about/news'
            }, {
              path: '/about/join',
              name: 'about/join',
              component: Join,
              // redirect: '/about/news'
            }
          ]
        }, {
          path: '/promotion',
          name: 'promotion',
          component: Promotion
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: LoginIndex,
      redirect: '/login/login',
      children: [
        {
          path: '/login/login',
          component: Login,
          name: 'login/login'
        }, {
          path: '/login/register',
          name:'login/register',
          component: Register
        }, {
          path: '/login/success',
          component: Success
        }, {
          path: '/login/error',
          component: Error
        }
      ]
    }, {
      path: '/center',
      name: 'center',
      component: Center,
      redirect: '/center/account',
      children: [
        {
          path: '/center/account',
          component: Account,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/change_password',
          component: Change_password,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/personal',
          component: Personal,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/company_info',
          component: Company_info,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/doings',
          component: Doings,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/experience',
          component: Experience,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/integral',
          component: Integral,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/address',
          component: Address,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/son_account',
          component: Son_account,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/online_product',
          component: Online_product,
          children: [
            {
              path: '/center/online_product',
              component: PIndex,
              meta:{
                keepAlive:true
              }
            },
            {
              path: '/center/online_product/write',
              component: productWrite,
              meta:{
                keepAlive:false
              }
            },
            {
              path: '/center/online_product/complete',
              component: productComplete,
              meta:{
                keepAlive:false
              }
            }
          ],
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/online_write',
          component: Online_write,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/online_check',
          component: Online_check,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/online_order_s',
          component: Online_order_s,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/online_pay_s',
          component: Online_pay_s,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/client_product',
          component: Client_product,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/order_search',
          component: Order_search,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/order_detail',
          component: Order_detail,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/order_track',
          component: Order_track,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/order_track_index',
          component: Order_track_index,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        },{
          path: '/center/ticket_info_egis',
          component: Ticket_info_egis,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }, {
          path: '/center/bill_look',
          component: Bill_look,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'personal'
          }
        }
      ]
    },{
      path:'/supplier',
      name:'supplier',
      component:SupplierIndex,
      redirect:'/supplier/account',
      children:[
        {
          path:'/supplier/account',
          component:Supplier_Account,
          name:'supplier/account',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/company_info',
          component:Supplier_Company_info,
          name:'supplier/company_info',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/server_info',
          component:Supplier_Server_info,
          name:'supplier/server_info',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/son_account',
          component:Supplier_Son_account,
          name:'supplier/son_account',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/order_deal',
          component:Supplier_Order_deal,
          name:'supplier/order_deal',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/order_track',
          component:Supplier_Order_track,
          name:'supplier/order_track',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/order_taking',
          component:Supplier_Order_taking,
          name:'supplier/order_taking',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/booking_space',
          component:Supplier_Booking_space,
          name:'supplier/booking_space',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/making_bill',
          component:Supplier_Making_bill,
          name:'supplier/making_bill',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/airlift',
          component:Supplier_Airlift,
          name:'supplier/airlift',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/land_transport',
          component:Supplier_Land_transport,
          name:'supplier/land_transport',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/airport_operation',
          component:Supplier_Airport_operation,
          name:'supplier/airport_operation',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        },
        {
          path:'/supplier/value_add',
          component:Supplier_Value_add,
          name:'supplier/value_add',
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
            usertype:'company' // 添加字段，判断用户权限
          }
        }
      ]
    }
  ]
});

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  // window.localStorage.setItem("usertype", usertype);
  store.commit(types.SET_USERNAME, window.localStorage.getItem('username'))
  store.commit(types.SET_TOKEN, window.localStorage.getItem('token'))
  store.commit(types.SET_USERTYPE, window.localStorage.getItem('usertype'))
  store.commit(types.SET_ID, window.localStorage.getItem('id'))
}

router.beforeEach((to, from, next) => {
  // console.log('from',from);
  // console.log('usertype',to.meta.usertype);
  // console.log('storeusertype',store.state.usertype);
  if (to.meta.requireAuth) {
    // 判断是否需要登录
    if (store.state.token) {
      // console.log(store.state.usertype,to.meta.usertype);
      if(store.state.usertype === to.meta.usertype){
        next();
      }else{
        next({path: from.fullPath})
      }
    } else {
      next({path: '/login'});
    }
  } else {
    next();
  }
});

export default router;
