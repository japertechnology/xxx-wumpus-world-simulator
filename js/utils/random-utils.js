// MIT License. See LICENSE in the project root for details.
class RandomUtils {

    static shuffle(array) {

        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    /**
     * @param {number} min
     * @param {number} max
     * @returns a random number between min (included) and max (excluded)
     */
    static getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static getRandomIndex(array) {
        return RandomUtils.getRandomInteger(0, array.length);
    }

    static getRandomElement(array) {
        return array[RandomUtils.getRandomIndex(array)];
    }

    static getRandomElements(array, numberOfElements) {

        let indexes = ArrayUtils.getIndexesFromSize(array.length);

        RandomUtils.shuffle(indexes);

        let selected = indexes.filter((e,i) => i < numberOfElements);

        return selected.map(el => array[el]);
    }

    static getRandomLevel(lines, columns, opts = {}) {

        const holesCount = opts.holes || 10;
        const wumpusCount = opts.wumpus || 8;
        const goldsCount = opts.golds || 8;

        let positions = ArrayUtils.getIndexes(lines, columns);

        positions = ArrayUtils.removeByValues(positions, [[0, 0]]);
        positions = ArrayUtils.removeByValues(positions, [[0, 1]]);
        positions = ArrayUtils.removeByValues(positions, [[1, 0]]);
        positions = ArrayUtils.removeByValues(positions, [[1, 1]]);

        let holes = RandomUtils.getRandomElements(positions, Math.min(holesCount, positions.length));
        positions = ArrayUtils.removeByValues(positions, holes);

        let wumpus = RandomUtils.getRandomElements(positions, Math.min(wumpusCount, positions.length));
        positions = ArrayUtils.removeByValues(positions, wumpus);

        let golds = RandomUtils.getRandomElements(positions, Math.min(goldsCount, positions.length));
        positions = ArrayUtils.removeByValues(positions, golds);

        return { holes, wumpus, golds };
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RandomUtils;
}
