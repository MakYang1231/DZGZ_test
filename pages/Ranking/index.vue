<template>
    <NuxtLayout name="custom-layout">
        <div class="main">
            <div class="list">
                <div class="list-child" v-for="(item, index) in day_rank" :key="index">
                    <div class="firstInfo d-flex align-items-baseline justify-content-around">
                        <div class="icon">
                            <NuxtImg v-if="index === 0" class="lazyload" itemprop="image" src="images/ranking/1_rank.png" data-src="public/images/ranking/1_ranking.png" />
                            <NuxtImg v-else-if="index === 1" class="lazyload" itemprop="image" src="images/ranking/2_rank.png" data-src="public/images/ranking/2_ranking.png" /> 
                            <NuxtImg v-else-if="index === 2" class="lazyload" itemprop="image" src="images/ranking/3_rank.png" data-src="public/images/ranking/3_ranking.png" /> 
                            <NuxtImg v-else class="lazyload" itemprop="image" src="images/ranking/4_rank.png" data-src="public/images/ranking/4_ranking.png" />  
                        </div>
                        <div class="picture">
                            <NuxtImg class="lazyload" itemprop="image" :src="`${ item.user_picture }`" :data-src="`${ item.user_picture }`" /> 
                        </div>
                    </div>
                    <div class="midInfo">
                        <div class="name">${item.user_name}</div>
                        <div class="message">${item.user_message}</div>
                    </div>
                    <div class="point">${ formatNumber(item.point) }</div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: false
    });

    let day_rank = ref();
    let month_rank = ref();

    const { data, refresh } = await useFetch(`https://isnmk.com/point/rank_api`);
    day_rank = data.value.day_rank;
    month_rank = data.value.month_rank;

    // console.log(day_rank);
    // console.log(month_rank);

</script>

<style lang="scss" scoped>
    .main {
        width: 100%;
        background-image: url(public/images/ranking/ranking_background.jpg);
        background-position: center center;
        background-size: cover;
        background-attachment: fixed;

        .list {
            padding-top: 2rem;
            width: 95%;
            margin: 0 auto;
            border-radius: 5px;

            .list-child {
                margin-top: 1svh;
                background-color: rgba(255, 255, 255, .8);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                border-radius: 10px;
                height: 6svh;

                .icon {
                    width: 6svh;
                    height: 6svh;
                }
                .picture {
                    width: 3svh;
                    height: 3svh;

                    img {
                        border-radius: 50%;
                    }
                }

                .firstInfo{
                    flex-basis: 20%;
                }
                .midInfo {
                    flex-basis: 50%;
                    display: flex;
                    justify-content: start;
                    align-items: center;

                    .name {
                        padding-right: 1rem;
                        font-size: 24px;
                    }
                    .message {
                        font-size: 18px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                }

                .point {
                    flex-basis: 20%;
                    padding: 2rem;
                    font-size: 28px;
                    font-family: "Josefin Sans", sans-serif;
                    color : #e21111;
                }
            }
            .list-child:nth-child(1) {
                margin-top: 1svh;
                background-color: rgba(255, 255, 255, .8);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                border-radius: 10px;
                height: 20svh;

                .icon {
                    width: 20svh;
                    height: 20svh;
                }
                .picture {
                    width: 18svh;
                    height: 18svh;

                    img {
                        border-radius: 50%;
                    }
                }

                .midInfo {
                    flex-basis: 50%;

                    .name {
                        font-size: 24px;
                    }
                    .message {
                        font-size: 18px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                }

                .point {
                    padding: 2rem;
                    font-size: 50px;
                    font-family: "Josefin Sans", sans-serif;
                    color : #e21111;
                }
            }
            .list-child:nth-child(2) {
                margin-top: 1svh;
                background-color: rgba(255, 255, 255, .8);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                border-radius: 10px;
                height: 15svh;

                .icon {
                    width: 15svh;
                    height: 15svh;
                }
                .picture {
                    width: 13svh;
                    height: 13svh;

                    img {
                        border-radius: 50%;
                    }
                }

                .midInfo {
                    flex-basis: 50%;

                    .name {
                        font-size: 24px;
                    }
                    .message {
                        font-size: 18px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                }

                .point {
                    padding: 2rem;
                    font-size: 46px;
                    font-family: "Josefin Sans", sans-serif;
                    color : #e21111;
                }
            } 
            .list-child:nth-child(3) {
                margin-top: 1svh;
                background-color: rgba(255, 255, 255, .8);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                border-radius: 10px;
                height: 10svh;

                .icon {
                    width: 10svh;
                    height: 10svh;
                }
                .picture {
                    width: 8svh;
                    height: 8svh;

                    img {
                        border-radius: 50%;
                    }
                }

                .midInfo {
                    flex-basis: 50%;

                    .name {
                        font-size: 24px;
                    }
                    .message {
                        font-size: 18px;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 3;
                        overflow: hidden;
                    }
                }

                .point {
                    padding: 2rem;
                    font-size: 42px;
                    font-family: "Josefin Sans", sans-serif;
                    color : #e21111;
                }
            }                                    
        }
    }

@media screen and (max-width: 767px) {
    .main {
        .list {
            .list-child {
                .icon {
                    width: 7svh !important;
                    height: 7svh !important;
                }
                .picture {
                    width: 3vh !important;
                    height: 3vh !important;
                }

                .midInfo {
                    margin-left: 1rem;
                    .name {
                        font-size: 16px;
                    }
                    .message {
                        font-size: 14px;
                    }
                }

                .point {
                    font-size: 24px;
                }
            }
        }
    }
}    
</style>