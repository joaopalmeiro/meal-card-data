import { component$, useComputed$ } from "@builder.io/qwik";
import { Check16 } from "qwik-heroicons";

interface CardProps {
  title: string;
  lastUpdate: Date;
}

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
        <li>
          <Check16 /> Edenred
        </li>
      </ul>

      <a href="https://wa.me/?text=test" target="_blank" rel="noreferrer">
        Send
      </a>
    </div>
  );
});
