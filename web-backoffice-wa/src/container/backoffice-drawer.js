"use strict";
exports.__esModule = true;
var react_1 = require("react");
var reactstrap_1 = require("reactstrap");
require("../css/containers/backoffice-drawer.css");
function backofficeDrawer(argsBool, args, emitStates, childEmit) {
    var childButton = {
        "User": [argsBool, ["List user", "Add user", "Edit user", "Delete user"]],
        "UserAdmin": [argsBool, ["List user admin", "Add user admin", "Edit user admin", "Delete user admin"]],
        "Dashboard": [argsBool, ["Show online user", "Remove online user (logout user)"]],
        "Logout": [false, []]
    };
    var selectedElement = childButton[args];
    var background = "secondary";
    if (args === "Logout") {
        background = "danger";
    }
    return (React.createElement(react_1.Fragment, { key: args },
        React.createElement(reactstrap_1.Button, { className: 'button', block: true, color: background, onClick: function () { return emitStates(args); } }, args),
        selectedElement[1].map(function (childButton) {
            if (selectedElement[0]) {
                return (React.createElement(react_1.Fragment, { key: childButton },
                    React.createElement(reactstrap_1.Button, { block: true, className: 'button-child', color: 'primary', onClick: function () { return childEmit(args, childButton); } }, childButton)));
            }
            return React.createElement(react_1.Fragment, { key: childButton });
        })));
}
exports["default"] = backofficeDrawer;
