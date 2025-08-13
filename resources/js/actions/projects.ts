import { Project, ProjectSummary } from "@/types";
import { createHeaders } from "@/utils/csrf";
import {
    keepPreviousData,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";

const listProjects = async (): Promise<{
    projects: ProjectSummary[];
}> => {
    const response = await fetch("/api/projects", {
        method: "GET",
        headers: createHeaders({
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    return response.json();
};

const createProject = async (data: Partial<Project> = {}): Promise<Project> => {
    const response = await fetch("/projects", {
        method: "POST",
        headers: createHeaders({
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        }),
        body: JSON.stringify({
            title: "New Project",
            content: "",
            status: "not-started",
            priority: 4,
            client: null,
            deadline: null,
            ...data,
        }),
    });

    if (!response.ok) {
        throw new Error(`Failed to create project: ${response.statusText}`);
    }

    return response.json();
};

const updateProject = async (
    params: { projectId: number },
    data: Partial<Project>
): Promise<Project> => {
    const response = await fetch(`/projects/${params.projectId}`, {
        method: "PATCH",
        headers: createHeaders({
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        }),
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(
            `Failed to update project: ${response.status} ${response.statusText}`
        );
    }

    return response.json();
};

const deleteProject = async (params: { projectId: number }): Promise<void> => {
    const response = await fetch(`/projects/${params.projectId}`, {
        method: "DELETE",
        headers: createHeaders({
            Accept: "application/json",
            "X-Requested-With": "XMLHttpRequest",
        }),
    });
    if (!response.ok) {
        throw new Error(`Failed to delete project: ${response.statusText}`);
    }
};

export const useListProjects = (initialData?: ProjectSummary[]) => {
    return useQuery({
        queryKey: ["projects"],
        queryFn: async () => {
            const result = await listProjects();
            return result.projects;
        },
        initialData: initialData,
        staleTime: 1000 * 60 * 2, // Consider fresh for 2 minutes
        placeholderData: keepPreviousData, // Keep previous data while fetching new data
    });
};

export const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({
            data,
        }: {
            data?: Partial<Project>;
            onSuccess?: (data: Project) => void;
            onError?: (error: Error) => void;
        }) => createProject(data),

        retry: false, // Disable retries to prevent double creation

        onSuccess: (data, options) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            if (options.onSuccess) {
                options.onSuccess(data);
            }
        },

        onError: (error, options) => {
            if (options.onError) {
                options.onError(error);
            }
        },

        // Always refetch after error or success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};

export const useUpdateProject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            params,
            data,
        }: {
            params: { projectId: number };
            data: Partial<Project>;
            onSuccess?: (data: Project) => void;
            onError?: (error: Error) => void;
        }) => updateProject(params, data),

        onSuccess: (data, options) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({
                queryKey: ["project", options.params.projectId],
            });
            if (options.onSuccess) {
                options.onSuccess(data);
            }
        },

        onError: (error, options) => {
            if (options.onError) {
                options.onError(error);
            }
        },

        // Always refetch after error or success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};

export const useDeleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            params,
        }: {
            params: { projectId: number };
            onSuccess?: () => void;
            onError?: (error: Error) => void;
        }): Promise<void> => deleteProject(params),

        onSuccess: (_, options) => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            if (options.onSuccess) {
                options.onSuccess();
            }
        },

        onError: (error, options) => {
            if (options.onError) {
                options.onError(error);
            }
        },

        // Always refetch after error or success
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
    });
};
