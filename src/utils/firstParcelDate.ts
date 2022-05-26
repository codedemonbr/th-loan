const firstParcel = (bestDate: number): string => {
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();

    /**Month in js will be returned something between 0 and 11
     * 0 to january
     * and 11 to december
     */
    const actualMonth = actualDate.getMonth();

    let nextMonth = 1;
    let year = actualYear;

    if (actualMonth === 11) {
        year = actualYear + 1;
    } else {
        nextMonth = actualMonth + 2;
    }

    return `${bestDate}/${nextMonth}/${year}`;
};

export { firstParcel };
