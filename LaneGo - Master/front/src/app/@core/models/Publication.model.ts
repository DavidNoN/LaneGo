export class PublicationModel {
    id?: number;
    description?: string;
    date?: string;
    files?: Array<{
        src: any,
        format: 'image'|'video'
    }> = [];
    showedFileIndex? = 0;
}