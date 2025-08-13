import { Confirm } from "@/components/confirm";
import { ReactNode, createContext, useContext, useState } from "react";

type TConfirmProvider = {
    children: ReactNode;
};

type ConfirmData = {
    title?: string;
    description?: string;
    danger?: boolean;
    confirmText?: string;
    cancelText?: string;
    typeToConfirm?: string;
    onConfirm: () => void;
};

type SetConfirmData = (confirm: ConfirmData | null) => void;

type ConfirmContext = {
    confirm: (confirm: ConfirmData) => void;
    clearConfirm: () => void;
    confirmData: ConfirmData | null;
    setConfirmData: SetConfirmData;
};

const ConfirmContext = createContext<ConfirmContext | null>(null);

export const useConfirm = () => {
    return useContext(ConfirmContext) as ConfirmContext;
};

export const ConfirmProvider = ({ children }: TConfirmProvider) => {
    const [confirmData, setConfirmData] = useState<ConfirmData | null>(null);

    const confirm = (confirm: ConfirmData) => {
        setConfirmData({ ...confirm });
    };

    const clearConfirm = () => {
        setConfirmData(null);
    };

    return (
        <ConfirmContext.Provider
            value={{ confirm, clearConfirm, confirmData, setConfirmData }}
        >
            {children}
            <Confirm />
        </ConfirmContext.Provider>
    );
};
