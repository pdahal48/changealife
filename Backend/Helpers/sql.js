const { BadRequestError } = require("../expressError");

//partially updates an user
function sqlForPartialUpdate(dataToUpdate, jsToSql) {
    const keys = Object.keys(dataToUpdate);
    if (keys.length === 0) throw new BadRequestError("No data");
  
    // {fullName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
    const cols = keys.map((colName, idx) =>
        `"${jsToSql[colName] || colName}"=$${idx + 1}`,
    );

    return {
      setCols: cols.join(", "),
      values: Object.values(dataToUpdate),
    };
  }
  
  module.exports = { sqlForPartialUpdate };