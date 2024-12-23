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
exports.RecyclingCenter = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const event_entity_1 = require("./event.entity");
let RecyclingCenter = class RecyclingCenter {
};
exports.RecyclingCenter = RecyclingCenter;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], RecyclingCenter.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 100, { message: 'Name must be between 5 and 100 characters' }),
    __metadata("design:type", String)
], RecyclingCenter.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 200, { message: 'Address must be between 10 and 200 characters' }),
    __metadata("design:type", String)
], RecyclingCenter.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(10, 20, {
        message: 'Contact number must be between 10 and 20 characters',
    }),
    __metadata("design:type", String)
], RecyclingCenter.prototype, "contactNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsUrl)({}, { message: 'Website URL must be a valid URL' }),
    __metadata("design:type", String)
], RecyclingCenter.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, class_validator_1.IsNumber)({}, { message: 'Latitude must be a number' }),
    __metadata("design:type", Number)
], RecyclingCenter.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, class_validator_1.IsNumber)({}, { message: 'Longitude must be a number' }),
    __metadata("design:type", Number)
], RecyclingCenter.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, (event) => event.drive),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", event_entity_1.Event)
], RecyclingCenter.prototype, "event", void 0);
exports.RecyclingCenter = RecyclingCenter = __decorate([
    (0, typeorm_1.Entity)()
], RecyclingCenter);
//# sourceMappingURL=recycling-center.entity.js.map