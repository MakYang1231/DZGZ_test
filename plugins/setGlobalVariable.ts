
// [ Set Global Variable ] //
/**
 * MenuItemData <Array Object> = 項目欄細項
 * 
 * 
 *  */ 

export default defineNuxtPlugin(nuxtApp => {  
    return {
      provide: {
        MenuItemsData: [
            { title: '好吃零食', routeName: 'food', url: { path:'/好吃零食', hash: '' }, subItem: [], icon: 'images/Header/bar/food.png' },

            { title: '品牌玩具', routeName: 'toy', url: { path:'/品牌玩具', hash: '' }, subItem: [], icon: 'images/Header/bar/toy.png' },

            { title: '盲盒娃娃', routeName: 'doll', url: { path:'/盲盒娃娃', hash: '' }, subItem: [], icon: 'images/Header/bar/doll.png' },

            { title: '生活用品', routeName: 'supply', url: { path:'/生活用品', hash: '' }, subItem: [], icon: 'images/Header/bar/supply.png' },

            { title: '其他好物', routeName: 'other', url: { path:'/其他好物', hash: '' }, subItem: [], icon: 'images/Header/bar/other.png' },

            // { title: '原創服裝', url: { path:'/原創服裝', hash: '' }, subItem: [
            //     { sTitle: '兒童款', sUrl: { path:'/原創服裝/兒童款', hash: '' } },
            //     { sTitle: '成人款', sUrl: { path:'/原創服裝/成人款', hash: '' } },
            // ], icon: 'images/Header/bar/icon_7.png' },
        ],
      }
    };
  })