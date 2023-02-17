
export class DetailDataModel {
  public name: string;
  public address: string;
  public dateOfBirth: Date;
  public mobileNumber: any;

  public instituteName: string;
  public education: string;
  public gender: string;
  public selectedHobby: string;

  constructor(name: string, address: string, dateOfBirth: Date, mobileNum: {}, instituteName: string, education: string, gender: string, hobby: string) {
    this.name = name;
    this.address = address;
    this.dateOfBirth = dateOfBirth;
    this.mobileNumber = mobileNum;
    this.instituteName = instituteName;
    this.education = education;
    this.gender = gender;
    this.selectedHobby = hobby;
  }


}
