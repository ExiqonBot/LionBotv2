export declare const createCustomDomainTunnel: (cliConfig: any, PORT: number) => Promise<{
    url: string;
    connections: Promise<any>[];
    child: any;
    stop: () => Promise<void>;
}>;
