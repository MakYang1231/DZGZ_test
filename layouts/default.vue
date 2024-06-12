<template>
    <header class="Header_root  nav_height sticky-top" ref="DOM_Header_root">
        <div class="Head_content nav_height d-flex align-items-center justify-content-around">
            <div class="menu_button" @click="openMenu();">
                    <BootstrapIcon name="list" />
            </div>
            <div class="logo d-flex align-items-center justify-content-around" ref="DOM_Header_logo">
                <NuxtLink :to="`/`">
                    <NuxtImg class="lazyload" itemprop="image" :src="`images/logo/DZGZ_logo.png`" :data-src="`images/logo/DZGZ_logo.png`" :title="`彈珠菓子_LOGO`" :alt="`彈珠菓子_LOGO`" />
                </NuxtLink>
                </div>
            <div class="main_item d-flex flex-column align-items-center">   
                <div class="item_top" ref="DOM_Header_mitem_top">top</div>
                <div class="item_bottom">
                    <ul class="bottom_ul d-flex align-items-center">
                        <ClientOnly>
                            <li class="bottom_li me-4" v-for="(item, index) in MenuItemsData" :key="index">
                                <NuxtLink class="bottom_a d-flex align-items-center position-relative pb-2" :to="`/${item.category_url}`">
                                    <div class="icon d-flex align-items-center mx-1">
                                        <NuxtImg class="lazyload" itemprop="image" :src="`/images/Header/${ item.category_url }.png`" :data-src="`/images/Header/${ item.category_url }.png`" :title="`Navbar_icon_${item.category_url}`" :alt="`Navbar_icon_${item.category_url}`" />
                                    </div>
                                    <div class="text d-flex align-items-center">
                                        ${ item.category_name }
                                    </div>
                                </NuxtLink>
                                <div class="subItem">
                                    <ul>
                                        <li v-for="(sItem, sIndex) in item.sub_categories" :key="sIndex">
                                            <NuxtLink :to="`/${item.category_url}/${sItem.sub_url}`" @click="closeMenu();">
                                                ${ sItem.sub_name }
                                            </NuxtLink>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ClientOnly>
                    </ul>
                </div>
            </div>     
            <div class="toolItem d-flex align-items-center justify-content-around">
                <div class="item search">
                    <BootstrapIcon name="search" />
                </div>
                <div class="item cart">
                    <BootstrapIcon name="cart-plus-fill" />
                </div>
                <div class="item user">
                    <BootstrapIcon name="person-plus-fill" />
                </div>
            </div>
        </div>
    </header>
    <slot />
    <footer class="Footer_root">
        <div class="bg-warning d-flex align-items-center justify-content-center mt-5">
            FOOTER
        </div>
    </footer>

    <!-- Menu content div -->
    <transition name="Menufade">    
        <div class="MenuModule position-fixed" ref="DOM_MenuModule" v-show="is_openMenu">
            <div class="MenuModule_backdrop position-fixed d-flex align-items-center justify-content-center" @click="closeMenu();"></div>
            <div class="MenuModule_paper d-flex flex-column position-fixed" ref="DOM_MenuModule_paper">
                <nav ref="DOM_MenuModule_Nav">
                    <div class="MainNav_wrapper">
                        <div class="MainNav_close">
                            <BootstrapIcon name="x-square " class="icon" @click="closeMenu();" />
                        </div>
                        <div class="MainNav_navNav">
                            <ul class="MainNav_menu">
                                <li class="MainNav_menu_logo">
                                    <p>目錄</p>
                                </li>
                            </ul>
                            <ul class="MainNav_menu MainNav_Cat" id="MainNav_menu">
                                <ClientOnly>
                                    <li v-for="(item, index) in MenuItemsData" :key="index" class="MainNav_Cat_link" :id="`MainNav_Cat_link_${index}`">
                                        <div v-if="item.sub_categories" :class="`MainNav_Cat_item MainNav_Cat_item_${index}`">
                                            <div class="MainNav_Cat_Head" :id="`MainNav_Cat_Head_${index}`">
                                                <NuxtLink :to="`/${item.category_url}`" class="d-flex align-items-center justify-content-center" @click="closeMenu();" type="button">
                                                    <div class="preIcon">
                                                        <NuxtImg class="lazyload" itemprop="image" :src="`/images/Header/${ item.category_url }.png`" :data-src="`/images/Header/${ item.category_url }.png`" :title="`Menu_icon_${item.category_url}`" :alt="`Menu_icon_${item.category_url}`" />
                                                    </div>
                                                    ${ item.category_name }
                                                </NuxtLink>
                                                <BootstrapIcon name="plus-lg" class="icon" type="button" data-bs-toggle="collapse" :data-bs-target="`#MainNav_Cat_Body_${index}`" aria-expanded="false" :aria-controls="`MainNav_Cat_Body_${index}`"/>
                                            </div>
                                            <div :id="`MainNav_Cat_Body_${index}`" class="MainNav_Cat_Body collapse" ref="DOM_CollBady" :aria-labelledby="`MainNav_Cat_Head_${index}`" data-bs-parent="#MainNav_menu">
                                                <div v-for="(sItem, sIndex) in item.sub_categories" :key="sIndex" class="MainNav_Cat_Sub">
                                                    <NuxtLink :to="`/${item.category_url}/${sItem.sub_url}`" @click="closeMenu();">
                                                        ${ sItem.sub_name }
                                                    </NuxtLink>
                                                </div>
                                            </div>
                                        </div>
                                        <div v-else :class="`MainNav_Cat_item MainNav_Cat_item_${index}`">
                                            <div class="MainNav_Cat_Head" :id="`MainNav_Cat_Head_${index}`">
                                                <NuxtLink :to="`/${item.category_url}`" class="d-flex align-items-center justify-content-center" @click="closeMenu();" type="button">
                                                    <div class="preIcon">
                                                        <NuxtImg class="lazyload" itemprop="image" :src="`/images/Header/${ item.category_url }.png`" :data-src="`/images/Header/${ item.category_url }.png`" :title="`Menu_icon_${item.category_url}`" :alt="`Menu_icon_${item.category_url}`" />
                                                    </div>
                                                    ${ item.category_name }
                                                </NuxtLink>
                                            </div>        
                                        </div>   
                                    </li>     
                                </ClientOnly>                                                                                    
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">

