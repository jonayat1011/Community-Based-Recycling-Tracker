import { Drive } from './drive.entity';
import { Partnership } from './partnership.entity';
import { Contribution } from './contribution.entity';
import { Event } from './event.entity';
import { Notification } from './notification.entity';
import { EventRegistration } from './event-registration.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    role: string;
    password: string;
    isActive: boolean;
    drives: Drive[];
    partnerships: Partnership[];
    contributions: Contribution[];
    events: Event[];
    notifications: Notification[];
    eventRegistrations: EventRegistration[];
}
