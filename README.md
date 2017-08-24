# Node-tiers: A multi-tier benchmark

A multi-tier benchmark that allows fine-grained personalization of resource utilization.

[**Features:**](#features)
 - Several resource intensive tiers implemented, each with different characteristics.
 - Network utilization in the communication with each tier is personalizable.
 - Application can be execute with any tier configuration (1 to N-tiers).
 - Addition of new resource intensive tiers is quite simple.
 - It was built with the most recent technologies for development of multi-tier applications, including:
    - [Node.js](https://nodejs.org/en/)
    - [TypeScript](https://www.typescriptlang.org/)
    - [MongoDB](https://www.mongodb.com/)

[**Current tiers implemented:**](#tiers)

| Application/Method | Class File                                                          | Parameters                                          | Resource Intensive            |
|--------------------|---------------------------------------------------------------------|-----------------------------------------------------|-------------------------------|
| Ackerman           | [ackerman.ts](src/tiers/ackerman.ts)                                | `m` and `n`                                         | CPU                           |
| Binary Search      | [binarySearch.ts](src/tiers/binarySearch.ts)                        | `goal` and [`Util.arraysLength`](src/tiers/util.ts) | Memory (random) and Cache     |
| Linear Search      | [linearSearch.ts](src/tiers/linearSearch.ts)                        | `goal` and [`Util.arraysLength`](src/tiers/util.ts) | Memory (sequential) and Cache |
| Malloc             | [malloc.ts](src/tiers/malloc.ts) and [malloc.c](src/tiers/malloc.c) | `bytes`                                             | Memory                        |
| Matrix             | [matrix.ts](src/tiers/matrix.ts)                                    | `matrixSize`                                        | CPU, Memory and Cache         |
| Pi                 | [pi.ts](src/tiers/pi.ts)                                            | `precision`                                         | CPU                           |
| Write Database     | [writeDatabase.ts](src/tiers/writeDatabase.ts)                      | `dbElementSize`                                     | Disk Write                    |
| ZLib               | [zlib.ts](src/tiers/zlib.ts)                                        | `textLength`                                        | CPU, Memory and Cache         |

[**Instalation**](#instalation)

Install the necessary dependencies:

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

Install all other project dependencies by running:
- `npm install`


[**Running**](#Running)

Each route expects a POST request, where it accepts an optional parameter `nextTiers`, which will make the connections between tiers.
This parameter must be in the body of the HTTP request, and should follow the example:

```json
{ "nextTiers": 
    [ 
        { "url": "http://localhost:3000/TIER_ID2", "requestSize": 1000},
        { "url": "http://localhost:3000/TIER_ID3", "requestSize": 16000},
        ...,  
        { "url": "http://localhost:3000/TIER_IDN", "requestSize": 128000}
    ]
}
```

- `nextTiers` is an array which contains the information about each tier that will be executed. 
- In this example, the TIER1 will make a request to TIER2 with 1000 bytes of request size. Then, TIER2 will make a request to TIER3 with 16KB of request size. This process ends whenever all tiers are called. 
- Currently, it is not possible to a tier call more then one tier.