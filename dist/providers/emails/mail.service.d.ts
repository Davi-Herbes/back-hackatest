export declare class MailService {
    private transporter;
    constructor();
    sendUserConfirmation(username: string, email: string, code: number): Promise<void>;
}
