<template>
    <div>
        Dynamic router
        <h3 style="padding-top: 2rem;">Category: ${ $route.params.category }</h3>
        <p>Items Title: ${ $route.params.subCategory }</p>
    </div>
</template>

<script setup lang="ts">
    const { $MenuItemsData } = useNuxtApp();
    const MenuItemsData: any = $MenuItemsData;

    const router = useRouter().currentRoute.value;

    // 檢查url路徑 --- start
    // let url_corret = ref<boolean>(false);
    // MenuItemsData.forEach((item, index) => {
    //     if( item.title === router.params.category ) {
    //         if (item.subItem.some(e => e.sTitle === router.params.subCategory)) {
    //             url_corret.value = true;
    //         }
    //     }
    // });

    // if (!url_corret.value) {
    //     throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
    // }
    // end --- 檢查url路徑
</script>

<script lang="scss"></script>