import { useEffect, useRef, useState } from "react";
import { Workbox } from "workbox-window";

export function useServiceWorkerAutoUpdate() {
  const wbRef = useRef<Workbox | null>(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }
    const wb = new Workbox("/sw.js", { scope: "/" });
    wbRef.current = wb;
    wb.addEventListener("waiting", () => {
      setShowUpdateModal(true);
    });
    wb.register().catch((error) => {
      console.error("Registration failed:", error);
    });
    return () => {
      wbRef.current = null;
    };
  }, []);

  return {
    showUpdateModal,
    setShowUpdateModal,
    workbox: wbRef.current,
  };
}
