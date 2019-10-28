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
var UserRecord_1 = require("./UserRecord");
var FileRecord = /** @class */ (function () {
    function FileRecord() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], FileRecord.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], FileRecord.prototype, "filename", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], FileRecord.prototype, "date", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], FileRecord.prototype, "messageCount", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return UserRecord_1.UserRecord; }, function (userRecord) { return userRecord.fileRecord; }),
        __metadata("design:type", Array)
    ], FileRecord.prototype, "userRecords", void 0);
    FileRecord = __decorate([
        typeorm_1.Entity()
    ], FileRecord);
    return FileRecord;
}());
exports.FileRecord = FileRecord;
//# sourceMappingURL=FileRecord.js.map