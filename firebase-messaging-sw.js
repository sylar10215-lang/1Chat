importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: "AIzaSyDbMaGhHmPTReldMPckDk0G_Vk2gqiRjs",
  projectId: "chat01-bd6fd",
  messagingSenderId: "120948633141",
  appId: "1:120948633141:web:36ae2459dda98164094b7c"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title || 'ข้อความใหม่จาก MJ Chat';
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
