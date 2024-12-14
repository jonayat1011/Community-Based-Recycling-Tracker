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
exports.Contribution = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("./user.entity");
let Contribution = class Contribution {
};
exports.Contribution = Contribution;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Contribution.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Material type must be a string' }),
    __metadata("design:type", String)
], Contribution.prototype, "materialType", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, class_validator_1.IsNumber)({}, { message: 'Quantity must be a number' }),
    __metadata("design:type", Number)
], Contribution.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.contributions),
    __metadata("design:type", user_entity_1.User)
], Contribution.prototype, "contributor", void 0);
exports.Contribution = Contribution = __decorate([
    (0, typeorm_1.Entity)()
], Contribution);
//# sourceMappingURL=contribution.entity.js.map