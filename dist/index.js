"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const env_config_1 = __importDefault(require("./common/config/env.config"));
const mongoose_service_1 = __importDefault(require("./common/services/mongoose.service"));
const routes_config_1 = __importDefault(require("./admin/routes.config"));
const route_config_1 = __importDefault(require("./authorization/route.config"));
const routes_config_2 = __importDefault(require("./students/routes.config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, express_1.json)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.set('view engine', 'ejs');
app.get('/student/', (req, res) => {
    res.render('student');
});
app.get('/admin/', (req, res) => {
    res.render('admin');
});
app.use(express_1.default.static('./public'));
(0, mongoose_service_1.default)();
(0, routes_config_1.default)(app);
(0, routes_config_2.default)(app);
(0, route_config_1.default)(app);
let port = env_config_1.default.PORT;
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
