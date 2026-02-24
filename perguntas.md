# Perguntas Typescript

## O que signifca dizer que o typescript possue um sistema de tipos estrutural (structural typings) e não nominal?

O typescript usa a tipagem estrutural, também chamada de duck typing estático.

A compartibilidade entre tipos é baseada no shape do objeto, e não na identidade nominal do tipo (o nome).

nesse exemplo,

```ts
interface User {
  id: number;
  name: string;
}

interface Post {
  id: number;
  name: string;
}

const user: User = { id: 1, name: 'Greg' };

const post: Post = user; // isso é permitido
```

isso porque o sistema do typescript é baseado nos tipos estruturais e não nominal.

## COmo isso impacta na compartibilidade entre interfaces?

-o ts verifica mesmas propriedades obrigatórias

- mesmos tipos compartiveis nas propriedades
- variância correta em funções
- checagem de propriedades extras em object liberal ( Excess property check )

Exemplo

```ts
interface A {
  x: number;
}

interface B {
  x: number;
  y: string;
}
const b: B = { x: 1, y: 'a' };

const a: A = b; // permitido
```

por que b tem tudo o que a precisa, isso é chamado de subtype structutal compartibility

---

## Em que situações isso pode gerar comportamentos inesperados

a) um exemplo seria em edge cases

```ts
type UserId = string;
type PostId = string;

function getUser(id: UserId) {}
function getPost(id: PostId) {}

getUser('post-id'); // o ts aceita isso e verce visa
```

b) outro problema é Property Checks inconsistentes

```ts
interface User {
    name: string
}

const user: User = {
    name: "example",
    age: 20 // da erro
}

// MAS


const obj = {
    name: "example",
    age: 20
}
const user: User = obj // aceita de boas

porque o check só acontece em object literal direto

```

c) o ts é bivariante em parametros de funções em certos contextos, o que pode ser inseguro

## Compare com os sistemas nominais em linguagens como Java ou C#

em linguagens nominais, a compartibilidade depende do nome do tipo, e é necessário declarar explicitamente a herança ou implementação

```ts
class User {
  int id;
}

class Customer {
  int id;
}

User u = new Customer(); // Erro
```

mesmo com o mesmo shape (estrutura), eles são distintos por que o sitema é nominal

## O que é Unknow, como ele é diferente de any, em que situação é preferido e como faze um narrowing seguro?

Unknow é top type seguro, é um Super Tipo de todos os tipos, um tipo desconhecido, ele exige validação antes do uso

```ts
let x: unknow;
let s: string = x; // erro
let y: unknow = 'example'; // ok
```

Deve ser usado quando o valor é desconhecido, exemplos:

- Api's externas
- LocalStorageInseguro
- Dados de fronteira (Boundary Types)
- Genericos abstratos
- JSON.parse

Any é um scape hatch (Escotilha de escape, saida de emergência) que desativa o sistema de validação de tipos

O Narrowing (Estreitamento) pode ser feito com checks null/undefined, typeof, instanceof, in, user-defined type guard, asertions com o assert, control flow (ifs) e validação externa como o ZOD.

never é o bottom type (Nivel inferior), ele representa um conjunto vazio que nunca ocorre. Sendo usado para funções que lançam erros, loops infinitos ou para verificações de exaustividade. Ele é um subtipo de todos os outros tipos e não aceita atribuições e nem any

Void é um tipo undefined

assignability (assignabilidade ou atribuibilidade) = é a regra de compartibilidade para atribuição

-----


# Type guards

## O que são type guards
- Eles funcionam sobre qualquer union type ou tipo incerto.
- São construções que refinam o tipo de uma variável dentro de um bloco de controle, com base em uma condição avaliada em tempo de execução
- Exemplo:
function example(value: string | number) {
    if(typeof value === 'string') { // narrowing por control flow => pode ser por if, else,early returns, === null, Truthiness checks (verrifica se se comporta como verdadeiro, &&, ||, etc), instance of, in, comparação de literals
        // aqui o value é string
    }
}

## Exemplo de **User-Defined Type Guards** ==> Retorna boolean
uma função pode declarar um type predicate
function isString(value: unknow): value is string {
    return typeof value === 'string'
}

## Assert Functions
Não retorna booleans
Elas refinam o tipo (narrowing), assumindo que, se a função não lançou um erro, é um tipo válido

