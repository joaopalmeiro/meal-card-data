# Notes

- https://qwik.dev/docs/deployments/static/
- https://qwikui.com/
- https://github.com/qwikifiers/qwik-style-guide:
  - Use kebab-case for filenames.
  - Use the `Sig` suffix for signal variable names.
  - Use regular _named_ functions instead of arrow functions for tasks and visible tasks (e.g., `useTask$(function initTask() {});`).
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind

## [Qwik tutorial](https://qwik.dev/tutorial/welcome/overview/)

- https://github.com/BuilderIO/qwik/tree/main/packages/docs/src/routes/tutorial
- Component: `import { component$ } from '@builder.io/qwik'; export default component$(() => { return <p>Hello World</p>; });`
- "Use `useStore()` to store the state of the component."
  - `const github = useStore({ org: 'BuilderIO', repos: ['qwik', 'partytown'] as string[] | null });`
  - https://qwik.dev/docs/guides/qwik-nutshell/#usestoreinitialvalue: "(...) it creates a reactive JavaScript object, making every property of the object reactive, just like the `value` of a signal."
- "Use the `onInput$` property on the `<input>` element to add an event listener.": `<input value={github.org} onInput$={(ev, el) => (github.org = el.value)} />`
