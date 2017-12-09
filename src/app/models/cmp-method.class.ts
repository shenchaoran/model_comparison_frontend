
export class CmpMethod {
    id: string;
    name: string;

    private static METHODS: Array<CmpMethod> = [
        {
            id: '',
            name: ''
        }
    ];

    static get methods() {
        return CmpMethod.METHODS;
    }

    static find(id: string) {
        return _.find(CmpMethod.METHODS, method => {
            return method.id === id;
        });
    }
}