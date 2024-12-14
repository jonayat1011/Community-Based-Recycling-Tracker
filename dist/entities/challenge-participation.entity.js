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
exports.ChallengeParticipation = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const user_entity_1 = require("./user.entity");
const challenge_entity_1 = require("./challenge.entity");
let ChallengeParticipation = class ChallengeParticipation {
};
exports.ChallengeParticipation = ChallengeParticipation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ChallengeParticipation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id),
    __metadata("design:type", user_entity_1.User)
], ChallengeParticipation.prototype, "participant", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => challenge_entity_1.Challenge, (challenge) => challenge.participations),
    __metadata("design:type", challenge_entity_1.Challenge)
], ChallengeParticipation.prototype, "challenge", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, class_validator_1.IsBoolean)({ message: 'Completed must be a boolean value' }),
    __metadata("design:type", Boolean)
], ChallengeParticipation.prototype, "completed", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsDate)({ message: 'Completion date must be a valid date' }),
    __metadata("design:type", Date)
], ChallengeParticipation.prototype, "completionDate", void 0);
exports.ChallengeParticipation = ChallengeParticipation = __decorate([
    (0, typeorm_1.Entity)()
], ChallengeParticipation);
//# sourceMappingURL=challenge-participation.entity.js.map