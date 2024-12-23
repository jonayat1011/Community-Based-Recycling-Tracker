import { User } from './user.entity';
import { Event } from './event.entity';
export declare enum Type {
    Metalic = "Metalic",
    Plastic = "Plastic",
    Paper = "Paper"
}
export declare class Contribution {
    id: number;
    materialType: Type;
    quantity: number;
    contributor: User;
    event: Event;
}
