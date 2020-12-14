import { Subscription } from 'rxjs/internal/Subscription';

export interface Dataloadint {
    data: File;
    state: string;
    inProgress: boolean;
    progress: number;
    canRetry: boolean;
    canCancel: boolean;
    sub?: Subscription;
}
