declare namespace App.Data {
export type ProjectData = {
id: number;
title: string;
content: string;
client: string | null;
deadline: string | null;
status: string;
priority: number;
created_at: string;
updated_at: string;
};
export type ProjectSummaryData = {
id: number;
title: string;
deadline: string | null;
status: string;
priority: number;
created_at: string;
updated_at: string;
};
}
