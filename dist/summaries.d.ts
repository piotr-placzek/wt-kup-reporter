export declare class Summaries {
    private readonly wt_client;
    private readonly project;
    constructor(wt_client: any, project: any);
    getBranchSummariesForMonth(year: any, month: any): Promise<any>;
}
