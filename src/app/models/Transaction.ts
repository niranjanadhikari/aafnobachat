export interface Transaction {
    id? : string;
    purpose? :string;
    source? :string;
    person? :string;
    amount? :number;
    date?: Date;
}


export interface Lenden {
    id? : string;
    person? :string;
    amount? :number;
    date?: Date;
}