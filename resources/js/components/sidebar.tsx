import { useCreateProject } from "@/actions/projects";
import { ProjectList } from "@/components/project-list";
import { useAppState } from "@/contexts/app-state";
import { SortOption } from "@/types";
import { router } from "@inertiajs/react";
import {
    ArrowUpDownIcon,
    CalendarClockIcon,
    CalendarIcon,
    FlagIcon,
    PlusIcon,
    TypeIcon,
} from "lucide-react";
import { ReactNode } from "react";

import { Dropdown } from "./dropdown";

const sortOptions: {
    value: SortOption;
    label: string;
    icon: ReactNode;
}[] = [
    {
        value: "priority",
        label: "Priority",
        icon: <FlagIcon />,
    },
    {
        value: "title",
        label: "Title",
        icon: <TypeIcon />,
    },
    {
        value: "created_at",
        label: "Latest",
        icon: <CalendarIcon />,
    },
    {
        value: "deadline",
        label: "Deadline",
        icon: <CalendarClockIcon />,
    },
];

export function Sidebar({
    projects,
}: {
    projects: App.Data.ProjectSummaryData[];
}) {
    const { showSidebar, sortBy, setSortBy } = useAppState();
    const createProject = useCreateProject();

    if (!showSidebar) {
        return null;
    }

    return (
        <aside className="flex h-screen w-[20rem] shrink-0 flex-col bg-bg-muted">
            <div className="flex h-16 shrink-0 items-center justify-between gap-3 border-r border-b border-border-muted pr-4 pl-8">
                <h1 className="text-2xl font-bold tracking-tight">Projects</h1>
                <div className="flex items-center gap-2">
                    <Dropdown
                        value={sortBy}
                        onChange={(value: SortOption) => setSortBy(value)}
                        options={sortOptions}
                        className="icon-button"
                        optionsClassName="w-36"
                    >
                        <ArrowUpDownIcon className="size-5" />
                    </Dropdown>
                    <button
                        onClick={() => {
                            createProject.mutate({
                                onSuccess: (data) => {
                                    router.visit(`/projects/${data.id}`);
                                },
                            });
                        }}
                        disabled={createProject.isPending}
                        title="Create project"
                        className="icon-button"
                    >
                        <PlusIcon className="size-5" />
                    </button>
                </div>
            </div>
            <ProjectList projects={projects} />
        </aside>
    );
}
