export default async (access_token) => {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
      )
      .then(({ data }) => resolve(data))
      .catch((error) => reject(error));
  });
};
