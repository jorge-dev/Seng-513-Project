export const getErrorMessage = (error) => {
    if (error.response && error.response.data) {

        const errorStr = error.response.data.message;
        //capitalize each word
        return errorStr.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    }
    return error.message;
}


