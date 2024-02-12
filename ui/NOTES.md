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
- https://qwik.dev/docs/getting-started/: "(...) resumable (no eager JS execution and no hydration) (...)"
- https://qwik.dev/docs/project-structure/
- https://github.com/genie-design/qwikbits
- https://github.com/gilf/qwik-d3
- https://qwik.dev/docs/advanced/qwikloader/
- https://www.coverflex.com/en-pt/meal

## [Qwik tutorial](https://qwik.dev/tutorial/welcome/overview/)

### Done

- https://qwik.dev/tutorial/welcome/overview/
- https://qwik.dev/tutorial/introduction/component/
- https://qwik.dev/tutorial/introduction/store/
- https://qwik.dev/tutorial/introduction/listeners/
- https://qwik.dev/tutorial/introduction/resource/
- https://qwik.dev/tutorial/component/basic/
- https://qwik.dev/tutorial/component/binding/
- https://qwik.dev/tutorial/component/composition/
- https://qwik.dev/tutorial/component/lite/

### Notes

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

## [Qwik Crash Course](https://youtube.com/playlist?list=PL4cUxeGkcC9gOUlY-uCHurFIpqogsdOnw&feature=shared) by Net Ninja

### Done

- https://youtu.be/W0xjcx4mrkE?feature=shared
- https://youtu.be/bwBJeUBZaQU?feature=shared
- https://youtu.be/Ti2BoRVp-kY?feature=shared

### Notes

- "(...) Astro partial hydration which is a more component-level hydration rather than full page hydration."
  - https://docs.astro.build/en/concepts/islands/
- "This approach is called Resumability because the application essentially resumes in the browser where it left off in the server. There's no need to run any more initial JavaScript."
- https://github.com/iamshaunjp/Qwik-Crash-Course-1st-Look

## Commands

```bash
npm create qwik@latest
```

```bash
npm create vite@latest qwik-ts -- --template qwik-ts
```

```bash
npm run qwik add static
```

```bash
npx qwik add static
```

```bash
npm install @builder.io/qwik && npm install -D typescript vite
```

```bash
rm -rf node_modules/ && npm install
```
