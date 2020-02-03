import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Message {
  private senderUid: string;
  private receiverUid: string;
  private time: Date;
  private status: string;
  private message: {
    type: string,
    content: string
  };
  constructor(sender_uid: string, receiver_uid: string, tempTime: Date, tempStatus: string, type: string, content: string) {
    this.setSenderUid = sender_uid;
    this.setReceiverUid = receiver_uid;
    this.setTime = tempTime;
    this.setStatus = tempStatus;
    this.setType =  type;
    this.setContent = content;
  }
  public get getSenderUid(): string {
    return this.senderUid;
  }
  public set setSenderUid(uid: string) {
    this.senderUid = uid;
  }
  public get getReceiverUid(): string {
    return this.receiverUid;
  }
  public set setReceiverUid(uid: string) {
    this.receiverUid = uid;
  }
  public get getTime(): Date {
    return this.time;
  }
  public set setTime(tim: Date) {
    this.time = tim;
  }
  public get getStatus(): string {
    return this.status;
  }
  public set setStatus(stat: string) {
    this.status = stat;
  }
  public get getType(): string {
    return this.message.type;
  }
  public set setType(typ: string) {
    this.message.type = typ;
  }
  public get getContent(): string {
    return this.message.content;
  }
  public set setContent(cont: string) {
    this.message.content = cont;
  }
}

export class social {
  private type : string;
  private profile : string;
  private socialAccounts : socialAccount[];

  constructor(tempType: string, tempProfile: string, tempSocialAccount: socialAccount[]) {
    this.setType = tempType;
    this.setProfile = tempProfile;
    this.setSocialAccounts = tempSocialAccount;
  }
  public get getType(): string {
    return this.type;
  }
  public set setType(value: string) {
    if(value != null) {
      this.type = value;
    } else if(value == null) {
      this.type = "N/A";
    }
  }
  public get getProfile(): string {
    return this.profile;
  }
  public set setProfile(value: string) {
    if(value != null) {
      this.profile = value;
    } else if(value == null) {
      this.profile = "N/A";
    }
  }
  public get getSocialAccounts(): socialAccount[] {
    return this.socialAccounts;
  }
  public set setSocialAccounts(value: socialAccount[]) {
    if(value != null) {
      this.socialAccounts = value;
    } else if(value == null) {
      this.socialAccounts = [new socialAccount(null,null,null)];
    }
  }
}

export class socialAccount {
  private id : string;
  private user: string;
  private url: string;

  constructor(tempId: string, tempUser: string, tempUrl: string) {
    this.setId = tempId;
    this.setUrl = tempUrl;
    this.setUser = tempUser;
  }
  public get getId(): string {
    return this.id;
  }
  public set setId(value: string) {
    if(value != null) {
      this.id = value;
    } else if(value == null) {
      this.id = "N/A";
    }
  }
  public get getUrl(): string {
    return this.url;
  }
  public set setUrl(value: string) {
    if(value != null) {
      this.url = value;
    } else if(value == null) {
      this.url = "N/A";
    }
  }
  public get getUser(): string {
    return this.user;
  }
  public set setUser(value: string) {
    if(value != null) {
      this.user = value;
    } else if(value == null) {
      this.user = "N/A";
    }
  }
}

export class contact {
  private id : string;
  private name: string;
  private username: string;
  private email: string;
  private phoneNumber: string;
  private DOB: Date;
  private photo: string;
  private accessSocials: social[];

  constructor(tempId: string, tempUser: string, tempName: string,
    tempEmail: string, tempPhoneNum: string, tempDate: Date, tempPhoto: string,
    tempAccessSocial: social[]) {
      this.setId = tempId;
      this.setName = tempName;
      this.setUsername = tempUser;
      this.setEmail = tempEmail;
      this.setPhoneNumber = tempPhoneNum;
      this.setDOB = tempDate;
      this.setPhoto = tempPhoto;
      this.setAccessSocials = tempAccessSocial;
  }
  public get getId(): string {
    return this.id;
  }
  public set setId(value: string) {
    if(value != null) {
      this.id = value;
    } else if(value == null) {
      this.id = "N/A";
    }
  }
  public get getName(): string {
    return this.name;
  }
  public set setName(value: string) {
    if(value != null) {
      this.name = value;
    } else if(value == null) {
      this.name = "N/A";
    }
  }
  public get getUsername(): string {
    return this.username;
  }
  public set setUsername(value: string) {
    if(value != null) {
      this.username = value;
    } else if(value == null) {
      this.username = "N/A";
    }
  }
  public get getEmail(): string {
    return this.email;
  }
  public set setEmail(value: string) {
    if(value != null) {
      this.email = value;
    } else if(value == null) {
      this.email = "N/A";
    }
  }
  public getPhoneNumber(): string {
    return this.phoneNumber;
  }
  public set setPhoneNumber(value: string) {
    if(value != null) {
      this.phoneNumber = value;
    } else if(value == null) {
      this.phoneNumber = "N/A";
    }
  }
  public get getDOB(): Date {
    return this.DOB;
  }
  public set setDOB(value: Date) {
    if(value != null) {
      this.DOB = value;
    } else if(value == null) {
      this.DOB = new Date();
    }
  }
  public get getPhoto(): string {
    return this.photo;
  }
  public set setPhoto(value: string) {
    if(value != null) {
      this.photo = value;
    } else if(value == null) {
      this.photo = "N/A";
    }
  }
  public get getAccessSocials(): social[] {
    return this.accessSocials;
  }
  public set setAccessSocials(value: social[]) {
    if(value != null) {
      this.accessSocials = value;
    } else if(value == null) {
      this.accessSocials = [new social(null,null,null)];
    }
  }
}

