export type ContactInfoMetadata = {
    linkedIn: {
        title: string;
    };
    twitter: {
        followers?: number;
    };
    github: {
        contributions: number;
    };
    discord: {
        statusIcon: string;
        status: string;
    };
};

export type ContactInfo = {
    discord: string;
    mail: string;
    twitter: string;
    github: string;
    linkedIn: string;
    _metadata: ContactInfoMetadata;
};
