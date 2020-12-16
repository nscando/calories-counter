const compose = (...functions) => data =>
  functions.reduceRight((value, func) => func(value), data)


//VARIABLES - ATRIBUTES CREATION
const attrsToString = (obj = {}) => {
  const keys = Object.keys(obj)
  const attrs = []

  for (let i = 0; i < keys.length; i++) {
    let attr = keys[i]
    attrs.push(`${attr}="${obj[attr]}"`)
  }

  const string = attrs.join('')

  return string
}

//VARIABLES - TAGS CREATION
const tagAttrs = obj => (content = '') =>
  `<${obj.tag}${obj.attrs ? ' ' : ''}${attrsToString(obj.attrs)}>${content}</${obj.tag}>`

const tag = t => {
  if (typeof t === 'string') {
    tagAttrs({ tag: t })
  } else {
    tagAttrs(t)
  }
}

//VARIABLES - TABLE CREATION
const tableRowTag = tag('tr')
const tableCell = tag('tr')

const tableRow = items => compose(tableRowTag, tableCells)(items)


const tableCell = tag('td')
const tableCells = items => items.map(tableCell).join('')


let description = $('#description')
let calories = $('#calories')
let carbs = $('#carbs')
let protein = $('#protein')

let list = []

//INVALIDATION WHEN INPUT IS EMPTY
description.keypress(() => {
  description.removeClass('is-invalid');
});
protein.keypress(() => {
  protein.removeClass('is-invalid');
});
carbs.keypress(() => {
  carbs.removeClass('is-invalid');
});

calories.keypress(() => {
  calories.removeClass('is-invalid');
});

//VALIDATIONS INPUTS
const validateInputs = () => {
  description.val() ? '' : description.addClass('is-invalid');
  calories.val() ? '' : calories.addClass('is-invalid');
  carbs.val() ? '' : carbs.addClass('is-invalid');
  protein.val() ? '' : protein.addClass('is-invalid');

  if (
    description.val() &&
    calories.val() &&
    carbs.val() &&
    protein.val()
  ) add()

};

//ADD VALUES INPUTS
const add = () => {
  const newItem = {
    description: description.val(),
    calories: parseInt(calories.val()),
    carbs: parseInt(carbs.val()),
    protein: parseInt(protein.val())
  }

  list.push(newItem);
  cleanInputs();
  console.log(list);
}

//CLEAN INPUTS
const cleanInputs = () => {
  description.val('')
  calories.val('')
  carbs.val('')
  protein.val('')
}
