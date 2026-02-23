1. O que signifca dizer que o typescript possue um sistema de tipos estrutural (structural typings) e não nominal?

O typescript usa a tipagem estrutural, também chamada de duck typing estático.

A compartibilidade entre tipos é baseada no shape do objeto, e não na identidade nominal do tipo (o nome).

nesse exemplo,

```ts
interface User {
    id: number
    name: string
}

interface Post {
    id: number,
    name: string
}

const user: User = { id: 1, name: 'Greg'}

const post: Post = user // isso é permitido

```

isso porque o sistema do typescript é baseado nos tipos estruturais e não nominal.


2. COmo isso impacta na compartibilidade entre interfaces?

-o ts verifica mesmas propriedades obrigatórias
- mesmos tipos compartiveis nas propriedades
- variância correta em funções
- checagem de propriedades extras em object liberal ( Excess property check )

Exemplo
```ts
interface A {
    x: number
}

interface B {
    x: number
    y: string
}
const b: B = {x: 1, y: 'a'}

const a: A = b // permitido
```

por que b tem tudo o que a precisa, isso é chamado de subtype structutal compartibility

----

3. Em que situações isso pode gerar comportamentos inesperados

a) um exemplo seria em edge cases

```ts
type UserId = string
type PostId = string


function getUser(id: UserId) {}
function getPost(id: PostId) {}

getUser("post-id") // o ts aceita isso e verce visa

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

4. Compare com os sistemas nominais em linguagens como Java ou C#

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