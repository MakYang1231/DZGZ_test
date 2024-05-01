
// [ Set Global Variable ] //
/**
 * MenuItemData <Array Object> = 項目欄細項
 * 
 * 
 *  */ 

export default defineNuxtPlugin(nuxtApp => {  

    const { data:food } = useFetch(`https://isnmk.com/api/food`);
    const foodData:any = toRaw(food.value);
    const { data:toy } = useFetch(`https://isnmk.com/api/toy`);
    const toyData:any = toRaw(toy.value);
    const { data:doll } = useFetch(`https://isnmk.com/api/doll`);
    const dollData:any = toRaw(doll.value);
    const { data:supply } = useFetch(`https://isnmk.com/api/supply`);
    const supplyData:any = toRaw(supply.value);
    const { data:other } = useFetch(`https://isnmk.com/api/other`);
    const otherData:any = toRaw(other.value);
    return {
      provide: {
        foodData,
        toyData,
        dollData,
        supplyData,
        otherData
      }
    };
  })