-----

Documentation: [html](https://docs.vapors.io/)

-----

Display Logic and Input
=======================

Units
-----

### Decimal Count

### Named Units





Functions
---------

### Formatting

#### *vapors* . *utils* . **commify**( value ) => *string*

Returns a string with value grouped by 3 digits, separated by `,`.


### Conversion

#### *vapors* . *utils* . **formatUnits**( value [ , unit = "vapor" ] ) => *string*

Returns a string representation of *value* formatted with *unit* digits (if it is a number) or to the unit specified (if a string).


#### *vapors* . *utils* . **formatVapor**( value ) => *string*

The equivalent to calling `formatUnits(value, "vapor")`.


#### *vapors* . *utils* . **parseUnits**( value [ , unit = "vapor" ] ) => *[BigNumber](/v5/api/utils/bignumber/)*

Returns a [BigNumber](/v5/api/utils/bignumber/) representation of *value*, parsed with *unit* digits (if it is a number) or from the unit specified (if a string).


#### *vapors* . *utils* . **parseVapor**( value ) => *[BigNumber](/v5/api/utils/bignumber/)*

The equivalent to calling `parseUnits(value, "vapor")`.


