const CACHE_NAME = 'makkah-rest-v3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './images/logooo.png'
];

// تثبيت ملفات الكاش الأساسية للتطبيق
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// تفعيل الكاش وحذف النسخ القديمة تلقائياً
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// استرجاع البيانات والملفات حتى في حال عدم وجود إنترنت (أوفلاين)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
