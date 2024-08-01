const generateStrongPassword = () => {
    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const specialCharacters = "!@#$&*";
    const passwordLength = 8;

    const allCharacters =
        uppercaseLetters + lowercaseLetters + digits + specialCharacters;

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * allCharacters.length);
        password += allCharacters[randomIndex];
    }

    return password;
};

export default generateStrongPassword;
