import { User } from './user.entity';
export declare enum NotificationType {
    PartnershipRequest = "PartnershipRequest",
    EventRequest = "EventRequest",
    PartnershipConfirmed = "PartnershipConfirmed",
    EventConfirmed = "EventConfirmed",
    NewEvent = "NewEvent"
}
export declare class Notification {
    id: number;
    message: string;
    type: NotificationType;
    entityId: number;
    fromUser: User;
    isRead: boolean;
    createdAt: Date;
    expiryDate: Date;
}
