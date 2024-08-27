<template>
  <NuxtLayout name="custom-layout">
    <div>
      <transition-group name="list" tag="ul">
        <li v-for="(item, index) in sortedItems" :key="item.user_id" :style="{ order: item.user_rank }" class="list-item">
          ${ item.user_rank }. ${ item.user_name }
        </li>
      </transition-group>
    </div>
  </NuxtLayout>
</template>
  
  <script setup>
  
  const items = ref([]);

// Sorted list based on rank
const sortedItems = computed(() => {
  console.log(items.value);
  return items.value.slice().sort((a, b) => a.user_rank - b.user_rank);
});

async function fetchData() {
  try {
    const response = await $fetch('https://isnmk.com/point/rank_api_test');
    console.log(response.day_rank);
    updateRankings(response.day_rank);
    console.log('update');
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function updateRankings(newData) {
  if (JSON.stringify(newData) !== JSON.stringify(items.value)) {
    items.value = newData;
  }
}

onMounted(() => {
  fetchData(); // 初次加载时获取数据

  // 只在客户端执行
  if (process.client) {
    const eventSource = new EventSource('/DZGZ_web/api/sse');

    eventSource.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('client sse re ok');
      if (message.type === 'webhook-update') {
        console.log('Webhook update received:', message.data);
        fetchData(); // 收到 Webhook 更新时重新 fetch API 数据
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
    };
  }
});
</script>

<style scoped>
.list-item {
  display: block;
  transition: transform 1s ease;
  position: relative;
}

/* 過渡效果 */
.list-enter-active, .list-leave-active {
  transition: transform 1s ease;
}

.list-enter-from, .list-leave-to {
  transform: translateY(-10px);
}
  ul {
    width: 1124px;
    margin: 0 auto;
    margin-top: 1rem;
  }
  li {
    background-color:aqua;
    margin-bottom: 1rem;
    border-radius: 5px;
  }
  </style>