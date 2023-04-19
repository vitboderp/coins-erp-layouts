/*-
     Program: coinsria-class.js
 Description: COINS RIA Class Inheritance
-*/

(function(){
  var initializing = false,
    fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;

  /**
   * @class Class
   * @classdesc <p>Simple JavaScript Inheritance</p>
   * By John Resig {@link http://ejohn.org}
   * @desc Dummy contructor. Use {@link Class.extend} to create base class.
   * @example
   * var Person = Class.extend({
   *   init: function(isDancing){
   *     this.dancing = isDancing;
   *   },
   *   dance: function(){
   *     return this.dancing;
   *   }
   * });
   * var Ninja = Person.extend({
   *   init: function(){
   *     this._super(false);
   *   },
   *   dance: function(){
   *     // Call the inherited version of dance()
   *     return this._super();
   *   },
   *   swingSword: function(){
   *     return true;
   *   }
   * });
   * var p = new Person(true);
   * p.dance(); // => true
   *
   * var n = new Ninja();
   * n.dance(); // => false
   * n.swingSword(); // => true
   *
   * //Should all be true
   * p instanceof Person && p instanceof Class &&
   * n instanceof Ninja && n instanceof Person && n instanceof Class
   */
  this.Class = function(){};

  /**
   * @static
   * @method Class.extend
   * @desc Create base class that can be extended.
   * @param {Object} prop - Added methods.
   * @return {Class}
   */
  Class.extend = function(prop) {
    var _super = this.prototype;

   // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;

   // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] == "function" &&
       typeof _super[name] == "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);
            this._super = tmp;

            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }

    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }

    // Populate our constructed prototype object
    Class.prototype = prototype;

    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    /**
     * @method Class#extend
     * @summary Create a new class that inherits from this class.
     * @desc Use <code>this._super</code> to call inherited method from its
     * override. See {@link Class|example}.
     * @param {Object} prop - Added methods.
     * @return {Class}
     */

    // And make this class extendable
    Class.extend = arguments.callee;

    return Class;
  };
})();

/**
 * @class HashTable
 * @classdesc <p>Simulation of Java's hashtable.</p>Adapted from
 * {@link http://www.mojavelinux.com/articles/javascript_hashes.html}.
 * @desc Create new hashtable.
 * @param {Object} content - key value pairs to store in hashtable
 */
function HashTable(content) {
  /**
   * @readonly
   * @member {Number} HashTable#length
   * @desc Number of keys in hashtable.
   */
  this.length = 0;
  this.items = {};

  for (var p in content) {
    if (content.hasOwnProperty(p)) {
      this.items[p] = content[p];
      this.length++;
    }
  }

  /**
   * @method HashTable#setItem
   * @desc Map specified key to value.
   * @param {String} key - Hashtable key.
   * @param {Object} value - Value.
   * @return {Object} Previous item value if key existed, otherwise undefined.
   */
  this.setItem = function(key, value) {
    var previous = undefined;
    if (this.hasItem(key)) {
      previous = this.items[key];
    }
    else {
      this.length++;
    }
    this.items[key] = value;
    return previous;
  }

  /**
   * @method HashTable#getItem
   * @desc Return value mapped to specified key.
   * @param {String} key - Key whose associated value is to be returned.
   * @return {Object} Key value if key exists, otherwise undefined.
   */
  this.getItem = function(key) {
    return this.hasItem(key) ? this.items[key] : undefined;
  }

  /**
   * @method HashTable#hasItem
   * @desc Check whether specified key exists.
   * @param {String} key - Hashtable key.
   * @return {Boolean} True, if key exists
   */
  this.hasItem = function(key) {
    return this.items.hasOwnProperty(key);
  }

  /**
   * @method HashTable#removeItem
   * @desc Remove specified key from hashtable.
   * @param {String} key - Hashtable key.
   * @return {Object} Previous item value if key existed, otherwise undefined.
   */
  this.removeItem = function(key) {
    if (this.hasItem(key)) {
      previous = this.items[key];
      this.length--;
      delete this.items[key];
      return previous;
    } else {
      return undefined;
    }
  }

  /**
   * @method HashTable#keys
   * @desc Return array of all keys in hashtable.
   * @return {Array} All keys.
   */
  this.keys = function() {
    var keys = [];
    for (var k in this.items) {
      if (this.hasItem(k)) {
        keys.push(k);
      }
    }
    return keys;
  }

  /**
   * @method HashTable#values
   * @desc Return array of all values in hashtable.
   * @return {Array} All values of hashtable.
   */
  this.values = function() {
    var values = [];
    for (var k in this.items) {
      if (this.hasItem(k)) {
        values.push(this.items[k]);
      }
    }
    return values;
  }

  /**
   * @method HashTable#each
   * @desc Iterate through all key-value pairs.
   * @param {Function} pfFunc - Callback that takes key and value.
   */
  this.each = function(pfFunc) {
    for (var k in this.items) {
      if (this.hasItem(k)) {
        pfFunc(k, this.items[k]);
      }
    }
  }

  /**
   * @method HashTable#every
   * @desc Run Function on HashTable items while the function returns true.
   * @param {Function} pfFunc - Function that takes key and value.
   * @returns (boolean) - true if all items were successfully processed. Otherwise false.
   */
  this.every = function(pfFunc) {
    for (var k in this.items) {
      if (this.hasItem(k)) {
        if (!pfFunc(k, this.items[k]))
          return false;
      }
    }
    return true;
  }

  /**
   * @method HashTable#eachWhere
   * @desc Iterate through key-value pairs. If pair satisfies Condition then
   *       perform Do operation with this pair.
   * @param {Function} pfCondition - Condition to check a pair against.
   * @param {Function} pfDo - Function to perform on eligible pairs.
   */
  this.eachWhere = function(pfCondition, pfDo) {
    for (var k in this.items) {
      if (   this.hasItem(k)
          && pfCondition(k, this.items[k]))
      {
        pfDo(k, this.items[k]);
      }
    }
  }

  /**
   * @method HashTable#clear
   * @desc Remove all keys.
   */
  this.clear = function() {
    this.items = {}
    this.length = 0;
  }
}
