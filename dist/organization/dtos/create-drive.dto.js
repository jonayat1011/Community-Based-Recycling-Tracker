"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDriveDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const custom_date_validators_1 = require("../custom-date-validators");
class CreateDriveDto {
}
exports.CreateDriveDto = CreateDriveDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 100, { message: 'Title must be between 5 and 100 characters' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Title is required' }),
    __metadata("design:type", String)
], CreateDriveDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Description is required' }),
    __metadata("design:type", String)
], CreateDriveDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'Location must be a string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Location is required' }),
    __metadata("design:type", String)
], CreateDriveDto.prototype, "location", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'Start date must be a valid date' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Start date is required' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.Validate)(custom_date_validators_1.StartDateValidation, { message: 'Start date must be at least 7 days from today' }),
    __metadata("design:type", Date)
], CreateDriveDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsDate)({ message: 'End date must be a valid date' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'End date is required' }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.Validate)(custom_date_validators_1.EndDateValidation, {
        message: 'End date must be more than 2 days after the start date and less than 5 days',
    }),
    __metadata("design:type", Date)
], CreateDriveDto.prototype, "endDate", void 0);
//# sourceMappingURL=create-drive.dto.js.map