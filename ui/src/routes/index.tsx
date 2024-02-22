import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { DocumentHead } from "@builder.io/qwik-city";

import Card from "../components/card/card";
import type { Tags } from "../shared.types";

interface Datum {
  place: string;
  website: string;
  // biome-ignore lint/style/useNamingConvention: to comply with the original data
  accepts_edenred: boolean;
  // biome-ignore lint/style/useNamingConvention: to comply with the original data
  last_update: string;
}

// https://qwik.dev/docs/guides/qwik-nutshell/#fetching--loading-data
// https://qwik.dev/docs/route-loader/
// https://qwik.dev/docs/guides/qwik-nutshell/#rendering-a-list-of-items
// https://stackoverflow.com/questions/52660451/javascript-natural-sort-objects
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
export const useMealCardData = routeLoader$(async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/joaopalmeiro/meal-card-data/main/data.json",
  );
  const data = await response.json();

  return data as Datum[];
});

export default component$(() => {
  const mealCardData = useMealCardData();

  return (
    <ul>
      {mealCardData.value
        .sort((a, b) => a.place.localeCompare(b.place, "pt-PT"))
        .map((datum) => {
          const lastUpdate = new Date(datum.last_update);
          const tags: Tags = [{ name: "Edenred", accepts: datum.accepts_edenred }];

          return (
            <li key={datum.place}>
              <Card title={datum.place} lastUpdate={lastUpdate} tags={tags} />
            </li>
          );
        })}
    </ul>
  );
});

export const head: DocumentHead = {
  title: "mealcard",
  meta: [
    {
      name: "description",
      content: "Places that accept or not the Edenred meal card.",
    },
  ],
};
