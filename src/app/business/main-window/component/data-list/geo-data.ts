export enum GeoDataType {
    RAW = 1,
    UDX = 2
}

export class GeoData {
    gdid: string
    filename: string;
    path: string;
    type: GeoDataType;
    tag: string;
    constructor(filename, path, type, tag) {
        this.filename = filename;
        this.path = path;
        this.type = type;
        this.tag = tag;
    }
}