import { User } from './user.entity';
import { Partnership } from './partnership.entity';
import { Event } from './event.entity';
export declare enum DriveStatus {
    PENDING = "pending",
    APPROVED = "Approved",
    ONGOING = "ongoing",
    COMPLETED = "completed",
    DECLINED = "declined"
}
export declare class Drive {
    id: number;
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    organizer: User;
    Partnership: Partnership;
    status: DriveStatus;
    event: Event;
}
