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
import Login from '@/views/Login/Login'
import Register from '@/views/Login/Register'
import store from '@/store'

const Service = () => import ('@/views/Service/Service')
const About = () => import ('@/views/About/About')
const NewsDetail = () => import ('@/views/About/NewsDetail/NewsDetail')
const Center = () => import ('@/views/Center/Center')
const Account = () => import ('@/views/Center/Account/Account')
const Personal = () => import ('@/views/Center/Personal/Personal')
const Company_info = () => import ('@/views/Center/Company_info/Company_info')
const Address = () => import ('@/views/Center/Address/Address')
const Online_product = () => import ('@/views/Center/Online_product/Online_product')
const Online_write = () => import ('@/views/Center/Online_write/Online_write')
const Online_check = () => import ('@/views/Center/Online_check/Online_check')
const Online_order_s = () => import ('@/views/Center/Online_order_s/Online_order_s')
const Online_pay_s = () => import ('@/views/Center/Online_pay_s/Online_pay_s')
const Jinpeng_client = () => import ('@/views/Center/Jinpeng_Client/Jinpeng_client')
const Order_search = () => import ('@/views/Center/Order_search/Order_search')
const Order_detail = () => import ('@/views/Center/Order_detail/Order_detail')
const Order_track = () => import ('@/views/Center/Order_track/Order_track')
const My_finance = () => import ('@/views/Center/My_finance/My_finance')
const Change_password = () => import ('@/views/Center/Change_password/Change_password')

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Home
    }, {
      path: '/home',
      name: 'home',
      component: Home
    }, {
      path: '/product/airCargoServices',
      name: 'product/airCargoServices',
      component: AirCargoServices
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
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: Register
    }, {
      path: '/center',
      name: 'center',
      component: Center,
      redirect: '/center/account',
      children: [
        {
          path: '/center/account',
          component: Account
        }, {
          path: '/center/change_password',
          component: Change_password
        }, {
          path: '/center/personal',
          component: Personal
        }, {
          path: '/center/company_info',
          component: Company_info
        }, {
          path: '/center/address',
          component: Address
        }, {
          path: '/center/online_product',
          component: Online_product
        }, {
          path: '/center/online_write',
          component: Online_write
        }, {
          path: '/center/online_check',
          component: Online_check
        }, {
          path: '/center/online_order_s',
          component: Online_order_s
        }, {
          path: '/center/online_pay_s',
          component: Online_pay_s
        }, {
          path: '/center/jinpeng_client',
          component: Jinpeng_client
        }, {
          path: '/center/order_search',
          component: Order_search
        }, {
          path: '/center/order_detail',
          component: Order_detail
        }, {
          path: '/center/order_track',
          component: Order_track
        }, {
          path: '/center/my_finance',
          component: My_finance
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    // 判断是否需要登录
    // console.log(store.state)
    next();
    // next({   name: "login",   query:{     redirect: to.fullPath   } })
  } else {
    next();
  }
});

export default router;
