export interface DocsResponse {
   success: boolean;
   items: IDocument[];
}

export interface IDocument {
   id: string;
   title: string;
   description: string;
   filename: string;
   keywords: string[];
   tags: string[];
   pages?: number[];
   createdDate: string;
}
