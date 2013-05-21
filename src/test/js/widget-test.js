/*
 * Copyright (c) 2012, Inversoft Inc., All Rights Reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the License.
 */

/*
 * Helper functions
 */

var assert = buster.assertions.assert;
var refute = buster.assertions.refute;

buster.testCase('MultipleSelect class tests', {
  setUp: function() {
    this.timeout = 2000;
    this.multipleSelect = new Prime.Widget.MultipleSelect(Prime.Dom.queryFirst('#multiple-select'));
    this.multipleSelect.removeAllOptions();
    this.multipleSelect.addOption('one', 'One');
    this.multipleSelect.addOption('two', 'Two');
    this.multipleSelect.addOption('three', 'Three');
    this.multipleSelect.selectOptionWithValue('one');
    this.multipleSelect.selectOptionWithValue('three');
  },

  'setup': function() {
    var display = Prime.Dom.queryFirst('#multiple-select-display');
    assert.isTrue(display !== null);

    var children = display.getChildren();
    assert.equals(children.length, 1);
    assert.equals(children[0].domElement.tagName, 'UL');
    assert.equals(children[0].getChildren().length, 3);
    assert.equals(children[0].getChildren()[0].getID(), 'multiple-select-option-one');
    assert.equals(children[0].getChildren()[0].getChildren()[0].getHTML(), 'One');
    assert.equals(children[0].getChildren()[0].getChildren()[1].getAttribute('value'), 'one');
    assert.equals(children[0].getChildren()[0].getChildren()[1].getHTML(), 'X');
    assert.equals(children[0].getChildren()[1].getID(), 'multiple-select-option-three');
    assert.equals(children[0].getChildren()[1].getChildren()[0].getHTML(), 'Three');
    assert.equals(children[0].getChildren()[1].getChildren()[1].getAttribute('value'), 'three');
    assert.equals(children[0].getChildren()[1].getChildren()[1].getHTML(), 'X');
    assert.equals(children[0].getChildren()[2].getID(), 'multiple-select-input-option');
    assert.equals(children[0].getChildren()[2].getChildren()[0].domElement.tagName, 'INPUT');
    assert.equals(children[0].getChildren()[2].getChildren()[0].getID(), 'multiple-select-input');
  },

  'addOption': function() {
    // Add the option
    this.multipleSelect.addOption('four', 'Four');

    var select = this.multipleSelect.element.domElement;
    assert.equals(select.length, 4);
    assert.equals(select.options[0].value, 'one');
    assert.isTrue(select.options[0].selected);
    assert.equals(select.options[1].value, 'two');
    assert.isFalse(select.options[1].selected);
    assert.equals(select.options[2].value, 'three');
    assert.isTrue(select.options[2].selected);
    assert.equals(select.options[3].value, 'four');
    assert.isFalse(select.options[3].selected);

    // Ensure that the option didn't get added to the display
    var displayOptions = Prime.Dom.query('#multiple-select-display ul li');
    assert.equals(displayOptions.length, 3);
    assert.equals(displayOptions[0].getID(), 'multiple-select-option-one');
    assert.equals(displayOptions[1].getID(), 'multiple-select-option-three');
    assert.equals(displayOptions[2].getID(), 'multiple-select-input-option');
  },

  'containsOptionWithValue': function() {
    assert.isTrue(this.multipleSelect.containsOptionWithValue('one'));
    assert.isTrue(this.multipleSelect.containsOptionWithValue('two'));
    assert.isTrue(this.multipleSelect.containsOptionWithValue('three'));
    assert.isFalse(this.multipleSelect.containsOptionWithValue('four'));
  },

  'deselectOptionWithValue': function() {
    // Deselect the option
    this.multipleSelect.deselectOptionWithValue('one');

    var select = this.multipleSelect.element.domElement;
    assert.equals(select.length, 3);
    assert.equals(select.options[0].value, 'one');
    assert.isFalse(select.options[0].selected);
    assert.equals(select.options[1].value, 'two');
    assert.isFalse(select.options[1].selected);
    assert.equals(select.options[2].value, 'three');
    assert.isTrue(select.options[2].selected);

    var displayOptions = Prime.Dom.query('#multiple-select-display ul li');
    assert.equals(displayOptions.length, 2);
    assert.equals(displayOptions[0].getID(), 'multiple-select-option-three');
    assert.equals(displayOptions[1].getID(), 'multiple-select-input-option');
  },

  'open and close search': function() {
    this.multipleSelect.openSearch();

    // Ensure the select uses the browser default for inputs. This will ensure that it also uses the CSS style in
    // production. The default in most browsers for input is inline-block
    var display = Prime.Dom.queryByID('multiple-select-input-option');
    assert.equals(display.getComputedStyle()['display'], 'list-item');

    this.multipleSelect.closeSearch();

    display = Prime.Dom.queryByID('multiple-select-input-option');
    assert.equals(display.getStyle('display'), 'none');
  },

  'removeOptionWithValue': function() {
    // Remove the option and retest
    this.multipleSelect.removeOptionWithValue('one');

    var select = this.multipleSelect.element.domElement;
    assert.equals(select.length, 2);
    assert.equals(select.options[0].value, 'two');
    assert.equals(select.options[1].value, 'three');

    // Ensure that the option gets removed from the display
    var displayOptions = Prime.Dom.query('#multiple-select-display ul li');
    assert.equals(displayOptions.length, 2);
    assert.equals(displayOptions[0].getID(), 'multiple-select-option-three');
    assert.equals(displayOptions[1].getID(), 'multiple-select-input-option');
  },

  'selectOptionWithValue': function() {
    // Select the option
    this.multipleSelect.selectOptionWithValue('two');

    var select = this.multipleSelect.element.domElement;
    assert.equals(select.length, 3);
    assert.equals(select.options[0].value, 'one');
    assert.isTrue(select.options[0].selected);
    assert.equals(select.options[1].value, 'two');
    assert.isTrue(select.options[1].selected);
    assert.equals(select.options[2].value, 'three');
    assert.isTrue(select.options[2].selected);

    // Ensure that the option is added to the display
    var displayOptions = Prime.Dom.query('#multiple-select-display ul li');
    assert.equals(displayOptions.length, 4);
    assert.equals(displayOptions[0].getID(), 'multiple-select-option-one');
    assert.equals(displayOptions[1].getID(), 'multiple-select-option-three');
    assert.equals(displayOptions[2].getID(), 'multiple-select-option-two');
    assert.equals(displayOptions[3].getID(), 'multiple-select-input-option');
  },

  'selectableOptionsForPrefix': function() {
    // Deselect the options and add some extras
    this.multipleSelect.deselectOptionWithValue('one');
    this.multipleSelect.deselectOptionWithValue('three');
    this.multipleSelect.addOption('one1', 'One1');
    this.multipleSelect.addOption('one2', 'One2');
    this.multipleSelect.addOption('two1', 'Two1');
    this.multipleSelect.addOption('two2', 'Two2');

    var options = this.multipleSelect.selectableOptionsForPrefix();
    assert.equals(options.length, 7);
    assert.equals(options[0], 'One');
    assert.equals(options[1], 'One1');
    assert.equals(options[2], 'One2');
    assert.equals(options[3], 'Three');
    assert.equals(options[4], 'Two');
    assert.equals(options[5], 'Two1');
    assert.equals(options[6], 'Two2');
  }
});
