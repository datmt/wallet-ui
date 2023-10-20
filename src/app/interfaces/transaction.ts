export interface Transaction {
    id?: string;
    walletId?: string;
    title: string;
    description?: string;
    category?: string;
    type?: string;
    images?: string[];
    amount?: number;
    currency?: string;
    ownerId?: string;
    createdDate?: Date;
}
