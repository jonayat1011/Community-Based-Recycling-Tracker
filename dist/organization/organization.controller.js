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
let OrganizationController = class OrganizationController {
    constructor(organizationService) {
        this.organizationService = organizationService;
    }
    async getDrives(orgId) {
        return this.organizationService.getDrives(orgId);
    }
    async createDrive(createDriveDto) {
        return this.organizationService.createDrive(createDriveDto);
    }
    async updateDrive(id, updateDriveDto) {
        return await this.organizationService.updateDrive(id, updateDriveDto);
    }
    async deleteDrive(id) {
        return this.organizationService.deleteDrive(id);
    }
    async getPartnerships(orgId) {
        return this.organizationService.getPartnerships(orgId);
    }
    async createPartnership(createPartnershipDto) {
        return this.organizationService.createPartnership(createPartnershipDto);
    }
    async updatePartnership(id, updatePartnershipDto) {
        return this.organizationService.updatePartnership(id, updatePartnershipDto);
    }
    async deletePartnership(id) {
        return this.organizationService.deletePartnership(id);
    }
    async getResources(orgId) {
        return this.organizationService.getResources(orgId);
    }
    async createResource(createResourceDto) {
        return this.organizationService.createResource(createResourceDto);
    }
    async updateResource(id, updateResourceDto) {
        return this.organizationService.updateResource(id, updateResourceDto);
    }
    async deleteResource(id) {
        return this.organizationService.deleteResource(id);
    }
};
exports.OrganizationController = OrganizationController;
__decorate([
    (0, common_1.Get)('drives/:orgId'),
    __param(0, (0, common_1.Param)('orgId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getDrives", null);
__decorate([
    (0, common_1.Post)('drives'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_drive_dto_1.CreateDriveDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createDrive", null);
__decorate([
    (0, common_1.Patch)('drives/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_drive_dto_1.UpdateDriveDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateDrive", null);
__decorate([
    (0, common_1.Delete)('drives/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteDrive", null);
__decorate([
    (0, common_1.Get)('partnerships/:orgId'),
    __param(0, (0, common_1.Param)('orgId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getPartnerships", null);
__decorate([
    (0, common_1.Post)('partnerships'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_partnership_dto_1.CreatePartnershipDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createPartnership", null);
__decorate([
    (0, common_1.Patch)('partnerships/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, create_partnership_dto_1.CreatePartnershipDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updatePartnership", null);
__decorate([
    (0, common_1.Delete)('partnerships/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deletePartnership", null);
__decorate([
    (0, common_1.Get)('resources/:orgId'),
    __param(0, (0, common_1.Param)('orgId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "getResources", null);
__decorate([
    (0, common_1.Post)('resources'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_resource_dto_1.CreateResourceDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "createResource", null);
__decorate([
    (0, common_1.Patch)('resources/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_resource_dto_1.UpdateResourceDto]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "updateResource", null);
__decorate([
    (0, common_1.Delete)('resources/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrganizationController.prototype, "deleteResource", null);
exports.OrganizationController = OrganizationController = __decorate([
    (0, common_1.Controller)('organization'),
    __metadata("design:paramtypes", [organization_service_1.OrganizationService])
], OrganizationController);
//# sourceMappingURL=organization.controller.js.map