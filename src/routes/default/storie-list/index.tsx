import { lazy } from "react";

export const StoriesList = lazy(
  () => import("@/pages/stories/view/stories-list-view"),
);
