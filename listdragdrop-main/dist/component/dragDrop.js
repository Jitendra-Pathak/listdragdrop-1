"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
require("./dragDrop.css");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var ListDragDrop = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(ListDragDrop, _React$PureComponent);
  var _super = _createSuper(ListDragDrop);
  function ListDragDrop(props) {
    var _this;
    _classCallCheck(this, ListDragDrop);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "dragStart", function (e, option) {
      var onDragStartCallback = _this.props.onDragStartCallback;
      _this.isValidDrop = false;
      _this.initialOrder = _toConsumableArray(_this.state.optionList);
      _this.dragged = e.currentTarget;
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/html', _this.dragged);
      onDragStartCallback && onDragStartCallback(option);
    });
    _defineProperty(_assertThisInitialized(_this), "swapElements", function () {
      var data = _toConsumableArray(_this.state.optionList);
      var fromIndex = -1;
      var toIndex = -1;
      data.forEach(function (node, index) {
        if (node.id === _this.dragged.dataset.id) {
          fromIndex = index;
        }
        if (node.id === _this.over) {
          toIndex = index;
        }
      });
      var tempNode = data[fromIndex];
      data[fromIndex] = data[toIndex];
      data[toIndex] = tempNode;
      return data;
    });
    _defineProperty(_assertThisInitialized(_this), "restoreOrder", function () {
      _this.setState({
        optionList: _this.initialOrder
      });
    });
    _defineProperty(_assertThisInitialized(_this), "dragEnd", function () {
      var onDragEndCallback = _this.props.onDragEndCallback;
      if (_this.isValidDrop) {
        var newList = _this.swapElements();
        _this.setState({
          optionList: newList
        }, function () {
          onDragEndCallback && onDragEndCallback(_this.state.optionList);
        });
      } else {
        _this.restoreOrder();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "onDrop", function (e) {
      var containerId = _this.props.containerId;
      var container = document.querySelector("#".concat(containerId, " .listContainer"));
      if (container.contains(e.target)) {
        _this.isValidDrop = true;
      } else {
        _this.isValidDrop = false;
      }
    });
    _defineProperty(_assertThisInitialized(_this), "dragOver", function (e, option) {
      var onDragOverCallback = _this.props.onDragOverCallback;
      var id = option.id;
      e.preventDefault();
      _this.over = id;
      var newList = _this.swapElements();
      _this.setState({
        optionList: newList
      });
      onDragOverCallback && onDragOverCallback(option);
    });
    _defineProperty(_assertThisInitialized(_this), "getOptionsList", function () {
      var optionList = _this.state.optionList;
      var _this$props = _this.props,
        customTemplate = _this$props.customTemplate,
        itemClass = _this$props.itemClass;
      return optionList && optionList.map(function (option) {
        var _option$draggable = option.draggable,
          draggable = _option$draggable === void 0 ? true : _option$draggable,
          id = option.id,
          value = option.value;

        // Here we attach the event only when draggable is true
        // Our default template will be served 
        // if user doesn't pass custom template
        return /*#__PURE__*/_react["default"].createElement("li", {
          "data-id": id,
          key: id,
          onDrop: draggable ? _this.onDrop : null,
          draggable: draggable,
          onDragEnd: draggable ? _this.dragEnd : null,
          onDragOver: draggable ? function (e) {
            return _this.dragOver(e, option);
          } : null,
          onDragStart: draggable ? function (e) {
            return _this.dragStart(e, option);
          } : null,
          className: "list-item ".concat(itemClass, " ").concat(draggable ? '' : 'optionDisabled')
        }, customTemplate ? customTemplate(option) : /*#__PURE__*/_react["default"].createElement("p", {
          className: "list-element"
        }, value));
      });
    });
    _this.isValidDrop = false;
    _this.initialOrder = [];
    _this.dragged = null;
    _this.over = null;
    _this.state = {
      optionList: _this.props.options || []
    };
    return _this;
  }

  // This function update the data only when 
  // options data is updated in parent/consumer component
  _createClass(ListDragDrop, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.options !== this.props.options) {
        this.setState({
          optionList: this.props.options
        });
      }
    }

    // On drag start we create a copy of data
    // which "initialOrder" is used to reset 
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
        containerClass = _this$props2.containerClass,
        containerId = _this$props2.containerId;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "dragListContainer ".concat(containerClass),
        id: containerId
      }, /*#__PURE__*/_react["default"].createElement("ul", {
        className: "listContainer"
      }, this.getOptionsList()));
    }
  }]);
  return ListDragDrop;
}(_react["default"].PureComponent);
exports["default"] = ListDragDrop;
ListDragDrop.propTypes = {
  containerId: _propTypes["default"].string.isRequired,
  // it is required to find out the droppable area
  onDragEndCallback: _propTypes["default"].func.isRequired,
  onDragStartCallback: _propTypes["default"].func,
  onDragOverCallback: _propTypes["default"].func,
  options: _propTypes["default"].array.isRequired,
  containerClass: _propTypes["default"].string,
  customTemplate: _propTypes["default"].func,
  itemClass: _propTypes["default"].string
};
ListDragDrop.defaultProps = {
  containerId: 'dropArea',
  options: []
};