export default defineEventHandler(async (event) => {
    const body = await readBody(event);
  
    console.log('Webhook received:', body);
  
    // 将数据广播到前端
    // 通知前端重新 fetch API
    const message = {
      type: 'webhook-update',
      data: body
    };
  
    globalThis.webhookMessage = message;
    console.log('OK');
  
    return { status: 'success', received: true };
  });