const unMaskMonetary = (text: string): number => {
    /**
     * This regex replace everything that is not a number.
     * Like '.' ' ' ',' 'R$' '+' and another chars
     * principal is the part at the left side of comma
     * decimal means the cents
     */
    const textNum = text.replace(/[^0-9]/g, "");
    let principal = "0";
    let decimal = "00";

    /**
     * The if is necessary because we are using the length as reference
     * negative reference is not allowed
     */
    if (textNum.length > 2) {
        principal = textNum.substring(0, textNum.length - 2);
        decimal = textNum.substring(textNum.length - 2, textNum.length);
    }

    /**
     * concating the string to representate the value with the '.' character
     * updated
     */
    const finalText = `${principal}.${decimal}`;

    return +finalText;
};

export { unMaskMonetary };
