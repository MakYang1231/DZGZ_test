<template>
    <div class="main">
        <div class="list">
            <div class="list-child" v-for="(item, index) in day_rank" :key="index">
                <div class="firstInfo d-flex align-items-baseline justify-content-between">
                    <div class="icon">
                        <NuxtImg class="lazyload" itemprop="image" src="images/ranking/1_rank.png" data-src="public/images/ranking/1_ranking.png" /> 
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
</template>

<script setup lang="ts">
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
                margin-top: 2rem;
                background-color: rgba(255, 255, 255, .8);
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: nowrap;
                border-radius: 10px;

                .icon {
                    width: 180px;
                    height: 180px;
                }
                .picture {
                    width: 100px;
                    height: 100px;

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
                    width: 80px;
                    height: 80px;
                }
                .picture {
                    width: 50px;
                    height: 50px;
                }

                .midInfo {
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