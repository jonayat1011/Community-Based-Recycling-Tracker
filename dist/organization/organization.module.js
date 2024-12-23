"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationModule = void 0;
const common_1 = require("@nestjs/common");
const organization_service_1 = require("./organization.service");
const organization_controller_1 = require("./organization.controller");
const typeorm_1 = require("@nestjs/typeorm");
const drive_entity_1 = require("../entities/drive.entity");
const partnership_entity_1 = require("../entities/partnership.entity");
const resource_entity_1 = require("../entities/resource.entity");
const notification_entity_1 = require("../entities/notification.entity");
const event_entity_1 = require("../entities/event.entity");
const event_registration_entity_1 = require("../entities/event-registration.entity");
const contribution_entity_1 = require("../entities/contribution.entity");
const user_entity_1 = require("../entities/user.entity");
let OrganizationModule = class OrganizationModule {
};
exports.OrganizationModule = OrganizationModule;
exports.OrganizationModule = OrganizationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                drive_entity_1.Drive,
                partnership_entity_1.Partnership,
                resource_entity_1.Resource,
                notification_entity_1.Notification,
                event_entity_1.Event,
                event_registration_entity_1.EventRegistration,
                contribution_entity_1.Contribution,
                user_entity_1.User
            ]),
        ],
        providers: [organization_service_1.OrganizationService],
        controllers: [organization_controller_1.OrganizationController]
    })
], OrganizationModule);
//# sourceMappingURL=organization.module.js.map