var _ = require('lodash')

/* Used to store the path until the JSON element concerned. This way the JSON source will be modifiable when we
 take an element from the queue. "result" is the JSON being constructed, the JSON to be returned with circular references
 transformed */
var ObjectEditor = function(result: any, path: any) {
  // @ts-ignore
  this.result = result
  // @ts-ignore
  this.path = path
}

//Function to replace a JSON of path by "replacer"
ObjectEditor.prototype.editObject = function(replacer: any) {
  //The first call to this function (from the JSON root) shouldn't modify our result
  if (this.path.length === 0) return

  //We construct the steps necessary to get to the concerned JSON from the root
  var arrayOfSteps = this.path.slice(1, this.path.length - 1).split('][')

  //Recursive function that finds and replaces the JSON of path
  ;(function auxFindElementToReplace(pointerResult, array, replacer) {
    var nextStep = array[0]

    //When we arrive to the JSON of path
    if (array.length === 1) {
      pointerResult[nextStep] = replacer

      //We stop going into our JSON
      return
    }

    //We go to the next step, deleting it from our array, calling auxFindElementToReplace again
    pointerResult = pointerResult[nextStep]
    array.shift()
    auxFindElementToReplace(pointerResult, array, replacer)
  })(this.result, arrayOfSteps, replacer)
}

var FoundObject = function(value: any, path: any) {
  // @ts-ignore
  this.value = value
  // @ts-ignore
  this.path = path
}

//To construct path leading to sub-JSON in a friendly-user way
FoundObject.prototype.makePathName = function() {
  const steps = this.path.slice(1, this.path.length - 1).split('][')

  const start = '~△~'
  const data = []

  for (let index in steps) {
    if (_.has(steps, index)) {
      data.push(isNaN(steps[index]) ? steps[index] : +steps[index])
    }
  }

  return start + JSON.stringify(data)
}

//Main function to travel through the JSON and transform the circular references and personalized replacements
var breakCyclesInBFS = function(object: any, customizer: any) {
  var foundStack = [], //Stack to keep track of discovered objects
    queueOfModifiers = [], //Necessary to change our JSON as we take elements from the queue (BFS algorithm)
    queue = [] //queue of JSON elements, following the BFS algorithm

  //We instantiate our result root.
  var result = _.isArray(object) ? [] : {}

  //We first put all the JSON source in our queues
  queue.push(object)
  // @ts-ignore
  queueOfModifiers.push(new ObjectEditor(object, ''))

  var positionStack
  var nextInsertion

  //BFS algorithm
  while (queue.length > 0) {
    //JSON to be modified and its editor
    var value = queue.shift()
    // @ts-ignore
    var editor = queueOfModifiers.shift()
    // @ts-ignore The path that leads to this JSON, so we can build other paths from it
    var path = editor.path

    //We first attempt to make any personalized replacements
    //If customizer doesn't affect the value, customizer(value) returns undefined and we jump this if
    if (customizer !== undefined) {
      //By using this variable, customizer(value) is called only once.
      var customizedValue = customizer(value)

      if (customizedValue !== undefined) value = customizedValue
    }

    if (typeof value === 'object') {
      positionStack = _.chain(foundStack)
        .map('value')
        .indexOf(value)
        .value()

      //If the value has already been discovered, we only fix its circular reference
      if (positionStack !== -1) {
        nextInsertion = foundStack[positionStack].makePathName()
      } else {
        // @ts-ignore At the first time we discover a certain value, we put it in the stack
        foundStack.push(new FoundObject(value, path))

        nextInsertion = value

        for (var component in value) {
          if (_.has(value, component)) {
            queue.push(value[component])
            // @ts-ignore
            var newPath = path + '[' + component + ']'
            // @ts-ignore
            queueOfModifiers.push(new ObjectEditor(result, newPath))
          }
        }
      }
    } else {
      //If it's an elementary value, it can't be circular, so we just put this value in our JSON result.
      nextInsertion = value
    }

    editor.editObject(nextInsertion)
  }

  return result
}

function Decycle(json: any, customizer?: any): any {
  //We replace the JSON passed by the brand new JSON returned from JSON.breakCyclesInBFS
  //This way, the original JSON in unchanged, and it can be used for other operations
  return breakCyclesInBFS(json, customizer)
}

export default Decycle
