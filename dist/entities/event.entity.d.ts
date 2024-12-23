import { User } from './user.entity';
import { Drive } from './drive.entity';
import { RecyclingCenter } from './recycling-center.entity';
import { Challenge } from './challenge.entity';
import { EventRegistration } from './event-registration.entity';
import { Contribution } from './contribution.entity';
import { Partnership } from './partnership.entity';
export declare class Event {
    id: number;
    name: string;
    description: string;
    eventDate: Date;
    location: string;
    organizer: User;
    partnership: Partnership;
    drive: Drive;
    recyclingcenter: RecyclingCenter;
    challenge: Challenge;
    registrations: EventRegistration[];
    contributions: Contribution[];
}
