import { User } from './user.entity';
import { Drive } from './drive.entity';
export declare enum PartnershipStatus {
    REQUESTING = "requesting",
    ACCEPTED = "accepted",
    CANCELLED = "cancelled"
}
export declare class Partnership {
    id: number;
    partnerName: string;
    startDate: Date;
    endDate: Date;
    hostUser: User;
    guestUser: User;
    drives: Drive[];
    status: PartnershipStatus;
}
