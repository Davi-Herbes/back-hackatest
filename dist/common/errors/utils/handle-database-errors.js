"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseErrors = void 0;
const database_error_1 = require("../types/database-errors/database-error");
const f_key_error_1 = require("../types/database-errors/f-key-error");
const not_found_db_error_1 = require("../types/database-errors/not-found-db-error");
const unique_constraint_error_1 = require("../types/database-errors/unique-constraint-error");
var PrismaErrors;
(function (PrismaErrors) {
    PrismaErrors["UniqueConstraintFail"] = "P2002";
    PrismaErrors["FKeyFail"] = "P2003";
    PrismaErrors["NotFoundFail"] = "P2025";
})(PrismaErrors || (PrismaErrors = {}));
const handleDatabaseErrors = (e) => {
    console.log(e);
    switch (e.code) {
        case PrismaErrors.UniqueConstraintFail:
            return new unique_constraint_error_1.UniqueConstraintError(e);
        case PrismaErrors.FKeyFail:
            return new f_key_error_1.FKeyError(e);
        case PrismaErrors.NotFoundFail:
            return new not_found_db_error_1.NotFoundDbError(e);
        default:
            return new database_error_1.DatabaseError(e.message);
    }
};
exports.handleDatabaseErrors = handleDatabaseErrors;
//# sourceMappingURL=handle-database-errors.js.map