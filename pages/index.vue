<template>
    <div class="main" style="height: 2000px;">
        <div class="video container-fluid">
            <div class="videoContent">
                <!-- <video playsinline loop autoplay muted src="/video/video_0.mp4"></video> -->
            </div>
            <div class="imageDiv">
                <img src="/images/main/1037088_0.jpg" alt="">
                <img src="/images/main/1037089_0.jpg" alt="">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
</script>

<style lang="scss">
.main {
    .video {
        margin: 0;
        padding: 0;
        .videoContent {
            overflow: hidden;
            border-radius: 5px;
            video {
                width: 100%;
            }
        }
        .imageDiv {
            img {
                margin-bottom: 1rem;
            }
        }
    }
}
</style>