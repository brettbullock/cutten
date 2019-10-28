"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var FileRecord_1 = require("./FileRecord");
var UserRecord = /** @class */ (function () {
    function UserRecord() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], UserRecord.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return User_1.User; }, function (user) { return user.userRecords; }),
        __metadata("design:type", Number)
    ], UserRecord.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], UserRecord.prototype, "date", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return FileRecord_1.FileRecord; }, function (fileRecord) { return fileRecord.userRecords; }),
        __metadata("design:type", FileRecord_1.FileRecord)
    ], UserRecord.prototype, "fileRecord", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], UserRecord.prototype, "kCount", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], UserRecord.prototype, "messagesPerDay", void 0);
    UserRecord = __decorate([
        typeorm_1.Entity()
    ], UserRecord);
    return UserRecord;
}());
exports.UserRecord = UserRecord;
//# sourceMappingURL=UserRecord.js.map