
var CACHE_STATIC_NAME ='static -v12x'
var CACHE_DYNAMIC_NAME ='dynamic -v2'

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker ...', event);
    event.waitUntil(
      caches.open(CACHE_STATIC_NAME)
        .then(function(cache) {
          console.log('[Service Worker] Precaching App Shell');
          cache.addAll([
            '/',
            '/index.html',
            '/app.js',
            '/style.css'

          ]);
        
          //cache.add('/help/index.html')
        })
    )
  });
/*
  var dbPromisev = idb.open('tdl-store', 1, function(db){
    if(!db.objectStoreNames.contains('tdl')){

    }
    db.createObjectStore('tdl',{keyPath: 'id'});
    
  });*/
/*
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || 
window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || 
window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}
  */
self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys()
    .then(function(keyList){
      return Promise.all(keyList.map(function(key){
        if(key!== CACHE_STATIC_NAME && key !== CACHE_DYNAMIC_NAME){
          console.log('[Service Worker] removeing old cache ', key);
          return caches.delete(key);
        }
      }))
    })
  )
  return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(response){
      if(response){
        return response;
      }
    
    
      else{
       return fetch(event.request)
       .then(function(res){
        return caches.open(CACHE_DYNAMIC_NAME)
        .then(function(cache){
            cache.put(event.request.url, res.clone());
            return res;

        })
      
      })
    
      .catch(function(err){

      });

      }}))
  });
  /*

  const indexedDB =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||


  window.shimIndexedDB;

if (!indexedDB) {
  console.log("IndexedDB could not be found in this browser.");
}
*/













