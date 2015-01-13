/**
 * @author Jérémy Munsch <jeremy@focalys.com>
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Jérémy Munsch
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

$.fn.selectMultiple = function() {
  this.attr('select-id',$.fn.selectMultiple._setID());
  this.on('change',$.fn.selectMultiple._multipleSelect);
  return this;
};
$.fn.selectMultiple._data = {};

$.fn.selectMultiple._genID = function() {
  var id = '';
  for(var i=0; i<32; i++) {
    id += Math.floor(Math.random()*16).toString(16).toUpperCase();
  }
  return id;
}

$.fn.selectMultiple._setID = function(id) {
  if(typeof id === "undefined") id = {};
  id.id = $.fn.selectMultiple._genID();
  $.fn.selectMultiple._data[id.id] = {array:[],object:{}};
  return id.id;
}

$.multipleSelectForAll = function() {
  $('select[multiple="true"]').each(function() {
    $(this).attr('select-id',$.fn.selectMultiple._setID());
  });
  $('select[multiple="true"]').on('change',$.fn.selectMultiple._multipleSelect);
}

$.fn.selectMultiple._multipleSelect = function() {
  var id = {id:$(this).attr('select-id')};
  if(!id) $(this).attr('select-id',setID(id));
  $.each($(this).val(),function(v,k) {
    if(typeof $.fn.selectMultiple._data[id.id].object[k] !== "undefined") {
      delete $.fn.selectMultiple._data[id.id].object[k];
    } else {
     $.fn.selectMultiple._data[id.id].object[k] = k;
    }  
  });
  $.fn.selectMultiple._data[id.id].array = [];
  $.each($.fn.selectMultiple._data[id.id].object,function(v2,k2) {
   $.fn.selectMultiple._data[id.id].array.push(v2);
  });
  $(this).val($.fn.selectMultiple._data[id.id].array);
};
