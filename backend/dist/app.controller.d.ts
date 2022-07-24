import { Router } from 'express';
export declare class AppController {
    router: Router;
    login(res: any, req: any): Promise<void>;
    wlcome(): Promise<string>;
}
