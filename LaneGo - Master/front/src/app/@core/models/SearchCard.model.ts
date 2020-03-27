export class SearchCardModel {
    id?: number;
    name?: string;
    artistname?: string;
    picture?: string | ArrayBuffer;
    city?: string;
    distance?: number;
    thumbnailSrc?: string;
    phone?: number;
    email?: string;
    whatsapp?: number;
    experience?: string;
    achievements?: string;
    contactemail?: string;
    contactphone?: string;
    services?: string;
    paymentmethod?: string;
    genres?: Array<any>;
    instruments?: Array<any>;

    constructor(obj: any) {
        this.id = obj.number;
        this.name = obj.string;
        this.artistname = obj.string;
        this.picture = obj.string;
        this.city = obj.string;
        this.distance = obj.number;
        this.thumbnailSrc = obj.string;
        this.phone = obj.number;
        this.email = obj.string;
        this.whatsapp = obj.number;
        this.experience = obj.string;
        this.achievements = obj.string;
        this.contactemail = obj.string;
        this.contactphone = obj.string;
        this.services = obj.string;
        this.paymentmethod = obj.string;
    }
}