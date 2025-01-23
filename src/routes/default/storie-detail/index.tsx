import { lazy } from "react";

export const StorieDetailPage = lazy(
  () => import("@/pages/stories/view/storie-detail-view"),
);
