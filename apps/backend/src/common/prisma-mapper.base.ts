import { ClassTransformOptions, plainToInstance } from 'class-transformer';

export abstract class PrismaMapperBase<TModel, TDefaultDto> {
  constructor(
    private readonly dtoClass: new () => TDefaultDto,
    private readonly defaultTransformOptions: ClassTransformOptions = {
      excludeExtraneousValues: false,
    }
  ) {}

  protected toDefaultDto(
    model: TModel,
    transformOptions?: ClassTransformOptions
  ): TDefaultDto {
    const options = transformOptions || this.defaultTransformOptions;
    return plainToInstance(this.dtoClass, model, options);
  }

  protected toDefaultDtos(
    models: TModel[],
    transformOptions?: ClassTransformOptions
  ): TDefaultDto[] {
    const options = transformOptions || this.defaultTransformOptions;
    return models.map((model) => this.toDefaultDto(model, options));
  }

  protected toDto<TDto>(
    model: TModel,
    dtoClass: new () => TDto,
    transformOptions?: ClassTransformOptions
  ): TDto {
    const options = transformOptions || this.defaultTransformOptions;
    return plainToInstance(dtoClass, model, options);
  }

  protected toDtos<TDto>(
    models: TModel[],
    dtoClass: new () => TDto,
    transformOptions?: ClassTransformOptions
  ): TDto[] {
    const options = transformOptions || this.defaultTransformOptions;
    return models.map((model) => this.toDto(model, dtoClass, options));
  }
}
