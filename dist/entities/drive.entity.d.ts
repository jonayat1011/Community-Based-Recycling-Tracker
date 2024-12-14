import { User } from './user.entity';
export declare class Drive {
    id: number;
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
    organizer: User;
}
