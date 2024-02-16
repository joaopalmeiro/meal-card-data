import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import Card from "../components/card/card";

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
      {mealCardData.value.map((datum) => {
        const lastUpdate = new Date(datum.last_update);

        return (
          <li key={datum.place}>
            <Card title={datum.place} lastUpdate={lastUpdate} />
          </li>
        );
      })}
    </ul>
  );
});
