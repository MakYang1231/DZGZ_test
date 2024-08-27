// server/api/sse.js

export default defineEventHandler((event) => {
    event.node.res.setHeader('Content-Type', 'text/event-stream');
    event.node.res.setHeader('Cache-Control', 'no-cache');
    event.node.res.setHeader('Connection', 'keep-alive');
  
    // 发送一个初始消息，以保持连接活跃
    event.node.res.write(`data: Initial connection established\n\n`);
  
    const interval = setInterval(() => {
      if (globalThis.webhookMessage) {
        event.node.res.write(`data: ${JSON.stringify(globalThis.webhookMessage)}\n\n`);
        globalThis.webhookMessage = null;  // 清空消息
      }
    }, 1000);
  
    // 监听客户端断开连接
    event.node.req.on('close', () => {
      clearInterval(interval);
    });
  });
  