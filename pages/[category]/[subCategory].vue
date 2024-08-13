<template>
    <NuxtLayout name="default">
    <div class="page_main container d-flex justify-content-between">
        <div class="div_page_left col-md-2 bg-light">
            <div class="menu_title">
                <div>分類找商品</div>
            </div>
            <div class="menu_item">
                <ul class="me-3">
                    <ClientOnly>
                        <li v-for="(item, index) in MenuItemsData" :key="index" class="mx-3">
                            <NuxtLink class="d-flex align-items-center position-relative pb-2" :to="`/${item.category_url}`">
                                <div class="text d-flex align-items-center">
                                    ${ item.category_name }
                                </div>
                            </NuxtLink>
                            <div v-if="item.sub_categories">
                                <div v-for="(sItem, sIndex) in item.sub_categories" :key="sIndex" class="page_Cat_Sub">
                                    <NuxtLink :to="`/${item.category_url}/${sItem.sub_url}`">
                                        ${ sItem.sub_name }
                                    </NuxtLink>
                                </div>  
                            </div>
                        </li>
                    </ClientOnly>
                </ul>
            </div>
        </div>
        <div class="div_page_right col-md-9 col-12 bg-light">
            <div class="page_header_breadcrumb d-flex align-items-center">
                <BootstrapIcon name="house-door-fill" class="icon" />
                <BootstrapIcon name="chevron-double-right" class="icon mx-2" />
                <NuxtLink :to="{ path:`/${ category }`, hash:``}">
                    <div ref="DOM_ch_category"></div>
                </NuxtLink>
            </div>
            <div class="page_subItem d-flex align-items-center justify-content-between flex-wrap">
                <div class="subItem_text bg-light col-12 col-md-3" v-for="(sItem, sIndex) in sub_CategoryData" :key="sIndex">
                    <NuxtLink :to="`/${ category }/${ sItem.sub_url }`">
                        <BootstrapIcon class="mobile" name="chevron-right" />
                        ${ sItem.sub_name }
                    </NuxtLink>
                </div>
            </div>

            <div class="d-flex align-items-center justify-content-start control_bar">
                <div class="control_label">篩選</div>
                <div class="control_options">
                    <button :class="{ active: activeButton === 'complex' }" @click="setActiveButton('complex'); sort_Complex();">綜合</button>
                    <button :class="{ active: activeButton === 'time' }" @click="setActiveButton('time'); sort_Time();">最新</button>
                    <button :class="{ active: activeButton === 'hot' }" @click="setActiveButton('hot'); sort_Hot();">熱門</button>
                    <button :class="{ active: activeButton === 'point_height' }" @click="setActiveButton('point_height'); sort_Point_Height();">價高</button>
                    <button :class="{ active: activeButton === 'point_low' }" @click="setActiveButton('point_low'); sort_Point_Low();">價低</button>
                </div>
            </div>

            <div class="page_itemBody mt-3">
                <ClientOnly> <!-- [?]  -->
                    <ul class="d-flex align-items-baseline justify-content-between flex-wrap">
                        <Swiper
                            :speed=0
                            :autoHeight="true"
                            :modules="[SwiperGrid, SwiperPagination]"
                            :slides-per-view="1"
                            :slides-per-group="1"
                            :space-between="50"
                            :loop="false"
                            :pagination="{ clickable: true, type: 'bullets', renderBullet: onSwiperRenderBullet }"
                            @paginationRender="onPaginationRender"
                        >
                        <SwiperSlide class="d-flex align-items-baseline justify-content-between flex-wrap" v-for="(group, index) in show_pageData">
                            <li class="" v-for="(item, index) in group">
                                <NuxtLink class="disabled-links" :to="{ name:`items-id`, params: { id: item.item_code }, query: {category: category, itemCode: item.item_code}}">
                                    <img class="lazyload" itemprop="image" :src="`${ item.picture_url }`" :data-src="`${ item.picture_url }`" />
                                </NuxtLink>
                                <div class="title">
                                    ${ item.item_name } <span v-if="item.spec !== '' && item.spec !== '無'"> : ${ item.spec }</span>
                                </div>
                                <div class="point">
                                    ${ formatNumber(item.point) } 菓子點
                                </div>
                                <button class="nutton d-none">點數兌換</button>
                            </li>    
                        </SwiperSlide>
                        </Swiper>
                    </ul>
                </ClientOnly>
            </div>  
        </div>
    </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    const router = useRouter().currentRoute.value;
    const category = router.params.category;

    // 宣告 router 資訊, 並匯入 當前 CategoyDate 資訊
    let url_corret = ref<boolean>(false);
    let CategoyData = ref([]);
    let sub_CategoryData = ref([]);
    let sub_CategoryText = ref('');
    const DOM_ch_category = ref(null);

    const { $MenuItemsData } = useNuxtApp();
    const MenuItemsData: any = ref($MenuItemsData);


    let pageData: any = ref();
    let show_pageData: any = ref();

    const activeButton = ref('complex');
    let search = ref();

