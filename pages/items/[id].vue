<template>
    <NuxtLayout name="default">
    <div v-if="isMobile" class="infoMain container mt-2 d-flex flex-wrap justify-content-center">
        <div class="itemInfoDiv">
            <div class="tags d-flex">
                <BootstrapIcon name="tags-fill" class="icon me-2" />
                <strong> ${ItemData.main_category}</strong>
                <BootstrapIcon name="chevron-double-right" class="icon mx-2" />
                <strong> ${ItemData.sub_category}</strong>
            </div>
            <div class="title">
                <h2 class="fw-normal fs-5">${ItemData.item_name}</h2>
            </div>
        </div>
        <div class="itemSwiperDiv">
            <Swiper
                class="swiper_thumbs_main"
                :modules="[SwiperPagination, SwiperEffectCoverflow]"
                :slides-per-view="1"
                :loop="false"
                :effect="'coverflow'"
                :coverflow-effect="{
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }"
                :pagination="{ clickable: true}"
            >
            <SwiperSlide class="d-flex align-items-baseline justify-content-between flex-wrap" v-for="(item, index) in thumbsData">
                <video v-if="isVideo(item.url)" :src="`${ item.url }`" controls loop muted autoplay></video>
                
                <NuxtImg v-else class="lazyload" itemprop="image" :src="`${ item.url }`" :data-src="`${ item.url }`" />   
            </SwiperSlide>
            </Swiper>                
        </div>
        <div class="itemInfoDiv">
            <div class="point fs-5 d-flex justify-content-end align-items-baseline">
                <div class="text pe-3"><strong>菓子點</strong></div>
                <div class="number fs-1"><strong>${ItemData.point}</strong></div>
            </div>
        </div>    
    </div>
    <!-- v-else [DeskTop] -->
    <div v-else class="infoMain container mt-4 d-flex justify-content-left">
        <div class="itemSwiperDiv" style="width: 510px">
            <Swiper
                class="swiper_thumbs_main"
                :modules="[SwiperThumbs, SwiperEffectCreative, SwiperNavigation]"
                :thumbs="{ swiper: thumbsSwiper }"
                :slides-per-view="1"
                :loop="false"
                :effect="'creative'"
                :creative-effect="{
                    prev: {
                        shadow: false,
                        translate: ['-20%', 0, -1],
                    },
                    next: {
                        translate: ['100%', 0, 0],
                    },
                }"
                :navigation="{ 
                    enabled: true,
                    prevEl: '.prev_button',
                    nextEl: '.next_button'
                }"                 
            >
            <SwiperSlide class="d-flex align-items-baseline justify-content-between flex-wrap" v-for="(item, index) in thumbsData">
                <video v-if="isVideo(item.url)" :src="`${ item.url }`" controls loop muted autoplay></video>
                
                <NuxtImg v-else class="lazyload" itemprop="image" :src="`${ item.url }`" :data-src="`${ item.url }`" />   
            </SwiperSlide>
            </Swiper>
            <Swiper
                class="swiper_thumbs_bottom"
                :autoHeight="true"
                :modules="[SwiperThumbs, SwiperNavigation]"
                @swiper="setThumbsSwiper"
                :watch-slides-progress="true"
                :slides-per-view="4"
                :space-between="40"
                :loop="false"               
            >
            <SwiperSlide class="d-flex align-items-baseline justify-content-between flex-wrap" v-for="(item, index) in thumbsData">
                <div v-if="isVideo(item.url)" class="videoDiv position-relative">
                    <video :src="`${ item.url }`" muted :poster="`${ posterImage }`"></video>
                    <div class="play-thumbs">
                        <div class="youtube-play-button">
                            <div class="play-icon"></div>
                        </div>
                    </div>
                </div>
                
                <NuxtImg v-else class="lazyload" itemprop="image" :src="`${ item.url }`" :data-src="`${ item.url }`" />   
            </SwiperSlide>
            </Swiper>       
            <BootstrapIcon name="arrow-left-circle-fill" class="icon prev_button" />
            <BootstrapIcon name="arrow-right-circle-fill" class="icon next_button" />         
        </div>
        <div class="itemInfoDiv">
            <div class="tags d-flex">
                <BootstrapIcon name="tags-fill" class="icon me-4" />
                <strong> ${ItemData.main_category}</strong>
                <BootstrapIcon name="chevron-double-right" class="icon mx-2" />
                <strong> ${ItemData.sub_category}</strong>
            </div>
            <div class="title">
                <h2 class="fw-normal fs-5">${ItemData.item_name}</h2>
            </div>
            <div class="point fs-5 d-flex justify-content-start">
                <div class="text pe-3"><strong>菓子點</strong></div>
                <div class="number fs-1"><strong>${ItemData.point}</strong></div>
            </div>
            <hr />
        </div>
    </div>
    

    <div class="detailImageDiv container d-flex flex-wrap justify-content-center mt-5">
        <div class="child_image" v-for="(image, index) in ItemData.product_detail_picture_url_list">
            <img :src="`${ image.url }`" :data-src="`${ image.url }`">
        </div>
    </div>
