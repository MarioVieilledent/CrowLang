# CrowLang

Functional interpreted programming language.

## Key features

### Everything is a function and an expression

Since everything is a function, there's no need for `var`, `let`, `const` or `function` keywords. Instead, all declaration are simply `name = functionDefinition`. Here `s` is the type for string, and `v` is the type for void meaning that the function returns a unit type.

```
logger = (message: s): v => {
    print(message);
}
```

There is no `return` keyword, instead, the last expression found in the function scope is returned.

```
xor = (logicA: b, logicB: b): b {
    result = logicA ^ logicB; // result is also a function
    result() && true; // Not captured expression
    result(); // Returned last expression
}
```

Functions with a single expression body can omit the curly braces in order to be written in a single line.

```
// Single line function
discriminant (a: f, b: f, c: f): f => b*b - 4*a*c;

print(discriminant(1.0, 3.0, 2.0)) // 1.0;

// Single line constant function
worldChampion = (): f => true;

print(worldChampion()) // true;
```

Constants are created by declaring function that doesn't take any parameters.

```
// Longest version
name = (): f => {
    "Magnus";
}

// Equivalent single line version
name = (): f => "Magnus";

// Equivalent version infering the return type
name = () => "Magnus";

// Equivalent version without paramaters' parenthesis
name = => "Magnus";

// Equivalent shortest version, without parenthesis and arrow
name = "Magnus";

// In any case, name is still a function and shall be called with parenthesis

name; // return void
name(); // reutrn "Magnus";
```
