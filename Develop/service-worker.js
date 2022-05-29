var filesToCache = ['../public/index.html', '../public/css/styles.css', '../public/js/index.js']
var appPrefix = 'BudgetTracker'
var version = 'version1'
var cacheName = appPrefix + version

self.addEventListener('active', function (data) {
  data.waitUntil(
    caches.keys().then(function (keys) {
      var cacheKeepKeys= keys.filter(function (key) {
        return key.indexOf(appPrefix)
      })
      cacheKeepKeys.push(cacheName)
      return Promise.all(
        keys.map(function (key, x) {
          if (cacheKeepKeys.indexOf(key) === -1) {
            console.dir('deleting the cache... ' + keys[x])
            return caches.delete(keys[x])
          }
        })
      )
    })
  )
})
self.addEventListener('fetch', function (data) {
  console.dir('fetch request... ' + data.request.url)
  data.respondWith(
    caches.match(data.call).then(function (call) {
      if (call) {
        console.dir('responding... ' + data.call.url)
        return call
      } else {
        console.dir('file not cached/ fetching... ' + data.call.url)
        return fetch(data.call)
      }
    })
  )
})