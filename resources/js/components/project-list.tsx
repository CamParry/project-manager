import { useCreateProject, useListProjects } from "@/actions/projects";
import { Button } from "@/components/button";
import { PriorityIcon } from "@/components/icon-priority";
import { StatusIcon } from "@/components/icon-status";
import { useAppState } from "@/contexts/app-state";
import { ProjectSummary } from "@/types";
import { Link, router, usePage } from "@inertiajs/react";
import { ChevronDown, ChevronRight, Plus } from "lucide-react";
import { useMemo, useState } from "react";

const sortProjects = (
    projects: ProjectSummary[],
    sortBy: string
): ProjectSummary[] => {
    return [...projects].sort((a, b) => {
        switch (sortBy) {
            case "priority":
                const priorityDiff = a.priority - b.priority;
                if (priorityDiff !== 0) return priorityDiff;
                // If priorities are equal, sort by title
                return (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase());

            case "title":
                const titleA = (a.title || "Untitled Project").toLowerCase();
                const titleB = (b.title || "Untitled Project").toLowerCase();
                return titleA.localeCompare(titleB);

            case "created_at":
                return (
                    new Date(b.created_at).getTime() -
                    new Date(a.created_at).getTime()
                );

            case "deadline":
                if (!a.deadline && !b.deadline) return 0;
                if (!a.deadline) return 1;
                if (!b.deadline) return -1;
                return (
                    new Date(a.deadline).getTime() -
                    new Date(b.deadline).getTime()
                );

            default:
                return 0;
        }
    });
};

export function ProjectList({
    projects: initialProjects,
}: {
    projects: ProjectSummary[];
}) {
    const createProject = useCreateProject();
    const [showCompleted, setShowCompleted] = useState(false);
    const { sortBy } = useAppState();
    const { data } = useListProjects(initialProjects);
    const rawProjects = data ?? [];

    const projects = useMemo(() => {
        return sortProjects(rawProjects, sortBy);
    }, [rawProjects, sortBy]);

    const activeProjects = projects.filter(
        (project) => project.status !== "completed"
    );
    const completedProjects = projects.filter(
        (project) => project.status === "completed"
    );

    return (
        <aside className="flex grow flex-col overflow-y-auto border-r border-border-muted ease-in-out">
            {projects.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                    <h3 className="mb-2 text-lg font-semibold">No projects</h3>
                    <p className="mb-4 max-w-xs text-sm text-text-muted">
                        Get started by creating your first project. Track
                        progress, manage deadlines, and stay organized.
                    </p>
                    <Button
                        onClick={() => {
                            createProject.mutate({
                                data: {
                                    title: "New Project",
                                    content: "",
                                    status: "not-started",
                                    priority: 4,
                                    client: null,
                                    deadline: null,
                                },
                                onSuccess: (data) => {
                                    router.visit(`/projects/${data.id}`);
                                },
                            });
                        }}
                        disabled={createProject.isPending}
                        loading={createProject.isPending}
                        icon={Plus}
                        variant="primary"
                        size="sm"
                    >
                        Create project
                    </Button>
                </div>
            ) : (
                <div className="px-8 py-4">
                    {/* Active Projects */}
                    {activeProjects.map((project) => (
                        <ProjectItem key={project.id} project={project} />
                    ))}

                    {/* Completed Projects Section */}
                    {completedProjects.length > 0 && (
                        <div className="mt-6">
                            <button
                                onClick={() => setShowCompleted(!showCompleted)}
                                className="flex w-full items-center gap-2 pb-3 text-left text-sm font-medium text-text-muted"
                            >
                                {showCompleted ? (
                                    <ChevronDown className="size-4" />
                                ) : (
                                    <ChevronRight className="size-4" />
                                )}
                                <span>
                                    Completed ({completedProjects.length})
                                </span>
                            </button>

                            {showCompleted && (
                                <div className="space-y-0">
                                    {completedProjects.map((project) => (
                                        <ProjectItem
                                            key={project.id}
                                            project={project}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </aside>
    );
}

// Reusable project item component
function ProjectItem({ project }: { project: ProjectSummary }) {
    const { url } = usePage();
    const isActive = url === `/projects/${project.id}`;

    return (
        <Link
            href={`/projects/${project.id}`}
            prefetch="hover"
            className={`group relative block w-full border-border-muted text-left not-first:border-t ${
                isActive ? "active" : ""
            }`}
        >
            <div className="absolute -inset-x-4 -inset-y-px hidden rounded-lg border border-border-muted bg-bg group-[&.active]:block" />
            <div className="relative z-10 flex items-center justify-between py-4">
                <h3 className="min-w-0 flex-1 truncate text-[15px] font-semibold text-text">
                    {project.title || "Untitled Project"}
                </h3>
                <div className="ml-3 flex shrink-0 items-center gap-2">
                    <StatusIcon
                        className="size-4"
                        value={project.status}
                    />
                    <PriorityIcon className="size-4" value={project.priority} />
                </div>
            </div>
        </Link>
    );
}
