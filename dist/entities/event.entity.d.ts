import { User } from './user.entity';
import { Drive } from './drive.entity';
export declare class Event {
    id: number;
    name: string;
    description: string;
    eventDate: Date;
    location: string;
    organizer: User;
    drive: Drive;
}
