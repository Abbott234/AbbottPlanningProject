
export class TFSWorkItem {
    constructor(
        public id: number,
        public title: string,
        public effort: number,
        public businessValue: number,
        public state: string,
        public description: string,
        public type: string,
        public areaPath: string,
        public iterationPath: string,
        public createdBy: string,
        public urlLink: string
    ) {
    }
}