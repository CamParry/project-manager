import { useUpdateProject } from "@/actions/projects";
import { Layout } from "@/components/layout";
import { ProjectEditor } from "@/components/project-editor";
import { ProjectHeader } from "@/components/project-header";
import { Sidebar } from "@/components/sidebar";
import { Project, ProjectFormData, ProjectSummary } from "@/types";
import { useInterval } from "@/utils/useInterval";
import { FormProvider, useForm } from "react-hook-form";

export default function Show({
    project,
    projects,
}: {
    project: Project;
    projects: ProjectSummary[];
}) {
    const updateProjectMutation = useUpdateProject();

    const form = useForm<ProjectFormData>({
        defaultValues: {
            title: project?.title || "",
            client: project?.client || "",
            deadline: project?.deadline || "",
            status: project?.status || "not-started",
            priority: project?.priority || 4,
            content: project?.content || "",
        },
    });

    // Auto-save with useInterval
    useInterval(() => {
        if (!form.formState.isDirty || updateProjectMutation.isPending) return;
        updateProjectMutation.mutate({
            params: { projectId: project.id },
            data: form.getValues(),
            onSuccess: () => {
                form.reset(form.getValues(), { keepValues: true });
            },
        });
    }, 300);

    return (
        <Layout title={project.title}>
            <Sidebar projects={projects} />
            <main className="flex h-screen grow flex-col">
                {project ? (
                    <FormProvider {...form}>
                        <ProjectHeader projectId={project.id} />
                        <ProjectEditor
                            value={project?.content || ""}
                            onChange={(value) =>
                                form.setValue("content", value, {
                                    shouldDirty: true,
                                })
                            }
                        />
                    </FormProvider>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <div className="text-center">
                            <h3 className="mb-2 text-lg font-medium">
                                Project not found
                            </h3>
                            <p className="text-text-muted">
                                The selected project could not be found.
                            </p>
                        </div>
                    </div>
                )}
            </main>
        </Layout>
    );
}
