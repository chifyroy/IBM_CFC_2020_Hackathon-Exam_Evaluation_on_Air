export class AnswerAnalysis {
    public facet_counts: facetCounts;
    public response: questionDocs;
}
export class facetCounts {
    public facet_queries: facetQueries;
    public facet_fields: facetFields;
}

export class facetQueries {
    public facet_queries: {};
}

export class facetFields {
    public facet_fields: {};
}

export class questionDocs {
    public docs: questions[];
}

export class questions {
    id: number;
    Type: string;
    Question: string;
    Mark: number;
    Score: number;
    totalScore: number;
    scoreCalculated: boolean;
    Answer: [];
}