//const { $bootstrap } = useNuxtApp();
const router = useRouter().currentRoute.value;

const DOM_Header_root = ref();
const DOM_Header_logo = ref();
const DOM_Header_mitem_top = ref();

const DOM_MenuModule = ref();
const DOM_MenuModule_paper = ref();
const DOM_MenuModule_Nav = ref();
const DOM_CollBady = ref([]);

const is_openMenu = ref(false);

onMounted(() => {
    // if(router.name === 'index'){ // 判斷是否要有 layout scroll
        window.addEventListener("scroll", onScroll, true);
    // }else {
    //     DOM_Header_root.value.classList.add('Header_root_scroll');
    //     DOM_Header_Nva.value.classList.add('Header_logo_scroll');
    // }    
})

function onScroll(): void {
    if(window.innerWidth > 768) {
        // 滑動超過 Header 高度, 加上 class 屬性
        if (window.scrollY > DOM_Header_root.value.offsetHeight) {
            //DOM_Header_root.value.classList.add('Header_root_scroll');
            DOM_Header_root.value.style.setProperty('--WEB_nav_height', '50px');
            DOM_Header_logo.value.style.width = "4.5rem";
            DOM_Header_mitem_top.value.style.display = "none";
        } else {
            DOM_Header_root.value.style.setProperty('--WEB_nav_height', '90px');
            DOM_Header_logo.value.style.width = "7.5rem";
            DOM_Header_mitem_top.value.style.display = "block";
        }
    }    
}

const openMenu = () => {
    is_openMenu.value = true;
    DOM_MenuModule_paper.value.style.animation = `menuPaper_show 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`;
    document.body.style.overflow = 'hidden';
}
const closeMenu = () => {
    is_openMenu.value = false;
    DOM_MenuModule_paper.value.style.animation = `menuPaper_hide 225ms cubic-bezier(0, 0, 0.2, 1) 0ms`;
    DOM_MenuModule_Nav.value.scrollTo(0, 0); // Menu 返回頂部
    document.body.style.overflow = '';

    // 關閉 Menu 將展開的子項目收回
    DOM_CollBady.value.forEach((coll:HTMLElement, index) => {
        coll.classList.remove('show');
    })
}

// Data infomation

const { $MenuItemsData } = useNuxtApp();
const MenuItemsData: any = $MenuItemsData;

    const { data, refresh } = await useFetch(`https://isnmk.com/api/categories`);
    //pageData = toRaw(data.value);
    //console.log(toRaw(data.value));


</script>

<style lang="scss">
// Vue transition components animation css
.Menufade-enter-active,
.Menufade-leave-active {
  transition: opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms
}
.Menufade-enter-from,
.Menufade-leave-to {
  opacity: 0;
}

.Menufade-enter-to,
.Menufade-leave-from {
  opacity: 1;
}


// [ Header 主要大項 ]

// 全域變數
.nav_height {
    height: var(--WEB_nav_height);
}

