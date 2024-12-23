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
exports.Partnership = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("./user.entity");
let Partnership = class Partnership {
};
exports.Partnership = Partnership;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Partnership.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(3, 50, {
        message: 'Partner name must be between 3 and 50 characters',
    }),
    __metadata("design:type", String)
], Partnership.prototype, "partnerName", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    (0, class_validator_1.IsDate)({ message: 'Start date must be a valid date' }),
    __metadata("design:type", Date)
], Partnership.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    (0, class_validator_1.IsDate)({ message: 'End date must be a valid date' }),
    __metadata("design:type", Date)
], Partnership.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.partnerships),
    __metadata("design:type", user_entity_1.User)
], Partnership.prototype, "user", void 0);
exports.Partnership = Partnership = __decorate([
    (0, typeorm_1.Entity)()
], Partnership);
//# sourceMappingURL=partnership.entity.js.map