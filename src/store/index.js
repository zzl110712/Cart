import { createStore } from 'vuex'

// 持久存储
const setLocalCartList = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartList = () => {
  // cartList: { shopName: '', shopId: { productList: { productId: { __id: '', name: '', count: ''... } } } }
  // return JSON.parse(localStorage.cartList || '{}')
  try {
    return JSON.parse(localStorage.cartList)
  } catch (e) {
    return {}
  }
}

export default createStore({
  state: {
    // 首页icons按钮展示数据
    homeIconsList: [
      { imgName: '超市', desc: '超市便利' },
      { imgName: '菜市场', desc: '菜市场' },
      { imgName: '水果店', desc: '水果店' },
      { imgName: '鲜花', desc: '鲜花绿植' },
      { imgName: '医药健康', desc: '医药健康' },
      { imgName: '家居', desc: '家居时尚' },
      { imgName: '蛋糕', desc: '红配蛋糕' },
      { imgName: '签到', desc: '签到' },
      { imgName: '大牌免运', desc: '大牌免运' },
      { imgName: '红包', desc: '红包套餐' }
    ],
    // 用户名 密码
    userName: '',
    userPassword: '',
    // 购物车相关数据
    cartList: getLocalCartList()
  },
  mutations: {
    changeHomeIconsList (state, list) {
      state.homeIconsList = list
    },
    changeUserName (state, name) {
      state.userName = name
    },
    changePassWord (state, password) {
      state.userPassword = password
    },
    changeItemInfo (state, payload) {
      const { shopid, productId, productInfo, num } = payload
      const shopInfo = state.cartList[shopid] || {
        shopName: '',
        productList: {}
      }
      let product = shopInfo.productList[productId]
      if (!product) {
        productInfo.count = 0
        product = productInfo
      }
      product.count = product.count + num
      if (num > 0) {
        product.check = true
      }
      if (product.count < 0) {
        product.count = 0
      }
      shopInfo.productList[productId] = product
      state.cartList[shopid] = shopInfo
      setLocalCartList(state)
    },
    changeCartItemChecked (state, params) {
      const { shopId, productId } = params
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check
      // state.cartList[shopId][productId].check = !state.cartList[shopId][productId].check
      state.cartList[shopId][productId] = product
      setLocalCartList(state)
    },
    cleanCartProduct (state, params) {
      const { shopId } = params
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    },
    changeShopName (state, params) {
      const { shopId, shopName } = params
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalCartList(state)
    },
    setCartItemsChecked (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const iii in products) {
          const product = products[iii]
          product.check = true
        }
      }
      setLocalCartList(state)
    },
    // 清空对应商铺购物车
    clearCartData (state, shopId) {
      state.cartList[shopId].productList = {}
      setLocalCartList(state)
    }
  },
  actions: {
    changeHomeIconsList (store, list) {
      store.commit('changeHomeIconsList', list)
    },
    changeUserName (store, name) {
      store.commit('changeUserName', name)
    },
    changePassWord (store, password) {
      store.commit('changePassWord', password)
    }
  },
  modules: {
  }
})