</NuxtLayout>
</template>

<script setup lang="ts">
    const router = useRouter().currentRoute.value;
    const category = router.query.category;
    const itemCode = router.query.itemCode;

    const { data, refresh } = await useFetch(`https://isnmk.com/api/${category}`);
    const pageData = toRaw(data.value);

    // 產品主要資料 ItemData
    const ItemData = pageData.find(item => item.item_code === itemCode); // 根据需要修改条件
    const isVideo = (url) => /^https.*\.mp4$/i.test(url);
    let thumbsData = ref();
    const posterImage = ref('');

    // 判斷視窗大小
    // 定义一个响应式变量来存储窗口宽度信息
    const isMobile = ref(false);
    // 定义一个函数来更新窗口宽度信息
    const handleResize = () => {
        if (typeof window !== 'undefined') {
            isMobile.value = window.innerWidth < 767;
        }
    };
    
    onMounted(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', handleResize);
            handleResize();
        }


        thumbsData.value = ItemData.product_picture_url_list;
        posterImage.value = thumbsData.value[0].url;
        if (ItemData['product_video_url'] && ItemData['product_video_url'] !== '') { // 如果有影影片
            
            //產生一個影片物件
            const obj = {
                url: ItemData['product_video_url']
            };

            // 加到 thumbsData 
            thumbsData.value.unshift(obj);
            // console.log(thumbsData);
        }
        else {
            console.log('[Error] can not find product_video_url!');
        };
    });

    onUnmounted(() => {
        if (typeof window !== 'undefined') {
            window.removeEventListener('resize', handleResize);
        }
    });


    // Swiper
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
        thumbsSwiper.value = swiper;
    };


</script>

<style lang="scss" scoped>
.itemSwiperDiv{
    position: relative;
    .swiper_thumbs_main {
        margin: 0 2rem;
        video {
            width: 100%;
        }   
    }

    .swiper_thumbs_bottom {
        margin: 1rem 2rem 0rem 2rem;

        .icon {
            font-size: 1.5rem;
            cursor: pointer;
        }
        .swiper-slide {
            cursor: pointer;
            opacity: .5;

            video {
                width: 100%;
                border-radius: 5px;
            }
            .play-thumbs {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 100%;
                height: 100%; 
                cursor: pointer;
                background-color: rgba(0, 0, 0, .2);
                border-radius: 5px;

                .youtube-play-button {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 3rem;
                    height: 2rem;
                    background-color: #ff0000;
                    border-radius: 5px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                    transition: transform 0.3s;
                }
                .play-icon {
                    width: 0;
                    height: 0;
                    border-left: 10px solid #fff;
                    border-top: 6px solid transparent;
                    border-bottom: 6px solid transparent;
                }
            }
            img {
                border-radius: 5px;
            }
        }       
        .swiper-slide-thumb-active {
            opacity: 1;
            border: 2px solid #000;
            border-radius: 5px;
        } 
    }
    .icon {
        font-size: 1.5rem;
        cursor: pointer;
    }
    .prev_button {
        position: absolute;
        left: 0rem;
        bottom: 2rem;
    }
    .next_button {
        position: absolute;
        right: 0rem;
        bottom: 2rem;
    }
    .swiper-button-disabled {
        color: #c0c0c0;
        cursor: not-allowed;
    }    
}
:deep(.swiper) {
    .swiper-wrapper {
        display: flex;
        align-items: center;
    }
}

.infoMain {
    .itemInfoDiv {
        width: 100%;
        margin-left: 2rem;

        .tags {
            line-height: 300%;
            color: #666666;
        }
        .title {
            h2 {
                line-height:4rem;
            }
        }
        .point {
            line-height: 6rem;
            color: #E21111
        }
    }
}
.detailImageDiv {
    .child_image {
        width: 800px;
    }
}

@media screen and (max-width: 767px) {

:root {
    --swiper-pagination-bullet-horizontal-gap: 5px;
}

.swiper {
    padding-bottom: 4rem;
}

.infoMain {
    .itemInfoDiv {
        margin: 0;
        .title {
            margin-bottom: 4rem;

            h2 {
                line-height: 2rem;
            }
        }
    }
}

.itemSwiperDiv {
    width: 100%;
    .swiper_thumbs_main {
        margin: 0rem;  
    }    
}

.detailImageDiv {
    .child_image {
        width: 100%;
    }
}
}
</style>