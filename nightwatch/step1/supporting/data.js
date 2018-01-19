module.exports = {
    test1: {
        clicks: [
            '2',
            '+',
            '3',
            '='
        ],
        result: '5'
    },
    test2: {
        clicks: [
            '3',
            '*',
            '4',
            '/',
            '1',
            '0',
            '=',
            '%'
        ],
        result: '0.012'
    }
}
/*
Test objects will use the format of an array of buttons to click, then a solution value.
{
    clicks: [],
    solution: '0'
}

*/