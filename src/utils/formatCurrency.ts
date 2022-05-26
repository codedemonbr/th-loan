import currencyFormatter from "currency-formatter";

const formatCurrency = (value?: number): string => {
    const currency = currencyFormatter.format(value || 0, { locale: "pt-BR" });

    return currency;
};

export { formatCurrency };
