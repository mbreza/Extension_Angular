export class User {
  constructor(
    public username: string,
    public emailaddress: string,
    public password: string,
    public privateKey: string,
    public publicKey: string,
    public revocationCertificate: string) { }
}