function assertString(value: unknow): asserts value is string {
    if(typeof value !== 'string') {`
        thrown new Error("Not a string")
    }
}

assertString(x) // refinam permanentemente
// daqui pra baixo é String por exemplo


# Branch negativo | Exclusion narrowing
if(type x === "string") {
    // x: string
} else {
    // x: Tipo original-string, aqui é a branch negativa
}


## COmo o typescript realiza controll flow analysis internamente (Conceitualmente)
O compilador controi um control flow graph (CFG)

Em cada nó, ele mantém um conjunto refinado de tipos possíveis

Cada condição reduz o conjunto

Cada branch, cria um novo escopo de tipo refinado

É a análise estática baseada em caminhos de execução possíveis


--------

# UNION

## O que é um union type

Um union é um valor que pode ser um entre multiplos tipos possíveis, unidos pelo operador |

## Como narrowing funciona com union
Pode acontecer por typeof, instanceof, in, equality check, control flow ou ou com um discriminated union


## Por que TypeScript não permite acessar propriedades que não estão presentes em todos os membros do union
O TypeScript só permite acesso a propriedades comuns a todos os membros do union.


## O que é um discriminated union
É um union type onde todos os membros possuem uma propriedade em comun, essa propriedade é um literal type distinto em cada menbro, essa propriedade atua como um discriminador
Exemplo
type UserCpf {
    kind: "cpf"
    // ..
}
type UserCnpj {
    kind: "cnpj"
    // ..
}

type Document = UserCpf | UserCnpj

Aqui o narrowing fica mais previsivel

if(doc.kind === 'cpf') {
    // doc é UserCpf
}



---------

## Tipos vs Interfaces

# Diferença entre interface e type
Type é um alias para qualquer tipo válido no sistema de tipos do typescript, ele pode representar primitivos, unions, intersections, tuplas, mapped types, condictional types, funções, objetos.



Interfaces é voltada para descrever a forma estrutural de objetos, pode ser extendida, implementada por classes, suporta declaration merges. É APENAS UMA DESCRIÇÃO ESTRUTURAL

## Quando usar um ou outro

## Para usar interfaces
- Está modelando objetos estruturais extensíveis
- Deseja declaration merges
- Está projetando apis publicas
- Quer permitir extensao incremental

## Para usar Types
- Precisa de union ou intersection
- precisa de conditional types
- precisa de mapped types
- precisa de composição complexa
- quer representar algo além de objetos


Prefira Type, use interface quando precisar de merging ou extensão



# O que é declaration merging

é quando duas interfaces tem o mesmo nome e em um mesmo contexto, dessa forma as propriedades de ambas é somado

Se houver conflito entre propriedades, o compilador gera erro


# Por que type pode representar coisas que interface não pode

Interfaces não podem representar Union Types, Intesection arbitraria, condictional types, mapped types, tuplas.




# Generics | TAMBÉM CHAMADO DE TIPO PARAMETRIZADO

## O que são generics no TypeScript
São funções que permitem que você crie estruturas parametrizadas por tipo, mantendo a segurança estática.

São equivalente a funções que operam no nivel de tipos, eles permitem o polimorfismo paramétrico

Elas permitem abstração sem perder a informação de tipo

T - parametro de tipo | É resolvido no momento da chamada
function identity<T> (value: T): T {
    return value
}

Sem generics, seria necessário um ANY

## Como funcionam constraints (extends)

Eles limitam os tipos que podem ser passados nos generics, No exemplo abaixo, T deve pelo menos ter a propriedade length, podendo ser qualquer objeto compartivel inclusive ARRAYS que possuem o length

```ts
function getLength<T extends { length: number}>(value: T) {
    return value.length
}
```

## O que é inferência de tipo genérico
A partir dos argumentos (T), o typescript tenta inferir os tipos.

function wrap<T>(value: T): { value: T} {
    return { value }
}

const  result = wrap("opa")
o TS agora sabe que T é string, a partir dos argumentos, contexto de uso, e retorno esperado (contextual typing)


## O que acontece quando um generic não é explicitamente informado

Generic explicitamente informado
identity<number>(42)

---

Generic NÃO explicitamente informado
identity(42) // pde inferir pelo parametro, então OK

Outro exemplo

function createValue<T>(): T { // sem argumento, sem contexto, T é unknow
    //
}

createValue() // gera erro, pois T é unknow
const result: number[] = createValue() // não gera erro, pois agora ele sabe o que é para ser, mas esse é um caso ruim


##  Any vs Generic
Com Any perdemos o type information
- perdemos o type safety
- perdemos o autocomplete preciso
- permite operações inválidas sem erro
- Isso quebra soundness (solidez)

Com generics
- preservação  do tipo original
- polimorfismo paramétrico
- Segurança estática
- Encaedamento seguro



---------

**::Dicionário::**

Dog <: Animal - Dog é subtipo de animal | Dog pode ser usado onde animal é esperado
F<T> | F é um contrutor de tipos Array<T> . Promise<T> . Set<T>

São aplicações do construtor
Array<Dog>
Promise<Animal>


SE S é subtipo de T, então F<S> também é subtipo de F<T>? Não é sempre verdade, depende como F usa o parametro de tipo
F<S> <: F<T> ?
No exemplo acima, F é o mesmo, quem muda é o S e T.
Dado o mesmo contrutor do tipo F, como ele ses comporta quando trocamos o parâmetro
Se S <: T Exemplo:
Dog <: Animal
Então
Array<Dog>
Array<Animal>
Array<Dog> <: Array<Animal>???? se SIM, então Array<_> é covariante


------


# O que é covariância

// Dado que Dog é subtipo de animal (Dog <: Animal)

interface Animal {
  nome: string
}

interface Dog extends Animal {
  latir(): void
}

const meuDog: Dog = {
  nome: "Rex",
  latir() {
    console.log("au au ")
  }
}

// ------------------------------------------
// COVARIÂNCIA | T só aparece como retorno
// ------------------------------------------

interface Produtor<T> {
  produzir(): T
}

const produtorDog: Produtor<Dog> = {
  produzir() {
    return meuDog
  }
}


// Nesse caso, Produtor<Dog> é subtipo de Produtor<Animal>
// Isso porque o Retorno que É DOG satisfaz todos os requisitos de animal.
const produtorAnimal: Produtor<Animal> = produtorDog 

// ------------------------------------------
// CONTRAVARIÂNCIA | T só aparece como PARÂMETRO de entrada, sem RETORNO
// ------------------------------------------

interface Consumidor<T> {
  consumir: (valor: T) => void // é preciso estar com o strictFunctionTypes : true
}

const consumidorAnimal: Consumidor<Animal> = {
  consumir(a: Animal) {// Implementa APENAS requisitos de ANIMAIS e nÃO DE DOGS
    console.log(a.nome)
  }
}

// Aqui a relação INVERTE:
// Consumidor<Animal> <: Consumidor<Dog>
// Então a relação se inverte
// Consumidor<Animal> <: (É subtipo) de <Consumidor<Dog> 
// isso por que a implementação de Consumidor<Animal> é mais geral
// e não de dog.
const consumidorDog: Consumidor<Dog> = consumidorAnimal // OK

// ------------------------------------------
// INVARIÂNCIA | T aparece como ENTRADA e SAÍDA
// ------------------------------------------


interface Caixa<T> {
  get(): T
  set(valor: T): void
}

const caixaDog: Caixa<Dog> = {
  get() {
    return meuDog
  },
  set(d: Dog) {
    console.log(d.nome)
  }
}


// Nesse caso Uma Caixa de Animais não pode receber uma caixa de Dog, porque a implementação de caixa de dog RETORNA um dog e exige DOG na entrada.
// Mesmo que fosse um misto, o fato de ter um Parametro de entrada com DOG, significa que outros animais não são compartiveis..
const caixaAnimal: Caixa<Animal> = caixaDog // Caixa<Dog>



# O que significa dizer que TypeScript é bivariant em parâmetros de função (em alguns contextos)
- Significa que ele aceita tanto a direção coravariante como a contravariante para os tipos de parametros em certos casos (Métodos de objetos e callbacks) - mesmo que seja inseguro:
Em teoria:
- Retorno de função -> covariante
- Parametro de função -> contravariânvia

A permissão se deve a uma questão de compartibilidade com o js, para resolver esse problema deve-se ativar a config abaixo

{
  "compilerOptions": {
    "strictFunctionTypes": false
  }
}

Exemplo onde isso gera um bug

```ts
type Animal = { nome: string }
type Gato = { nome: string, miar(): void }
type Cachorro = { nome: string; latir(): void }

function executa(fn: (a: Animal) => void) {
  const animal: Animal = { nome: "Mingau" }  as  Gato
  fn(animal)
}

const soCachorro = (c: Cachorro) => {
  c.latir()
}

executa(soCachorro) // TypeScript permite (em contexto bivariant), mas isso causa um erro, pois o GATO que é compartivel com o Animal tem o método MIAR e não latir.
```



----
# UtilityTypes

São tipos especiais para manipular outros tipos, permitindo maior flexibilidade.

## Introdução
### Partial

Serve para tornar todas as propriedades opcionais ( Adiciona o modificador ? em todos). Pode ser util em operações como PATH no caso de API's (Atualizações Parciais) e também util para flexibilidar tipos em casos com strict mode em toda a aplicação.

```ts
const fnPartial = (user: Partial<User>) => {} // { Todos com ? }
type Result = Partial<User> // { Todos com ? }
```

### Required

Serve para exigir que um tipo seja passado por completo, removendo o modificador opcional?. Preservando o tipo da propriedade inclusive com undefined ou null


```ts
const fn = (user: Required<User>) => {}
type Result = Required<User> // {Todos sem ? } // undefined e null ainda é permitido
```


### Readonly

Serve para dizer que um objeto não pode ter as propriedades alteradas em tempo de COMPILAÇÃO. Ele não congela o objeto como o Object.freeze. Extremamente util para exigir imutabilidade ou evitar efeitos colaterais em pontos criticos, como ID's. (No caso de valores indivuduais, é usado o readonly como modificador em propriedades de classes, tuplas, arrays)

```ts
interface UserInterace {}
const user10: Readonly<UserInterace> = {} as UserInterace
const arr:  ReadOnlyArray<string>  = ["a" , "b"] // OU Readonly<string[]>

user10?.ageUser = '2' // Error
arr.push("c") // Error
```

### Pick
Serve para escolher quais Keys de um tipo serão preservadas e retornar um tipo novo, util para reaproveitar tipos complexos

```ts
type UserBasics = Pick<UserInterface, "address" | "name" | "id" | "data" >
```

### Omit
Serve para Omitir certas keys que não devem ser preservadas, e retornar um novo tipo. Util para reaproveitar tipos ignorando partes não uteis em um contexto

```ts
type UserBasics = Omit<UserInterface, "document" | "courses">
```

### Record<K, T> 
Cria um tipo onde chaves são K, e valores são T

```ts
type User = Record<string, number>

// Equivalente a

type Example = {[key: string]: number}
```

### Exclude<T, U>

Remove de T todos os tipos que são atribuiveis a U

```ts
type A = "a"| "b" | "c"
type B = Exclude<A, "b">
// "a" | "c"
```
Util para remover membros de unions

### Extract<T, U>
Mantém apenas os tipos de T que são atribuíveis a U

```ts
type A =  "a" | "b" | "c"
type B = Extract<A, "a" | "b">
// "a" | "b"
```

util para selecionar menbros de unions

### NonNullable<T>

Remove null e undefined de um tipo
```ts
type A = string | null | undefined
type B = NonNullable<A>
// string
```

Util em código com strictNullChecks

### Parameters<T>
Extrai os parâmetros de uma função como uma tupla

```ts
function fn(name: string, age: number) {}
type Params = Parameters<typeof fn>
// [name: string, age: number]
```

### ConstructorParameters<T>
Extrai parametros de um construtor de uma classe

```ts
class User {
    constructor(name: string, age: number) {}
}
type Params = ConstructorParameters<typeof User>
//  [name: string, age: number]
```

### ReturnType<T>

Extrai o tipo de retorno de uma função

```ts
function fn() {
    return { name: "example" }
}

type R = ReturnType<typeof fn>
// { name: string; }
```

### InstanceType<T>

Extrai o tipo da instância de uma classe

```ts
class User {
    name = "jon"
}
type U = InstanceType<typeof User>
// User
```

### ThisParameterType<T>
Extrai o tipo do **this** de uma função.

```ts
function fn(this: { id: number  }) {}
type T = ThisParameterType<typeof fn>
// { id: number }
```

### OmitThisParameter<T>
Remove o parametro this da função

```ts
function fn(this: { id: number}, name: string) {}
type NewFn = OmitThisParameter<typeof fn>
// (name: string) => void
```

### Awaited<T>
Resolve recursivamente o tipo de uma promise

```ts
type A = Awaited<Promise<string>>
// string
```

Eles são uteis quando:
- Se deseja derivar tipos de uma fonte de verdade unica.
- precisa evitar duplicação estrutural
- quer manter sincronização automática caso o tipo base mude
- Está aplicando transformações sistemáticas em todo o tipo
- Quer compor tipos dinamicamente

E deve se evitar quando:
- A semantica muda (DomainUser vs ApiUser)
- o Tipo derivado não representa a mesma entidade
- Você começa a criar tipos ilegíevis com muitas composições


## Operadores para a derivação de tipos
- keyof - gera união de chaves
```ts
type K = keyof User
```

- typeof ( Operador de tipo) - Extrai o valor de uma variável valor

```ts
const user = {name:"jon"}
type U = typeof user;
```

## Manipulador de strings ( Template literals Types) | Intrinsic String Manipulation Types

Uppercase<S>
Lowercase<S>
Capitalize<S>
Uncapitalize<S>

```ts
type A = Uppercase<"abc">
// ABC
```

### Manipulador  de objetos avançado
- ReadonlyArray<T>
```ts
const arr: ReadonlyArray<string> = ["a"] // em tempo de compilação impede push no array
```

###  ThisType<T>
Utility Especial para tiapagem contextual de this
Só funciona dentro de object literals com noImplicitThis

```ts
type ObjectDescriptor<D, M> = {
    data?: D,
    methods?: M & ThisType<D & M>
}
```

