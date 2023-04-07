const donationTransService = require("./donationTrans");
const fs = require('fs');
const entryService = require("./entry");

class indexService {
    donationTrans;
    entry;
    constructor() {
        this.donationTrans = new donationTransService()
        this.entry = new entryService()
        // this.removeCSVFile()
    }

    // // 定時 刪除 csv
    // removeCSVFile() {
    //     fs.rm('../public/csv/*', (e) => {
    //         console.log(e);
    //     })
    // }
}

module.exports = indexService
