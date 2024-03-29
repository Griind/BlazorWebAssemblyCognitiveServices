﻿// Based on https://medium.com/@k.l.mueller/create-progressive-web-apps-with-net-using-blazor-6aa719e38000
console.log("This is service worker talking!");

// Changing service worker (or just cacheName) does following based on https://www.oreilly.com/library/view/building-progressive-web/9781491961643/ch04.html
// 1. Reinstalls service worker
// 2. Redownloads cached files
var cacheName = 'cse-pwa-2';
var rootPath = './';
var filesToCache = [
    rootPath,
    // Html and css files
    rootPath + 'css/site.css',
    rootPath + 'css/bootstrap/bootstrap.min.css',
    rootPath + 'css/open-iconic/font/css/open-iconic-bootstrap.min.css',
    rootPath + 'css/open-iconic/font/fonts/open-iconic.woff',
    rootPath + '_framework/blazor.webassembly.js',
    rootPath + '_framework/blazor.boot.json',
    // Our additional files
    rootPath + 'manifest.json',
    rootPath + 'serviceworker.js',
    rootPath + 'android-chrome-192x192.png',
    rootPath + 'android-chrome-512x512.png',
    rootPath + 'favicon-16x16.png',
    rootPath + 'favicon-32x32.png',
    rootPath + 'apple-touch-icon.png',
    rootPath + 'favicon.ico',
    // The web assembly/.net dll's
    rootPath + '_framework/wasm/mono.js',
    rootPath + '_framework/wasm/mono.wasm',
    rootPath + '_framework/_bin/Blazored.LocalStorage.dll',
    rootPath + '_framework/_bin/Microsoft.AspNetCore.Authorization.dll',
    rootPath + '_framework/_bin/Microsoft.AspNetCore.Blazor.dll',
    rootPath + '_framework/_bin/Microsoft.AspNetCore.Blazor.HttpClient.dll',
    rootPath + '_framework/_bin/Microsoft.AspNetCore.Components.dll',
    rootPath + '_framework/_bin/Microsoft.AspNetCore.Components.Forms.dll',
    rootPath + '_framework/_bin/Microsoft.AspNetCore.Components.Web.dll',
    rootPath + '_framework/_bin/Microsoft.AspNetCore.Metadata.dll',
    rootPath + '_framework/_bin/Microsoft.Bcl.AsyncInterfaces.dll',
    rootPath + '_framework/_bin/Microsoft.Extensions.Caching.Abstractions.dll',
    rootPath + '_framework/_bin/Microsoft.Extensions.Caching.Memory.dll',
    rootPath + '_framework/_bin/Microsoft.Extensions.DependencyInjection.Abstractions.dll',
    rootPath + '_framework/_bin/Microsoft.Extensions.DependencyInjection.dll',
    rootPath + '_framework/_bin/Microsoft.Extensions.Logging.Abstractions.dll',
    rootPath + '_framework/_bin/Microsoft.Extensions.Options.dll',
    rootPath + '_framework/_bin/Microsoft.Extensions.Primitives.dll',
    rootPath + '_framework/_bin/Microsoft.JSInterop.dll',
    rootPath + '_framework/_bin/Mono.Security.dll',
    rootPath + '_framework/_bin/Mono.WebAssembly.Interop.dll',
    rootPath + '_framework/_bin/mscorlib.dll',
    rootPath + '_framework/_bin/Newtonsoft.Json.dll',
    rootPath + '_framework/_bin/System.Buffers.dll',
    rootPath + '_framework/_bin/System.ComponentModel.Annotations.dll',
    rootPath + '_framework/_bin/System.Core.dll',
    rootPath + '_framework/_bin/System.Data.dll',
    rootPath + '_framework/_bin/System.dll',
    rootPath + '_framework/_bin/System.Memory.dll',
    rootPath + '_framework/_bin/System.Net.Http.dll',
    rootPath + '_framework/_bin/System.Numerics.dll',
    rootPath + '_framework/_bin/System.Numerics.Vectors.dll',
    rootPath + '_framework/_bin/System.Runtime.CompilerServices.Unsafe.dll',
    rootPath + '_framework/_bin/System.Runtime.Serialization.dll',
    rootPath + '_framework/_bin/System.Text.Encodings.Web.dll',
    rootPath + '_framework/_bin/System.Text.Json.dll',
    rootPath + '_framework/_bin/System.Threading.Tasks.Extensions.dll',
    rootPath + '_framework/_bin/System.Xml.dll',
    rootPath + '_framework/_bin/System.Xml.Linq.dll',
    // The compiled project .dll's
    rootPath + '_framework/_bin/CognitiveServices.Explorer.Domain.dll',
    rootPath + '_framework/_bin/CognitiveServices.Explorer.Web.dll'
];

if (self.location.hostname === 'localhost') {
    filesToCache.push(rootPath + '_framework/_bin/CognitiveServices.Explorer.Domain.pdb');
    filesToCache.push(rootPath + '_framework/_bin/CognitiveServices.Explorer.Web.pdb');
    console.log('Added local pdb for debugging. (won\'t work in prod)');
}

self.addEventListener('install', function (e) {
    console.log('[ServiceWorker] Install');
    //e.waitUntil(
    //    caches.open(cacheName).then(function (cache) {
    //        console.log('[ServiceWorker] Caching app shell...');
    //        return cache.addAll(filesToCache);
    //    })
    //);
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(response => {
            //return response || fetch(event.request);
            return fetch(event.request);
        })
    );
});
self.addEventListener('install', async event => {
    console.log('Installing service worker..');
    self.skipWaiting();
});

self.addEventListener('fetch', event => {
    return null;
});
