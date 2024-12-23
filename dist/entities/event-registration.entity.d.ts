import { User } from './user.entity';
import { Event } from './event.entity';
export declare class EventRegistration {
    id: number;
    user: User;
    event: Event;
    checkedIn: boolean;
    registrationDate: Date;
}
