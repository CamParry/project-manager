import { ProjectFormData } from "@/types";

export type ValidationErrors = Partial<Record<keyof ProjectFormData, string>>;

/**
 * Validate project form data with non-intrusive validation
 * Returns validation errors without throwing or blocking
 */
export function validateProjectForm(data: Partial<ProjectFormData>): ValidationErrors {
    const errors: ValidationErrors = {};

    // Title validation
    if (data.title !== undefined) {
        if (data.title && data.title.length > 255) {
            errors.title = "Title must be less than 255 characters";
        }
    }

    // Client validation  
    if (data.client !== undefined) {
        if (data.client && data.client.length > 255) {
            errors.client = "Client name must be less than 255 characters";
        }
    }

    // Deadline validation
    if (data.deadline !== undefined) {
        if (data.deadline && !isValidDate(data.deadline)) {
            errors.deadline = "Please enter a valid date";
        }
    }

    // Status validation
    if (data.status !== undefined) {
        const validStatuses = ["not-started", "planning", "waiting", "in-progress", "on-hold", "cancelled", "completed"];
        if (data.status && !validStatuses.includes(data.status)) {
            errors.status = "Please select a valid status";
        }
    }

    // Priority validation
    if (data.priority !== undefined) {
        if (data.priority && ![1, 2, 3, 4].includes(data.priority)) {
            errors.priority = "Please select a valid priority";
        }
    }

    return errors;
}

/**
 * Check if a date string is valid
 */
function isValidDate(dateString: string): boolean {
    if (!dateString) return true; // Empty is valid (nullable)
    
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
}

/**
 * Get validation error for a specific field
 */
export function getFieldError(
    errors: ValidationErrors, 
    field: keyof ProjectFormData
): string | undefined {
    return errors[field];
}

/**
 * Check if form has any validation errors
 */
export function hasValidationErrors(errors: ValidationErrors): boolean {
    return Object.keys(errors).length > 0;
}