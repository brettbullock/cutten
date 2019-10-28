"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var koa = require("koa");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var merge_graphql_schemas_1 = require("merge-graphql-schemas");
var apollo_server_koa_1 = require("apollo-server-koa");
var FileRecord_1 = require("./entity/FileRecord");
var port = 8000;
// fetch all of the files that have defined graphql schema
var typesArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./**/*.graphql"));
var resolversArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./**/*.resolvers.*"));
// merge the types and resolvers into one file
var typeDefs = merge_graphql_schemas_1.mergeTypes(typesArray);
var resolvers = merge_graphql_schemas_1.mergeResolvers(resolversArray);
// Init the apollo server
var server = new apollo_server_koa_1.ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
// Init the koa app
var app = new koa();
// attach koa app to the Apollo Server
server.applyMiddleware({ app: app });
// create connection to cutten_db
typeorm_1.createConnection({
    type: "mysql",
    host: "cutten_db",
    port: 3306,
    username: "root",
    password: "password",
    database: "cutten_db",
    entities: [
        __dirname + "/entity/*.ts"
    ],
    synchronize: true
}).then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var savedRecords;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // const record = new Record();
                // record.filename = "cutten.txt";
                // record.date = "2019/10/10";
                // record.messageCount = 100;
                // start the server
                app.listen({ port: port }, function () { return console.log("Server ready at http://localhost:" + port + server.graphqlPath); });
                return [4 /*yield*/, connection.manager.find(FileRecord_1.FileRecord)];
            case 1:
                savedRecords = _a.sent();
                console.log("all records in db: ", savedRecords);
                return [2 /*return*/];
        }
    });
}); }).catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map