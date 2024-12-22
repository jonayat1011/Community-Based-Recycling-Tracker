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
exports.Event = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("./user.entity");
const drive_entity_1 = require("./drive.entity");
let Event = class Event {
};
exports.Event = Event;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Event.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 100, {
        message: 'Event name must be between 5 and 100 characters',
    }),
    __metadata("design:type", String)
], Event.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, class_validator_1.IsString)({ message: 'Description must be a string' }),
    __metadata("design:type", String)
], Event.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp'),
    (0, class_validator_1.IsDate)({ message: 'Event date must be a valid date' }),
    __metadata("design:type", Date)
], Event.prototype, "eventDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)({ message: 'Location must be a string' }),
    __metadata("design:type", String)
], Event.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.events),
    __metadata("design:type", user_entity_1.User)
], Event.prototype, "organizer", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => drive_entity_1.Drive, (drive) => drive.event),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", drive_entity_1.Drive)
], Event.prototype, "drive", void 0);
exports.Event = Event = __decorate([
    (0, typeorm_1.Entity)()
], Event);
//# sourceMappingURL=event.entity.js.map