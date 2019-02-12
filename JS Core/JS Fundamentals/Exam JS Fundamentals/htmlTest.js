function htmlStrict(ary) {
    let result = [];
    ary.forEach(el => {
        let regexTagPattern = /<.+?>/g;
        let matches = el.match(regexTagPattern);
        let valid = true;
        let openTag = matches.shift();
        let closeTag = matches.pop();

        while (matches.length > 0){
            if (closeTag!=='</'+openTag.slice(1)) {
                valid=false;
            }
            openTag = matches.shift();
            closeTag = matches.pop();
        }

        if (valid){
            let regPat = />(.*?)</g;
            function getMatches(string, regex, index) {
                index || (index = 1); // default to the first capturing group
                let matches = [];
                let match;
                while (match = regex.exec(string)) {
                    matches.push(match[index]);
                }
                return matches;
            }
            let txt = getMatches(el,regPat,0).join("");
            result.push(txt)
        }

    });
    return result.join(" ");
}

console.log( htmlStrict(['<div><p>This</p> is</div>',
    '<div><a>perfectly</a></div>',
    '<divs><p>valid</p></divs>',
    '<div><p>This</div></p>',
    '<div><p>is not</p><div>']
));