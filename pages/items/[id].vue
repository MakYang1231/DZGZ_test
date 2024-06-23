<template>
    <div class="infoMain container mt-4 d-flex justify-content-left">
        <div class="itemSwiperDiv" style="width: 510px">
            <Swiper
                class="swiper_thumbs_main"
                :modules="[SwiperThumbs, SwiperEffectCreative]"
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
            >
            <SwiperSlide class="d-flex align-items-baseline justify-content-between flex-wrap" v-for="(item, index) in thumbsData">
                <video v-if="isVideo(item.url)" :src="`${ item.url }`" controls loop muted autoplay></video>
                
                <NuxtImg v-else class="lazyload" itemprop="image" :src="`${ item.url }`" :data-src="`${ item.url }`" />   
            </SwiperSlide>
            </Swiper>
            <Swiper
                class="swiper_thumbs_bottom"
                :autoHeight= true
                :modules="[SwiperThumbs]"
                @swiper="setThumbsSwiper"
                :watch-slides-progress="true"
                :slides-per-view="4"
                :space-between="40"
                :grab-cursor="true"
                :loop="false"
            >
            <SwiperSlide class="d-flex align-items-baseline justify-content-between flex-wrap" v-for="(item, index) in thumbsData">
                <video v-if="isVideo(item.url)" :src="`${ item.url }`" muted></video>
                
                <NuxtImg v-else class="lazyload" itemprop="image" :src="`${ item.url }`" :data-src="`${ item.url }`" />   
            </SwiperSlide>
            </Swiper>                
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

    onMounted(() => {
        thumbsData.value = ItemData.product_picture_url_list;
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
        }
    });

    // Swiper
    const thumbsSwiper = ref(null);
    const setThumbsSwiper = (swiper) => {
        thumbsSwiper.value = swiper;
    };


</script>

<style lang="scss">
.swiper_thumbs_main {
    video {
        width: 100%;
    }
}

.swiper_thumbs_bottom {
    padding-top: 1rem;

    .swiper-slide {
        cursor: pointer;

        video {
            width: 100%;
        }
        img {
            border-radius: 5px;
        }
    }    
}

.swiper {
    .swiper-wrapper {
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
</style>