onMounted(() => {
    // 檢查url路徑 --- start
    // 檢查url路徑 --- start
    toRaw(MenuItemsData.value).forEach((item:any, index:any) => {
        if( item.category_url === category ) {
            CategoyData = toRaw(item);
            DOM_ch_category.value.textContent = CategoyData.category_name;
            sub_CategoryData.value = CategoyData.sub_categories;

            sub_CategoryData.value.forEach((item:any, index:any) => {
                if(item.sub_url === router.params.subCategory) {
                    sub_CategoryText.value = item.sub_name;
                }
            });

            url_corret.value = true;
        }
    });   

    if (!url_corret.value) {
        console.log('Not ===');
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
    }
    // end --- 檢查url路徑

    //let categorData = ref([]);
    //pageData = ref(toRaw(pageData.value));

    if (pageData) {
        pageData = pageData.filter(item => {
            return item.sub_category === sub_CategoryText.value
        });
    }
    else{
        console.log("No data");
    }
    show_pageData.value = pageData;
    show_pageData.value = group_pageData(show_pageData.value);
});


    // [API]
    // switch(category) {
    //     case '好吃零食':
    //         const { $foodData } = useNuxtApp();
    //         const foodData: any = $foodData;
    //         pageData = foodData;
    //         break;
    //     case '品牌玩具':
    //         const { $toyData } = useNuxtApp();
    //         const toyData: any = $toyData;
    //         pageData = toyData;
    //         break;
    //     case '盲盒娃娃':
    //         const { $dollData } = useNuxtApp();
    //         const dollData: any = $dollData;
    //         pageData = dollData;
    //         break;
    //     case '生活用品':
    //         const { $supplyData } = useNuxtApp();
    //         const supplyData: any = $supplyData;
    //         pageData = supplyData;
    //         break;
    //     case '其他好物':
    //         const { $otherData } = useNuxtApp();
    //         const otherData: any = $otherData;
    //         pageData = otherData;
    //         break;            

    // };
    //console.log(pageData);

    const { data, refresh } = await useFetch(`https://isnmk.com/api/${category}`);
    pageData = toRaw(data.value);


    // 篩選按鈕變化 JS
    const setActiveButton = (button:any) => {  
        activeButton.value = button;
    };

    // --- 排序 function [規則] --- Start
    const SortByComplex = (a:any, b:any) => {
        let aComplex = (a.last_30days_sales * a.point);
        let bComplex = (b.last_30days_sales * b.point);

        aComplex = (aComplex <= 0) ? a.point : aComplex;
        bComplex = (bComplex <= 0) ? b.point : bComplex;

        return bComplex - aComplex;
    }     
    const SortByTime = (a:any, b:any) => {
        return new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
    }    
    const SortByHot = (a:any, b:any) => {
        if(a.point === '') {
            a.last_30days_sales = '0';
        }
        if(b.point === '') {
            b.last_30days_sales = '0';
        }        
        return b.last_30days_sales - a.last_30days_sales;
    }
    const SortByPointHeight = (a:any, b:any) => {
        if(a.point === '') {
            a.point = '99999';
        }
        if(b.point === '') {
            b.point = '99999';
        }        
        return b.point - a.point;
    }
    const SortByPointLow = (a:any, b:any) => {
        if(a.point === '') {
            a.point = '99999';
        }
        if(b.point === '') {
            b.point = '99999';
        }        
        return a.point - b.point;
    }
    // --- 排序 function [規則] --- End

    const groupSize = 18;
    const group_pageData = (group_data:any) => {
        const result = [];
        for (let i = 0; i < group_data.length; i += groupSize) {
            result.push(group_data.slice(i, i + groupSize));
        }
        return result;
    };


    const sort_Complex = () => {
        pageData.sort(SortByComplex);
        show_pageData.value = group_pageData(pageData);
    }    
    const sort_Time = () => {
        pageData.sort(SortByTime);
        show_pageData.value = group_pageData(pageData);
    }    
    const sort_Hot = () => {
        pageData.sort(SortByHot);
        show_pageData.value = group_pageData(pageData);
    }
    const sort_Point_Height = () => {
        pageData.sort(SortByPointHeight);
        show_pageData.value = group_pageData(pageData);
    }
    const sort_Point_Low = () => {
        pageData.sort(SortByPointLow);
        show_pageData.value = group_pageData(pageData);
    }
    
    sort_Complex(); // 預設為綜合排名
