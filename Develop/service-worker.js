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