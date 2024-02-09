# Notes

- https://qwik.dev/docs/deployments/static/
- https://qwikui.com/
- https://github.com/qwikifiers/qwik-style-guide:
  - Use kebab-case for filenames.
  - Use the `Sig` suffix for signal variable names.
  - Use regular _named_ functions instead of arrow functions for tasks and visible tasks (e.g., `useTask$(function initTask() {});`).
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind
- https://qwik.dev/examples/introduction/hello-world/
- https://github.com/vitejs/vite/blob/main/packages/create-vite/template-qwik-ts/vite.config.ts
- https://qwik.dev/docs/advanced/vite/#qwikvite
- https://qwik.dev/api/qwik-optimizer/
- https://qwik.dev/api/qwik-optimizer/#qwikvite
- https://github.com/BuilderIO/qwik/blob/v1.4.4/packages/qwik/src/optimizer/src/plugins/vite.ts#L905
- https://qwik.dev/docs/guides/react-cheat-sheet/
- https://github.com/BuilderIO/qwik/tree/v1.4.4/starters/adapters/static/adapters/static

## [Qwik tutorial](https://qwik.dev/tutorial/welcome/overview/)

- https://github.com/BuilderIO/qwik/tree/main/packages/docs/src/routes/tutorial
- Component: `import { component$ } from '@builder.io/qwik'; export default component$(() => { return <p>Hello World</p>; });`
- "Use `useStore()` to store the state of the component."
  - `const github = useStore({ org: 'BuilderIO', repos: ['qwik', 'partytown'] as string[] | null });`
  - https://qwik.dev/docs/guides/qwik-nutshell/#usestoreinitialvalue: "(...) it creates a reactive JavaScript object, making every property of the object reactive, just like the `value` of a signal."
- "Use the `onInput$` property on the `<input>` element to add an event listener.": `<input value={github.org} onInput$={(ev, el) => (github.org = el.value)} />`
- "Use `useResource$()` function to set up how the data is fetched from the server. Use `<Resource>` to display the data."
- "One of Qwik's super powers lies in its lazy-loading features. Each component will generate a separate Symbol which is downloaded on demand."
- Inline component:
  - `export const Greeter = () => { return <div>Hello World!</div> };`
  - "(...) the `<Greeter />` component is no longer an independent export [(or Symbol)], but instead is bundled as part of the `<App>` component.

### Snippets

```ts
import { component$, useStore, Resource, useResource$ } from "@builder.io/qwik";

export default component$(() => {
  const github = useStore({
    org: "BuilderIO",
  });

  const reposResource = useResource$<string[]>(({ track, cleanup }) => {
    track(() => github.org);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return getRepositories(github.org, controller);
  });
});

export async function getRepositories(
  username: string,
  controller?: AbortController
): Promise<string[]> {
  console.log("FETCH", `https://api.github.com/users/${username}/repos`);

  const resp = await fetch(`https://api.github.com/users/${username}/repos`, {
    signal: controller?.signal,
  });
  console.log("FETCH resolved");

  const json = await resp.json();

  return Array.isArray(json)
    ? json.map((repo: { name: string }) => repo.name)
    : Promise.reject(json);
}
```
