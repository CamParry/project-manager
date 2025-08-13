/**
 * Centralized project status and priority label functions
 * These map the raw values from the backend to human-readable labels
 */

export type ProjectStatusValue = 
    | "not-started" 
    | "waiting" 
    | "in-progress" 
    | "on-hold" 
    | "cancelled" 
    | "completed";

export type ProjectPriorityValue = 1 | 2 | 3 | 4;

/**
 * Get human-readable status label from status value
 */
export function getStatusLabel(status: ProjectStatusValue): string {
    const statusLabels: Record<ProjectStatusValue, string> = {
        "not-started": "Not Started",
        "waiting": "Waiting",
        "in-progress": "In Progress",
        "on-hold": "On Hold",
        "cancelled": "Cancelled",
        "completed": "Completed",
    };
    
    return statusLabels[status] || "Not Started";
}

/**
 * Get human-readable priority label from priority value
 */
export function getPriorityLabel(priority: ProjectPriorityValue): string {
    const priorityLabels: Record<ProjectPriorityValue, string> = {
        1: "Urgent",
        2: "High", 
        3: "Medium",
        4: "Low",
    };
    
    return priorityLabels[priority] || "Low";
}

/**
 * Get all available status options for dropdowns
 */
export function getStatusOptions() {
    return [
        { value: "not-started", label: "Not Started" },
        { value: "waiting", label: "Waiting" },
        { value: "in-progress", label: "In Progress" },
        { value: "on-hold", label: "On Hold" },
        { value: "cancelled", label: "Cancelled" },
        { value: "completed", label: "Completed" },
    ] as const;
}

/**
 * Get all available priority options for dropdowns
 */
export function getPriorityOptions() {
    return [
        { value: 1, label: "Urgent" },
        { value: 2, label: "High" },
        { value: 3, label: "Medium" },
        { value: 4, label: "Low" },
    ] as const;
}