declare namespace App.Data {
export type ProjectData = {
id: number;
title: string;
status: string;
priority: number;
content: string | null;
deadline: string | null;
client: string | null;
created_at: string;
updated_at: string;
};
export type ProjectSummaryData = {
id: number;
title: string;
status: string;
priority: number;
deadline: string | null;
client: string | null;
created_at: string;
updated_at: string;
};
}
