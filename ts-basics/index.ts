//```ts
// ==========================================
// Exercise 1: Typed function
// ==========================================

function add(a: number, b: number): number {
    return a + b;
}

console.log("Exercise 1:", add(10, 20));


// ==========================================
// Exercise 2: User interface with optional field
// ==========================================

interface User {
    name: string;
    age: number;
    email?: string;
}

const user: User = {
    name: "Laksh",
    age: 22
};

console.log("Exercise 2:", user);


// ==========================================
// Exercise 3: Product type with readonly id
// ==========================================

type Product = {
    readonly id: number;
    name: string;
    price: number;
};

const product: Product = {
    id: 101,
    name: "Keyboard",
    price: 1500
};

console.log("Exercise 3:", product);

// This would cause an error:
// product.id = 102;


// ==========================================
// Exercise 4: Array of products
// ==========================================

const products: Product[] = [
    {
        id: 101,
        name: "Keyboard",
        price: 1500
    },
    {
        id: 102,
        name: "Mouse",
        price: 800
    },
    {
        id: 103,
        name: "Monitor",
        price: 12000
    }
];

console.log("Exercise 4:", products);


// ==========================================
// Exercise 5: unknown with a type check
// ==========================================

function printValue(value: unknown): void {
    if (typeof value === "string") {
        console.log("Exercise 5:", value.toUpperCase());
    } else {
        console.log("Exercise 5: Value is not a string");
    }
}

printValue("hello");
printValue(123);


// ==========================================
// Exercise 6: Optional chaining ?. and nullish coalescing ??
// ==========================================

interface Customer {
    name: string;
    address?: {
        city?: string;
    };
}

const customer: Customer = {
    name: "Laksh"
};

const city = customer.address?.city ?? "Unknown city";

console.log("Exercise 6:", city);

