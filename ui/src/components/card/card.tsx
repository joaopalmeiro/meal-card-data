import { component$, useComputed$, useStylesScoped$ } from "@builder.io/qwik";
import { Check16, XMark16 } from "qwik-heroicons";

import type { Tags } from "../../shared.types";

import styles from "./card.css?inline";

interface CardProps {
  title: string;
  lastUpdate: Date;
  tags: Tags;
}

// https://qwik.dev/docs/components/overview/#inline-components
// https://qwik.dev/docs/components/rendering/#rendering-conditionally
export const Pill = (props: { text: string; accepts: boolean }) => {
  return (
    <span class="pill">
      {props.accepts ? <Check16 /> : <XMark16 />}
      {props.text}
    </span>
  );
};

// https://qwik.dev/docs/components/overview/
// https://qwik.dev/docs/components/overview/#props
// https://qwik.dev/docs/components/overview/#polymorphic-components
// https://tzdesign.de/en/blog/qwik-component-polymorphism
// https://tailwindui.com/components/application-ui/lists/grid-lists
// https://catalyst.tailwindui.com/
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/time
// https://bobbyhadz.com/blog/javascript-get-iso-date-without-time
// https://qwik.dev/docs/components/state/#usecomputed
// https://qwik.dev/docs/components/rendering/#bind-attribute
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#security_and_privacy
export default component$<CardProps>((props) => {
  // https://qwik.dev/docs/components/styles/#scoped-css
  useStylesScoped$(styles);

  const lastUpdateDisplay = useComputed$(() => {
    return props.lastUpdate.toDateString();
  });

  const lastUpdateDt = useComputed$(() => {
    return props.lastUpdate.toString();
  });

  return (
    <div>
      <h2>{props.title}</h2>

      <time dateTime={lastUpdateDt.value}>{lastUpdateDisplay.value}</time>

      <ul>
        {props.tags.map((tag) => {
          return (
            <li key={tag.name}>
              <Pill text={tag.name} accepts={tag.accepts} />
            </li>
          );
        })}
      </ul>

      <a href="https://wa.me/?text=test" target="_blank" rel="noreferrer">
        Send
      </a>
    </div>
  );
});
