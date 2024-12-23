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
exports.Drive = exports.DriveStatus = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("./user.entity");
const partnership_entity_1 = require("./partnership.entity");
const event_entity_1 = require("./event.entity");
var DriveStatus;
(function (DriveStatus) {
    DriveStatus["PENDING"] = "pending";
    DriveStatus["APPROVED"] = "Approved";
    DriveStatus["ONGOING"] = "ongoing";
    DriveStatus["COMPLETED"] = "completed";
    DriveStatus["DECLINED"] = "declined";
})(DriveStatus || (exports.DriveStatus = DriveStatus = {}));
let Drive = class Drive {
};
exports.Drive = Drive;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Drive.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 100, { message: 'Title must be between 5 and 100 characters' }),
    __metadata("design:type", String)
], Drive.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    __metadata("design:type", String)
], Drive.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Location must be a string' }),
    __metadata("design:type", String)
], Drive.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    (0, class_validator_1.IsDate)({ message: 'Start date must be a valid date' }),
    __metadata("design:type", Date)
], Drive.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    (0, class_validator_1.IsDate)({ message: 'End date must be a valid date' }),
    __metadata("design:type", Date)
], Drive.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.drives),
    __metadata("design:type", user_entity_1.User)
], Drive.prototype, "organizer", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => partnership_entity_1.Partnership, (partnership) => partnership.drives),
    __metadata("design:type", partnership_entity_1.Partnership)
], Drive.prototype, "Partnership", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: DriveStatus,
        default: DriveStatus.PENDING,
    }),
    __metadata("design:type", String)
], Drive.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => event_entity_1.Event, (event) => event.drive),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", event_entity_1.Event)
], Drive.prototype, "event", void 0);
exports.Drive = Drive = __decorate([
    (0, typeorm_1.Entity)()
], Drive);
//# sourceMappingURL=drive.entity.js.map