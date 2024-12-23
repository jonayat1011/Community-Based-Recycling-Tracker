import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { addDays, isAfter } from 'date-fns';

export function StartDateValidation(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'StartDateValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          const today = new Date();
          const sevenDaysAhead = addDays(today, 7);
          return isAfter(value, sevenDaysAhead);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be at least 7 days ahead from today.`;
        },
      },
    });
  };
}

export function EndDateValidation(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'EndDateValidation',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Date, args: ValidationArguments) {
          const startDate = (args.object as any).startDate;
          const twoDaysAfterStart = addDays(startDate, 2);
          const fiveDaysAfterStart = addDays(startDate, 5);
          return isAfter(value, twoDaysAfterStart) && !isAfter(value, fiveDaysAfterStart);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be more than 2 days after the start date and less than 5 days.`;
        },
      },
    });
  };
}
