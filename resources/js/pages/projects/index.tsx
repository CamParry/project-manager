import { Header } from "@/components/header";
import { Layout } from "@/components/layout";
import { Sidebar } from "@/components/sidebar";
import { ProjectSummary } from "@/types";

export default function Index({ projects }: { projects: ProjectSummary[] }) {
    return (
        <Layout title="Projects">
            <Sidebar projects={projects} />
            <main className="flex h-screen grow flex-col">
                <Header />
                <div className="flex-center mx-auto max-w-md grow flex-col">
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
