// test.cl

/*

First script test
First, we remove all comments
Then we interpret the script as a set of functions

*/

main = (): v => {
    print("test"); // test
    5 + 4;
    res = add(4, 7); // res = 11
    print(add(res, 12)); // 23

    // const values

    b = (): i => 4; // Curly braces optional when only one expression

    c = => 4; // Parenthesis for parameter are optional

    d = 4; // Optional arrow when no parameters

    // mutable values

    mut count: $i  = 0; // default value
    print(@iToS(count())); // 0
    count.mut(5); // void
}

myFunc = (s: s): v => {
    print(s);
}

add= (a: i, b: i): i => a + b;

myPrint =(message: s): v => print(s);

test=():i=>4;
test2=(): =>4;

// b = boolean
// c = char, u8
// f = float64
// i = int, isize
// s = string
// u = uint, usize
// v = void

// $T = mutable value
// ?T = optional of a type
// T!E = type or error