export class qrCode {
  private qid: string;
  private qContact: contact;
  constructor(q_id: string, q_contact: contact) {
    this.setQid = q_id;
    this.setContact = q_contact;
  }
  public get getQid(): string {
    return this.qid;
  }
  public set setQid(q_id: string) {
    if(q_id != null) {
      this.qid = q_id;
    } else if(q_id == null) {
      this.qid = "N/A";
    }
  }
  public get getContact(): contact {
    return this.qContact;
  }
  public set setContact(contact_new: contact) {
    if(contact_new != null) {
      this.qContact = contact_new;
    } else if(contact_new == null) {
      this.qContact = new contact(null,null,null,null,null,null,null,null);
    }
  }
}

export class profile {
  private name: string;
  private qrcode: qrCode;
  constructor(nam: string, qr_code: qrCode) {
    this.setName = nam;
    this.setQrCode = qr_code;
  }
  public get getName(): string {
    return this.name;
  }
  public set setName(nam: string) {
    if(nam == null) {
      this.name = "N/A";
    } else {
      this.name = nam;
    }
  }
  public get getQrCode(): qrCode {
    return this.qrcode;
  }
  public set setQrCode(qr_code: qrCode) {
    if(qr_code == null) {
      this.qrcode = new qrCode(null,null);
    } else {
      this.qrcode = qr_code;
    }
  }
}

export class user {
  private uid: string;
  private name: string;
  private username: string;
  private email: string;
  private phoneNumber: string;
  private DOB: Date;
  private photo: string;
  private socials: social[];
  private contacts: contact[];
  private qrCodes: qrCode[];
  constructor(u_id: string, name_user: string, username_user: string,
    email_user: string, phoneNumber_user: string, dob: Date, photo_user: string,
    socials_user: social[], contacts_user: contact[], qrCode_user: qrCode[]) {
      this.setUid = u_id;
      this.setName = name_user;
      this.setUsername = username_user;
      this.setEmail = email_user;
      this.setPhoneNumber = phoneNumber_user;
      this.setDOB = dob;
      this.setPhoto = photo_user;
      this.setSocials = socials_user;
      this.setContacts = contacts_user;
      this.setQrCodes = qrCode_user;
  }
  public get getUid(): string {
    return this.uid;
  }
  public get getName(): string {
    return this.name;
  }
  public get getUsername(): string {
    return this.username;
  }
  public get getEmail(): string {
    return this.email;
  }
  public get getPhoneNumber(): string {
    return this.phoneNumber;
  }
  public get getDOB(): Date {
    return this.DOB;
  }
  public get getPhoto(): string {
    return this.photo;
  }
  public get getSocials(): social[] {
    return this.socials;
  }
  public get getContacts(): contact[] {
    return this.contacts;
  }
  public get getQrCodes(): qrCode[] {
    return this.qrCodes;
  }
  public set setUid(u_id: string) {
    if(u_id != null) {
      this.uid = u_id;
    } else if(u_id == null) {
      this.uid = "N/A";
    }
  }
  public set setName(name_user: string) {
    if(name_user != null) {
      this.name = name_user;
    } else if(name_user == null) {
      this.name = "N/A";
    }
  }
  public set setUsername(username_user: string) {
    if(username_user != null) {
      this.username = username_user;
    } else if(username_user == null) {
      this.username = "N/A";
    }
  }
  public set setEmail(email_user: string) {
    if(email_user != null) {
      this.email = email_user;
    } else if(email_user == null) {
      this.email = "N/A";
    }
  }
  public set setPhoneNumber(phoneNumber_user: string) {
    if(phoneNumber_user != null) {
      this.phoneNumber = phoneNumber_user;
    } else if(phoneNumber_user == null) {
      this.phoneNumber = "N/A";
    }
  }
  public set setDOB(dob: Date) {
    if(dob != null) {
      this.DOB = dob;
    } else if(dob == null) {
      this.DOB = new Date();
    }
  }
  public set setPhoto(photo_user: string) {
    if(photo_user != null) {
      this.photo = photo_user;
    } else if(photo_user == null) {
      this.photo = "N/A";
    }
  }
  public set setSocials(socials_user: social[]) {
    if(socials_user != null) {
      this.socials = socials_user;
    } else if(socials_user == null) {
      this.socials = [new social(null,null,null)];
    }
  }
  public set setContacts(contacts_user: contact[]) {
    if(contacts_user != null) {
      this.contacts = contacts_user;
    } else if(contacts_user == null) {
      this.contacts = [new contact(null,null,null,null,null,null,null,null)];
    }
  }
  public set setQrCodes(qrCodes_user: qrCode[]) {
    if(qrCodes_user != null) {
      this.qrCodes = qrCodes_user;
    } else if(qrCodes_user == null) {
      this.qrCodes = [new qrCode(null, null)];
    }
  }
}
