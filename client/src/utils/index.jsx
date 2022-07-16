const validateSearch = (value) => {
    let error = '';
    if (!value) error = 'Enter a search value';
    return error;
};

const validateForm = (input) => {};


export {
    validateSearch,
    validateForm
}