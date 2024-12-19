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
exports.OrganizationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const drive_entity_1 = require("../entities/drive.entity");
const partnership_entity_1 = require("../entities/partnership.entity");
const resource_entity_1 = require("../entities/resource.entity");
const typeorm_2 = require("typeorm");
let OrganizationService = class OrganizationService {
    constructor(driveRepository, partnershipRepository, resourceRepository) {
        this.driveRepository = driveRepository;
        this.partnershipRepository = partnershipRepository;
        this.resourceRepository = resourceRepository;
    }
    async getDrives(orgId) {
        const drives = await this.driveRepository.find({ where: { organizer: { id: orgId } } });
        if (!drives.length) {
            throw new common_1.NotFoundException('No drives found for this organization');
        }
        return drives;
    }
    async createDrive(user, createDriveDto) {
        const drive = this.driveRepository.create(createDriveDto);
        drive.organizer = { id: user.id };
        return await this.driveRepository.save(drive);
    }
    async updateDrive(id, updateDriveDto) {
        const drive = await this.driveRepository.findOne({ where: { id } });
        if (!drive) {
            throw new common_1.NotFoundException('Drive not found');
        }
        Object.assign(drive, updateDriveDto);
        return await this.driveRepository.save(drive);
    }
    async deleteDrive(id) {
        const drive = await this.driveRepository.findOne({ where: { id } });
        if (!drive) {
            throw new common_1.NotFoundException('Drive not found');
        }
        await this.driveRepository.remove(drive);
        return { message: 'Drive deleted successfully' };
    }
    async getPartnerships(orgId) {
        const partnerships = await this.partnershipRepository.find({ where: { user: { id: orgId } } });
        if (!partnerships.length) {
            throw new common_1.NotFoundException('No partnerships found for this organization');
        }
        return partnerships;
    }
    async createPartnership(user, createPartnershipDto) {
        const newPartnership = this.partnershipRepository.create(createPartnershipDto);
        newPartnership.user = { id: user.id };
        return await this.partnershipRepository.save(newPartnership);
    }
    async updatePartnership(id, updatePartnershipDto) {
        const partnership = await this.partnershipRepository.findOne({ where: { id } });
        if (!partnership) {
            throw new common_1.NotFoundException('Partnership not found');
        }
        Object.assign(partnership, updatePartnershipDto);
        return await this.partnershipRepository.save(partnership);
    }
    async deletePartnership(id) {
        const partnership = await this.partnershipRepository.findOne({ where: { id } });
        if (!partnership) {
            throw new common_1.NotFoundException('Partnership not found');
        }
        await this.partnershipRepository.remove(partnership);
        return { message: 'Partnership deleted successfully' };
    }
    async getResources(orgId) {
        const resources = await this.resourceRepository.find({ where: { user: { id: orgId } } });
        if (!resources.length) {
            throw new common_1.NotFoundException('No resources found for this organization');
        }
        return resources;
    }
    async createResource(user, createResourceDto) {
        const newResource = this.resourceRepository.create(createResourceDto);
        newResource.user = { id: user.id };
        return await this.resourceRepository.save(newResource);
    }
    async updateResource(id, updateResourceDto) {
        const resource = await this.resourceRepository.findOne({ where: { id } });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        Object.assign(resource, updateResourceDto);
        return await this.resourceRepository.save(resource);
    }
    async deleteResource(id) {
        const resource = await this.resourceRepository.findOne({ where: { id } });
        if (!resource) {
            throw new common_1.NotFoundException('Resource not found');
        }
        await this.resourceRepository.remove(resource);
        return { message: 'Resource deleted successfully' };
    }
};
exports.OrganizationService = OrganizationService;
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(drive_entity_1.Drive)),
    __param(1, (0, typeorm_1.InjectRepository)(partnership_entity_1.Partnership)),
    __param(2, (0, typeorm_1.InjectRepository)(resource_entity_1.Resource)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map