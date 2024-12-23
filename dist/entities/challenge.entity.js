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
exports.Challenge = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const challenge_participation_entity_1 = require("./challenge-participation.entity");
const event_entity_1 = require("./event.entity");
let Challenge = class Challenge {
};
exports.Challenge = Challenge;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Challenge.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5, 100),
    __metadata("design:type", String)
], Challenge.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Challenge.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], Challenge.prototype, "startDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, class_validator_1.IsDateString)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], Challenge.prototype, "endDate", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Challenge.prototype, "rewardPoints", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => challenge_participation_entity_1.ChallengeParticipation, (participation) => participation.challenge),
    __metadata("design:type", Array)
], Challenge.prototype, "participations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => event_entity_1.Event, (event) => event.challenge),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", event_entity_1.Event)
], Challenge.prototype, "event", void 0);
exports.Challenge = Challenge = __decorate([
    (0, typeorm_1.Entity)()
], Challenge);
//# sourceMappingURL=challenge.entity.js.map