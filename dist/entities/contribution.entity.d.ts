import { User } from './user.entity';
export declare class Contribution {
    id: number;
    materialType: string;
    quantity: number;
    contributor: User;
}
