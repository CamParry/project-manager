import { useDeleteProject } from "@/actions/projects";
import { Dropdown } from "@/components/dropdown";
import { PriorityIcon } from "@/components/icon-priority";
import { StatusIcon } from "@/components/icon-status";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/user-menu";
import {
    ValidationIndicator,
    getValidationClassName,
} from "@/components/validation-indicator";
import { useAppState } from "@/contexts/app-state";
import { useConfirm } from "@/contexts/confirm";
import { useValidation } from "@/hooks/use-validation";
import { ProjectFormData } from "@/types";
import {
    getPriorityLabel,
    getPriorityOptions,
    getStatusLabel,
    getStatusOptions,
} from "@/utils/project-labels";
import { router } from "@inertiajs/react";
import { SidebarCloseIcon, SidebarOpenIcon, Trash2Icon } from "lucide-react";
import { useFormContext } from "react-hook-form";

export function ProjectHeader({ projectId }: { projectId: number }) {
    const { confirm } = useConfirm();
    const { showSidebar, toggleShowSidebar } = useAppState();
    const deleteProject = useDeleteProject();
    const form = useFormContext<ProjectFormData>();
    const validation = useValidation(form);

    // Get options from utility functions
    const statusOptions = getStatusOptions().map((option) => ({
        ...option,
        icon: <StatusIcon className="size-4" value={option.label} />,
    }));

    const priorityOptions = getPriorityOptions().map((option) => ({
        ...option,
        icon: <PriorityIcon className="size-4" value={option.value} />,
    }));

    const currentStatusLabel = getStatusLabel(
        (form.watch("status") as any) || "not-started"
    );
    const currentPriorityLabel = getPriorityLabel(
        (form.watch("priority") || 4) as any
    );

    const handleDelete = () => {
        confirm({
            title: "Delete Project",
            description:
                "Are you sure you want to delete this project? This action cannot be undone.",
            confirmText: "Delete",
            cancelText: "Cancel",
            danger: true,
            onConfirm: () => {
                deleteProject.mutate({
                    params: { projectId },
                    onError: (error) => {
                        console.error("Failed to delete project:", error);
                    },
                    onSuccess: () => {
                        router.visit("/projects");
                    },
                });
            },
        });
    };

    return (
        <div className="flex h-16 shrink-0 items-center gap-4 border-b border-border-muted px-4 py-2">
            <button onClick={toggleShowSidebar} className="icon-button">
                {showSidebar ? (
                    <SidebarCloseIcon className="size-5" />
                ) : (
                    <SidebarOpenIcon className="size-5" />
                )}
            </button>
            <div className="relative grow">
                <input
                    type="text"
                    {...form.register("title")}
                    placeholder="Project Title"
                    className={`w-full grow rounded-lg border-none bg-transparent px-2 py-1 text-2xl font-bold placeholder-text-muted focus:ring-border-muted ${getValidationClassName(
                        validation.getFieldError("title"),
                        validation.isFieldValid("title")
                    )}`}
                />
                {validation.getFieldError("title") && (
                    <div className="absolute top-1/2 right-2 -translate-y-1/2">
                        <ValidationIndicator
                            error={validation.getFieldError("title")}
                        />
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                <Dropdown
                    value={form.watch("status")}
                    onChange={(value) => {
                        form.setValue("status", value as string, {
                            shouldDirty: true,
                        });
                    }}
                    options={statusOptions}
                    optionsClassName="w-40"
                    className="icon-button"
                >
                    <StatusIcon className="size-5" value={currentStatusLabel} />
                </Dropdown>
                <Dropdown
                    value={form.watch("priority")}
                    onChange={(value) => {
                        form.setValue("priority", value as number, {
                            shouldDirty: true,
                        });
                    }}
                    options={priorityOptions}
                    optionsClassName="w-36"
                    className="icon-button"
                >
                    <PriorityIcon
                        className="size-5"
                        value={form.watch("priority")}
                    />
                </Dropdown>
                <button
                    onClick={handleDelete}
                    disabled={deleteProject.isPending}
                    className="icon-button"
                >
                    <Trash2Icon className="size-5" />
                </button>
                <ThemeToggle />
                <UserMenu />
            </div>
        </div>
    );
}
