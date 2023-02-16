const mongoose = require('mongoose');

const CodeSchema = new mongoose.Schema(
    {
        codeName: { type: String, required: true},
        persentage: {type: Number, required: true}
    },
    { timestamps : true}
);

module.exports = mongoose.model("Code", CodeSchema);