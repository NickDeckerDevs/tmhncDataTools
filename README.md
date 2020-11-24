# Do things to these files and make them translate

This is two different ways to make this work
  node convertLaravelToVue.js
  node convertVuewToLaravel.js

## convertLaravelToVue.js

This will take an enum related php file text and covert it to json object notation to copy/paste into the vue JSON file

  `const inputFile = '/Users/inbound/Downloads/enumdata.txt'`

  `const outputLocation = '/Users/inbound/Downloads/'`

Those two are what you'll need to change on your computer.

*example input file for enumdata.txt*

    public const ADVANCE = [
        'id' => 1,
        'name' => 'Advance',
        'slug' => 'advance',
    ];

    public const AICHI = [
        'id' => 2,
        'name' => 'Aichi',
        'slug' => 'aichi',
    ];

## convertVueToLaravel.js

This will take a json related file text and covert it to a php CONST to copy/paste into the laravel ENOM file

  `const inputFile = '/Users/inbound/Downloads/jsondata.txt'`

  `const outputLocation = '/Users/inbound/Downloads/'`

Those two are what you'll need to change on your computer.

*example input file for jsondata.txt*

    { "name": "Advance", "value": "1" },
    { "name": "Aichi", "value": "2" },
