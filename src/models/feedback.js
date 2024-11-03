class Feedback {
    constructor(pnm, reason, author) {
        this.pnm = pnm;
        this.reason = reason;
        this.author = author;
        this.createdAt = new Date();
    }
}

module.exports = Feedback;
