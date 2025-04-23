import { DocmeeUI } from "@docmee/sdk-ui";
import { useEffect, useRef, useState } from "preact/hooks";
import "./app.css";
import { createToken } from "./createToken";

const initDocmeeUI = async (container: HTMLDivElement) => {
  const { token } = await createToken({ ApiKey: import.meta.env.DOCMEE_API_KEY, limit: 2 });
  // init DocmeeUI
  const docmee = new DocmeeUI({
    lang: "en",
    container,
    page: "creator",
    token,
    // @ts-expect-error
    mobileMode: true,
  });

  return docmee;
};

export function App() {
  const container = useRef<HTMLDivElement>(null);
  const docmee = useRef<DocmeeUI>();
  const [activatedTab, setActivatedTab] = useState("Creator");
  const mounted = useRef(false);

  useEffect(() => {
    if (!container.current) return;
    const { current } = container;
    if (docmee.current) return;
    initDocmeeUI(current).then((instance) => {
      docmee.current = instance;
      instance.on("mounted", () => (mounted.current = true));
    });
  }, []);

  useEffect(() => {
    if (!docmee.current || !mounted.current) return;
    docmee.current.navigate({ page: { Creator: "creator", Products: "dashboard" }[activatedTab] || "creator" });
  }, [activatedTab]);

  return (
    <>
      <div className={"docmee-h5-app"} ref={container} />
      <div className={"navigation-bar"}>
        {((tabs: string[]) => {
          return tabs.map((item) => (
            <button data-activated={activatedTab === item} onClick={() => setActivatedTab(item)} key={item}>
              {item}
            </button>
          ));
        })(["Creator", "Products"])}
      </div>
    </>
  );
}
