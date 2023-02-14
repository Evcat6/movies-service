const getItemFromLocalStorage = (key: string) => {
    return JSON.parse(localStorage.getItem(key) || '[]');
};

function setItemToLocalStorage<Type>(key: string, value: Type): void {
    localStorage.setItem(key, JSON.stringify(value));
}

export { getItemFromLocalStorage, setItemToLocalStorage };
