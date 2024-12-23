import { ChallengeParticipation } from './challenge-participation.entity';
export declare class Challenge {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    endDate: Date;
    rewardPoints: number;
    participations: ChallengeParticipation[];
}
