import { User } from './user.entity';
export declare class Partnership {
    id: number;
    partnerName: string;
    startDate: Date;
    endDate: Date;
    user: User;
}
