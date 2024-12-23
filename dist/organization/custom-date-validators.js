"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartDateValidation = StartDateValidation;
exports.EndDateValidation = EndDateValidation;
const class_validator_1 = require("class-validator");
const date_fns_1 = require("date-fns");
function StartDateValidation(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'StartDateValidation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const today = new Date();
                    const sevenDaysAhead = (0, date_fns_1.addDays)(today, 7);
                    return (0, date_fns_1.isAfter)(value, sevenDaysAhead);
                },
                defaultMessage(args) {
                    return `${args.property} must be at least 7 days ahead from today.`;
                },
            },
        });
    };
}
function EndDateValidation(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'EndDateValidation',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    const startDate = args.object.startDate;
                    const twoDaysAfterStart = (0, date_fns_1.addDays)(startDate, 2);
                    const fiveDaysAfterStart = (0, date_fns_1.addDays)(startDate, 5);
                    return (0, date_fns_1.isAfter)(value, twoDaysAfterStart) && !(0, date_fns_1.isAfter)(value, fiveDaysAfterStart);
                },
                defaultMessage(args) {
                    return `${args.property} must be more than 2 days after the start date and less than 5 days.`;
                },
            },
        });
    };
}
//# sourceMappingURL=custom-date-validators.js.map