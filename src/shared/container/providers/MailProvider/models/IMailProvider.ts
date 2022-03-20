interface ISendMailDTO {
  to: string;
  from: string;
  subject: string;
  text: string;
}

interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}

export { IMailProvider, ISendMailDTO };
