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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = void 0;
const common_1 = require("@nestjs/common");
const organization_service_1 = require("./organization.service");
const create_drive_dto_1 = require("./dtos/create-drive.dto");
const update_drive_dto_1 = require("./dtos/update-drive.dto");
const create_partnership_dto_1 = require("./dtos/create-partnership.dto");
const create_resource_dto_1 = require("./dtos/create-resource.dto");
const update_resource_dto_1 = require("./dtos/update-resource.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const roles_guard_1 = require("../auth/roles.guard");
const roles_decorator_1 = require("../auth/roles.decorator");
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async getDrives(req) {
        const user = req.user;
        return this.organizationService.getDrives(user.id);
    }
    async createDrive(createDriveDto, req) {
        const user = req.user;
        return this.organizationService.createDrive(user, createDriveDto);
    }
    async updateDrive(id, updateDriveDto, req) {
        const user = req.user;
        return this.organizationService.updateDrive(id, updateDriveDto);
    }
    async deleteDrive(id, req) {
        const user = req.user;
        return this.organizationService.deleteDrive(id);
    }
    async getPartnerships(req) {
        const user = req.user;
        return this.organizationService.getPartnerships(user.id);
    }
    async createPartnership(createPartnershipDto, req) {
        const user = req.user;
        return this.organizationService.createPartnership(user, createPartnershipDto);
    }
    async updatePartnership(id, updatePartnershipDto, req) {
        const user = req.user;
        console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
        return this.organizationService.updatePartnership(id, updatePartnershipDto);
    }
    async statusPartnership(id, updatePartnershipDto, req) {
        const user = req.user;
        console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
        return this.organizationService.statusPartnership(id, updatePartnershipDto);
    }
    async deletePartnership(id, req) {
        const user = req.user;
        console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
        return this.organizationService.deletePartnership(id);
    }
    async findPartners(req) {
        const user = req.user;
        console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
        return this.organizationService.findPartners();
    }
    async getResources(req) {
        const user = req.user;
        return this.organizationService.getResources(user.id);
    }
    async createResource(createResourceDto, req) {
        const user = req.user;
        return this.organizationService.createResource(user, createResourceDto);
    }
    async updateResource(id, updateResourceDto, req) {
        const user = req.user;
        console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
        return this.organizationService.updateResource(id, updateResourceDto);
    }
    async deleteResource(id, req) {
        const user = req.user;
        console.log(`User Info: ID = ${user.id}, Name = ${user.name}`);
        return this.organizationService.deleteResource(id);
    }
    async getNotifications(req) {
        const user = req.user;
        return this.organizationService.getNotifications(user.id);
    }
    async getDashboard(req) {
        const user = req.user;
        return this.organizationService.getDashboard(user.id);
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)('drives'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getDrives", null);
__decorate([
    (0, common_1.Post)('drives'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_drive_dto_1.CreateDriveDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createDrive", null);
__decorate([
    (0, common_1.Patch)('drives/:id'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_drive_dto_1.UpdateDriveDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateDrive", null);
__decorate([
    (0, common_1.Delete)('drives/:id'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteDrive", null);
__decorate([
    (0, common_1.Get)('partnerships'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getPartnerships", null);
__decorate([
    (0, common_1.Post)('partnerships'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partnership_dto_1.CreatePartnershipDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createPartnership", null);
__decorate([
    (0, common_1.Patch)('partnerships/:id'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_partnership_dto_1.CreatePartnershipDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updatePartnership", null);
__decorate([
    (0, common_1.Patch)('partnerships-status/:id'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_partnership_dto_1.CreatePartnershipDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "statusPartnership", null);
__decorate([
    (0, common_1.Delete)('partnerships/:id'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deletePartnership", null);
__decorate([
    (0, common_1.Get)('partners'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "findPartners", null);
__decorate([
    (0, common_1.Get)('resources'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getResources", null);
__decorate([
    (0, common_1.Post)('resources'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resource_dto_1.CreateResourceDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createResource", null);
__decorate([
    (0, common_1.Patch)('resources/:id'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_resource_dto_1.UpdateResourceDto, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateResource", null);
__decorate([
    (0, common_1.Delete)('resources/:id'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteResource", null);
__decorate([
    (0, common_1.Get)('notification'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getNotifications", null);
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, roles_decorator_1.Roles)('Organization'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getDashboard", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)('organization'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RoleGuard),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map