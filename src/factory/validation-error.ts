export class ValidationError extends Error {
    errorList: any[];

    constructor(errorList: any[] = []) {
        super("Validation failed: The provided data contains errors.");
        this.name = "ValidationError";
        this.errorList = errorList;
    }
}
