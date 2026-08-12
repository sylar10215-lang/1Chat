// รับ Push Notification จากเบื้องหลัง (Background)
self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: '1Chat', body: event.data.text() };
    }
  }

  const title = data.title || data.notification?.title || '1Chat';
  const options = {
    body: data.body || data.notification?.body || 'คุณมีข้อความใหม่',
    icon: data.icon || 'icon.png',
    badge: 'icon.png',
    vibrate: [100, 50, 100],
    data: {
      url: self.registration.scope
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// เมื่อผู้ใช้กดที่การแจ้งเตือน ให้เปิดหน้าแชทขึ้นมาทันที
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // ถ้ามีแท็บแชทเปิดอยู่แล้ว ให้สลับไปแท็บนั้น
      for (let i = 0; i < clientList.length; i++) {
        let client = clientList[i];
        if (client.url && 'focus' in client) {
          return client.focus();
        }
      }
      // ถ้าไม่มี ให้เปิดแอปขึ้นมาใหม่
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
