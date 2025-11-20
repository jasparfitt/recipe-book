const capitalise = (value) => value.split(' ').map(w => w[0].toUpperCase() + w.substring(1)).join(' ');

const stringService = {
    capitalise
};

export default stringService;