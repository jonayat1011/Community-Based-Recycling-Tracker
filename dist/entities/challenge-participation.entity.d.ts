import { User } from './user.entity';
import { Challenge } from './challenge.entity';
export declare class ChallengeParticipation {
    id: number;
    participant: User;
    challenge: Challenge;
    completed: boolean;
    completionDate: Date;
}
