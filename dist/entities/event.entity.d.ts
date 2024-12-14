import { User } from './user.entity';
export declare class Event {
    id: number;
    name: string;
    description: string;
    eventDate: Date;
    location: string;
    organizer: User;
}
