export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

export type Project = App.Data.ProjectData;
export type ProjectSummary = App.Data.ProjectSummaryData;

export type ProjectFormData = Omit<Project, "id" | "created_at" | "updated_at">;

export type SortOption = "priority" | "title" | "created_at" | "deadline";
