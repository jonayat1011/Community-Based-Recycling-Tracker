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
const typeorm_2 = require("typeorm");
const notification_entity_1 = require("../entities/notification.entity");
const drive_entity_1 = require("../entities/drive.entity");
const partnership_entity_1 = require("../entities/partnership.entity");
const event_entity_1 = require("../entities/event.entity");
const resource_entity_1 = require("../entities/resource.entity");
const event_registration_entity_1 = require("../entities/event-registration.entity");
const contribution_entity_1 = require("../entities/contribution.entity");
const user_entity_1 = require("../entities/user.entity");
const date_fns_1 = require("date-fns");
const schedule_1 = require("@nestjs/schedule");
let OrganizationService = class OrganizationService {
    constructor(driveRepository, partnershipRepository, notificationRepository, resourceRepository, eventRepository, eventRegistrationRepository, contributionRepository, userRepository) {
        this.driveRepository = driveRepository;
        this.partnershipRepository = partnershipRepository;
        this.notificationRepository = notificationRepository;
        this.resourceRepository = resourceRepository;
        this.eventRepository = eventRepository;
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.contributionRepository = contributionRepository;
        this.userRepository = userRepository;
    }
    async getDrives(orgId) {
        const drives = await this.driveRepository.find({ where: { organizer: { id: orgId } } });
        if (!drives.length) {
            throw new common_1.NotFoundException('No drives found for this organization');
        }
        return drives;
    }
    async createDrive(user, createDriveDto) {
        const today = new Date();
        const sevenDaysAhead = (0, date_fns_1.addDays)(today, 7);
        if (!(0, date_fns_1.isAfter)(createDriveDto.startDate, sevenDaysAhead)) {
            throw new common_1.BadRequestException('Start date must be at least 7 days from today');
        }
        const twoDaysAfterStart = (0, date_fns_1.addDays)(createDriveDto.startDate, 2);
        const fiveDaysAfterStart = (0, date_fns_1.addDays)(createDriveDto.startDate, 5);
        if (!(0, date_fns_1.isAfter)(createDriveDto.endDate, twoDaysAfterStart) ||
            (0, date_fns_1.isAfter)(createDriveDto.endDate, fiveDaysAfterStart)) {
            throw new common_1.BadRequestException('End date must be more than 2 days after the start date and less than 5 days');
        }
        const drive = this.driveRepository.create(createDriveDto);
        drive.organizer = { id: user.id };
        const savedDrive = await this.driveRepository.save(drive);
        await this.notificationRepository.save({
            message: `New Event Request: ${createDriveDto.title}`,
            type: notification_entity_1.NotificationType.EventRequest,
            fromUser: { id: user.id },
            entityId: savedDrive.id,
        });
        return savedDrive;
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
    async handleDriveStatusUpdates() {
        console.log('Updating drive statuses...');
        await this.updateDriveStatus();
    }
    async updateDriveStatus() {
        const today = new Date();
        await this.driveRepository
            .createQueryBuilder()
            .update(drive_entity_1.Drive)
            .set({ status: drive_entity_1.DriveStatus.ONGOING })
            .where('status = :status', { status: drive_entity_1.DriveStatus.APPROVED })
            .andWhere('startDate <= :today', { today })
            .execute();
        await this.driveRepository
            .createQueryBuilder()
            .update(drive_entity_1.Drive)
            .set({ status: drive_entity_1.DriveStatus.COMPLETED })
            .where('status = :status', { status: drive_entity_1.DriveStatus.ONGOING })
            .andWhere('endDate <= :today', { today })
            .execute();
    }
    async getPartnerships(orgId) {
        const partnerships = await this.partnershipRepository.find({ where: { hostUser: { id: orgId } } });
        if (!partnerships.length) {
            throw new common_1.NotFoundException('No partnerships found for this organization');
        }
        return partnerships;
    }
    async createPartnership(user, createPartnershipDto) {
        const newPartnership = this.partnershipRepository.create(createPartnershipDto);
        newPartnership.hostUser = { id: user.id };
        const savedPartnership = await this.partnershipRepository.save(newPartnership);
        await this.notificationRepository.save({
            message: `Partnership request sent to ${createPartnershipDto.partnerName}`,
            type: notification_entity_1.NotificationType.PartnershipRequest,
            fromUser: { id: user.id },
            toUser: { id: newPartnership.guestUser },
            entityId: savedPartnership.id,
        });
        return savedPartnership;
    }
    async updatePartnership(id, updatePartnershipDto) {
        const partnership = await this.partnershipRepository.findOne({ where: { id } });
        if (!partnership) {
            throw new common_1.NotFoundException('Partnership not found');
        }
        Object.assign(partnership, updatePartnershipDto);
        return await this.partnershipRepository.save(partnership);
    }
    async statusPartnership(id, updatePartnershipDto) {
        const partnership = await this.partnershipRepository.findOne({ where: { id } });
        if (!partnership) {
            throw new common_1.NotFoundException('Partnership not found');
        }
        if (partnership.guestUser.id == id) {
            Object.assign(partnership, updatePartnershipDto);
            return await this.partnershipRepository.save(partnership);
        }
        return { message: 'Partnership is not for You' };
    }
    async deletePartnership(id) {
        const partnership = await this.partnershipRepository.findOne({ where: { id } });
        if (!partnership) {
            throw new common_1.NotFoundException('Partnership not found');
        }
        await this.partnershipRepository.remove(partnership);
        return { message: 'Partnership deleted successfully' };
    }
    async findPartners() {
        return this.userRepository.find({
            where: { role: 'Organization' },
            select: ['id', 'name', 'email'],
        });
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
        const savedResource = await this.resourceRepository.save(newResource);
        return savedResource;
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
    async getNotifications(orgId) {
        const notifications = await this.notificationRepository.find({
            where: [
                {
                    type: (0, typeorm_2.In)([notification_entity_1.NotificationType.NewEvent]),
                },
                {
                    type: (0, typeorm_2.In)([notification_entity_1.NotificationType.EventRequest]),
                    fromUser: { id: orgId },
                },
                {
                    type: (0, typeorm_2.In)([notification_entity_1.NotificationType.PartnershipRequest]),
                    fromUser: { id: orgId },
                },
                {
                    type: (0, typeorm_2.In)([notification_entity_1.NotificationType.PartnershipRequest]),
                    toUser: { id: orgId },
                },
            ],
        });
        if (!notifications.length) {
            throw new common_1.NotFoundException('No notifications found for this organization');
        }
        return notifications;
    }
    async getDashboard(orgId) {
        const eventCount = await this.eventRepository.count({
            where: [
                {
                    organizer: { id: orgId }
                },
                {
                    partnership: { hostUser: { id: orgId } }
                },
                {
                    partnership: { guestUser: { id: orgId } }
                },
            ],
        });
        const driveCount = await this.driveRepository.count({ where: { organizer: { id: orgId } } });
        const partnershipCount = await this.partnershipRepository.count({ where: { hostUser: { id: orgId } } });
        const resourceCount = await this.resourceRepository.count({ where: { user: { id: orgId } } });
        const registrationCount = await this.eventRegistrationRepository.count({
            where: [
                {
                    event: {
                        organizer: {
                            id: orgId,
                        },
                    },
                },
                {
                    event: {
                        partnership: { hostUser: { id: orgId } }
                    },
                },
                {
                    event: {
                        partnership: { guestUser: { id: orgId } }
                    },
                },
            ],
        });
        const notificationCount = await this.notificationRepository.count({
            where: [
                { type: notification_entity_1.NotificationType.NewEvent, fromUser: { id: orgId } },
                { type: notification_entity_1.NotificationType.EventRequest, fromUser: { id: orgId } },
                { type: notification_entity_1.NotificationType.PartnershipRequest, fromUser: { id: orgId } },
                { type: notification_entity_1.NotificationType.PartnershipRequest, toUser: { id: orgId } },
            ],
        });
        const contributions = await this.contributionRepository.find({
            where: [
                {
                    event: {
                        organizer: {
                            id: orgId,
                        },
                    },
                },
                {
                    event: {
                        partnership: { hostUser: { id: orgId } }
                    },
                },
                {
                    event: {
                        partnership: { guestUser: { id: orgId } }
                    },
                },
            ],
        });
        const totalMaterialQuantity = contributions.reduce((total, contribution) => total + contribution.quantity, 0);
        return {
            event: eventCount,
            drives: driveCount,
            partnerships: partnershipCount,
            resources: resourceCount,
            MaterialQuantity: totalMaterialQuantity,
            registrations: registrationCount,
            notifications: notificationCount,
        };
    }
};
exports.OrganizationService = OrganizationService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrganizationService.prototype, "handleDriveStatusUpdates", null);
exports.OrganizationService = OrganizationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(drive_entity_1.Drive)),
    __param(1, (0, typeorm_1.InjectRepository)(partnership_entity_1.Partnership)),
    __param(2, (0, typeorm_1.InjectRepository)(notification_entity_1.Notification)),
    __param(3, (0, typeorm_1.InjectRepository)(resource_entity_1.Resource)),
    __param(4, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(5, (0, typeorm_1.InjectRepository)(event_registration_entity_1.EventRegistration)),
    __param(6, (0, typeorm_1.InjectRepository)(contribution_entity_1.Contribution)),
    __param(7, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], OrganizationService);
//# sourceMappingURL=organization.service.js.map