"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
exports.Dashboard = void 0;
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
var User_1 = require("../container/User/User");
var UserAdmin_1 = require("../container/UserAdmin/UserAdmin");
var Dashboard_1 = require("../container/Dashboard/Dashboard");
var backoffice_drawer_1 = require("../container/backoffice-drawer");
var requestModel_1 = require("../model/requestModel");
require("../css/containers/backoffice-drawer.css");
require("../css/components/backoffice.css");
// object init
var userFunc = {
    ListUser: User_1.ListUser,
    DeleteUser: User_1.DeleteUser,
    EditUser: User_1.EditUser,
    AddUser: User_1.AddUser
};
var userAdminFunc = {
    ListUserAdmin: UserAdmin_1.ListUserAdmin,
    DeleteUserAdmin: UserAdmin_1.DeleteUserAdmin,
    AddUserAdmin: UserAdmin_1.AddUserAdmin,
    EditUserAdmin: UserAdmin_1.EditUserAdmin
};
var dashboardFunc = {
    ShowOnlineUser: Dashboard_1.ShowOnlineUser,
    RemoveOnlineUser: Dashboard_1.RemoveOnlineUser
};
var BackOffice = /** @class */ (function (_super) {
    __extends(BackOffice, _super);
    function BackOffice() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            buttonBackOfficeList: {
                User: false,
                UserAdmin: false,
                Dashboard: false,
                Logout: false
            },
            functionalPage: {
                "User": userFunc,
                "UserAdmin": userAdminFunc,
                "Dashboard": dashboardFunc
            },
            selected: {
                displayTitle: "",
                displayChild: "",
                displayParent: ""
            },
            loading: false,
            displayUsername: ""
        };
        _this.ParentButton = function (args) {
            var _a;
            if (args === "Logout") {
                _this.props.handleLogout(false);
            }
            else {
                _this.setState({
                    buttonBackOfficeList: __assign(__assign({}, _this.state.buttonBackOfficeList), (_a = {}, _a[args] = !_this.state.buttonBackOfficeList[args], _a))
                });
            }
        };
        _this.ChildButton = function (parentName, args) {
            var selectDisplay = "";
            args.split(" ").forEach(function (s) { return selectDisplay += s.charAt(0).toUpperCase() + s.slice(1); });
            var matchIndex = /[^A-Za-z]/.exec(selectDisplay);
            if (matchIndex !== null) {
                selectDisplay = selectDisplay.slice(0, matchIndex.index);
            }
            _this.setState({
                selected: {
                    displayTitle: args,
                    displayChild: selectDisplay,
                    displayParent: parentName
                }
            });
        };
        return _this;
    }
    BackOffice.prototype.componentDidMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            var email, url, getUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = localStorage.getItem("email");
                        url = "http://localhost:8080/getUsername";
                        this.setState({
                            loading: true
                        });
                        if (!(email !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(url, (0, requestModel_1.Config)("POST", { email: JSON.parse(email).email }))
                                .then(function (res) { return res.json(); })];
                    case 1:
                        getUser = _a.sent();
                        this.setState({
                            loading: false,
                            displayUsername: getUser
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    BackOffice.prototype.render = function () {
        var _this = this;
        var buttonList = Object.keys(this.state.buttonBackOfficeList);
        var selectedBool = this.state.selected.displayTitle === "";
        var selectedElement = React.createElement(react_1.Fragment, null);
        if (!selectedBool) {
            selectedElement =
                this.state.functionalPage[this.state.selected.displayParent][this.state.selected.displayChild];
        }
        return (React.createElement("div", { className: 'hideOverflow' },
            React.createElement(reactstrap_1.Row, null,
                React.createElement(reactstrap_1.Col, { lg: "3", className: 'divMargin buttonStyle', key: "tes" }, buttonList.map(function (buttonKeys) { return (0, backoffice_drawer_1["default"])(_this.state.buttonBackOfficeList[buttonKeys], buttonKeys, function (param) { return _this.ParentButton(param); }, function (parent, child) { return _this.ChildButton(parent, child); }); })),
                React.createElement(reactstrap_1.Col, { lg: "9", className: 'cardBody' },
                    React.createElement(reactstrap_1.Card, { body: true },
                        React.createElement(reactstrap_1.CardTitle, { tag: "h5" }, selectedBool
                            ? this.state.loading ? React.createElement(reactstrap_1.Spinner, null) : "".concat(this.state.displayUsername, "! Welcome to admin backoffice")
                            : this.state.selected.displayTitle),
                        React.createElement(reactstrap_1.CardText, null, selectedBool
                            ? "As admin, you allowed to manage user admin, whatsapp user and view online users"
                            : selectedElement()))))));
    };
    return BackOffice;
}(react_1.Component));
exports.Dashboard = BackOffice;
