import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import { ValidationError } from "./validation-error";


export class ClassValidatorFactory<T> {
    private entityClass: new () => T;

    constructor(entityClass: new () => T) {
        this.entityClass = entityClass;
    }

    public createInstance(data: any): T {
        const dto: T = plainToInstance(this.entityClass, data);
        const validationErrors = validateSync(dto as object);

        if (validationErrors?.length > 0) {
            const errors = validationErrors.map(e => e);
            throw new ValidationError(validationErrors);
        }

        return dto;
    }
}