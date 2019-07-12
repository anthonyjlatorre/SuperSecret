export interface Question {
    results: Array<Result>
}

export interface Result {
    category: string,
    type: string,
    difficulty: string,
    question: string,
    correctAnswer: string
}