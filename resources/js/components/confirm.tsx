import { useConfirm } from "@/contexts/confirm";
import {
    Description,
    Dialog,
    DialogPanel,
    DialogTitle,
} from "@headlessui/react";

import { Button } from "./button";

export const Confirm = () => {
    const { clearConfirm, confirmData } = useConfirm();

    if (!confirmData) {
        return null;
    }

    return (
        <Dialog
            open={!!confirmData}
            onClose={() => clearConfirm()}
            className="relative z-50"
        >
            <div className="fixed inset-0 flex h-screen w-screen items-center justify-center dark:bg-black/70">
                <DialogPanel className="font-body w-[24rem] max-w-[95%] rounded-lg bg-bg p-6 shadow-xl">
                    <DialogTitle className="text-xl font-bold text-text">
                        {confirmData.title}
                    </DialogTitle>
                    <Description className="mt-4 text-text-muted">
                        {confirmData.description}
                    </Description>
                    <div className="mt-6 flex gap-6">
                        <Button
                            variant="secondary"
                            onClick={() => {
                                clearConfirm();
                            }}
                        >
                            {confirmData.cancelText ?? "Cancel"}
                        </Button>
                        <Button
                            variant={confirmData.danger ? "danger" : "primary"}
                            onClick={() => {
                                confirmData.onConfirm();
                                clearConfirm();
                            }}
                        >
                            {confirmData.confirmText ?? "Confirm"}
                        </Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    );
};
