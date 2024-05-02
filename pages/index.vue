<template>
    <div class="main" style="height: 2000px;">
        <div class="video container">
            <div class="videoContent">
                <!-- <video playsinline loop autoplay muted src="/video/video_0.mp4"></video> -->
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    
</script>

<style lang="scss">
.main {
    .video {
        .videoContent {
            overflow: hidden;
            border-radius: 5px;
            video {
                width: 100%;
            }
        }
    }
}
</style>