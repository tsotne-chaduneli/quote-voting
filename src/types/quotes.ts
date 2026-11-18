export type Edit = {
    id: number,
}
export type TextFields = {
    quote: string;
    author: string;
}
export interface Quote extends TextFields {
    id: number;
    vote: number;
}
