import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

// https://qwik.dev/docs/advanced/speculative-module-fetching/#user-service-worker-code
setupServiceWorker();

addEventListener("install", () => self.skipWaiting());

addEventListener("activate", () => self.clients.claim());

declare const self: ServiceWorkerGlobalScope;
