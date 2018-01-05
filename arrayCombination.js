/*
You're given a vector of vectors of words, e.g.:
[['quick', 'lazy'], ['brown', 'black', 'grey'], ['fox', 'dog']].

Write a generalized function that prints all combinations of one word from the first vector, one word from the second vector, etc.
The solution may not use recursion.

NOTE: the number of vectors and number of elements within each vector may vary.
*/


//store our vector or array of arrays
let vector = [['quick','lazy'], ['brown', 'black', 'grey'],['fox','dog']]

//1. Determine the number of combinations that are possible given the vector and its containing arrays
let combinations = combine(vector)

//2.Determine which element will be repeated when we layout the array

//Store the number of combinations in another variable that will change as we divide
let div = combinations
let finalResult = []

//3. Loop that goes through each inner array and lays the combinations

vector.forEach((e)=>{
  //number that will determine the repetitions of each element, according to array's       length
  div /= e.length

  //lays out values of each inner array and stores it in array. Takes the array, the       number that will divide the elements and the total number of combinations
  let layoutArr = layout(e,div,combinations)

  //add array into a final result
  finalResult.push(layoutArr)
})

//4. Print out the elements of final reult array
for (let i = 0; i<combinations;i++){

  //String to store the output of each line
  let output = ""

  finalResult.forEach((e)=>{
    output += e[i]+" "
  })

  console.log(output)
}


//FUNCTIONS

//Lays out the arrays according to the division for the number of combinations
function layout(arr, div, combinations){
    //store temporary values of the division and an index to print out the elements of       the array
  let result = []
  let repetition = div
  let index = 0

  // In order to not use recursion, I will print each row separately first
  for(let j = 0;j<combinations;j++){
    if (repetition>0){

      //Add to an array
      result.push(arr[index])
      //Keep track of the repetitions of each element
      repetition -= 1

    } else{ //Case repetitions is lower than 0, we reset and continue with the next
            //element
        repetition = div -1 //-1 because the current element will be added before the                                   loop starts again
        index += 1

        //Control that the index doesn't grow large than the length of the array
        if (index>=arr.length){
            index = 0
        }
        result.push(arr[index])
      }
  }
  return result
}

//Combinations function. Reuturns number with possible combinations
function combine(array){

  //Variable to hold de value of combinations. Starts at 1 because we will multiply it
  let comb = 1;

  //Loop to go through vector and multiplying the number of combinations
  array.forEach((e)=>{
    comb *= e.length
  })

  return comb
}

/*
Explanation of pattern logic

We know that the given array in particular will have 12 combinations and that the first element 'quick' will be repeated 6 times before we start with 'lazy' combinations.
That is 12 / 2, which is the length of the first array

Each element of the second array, from those 6 repetitions, will repeat twice considering the length of vector[1].length = 3 (6/3 = 2 times)

From thos two times vector[1] elements are, vector[2] elements are repeated just once
(no repetition) 2/2 = 1.

The general rule is that we repeat the elements of an array depending on the number of elements of each internal array
*/
