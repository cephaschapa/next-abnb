import countries from 'world-countries';

const formativeCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region
}));

const useCountries = () => {
    const getAll = () => formativeCountries;

    const getValue = (cca2: string) => {
        return formativeCountries.find((country) => country.value === cca2);
    }

    return {
        getAll,
        getValue
    }
}

export default useCountries;
