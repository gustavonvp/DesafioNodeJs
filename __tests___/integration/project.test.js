const request = require('supertest')


function filterByTerm(inputArr, searchTerm) {
    return inputArr.filter(function(arrayElement) {
      return arrayElement.url.match(searchTerm);
    });
  }

describe('Verification',() => {
    test('should realize verification in project with payload',() => {
       const request = 
        [{
            title:"Desafio Node.js",
            url: "https://github.com/gustavonvp/DesafioNodeJs",
            techs: "Node.Js React",
            likes:0
       
        }]

        const output = [{
            title:"Desafio Node.js",
            url:"https://github.com/gustavonvp/DesafioNodeJs",
            techs: "Node.Js React",
            likes:0
       
        }]


       expect(filterByTerm(request,"github")).toEqual(output)
    })

})