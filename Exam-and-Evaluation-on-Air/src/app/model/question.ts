export class IQuestion {
    public response: questionDocs;
}

export class questionDocs {
    public docs: questions[];
}

export class questions {
    id: number;
    Question: string;
    Mark: number;
    Score: number;
    Type: string;
}