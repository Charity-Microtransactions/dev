"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var endpoint = "https://runkit.io/edelmanja/charity-microtransactions/branches/master";

function buildUrl(name) {
  return endpoint + "/" + name;
}

function getResponse(val) {
  return fetch(buildUrl(val));
}

function update(object, event) {
  return getResponse(event.target.value).then(function (data) {
    console.log(data);
    object.setState({ text: data }).catch(function (err) {
      return console.log(err);
    });
  });
}

function NavItem(props) {
  return React.createElement(
    "li",
    { className: "nav-item" },
    React.createElement(
      "a",
      { className: "nav-link", href: "#", onClick: props.onClick },
      props.name
    )
  );
}

function Nav(props) {
  var items = [];
  for (var _iterator = props.items, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {if (window.CP.shouldStopExecution(1)){break;}
    var _ref;

    if (_isArray) {
      if (_i >= _iterator.length) break;
      _ref = _iterator[_i++];
    } else {
      _i = _iterator.next();
      if (_i.done) break;
      _ref = _i.value;
    }

    var item = _ref;

    items.push(React.createElement(NavItem, { onClick: item.onClick, name: item.name }));
  }
window.CP.exitedLoop(1);
return React.createElement(
    "nav",
    { className: "navbar" },
    React.createElement(
      "ul",
      { className: "nav" },
      items
    ),
    React.createElement(
      "form",
      { className: "form-inline" },
      React.createElement("input", { type: "text" }),
      React.createElement(
        "button",
        null,
        "Search"
      )
    )
  );
}

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this));

    _this.navStates = {
      browseCharities: "browseCharities",
      searchCharities: "searchCharities",
      searchDonors: "searchDonors",
      recentTransactions: "recentTransactions"
    };
    _this.state = {
      text: "",
      navState: _this.navStates.browseCharities
    };
    return _this;
  }

  App.prototype.handleChange = function handleChange(event) {
    update(this, event.target.value);
  };

  App.prototype.navClick = function navClick(navId) {
    var _this2 = this;

    return function (evt) {
      return _this2.setState({ navState: navId });
    };
  };

  App.prototype.render = function render() {
    var _this3 = this;

    var state = this.state;
    var items = [{ name: "Browse Charities", onClick: this.navClick(this.navStates.browseCharities) }, { name: "Search Charities", onClick: this.navClick(this.navStates.searchCharities) }, { name: "Search Donors", onClick: this.navClick(this.navStates.searchDonors) }, { name: "Recent Transactions", onClick: this.navClick(this.navStates.recentTransactions) }];
    return React.createElement(
      "div",
      { className: "container-fluid" },
      React.createElement(Nav, { items: items }),
      React.createElement(
        "div",
        null,
        "current nav state:",
        this.state.navState
      ),
      React.createElement("input", { type: "text", onChange: function onChange(event) {
          return _this3.handleChange(event);
        } }),
      React.createElement(
        "div",
        null,
        state.text
      )
    );
  };

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
