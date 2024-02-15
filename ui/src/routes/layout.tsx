import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

// biome-ignore lint/nursery/useAwait: to follow the create-qwik conventions
export const onGet: RequestHandler = async ({ cacheControl }) => {
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    maxAge: 5,
  });
};

export default component$(() => {
  return <Slot />;
});
