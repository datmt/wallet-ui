export interface Wallet {
    id?: string;
    ownerId?: string;
    title: string;
    description?: string;
    balance?: number;
    currency?: string;
    createdDate?: Date;
}
