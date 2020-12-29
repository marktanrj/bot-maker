import sendmailObject from "sendmail";

const sendmail = sendmailObject({});

export const sendVerificationEmail = async () => {
  const result = await new Promise((resolve, reject) => {
    sendmail(
      {
        from: "no-reply@marktan.me",
        to: "",
        subject: "test",
        html: "<h1>hellow</h1>",
      },
      (err, reply) => {
        console.log(err && err.stack);
        console.log(reply);

        if (err) {
          reject(err.message);
        } else {
          resolve(reply);
        }
      },
    );
  });

  console.log(result);
};
