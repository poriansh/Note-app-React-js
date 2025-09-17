// ServiceWorkerManager.tsx
// import DialogModal from "@/components/Modal/DialogModal/DialogModal";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Button } from "@/components/ui/button";
import { Workbox } from "workbox-window";
import { useState } from "react";

// import { LuTriangleAlert } from "react-icons/lu";

interface ModalChangeSwProps {
  isOpen: boolean;
  onClose: () => void;
  workbox?: Workbox;
}

function ModalChangeSw({ isOpen, onClose, workbox }: ModalChangeSwProps) {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    if (isRefreshing || !workbox) return;
    setIsRefreshing(true);
    workbox.addEventListener("controlling", () => {
      window.location.reload();
    });
    workbox.messageSkipWaiting();
  };
  return (
    <>
      {/* <DialogModal size="sm" isOpen={isOpen} onClose={onClose} hideCancelBtn={true} hideSubmitBtn={true}>
        <Alert variant="destructive">
          <div className="flex items-center gap-2">
            <LuTriangleAlert />
            <AlertTitle>New Version Available</AlertTitle>
          </div>

          <AlertDescription className="mt-2">
            A new version of the app is available. Please refresh the page to update.
          </AlertDescription>
        </Alert>
        <div className="mt-5 flex justify-center gap-4">
          <Button variant="secondary" onClick={handleRefresh} disabled={isRefreshing}>
            {isRefreshing ? "Refreshing..." : "Refresh"}
          </Button>
          <Button variant="input" onClick={onClose}>
            Later
          </Button>
        </div>
      </DialogModal> */}
    </>
  );
}

export default ModalChangeSw;
