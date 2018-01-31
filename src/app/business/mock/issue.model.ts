export class feature {
    name: string;
    desc: string;
    unit: string;
}

export class Issue {
    id: string;
    name: string;
    desc: string;
    startDate: string;
    endDate: string;
    spatial: Array<string>;
    features: Array<feature>;

    constructor(
        id: string,
        name: string,
        desc: string,
        startDate: string,
        endDate: string,
        spatial: Array<string>,
        features: Array<feature>
    ) {
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.startDate = startDate;
        this.endDate = startDate;
        this.spatial = spatial;
        this.features = features;
    }

}