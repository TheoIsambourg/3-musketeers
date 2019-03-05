
const starWars = require('./index');

const starWarsNames = require('./starwars-names.json');

describe('starwars-names', () => {
  describe('all', () => {

    test('should be a fulfilled array', () => {

       expect (starWars.all).toHaveLength(starWarsNames.length)
    });
    test('should be an array of strings', () => {    

      const isString = str => typeof str === 'string'

	   expect (starWars.all).toSatisfyAll(isString)
    });

    test('should contain `Luke Skywalker`', () => {

       expect (starWars.all).toContain ('Luke Skywalker')
    });

    test('should not contain `Ben Quadinaros`', () => {

      expect (starWars.all).not.toContain ('Ben Quadinaros')
    });
  });

  describe('random', () => {
    test('should return a random item from the starWars.all', () => {

     const randomTitle=starWars.random()
    
		 expect (starWars.all).toContain(randomTitle)
    });

    test('should return an array of random items if passed a number', () => {

    const nb=5
    
    const array=starWars.random(nb)
    
    expect (array).toHaveLength(nb)
    
        expect (starWars.all).toIncludeAllMembers(array)
    });
  });
});
