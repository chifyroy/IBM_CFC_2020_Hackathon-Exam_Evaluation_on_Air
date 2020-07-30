export class ExpectedAnswer {
    public entities: answers[];
}

export class answers {
    type: string;
    text: string;
}

export class Entities {
    public entityTypes: entity[];
}
export class entity {
    label: string;
}

export class examDetails {
    public examType: [];
    public subjectNames: [];
    public standard: [];
    public entType: [];
}