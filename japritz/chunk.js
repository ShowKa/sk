class Chunk {
    constructor(kuromojiChunk) {
        // console.log(kuromojiChunk.surface_form + ":" + kuromojiChunk.pos + ":" + kuromojiChunk.pos_detail_1);
        console.log(kuromojiChunk);
        this._chunk = kuromojiChunk;
    }
    getSurface() {
        return this._chunk.surface_form;
    }
    isEnd() {
        return this.getSurface().match(/[。！？]$/);
    }
    isPunctuation() {
        const s = this.getSurface();
        return $.inArray(s, [",", "，", ".", "、", "。", "/"]) >= 0;
    }
    isParenthesisStart() {
        const s = this.getSurface();
        const parenthesisStart = ["[", "(", "（", "「"];
        return $.inArray(s, parenthesisStart) >= 0;
    }
    isParenthesisEnd() {
        const s = this.getSurface();
        const parenthesisStart = ["]", "）", ")", "」"];
        return $.inArray(s, parenthesisStart) >= 0;
    }
    isNoun() {
        return this._chunk.pos === "名詞" && !this.isPunctuation();
    }
    isVerb() {
        return this._chunk.pos === "動詞";
    }
    isVerbSuffix() {
        return this.isVerb() && this._chunk.pos_detail_1 === "接尾";
    }
    isNounNumber() {
        return this.isNoun() && this._chunk.pos_detail_1 == "数";
    }
    isPostpositional() {
        return this._chunk.pos === "助詞";
    }
    isConjunction() {
        return this._chunk.pos === "接続詞";
    }
    isPrefix() {
        return this._chunk.pos === "接頭詞";
    }
    isAdverb() {
        return this._chunk.pos === "副詞";
    }
    isDeterminer() {
        return this._chunk.pos === "連体詞";
    }
    isAuxiliaryVerb() {
        return this._chunk.pos === "助動詞";
    }
    isAdjective() {
        return this._chunk.pos === "形容詞";
    }
    isAdjectiveVerb() {
        // kuromojiに形容動詞はない
        return false;
    }
    isInterjection() {
        return this._chunk.pos === "感動詞";
    }
    isLastOfClause() {
        return this.isPostpositional()
            || this.isConjunction()
            || this.isAdverb()
            || this.isDeterminer()
            || this.isAuxiliaryVerb()
            || this.isPunctuation();
    }
    isStartOfClause() {
        return this.isIntransitive() || this.isParenthesisStart();
    }
    isIntransitive() {
        return this.isConjunction()
            || this.isVerb()
            || this.isNoun()
            || this.isAdverb()
            || this.isPrefix()
            || this.isAdjective()
            || this.isDeterminer()
            || this.isAdjectiveVerb()
            || this.isInterjection();
    }
}