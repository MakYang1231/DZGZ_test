<template>
    <div class="page_main container d-flex justify-content-between">
        <div class="div_page_left col-md-2 bg-light">
            <div class="menu_title">
                <div>分類找商品</div>
            </div>
            <div class="menu_item">
                <ul class="me-3">
                    <li v-for="(item, index) in MenuItemsData" :key="index" class="mx-3">
                        <NuxtLink class="d-flex align-items-center position-relative pb-2" :to="{ path:`${item.url.path}`, hash:`${item.url.hash}` }">
                            <div class="text d-flex align-items-center">
                                ${ item.title }
                            </div>
                        </NuxtLink>
                        <div v-if="item.subItem.length > 0">
                            <div v-for="(sItem, sIndex) in item.subItem" :key="sIndex" class="page_Cat_Sub">
                                <NuxtLink :to="{ path:`${sItem.sUrl.path }`, hash:`${sItem.sUrl.hash}`}">
                                    ${ sItem.sTitle }
                                </NuxtLink>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="div_page_right col-md-9 col-12 bg-light">
            <div class="page_header_breadcrumb d-flex align-items-center">
                <BootstrapIcon name="house-door-fill" class="icon" />
                <BootstrapIcon name="chevron-double-right" class="icon mx-2" />
                <NuxtLink :to="{ path:`/${ category }`, hash:``}">
                    ${ category }
                </NuxtLink>
            </div>
            <div class="page_subItem d-flex align-items-center justify-content-between">
                <div class="subItem_text" v-for="(sItem, sIndex) in CategoyData.subItem" :key="sIndex">
                    ${ sItem.sTitle }
                </div>
            </div>
            <div class="page_itemBody">
                <ClientOnly> <!-- [?]  -->
                    <ul class="d-flex align-items-baseline justify-content-between flex-wrap">
                        <li class="" v-for="(item, index) in pageData">
                            <NuxtLink class="disabled-link" :to="{ path:`/`, hash:`` }">
                                <NuxtImg class="lazyload" itemprop="image" :src="`${ item.picture }`" :data-src="`${ item.picture }`" />
                            </NuxtLink>
                            <div class="title">
                                ${ item.name } <span v-if="item.spec !== '' && item.spec !== '無'"> : ${ item.spec }</span>
                            </div>
                            <div class="point">
                                ${ item.point } 菓子點
                            </div>
                            <button class="nutton d-none">點數兌換</button>
                        </li>
                    </ul>
                </ClientOnly>
            </div>  
        </div>
    </div>
</template>

<script setup lang="ts">
    const { $MenuItemsData } = useNuxtApp();
    const MenuItemsData: any = $MenuItemsData;

    const router = useRouter().currentRoute.value;
    const category = router.params.category;

    let pageData: any = ref();


    // [API]
    switch(category) {
        case '好吃零食':
            const { $foodData } = useNuxtApp();
            const foodData: any = $foodData;
            pageData = foodData;
            break;
        case '品牌玩具':
            const { $toyData } = useNuxtApp();
            const toyData: any = $toyData;
            pageData = toyData;
            break;
        case '盲盒娃娃':
            const { $dollData } = useNuxtApp();
            const dollData: any = $dollData;
            pageData = dollData;
            break;
        case '生活用品':
            const { $supplyData } = useNuxtApp();
            const supplyData: any = $supplyData;
            pageData = supplyData;
            break;
        case '其他好物':
            const { $otherData } = useNuxtApp();
            const otherData: any = $otherData;
            pageData = otherData;
            break;            

    };
    
    let CategoyData = ref([]);


    // 檢查url路徑 --- start
    let url_corret = ref<boolean>(false);
    MenuItemsData.forEach((item:any, index:any) => {
        if( item.title === category ) {
            CategoyData = item;
            url_corret.value = true;
        }
    });

    if (!url_corret.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true });
    }
    // end --- 檢查url路徑

    // const { data, refresh } = await useFetch(`https://isnmk.com/api/${category}`);
    // pageData = toRaw(data.value);
    console.log(pageData);


</script>

<style lang="scss">
.disabled-link {
  pointer-events: none;
}

.page_main {
    margin-top: 2rem;

    .div_page_left {
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
    .page_main {
        .div_page_left {
            display: none;
        }
        .div_page_right {
            .page_itemBody {
                ul {
                    li {
                        width: 49%;
                    }
                }
            }
        }
    }
}
</style>