
// [ Set Global Variable ] //
/**
 * MenuItemData <Array Object> = 項目欄細項
 * 
 * 
 *  */ 

export default defineNuxtPlugin(nuxtApp => {  

    const { data:new_product } = useFetch(`https://isnmk.com/api/new_product`);
    const new_productData:any = toRaw(new_product.value);
    const { data:recommended } = useFetch(`https://isnmk.com/api/recommended`);
    const recommendedData:any = toRaw(recommended.value);
    const { data:life_supply } = useFetch(`https://isnmk.com/api/life_supply`);
    const life_supplyData:any = toRaw(life_supply.value);
    const { data:cartoon } = useFetch(`https://isnmk.com/api/cartoon`);
    const cartoonData:any = toRaw(cartoon.value);
    return {
      provide: {
        new_productData,
        recommendedData,
        life_supplyData,
        cartoonData
      }
    };
  })