/////////////////////////////////
/* --- [ Swiper function ] --- */
/////////////////////////////////

    const onSwiperRenderBullet = (index:any, className:any) => {
        return '<span class="' + className + '">' + (index + 1) + '</span>';
    }
    const onPaginationRender = () => {
        window.scrollTo(0, 0);
    }
</script>

<style lang="scss" scoped>
// [ Swiper Start ] 
:deep(.swiper) {
    padding-bottom: 5rem;

    .swiper-wrapper {
        max-width: 59vw;
    }
    .swiper-slide {
        width: 59vw !important;
        max-width: 59vw;
    }
    .swiper-pagination-bullet {
        color: rgba(0, 0, 0, .4);
        opacity: 1;
        background-color: transparent;
        padding: 0;
        min-width: 2.5rem;
        text-align: center;
        height: 1.875rem;
        font-size: 1.25rem;
        --swiper-pagination-bullet-horizontal-gap: .9375rem;
        border-radius: 0;
    }
    .swiper-pagination-bullet-active {
        color: #fff;
        background: #ee4d2d;
    }
}
// [ Swiper End ]

.disabled-link {
  pointer-events: none;
}

.mobile {
    display: none;
}

.page_main {
    margin-top: 2rem;

    .div_page_left {
        max-width: 20vw;
        border: 1px solid #E6E6E6;

        .menu_title {
            background-color: #252526;
            color: #c2c2c2;
            font-size: 1.1rem;
            font-weight: bold;
            line-height: 2.4em;
            text-align: left;
            border: 1px solid #57527e;
            margin-bottom: 1.5rem;

            div {
                padding-left: 1rem;
            }
        }

        .menu_item {
            ul {
                li {
                    color: #252526;
                    border-bottom: 1px solid #57527E;
                    margin-bottom: 10px;
                    border-radius: 0px;

                    .text {
                        font-size: 1.05rem;
                        font-weight: bold;
                        line-height: 1.5em;
                        text-align: left;
                    }

                    .page_Cat_Sub {
                        padding: .5rem 0px .5rem 1rem;
                        border-radius: 5px;
                        font-weight: bold;

                        a {
                            color: #666666;
                            font-size: 1.05rem;
                            line-height: 1.5em;
                        }
                    }
                    .page_Cat_Sub:hover {
                        background-color: #f2f2f3;

                        a {
                            color: #252526;
                        }
                    }
                }
            }
        }


    }

    .div_page_right {
        max-width: 67vw;
        .page_header_breadcrumb {
            font-size: 1.5rem;
            text-align: left;
            color: #252526;
            font-weight: bold;
            padding: 1rem .8rem;
            border-bottom: 1px solid #252526;
        }
        .page_subItem {
            margin: 10px 10px 10px 0px;
            border-radius: 5px;
            cursor: pointer;

            .subItem_text {
                margin: 10px 0px;
                border-radius: 5px;
                //background-color: var(--WEB_main_color);
                cursor: pointer;

                a {
                    padding: 0px 10px;
                    font-size: 1.1rem;
                    line-height: 2rem;
                    color: #666666;
                }
            }
            .subItem_text:hover {
                background-color: rgba(0,0,0,.03) !important;
            }
        }

        .control_bar {
            background-color: rgba(0,0,0,.03);
            border-radius: 2px;
            padding: .8125rem 1.25rem;

            .control_label {
                color: #555;
                margin: 0 .3125rem 0 0;
            }

            .control_options {
                display: flex;
                gap: .625rem;
                margin-left: .625rem;

                button {
                    background-color: #fff;
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-sizing: border-box;
                    cursor: pointer;
                    min-width: 2.625rem;
                    outline: 0;
                    overflow: visible;
                    padding: 0 .6rem;
                    text-transform: capitalize;
                    border: 0;
                    border-radius: 2px;
                    box-shadow: 0 1px 1px 0 rgba(0,0,0,.02);
                    height: 2.125rem;
                    line-height: 2.125rem;
                    font-size: 14px;
                }
                .active {
                    color: #fff;
                    background-color: #ee4d2d;
                }
            }
        }

        .page_itemBody {
            font-family: "Noto Sans TC", sans-serif;

            ul {
                li {
                    position: relative;
                    display: inline-block;
                    text-align: left;
                    padding: 2rem 1rem;
                    width: 32%;
                    -webkit-transition: all 0.1s ease-out;
                    transition: all 0.1s ease-out;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 5px;

                    a {
                        display: block;
                        cursor: pointer;
                        position: relative;
                        width: 100%;
                        padding-top: 100%;
                        background-size: cover;
                        background-position: center center;
                        background-repeat: no-repeat;
                        overflow: hidden;
                        border: 1px solid #ddd;

                        img {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            -o-object-fit: cover;
                            object-fit: cover;
                        }
                    }
                    .title {
                        width: 100%;
                        padding: 0 1em;
                        margin: 1em 0;
                        font-size: 1.2rem;
                        font-weight: 400;
                    }
                    .point {
                        color: #e21111;
                        font-size: 1rem;
                        padding: 0 1em;
                        margin: 1em 0;
                    }
                }
                li:hover {
                    transform: scale(1.02);
                    border-radius: 10px;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    box-shadow: 2px 2px 7px rgba(0, 0, 0, 0.1);
                }
            }
        }
    }
}

@media screen and (max-width: 767px) {
    :deep(.swiper) {
        padding-bottom: 10rem;
        .swiper-wrapper {
            max-width: 94vw;
        }
        .swiper-slide {
            width: 94vw !important;
            max-width: 94vw;
        }
    }     
    .mobile {
        display: inline-block;
    }
    .page_main {
        .div_page_left {
            display: none;
        }
        .div_page_right {
            max-width: 100vw;
            .page_itemBody {
                ul {
                    li {
                        width: 49%;
                    }
                }
            }
            .page_subItem {
                border: 1px solid #ccc;

                .subItem_text {
                    border-bottom: 1px solid #eee;
                    a {
                        font-size: 1rem;
                    }
                }
            }
        }
    }
}
</style>