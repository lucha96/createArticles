export interface Article {
    Info: Info;
    Paragraphs: Paragraphs[];
} 

export interface Info {
    language: string;
    title: string;
    description: string;
    infoDestinationID: string[];
    infoMediaImg: string;
    subTitle?: string;
}

export interface Paragraphs {
    paragraphTitle: string[];
    paragraphText: string;
    paragraphDestinationID: string;
    paragraphMediaImg?: string;
}
