import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";

export class DtoFactory<T> {
    private entityClass: new () => T;

    constructor(entityClass: new () => T) {
        this.entityClass = entityClass;
    }

    public createInstance(data: any): T {
        const dto: T = plainToInstance(this.entityClass, data);
        const validationErrors = validateSync(dto as object);

        if (validationErrors?.length > 0) {
            throw new Error("Error!")
        }

        return dto;
    }
}