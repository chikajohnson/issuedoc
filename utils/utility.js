const mongoose = require('mongoose');

// validation utilities
exports.isObjectId = function(id) {
  return mongoose.Types.ObjectId.isValid(id);
}


// enum utilities
exports.enumObj = {
    specialties: ["mathematics", "poetry", "arts", "science", "law"],
    genotypes:["AA", "AS", "SS"],
    bloodGroups:["B", "AB", "O", "A"],
    genders:["male", "female"],
    maritalStatus:["married", "single", "divorced"],
    identificationTypes:["national id", "voters card", "drivers license"], ///convert to mongo collection
    religions:["christianity", "islam", "traditional", "others"],
    studentStatus: ["active","inactive"],
    sponsorTypes: ["corporate", "individual"],
    userTypes: [{teacher : "teacher"}, {student : "student"}, {sponsor: "sponsor"}, {school : "school"}, {admin : "admin"}, {globalAdmin : "globalAdmin"}]
}