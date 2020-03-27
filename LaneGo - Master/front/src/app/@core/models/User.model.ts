export class UserModel {
    id?: number;
    name?: string;
    lastName?: string;
    phone?: number;
    address?: string;
    email?: string;
    picture?: string | ArrayBuffer;
    location?: string | Array<string>;
    shareLocation?: boolean;
    whatsapp?: number;

    constructor(obj: any) {
        this.id = obj.Id;
        this.name = obj.Name;
        this.lastName = obj.LastName;
        this.phone = obj.Phone;
        this.address = obj.Address;
        this.email = obj.Email;
        this.picture = obj.Picture;
        this.location = obj.Location;
        this.shareLocation = obj.ShareLocation;
        this.whatsapp = obj.Whatsapp;
    }
}