import {
    Listbox,
    ListboxButton,
    ListboxOption,
    ListboxOptions,
    Transition,
} from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type DropdownOption<T> = {
    value: T;
    label: string;
    icon?: ReactNode;
    disabled?: boolean;
};

type DropdownProps<T = any> = {
    value?: T;
    defaultValue?: T;
    onChange: (value: T) => void;
    options: DropdownOption<T>[];
    children?: ReactNode;
    className?: string;
    optionsClassName?: string;
    anchor?:
        | "bottom"
        | "bottom start"
        | "bottom end"
        | "top"
        | "top start"
        | "top end";
    disabled?: boolean;
};

export function Dropdown<T = any>({
    value,
    defaultValue,
    onChange,
    options,
    children,
    className = "",
    optionsClassName = "",
    anchor = "bottom end",
    disabled = false,
}: DropdownProps<T>) {
    return (
        <Listbox
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
        >
            <ListboxButton className={className}>{children}</ListboxButton>
            <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <ListboxOptions
                    anchor={anchor}
                    className={`absolute z-10 mt-1 max-h-60 overflow-auto rounded-lg border border-border-muted bg-bg p-1 shadow-lg focus:outline-none ${optionsClassName}`}
                >
                    {options.map((option, index) => (
                        <ListboxOption
                            key={index}
                            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 font-medium text-text select-none disabled:cursor-not-allowed disabled:opacity-50 data-active:bg-bg-muted"
                            value={option.value}
                            disabled={option.disabled}
                        >
                            {option.icon && (
                                <span className="flex-shrink-0 text-text-muted [&>svg]:size-4">
                                    {option.icon}
                                </span>
                            )}
                            <span className="flex-1">{option.label}</span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </Transition>
        </Listbox>
    );
}
