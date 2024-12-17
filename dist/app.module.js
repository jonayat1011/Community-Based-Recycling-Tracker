"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const drive_entity_1 = require("./entities/drive.entity");
const reward_entity_1 = require("./entities/reward.entity");
const resource_entity_1 = require("./entities/resource.entity");
const recycling_center_entity_1 = require("./entities/recycling-center.entity");
const partnership_entity_1 = require("./entities/partnership.entity");
const event_entity_1 = require("./entities/event.entity");
const contribution_entity_1 = require("./entities/contribution.entity");
const challenge_entity_1 = require("./entities/challenge.entity");
const challenge_participation_entity_1 = require("./entities/challenge-participation.entity");
const organization_module_1 = require("./organization/organization.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: '@1545',
                database: 'community_recycling',
                entities: [user_entity_1.User, drive_entity_1.Drive, reward_entity_1.Reward, resource_entity_1.Resource, recycling_center_entity_1.RecyclingCenter, partnership_entity_1.Partnership, event_entity_1.Event, contribution_entity_1.Contribution, challenge_entity_1.Challenge, challenge_participation_entity_1.ChallengeParticipation],
                synchronize: true,
            }),
            organization_module_1.OrganizationModule
        ],
        controllers: [app_controller_1.AppController,],
        providers: [app_service_1.AppService,],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map