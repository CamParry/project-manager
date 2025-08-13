import { Layout } from "@/components/layout";
import { Sidebar } from "@/components/sidebar";
import { ProjectSummary } from "@/types";

export default function Index({ projects }: { projects: ProjectSummary[] }) {
    return (
        <Layout title="Projects">
            <Sidebar projects={projects} />
            <main className="flex-center h-screen grow">
                <div className="flex-center mx-auto my-8 max-w-md flex-col">
                    <h1 className="text-center text-2xl font-bold">
                        Select a project
                    </h1>
                    <p className="mt-2 text-center text-text-muted">
                        Use the sidebar to navigate or create a new project.
                    </p>
                </div>
            </main>
        </Layout>
    );
}
