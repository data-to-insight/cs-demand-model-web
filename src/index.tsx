import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { withCookieGate } from "@sfdl/sf-cookie-gate";
import { Loader } from "@sfdl/sf-mui-components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const App = lazy(() => {
  return import("./App");
});

const Landing = lazy(() => {
  return import("./Landing");
});

const Core = () => {
  const CookieGate = withCookieGate({
    options: { cookieName: "csdmpy-ready", cookieOptions: {} },
    LandingComponent: Landing,
    ApplicationComponent: App,
  });

  return (
    <Suspense fallback={<Loader type="cover" />}>
      <CookieGate />
    </Suspense>
  );
};

root.render(
  <React.StrictMode>
    <Core />
  </React.StrictMode>
);
