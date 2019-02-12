function htmlStrict(ary) {
    let result = [];
    let regexPattern = /<(\w+)><(\w+)>(\w+.+)<\/\2>\s?(.*)*?<\/\1>/g;

    function getMatches(string, regex, index) {
        index || (index = 1); // default to the first capturing group
        let matches = [];
        let match;
        while (match = regex.exec(string)) {
            matches.push(match[index]);
        }
        return matches;
    }

    for (r = 0; r < ary.length; r++) {
        let firstMatch = getMatches(ary[r], regexPattern, 3);
        if (firstMatch != "" && firstMatch != null) {
            result.push(firstMatch);
        }

        let secondMatch = getMatches(ary[r], regexPattern, 4);
        if (secondMatch != "" && secondMatch != null) {
            result.push(secondMatch);
        }
    }

    return result.join(" ");
}

console.log(htmlStrict(['<div><p>This</p> is</div>',
    '<div><a>perfectly</a></div>',
    '<divs><p>valid</p></divs>',
    '<div><p>This</div></p>',
    '<div><p>is not</p><div>']
));