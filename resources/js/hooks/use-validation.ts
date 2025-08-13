import { useCallback, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { ProjectFormData } from "@/types";
import { validateProjectForm, ValidationErrors } from "@/utils/validation";

/**
 * Hook for non-intrusive form validation that works with auto-save
 */
export function useValidation(form: UseFormReturn<ProjectFormData>) {
    // Get current form values
    const formValues = form.watch();

    // Validate current form state
    const validationErrors = useMemo(() => {
        return validateProjectForm(formValues);
    }, [formValues]);

    // Get error for a specific field
    const getFieldError = useCallback(
        (field: keyof ProjectFormData) => {
            return validationErrors[field];
        },
        [validationErrors]
    );

    // Check if field is valid (no error and has value)
    const isFieldValid = useCallback(
        (field: keyof ProjectFormData) => {
            const value = formValues[field];
            const hasError = !!validationErrors[field];
            const hasValue = value !== "" && value !== null && value !== undefined;
            
            return !hasError && hasValue;
        },
        [formValues, validationErrors]
    );

    // Check if form has any validation errors
    const hasErrors = useMemo(() => {
        return Object.keys(validationErrors).length > 0;
    }, [validationErrors]);

    // Get validation status for a field
    const getFieldValidation = useCallback(
        (field: keyof ProjectFormData) => ({
            error: validationErrors[field],
            isValid: isFieldValid(field),
            hasError: !!validationErrors[field],
        }),
        [validationErrors, isFieldValid]
    );

    return {
        errors: validationErrors,
        hasErrors,
        getFieldError,
        isFieldValid,
        getFieldValidation,
    };
}