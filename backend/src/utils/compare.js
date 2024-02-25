const fs = require("fs");
const path = require("path");
module.exports = {
    compare: function compare(obj1) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.resolve(__dirname, "../dummy-data/data.json"),
                "utf8",
                function (err, data) {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }

                    // console.log(obj1);
                    const result = JSON.parse(data);
                    const record = result.find((data) => {
                        return data.aadhaar_number === obj1.aadhar;
                    });

                    if (!record) {
                        reject(false);
                    }

                    const obj2 = {
                        name: record.name,
                        mobile: record.mobile_number,
                        aadhar: record.aadhaar_number,
                        pan: record.pan_card_number,
                    };

                    console.log(JSON.stringify(obj1));
                    console.log(JSON.stringify(obj2));

                    if (JSON.stringify(obj1) === JSON.stringify(obj2)) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                }
            );
        });
    },
};