// main
.Header_root {
    transition: all 0.2s ease-in;
    background-color: var(--WEB_main_color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease-in-out;

    .Head_content {
        padding: 0 0.5rem;
        transition: all 0.3s ease-in-out;

        .menu_button {
            display: none;
            font-size: 2rem;
        }
        .logo {
            width: 7.5rem;
            transition: all 0.3s ease-in-out;
        }
        .main_item {
            .item_top {
                transition: all 0.3s ease-in-out;
            }
            .item_top {
                display: none !important;
            }
            .item_bottom {
                .bottom_ul {
                    .bottom_li {
                        .bottom_a {
                            .icon {
                                width: 1.5rem;
                                height: 1.5rem;
                            }
                        }
                        .bottom_a:before {
                            background: #fff;
                            content: "";
                            position: absolute;
                            left: 0;
                            bottom: 0;
                            transition: 0.3s;
                            width: 100%;
                            height: 2px;
                            transform-origin: left top;
                            transform: scale(0, 1);
                        }

                        .subItem {
                            background: snow;
                            position: fixed;
                            top: calc(var(--WEB_nav_height) - 1rem);
                            margin: auto;
                            width: 100%;
                            transition: 0.5s;
                            transform: translateY(1em);
                            opacity: 0;
                            visibility: hidden;
                            z-index: -1;
                            left: auto;
                            width: fit-content;
                            max-width: 280px;
                            box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);

                            ul {
                                li {
                                    padding: 1rem 2rem;
                                }
                            }
                        }
                    }
                    .bottom_li:hover {
                        .bottom_a:before {
                            background: #000;
                            transform: scale(1, 1);
                        }
                        .subItem {
                            opacity: 1;
                            visibility: visible;
                            z-index: 1;
                            top: calc(var(--WEB_nav_height) - 1.5rem);
                        }
                    }
                }
            }
        }
        .toolItem {
            //display: none !important;
            font-size: 1.5rem;
            background-color: rgba(200, 200, 200, 0.3);
            border-radius: 10px;

            .item {
                padding: .5rem 1rem;

                i {
                    cursor: pointer;
                }
            }
        }

        
    }
}

// [ Menu 主要大項 ]
.MenuModule {
        inset: 0px;
        z-index: 1200;

        .MenuModule_backdrop {
            inset: 0px;
            background-color: rgba(0, 0, 0, .5);
            -webkit-tap-highlight-color: transparent;
            z-index: -1;
        }
        .MenuModule_paper {
            //transform: translateX(-100%);
            background-color: var(--WEB_main_color);
            color: rgba(0, 0, 0, .87);
            box-shadow: rgba(0, 0, 0, 0.2) 0px 8px 10px -5px, 
            rgba(0, 0, 0, 0.14) 0px 16px 24px 2px, 
            rgba(0, 0, 0, 0.12) 0px 6px 30px 5px;
            overflow-y: auto;
            height: 100%;
            flex: 1 0 auto;
            z-index: 1200;
            outline: 0px;

            nav {
                height: 100svh;
                width: 85svw;
                max-width: 85svw;
                overflow: inherit;

                .MainNav_wrapper {
                    padding: 28px 28px 50px 60px;

                    .MainNav_close {
                        text-align: right;
                        padding-bottom: 0;

                        .icon {
                            padding: 5px;
                            cursor: pointer;
                            font-size: 2rem;
                        }
                    }
                    .MainNav_navNav {
                        padding-right: 32px;

                        .MainNav_menu {
                            margin-bottom: 6px;
                            padding: 0px;

                            li {
                                list-style: none;
                                padding: 0 0 8px 0;
                                text-align: left;

                                .bg_s {
                                    width: 120px;
                                    height: 100%;
                                    max-width: inherit;
                                    -o-object-fit: cover;
                                    object-fit: cover;
                                }
                            }
                            li.MainNav_menu_logo {
                                text-align: center;
                            }
                        }
                        .MainNav_Cat {
                            border-top: 1px solid #eaeaea;
                            margin-top: 0px;
                            padding-top: 6px;

                                .MainNav_Cat_link {
                                    padding-top: 14px;
                                    font-size: 14px;
                                    font-weight: 500;
                                    line-height: 25px;
                                    letter-spacing: .65em;
                                    margin: 0;
                                    color: #000;
                                    text-transform: uppercase;
                                    border: none;
                                    text-decoration: none;

                                    .MainNav_Cat_Head {
                                        display: flex;
                                        align-items: baseline;
                                        justify-content: space-between;
                                        font-size: 18px;
                                        padding: 13px;
                                        transition: .15s cubic-bezier(0, 0, 0.2, 1) 0ms;
                                    }

                                    .MainNav_Cat_item {
                                        .preIcon {
                                                width: 2rem;
                                                margin-right: .5rem;
                                            }
                                    }
                                    .MainNav_Cat_item:hover {
                                        .MainNav_Cat_Head {
                                            color: #d66b2d;
                                            transition: all .2s linear; 
                                        }
                                    }

                                    .MainNav_Cat_Body {
                                        background-color: lightgoldenrodyellow;
                                        text-align: left;

                                        .MainNav_Cat_Sub {
                                            padding: 13px 20px 13px 13px;
                                            cursor: pointer;
                                            transition: .15s cubic-bezier(0, 0, 0.2, 1) 0ms;
                                        }
                                    }
                                }
                        }
                    }
                }
            }
        }
    }    

// [ Media screen]
@media screen and (max-width: 767px) {
    // 變數
    :root {
        --WEB_nav_height: 90px;
    }    

    .Header_root {
        display: block;
        .Head_content {
            .logo{
                width: 8.5rem;
            }
            .menu_button {
                display: block;
            }
            .main_item {
                display: none !important;
            }
        }
    }
}

// [ Animation init ]
    
@keyframes menuPaper_show {
    from {
        transform: translateX(-100%);
    }

    to {
        transform: translateX(0%);
    }
}
@keyframes menuPaper_hide {
    from {
        transform: translateX(0%);
    }

    to {
        transform: translateX(-100%);
    }
}
</style>